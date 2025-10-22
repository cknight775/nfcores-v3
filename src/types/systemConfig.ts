import { Timestamp } from 'firebase/firestore';

// Pricing Config
export interface PricingConfig {
  individual: {
    price: number;
    currency: 'CLP';
    features: string[];
  };
  familiar: {
    price: number;
    originalPrice: number;
    savingsAmount: number;
    currency: 'CLP';
    badge?: string;
    features: string[];
  };
  empresarial: {
    priceFrom: number;
    currency: 'CLP';
    contactSales: boolean;
    features: string[];
  };
  updatedAt: Timestamp;
  updatedBy: string;
}

// Límites Config (sincronizado con constants.ts)
export interface LimitsConfig {
  individual: {
    profiles: number;
    webIds: number;
    maxDocuments: number;
    maxFileSizeMB: number;
    totalStorageMB: number;
    maxContacts: number;
  };
  familiar: {
    profiles: number;
    webIds: number;
    maxDocuments: number;
    maxFileSizeMB: number;
    totalStorageMB: number;
    maxContacts: number;
  };
  empresarial: {
    profiles: number;
    webIdsMin: number;
    maxDocuments: number;
    maxFileSizeMB: number;
    totalStorageGB: number;
    maxContacts: number;
  };
  updatedAt: Timestamp;
  updatedBy: string;
}

// Branding Config
export interface BrandingConfig {
  logo: {
    main: string;
    white: string;
    favicon: string;
  };
  colors: {
    primary: string;
    primaryHover: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  updatedAt: Timestamp;
  updatedBy: string;
}

// Features Config (Feature Flags)
export interface FeaturesConfig {
  referralProgramEnabled: boolean;
  autoRenewalEnabled: boolean;
  telemedicineIntegrationEnabled: boolean;
  bulkImportCSV: boolean;
  maintenanceMode: boolean;
  paymentMethods: {
    mercadopago: boolean;
    paypal: boolean;
  };
  updatedAt: Timestamp;
  updatedBy: string;
}

// Contact Config
export interface ContactConfig {
  companyInfo: {
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  updatedAt: Timestamp;
  updatedBy: string;
}

// Footer Config
export interface FooterConfig {
  companyInfo: {
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
  };
  links: {
    product: Array<{ label: string; url: string }>;
    legal: Array<{ label: string; url: string }>;
    support: Array<{ label: string; url: string }>;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  copyrightText: string;
  updatedAt: Timestamp;
  updatedBy: string;
}

// SEO Config
export interface SEOConfig {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  ogImage: string;
  twitterCard: string;
  pages: {
    [key: string]: {
      title: string;
      description: string;
      keywords?: string[];
    };
  };
  updatedAt: Timestamp;
  updatedBy: string;
}

// Inventory Config
export interface InventoryConfig {
  totalBracelets: number;
  available: number;
  assigned: number;
  shipped: number;
  pending: number;
  lastRestockDate: Timestamp;
  nextRestockDate?: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
}
