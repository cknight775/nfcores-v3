import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const logEmergencyAccess = async (
  webId: string,
  data: {
    profileId: string;
    userId: string;
  }
): Promise<void> => {
  try {
    // Obtener geolocation (si está disponible)
    let geolocation: { latitude: number; longitude: number } | null = null;
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            maximumAge: 0,
          });
        });
        geolocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      } catch (geoError) {
        console.warn('Geolocation not available:', geoError);
      }
    }

    // Crear log
    await addDoc(collection(db, 'accessLogs'), {
      webId,
      userId: data.userId,
      profileId: data.profileId,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      geolocation,
      contactsCalled: [],
      documentsViewed: [],
    });
  } catch (error) {
    console.error('Error logging access:', error);
    // No lanzar error - no debe bloquear la UI
  }
};
