import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  limit,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { EmergencyProfile } from '@/types';

const COLLECTION = 'emergencyProfiles';

// Get profile by WebID (CRÍTICO - página pública < 2s)
export const getProfileByWebId = async (webId: string): Promise<EmergencyProfile | null> => {
  try {
    const profilesQuery = query(
      collection(db, COLLECTION),
      where('webId', '==', webId),
      where('isActive', '==', true),
      limit(1)
    );
    
    const querySnapshot = await getDocs(profilesQuery);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as EmergencyProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting profile by WebID:', error);
    throw error;
  }
};

// Create emergency profile
export const createEmergencyProfile = async (
  profileData: Omit<EmergencyProfile, 'profileId' | 'createdAt' | 'updatedAt' | 'totalAccesses'>
): Promise<string> => {
  try {
    const profileRef = doc(collection(db, COLLECTION));
    const profileId = profileRef.id;
    
    await setDoc(profileRef, {
      ...profileData,
      profileId,
      totalAccesses: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return profileId;
  } catch (error) {
    console.error('Error creating emergency profile:', error);
    throw error;
  }
};

// Update emergency profile
export const updateEmergencyProfile = async (
  profileId: string,
  data: Partial<EmergencyProfile>
): Promise<void> => {
  try {
    const profileRef = doc(db, COLLECTION, profileId);
    await updateDoc(profileRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating emergency profile:', error);
    throw error;
  }
};

// Get profile by user ID
export const getProfileByUserId = async (userId: string): Promise<EmergencyProfile | null> => {
  try {
    const profilesQuery = query(
      collection(db, COLLECTION),
      where('userId', '==', userId),
      limit(1)
    );
    
    const querySnapshot = await getDocs(profilesQuery);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as EmergencyProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting profile by user ID:', error);
    throw error;
  }
};

// Increment access counter (no bloquea renderizado)
export const incrementProfileAccess = async (profileId: string): Promise<void> => {
  try {
    const profileRef = doc(db, COLLECTION, profileId);
    await updateDoc(profileRef, {
      totalAccesses: increment(1),
      lastAccessedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error incrementing profile access:', error);
    // Don't throw - esto no debe bloquear la página de emergencia
  }
};
