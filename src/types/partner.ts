import { Timestamp } from 'firebase/firestore';

export type PartnerCategory = 'health' | 'insurance' | 'sports' | 'corporate' | 'other';

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  category: PartnerCategory;
  featured: boolean;
  isPublic: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
}
