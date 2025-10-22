import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { WebID } from '@/types';
import { generateWebIDCode } from '@/types/webId';

const COLLECTION = 'webIds';

// Create WebID
export const createWebId = async (
  webIdData: Omit<WebID, 'generatedAt'>
): Promise<void> => {
  try {
    const webIdRef = doc(db, COLLECTION, webIdData.code);
    await setDoc(webIdRef, {
      ...webIdData,
      generatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating WebID:', error);
    throw error;
  }
};

// Get WebID
export const getWebId = async (code: string): Promise<WebID | null> => {
  try {
    const webIdRef = doc(db, COLLECTION, code);
    const webIdSnap = await getDoc(webIdRef);
    
    if (webIdSnap.exists()) {
      return webIdSnap.data() as WebID;
    }
    return null;
  } catch (error) {
    console.error('Error getting WebID:', error);
    throw error;
  }
};

// Update WebID
export const updateWebId = async (
  code: string,
  data: Partial<WebID>
): Promise<void> => {
  try {
    const webIdRef = doc(db, COLLECTION, code);
    await updateDoc(webIdRef, data);
  } catch (error) {
    console.error('Error updating WebID:', error);
    throw error;
  }
};

// Generate unique WebID
export const generateUniqueWebId = async (): Promise<string> => {
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    const code = generateWebIDCode();
    const existing = await getWebId(code);
    
    if (!existing) {
      return code;
    }
    
    attempts++;
  }
  
  throw new Error('Failed to generate unique WebID after max attempts');
};

// Get WebIDs by user
export const getWebIdsByUser = async (userId: string): Promise<WebID[]> => {
  try {
    const webIdsQuery = query(
      collection(db, COLLECTION),
      where('userId', '==', userId),
      orderBy('generatedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(webIdsQuery);
    return querySnapshot.docs.map(doc => doc.data() as WebID);
  } catch (error) {
    console.error('Error getting WebIDs by user:', error);
    throw error;
  }
};
