// NFCores - Constantes Oficiales
// Sincronizado con .github/database-schema.md y systemConfig/

// ============================================
// LÍMITES OFICIALES POR PACK
// Sincronizados con systemConfig/limits
// ============================================
export const OFFICIAL_LIMITS = {
  individual: {
    profiles: 1,
    webIds: 1,
    maxDocuments: 10,
    maxFileSizeMB: 5,
    totalStorageMB: 50,
    maxContacts: 5,
  },
  familiar: {
    profiles: 5,
    webIds: 5,
    maxDocuments: 50,
    maxFileSizeMB: 5,
    totalStorageMB: 200,
    maxContacts: 25,
  },
  empresarial: {
    profiles: Infinity,
    webIdsMin: 10,
    webIds: 'según contrato',
    maxDocuments: Infinity,
    maxFileSizeMB: 10,
    totalStorageGB: 5,
    maxContacts: Infinity,
  },
} as const;

// ============================================
// PRECIOS DEFAULT
// Sincronizados con systemConfig/pricing
// ============================================
export const DEFAULT_PRICING = {
  individual: {
    price: 29990,
    currency: 'CLP',
    period: '12 meses',
    features: [
      '1 perfil de emergencia',
      '1 pulsera NFC',
      '5 contactos de emergencia',
      '10 documentos médicos',
      '50MB de almacenamiento',
      'Acceso 24/7',
      'Notificaciones de acceso',
    ],
  },
  familiar: {
    price: 69990,
    originalPrice: 119960,
    savingsAmount: 49970,
    currency: 'CLP',
    period: '12 meses',
    features: [
      '5 perfiles de emergencia',
      '5 pulseras NFC',
      '25 contactos de emergencia',
      '50 documentos médicos',
      '200MB de almacenamiento',
      'Panel de administración familiar',
      'Gestión de miembros',
      'Acceso 24/7',
      'Notificaciones de acceso',
    ],
  },
  empresarial: {
    priceFrom: 399990,
    currency: 'CLP',
    period: '12 meses',
    customQuote: true,
    features: [
      'Perfiles ilimitados',
      'Mínimo 10 pulseras NFC',
      'Contactos ilimitados',
      'Documentos ilimitados',
      '5GB de almacenamiento',
      'Panel de administración empresarial',
      'Importación masiva (CSV)',
      'Reportes y analytics',
      'Soporte prioritario',
      'Capacitación personalizada',
      'API de integración',
    ],
  },
} as const;

// ============================================
// FORMATOS DE IDENTIFICADORES OFICIALES
// ============================================
export const ID_FORMATS = {
  webId: /^[A-Z0-9]{9}$/,                    // "ABC123XYZ"
  familyPanel: /^FAM-\d{5}$/,                // "FAM-00001"
  enterprisePanel: /^EMP-\d{5}$/,            // "EMP-00001"
  order: /^ORD-\d{8}-\d{5}$/,                // "ORD-20251021-00001"
  ticket: /^TICKET-\d{6}$/,                  // "TICKET-000001"
  coupon: /^[A-Z0-9]{6,12}$/,                // "PROMO2024" o "DESCUENTO50"
} as const;

// ============================================
// ROLES DE SISTEMA (Permisos técnicos)
// ============================================
export const SYSTEM_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
  MODERATOR: 'moderator',
  CONTENT_EDITOR: 'content_editor',
} as const;

export type SystemRole = (typeof SYSTEM_ROLES)[keyof typeof SYSTEM_ROLES];

// ============================================
// TIPOS DE PERFIL (Contexto de negocio)
// ============================================
export const PROFILE_TYPES = {
  INDIVIDUAL: 'individual',
  FAMILIAR_ADMIN: 'familiar_admin',
  FAMILIAR_MEMBER: 'familiar_member',
  EMPRESARIAL_ADMIN: 'empresarial_admin',
  EMPRESARIAL_EMPLOYEE: 'empresarial_employee',
} as const;

export type ProfileType = (typeof PROFILE_TYPES)[keyof typeof PROFILE_TYPES];

// ============================================
// TIPOS DE PACK
// ============================================
export const PACK_TYPES = {
  INDIVIDUAL: 'individual',
  FAMILIAR: 'familiar',
  EMPRESARIAL: 'empresarial',
} as const;

export type PackType = (typeof PACK_TYPES)[keyof typeof PACK_TYPES];

// ============================================
// ESTADOS DE WEBID
// ============================================
export const WEBID_STATUS = {
  PENDING_ACTIVATION: 'pending_activation',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DEACTIVATED: 'deactivated',
  EXPIRED: 'expired',
} as const;

export type WebIDStatus = (typeof WEBID_STATUS)[keyof typeof WEBID_STATUS];

// ============================================
// ESTADOS DE PAGO (MercadoPago)
// ============================================
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  AUTHORIZED: 'authorized',
  IN_PROCESS: 'in_process',
  IN_MEDIATION: 'in_mediation',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  CHARGED_BACK: 'charged_back',
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

// ============================================
// ESTADOS DE ENVÍO (Chilexpress)
// ============================================
export const SHIPPING_STATUS = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  FAILED: 'failed',
} as const;

export type ShippingStatus = (typeof SHIPPING_STATUS)[keyof typeof SHIPPING_STATUS];

// ============================================
// TIPOS SANGUÍNEOS
// ============================================
export const BLOOD_TYPES = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] as const;

export type BloodType = (typeof BLOOD_TYPES)[number];

// ============================================
// SEVERIDAD DE ALERGIAS
// ============================================
export const ALLERGY_SEVERITY = {
  LEVE: 'leve',
  MODERADA: 'moderada',
  GRAVE: 'grave',
} as const;

export type AllergySeverity = (typeof ALLERGY_SEVERITY)[keyof typeof ALLERGY_SEVERITY];

// ============================================
// PERFORMANCE TARGETS
// ============================================
export const PERFORMANCE_TARGETS = {
  emergencyProfile: {
    loadTime: 2000, // < 2 segundos CRÍTICO
    uptime: 0.999, // 99.9%
  },
  dashboard: {
    loadTime: 3000, // < 3 segundos
    uptime: 0.99, // 99%
  },
  admin: {
    loadTime: 5000, // < 5 segundos
    uptime: 0.98, // 98%
  },
} as const;

// ============================================
// BUNDLE SIZE LIMITS
// ============================================
export const BUNDLE_SIZE_LIMITS = {
  main: 250 * 1024, // 250 KB
  vendor: 500 * 1024, // 500 KB
  total: 1000 * 1024, // 1 MB
} as const;

// ============================================
// COVERAGE TARGETS (Testing)
// ============================================
export const COVERAGE_TARGETS = {
  services: 80, // Servicios Firestore: 80%
  hooks: 75, // Hooks: 75%
  components: 70, // Componentes: 70%
  utils: 90, // Utilidades: 90%
} as const;

// ============================================
// REGIONES FIREBASE
// ============================================
export const FIREBASE_REGIONS = {
  PRIMARY: 'southamerica-east1', // São Paulo, Brasil
  BACKUP: 'us-east1', // Carolina del Sur, USA
} as const;

// ============================================
// COLLECTIONS FIRESTORE
// ============================================
export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  EMERGENCY_PROFILES: 'emergencyProfiles',
  WEB_IDS: 'webIds',
  FAMILY_PANELS: 'familyPanels',
  ENTERPRISE_PANELS: 'enterprisePanels',
  ORDERS: 'orders',
  COUPONS: 'coupons',
  ACCESS_LOGS: 'accessLogs',
  NOTIFICATIONS: 'notifications',
  SUPPORT_TICKETS: 'supportTickets',
  AUDIT_LOGS: 'auditLogs',
  SYSTEM_CONFIG: 'systemConfig',
  EMAIL_TEMPLATES: 'emailTemplates',
  FAQS: 'faqs',
  TESTIMONIALS: 'testimonials',
  PARTNERS: 'partners',
} as const;

// ============================================
// STORAGE PATHS
// ============================================
export const STORAGE_PATHS = {
  DOCUMENTS: 'documents',
  PHOTOS: 'photos',
  EMERGENCY_PHOTOS: 'emergency-photos',
  BRANDING: 'branding',
  CONTENT: 'content',
  SUPPORT_ATTACHMENTS: 'support-attachments',
  TEMP: 'temp',
} as const;

// ============================================
// ERROR MESSAGES
// ============================================
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'No tienes autorización para realizar esta acción',
  INVALID_WEBID: 'Código WebID inválido. Debe tener 9 caracteres alfanuméricos',
  INVALID_PANEL_ID: 'ID de panel inválido',
  LIMIT_REACHED: 'Has alcanzado el límite de tu pack',
  SUBSCRIPTION_EXPIRED: 'Tu suscripción ha expirado',
  NOT_FOUND: 'Recurso no encontrado',
  ALREADY_EXISTS: 'El recurso ya existe',
  INVALID_INPUT: 'Datos de entrada inválidos',
  SERVER_ERROR: 'Error del servidor. Por favor intenta nuevamente',
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet',
} as const;

// ============================================
// SUCCESS MESSAGES
// ============================================
export const SUCCESS_MESSAGES = {
  PROFILE_CREATED: 'Perfil de emergencia creado exitosamente',
  PROFILE_UPDATED: 'Perfil de emergencia actualizado',
  CONTACT_ADDED: 'Contacto de emergencia agregado',
  DOCUMENT_UPLOADED: 'Documento subido exitosamente',
  WEBID_ACTIVATED: 'WebID activado correctamente',
  ORDER_CREATED: 'Orden creada exitosamente',
  PAYMENT_APPROVED: 'Pago aprobado',
  CHANGES_SAVED: 'Cambios guardados',
} as const;

// ============================================
// VALIDATION RULES
// ============================================
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_CL: /^\+56\d{9}$/,
  RUT: /^\d{7,8}-[\dkK]$/,
  PASSWORD_MIN_LENGTH: 8,
  WEBID_LENGTH: 9,
  PANEL_ID_LENGTH: 9,
} as const;

// ============================================
// DEFAULT VALUES
// ============================================
export const DEFAULTS = {
  PHOTO_URL: '/default-avatar.png',
  LANGUAGE: 'es-CL',
  TIMEZONE: 'America/Santiago',
  CURRENCY: 'CLP',
  COUNTRY: 'Chile',
} as const;
