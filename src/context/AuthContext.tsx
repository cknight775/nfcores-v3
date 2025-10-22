import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  
  // Auth methods
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
  
  // User data methods
  refreshUser: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  const fetchUserData = async (uid: string): Promise<User | null> => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // Fetch full user data from Firestore
        const userData = await fetchUserData(firebaseUser.uid);
        setUser(userData);
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Login with email/password
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Register new user
  const register = async (email: string, password: string, userData: RegisterData) => {
    try {
      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Update Firebase profile
      await updateProfile(userCredential.user, {
        displayName: `${userData.firstName} ${userData.lastName}`,
      });

      // Create user document in Firestore (usar servicio)
      const { createUser } = await import('@/services/firestore/users');
      await createUser({
        uid,
        email,
        emailVerified: false,
        firstName: userData.firstName,
        lastName: userData.lastName,
        fullName: `${userData.firstName} ${userData.lastName}`,
        phone: userData.phone,
        role: 'user',
        profileType: 'individual',
        hasActiveSubscription: false,
        isActive: true,
      });

      // Send verification email
      await sendEmailVerification(userCredential.user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { uid, email, displayName, photoURL } = result.user;

      // Check if user exists in Firestore
      const existingUser = await fetchUserData(uid);

      if (!existingUser && email) {
        // Create user document for new Google user
        const names = displayName?.split(' ') || ['Usuario', 'Google'];
        const { createUser } = await import('@/services/firestore/users');
        await createUser({
          uid,
          email,
          emailVerified: true,
          firstName: names[0],
          lastName: names.slice(1).join(' ') || names[0],
          fullName: displayName || email,
          photoURL: photoURL || undefined,
          role: 'user',
          profileType: 'individual',
          hasActiveSubscription: false,
          isActive: true,
        });
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Verify email
  const verifyEmail = async () => {
    if (firebaseUser) {
      try {
        await sendEmailVerification(firebaseUser);
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (firebaseUser) {
      const userData = await fetchUserData(firebaseUser.uid);
      setUser(userData);
    }
  };

  // Update user profile
  const updateUserProfile = async (data: Partial<User>) => {
    if (user) {
      const { updateUser } = await import('@/services/firestore/users');
      await updateUser(user.uid, data);
      await refreshUser();
    }
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    login,
    register,
    logout,
    loginWithGoogle,
    resetPassword,
    verifyEmail,
    refreshUser,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
