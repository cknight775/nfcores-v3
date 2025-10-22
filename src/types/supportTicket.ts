import { Timestamp } from 'firebase/firestore';

export type TicketCategory = 'technical' | 'billing' | 'shipping' | 'account' | 'other';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'waiting_user' | 'resolved' | 'closed';

export interface TicketMessage {
  messageId: string;
  from: string; // userId o "system"
  fromName: string;
  message: string;
  attachments?: string[];
  timestamp: Timestamp;
}

export interface SupportTicket {
  ticketId: string; // "TICKET-00123"
  
  userId: string;
  userName: string;
  userEmail: string;
  
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  
  status: TicketStatus;
  
  assignedTo?: string;
  assignedAt?: Timestamp;
  
  messages: TicketMessage[];
  lastMessageAt: Timestamp;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  resolvedAt?: Timestamp;
  closedAt?: Timestamp;
}
