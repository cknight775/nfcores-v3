# Stack Tecnológico - NFCores

**Última actualización**: 2025-01-21 21:05:09 UTC  
**Actualizado por**: @cknight775  
**Versión**: 2.0.0 - SINCRONIZADA

---

## 🎯 Filosofía Tecnológica

**Principios:**
1. **Simplicidad sobre complejidad** - Usar tecnologías probadas y estables
2. **Performance crítico** - Página de emergencia < 2 segundos
3. **Escalabilidad** - Firebase maneja 100K+ usuarios
4. **Seguridad first** - Datos médicos sensibles protegidos
5. **Developer Experience** - TypeScript + herramientas modernas

---

## 🏗️ ARQUITECTURA GENERAL

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │   Web    │  │  Mobile  │  │   PWA    │             │
│  │ Desktop  │  │  Tablets │  │ Offline  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTPS / WebSocket
                     │
┌────────────────────▼────────────────────────────────────┐
│              BACKEND (Firebase)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │   Auth   │  │ Firestore│  │ Storage  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Functions│  │ Hosting  │  │Analytics │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ APIs
                     │
┌────────────────────▼────────────────────────────────────┐
│           INTEGRACIONES EXTERNAS                        │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │ MercadoPago  │  │ Chilexpress  │                    │
│  │   (Pagos)    │  │   (Envíos)   │                    │
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 FRONTEND

### Framework Principal
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

**¿Por qué React 18?**
- ✅ Concurrent rendering para mejor UX
- ✅ Suspense para lazy loading
- ✅ Automatic batching para menos re-renders
- ✅ Server Components (futuro)
- ✅ Comunidad masiva y ecosistema maduro

---

### Build Tool
```json
{
  "vite": "^5.0.8"
}
```

**¿Por qué Vite?**
- ✅ **Extremadamente rápido** (HMR en < 50ms)
- ✅ Build optimizado con Rollup
- ✅ Tree-shaking automático
- ✅ Code splitting inteligente
- ✅ TypeScript out-of-the-box

**Configuración crítica:**
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: false, // En producción
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        },
      },
    },
    chunkSizeWarningLimit: 250, // KB
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

### Routing
```json
{
  "react-router-dom": "^6.21.0"
}
```

**Features usados:**
- Data Router (loader/action pattern)
- Nested routes con Outlet
- Protected routes con guards
- Lazy loading de rutas

**Ejemplo de configuración:**
```typescript
// src/router/index.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/id/:token',
    element: <PerfilPublico />,
    // Crítico: Sin lazy loading para performance
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            lazy: () => import('./pages/dashboard/DashboardPage'),
          },
          // Más rutas...
        ],
      },
    ],
  },
]);
```

---

### Estado Global
```json
{
  "react": "^18.2.0"
}
```

**Estrategia:** Context API + Reducers (sin Redux)

**¿Por qué NO Redux?**
- ❌ Boilerplate excesivo para nuestro caso
- ❌ Complejidad innecesaria
- ✅ Context API + useReducer es suficiente
- ✅ Menos bundle size

**Contexts principales:**
```typescript
// src/context/
├── AuthContext.tsx       // Usuario autenticado
├── NotificationContext.tsx // Notificaciones en tiempo real
└── PanelContext.tsx      // Datos del panel (familiar/empresarial)
```

---

### Styling
```json
{
  "tailwindcss": "^3.4.0",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32"
}
```

**¿Por qué Tailwind?**
- ✅ Utility-first = desarrollo rápido
- ✅ Tree-shaking automático = CSS mínimo en producción
- ✅ Responsive design fácil
- ✅ Dark mode built-in (futuro)
- ✅ Purge CSS = solo 10-20KB en producción

**Configuración de colores (sincronizada con `systemConfig/branding`):**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DC2626', // Red-600
          hover: '#B91C1C',   // Red-700
        },
        secondary: {
          DEFAULT: '#10B981', // Green-600
          hover: '#059669',   // Green-700
        },
        accent: {
          DEFAULT: '#3B82F6', // Blue-600
          hover: '#2563EB',   // Blue-700
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

---

### UI Components
```json
{
  "@headlessui/react": "^1.7.17",
  "react-icons": "^4.12.0"
}
```

**¿Por qué Headless UI?**
- ✅ Componentes accesibles (WCAG 2.1)
- ✅ Sin estilos predefinidos (total control)
- ✅ Keyboard navigation built-in
- ✅ Foco en UX

**Componentes usados:**
- Dialog (Modals)
- Menu (Dropdowns)
- Listbox (Selects personalizados)
- Transition (Animaciones)
- Tab (Tabs de perfil)

---

### Validación de Formularios
```json
{
  "zod": "^3.22.4",
  "react-hook-form": "^7.49.2"
}
```

**¿Por qué Zod?**
- ✅ TypeScript-first
- ✅ Inferencia automática de tipos
- ✅ Validación en frontend Y backend (compartir schemas)
- ✅ Mensajes de error personalizables

**Ejemplo de schema compartido:**
```typescript
// src/schemas/emergencyProfile.schema.ts
export const emergencyProfileSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName: z.string().min(2, 'Mínimo 2 caracteres'),
  bloodType: z.enum(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']),
  allergies: z.array(z.object({
    name: z.string(),
    severity: z.enum(['leve', 'moderada', 'grave']),
    notes: z.string().optional(),
  })),
  medications: z.array(z.object({
    name: z.string(),
    dosage: z.string(),
    frequency: z.string(),
  })),
  emergencyContacts: z.array(z.object({
    name: z.string(),
    phone: z.string().regex(/^\+56\d{9}$/, 'Formato: +56912345678'),
    relationship: z.string(),
  })).max(5, 'Máximo 5 contactos'),
});

export type EmergencyProfileFormData = z.infer<typeof emergencyProfileSchema>;
```

---

### HTTP Client
```json
{
  "axios": "^1.6.2"
}
```

**Uso:** Solo para APIs externas (MercadoPago, Chilexpress)

**Firebase usa su propio SDK (no Axios)**

---

### TypeScript
```json
{
  "typescript": "^5.3.3",
  "@types/react": "^18.2.45",
  "@types/react-dom": "^18.2.18"
}
```

**Configuración estricta:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    
    // Strict checks
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    // Path mapping
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

### PWA (Progressive Web App)
```json
{
  "vite-plugin-pwa": "^0.17.4"
}
```

**Configuración para página de emergencia:**
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'robots.txt', 'logo.png'],
  manifest: {
    name: 'NFCores - Información Vital en Emergencias',
    short_name: 'NFCores',
    description: 'Acceso instantáneo a información médica de emergencia',
    theme_color: '#DC2626',
    background_color: '#FFFFFF',
    display: 'standalone',
    icons: [
      {
        src: 'logo-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'logo-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  workbox: {
    // Cache de perfiles de emergencia (crítico)
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*emergencyProfiles.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'emergency-profiles-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24, // 24 horas
          },
        },
      },
    ],
  },
})
```

---

## 🔥 BACKEND (Firebase)

### Firebase SDK
```json
{
  "firebase": "^10.7.1"
}
```

**Servicios usados:**
1. **Authentication** - Login/registro
2. **Firestore** - Base de datos NoSQL
3. **Cloud Functions** - Backend serverless
4. **Cloud Storage** - Archivos/documentos
5. **Hosting** - Deploy frontend
6. **Analytics** - Métricas de uso

**Configuración:**
```typescript
// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
```

---

### Cloud Functions (Backend)
```json
{
  "firebase-functions": "^4.5.0",
  "firebase-admin": "^11.11.1"
}
```

**Runtime:** Node.js 18

**Región:** `southamerica-east1` (São Paulo, Brasil)

**Funciones principales:**
```typescript
// functions/src/index.ts
export { mercadoPagoWebhook } from './webhooks/mercadoPagoWebhook';
export { chilexpressWebhook } from './webhooks/chilexpressWebhook';
export { onUserCreated } from './triggers/onUserCreated';
export { onOrderCreated } from './triggers/onOrderCreated';
export { dailyBackup } from './scheduled/dailyBackup';
export { expirationReminders } from './scheduled/expirationReminders';
```

**Dependencias backend:**
```json
{
  "axios": "^1.6.2",
  "mercadopago": "^2.0.9",
  "zod": "^3.22.4"
}
```

---

### Firestore (Base de Datos)

**15 Colecciones principales (sincronizadas con `database-schema.md`):**
```
1. users/
2. emergencyProfiles/
3. webIds/
4. familyPanels/
5. enterprisePanels/
6. orders/
7. coupons/
8. accessLogs/
9. notifications/
10. supportTickets/
11. auditLogs/
12. systemConfig/
13. emailTemplates/
14. faqs/
15. testimonials/
16. partners/
```

**Índices compuestos:** Ver `firestore.indexes.json`

**Límites oficiales:**
```typescript
const FIRESTORE_LIMITS = {
  maxDocumentSize: 1048576,      // 1 MB
  maxBatchWrites: 500,
  maxTransactionSize: 10485760,  // 10 MB
  maxQueriesPerSecond: 10000,    // Por proyecto
};
```

---

### Cloud Storage

**Estructura de buckets:**
```
gs://nfcores.appspot.com/
├── documents/
│   ├── {userId}/
│   │   └── {documentId}.pdf
├── photos/
│   ├── {userId}/
│   │   └── profile.jpg
├── branding/
│   ├── logo.svg
│   └── banners/
└── backups/
    └── {collection}_{timestamp}.json
```

**Límites por pack (sincronizados con `systemConfig/limits`):**
```typescript
const STORAGE_LIMITS = {
  individual: {
    maxFiles: 10,
    maxFileSizeMB: 5,
    totalStorageMB: 50,
  },
  familiar: {
    maxFiles: 50,
    maxFileSizeMB: 5,
    totalStorageMB: 200,
  },
  empresarial: {
    maxFiles: Infinity,
    maxFileSizeMB: 10,
    totalStorageGB: 5,
  },
};
```

---

## 🔌 INTEGRACIONES EXTERNAS

### MercadoPago (Pagos)
```json
{
  "mercadopago": "^2.0.9"
}
```

**API Version:** v1

**Endpoints usados:**
- `POST /checkout/preferences` - Crear preferencia de pago
- `GET /v1/payments/{id}` - Consultar pago
- `POST /v1/payments/{id}/refunds` - Reembolsos

**Webhook:** `POST /api/webhooks/mercadopago`

**Estados manejados (sincronizados):**
```typescript
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
```

---

### Chilexpress (Envíos)
**API Version:** v1.0

**Endpoints usados:**
- `POST /rating/api/v1.0/tariff/region` - Calcular costo
- `POST /transport-orders/api/v1.0/transport-orders` - Crear orden
- `GET /tracking/api/v1.0/shipments/{tracking}` - Tracking

**Estados manejados (sincronizados):**
```typescript
type ShippingStatus = 
  | 'pending'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'failed';
```

---

## 🧪 TESTING

### Testing Framework
```json
{
  "vitest": "^1.1.0",
  "@testing-library/react": "^14.1.2",
  "@testing-library/jest-dom": "^6.1.5",
  "@testing-library/user-event": "^14.5.1"
}
```

**¿Por qué Vitest?**
- ✅ Compatible con Vite (mismo config)
- ✅ Extremadamente rápido
- ✅ API compatible con Jest
- ✅ ESM first

---

### E2E Testing
```json
{
  "cypress": "^13.6.0"
}
```

**Tests críticos:**
- Página de emergencia `/id/:token`
- Flujo completo de compra
- Activación de pulsera

---

## 📊 ANALYTICS Y MONITORING

### Google Analytics 4
```json
{
  "firebase": "^10.7.1"
}
```

**Eventos trackeados:**
```typescript
const TRACKED_EVENTS = [
  'page_view',
  'purchase',
  'emergency_profile_accessed',
  'select_item', // Selección de pack
  'begin_checkout',
  'add_payment_info',
  'sign_up',
  'login',
];
```

---

### Sentry (Error Tracking) - FUTURO
```json
{
  "@sentry/react": "^7.91.0"
}
```

**Integración planificada para Sprint 6**

---

## 📦 GESTIÓN DE DEPENDENCIAS

### Package Manager
```
pnpm (recomendado) o npm
```

**¿Por qué pnpm?**
- ✅ Más rápido que npm/yarn
- ✅ Ahorro de espacio (symlinks)
- ✅ Más estricto (evita phantom deps)

---

### Versioning
**Estrategia:** Semantic Versioning (semver)

```
MAJOR.MINOR.PATCH

Ejemplo: 2.1.3
- MAJOR (2): Cambios incompatibles
- MINOR (1): Nueva funcionalidad compatible
- PATCH (3): Bug fixes
```

---

## 🚫 DEPENDENCIAS PROHIBIDAS

### ❌ NO USAR (Sin aprobación)

```json
{
  "moment": "❌",           // Usar date-fns
  "lodash": "❌",           // Usar funciones nativas ES6+
  "jquery": "❌",           // Nunca usar jQuery
  "bootstrap": "❌",        // Usar Tailwind
  "material-ui": "❌",      // Usar Headless UI
  "redux": "❌",            // Usar Context API
  "styled-components": "❌", // Usar Tailwind
  "express": "❌"           // Usar Firebase Functions
}
```

---

## ✅ DEPENDENCIAS PERMITIDAS (Preaprobadas)

### Utilidades
```json
{
  "date-fns": "^2.30.0",        // Manejo de fechas
  "clsx": "^2.0.0",             // Clases condicionales
  "react-hot-toast": "^2.4.1",  // Notificaciones toast
  "chart.js": "^4.4.1",         // Gráficos (admin)
  "react-chartjs-2": "^5.2.0"   // Wrapper React para Chart.js
}
```

### Development
```json
{
  "eslint": "^8.56.0",
  "prettier": "^3.1.1",
  "@typescript-eslint/parser": "^6.16.0",
  "@typescript-eslint/eslint-plugin": "^6.16.0"
}
```

---

## 🔄 PROCESO DE ACTUALIZACIÓN DE DEPENDENCIAS

### Frecuencia
- **Críticas (seguridad):** Inmediato
- **Menores (patches):** Mensual
- **Mayores (features):** Cada 3 meses (revisar breaking changes)

### Comando
```bash
# Verificar actualizaciones
pnpm outdated

# Actualizar patches (seguro)
pnpm update

# Actualizar a latest (revisar breaking changes)
pnpm update --latest
```

---

## 📐 LÍMITES Y PRECIOS (Sincronizados)

### Precios Default (Administrables desde `systemConfig/pricing`)
```typescript
const DEFAULT_PRICING = {
  individual: {
    price: 29990,      // CLP
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

### Límites por Pack (Administrables desde `systemConfig/limits`)
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
    maxDocuments: Infinity,
    maxFileSizeMB: 10,
    totalStorageGB: 5,
    maxContacts: Infinity,
  },
};
```

---

## ⚠️ IMPORTANTE PARA COPILOT

### Antes de Agregar Nueva Dependencia:

1. **Verificar si es necesaria**
   - ¿Existe alternativa nativa?
   - ¿Ya tenemos algo similar?

2. **Revisar lista de prohibidas**
   - Si está prohibida, buscar alternativa aprobada

3. **Validar**
   - Bundle size impact
   - Última actualización (< 6 meses)
   - Issues abiertas en GitHub
   - Downloads semanales (> 10k)

4. **Documentar en este archivo**
   - Agregar a sección correspondiente
   - Explicar por qué se usa

5. **Actualizar package.json**
   ```bash
   pnpm add nombre-paquete
   ```

---

## 🎯 PERFORMANCE TARGETS (Sincronizados)

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
  bundleSize: {
    main: 250 * 1024,      // 250 KB
    vendor: 500 * 1024,    // 500 KB
    total: 1000 * 1024,    // 1 MB
  },
};
```

---

**Última sincronización**: 2025-01-21 21:05:09 UTC  
**Versión**: 2.0.0  
**Estado**: ✅ SINCRONIZADO CON 12 DOCUMENTOS  
**Referencias**: 
- `.github/copilot-instructions.md` (definiciones oficiales)
- `.github/database-schema.md` (límites y configuraciones)
- `.github/admin-manageable-elements.md` (precios administrables)