// Emergency Profile Types - Sincronizado con database-schema.md
import type { WebIDStatus } from './webId';

export type BloodType = 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
export type AllergySeverity = 'leve' | 'moderada' | 'grave';

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
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
  prescribedBy?: string;
}

export interface MedicalCondition {
  name: string;
  diagnosedDate?: Date;
  notes?: string;
}

export interface EmergencyProfile {
  id: string;
  userId: string;
  webIdCode: string; // "ABC123XYZ"
  
  // Información personal
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  bloodType: BloodType;
  photoURL?: string;
  
  // Información médica
  allergies: Allergy[];
  medications: Medication[];
  medicalConditions: MedicalCondition[];
  medicalNotes?: string;
  
  // Contactos de emergencia
  emergencyContacts: EmergencyContact[];
  
  // Metadata
  isPublic: boolean;
  webIdStatus: WebIDStatus;
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt?: Date;
  accessCount: number;
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
