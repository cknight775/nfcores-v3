# Sistema de Roles y Permisos - NFCores

**Última actualización**: 2025-01-21 16:19:29 UTC  
**Actualizado por**: @cknight775  
**Versión**: 2.0.0 - SINCRONIZADA

---

## 🎯 Visión General

NFCores implementa un **sistema dual de roles**:
1. **Role** (Rol de Sistema): Permisos técnicos
2. **ProfileType** (Tipo de Perfil): Contexto de negocio

---

## 🔐 DEFINICIONES OFICIALES

### Estructura de Usuario
```typescript
interface User {
  // Identificación
  uid: string;                    // Firebase Auth UID
  email: string;
  emailVerified: boolean;
  
  // Información Personal
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  photoURL?: string;
  
  // ROLES DEL SISTEMA (Permisos técnicos)
  role: SystemRole;
  
  // TIPO DE PERFIL (Contexto de negocio)
  profileType: ProfileType;
  
  // Pack y Suscripción
  hasActiveSubscription: boolean;
  subscriptionExpiresAt?: Timestamp;
  
  pack?: PackInfo;
  
  // WebID (para usuarios individuales)
  webId?: string;                 // "ABC123XYZ"
  
  // Panel (para usuarios familiares/empresariales)
  panelId?: string;               // "FAM-00001" o "EMP-00001"
  
  // Admin Delegado (para miembros de panel)
  isAdmin?: boolean;
  delegatedBy?: string;
  delegatedAt?: Timestamp;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLogin?: Timestamp;
  isActive: boolean;
}

// ROLES DE SISTEMA (Permisos técnicos)
type SystemRole = 
  | 'user'            // Usuario normal del sistema
  | 'admin'           // Administrador de plataforma
  | 'super_admin'     // Super administrador (fundadores)
  | 'moderator'       // Moderador de soporte
  | 'content_editor'; // Editor de contenido

// TIPOS DE PERFIL (Contexto de negocio)
type ProfileType = 
  | 'individual'              // Pack individual (1 usuario, 1 WebID)
  | 'familiar_admin'          // Admin de panel familiar (hasta 5 miembros)
  | 'familiar_member'         // Miembro de panel familiar (sin admin)
  | 'empresarial_admin'       // Admin de panel empresarial (10+ usuarios)
  | 'empresarial_employee';   // Empleado de empresa (sin admin)

interface PackInfo {
  type: 'individual' | 'familiar' | 'empresarial';
  purchaseDate: Timestamp;
  expirationDate: Timestamp;
  webIdsAllocated: number;
  webIdsUsed: number;
  status: 'active' | 'expired' | 'cancelled';
}
```

---

## 📊 LÍMITES OFICIALES POR PACK

```typescript
const OFFICIAL_PACK_LIMITS = {
  individual: {
    // Usuarios y WebIDs
    profiles: 1,
    webIds: 1,
    
    // Documentos
    maxDocuments: 10,
    maxFileSizeMB: 5,
    totalStorageMB: 50,
    
    // Contactos
    maxContacts: 5,
    
    // Características
    features: {
      familyDashboard: false,
      bulkImport: false,
      advancedAnalytics: false,
      prioritySupport: false,
    },
  },
  
  familiar: {
    // Usuarios y WebIDs
    profiles: 5,              // MÁXIMO 5 MIEMBROS
    webIds: 5,
    
    // Documentos
    maxDocuments: 50,         // 10 por miembro
    maxFileSizeMB: 5,
    totalStorageMB: 200,      // 40 MB por miembro
    
    // Contactos
    maxContacts: 25,          // 5 por miembro
    
    // Características
    features: {
      familyDashboard: true,
      sharedNotifications: true,
      bulkImport: false,
      advancedAnalytics: true,
      prioritySupport: false,
    },
  },
  
  empresarial: {
    // Usuarios y WebIDs
    profiles: Infinity,       // Sin límite técnico
    webIdsMin: 10,           // MÍNIMO 10 para comprar
    webIds: 'según contrato', // 10, 20, 50, 100+
    
    // Documentos
    maxDocuments: Infinity,
    maxFileSizeMB: 10,
    totalStorageGB: 5,
    
    // Contactos
    maxContacts: Infinity,
    
    // Características
    features: {
      enterpriseDashboard: true,
      bulkImport: true,
      csvImport: true,
      advancedAnalytics: true,
      customReports: true,
      prioritySupport: true,
      apiAccess: false,       // Futuro
      ssoIntegration: false,  // Futuro
    },
  },
};
```

---

## 💰 PRECIOS OFICIALES (Administrables)

```typescript
// Valores por defecto (editables desde /admin/content/pricing)
const DEFAULT_PRICING = {
  individual: {
    price: 29990,
    currency: 'CLP',
    period: '12 meses',
    features: [
      '1 Pulsera NFC',
      '1 Perfil de emergencia',
      '5 Contactos de emergencia',
      '10 Documentos médicos',
      '50MB almacenamiento',
      '12 meses de servicio',
    ],
  },
  
  familiar: {
    price: 69990,
    originalPrice: 119960,
    savingsAmount: 49970,
    savingsPercentage: 42,
    currency: 'CLP',
    period: '12 meses',
    badge: '⭐ Mejor Valor',
    features: [
      'Hasta 5 pulseras NFC',
      '5 Perfiles de emergencia',
      'Dashboard familiar unificado',
      'Notificaciones compartidas',
      '200MB almacenamiento',
      '12 meses de servicio',
      '💰 Ahorra $49.970',
    ],
  },
  
  empresarial: {
    priceFrom: 399990,
    currency: 'CLP',
    period: '12 meses',
    customQuote: true,
    contactSales: true,
    features: [
      '10+ pulseras NFC',
      'Panel de gestión B2B',
      'Importación masiva CSV',
      'Reportes y auditorías',
      'Soporte prioritario',
      '5GB almacenamiento',
    ],
  },
};

// Ubicación en Firestore
// systemConfig/pricing
```

---

## 🏗️ JERARQUÍA DE ROLES

```
┌─────────────────────────────────────────────────────┐
│        👑 SUPER ADMINISTRADOR DE PLATAFORMA         │
│  (Control total - Solo fundadores/CTO)              │
│  role: 'super_admin'                                │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼────┐  ┌───────▼────┐  ┌──────▼────────┐
│ 👨‍💼 ADMIN   │  │ 🛡️ MODERATOR│  │ ✍️ CONTENT    │
│ PLATAFORMA │  │ (Soporte)  │  │ EDITOR        │
│ role:admin │  │ role:mod   │  │ role:editor   │
└────────────┘  └────────────┘  └───────────────┘
        │
        ├─────────────────────┬─────────────────────┐
        │                     │                     │
┌───────▼────┐        ┌───────▼────┐        ┌──────▼────────┐
│ 👤 USUARIO │        │ 👨‍👩‍👧 FAMILIAR│        │ 🏢 EMPRESARIAL│
│ NORMAL     │        │ ADMIN      │        │ ADMIN         │
│ role:user  │        │ role:user  │        │ role:user     │
│ type:indiv │        │ type:fam_ad│        │ type:emp_ad   │
│ 1 WebID    │        │ 5 WebIDs   │        │ 10+ WebIDs    │
└────────────┘        └────────────┘        └───────────────┘
                              │                     │
                      ┌───────▼────┐        ┌───────▼────────┐
                      │ 👶 MIEMBRO │        │ 👷 EMPLEADO    │
                      │ FAMILIAR   │        │ EMPRESA        │
                      │ type:fam_m │        │ type:emp_emp   │
                      └────────────┘        └────────────────┘
```

---

## 👑 1. SUPER ADMINISTRADOR

### Identificador
```typescript
{
  role: 'super_admin',
  profileType: 'individual', // No usa packs
  mfaEnabled: true, // MFA OBLIGATORIO
}
```

### Permisos COMPLETOS
```typescript
interface SuperAdminPermissions {
  // Sistema
  system_configuration: true,     // Configurar Firebase, APIs
  feature_flags: true,            // Activar/desactivar features
  admin_management: true,         // Gestionar otros admins
  
  // Contenido
  content_management: true,       // Editar todo el contenido
  pricing_management: true,       // Cambiar precios
  seo_management: true,           // Meta tags
  branding_management: true,      // Logo, colores
  
  // Usuarios
  user_management: true,          // CRUD usuarios
  panel_management: true,         // CRUD paneles
  role_assignment: true,          // Cambiar roles
  
  // Operaciones
  webid_generation: true,         // Generar WebIDs
  inventory_management: true,     // Gestionar stock
  order_management: true,         // Ver/modificar órdenes
  
  // Datos
  view_analytics: true,           // Ver todas las métricas
  export_data: true,              // Exportar datos
  view_audit_logs: true,          // Ver logs de auditoría
  access_medical_data: true,      // Acceso de emergencia (con log)
}
```

### Acciones Críticas (Solo Super Admin)
- Crear/eliminar otros administradores
- Modificar configuración de Firebase
- Cambiar feature flags
- Acceder a información médica (emergencia con log)
- Eliminar paneles completos
- Cambiar logo y branding

---

## 👨‍💼 2. ADMINISTRADOR DE PLATAFORMA

### Identificador
```typescript
{
  role: 'admin',
  profileType: 'individual',
}
```

### Permisos
```typescript
interface AdminPermissions {
  // Contenido
  content_management: true,
  pricing_management: true,
  seo_management: true,
  branding_management: false,     // Solo super admin
  
  // Usuarios
  user_management: true,
  panel_management: true,
  role_assignment: false,         // Solo super admin
  
  // Operaciones
  webid_generation: true,
  inventory_management: true,
  order_management: true,
  support_tickets: true,
  
  // Datos
  view_analytics: true,
  export_data: true,
  view_audit_logs: true,
  access_medical_data: false,     // Solo super admin
  
  // Sistema
  feature_flags: false,           // Solo super admin
  admin_management: false,        // Solo super admin
}
```

### NO Puede
- ❌ Ver información médica de usuarios
- ❌ Modificar perfiles de emergencia directamente
- ❌ Configurar Firebase o Cloud Functions
- ❌ Gestionar otros administradores
- ❌ Cambiar branding del sistema

---

## 🛡️ 3. MODERADOR

### Identificador
```typescript
{
  role: 'moderator',
  profileType: 'individual',
}
```

### Permisos
```typescript
interface ModeratorPermissions {
  // Soporte
  support_tickets: true,
  faq_management: true,
  
  // Contenido básico
  content_management: true,       // Solo textos, no precios
  
  // Resto: false
  user_management: false,
  panel_management: false,
  webid_generation: false,
  view_analytics: false,
  export_data: false,
}
```

---

## ✍️ 4. EDITOR DE CONTENIDO

### Identificador
```typescript
{
  role: 'content_editor',
  profileType: 'individual',
}
```

### Permisos
```typescript
interface ContentEditorPermissions {
  // Contenido
  content_management: true,
  seo_management: true,
  faq_management: true,
  
  // Resto: false
  pricing_management: false,
  user_management: false,
  webid_generation: false,
  view_analytics: false,
}
```

---

## 👨‍👩‍👧 5. ADMINISTRADOR DE PANEL FAMILIAR

### Identificador
```typescript
{
  role: 'user',
  profileType: 'familiar_admin',
  panelId: 'FAM-00001',
  webId: 'ABC123XYZ',
  pack: {
    type: 'familiar',
    webIdsAllocated: 5,
    webIdsUsed: 3,
    status: 'active',
  },
}
```

### Identificador de Panel
```typescript
interface FamilyPanel {
  panelId: string;          // "FAM-00001" (formato oficial)
  panelType: 'familiar';
  ownerId: string;          // Usuario que compró
  adminIds: string[];       // [ownerId, ...delegados]
  members: FamilyMember[];  // Max 5
  memberCount: number;      // 0-5
  webIdsAllocated: 5;       // SIEMPRE 5 para pack familiar
  webIdsUsed: number;       // 0-5
  webIds: string[];
  
  // Suscripción
  purchaseDate: Timestamp;
  expirationDate: Timestamp;
  status: 'active' | 'expired' | 'cancelled';
  
  // Configuración
  settings: {
    allowMemberSelfEdit: boolean;
    notifyAllAdminsOnAccess: boolean;
  };
}

interface FamilyMember {
  userId: string;
  webId?: string;
  relationship: string;     // "Padre", "Madre", "Hijo", "Esposa", etc.
  isAdmin: boolean;
  addedAt: Timestamp;
  addedBy: string;
}
```

### Permisos
- ✅ Gestionar hasta 5 miembros familiares
- ✅ Asignar WebIDs a miembros
- ✅ Editar información de miembros
- ✅ Eliminar miembros del panel
- ✅ Dashboard familiar unificado
- ✅ Notificaciones cuando se accede a cualquier perfil
- ✅ Delegar permisos de admin a otro miembro (ej: cónyuge)
- ✅ Ver analytics de todos los perfiles del panel

### NO Puede
- ❌ Acceder a paneles de otras familias
- ❌ Eliminar WebIDs (solo desactivar)
- ❌ Cambiar tipo de pack
- ❌ Ver información de usuarios fuera de su panel

### Permisos Delegados
```typescript
// El owner puede delegar admin a otro miembro
interface DelegatedAdmin {
  userId: string;
  delegatedBy: string;      // ownerId
  delegatedAt: Timestamp;
  permissions: {
    canAddMembers: boolean;
    canEditMembers: boolean;
    canRemoveMembers: boolean;
    canManageWebIds: boolean;
    canRevokeOtherAdmins: false,  // Solo owner puede
  };
}

// IMPORTANTE: Solo el owner original puede:
// - Eliminar el panel
// - Revocar permisos de admins delegados
// - Cambiar el plan
```

---

## 🏢 6. ADMINISTRADOR DE PANEL EMPRESARIAL

### Identificador
```typescript
{
  role: 'user',
  profileType: 'empresarial_admin',
  panelId: 'EMP-00001',
  webId: 'DEF456XYZ',
  pack: {
    type: 'empresarial',
    webIdsAllocated: 50,    // Según contrato
    webIdsUsed: 38,
    status: 'active',
  },
}
```

### Identificador de Panel
```typescript
interface EnterprisePanel {
  panelId: string;          // "EMP-00001" (formato oficial)
  panelType: 'empresarial';
  
  // Empresa
  companyName: string;
  companyRut?: string;
  companyAddress?: string;
  
  // Administración
  ownerId: string;
  adminIds: string[];       // Múltiples admins permitidos
  admins: EnterpriseAdmin[];
  
  // Empleados
  employees: Employee[];
  employeeCount: number;
  
  // WebIDs
  webIdsAllocated: number;  // 10, 20, 50, 100+
  webIdsUsed: number;
  webIds: string[];
  
  // Suscripción
  purchaseDate: Timestamp;
  expirationDate: Timestamp;
  status: 'active' | 'expired' | 'cancelled';
  
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
}

interface EnterpriseAdmin {
  userId: string;
  role: 'full_admin' | 'moderator' | 'readonly';
  addedAt: Timestamp;
  addedBy: string;
}

interface Employee {
  userId: string;
  webId?: string;
  employeeId?: string;      // ID interno empresa
  rut?: string;
  area: string;
  position?: string;
  isActive: boolean;
  addedAt: Timestamp;
  addedBy: string;
  deactivatedAt?: Timestamp;
}
```

### Permisos
- ✅ Gestionar 10+ empleados (sin límite técnico)
- ✅ Importación masiva por CSV
- ✅ Dashboard B2B con métricas empresariales
- ✅ Exportar datos (CSV, Excel)
- ✅ Múltiples administradores con roles internos
- ✅ Reportes avanzados y auditorías
- ✅ Gestión de áreas y departamentos

### NO Puede (Protecciones Legales)
- ❌ Ver información médica detallada sin consentimiento del empleado
- ❌ Modificar información médica del empleado
- ❌ Eliminar datos históricos (por ley laboral chilena)
- ❌ Acceder a documentos médicos privados

### Solo Puede Ver (Metadata)
- ✅ Pulsera activa/inactiva
- ✅ Perfil configurado sí/no
- ✅ Última actualización (fecha)
- ✅ Contactos de emergencia (cantidad, no detalles)

### Roles Internos de Panel
```typescript
const ENTERPRISE_PANEL_ROLES = {
  full_admin: {
    canAddEmployees: true,
    canEditEmployees: true,
    canRemoveEmployees: true,
    canManageWebIds: true,
    canExportData: true,
    canManageAdmins: true,
    canViewReports: true,
  },
  
  moderator: {
    canAddEmployees: true,
    canEditEmployees: true,
    canRemoveEmployees: false,
    canManageWebIds: true,
    canExportData: false,
    canManageAdmins: false,
    canViewReports: true,
  },
  
  readonly: {
    canAddEmployees: false,
    canEditEmployees: false,
    canRemoveEmployees: false,
    canManageWebIds: false,
    canExportData: false,
    canManageAdmins: false,
    canViewReports: true,
  },
};
```

---

## 👤 7. USUARIO NORMAL (Pack Individual)

### Identificador
```typescript
{
  role: 'user',
  profileType: 'individual',
  webId: 'GHI789XYZ',
  hasActiveSubscription: true,
  pack: {
    type: 'individual',
    webIdsAllocated: 1,
    webIdsUsed: 1,
    status: 'active',
  },
}
```

### Permisos
- ✅ Editar su propio perfil completo
- ✅ Actualizar información médica
- ✅ Agregar/editar/eliminar contactos de emergencia (máx 5)
- ✅ Subir documentos médicos (máx 10, 5MB c/u)
- ✅ Configurar privacidad (qué mostrar públicamente)
- ✅ Ver analytics de accesos a su perfil
- ✅ Exportar su perfil a PDF
- ✅ Recibir notificaciones de accesos

### NO Puede
- ❌ Crear paneles familiares/empresariales (debe comprar upgrade)
- ❌ Gestionar otros usuarios
- ❌ Ver información de otros perfiles
- ❌ Acceder a configuraciones de admin

---

## 👶 8. MIEMBRO DE PANEL FAMILIAR (Sin Admin)

### Identificador
```typescript
{
  role: 'user',
  profileType: 'familiar_member',
  panelId: 'FAM-00001',
  webId: 'JKL012XYZ',
  isAdmin: false,
}
```

### Permisos
- ✅ Ver y editar SOLO su propio perfil
- ✅ Recibir notificaciones de accesos a su perfil
- ✅ Exportar su perfil a PDF

### NO Puede
- ❌ Ver perfiles de otros miembros del panel
- ❌ Agregar/eliminar miembros
- ❌ Ver dashboard familiar
- ❌ Gestionar WebIDs del panel

### Si es Mayor de Edad
- 📧 Puede solicitar permisos de admin al owner
- 🚪 Puede salir del panel familiar (requiere confirmación)

---

## 👷 9. EMPLEADO DE PANEL EMPRESARIAL (Sin Admin)

### Identificador
```typescript
{
  role: 'user',
  profileType: 'empresarial_employee',
  panelId: 'EMP-00001',
  webId: 'MNO345XYZ',
  isAdmin: false,
}
```

### Permisos
- ✅ Ver y editar SOLO su propio perfil
- ✅ Recibir notificaciones de accesos
- ✅ Exportar su perfil a PDF
- ✅ Marcar información como privada (no visible para empresa)

### NO Puede
- ❌ Ver perfiles de otros empleados
- ❌ Ver dashboard empresarial
- ❌ Gestionar panel
- ❌ Salir del panel mientras sea empleado activo (debe notificar RRHH)

### Protecciones Legales (Chile)
```typescript
// La empresa NO puede ver sin consentimiento:
const EMPLOYEE_PRIVATE_DATA = [
  'allergies (detalles)',
  'medications (específicos)',
  'medicalConditions (detalles)',
  'emergencyNotes',
  'documents (marcados como privados)',
  'emergencyContacts (detalles completos)',
];

// La empresa SOLO puede ver:
const EMPLOYEE_METADATA = [
  'profileConfigured: boolean',
  'lastUpdated: Date',
  'webIdStatus: WebIDStatus',
  'contactsCount: number',
];
```

---

## 📊 TABLA COMPARATIVA COMPLETA

| Permiso/Acción | Super Admin | Admin | Moderador | Editor | Admin Familiar | Admin Empresa | Usuario | Miembro/Empleado |
|----------------|-------------|-------|-----------|--------|----------------|---------------|---------|------------------|
| **Acceso paneles** | Todos | Todos (lectura) | - | - | Solo su panel | Solo su panel | Solo su perfil | Solo su perfil |
| **Crear paneles** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Gestionar usuarios propios** | ✅ | ✅ | ❌ | ❌ | ✅ (5 max) | ✅ (10+ max) | Solo él | Solo él |
| **Crear WebIDs** | ✅ | ✅ | ❌ | ❌ | ✅ (límite 5) | ✅ (límite pack) | No | ❌ |
| **Ver info médica** | ✅ (con log) | ❌ | ❌ | ❌ | ✅ (su panel) | ❌ (metadata) | Solo suya | Solo suya |
| **Eliminar usuarios** | ✅ | ✅ | ❌ | ❌ | ✅ (su panel) | ⚠️ Desactivar | ❌ | ❌ |
| **Editar precios** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Editar contenido** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Ver analytics** | ✅ Global | ✅ Global | ❌ | ❌ | ✅ Su panel | ✅ Su panel | ✅ Propio | ✅ Propio |
| **Exportar datos** | ✅ | ✅ | ❌ | ❌ | ✅ Su panel | ✅ Su panel | ✅ Propio | ✅ Propio |
| **Soporte tickets** | ✅ | ✅ | ✅ | ❌ | 📧 Crear | 📧 Crear | 📧 Crear | 📧 Crear |
| **Config Firebase** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Feature flags** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Gestionar admins** | ✅ | ❌ | ❌ | ❌ | ⚠️ Delegar | ⚠️ Asignar | ❌ | ❌ |

---

## 🔒 VALIDACIÓN DE PERMISOS

### Frontend (React)
```typescript
// src/hooks/usePermissions.ts
export const usePermissions = () => {
  const { user } = useAuth();
  
  const hasPermission = (permission: keyof AdminPermissions): boolean => {
    if (!user) return false;
    
    // Super admin tiene todos los permisos
    if (user.role === 'super_admin') return true;
    
    // Obtener permisos del rol
    const permissions = ROLE_PERMISSIONS[user.role];
    return permissions?.[permission] ?? false;
  };
  
  const canManagePanel = (panelId: string): boolean => {
    if (!user) return false;
    
    // Admins de plataforma pueden gestionar todos los paneles
    if (user.role === 'admin' || user.role === 'super_admin') return true;
    
    // Usuario debe ser admin del panel específico
    return user.panelId === panelId && 
           ['familiar_admin', 'empresarial_admin'].includes(user.profileType);
  };
  
  const canViewProfile = (targetUserId: string): boolean => {
    if (!user) return false;
    
    // Puede ver su propio perfil
    if (user.uid === targetUserId) return true;
    
    // Admins pueden ver todos
    if (user.role === 'admin' || user.role === 'super_admin') return true;
    
    // Admin de panel puede ver perfiles de su panel
    // Requiere verificar que targetUserId esté en el panel
    return false; // Implementar lógica específica
  };
  
  return {
    hasPermission,
    canManagePanel,
    canViewProfile,
  };
};

// Uso en componentes
const AdminPanel = () => {
  const { hasPermission } = usePermissions();
  
  if (!hasPermission('user_management')) {
    return <UnauthorizedPage />;
  }
  
  return <UsersTable />;
};
```

### Backend (Firestore Rules)
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helpers
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
    
    function isPanelAdmin(panelId) {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/familyPanels/$(panelId)).data.adminIds.hasAny([request.auth.uid]);
    }
    
    // Users
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow create: if isAuthenticated();
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isSuperAdmin();
    }
    
    // Emergency Profiles - PÚBLICO
    match /emergencyProfiles/{profileId} {
      allow read: if true; // ✅ Acceso público para emergencias
      allow write: if isOwner(resource.data.userId) || isAdmin();
    }
    
    // WebIDs
    match /webIds/{webIdCode} {
      allow read: if isOwner(resource.data.userId) || isAdmin();
      allow write: if isAdmin();
    }
    
    // Family Panels
    match /familyPanels/{panelId} {
      allow read: if isPanelAdmin(panelId) || isAdmin();
      allow write: if isPanelAdmin(panelId) || isAdmin();
    }
    
    // System Config
    match /systemConfig/{doc} {
      allow read: if isAdmin();
      allow write: if isSuperAdmin();
    }
  }
}
```

### Cloud Functions
```typescript
// functions/src/utils/permissions.ts
export const validatePermission = async (
  userId: string,
  permission: string
): Promise<boolean> => {
  // 1. Obtener usuario
  const userDoc = await admin.firestore().collection('users').doc(userId).get();
  const user = userDoc.data();
  
  if (!user) return false;
  
  // 2. Super admin tiene todos los permisos
  if (user.role === 'super_admin') return true;
  
  // 3. Verificar permiso específico
  const rolePermissions = ROLE_PERMISSIONS[user.role];
  return rolePermissions?.[permission] ?? false;
};

// Uso en Cloud Functions
export const deleteUser = functions.https.onCall(async (data, context) => {
  // Validar autenticación
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'No autenticado');
  }
  
  // Validar permisos
  const hasPermission = await validatePermission(
    context.auth.uid,
    'user_management'
  );
  
  if (!hasPermission) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'No tienes permisos para eliminar usuarios'
    );
  }
  
  // Proceder con eliminación
  await admin.firestore().collection('users').doc(data.userId).delete();
  
  // Auditar
  await logAuditAction({
    action: 'delete_user',
    performedBy: context.auth.uid,
    targetId: data.userId,
  });
  
  return { success: true };
});
```

---

## 🔄 MIGRACIÓN ENTRE ROLES

### Caso 1: Usuario Normal → Panel Familiar
```typescript
export const upgradeToFamilyPanel = async (userId: string, orderId: string) => {
  // 1. Verificar usuario activo
  const user = await getUser(userId);
  if (!user.hasActiveSubscription) {
    throw new Error('Usuario debe tener pack activo');
  }
  
  // 2. Generar ID de panel familiar
  const panelId = await generateFamilyPanelId(); // "FAM-00042"
  
  // 3. Crear panel
  await createFamilyPanel({
    panelId,
    panelType: 'familiar',
    ownerId: userId,
    adminIds: [userId],
    members: [],
    webIdsAllocated: 5,
    webIdsUsed: 1, // Usuario ya tiene 1 WebID
  });
  
  // 4. Migrar WebID existente
  await updateWebId(user.webId, {
    panelId,
    panelType: 'familiar',
  });
  
  // 5. Generar 4 WebIDs adicionales
  const newWebIds = await generateWebIds(4, {
    panelId,
    status: 'pending_activation',
  });
  
  // 6. Actualizar usuario
  await updateUser(userId, {
    profileType: 'familiar_admin',
    panelId,
    pack: {
      type: 'familiar',
      webIdsAllocated: 5,
      webIdsUsed: 1,
      status: 'active',
    },
  });
  
  // 7. Auditar
  await logAuditAction({
    action: 'upgrade_to_family',
    performedBy: userId,
    targetId: panelId,
  });
  
  return { panelId, newWebIds };
};
```

---

## ⚠️ IMPORTANTE PARA COPILOT

### Al Trabajar con Roles:

1. **SIEMPRE diferenciar `role` y `profileType`**
   ```typescript
   // ❌ INCORRECTO
   if (user.role === 'familiar_admin') { }
   
   // ✅ CORRECTO
   if (user.profileType === 'familiar_admin') { }
   ```

2. **Validar permisos en frontend Y backend**
   ```typescript
   // Frontend: Guard
   // Backend: Firestore Rules + Cloud Function
   ```

3. **Respetar límites por pack**
   ```typescript
   if (panel.members.length >= OFFICIAL_PACK_LIMITS.familiar.profiles) {
     throw new Error('Límite de miembros alcanzado (5 máximo)');
   }
   ```

4. **Usar identificadores oficiales**
   ```typescript
   // ✅ CORRECTO
   panelId: "FAM-00001"
   panelId: "EMP-00001"
   
   // ❌ INCORRECTO
   panelId: "FID-001"
   panelId: "family-001"
   ```

5. **Auditar acciones críticas**
   ```typescript
   await logAuditAction({
     action: 'delete_user',
     performedBy: adminId,
     targetId: userId,
   });
   ```

---

**Última sincronización**: 2025-01-21 16:19:29 UTC  
**Versión**: 2.0.0  
**Estado**: ✅ SINCRONIZADO CON 12 DOCUMENTOS  
**Referencias**: 
- `.github/copilot-instructions.md` (definiciones oficiales)
- `.github/database-schema.md` (estructura de datos)
- `.github/routes-architecture.md` (rutas por rol)