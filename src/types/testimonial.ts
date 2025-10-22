import { Timestamp } from 'firebase/firestore';

export interface Testimonial {
  id: string;
  userName: string;
  userPhoto?: string;
  userRole?: string; // "Madre de 3", "Deportista"
  rating: number; // 1-5
  comment: string;
  featured: boolean;
  isPublic: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
}
