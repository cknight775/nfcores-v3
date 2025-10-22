import { Timestamp } from 'firebase/firestore';

export type FAQCategory = 'general' | 'technical' | 'billing' | 'shipping';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
  isPublic: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
}
