# Configuración de Firebase - NFCores

Este documento describe la configuración completa de Firebase y Firestore para el proyecto NFCores.

## 📋 Archivos de Configuración

### 1. `firestore.rules`
Reglas de seguridad para Firestore (16 colecciones)

**Características:**
- ✅ `emergencyProfiles/` con acceso público (CRÍTICO para emergencias)
- ✅ Helpers de autenticación y roles
- ✅ Protección por ownership y roles de admin
- ✅ Validación de paneles (familiar/empresarial)
- ✅ Logs inmutables (audit logs)
- ✅ Contenido público condicionado (FAQs, testimonials, partners)

### 2. `firestore.indexes.json`
Índices compuestos para queries optimizadas

**Total de índices:** 32
- users: 4 índices
- emergencyProfiles: 3 índices
- webIds: 3 índices
- familyPanels: 2 índices
- enterprisePanels: 2 índices
- orders: 3 índices
- coupons: 2 índices
- accessLogs: 3 índices
- notifications: 2 índices
- supportTickets: 2 índices
- auditLogs: 2 índices
- faqs: 1 índice
- testimonials: 1 índice
- partners: 1 índice

### 3. `storage.rules`
Reglas de seguridad para Firebase Storage

**Rutas protegidas:**
- `/documents/{userId}/` - Documentos médicos (límites por pack)
- `/photos/{userId}/` - Fotos de perfil (públicas)
- `/emergency-photos/{profileId}` - Fotos de emergencia (públicas)
- `/branding/` - Assets de marca (solo super_admin)
- `/content/` - Imágenes de contenido (admins/content_editor)
- `/support-attachments/` - Adjuntos de tickets
- `/temp/` - Uploads temporales

**Límites de tamaño:**
- Documentos: 10MB máximo
- Fotos de perfil: 2MB máximo
- Branding: 5MB máximo
- Content: 3MB máximo
- Support: 5MB máximo

### 4. `firebase.json`
Configuración principal de Firebase

**Servicios configurados:**
- Firestore (rules + indexes)
- Hosting (SPA con rewrites)
- Storage (rules)
- Emulators (desarrollo local)

**Headers de seguridad:**
- Cache-Control optimizado
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

### 5. `.firebaserc`
Configuración de proyectos Firebase

**Proyecto por defecto:** `nfcores-production`

### 6. `src/config/constants.ts`
Constantes oficiales sincronizadas con database-schema.md

**Incluye:**
- Límites oficiales por pack
- Precios default
- Formatos de identificadores
- Roles y tipos de perfil
- Estados (WebID, Payment, Shipping)
- Performance targets
- Colecciones Firestore
- Storage paths
- Mensajes de error/éxito
- Reglas de validación

---

## 🚀 Pasos para Configurar Firebase

### 1. Crear Proyecto en Firebase Console

```bash
# Ir a https://console.firebase.google.com/
# Crear nuevo proyecto: "nfcores-production"
# Habilitar Google Analytics (opcional)
```

### 2. Configurar Autenticación

```bash
# En Firebase Console:
# Authentication > Sign-in method > Email/Password > Enable
```

### 3. Crear Base de Datos Firestore

```bash
# En Firebase Console:
# Firestore Database > Create database
# Modo: Production
# Región: southamerica-east1 (São Paulo, Brasil)
```

### 4. Configurar Storage

```bash
# En Firebase Console:
# Storage > Get started
# Región: southamerica-east1
```

### 5. Obtener Credenciales

```bash
# En Firebase Console:
# Project Settings > General > Your apps
# Add app > Web
# Copiar credenciales a .env
```

### 6. Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

### 7. Login en Firebase

```bash
firebase login
```

### 8. Inicializar Proyecto (Ya hecho)

```bash
# Ya tenemos los archivos de configuración
# firestore.rules
# firestore.indexes.json
# storage.rules
# firebase.json
```

### 9. Deployar Rules e Índices

```bash
# Deploy completo
firebase deploy

# O individual:
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
firebase deploy --only storage
firebase deploy --only hosting
```

### 10. Verificar Deployment

```bash
# Ver estado
firebase projects:list

# Ver deployments
firebase deploy:list
```

---

## 🧪 Desarrollo Local con Emulators

### Iniciar Emulators

```bash
firebase emulators:start
```

**Puertos configurados:**
- Auth: 9099
- Firestore: 8080
- Storage: 9199
- UI: 4000

### Usar Emulators en la App

```typescript
// src/config/firebase.ts
if (import.meta.env.VITE_USE_EMULATORS === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
}
```

---

## 🔐 Reglas de Seguridad Implementadas

### Colecciones con Acceso Público
- ✅ `emergencyProfiles/` - Lectura pública (CRÍTICO)
- ✅ `coupons/` - Lectura pública (validación)
- ✅ `faqs/` - Lectura si `isPublic = true`
- ✅ `testimonials/` - Lectura si `isPublic = true`
- ✅ `partners/` - Lectura si `isActive = true`

### Colecciones Protegidas por Ownership
- ✅ `users/` - Solo owner y admins
- ✅ `webIds/` - Solo owner, panel admins y admins
- ✅ `orders/` - Solo owner y admins
- ✅ `notifications/` - Solo owner
- ✅ `accessLogs/` - Creación pública, lectura solo owner/admin

### Colecciones Protegidas por Panel
- ✅ `familyPanels/` - Solo miembros/admins del panel
- ✅ `enterprisePanels/` - Solo empleados/admins del panel

### Colecciones Solo Admin
- ✅ `systemConfig/` - Lectura admin, escritura super_admin
- ✅ `emailTemplates/` - Solo admins
- ✅ `auditLogs/` - Lectura solo super_admin

### Colecciones con Moderadores
- ✅ `supportTickets/` - Owner, moderators y admins

---

## 📊 Índices Compuestos

Todos los índices están configurados en `firestore.indexes.json` para optimizar queries comunes:

```javascript
// Ejemplo: Buscar usuarios activos por rol
users
  .where('role', '==', 'admin')
  .where('isActive', '==', true)
  .orderBy('createdAt', 'desc')

// Ejemplo: Logs de acceso por usuario
accessLogs
  .where('userId', '==', userId)
  .orderBy('timestamp', 'desc')

// Ejemplo: Órdenes pendientes de pago
orders
  .where('paymentStatus', '==', 'pending')
  .orderBy('createdAt', 'desc')
```

---

## ⚠️ Limitaciones Importantes

### Firestore
- Máximo 500 writes/segundo por documento
- Máximo 10,000 writes/segundo por colección
- Máximo 1MB por documento
- Máximo 500 campos por documento

### Storage
- Máximo 10GB por archivo (límite de NFCores: 10MB)
- Bandwidth: 50GB/día en plan gratuito
- Operations: 200K/día en plan gratuito

### Hosting
- Máximo 10GB storage
- Máximo 360GB bandwidth/mes en plan gratuito

---

## 🔄 Sincronización con Documentación

Todos los archivos de configuración están **100% sincronizados** con:

- `.github/database-schema.md` - 16 colecciones definidas
- `.github/user-roles.md` - Roles y permisos
- `.github/copilot-instructions.md` - Definiciones oficiales

**No modificar las reglas sin actualizar la documentación oficial.**

---

## 📝 Checklist de Configuración

- [ ] Proyecto creado en Firebase Console
- [ ] Autenticación habilitada (Email/Password)
- [ ] Firestore Database creado (southamerica-east1)
- [ ] Storage configurado
- [ ] Credenciales copiadas a `.env`
- [ ] Firebase CLI instalado
- [ ] Firebase login realizado
- [ ] Rules deployadas: `firebase deploy --only firestore:rules`
- [ ] Índices deployados: `firebase deploy --only firestore:indexes`
- [ ] Storage rules deployadas: `firebase deploy --only storage`
- [ ] Emulators testeados localmente
- [ ] Verificación de acceso público a `emergencyProfiles/`

---

## 🆘 Soporte

**Documentación Oficial:**
- Firebase: https://firebase.google.com/docs
- Firestore Security Rules: https://firebase.google.com/docs/firestore/security/get-started
- Storage Rules: https://firebase.google.com/docs/storage/security

**Proyecto NFCores:**
- Repositorio: https://github.com/cknight775/nfcores-v3
- Documentación: `.github/*.md`
