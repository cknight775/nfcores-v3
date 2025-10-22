import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { User } from '@/types';

const COLLECTION = 'users';

// Create user
export const createUser = async (userData: Omit<User, 'createdAt' | 'updatedAt'>): Promise<void> => {
  try {
    const userRef = doc(db, COLLECTION, userData.uid);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Get user by ID
export const getUser = async (uid: string): Promise<User | null> => {
  try {
    const userRef = doc(db, COLLECTION, uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

// Update user
export const updateUser = async (uid: string, data: Partial<User>): Promise<void> => {
  try {
    const userRef = doc(db, COLLECTION, uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (uid: string): Promise<void> => {
  try {
    const userRef = doc(db, COLLECTION, uid);
    await deleteDoc(userRef);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Get users by role
export const getUsersByRole = async (role: User['role'], maxResults: number = 50): Promise<User[]> => {
  try {
    const usersQuery = query(
      collection(db, COLLECTION),
      where('role', '==', role),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(maxResults)
    );
    
    const querySnapshot = await getDocs(usersQuery);
    return querySnapshot.docs.map(doc => doc.data() as User);
  } catch (error) {
    console.error('Error getting users by role:', error);
    throw error;
  }
};

// Get users by panel
export const getUsersByPanel = async (panelId: string): Promise<User[]> => {
  try {
    const usersQuery = query(
      collection(db, COLLECTION),
      where('panelId', '==', panelId),
      where('isActive', '==', true)
    );
    
    const querySnapshot = await getDocs(usersQuery);
    return querySnapshot.docs.map(doc => doc.data() as User);
  } catch (error) {
    console.error('Error getting users by panel:', error);
    throw error;
  }
};

// Update last login
export const updateLastLogin = async (uid: string): Promise<void> => {
  try {
    const userRef = doc(db, COLLECTION, uid);
    await updateDoc(userRef, {
      lastLogin: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating last login:', error);
    // Don't throw - this is not critical
  }
};
