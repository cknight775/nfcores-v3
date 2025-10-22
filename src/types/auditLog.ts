import { Timestamp } from 'firebase/firestore';
import type { SystemRole } from './user';

export type AuditAction =
  | 'create_user'
  | 'delete_user'
  | 'create_panel'
  | 'delete_panel'
  | 'generate_webid'
  | 'assign_webid'
  | 'deactivate_webid'
  | 'access_medical_data'
  | 'export_data'
  | 'change_permissions'
  | 'config_change'
  | 'update_pricing'
  | 'create_coupon';

export interface AuditLog {
  logId: string;
  action: AuditAction;
  
  performedBy: {
    userId: string;
    userName: string;
    role: SystemRole;
    panelId?: string;
  };
  
  target: {
    type: 'user' | 'panel' | 'webid' | 'config' | 'order' | 'coupon';
    id: string;
    details?: Record<string, any>;
  };
  
  changes?: {
    before: any;
    after: any;
  };
  
  timestamp: Timestamp;
  ip: string;
  userAgent: string;
}
