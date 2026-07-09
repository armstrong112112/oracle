import type { Category } from '@/entities/verification/data/categories'

export interface VerificationData {
  category?: Category[];
  verificationPeriod?: string;
  description?: string;
  links?: Array<{ link: string; description: string }>;
  contacts?: {
    telegram: string;
    matrix: string;
    signal: string;
    whatsapp: string;
    forum1: string;
    forum2: string;
  };
  screenshots?: string[];
  isProcessed?: boolean;
}

export interface CreationData {
  promoText: string;
  links: Array<{ link: string; description: string }>;
  moderatorText: string;
  screenshots: string[];
  isCreationProcessed?: boolean;
}
