// Emergency Profile Types - Sincronizado con database-schema.md
import { Timestamp } from 'firebase/firestore';

export type BloodType = 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
export type AllergySeverity = 'leve' | 'moderada' | 'grave';

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  priority: number;
  notifyOnAccess: boolean;
}

export interface Allergy {
  name: string;
  severity: AllergySeverity;
  notes?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  reason?: string;
}

export interface MedicalDocument {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  url: string;
  storageRef: string;
  size: number;
  uploadedAt: Timestamp;
  isPublic: boolean;
}

export interface PrivacySettings {
  showPhoto: boolean;
  showFullName: boolean;
  showMedications: boolean;
  showConditions: boolean;
  showDocuments: boolean;
  showEmergencyNotes: boolean;
  maxContactsVisible: number;
  enableGeolocation: boolean;
}

export interface EmergencyProfile {
  profileId: string;
  webId: string; // "ABC123XYZ"
  userId: string;
  panelId?: string;
  
  // Información Personal Pública
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate: Timestamp;
  photoURL?: string;
  bloodType: BloodType;
  
  // Información Médica
  allergies: Allergy[];
  medications: Medication[];
  medicalConditions: string[];
  emergencyNotes?: string;
  
  // Contactos de Emergencia
  emergencyContacts: EmergencyContact[];
  
  // Documentos Médicos
  documents?: MedicalDocument[];
  
  // Configuración de Privacidad
  privacySettings: PrivacySettings;
  
  // Estado
  isActive: boolean;
  isPublic: boolean;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastAccessedAt?: Timestamp;
  totalAccesses: number;
}

export interface AccessLog {
  id: string;
  webIdCode: string;
  profileId: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  location?: {
    latitude: number;
    longitude: number;
    city?: string;
    country?: string;
  };
}
