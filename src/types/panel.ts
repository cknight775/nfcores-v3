import { Timestamp } from 'firebase/firestore';
import type { ProfileType, PackType } from '@/config/constants';

// Estado de pack (definido en database-schema.md)
export type PackStatus = 'active' | 'expired' | 'cancelled';

// Tipos de panel
export type PanelType = 'familiar' | 'empresarial';

// IDs de panel (formato oficial)
export type FamilyPanelId = `FAM-${string}`;
export type EnterprisePanelId = `EMP-${string}`;
export type PanelId = FamilyPanelId | EnterprisePanelId;

// Miembro de panel familiar
export interface FamilyMember {
  userId: string;
  webId?: string;
  relationship: string; // "Padre", "Madre", "Hijo", etc.
  isAdmin: boolean;
  addedAt: Timestamp;
  addedBy: string;
}

// Panel Familiar (FAM-XXXXX)
export interface FamilyPanel {
  panelId: FamilyPanelId;
  panelType: 'familiar';
  
  // Administración
  ownerId: string;
  adminIds: string[];
  
  // Miembros (máx 5)
  members: FamilyMember[];
  memberCount: number; // 0-5
  
  // WebIDs (siempre 5 para familiar)
  webIdsAllocated: 5;
  webIdsUsed: number; // 0-5
  webIds: string[];
  
  // Suscripción
  purchaseDate: Timestamp;
  expirationDate: Timestamp;
  status: PackStatus;
  
  // Configuración
  settings: {
    allowMemberSelfEdit: boolean;
    notifyAllAdminsOnAccess: boolean;
  };
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Roles internos de panel empresarial
export type EnterprisePanelRole = 'full_admin' | 'moderator' | 'readonly';

// Admin de panel empresarial
export interface EnterpriseAdmin {
  userId: string;
  role: EnterprisePanelRole;
  addedAt: Timestamp;
  addedBy: string;
}

// Empleado
export interface Employee {
  userId: string;
  webId?: string;
  employeeId?: string; // ID interno empresa
  rut?: string;
  area: string; // "Obras", "Administración", etc.
  position?: string;
  isActive: boolean;
  addedAt: Timestamp;
  addedBy: string;
  deactivatedAt?: Timestamp;
}

// Panel Empresarial (EMP-XXXXX)
export interface EnterprisePanel {
  panelId: EnterprisePanelId;
  panelType: 'empresarial';
  
  // Empresa
  companyName: string;
  companyRut?: string;
  companyAddress?: string;
  
  // Administración
  ownerId: string;
  adminIds: string[];
  admins: EnterpriseAdmin[];
  
  // Empleados
  employees: Employee[];
  employeeCount: number;
  
  // WebIDs (10+)
  webIdsAllocated: number; // 10, 20, 50, 100+
  webIdsUsed: number;
  webIds: string[];
  
  // Suscripción
  purchaseDate: Timestamp;
  expirationDate: Timestamp;
  status: PackStatus;
  
  // Billing
  billing: {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
  };
  
  // Configuración
  settings: {
    allowEmployeeSelfEdit: boolean;
    requireAdminApprovalForChanges: boolean;
  };
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Union type
export type Panel = FamilyPanel | EnterprisePanel;
