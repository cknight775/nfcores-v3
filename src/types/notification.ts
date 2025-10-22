import { Timestamp } from 'firebase/firestore';

export type NotificationType =
  | 'profile_accessed'
  | 'member_added'
  | 'subscription_expiring'
  | 'payment_approved'
  | 'order_shipped'
  | 'order_delivered'
  | 'system_announcement';

export interface Notification {
  notificationId: string;
  userId: string;
  
  type: NotificationType;
  title: string;
  body: string;
  icon?: string;
  
  data?: Record<string, any>;
  
  read: boolean;
  readAt?: Timestamp;
  
  actionUrl?: string;
  actionLabel?: string;
  
  createdAt: Timestamp;
  expiresAt?: Timestamp;
}
