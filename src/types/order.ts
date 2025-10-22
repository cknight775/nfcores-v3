import { Timestamp } from 'firebase/firestore';
import type { PackType } from '@/config/constants';

// Dirección de envío
export interface Address {
  street: string;
  number: string;
  apartment?: string;
  comuna: string;
  region: string;
  postalCode?: string;
  country: string; // "Chile"
  phone: string;
  instructions?: string;
}

// Orden de compra
export interface Order {
  // Identificación
  orderId: string; // "ORD-202501-12345"
  
  // Usuario
  userId: string;
  userEmail: string;
  userName: string;
  
  // Producto
  packType: PackType;
  quantity: number;
  
  // Pricing
  subtotal: number; // CLP
  shippingCost: number; // CLP
  discount: number; // CLP
  total: number; // CLP
  
  // Cupón
  couponCode?: string;
  couponDiscount?: number;
  
  // Pago (MercadoPago)
  paymentStatus: string; // usar PaymentStatus de constants si se importa en consumidores
  paymentId?: string;
  paymentMethod?: string; // "credit_card", "debit_card"
  paymentDate?: Timestamp;
  
  // Envío (Chilexpress)
  shippingAddress: Address;
  shippingStatus: string; // usar ShippingStatus de constants si se importa en consumidores
  trackingNumber?: string;
  shippedAt?: Timestamp;
  deliveredAt?: Timestamp;
  
  // WebIDs generados
  webIdsGenerated: string[];
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
