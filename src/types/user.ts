// User Types - Sincronizado con user-roles.md

export type SystemRole = 'user' | 'admin' | 'super_admin' | 'moderator' | 'content_editor';

export type ProfileType =
  | 'individual'
  | 'familiar_admin'
  | 'familiar_member'
  | 'empresarial_admin'
  | 'empresarial_employee';

export type PackType = 'individual' | 'familiar' | 'empresarial';

export interface User {
  uid: string;
  email: string;
  role: SystemRole;
  profileType: ProfileType;
  packType: PackType;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  
  // Pack específico
  panelId?: string; // "FAM-00001" | "EMP-00001"
  webIdCode?: string; // "ABC123XYZ" (9 caracteres)
  
  // Metadata
  isActive: boolean;
  subscriptionStatus: 'active' | 'expired' | 'cancelled';
  subscriptionEndDate: Date | null;
}

export interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  rut?: string;
  dateOfBirth?: Date;
  address?: string;
  city?: string;
  region?: string;
  country: string;
}
