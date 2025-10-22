# Esquema de Base de Datos - NFCores (Firestore)

**Última actualización**: 2025-01-21 16:26:24 UTC  
**Actualizado por**: @cknight775  
**Versión**: 2.0.0 - SINCRONIZADA

---

## 📊 Estructura General

```
nfcores-firestore/
├── users/                          # Usuarios del sistema
├── emergencyProfiles/              # Perfiles públicos de emergencia
├── webIds/                         # WebIDs únicos de pulseras
├── familyPanels/                   # Paneles familiares (FAM-XXXXX)
├── enterprisePanels/               # Paneles empresariales (EMP-XXXXX)
├── orders/                         # Órdenes de compra
├── coupons/                        # Cupones de descuento
├── accessLogs/                     # Logs de accesos a perfiles
├── notifications/                  # Notificaciones de usuarios
├── supportTickets/                 # Tickets de soporte
├── auditLogs/                      # Logs de auditoría (admin)
├── systemConfig/                   # Configuración global del sistema
├── emailTemplates/                 # Plantillas de email administrables
├── faqs/                          # Preguntas frecuentes administrables
├── testimonials/                   # Testimonios de clientes administrables
└── partners/                       # Empresas aliadas administrables
```

---

## 🔐 DEFINICIONES OFICIALES SINCRONIZADAS

```typescript
// ROLES DE SISTEMA (Permisos técnicos)
type SystemRole = 'user' | 'admin' | 'super_admin' | 'moderator' | 'content_editor';

// TIPOS DE PERFIL (Contexto de negocio)
type ProfileType = 
  | 'individual'
  | 'familiar_admin'
  | 'familiar_member'
  | 'empresarial_admin'
  | 'empresarial_employee';

// IDENTIFICADORES DE PANEL (Formato oficial)
type FamilyPanelId = `FAM-${string}`;      // "FAM-00001"
type EnterprisePanelId = `EMP-${string}`;  // "EMP-00001"

// FORMATO DE WEBID (Oficial)
type WebIDCode = string; // 9 caracteres: "ABC123XYZ"
// Pattern: /^[A-Z0-9]{9}$/

// ESTADOS OFICIALES
type WebIDStatus = 
  | 'pending_activation'
  | 'active'
  | 'inactive'
  | 'deactivated'
  | 'expired';

type PaymentStatus = 
  | 'pending'
  | 'approved'
  | 'authorized'
  | 'in_process'
  | 'in_mediation'
  | 'rejected'
  | 'cancelled'
  | 'refunded'
  | 'charged_back';

type ShippingStatus = 
  | 'pending'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'failed';

type PackType = 'individual' | 'familiar' | 'empresarial';

type PackStatus = 'active' | 'expired' | 'cancelled';

// LÍMITES OFICIALES
const OFFICIAL_LIMITS = {
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
};
```

---

## 👤 COLECCIÓN: `users`

### Documento Base
```typescript
interface User {
  // Identificación (del Auth)
  uid: string;                      // Firebase Auth UID (ID del documento)
  email: string;
  emailVerified: boolean;
  
  // Información Personal
  firstName: string;
  lastName: string;
  fullName: string;                 // firstName + lastName
  phone?: string;
  photoURL?: string;
  
  // ROLES DEL SISTEMA (Permisos técnicos)
  role: SystemRole;
  
  // TIPO DE PERFIL (Contexto de negocio)
  profileType: ProfileType;
  
  // Pack y Suscripción
  hasActiveSubscription: boolean;
  subscriptionExpiresAt?: Timestamp;
  
  pack?: {
    type: PackType;
    purchaseDate: Timestamp;
    expirationDate: Timestamp;
    webIdsAllocated: number;
    webIdsUsed: number;
    status: PackStatus;
  };
  
  // WebID Principal (para usuarios individuales)
  webId?: WebIDCode;                // "ABC123XYZ"
  
  // Panel (para usuarios familiares/empresariales)
  panelId?: FamilyPanelId | EnterprisePanelId;
  
  // Admin Delegado (solo para miembros de panel)
  isAdmin?: boolean;
  delegatedBy?: string;             // userId del que delegó
  delegatedAt?: Timestamp;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLogin?: Timestamp;
  isActive: boolean;
}
```

### Ejemplo: Usuario Normal (Individual)
```json
{
  "uid": "user_abc123",
  "email": "juan@email.com",
  "emailVerified": true,
  "firstName": "Juan",
  "lastName": "Pérez",
  "fullName": "Juan Pérez",
  "phone": "+56912345678",
  "photoURL": "https://storage.googleapis.com/...",
  "role": "user",
  "profileType": "individual",
  "hasActiveSubscription": true,
  "subscriptionExpiresAt": "2026-10-16T00:00:00Z",
  "pack": {
    "type": "individual",
    "purchaseDate": "2025-10-16T00:00:00Z",
    "expirationDate": "2026-10-16T00:00:00Z",
    "webIdsAllocated": 1,
    "webIdsUsed": 1,
    "status": "active"
  },
  "webId": "ABC123XYZ",
  "createdAt": "2025-10-16T00:00:00Z",
  "updatedAt": "2025-10-16T00:00:00Z",
  "lastLogin": "2025-10-21T16:00:00Z",
  "isActive": true
}
```

### Ejemplo: Admin de Panel Familiar
```json
{
  "uid": "user_def456",
  "email": "maria@email.com",
  "emailVerified": true,
  "firstName": "María",
  "lastName": "González",
  "fullName": "María González",
  "phone": "+56987654321",
  "role": "user",
  "profileType": "familiar_admin",
  "hasActiveSubscription": true,
  "subscriptionExpiresAt": "2026-10-16T00:00:00Z",
  "pack": {
    "type": "familiar",
    "purchaseDate": "2025-10-16T00:00:00Z",
    "expirationDate": "2026-10-16T00:00:00Z",
    "webIdsAllocated": 5,
    "webIdsUsed": 3,
    "status": "active"
  },
  "webId": "DEF456XYZ",
  "panelId": "FAM-00042",
  "createdAt": "2025-10-16T00:00:00Z",
  "updatedAt": "2025-10-17T00:00:00Z",
  "isActive": true
}
```

### Ejemplo: Miembro de Panel Familiar (Con Admin Delegado)
```json
{
  "uid": "user_ghi789",
  "email": "pedro@email.com",
  "emailVerified": true,
  "firstName": "Pedro",
  "lastName": "Pérez",
  "fullName": "Pedro Pérez",
  "role": "user",
  "profileType": "familiar_member",
  "hasActiveSubscription": false,
  "webId": "GHI789XYZ",
  "panelId": "FAM-00042",
  "isAdmin": true,
  "delegatedBy": "user_def456",
  "delegatedAt": "2025-10-17T10:00:00Z",
  "createdAt": "2025-10-17T00:00:00Z",
  "updatedAt": "2025-10-17T10:00:00Z",
  "isActive": true
}
```

### Índices Compuestos
```javascript
// firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "users",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "role", "order": "ASCENDING" },
        { "fieldPath": "isActive", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "users",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "panelId", "order": "ASCENDING" },
        { "fieldPath": "isActive", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "users",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "profileType", "order": "ASCENDING" },
        { "fieldPath": "hasActiveSubscription", "order": "ASCENDING" }
      ]
    }
  ]
}
```

---

## 🆘 COLECCIÓN: `emergencyProfiles`

### Documento Base
```typescript
interface EmergencyProfile {
  // Identificación
  profileId: string;                // ID del documento
  webId: WebIDCode;                 // "ABC123XYZ" (único)
  userId: string;                   // Owner del perfil
  panelId?: FamilyPanelId | EnterprisePanelId;
  
  // Información Personal Pública
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate: Timestamp;
  photoURL?: string;
  bloodType: 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
  
  // Información Médica
  allergies: Allergy[];
  medications: Medication[];
  medicalConditions: string[];
  emergencyNotes?: string;
  
  // Contactos de Emergencia (máx 5)
  emergencyContacts: EmergencyContact[];
  
  // Documentos Médicos
  documents?: MedicalDocument[];
  
  // Configuración de Privacidad
  privacySettings: {
    showPhoto: boolean;
    showFullName: boolean;          // vs solo firstName
    showMedications: boolean;
    showConditions: boolean;
    showDocuments: boolean;
    showEmergencyNotes: boolean;
    maxContactsVisible: number;     // 1-5
    enableGeolocation: boolean;     // Loguear ubicación de accesos
  };
  
  // Estado
  isActive: boolean;
  isPublic: boolean;                // Perfil completamente público
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastAccessedAt?: Timestamp;
  totalAccesses: number;
}

interface Allergy {
  name: string;
  severity: 'leve' | 'moderada' | 'grave';
  notes?: string;
}

interface Medication {
  name: string;
  dosage: string;                   // "50mg"
  frequency: string;                // "1 vez al día"
  reason?: string;                  // "Hipertensión arterial"
}

interface EmergencyContact {
  name: string;
  relationship: string;             // "Esposa", "Hijo", "Médico", etc.
  phone: string;
  email?: string;
  priority: number;                 // 1-5
  notifyOnAccess: boolean;
}

interface MedicalDocument {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  url: string;                      // Firebase Storage URL
  storageRef: string;               // Storage path
  size: number;                     // bytes
  uploadedAt: Timestamp;
  isPublic: boolean;
}
```

### Ejemplo Completo
```json
{
  "profileId": "profile_abc123",
  "webId": "ABC123XYZ",
  "userId": "user_abc123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "fullName": "Juan Pérez Rodríguez",
  "birthDate": "1992-03-15T00:00:00Z",
  "photoURL": "https://storage.googleapis.com/nfcores/users/user_abc123/photo.jpg",
  "bloodType": "O+",
  "allergies": [
    {
      "name": "Penicilina",
      "severity": "grave",
      "notes": "Anafilaxia previa en 2018"
    },
    {
      "name": "Maní",
      "severity": "moderada",
      "notes": ""
    }
  ],
  "medications": [
    {
      "name": "Losartán",
      "dosage": "50mg",
      "frequency": "1 vez al día",
      "reason": "Hipertensión arterial"
    },
    {
      "name": "Metformina",
      "dosage": "850mg",
      "frequency": "2 veces al día",
      "reason": "Diabetes tipo 2"
    }
  ],
  "medicalConditions": [
    "Hipertensión arterial",
    "Diabetes tipo 2"
  ],
  "emergencyNotes": "Propenso a hipoglucemia. Siempre llevo caramelos en bolsillo derecho.",
  "emergencyContacts": [
    {
      "name": "María González",
      "relationship": "Esposa",
      "phone": "+56987654321",
      "email": "maria@email.com",
      "priority": 1,
      "notifyOnAccess": true
    },
    {
      "name": "Pedro Pérez",
      "relationship": "Hijo",
      "phone": "+56912345678",
      "email": "pedro@email.com",
      "priority": 2,
      "notifyOnAccess": true
    }
  ],
  "documents": [
    {
      "id": "doc_001",
      "name": "Receta_Losartan_2025.pdf",
      "type": "pdf",
      "url": "https://storage.googleapis.com/nfcores/documents/user_abc123/doc_001.pdf",
      "storageRef": "documents/user_abc123/doc_001.pdf",
      "size": 1234567,
      "uploadedAt": "2025-10-16T00:00:00Z",
      "isPublic": true
    }
  ],
  "privacySettings": {
    "showPhoto": true,
    "showFullName": true,
    "showMedications": true,
    "showConditions": true,
    "showDocuments": false,
    "showEmergencyNotes": true,
    "maxContactsVisible": 3,
    "enableGeolocation": false
  },
  "isActive": true,
  "isPublic": true,
  "createdAt": "2025-10-16T00:00:00Z",
  "updatedAt": "2025-10-21T16:00:00Z",
  "lastAccessedAt": "2025-10-20T14:30:00Z",
  "totalAccesses": 5
}
```

### Índices Compuestos
```javascript
{
  "indexes": [
    {
      "collectionGroup": "emergencyProfiles",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "webId", "order": "ASCENDING" },
        { "fieldPath": "isActive", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "emergencyProfiles",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "updatedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "emergencyProfiles",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "panelId", "order": "ASCENDING" },
        { "fieldPath": "isActive", "order": "ASCENDING" }
      ]
    }
  ]
}
```

---

## 🆔 COLECCIÓN: `webIds`

### Documento Base
```typescript
interface WebID {
  // Identificación
  webIdCode: WebIDCode;             // "ABC123XYZ" (ID del documento)
  
  // Asignación
  userId?: string;                  // Usuario asignado (null si pending)
  panelId?: FamilyPanelId | EnterprisePanelId;
  panelType?: 'familiar' | 'empresarial';
  
  // Estado
  status: WebIDStatus;
  
  // Orden y Envío
  orderId?: string;                 // Orden de compra asociada
  shippingStatus?: ShippingStatus;
  trackingNumber?: string;          // Chilexpress tracking
  
  // Metadata
  createdAt: Timestamp;
  activatedAt?: Timestamp;
  deactivatedAt?: Timestamp;
  expiresAt?: Timestamp;            // Fecha de vencimiento de suscripción
  lastUsedAt?: Timestamp;           // Último acceso al perfil público
}
```

### Ejemplo: WebID Activo (Individual)
```json
{
  "webIdCode": "ABC123XYZ",
  "userId": "user_abc123",
  "status": "active",
  "orderId": "ORD-202510-12345",
  "shippingStatus": "delivered",
  "trackingNumber": "CH123456789",
  "createdAt": "2025-10-16T00:00:00Z",
  "activatedAt": "2025-10-18T10:30:00Z",
  "expiresAt": "2026-10-16T00:00:00Z",
  "lastUsedAt": "2025-10-20T14:30:00Z"
}
```

### Ejemplo: WebID Pendiente (Panel Familiar)
```json
{
  "webIdCode": "DEF456XYZ",
  "panelId": "FAM-00042",
  "panelType": "familiar",
  "status": "pending_activation",
  "orderId": "ORD-202510-12346",
  "shippingStatus": "shipped",
  "trackingNumber": "CH987654321",
  "createdAt": "2025-10-16T00:00:00Z"
}
```

### Índices Compuestos
```javascript
{
  "indexes": [
    {
      "collectionGroup": "webIds",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "webIds",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "webIds",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "panelId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    }
  ]
}
```

---

## 👨‍👩‍👧 COLECCIÓN: `familyPanels`

### Documento Base
```typescript
interface FamilyPanel {
  // Identificación
  panelId: FamilyPanelId;           // "FAM-00001" (ID del documento)
  panelType: 'familiar';
  
  // Propietario y Admins
  ownerId: string;                  // Usuario que compró el pack
  adminIds: string[];               // [ownerId, ...delegados]
  
  // Miembros (máximo 5)
  members: FamilyMember[];
  memberCount: number;              // 0-5
  
  // WebIDs (siempre 5 para pack familiar)
  webIdsAllocated: 5;               // CONSTANTE
  webIdsUsed: number;               // 0-5
  webIds: WebIDCode[];
  
  // Suscripción
  purchaseDate: Timestamp;
  expirationDate: Timestamp;
  status: PackStatus;
  
  // Configuración
  settings: {
    allowMemberSelfEdit: boolean;
    notifyAllAdminsOnAccess: boolean;
  };
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface FamilyMember {
  userId: string;
  webId?: WebIDCode;                // Puede estar sin asignar aún
  relationship: string;             // "Padre", "Hijo", "Esposa", etc.
  isAdmin: boolean;
  addedAt: Timestamp;
  addedBy: string;                  // userId
}
```

### Ejemplo Completo
```json
{
  "panelId": "FAM-00042",
  "panelType": "familiar",
  "ownerId": "user_def456",
  "adminIds": ["user_def456", "user_ghi789"],
  "members": [
    {
      "userId": "user_def456",
      "webId": "DEF456XYZ",
      "relationship": "Madre",
      "isAdmin": true,
      "addedAt": "2025-10-16T00:00:00Z",
      "addedBy": "user_def456"
    },
    {
      "userId": "user_ghi789",
      "webId": "GHI789XYZ",
      "relationship": "Padre",
      "isAdmin": true,
      "addedAt": "2025-10-16T00:00:00Z",
      "addedBy": "user_def456"
    },
    {
      "userId": "user_jkl012",
      "webId": "JKL012XYZ",
      "relationship": "Hijo",
      "isAdmin": false,
      "addedAt": "2025-10-17T00:00:00Z",
      "addedBy": "user_def456"
    }
  ],
  "memberCount": 3,
  "webIdsAllocated": 5,
  "webIdsUsed": 3,
  "webIds": ["DEF456XYZ", "GHI789XYZ", "JKL012XYZ"],
  "purchaseDate": "2025-10-16T00:00:00Z",
  "expirationDate": "2026-10-16T00:00:00Z",
  "status": "active",
  "settings": {
    "allowMemberSelfEdit": true,
    "notifyAllAdminsOnAccess": true
  },
  "createdAt": "2025-10-16T00:00:00Z",
  "updatedAt": "2025-10-17T00:00:00Z"
}
```

### Índices Compuestos
```javascript
{
  "indexes": [
    {
      "collectionGroup": "familyPanels",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "ownerId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "familyPanels",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "expirationDate", "order": "ASCENDING" }
      ]
    }
  ]
}
```

---

## 🏢 COLECCIÓN: `enterprisePanels`

### Documento Base
```typescript
interface EnterprisePanel {
  // Identificación
  panelId: EnterprisePanelId;       // "EMP-00001" (ID del documento)
  panelType: 'empresarial';
  
  // Empresa
  companyName: string;
  companyRut?: string;
  companyAddress?: string;
  
  // Propietario y Admins
  ownerId: string;
  adminIds: string[];               // Múltiples admins permitidos
  
  // Administradores con roles internos
  admins: EnterpriseAdmin[];
  
  // Empleados
  employees: Employee[];
  employeeCount: number;
  
  // WebIDs
  webIdsAllocated: number;          // 10, 20, 50, 100, etc. (según contrato)
  webIdsUsed: number;
  webIds: WebIDCode[];
  
  // Suscripción
  purchaseDate: Timestamp;
  expirationDate: Timestamp;
  status: PackStatus;
  
  // Billing
  billing: {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
  };
  
  // Configuración
  settings: {
    allowEmployeeSelfEdit: boolean;
    requireAdminApprovalForChanges: boolean;
  };
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface EnterpriseAdmin {
  userId: string;
  role: 'full_admin' | 'moderator' | 'readonly';
  addedAt: Timestamp;
  addedBy: string;
}

interface Employee {
  userId: string;
  webId?: WebIDCode;
  employeeId?: string;              // ID interno empresa
  rut?: string;
  area: string;                     // "Obras", "Administración", etc.
  position?: string;
  isActive: boolean;
  addedAt: Timestamp;
  addedBy: string;
  deactivatedAt?: Timestamp;
}
```

### Ejemplo Completo
```json
{
  "panelId": "EMP-00008",
  "panelType": "empresarial",
  "companyName": "Constructora ABC S.A.",
  "companyRut": "76.123.456-7",
  "companyAddress": "Av. Apoquindo 3000, Las Condes, Santiago",
  "ownerId": "user_xyz123",
  "adminIds": ["user_xyz123", "user_abc456"],
  "admins": [
    {
      "userId": "user_xyz123",
      "role": "full_admin",
      "addedAt": "2025-10-16T00:00:00Z",
      "addedBy": "user_xyz123"
    },
    {
      "userId": "user_abc456",
      "role": "moderator",
      "addedAt": "2025-10-17T00:00:00Z",
      "addedBy": "user_xyz123"
    }
  ],
  "employees": [
    {
      "userId": "user_emp001",
      "webId": "EMP001XYZ",
      "employeeId": "EMP-001",
      "rut": "12.345.678-9",
      "area": "Obras",
      "position": "Maestro Constructor",
      "isActive": true,
      "addedAt": "2025-10-16T00:00:00Z",
      "addedBy": "user_xyz123"
    },
    {
      "userId": "user_emp002",
      "webId": "EMP002XYZ",
      "employeeId": "EMP-002",
      "rut": "23.456.789-0",
      "area": "Administración",
      "position": "Contador",
      "isActive": true,
      "addedAt": "2025-10-16T00:00:00Z",
      "addedBy": "user_xyz123"
    }
  ],
  "employeeCount": 2,
  "webIdsAllocated": 50,
  "webIdsUsed": 2,
  "webIds": ["EMP001XYZ", "EMP002XYZ"],
  "purchaseDate": "2025-10-16T00:00:00Z",
  "expirationDate": "2026-10-16T00:00:00Z",
  "status": "active",
  "billing": {
    "contactName": "Juan Pérez",
    "contactEmail": "facturacion@constructoraabc.cl",
    "contactPhone": "+56987654321"
  },
  "settings": {
    "allowEmployeeSelfEdit": true,
    "requireAdminApprovalForChanges": false
  },
  "createdAt": "2025-10-16T00:00:00Z",
  "updatedAt": "2025-10-16T00:00:00Z"
}
```

### Índices Compuestos
```javascript
{
  "indexes": [
    {
      "collectionGroup": "enterprisePanels",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "ownerId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "enterprisePanels",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "expirationDate", "order": "ASCENDING" }
      ]
    }
  ]
}
```

---

## 💳 COLECCIÓN: `orders`

### Documento Base
```typescript
interface Order {
  // Identificación
  orderId: string;                  // "ORD-202510-12345" (ID del documento)
  
  // Usuario
  userId: string;
  userEmail: string;
  userName: string;
  
  // Producto
  packType: PackType;
  quantity: number;                 // Cantidad de pulseras
  
  // Pricing
  subtotal: number;                 // CLP
  shippingCost: number;             // CLP
  discount: number;                 // CLP (si usó cupón)
  total: number;                    // CLP
  
  // Cupón
  couponCode?: string;
  couponDiscount?: number;
  
  // Pago (MercadoPago)
  paymentStatus: PaymentStatus;
  paymentId?: string;               // MercadoPago payment ID
  paymentMethod?: string;           // "credit_card", "debit_card", etc.
  paymentDate?: Timestamp;
  
  // Envío (Chilexpress)
  shippingAddress: Address;
  shippingStatus: ShippingStatus;
  trackingNumber?: string;
  shippedAt?: Timestamp;
  deliveredAt?: Timestamp;
  
  // WebIDs Generados
  webIdsGenerated: WebIDCode[];
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface Address {
  street: string;
  number: string;
  apartment?: string;
  comuna: string;
  region: string;
  postalCode?: string;
  country: string;                  // "Chile"
  phone: string;
  instructions?: string;
}
```

### Ejemplo Completo
```json
{
  "orderId": "ORD-202510-12345",
  "userId": "user_abc123",
  "userEmail": "juan@email.com",
  "userName": "Juan Pérez",
  "packType": "individual",
  "quantity": 1,
  "subtotal": 29990,
  "shippingCost": 3500,
  "discount": 0,
  "total": 33490,
  "paymentStatus": "approved",
  "paymentId": "1234567890",
  "paymentMethod": "credit_card",
  "paymentDate": "2025-10-16T10:30:00Z",
  "shippingAddress": {
    "street": "Av. Providencia",
    "number": "1234",
    "apartment": "Depto 501",
    "comuna": "Providencia",
    "region": "Metropolitana",
    "postalCode": "7500000",
    "country": "Chile",
    "phone": "+56912345678",
    "instructions": "Tocar timbre 501"
  },
  "shippingStatus": "delivered",
  "trackingNumber": "CH123456789",
  "shippedAt": "2025-10-17T08:00:00Z",
  "deliveredAt": "2025-10-19T15:30:00Z",
  "webIdsGenerated": ["ABC123XYZ"],
  "createdAt": "2025-10-16T10:00:00Z",
  "updatedAt": "2025-10-19T15:30:00Z"
}
```

### Índices Compuestos
```javascript
{
  "indexes": [
    {
      "collectionGroup": "orders",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "orders",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "paymentStatus", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "orders",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "shippingStatus", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

---

## 🎟️ COLECCIÓN: `coupons`

### Documento Base
```typescript
interface Coupon {
  // Identificación
  code: string;                     // "BIENVENIDA10" (ID del documento, uppercase)
  
  // Tipo de Descuento
  discountType: 'percentage' | 'fixed';
  discountValue: number;            // 10 (%) o 5000 (CLP)
  
  // Validez
  validFrom: Timestamp;
  validUntil: Timestamp;
  isActive: boolean;
  
  // Límites
  usageLimit: number;               // Usos totales permitidos
  usedCount: number;
  usagePerUser: number;             // Usos por usuario (generalmente 1)
  
  // Aplicabilidad
  applicablePacks: PackType[];
  minPurchaseAmount?: number;       // Monto mínimo de compra (CLP)
  
  // Metadata
  description?: string;
  createdAt: Timestamp;
  createdBy: string;                // Admin userId que lo creó
  updatedAt: Timestamp;
}
```

### Subcolección: `coupons/{code}/usages`
```typescript
interface CouponUsage {
  usageId: string;                  // ID del documento
  userId: string;
  orderId: string;
  discountApplied: number;          // CLP
  usedAt: Timestamp;
}
```

### Ejemplo de Cupón
```json
{
  "code": "BIENVENIDA10",
  "discountType": "percentage",
  "discountValue": 10,
  "validFrom": "2025-10-01T00:00:00Z",
  "validUntil": "2025-12-31T23:59:59Z",
  "isActive": true,
  "usageLimit": 1000,
  "usedCount": 245,
  "usagePerUser": 1,
  "applicablePacks": ["individual", "familiar"],
  "minPurchaseAmount": 20000,
  "description": "10% de descuento en tu primera compra",
  "createdAt": "2025-10-01T00:00:00Z",
  "createdBy": "admin_xyz",
  "updatedAt": "2025-10-21T16:00:00Z"
}
```

### Índices Compuestos
```javascript
{
  "indexes": [
    {
      "collectionGroup": "coupons",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "isActive", "order": "ASCENDING" },
        { "fieldPath": "validUntil", "order": "ASCENDING" }
      ]
    }
  ]
}
```

---

## 📊 COLECCIÓN: `accessLogs`

### Documento Base
```typescript
interface AccessLog {
  // Identificación
  logId: string;                    // ID del documento (auto)
  
  // WebID Accedido
  webId: WebIDCode;
  userId: string;                   // Owner del perfil
  profileId: string;
  
  // Detalles del Acceso
  timestamp: Timestamp;
  duration?: number;                // Segundos (si se puede medir)
  
  // Geolocalización (OPCIONAL según config usuario)
  geolocation?: {
    latitude: number;
    longitude: number;
    city?: string;
    country?: string;
  };
  
  // Acciones Realizadas
  contactsCalled: number[];         // Priority de contactos llamados
  documentsViewed: string[];        // IDs de documentos vistos
  
  // Metadata Técnica
  userAgent: string;
  ip?: string;                      // IP aproximada (no exacta por privacidad)
  referrer?: string;
}
```

### Ejemplo
```json
{
  "logId": "log_abc123_20251021",
  "webId": "ABC123XYZ",
  "userId": "user_abc123",
  "profileId": "profile_abc123",
  "timestamp": "2025-10-21T14:30:00Z",
  "duration": 180,
  "geolocation": {
    "latitude": -33.4489,
    "longitude": -70.6693,
    "city": "Santiago",
    "country": "Chile"
  },
  "contactsCalled": [1],
  "documentsViewed": ["doc_001"],
  "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15",
  "ip": "190.xxx.xxx.xxx"
}
```

### Índices Compuestos
```javascript
{
  "indexes": [
    {
      "collectionGroup": "accessLogs",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "accessLogs",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "webId", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    }
  ]
}
```

---

## 🔔 COLECCIÓN: `notifications`

### Documento Base
```typescript
interface Notification {
  // Identificación
  notificationId: string;           // ID del documento (auto)
  
  // Destinatario
  userId: string;
  
  // Contenido
  type: 
    | 'profile_accessed'
    | 'member_added'
    | 'subscription_expiring'
    | 'payment_approved'
    | 'order_shipped'
    | 'order_delivered'
    | 'system_announcement';
  
  title: string;
  body: string;
  icon?: string;
  
  // Datos Adicionales
  data?: {
    webId?: WebIDCode;
    orderId?: string;
    panelId?: string;
    [key: string]: any;
  };
  
  // Estado
  read: boolean;
  readAt?: Timestamp;
  
  // CTA (Call to Action)
  actionUrl?: string;
  actionLabel?: string;
  
  // Metadata
  createdAt: Timestamp;
  expiresAt?: Timestamp;            // Auto-delete después de X días
}
```

### Ejemplo
```json
{
  "notificationId": "notif_abc123_001",
  "userId": "user_abc123",
  "type": "profile_accessed",
  "title": "🆘 Tu perfil fue accedido",
  "body": "Alguien accedió a tu perfil de emergencia hace 5 minutos en Santiago Centro.",
  "icon": "emergency",
  "data": {
    "webId": "ABC123XYZ",
    "accessLogId": "log_abc123_20251021",
    "location": "Santiago Centro"
  },
  "read": false,
  "actionUrl": "/dashboard/analytics",
  "actionLabel": "Ver detalles",
  "createdAt": "2025-10-21T14:35:00Z",
  "expiresAt": "2025-11-21T14:35:00Z"
}
```

### Índices Compuestos
```javascript
{
  "indexes": [
    {
      "collectionGroup": "notifications",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "read", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

---

## 🎫 COLECCIÓN: `supportTickets`

### Documento Base
```typescript
interface SupportTicket {
  // Identificación
  ticketId: string;                 // "TICKET-00123" (ID del documento)
  
  // Usuario
  userId: string;
  userName: string;
  userEmail: string;
  
  // Contenido
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'shipping' | 'account' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Estado
  status: 'open' | 'in_progress' | 'waiting_user' | 'resolved' | 'closed';
  
  // Asignación
  assignedTo?: string;              // Admin userId
  assignedAt?: Timestamp;
  
  // Respuestas
  messages: TicketMessage[];
  lastMessageAt: Timestamp;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  resolvedAt?: Timestamp;
  closedAt?: Timestamp;
}

interface TicketMessage {
  messageId: string;
  from: string;                     // userId o "system"
  fromName: string;
  message: string;
  attachments?: string[];           // URLs de archivos adjuntos
  timestamp: Timestamp;
}
```

### Ejemplo
```json
{
  "ticketId": "TICKET-00123",
  "userId": "user_abc123",
  "userName": "Juan Pérez",
  "userEmail": "juan@email.com",
  "subject": "No puedo activar mi pulsera",
  "description": "Escaneé el código QR pero no pasa nada.",
  "category": "technical",
  "priority": "medium",
  "status": "in_progress",
  "assignedTo": "admin_xyz",
  "assignedAt": "2025-10-21T10:00:00Z",
  "messages": [
    {
      "messageId": "msg_001",
      "from": "user_abc123",
      "fromName": "Juan Pérez",
      "message": "Escaneé el código QR pero no pasa nada.",
      "timestamp": "2025-10-21T09:30:00Z"
    },
    {
      "messageId": "msg_002",
      "from": "admin_xyz",
      "fromName": "Soporte NFCores",
      "message": "Hola Juan, ¿podrías indicarme el WebID de tu pulsera?",
      "timestamp": "2025-10-21T10:05:00Z"
    }
  ],
  "lastMessageAt": "2025-10-21T10:05:00Z",
  "createdAt": "2025-10-21T09:30:00Z",
  "updatedAt": "2025-10-21T10:05:00Z"
}
```

### Índices Compuestos
```javascript
{
  "indexes": [
    {
      "collectionGroup": "supportTickets",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "priority", "order": "DESCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "supportTickets",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "assignedTo", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    }
  ]
}
```

---

## 📋 COLECCIÓN: `auditLogs`

### Documento Base
```typescript
interface AuditLog {
  // Identificación
  logId: string;                    // ID del documento (auto)
  
  // Acción
  action: 
    | 'create_user'
    | 'delete_user'
    | 'create_panel'
    | 'delete_panel'
    | 'generate_webid'
    | 'assign_webid'
    | 'deactivate_webid'
    | 'access_medical_data'         // Super admin emergency access
    | 'export_data'
    | 'change_permissions'
    | 'config_change'
    | 'update_pricing'
    | 'create_coupon';
  
  // Actor
  performedBy: {
    userId: string;
    userName: string;
    role: SystemRole;
    panelId?: string;
  };
  
  // Target
  target: {
    type: 'user' | 'panel' | 'webid' | 'config' | 'order' | 'coupon';
    id: string;
    details?: Record<string, any>;
  };
  
  // Cambios
  changes?: {
    before: any;
    after: any;
  };
  
  // Metadata Técnica
  timestamp: Timestamp;
  ip: string;
  userAgent: string;
}
```

### Ejemplo
```json
{
  "logId": "audit_202510211000_001",
  "action": "update_pricing",
  "performedBy": {
    "userId": "admin_xyz",
    "userName": "Admin Juan",
    "role": "super_admin"
  },
  "target": {
    "type": "config",
    "id": "systemConfig/pricing",
    "details": {
      "configKey": "pricing",
      "section": "individual"
    }
  },
  "changes": {
    "before": { "price": 29990 },
    "after": { "price": 27990 }
  },
  "timestamp": "2025-10-21T10:00:00Z",
  "ip": "190.xxx.xxx.xxx",
  "userAgent": "Mozilla/5.0..."
}
```

### Índices Compuestos
```javascript
{
  "indexes": [
    {
      "collectionGroup": "auditLogs",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "performedBy.userId", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "auditLogs",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "action", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    }
  ]
}
```

---

## ⚙️ COLECCIÓN: `systemConfig`

### Documento: `pricing`
```typescript
interface PricingConfig {
  individual: {
    price: number;                  // CLP
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
```

### Documento: `limits`
```typescript
interface LimitsConfig {
  individual: {
    profiles: 1;
    webIds: 1;
    maxDocuments: number;
    maxFileSizeMB: number;
    totalStorageMB: number;
    maxContacts: number;
  };
  familiar: {
    profiles: 5;
    webIds: 5;
    maxDocuments: number;
    maxFileSizeMB: number;
    totalStorageMB: number;
    maxContacts: number;
  };
  empresarial: {
    profiles: number;               // Infinity
    webIdsMin: number;
    maxDocuments: number;           // Infinity
    maxFileSizeMB: number;
    totalStorageGB: number;
    maxContacts: number;            // Infinity
  };
  updatedAt: Timestamp;
  updatedBy: string;
}
```

### Documento: `branding`
```typescript
interface BrandingConfig {
  logo: {
    main: string;                   // URL
    white: string;
    favicon: string;
  };
  colors: {
    primary: string;                // HEX
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
```

### Documento: `features`
```typescript
interface FeaturesConfig {
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
```

### Documento: `contact`
```typescript
interface ContactConfig {
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
```

### Documento: `footer`
```typescript
interface FooterConfig {
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
```

### Documento: `seo`
```typescript
interface SEOConfig {
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
```

### Documento: `inventory`
```typescript
interface InventoryConfig {
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
```

---

## 📧 COLECCIÓN: `emailTemplates`

### Documento Base
```typescript
interface EmailTemplate {
  id: string;                       // ID del documento
  name: string;
  subject: string;
  htmlTemplate: string;
  textTemplate: string;
  variables: string[];              // ["userName", "orderId", etc.]
  active: boolean;
  category: 'transactional' | 'marketing' | 'system';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
}
```

### Ejemplo
```json
{
  "id": "purchase_confirmation",
  "name": "Confirmación de Compra",
  "subject": "✅ Compra Confirmada - NFCores",
  "htmlTemplate": "<html>...</html>",
  "textTemplate": "Hola {{userName}}, tu compra ha sido confirmada...",
  "variables": ["userName", "orderId", "packName", "total", "trackingNumber"],
  "active": true,
  "category": "transactional",
  "createdAt": "2025-10-01T00:00:00Z",
  "updatedAt": "2025-10-21T16:00:00Z",
  "updatedBy": "admin_xyz"
}
```

---

## ❓ COLECCIÓN: `faqs`

### Documento Base
```typescript
interface FAQ {
  id: string;                       // ID del documento
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'billing' | 'shipping';
  order: number;                    // Para ordenar
  isPublic: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
}
```

### Ejemplo
```json
{
  "id": "faq_001",
  "question": "¿Cómo activo mi pulsera?",
  "answer": "Para activar tu pulsera, ingresa a tu dashboard en nfcores.com/dashboard, busca la sección 'Activar Pulsera', escanea el código QR y sigue los pasos del wizard.",
  "category": "technical",
  "order": 1,
  "isPublic": true,
  "createdAt": "2025-10-01T00:00:00Z",
  "updatedAt": "2025-10-15T00:00:00Z",
  "updatedBy": "admin_xyz"
}
```

---

## 🌟 COLECCIÓN: `testimonials`

### Documento Base
```typescript
interface Testimonial {
  id: string;                       // ID del documento
  userName: string;
  userPhoto?: string;
  userRole?: string;                // "Madre de 3", "Deportista", etc.
  rating: number;                   // 1-5
  comment: string;
  featured: boolean;                // Destacado en home
  isPublic: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
}
```

### Ejemplo
```json
{
  "id": "testimonial_001",
  "userName": "María González",
  "userPhoto": "https://storage.googleapis.com/...",
  "userRole": "Madre de 3 niños",
  "rating": 5,
  "comment": "NFCores me da tranquilidad. Saber que mis hijos tienen su información médica accesible en caso de emergencia no tiene precio.",
  "featured": true,
  "isPublic": true,
  "createdAt": "2025-10-01T00:00:00Z",
  "updatedAt": "2025-10-01T00:00:00Z",
  "updatedBy": "admin_xyz"
}
```

---

## 🤝 COLECCIÓN: `partners`

### Documento Base
```typescript
interface Partner {
  id: string;                       // ID del documento
  name: string;
  logo: string;                     // URL del logo
  website?: string;
  description?: string;
  category: 'health' | 'insurance' | 'sports' | 'corporate' | 'other';
  featured: boolean;
  isPublic: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
}
```

### Ejemplo
```json
{
  "id": "partner_001",
  "name": "Clínica Alemana",
  "logo": "https://storage.googleapis.com/nfcores/partners/clinica-alemana.png",
  "website": "https://www.alemana.cl",
  "description": "Aliado estratégico en salud",
  "category": "health",
  "featured": true,
  "isPublic": true,
  "order": 1,
  "createdAt": "2025-10-01T00:00:00Z",
  "updatedAt": "2025-10-01T00:00:00Z",
  "updatedBy": "admin_xyz"
}
```

---

## 🔒 FIRESTORE SECURITY RULES (Completas y Sincronizadas)

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ==================== HELPER FUNCTIONS ====================
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function hasRole(role) {
      return isAuthenticated() && request.auth.token.role == role;
    }
    
    function isAdmin() {
      return hasRole('admin') || hasRole('super_admin');
    }
    
    function isSuperAdmin() {
      return hasRole('super_admin');
    }
    
    function isModerator() {
      return hasRole('moderator');
    }
    
    function isContentEditor() {
      return hasRole('content_editor');
    }
    
    function isPanelAdmin(panelId) {
      return isAuthenticated() && (
        // Para paneles familiares
        (exists(/databases/$(database)/documents/familyPanels/$(panelId)) &&
         request.auth.uid in get(/databases/$(database)/documents/familyPanels/$(panelId)).data.adminIds) ||
        // Para paneles empresariales
        (exists(/databases/$(database)/documents/enterprisePanels/$(panelId)) &&
         request.auth.uid in get(/databases/$(database)/documents/enterprisePanels/$(panelId)).data.adminIds)
      );
    }
    
    // ==================== USERS ====================
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow create: if isAuthenticated();
      allow update: if isOwner(userId) ||