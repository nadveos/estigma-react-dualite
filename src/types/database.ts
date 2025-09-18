// PocketBase Collection Types

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'patient' | 'nurse' | 'admin';
  created: string;
  updated: string;
}

export interface Appointment {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  condition: string;
  urgency: 'low' | 'medium' | 'high';
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  assignedNurse?: string;
  created?: string;
  updated?: string;
}

export interface Testimonial {
  id?: string;
  patientName: string;
  patientAge: number;
  condition: string;
  testimonialText: string;
  rating: number;
  treatmentDuration: string;
  patientImage?: string;
  caseImage?: string;
  isApproved: boolean;
  created?: string;
  updated?: string;
}

export interface Article {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  image?: string;
  isPublished: boolean;
  tags: string[];
  created?: string;
  updated?: string;
}

export interface ChatSession {
  id?: string;
  sessionId: string;
  messages: ChatMessage[];
  userEmail?: string;
  created?: string;
  updated?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}
