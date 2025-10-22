import { Timestamp } from 'firebase/firestore';
import type { PackType } from './user';

export type DiscountType = 'percentage' | 'fixed';

export interface Coupon {
  // Identificación
  code: string; // "BIENVENIDA10" (uppercase)
  
  // Tipo de descuento
  discountType: DiscountType;
  discountValue: number; // 10 (%) o 5000 (CLP)
  
  // Validez
  validFrom: Timestamp;
  validUntil: Timestamp;
  isActive: boolean;
  
  // Límites
  usageLimit: number;
  usedCount: number;
  usagePerUser: number; // 1
  
  // Aplicabilidad
  applicablePacks: PackType[];
  minPurchaseAmount?: number; // CLP
  
  // Metadata
  description?: string;
  createdAt: Timestamp;
  createdBy: string;
  updatedAt: Timestamp;
}

export interface CouponUsage {
  usageId: string;
  userId: string;
  orderId: string;
  discountApplied: number; // CLP
  usedAt: Timestamp;
}
