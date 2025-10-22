# Instrucciones para GitHub Copilot - NFCores

**Última actualización**: 2025-10-21 16:14:39 UTC  
**Actualizado por**: @cknight775  
**Versión**: 2.0.0 - SINCRONIZADA

---

## 🎯 Contexto del Proyecto

**NFCores** es una plataforma web que proporciona acceso instantáneo a información médica de emergencia mediante pulseras NFC.

### Objetivo Principal
Salvar vidas permitiendo que personal de emergencia acceda a información médica crítica en menos de 2 segundos, sin contraseñas ni apps.

---

## 📚 DOCUMENTACIÓN OFICIAL (12 DOCUMENTOS SINCRONIZADOS)

Estos documentos están **100% sincronizados** y deben consultarse en orden según la tarea:

### 🔴 CRÍTICOS (Consultar SIEMPRE)
1. **`.github/copilot-instructions.md`** (este archivo) - Reglas generales
2. **`.github/user-roles.md`** - Roles, permisos y límites oficiales
3. **`.github/database-schema.md`** - Esquema Firestore completo
4. **`.github/routes-architecture.md`** - Todas las rutas de la app

### 🟡 IMPORTANTES (Según tarea)
5. **`.github/tech-stack.md`** - Stack tecnológico permitido
6. **`.github/project-status.md`** - Estado actual del desarrollo
7. **`.github/emergency-profile-design.md`** - Diseño página de emergencia
8. **`.github/folder-structure.md`** - Organización de archivos

### 🟢 COMPLEMENTARIOS
9. **`.github/user-flows-complete.md`** - Flujos de usuario detallados
10. **`.github/api-integrations.md`** - APIs externas (MercadoPago, Chilexpress)
11. **`.github/admin-manageable-elements.md`** - Panel de administración
12. **`.github/testing-guidelines.md`** - Guías de testing

---

## 🔐 DEFINICIONES OFICIALES (SINCRONIZADAS)

### Roles de Usuario
```typescript
// ROL DE SISTEMA (permisos técnicos)
type SystemRole = 'user' | 'admin' | 'super_admin' | 'moderator' | 'content_editor';

// TIPO DE PERFIL (contexto de negocio)
type ProfileType = 
  | 'individual'              // Pack individual (1 usuario)
  | 'familiar_admin'          // Admin de panel familiar
  | 'familiar_member'         // Miembro de panel familiar
  | 'empresarial_admin'       // Admin de panel empresarial
  | 'empresarial_employee';   // Empleado de empresa
```

### Identificadores de Panel
```typescript
// FORMATO OFICIAL - NO USAR VARIACIONES
panelId: "FAM-00001" // Panel Familiar (5 miembros máx)
panelId: "EMP-00001" // Panel Empresarial (10+ miembros)

// ❌ NO USAR: FID, EID, o cualquier otra variación
```

### Formato de WebID
```typescript
// FORMATO OFICIAL: 9 caracteres alfanuméricos
webIdCode: string; // Ejemplo: "ABC123XYZ"
pattern: /^[A-Z0-9]{9}$/
generation: "3 letras + 3 números + 3 letras (mayúsculas)"

// Ejemplos válidos:
"ABC123XYZ" ✅
"DEF456UVW" ✅

// Inválidos:
"abc123xyz" ❌ (minúsculas)
"ABC-123-XYZ" ❌ (con guiones)
```

### Límites Oficiales por Pack
```typescript
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
    profiles: 5,              // MÁXIMO 5 MIEMBROS
    webIds: 5,
    maxDocuments: 50,         // 10 por miembro
    maxFileSizeMB: 5,
    totalStorageMB: 200,
    maxContacts: 25,          // 5 por miembro
  },
  empresarial: {
    profiles: Infinity,       // Sin límite
    webIdsMin: 10,           // MÍNIMO 10 para comprar
    webIds: 'según contrato',
    maxDocuments: Infinity,
    maxFileSizeMB: 10,
    totalStorageGB: 5,
    maxContacts: Infinity,
  },
};
```

### Precios Oficiales (Administrables)
```typescript
const DEFAULT_PRICING = {
  individual: {
    price: 29990,
    currency: 'CLP',
  },
  familiar: {
    price: 69990,
    originalPrice: 119960,
    savingsAmount: 49970,
    currency: 'CLP',
  },
  empresarial: {
    priceFrom: 399990,
    currency: 'CLP',
    customQuote: true,
  },
};
```

### Estados Oficiales
```typescript
// Estados de WebID
type WebIDStatus = 
  | 'pending_activation'  // Generado, no activado
  | 'active'              // Activo y funcionando
  | 'inactive'            // Inactivo temporal (usuario)
  | 'deactivated'         // Desactivado (admin)
  | 'expired';            // Suscripción vencida

// Estados de Pago (MercadoPago)
type PaymentStatus = 
  | 'pending'       // Pendiente
  | 'approved'      // Aprobado ✅
  | 'authorized'    // Autorizado (no capturado)
  | 'in_process'    // En revisión (hasta 48hs)
  | 'in_mediation'  // Disputa
  | 'rejected'      // Rechazado ❌
  | 'cancelled'     // Cancelado
  | 'refunded'      // Reembolsado
  | 'charged_back'; // Contracargo

// Estados de Envío (Chilexpress)
type ShippingStatus = 
  | 'pending'       // Orden creada, no enviada
  | 'preparing'     // Preparando paquete
  | 'shipped'       // En camino
  | 'delivered'     // Entregado ✅
  | 'failed';       // Fallo en entrega
```

---

## 📂 COLECCIONES FIRESTORE OFICIALES

```
Firestore Structure (Completa y Sincronizada):
├── users/                      # Usuarios del sistema
├── emergencyProfiles/          # Perfiles públicos de emergencia
├── webIds/                     # WebIDs únicos
├── familyPanels/               # Paneles familiares (FAM-XXXXX)
├── enterprisePanels/           # Paneles empresariales (EMP-XXXXX)
├── orders/                     # Órdenes de compra
├── coupons/                    # Cupones de descuento
├── accessLogs/                 # Logs de accesos a perfiles
├── notifications/              # Notificaciones de usuarios
├── supportTickets/             # Tickets de soporte
├── auditLogs/                  # Logs de auditoría (admin)
├── systemConfig/               # Configuración global
├── emailTemplates/             # Plantillas de email
├── faqs/                       # Preguntas frecuentes
├── testimonials/               # Testimonios de clientes
└── partners/                   # Empresas aliadas
```

---

## 🛣️ RUTAS OFICIALES COMPLETAS

### Rutas Públicas
```
/                           # Landing page
/login                      # Login
/register                   # Registro
/reset-password             # Recuperar contraseña
/verify-email               # Verificar email
/id/:token                  # 🆘 CRÍTICO - Perfil público de emergencia
/precios                    # Precios y packs
/como-funciona              # Cómo funciona
/testimonios                # Testimonios
/contacto                   # Contacto
/terminos                   # Términos y condiciones
/privacidad                 # Política de privacidad
```

### Rutas Privadas - Usuario
```
/dashboard                  # Dashboard principal
/dashboard/perfil           # Editar perfil
/dashboard/configuracion    # Configuración
/dashboard/analytics        # Analytics de accesos
/dashboard/documentos       # Documentos médicos
/dashboard/contactos        # Contactos de emergencia
```

### Rutas Privadas - Panel Familiar
```
/dashboard/familiar                 # Dashboard familiar
/dashboard/familiar/miembros        # Gestión de miembros
/dashboard/familiar/agregar-miembro # Agregar miembro
/dashboard/familiar/configuracion   # Configuración del panel
```

### Rutas Privadas - Panel Empresarial
```
/dashboard/empresarial          # Dashboard empresarial
/dashboard/empresarial/empleados # Gestión de empleados
/dashboard/empresarial/agregar  # Agregar empleado
/dashboard/empresarial/importar # Importación masiva CSV
/dashboard/empresarial/reportes # Reportes empresariales
```

### Rutas Admin (Completas)
```
/admin/dashboard                    # Dashboard admin

# Contenido Público
/admin/content/home                 # Editar home
/admin/content/pricing              # Editar precios
/admin/content/banners              # Banners promocionales
/admin/content/pages                # Páginas estáticas
/admin/content/footer               # Footer
/admin/content/faqs                 # FAQs

# Configuración
/admin/config/branding              # Marca e identidad
/admin/config/emails                # Plantillas de email
/admin/config/notifications         # Notificaciones globales
/admin/config/features              # Feature flags

# Usuarios y Paneles
/admin/usuarios                     # Gestión de usuarios
/admin/paneles/familiares           # Paneles familiares
/admin/paneles/empresariales        # Paneles empresariales

# Packs y WebIDs
/admin/packs                        # Gestión de packs
/admin/webids                       # Gestión de WebIDs
/admin/inventario                   # Inventario de pulseras

# Ventas
/admin/ordenes                      # Órdenes de compra
/admin/cupones                      # Cupones de descuento
/admin/pagos                        # Pagos

# Soporte
/admin/soporte                      # Tickets de soporte
/admin/contactos                    # Mensajes de contacto

# Reportes
/admin/analytics                    # Analytics general
/admin/ventas                       # Reportes de ventas
/admin/usuarios/stats               # Estadísticas de usuarios
/admin/logs                         # Logs de auditoría
```

---

## 🚨 REGLAS CRÍTICAS (NUNCA ROMPER)

### 1. Página de Emergencia (`/id/:token`)
```typescript
// ✅ OBLIGATORIO
- Tiempo de carga < 2 segundos
- Funciona sin autenticación
- Funciona offline (PWA)
- Compatible Android 8+ e iOS 12+
- Uptime 99.9%

// ❌ PROHIBIDO
- Nunca requerir login
- Nunca bloquear por mantenimiento
- Nunca mostrar spinner > 2 segundos
- Nunca romper en mobile
```

### 2. Base de Datos
```typescript
// ✅ SIEMPRE
- Leer de Firestore, NO hardcodear valores
- Respetar límites por pack
- Validar permisos en frontend Y backend
- Usar índices compuestos para queries

// ❌ NUNCA
- Hardcodear precios o límites en código
- Hacer queries sin índices
- Confiar solo en validación frontend
- Exponer datos sensibles en reglas de seguridad
```

### 3. Roles y Permisos
```typescript
// ✅ SIEMPRE validar
if (!user || !['admin', 'super_admin'].includes(user.role)) {
  throw new UnauthorizedException();
}

// ❌ NUNCA confiar solo en frontend
// Frontend: Guard + Backend: Firestore Rules + Cloud Function validation
```

### 4. Identificadores
```typescript
// ✅ USAR SIEMPRE
panelId: "FAM-00001" | "EMP-00001"
webIdCode: "ABC123XYZ" (9 chars, mayúsculas)

// ❌ NUNCA USAR
panelId: "FID-001" ❌
panelId: "family-001" ❌
webIdCode: "abc-123-xyz" ❌
```

### 5. Estados
```typescript
// ✅ USAR solo estados oficiales
webId.status: 'pending_activation' | 'active' | 'inactive' | 'deactivated' | 'expired'
payment.status: 'pending' | 'approved' | 'rejected' | etc.

// ❌ NO inventar estados
webId.status: 'waiting' ❌
payment.status: 'success' ❌ (usar 'approved')
```

---

## 🎨 ALIAS DE IMPORTS (OBLIGATORIO)

```typescript
// tsconfig.json configurado con:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

// ✅ USAR SIEMPRE
import { User } from '@/types/user';
import { Button } from '@/components/ui/Button';
import { getUser } from '@/services/firestore/users';

// ❌ NUNCA USAR
import { User } from '../../../types/user'; ❌
import { Button } from '../../components/ui/Button'; ❌
```

---

## 📝 CONVENCIONES DE CÓDIGO

### Nombres de Archivos
```
✅ Componentes: PascalCase.tsx
   Button.tsx, UserCard.tsx, DashboardHome.tsx

✅ Servicios: camelCase.ts
   users.ts, emergencyProfiles.ts, mercadoPagoService.ts

✅ Types: camelCase.ts
   user.ts, emergencyProfile.ts, panel.ts

✅ Hooks: use + PascalCase.ts
   useAuth.ts, useNotifications.ts, usePanelData.ts

✅ Páginas: PascalCase.tsx
   HomePage.tsx, LoginPage.tsx, DashboardPage.tsx
```

### Estructura de Componentes
```typescript
// ✅ ESTRUCTURA OFICIAL
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types/user';

interface Props {
  user: User;
  onSave: (data: any) => void;
}

export const ComponentName: React.FC<Props> = ({ user, onSave }) => {
  // 1. Hooks
  const { hasPermission } = useAuth();
  
  // 2. State
  const [loading, setLoading] = React.useState(false);
  
  // 3. Effects
  React.useEffect(() => {
    // ...
  }, []);
  
  // 4. Handlers
  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  // 5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

---

## 🔒 SEGURIDAD

### Firestore Rules
```javascript
// SIEMPRE proteger datos sensibles
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
    
    function isAdmin() {
      return isAuthenticated() && 
             request.auth.token.role in ['admin', 'super_admin'];
    }
    
    // Users
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow write: if isOwner(userId) || isAdmin();
    }
    
    // Emergency Profiles - PÚBLICO para emergencias
    match /emergencyProfiles/{profileId} {
      allow read: if true; // ✅ Acceso público
      allow write: if isOwner(resource.data.userId) || isAdmin();
    }
    
    // WebIDs
    match /webIds/{webIdCode} {
      allow read: if isOwner(resource.data.userId) || isAdmin();
      allow write: if isAdmin();
    }
    
    // Family Panels
    match /familyPanels/{panelId} {
      allow read: if isAuthenticated() && 
                     (request.auth.uid in resource.data.adminIds || isAdmin());
      allow write: if isAuthenticated() && 
                      (request.auth.uid == resource.data.ownerId || isAdmin());
    }
    
    // Enterprise Panels
    match /enterprisePanels/{panelId} {
      allow read: if isAuthenticated() && 
                     (request.auth.uid in resource.data.adminIds || isAdmin());
      allow write: if isAuthenticated() && 
                      (request.auth.uid == resource.data.ownerId || isAdmin());
    }
    
    // System Config - Solo admins
    match /systemConfig/{doc} {
      allow read: if isAdmin();
      allow write: if request.auth.token.role == 'super_admin';
    }
  }
}
```

---

## ⚠️ ERRORES COMUNES A EVITAR

### ❌ ERROR 1: Confundir role y profileType
```typescript
// ❌ INCORRECTO
if (user.role === 'familiar_admin') { ... }

// ✅ CORRECTO
if (user.profileType === 'familiar_admin') { ... }

// role = permisos técnicos del sistema
// profileType = contexto de negocio
```

### ❌ ERROR 2: Usar identificadores incorrectos
```typescript
// ❌ INCORRECTO
panelId: "FID-001"
panelId: "family-panel-001"

// ✅ CORRECTO
panelId: "FAM-00001"
panelId: "EMP-00001"
```

### ❌ ERROR 3: No respetar límites por pack
```typescript
// ❌ INCORRECTO
await addMemberToPanel(panelId, newMember); // Sin validar límite

// ✅ CORRECTO
const panel = await getFamilyPanel(panelId);
if (panel.members.length >= 5) {
  throw new Error('Límite de miembros alcanzado (5 máximo)');
}
await addMemberToPanel(panelId, newMember);
```

### ❌ ERROR 4: Hardcodear valores administrables
```typescript
// ❌ INCORRECTO
const priceIndividual = 29990;

// ✅ CORRECTO
const pricing = await getSystemConfig('pricing');
const priceIndividual = pricing.individual.price;
```

### ❌ ERROR 5: No validar formato de WebID
```typescript
// ❌ INCORRECTO
const webId = generateRandomString(9);

// ✅ CORRECTO
const webId = generateWebId(); // Usa formato oficial ABC123XYZ
if (!/^[A-Z0-9]{9}$/.test(webId)) {
  throw new Error('Formato de WebID inválido');
}
```

---

## 📊 MÉTRICAS Y PERFORMANCE

### Objetivos de Performance
```typescript
const PERFORMANCE_TARGETS = {
  emergencyProfile: {
    loadTime: 2000,        // < 2 segundos CRÍTICO
    uptime: 0.999,         // 99.9%
  },
  dashboard: {
    loadTime: 3000,        // < 3 segundos
    uptime: 0.99,          // 99%
  },
  admin: {
    loadTime: 5000,        // < 5 segundos
    uptime: 0.98,          // 98%
  },
};
```

### Bundle Size
```typescript
const BUNDLE_SIZE_LIMITS = {
  main: 250 * 1024,        // 250 KB
  vendor: 500 * 1024,      // 500 KB
  total: 1000 * 1024,      // 1 MB
};
```

---

## 🧪 TESTING

### Cobertura Mínima
```typescript
const COVERAGE_TARGETS = {
  services: 80,            // Servicios Firestore: 80%
  hooks: 75,               // Hooks: 75%
  components: 70,          // Componentes: 70%
  utils: 90,               // Utilidades: 90%
};
```

### Tests Obligatorios
```typescript
// ✅ SIEMPRE escribir tests para:
- Servicios de Firestore (CRUD)
- Hooks personalizados
- Componentes UI base
- Funciones de utilidad
- Validaciones de formularios
- Lógica de permisos

// 🔴 CRÍTICO: Tests E2E para:
- Página de emergencia /id/:token
- Flujo de compra completo
- Activación de pulsera
```

---

## 📦 DEPENDENCIAS PERMITIDAS

### Core (OBLIGATORIAS)
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "firebase": "^10.7.1",
  "zod": "^3.22.4",
  "axios": "^1.6.2"
}
```

### UI/Styling (PERMITIDAS)
```json
{
  "tailwindcss": "^3.4.0",
  "@headlessui/react": "^1.7.17",
  "react-icons": "^4.12.0"
}
```

### ❌ PROHIBIDAS (Sin aprobación)
```json
{
  "moment": "❌",           // Usar date-fns
  "lodash": "❌",           // Usar funciones nativas
  "jquery": "❌",           // Nunca usar jQuery
  "bootstrap": "❌",        // Usar Tailwind
  "material-ui": "❌"       // Usar Headless UI
}
```

---

## 🔄 FLUJO DE TRABAJO

### Antes de Codear
1. ✅ Leer `.github/project-status.md` - ¿Qué existe?
2. ✅ Consultar documento específico según tarea
3. ✅ Verificar `.github/folder-structure.md` - ¿Dónde va?
4. ✅ Revisar tipos oficiales en este documento

### Durante Codeo
1. ✅ Usar alias de imports (`@/`)
2. ✅ Respetar límites y estados oficiales
3. ✅ Validar permisos en frontend Y backend
4. ✅ Escribir código sincronizado con documentación

### Después de Codear
1. ✅ Escribir tests según `.github/testing-guidelines.md`
2. ✅ Actualizar `.github/project-status.md`
3. ✅ Verificar que no rompiste sincronía con otros docs

---

## 📞 CONTACTO Y AYUDA

**Product Owner**: @cknight775  
**Repositorio**: https://github.com/cknight775/nfcores-web  
**Documentación**: `.github/*.md` (12 documentos sincronizados)

---

## ✅ CHECKLIST ANTES DE COMMIT

- [ ] Código sigue convenciones de este documento
- [ ] Usa tipos y estados oficiales
- [ ] Respeta límites por pack
- [ ] Valida permisos correctamente
- [ ] No hardcodea valores administrables
- [ ] Usa alias de imports (`@/`)
- [ ] Tests escritos y pasando
- [ ] Documentación actualizada si agregaste funcionalidad
- [ ] Performance dentro de objetivos
- [ ] Sin dependencias prohibidas

---

**Última sincronización**: 2025-10-21 16:14:39 UTC  
**Versión**: 2.0.0  
**Estado**: ✅ SINCRONIZADO CON 12 DOCUMENTOS