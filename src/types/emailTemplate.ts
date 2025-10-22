import { Timestamp } from 'firebase/firestore';

export type EmailCategory = 'transactional' | 'marketing' | 'system';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlTemplate: string;
  textTemplate: string;
  variables: string[]; // ["userName", "orderId"]
  active: boolean;
  category: EmailCategory;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
}
