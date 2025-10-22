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
  emailVerified: boolean;
  
  // Información Personal
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  photoURL?: string;
  
  // ROLES DEL SISTEMA (Permisos técnicos)
  role: SystemRole;
  
  // TIPO DE PERFIL (Contexto de negocio)
  profileType: ProfileType;
  
  // Pack y Suscripción
  hasActiveSubscription: boolean;
  subscriptionExpiresAt?: Date;
  
  pack?: {
    type: PackType;
    purchaseDate: Date;
    expirationDate: Date;
    webIdsAllocated: number;
    webIdsUsed: number;
    status: 'active' | 'expired' | 'cancelled';
  };
  
  // WebID Principal (para usuarios individuales)
  webId?: string; // "ABC123XYZ"
  
  // Panel (para usuarios familiares/empresariales)
  panelId?: string; // "FAM-00001" | "EMP-00001"
  
  // Admin Delegado (solo para miembros de panel)
  isAdmin?: boolean;
  delegatedBy?: string;
  delegatedAt?: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
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
