# Estructura de Carpetas del Proyecto - NFCores

**Última actualización**: 2025-01-21 21:10:28 UTC  
**Actualizado por**: @cknight775  
**Versión**: 2.0.0 - SINCRONIZADA

---

## 🗂️ Estructura General del Repositorio

```
nfcores-web/
├── .github/                        # GitHub config y documentación
│   ├── workflows/                  # GitHub Actions (CI/CD)
│   │   ├── ci.yml                  # Tests y linting
│   │   ├── deploy.yml              # Deploy a Firebase
│   │   └── lighthouse.yml          # Performance checks
│   ├── copilot-instructions.md     # ✅ Instrucciones para Copilot
│   ├── tech-stack.md               # ✅ Stack tecnológico
│   ├── user-roles.md               # ✅ Roles y permisos
│   ├── emergency-profile-design.md # ✅ Diseño página emergencia
│   ├── project-status.md           # ✅ Estado del proyecto
│   ├── routes-architecture.md      # ✅ Arquitectura de rutas (56 rutas)
│   ├── database-schema.md          # ✅ Esquema Firestore (16 colecciones)
│   ├── folder-structure.md         # ✅ Este archivo
│   ├── user-flows-complete.md      # 📝 Flujos de usuario
│   ├── api-integrations.md         # 📝 APIs externas
│   ├── admin-manageable-elements.md # ✅ Gestión de paneles
│   └── testing-guidelines.md       # 📝 Guías de testing
│
├── docs/                           # Documentación adicional
│   ├── api/                        # Documentación de APIs
│   ├── deployment/                 # Guías de despliegue
│   └── architecture/               # Diagramas y arquitectura
│
├── functions/                      # Cloud Functions (Backend)
│   ├── src/
│   │   ├── index.ts                # ✅ Entry point de functions
│   │   ├── webhooks/               # ✅ Webhooks externos
│   │   │   ├── mercadoPagoWebhook.ts
│   │   │   └── chilexpressWebhook.ts
│   │   ├── generators/             # ✅ Generadores de IDs
│   │   │   ├── webIdGenerator.ts
│   │   │   ├── panelIdGenerator.ts
│   │   │   └── orderIdGenerator.ts
│   │   ├── notifications/          # ✅ Sistema de notificaciones
│   │   │   ├── notificationService.ts
│   │   │   ├── emailService.ts
│   │   │   └── pushService.ts
│   │   ├── triggers/               # 🚧 Firestore triggers
│   │   │   ├── onUserCreated.ts
│   │   │   ├── onOrderCreated.ts
│   │   │   └── onProfileAccessed.ts
│   │   ├── scheduled/              # 📝 Cloud Scheduler jobs
│   │   │   ├── expirationReminders.ts
│   │   │   └── cleanupOldLogs.ts
│   │   ├── utils/                  # ✅ Utilidades backend
│   │   │   ├── validation.ts
│   │   │   ├── helpers.ts
│   │   │   └── logger.ts
│   │   └── types/                  # ✅ Types compartidos
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.local                  # Variables de entorno (gitignored)
│
├── public/                         # Archivos estáticos
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json               # PWA manifest
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── images/
│   │   ├── logo.png
│   │   ├── logo-192x192.png        # PWA icon
│   │   ├── logo-512x512.png        # PWA icon
│   │   ├── og-image.jpg            # Open Graph image
│   │   └── default-avatar.png
│   └── fonts/                      # Fuentes locales (si aplica)
│
├── src/                            # Código fuente React
│   ├── components/                 # Componentes React
│   │   ├── admin/                  # 🚧 Componentes admin (20%)
│   │   │   ├── Dashboard/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── MetricsCard.tsx
│   │   │   │   └── QuickActions.tsx
│   │   │   ├── Users/              # 📝 Gestión de usuarios
│   │   │   │   ├── UsersTable.tsx
│   │   │   │   ├── UserEditModal.tsx
│   │   │   │   └── UserFilters.tsx
│   │   │   ├── WebIDs/             # 📝 Gestión de WebIDs
│   │   │   │   ├── WebIDsTable.tsx
│   │   │   │   └── GenerateWebIDModal.tsx
│   │   │   ├── Panels/             # 📝 Gestión de paneles
│   │   │   │   ├── PanelsTable.tsx
│   │   │   │   └── PanelDetailsModal.tsx
│   │   │   ├── Orders/             # 📝 Gestión de órdenes
│   │   │   │   ├── OrdersTable.tsx
│   │   │   │   └── OrderDetailsModal.tsx
│   │   │   ├── Support/            # 📝 Tickets de soporte
│   │   │   │   ├── TicketsTable.tsx
│   │   │   │   └── TicketChat.tsx
│   │   │   └── Content/            # 📝 Gestión de contenido
│   │   │       ├── EditPricingForm.tsx
│   │   │       ├── EditFooterForm.tsx
│   │   │       └── ManageFAQs.tsx
│   │   │
│   │   ├── auth/                   # ✅ Autenticación (100%)
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ResetPasswordForm.tsx
│   │   │   └── SocialAuthButtons.tsx
│   │   │
│   │   ├── dashboard/              # 🚧 Dashboard usuario (60%)
│   │   │   ├── DashboardHome.tsx
│   │   │   ├── WebIdCard.tsx
│   │   │   ├── ActivityCard.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── UpgradeBanner.tsx
│   │   │
│   │   ├── family/                 # 📝 Panel familiar (0%)
│   │   │   ├── FamilyDashboard.tsx
│   │   │   ├── MemberCard.tsx
│   │   │   ├── MembersList.tsx
│   │   │   ├── AddMemberModal.tsx
│   │   │   ├── AddMemberWizard.tsx
│   │   │   └── FamilyNotifications.tsx
│   │   │
│   │   ├── enterprise/             # 📝 Panel empresarial (0%)
│   │   │   ├── EnterpriseDashboard.tsx
│   │   │   ├── EmployeesTable.tsx
│   │   │   ├── AddEmployeeModal.tsx
│   │   │   ├── BulkImportModal.tsx
│   │   │   ├── EmployeeFilters.tsx
│   │   │   └── ReportsSection.tsx
│   │   │
│   │   ├── profile/                # ✅ Perfil y configuración (100%)
│   │   │   ├── PersonalInfo.tsx
│   │   │   ├── MedicalInfo.tsx
│   │   │   ├── EmergencyContacts.tsx
│   │   │   ├── Documents.tsx
│   │   │   ├── PrivacySettings.tsx
│   │   │   └── ProfileTabs.tsx
│   │   │
│   │   ├── emergency/              # ✅ Perfil público emergencia (100%)
│   │   │   ├── PublicProfile.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MedicalInfoCard.tsx
│   │   │   ├── ContactsCard.tsx
│   │   │   ├── DocumentsCard.tsx
│   │   │   └── EmergencyNotesCard.tsx
│   │   │
│   │   ├── checkout/               # ✅ Proceso de compra (100%)
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── PackSelector.tsx
│   │   │   ├── ShippingForm.tsx
│   │   │   ├── PaymentSection.tsx
│   │   │   ├── CouponInput.tsx
│   │   │   └── OrderSummary.tsx
│   │   │
│   │   ├── guards/                 # ✅ Protección de rutas (100%)
│   │   │   ├── AuthGuard.tsx
│   │   │   ├── RoleGuard.tsx
│   │   │   ├── PackGuard.tsx
│   │   │   ├── FamilyPackGuard.tsx
│   │   │   ├── EnterprisePackGuard.tsx
│   │   │   └── AdminGuard.tsx
│   │   │
│   │   ├── layout/                 # ✅ Layouts principales (100%)
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   └── PublicLayout.tsx
│   │   │
│   │   ├── shared/                 # ✅ Componentes compartidos (100%)
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── NotFoundPage.tsx
│   │   │   ├── UnauthorizedPage.tsx
│   │   │   ├── LogoCarousel.tsx
│   │   │   └── SEOHead.tsx
│   │   │
│   │   └── ui/                     # ✅ Componentes UI base (100%)
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       ├── Dropdown.tsx
│   │       ├── Toast.tsx
│   │       ├── Badge.tsx
│   │       ├── Table.tsx
│   │       ├── Tabs.tsx
│   │       └── Avatar.tsx
│   │
│   ├── config/                     # ✅ Configuración (100%)
│   │   ├── firebase.ts             # Firebase config
│   │   ├── routes.ts               # Definición de rutas
│   │   ├── constants.ts            # Constantes globales
│   │   └── env.ts                  # Variables de entorno
│   │
│   ├── context/                    # ✅ React Contexts (100%)
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── NotificationContext.tsx
│   │   └── PanelContext.tsx
│   │
│   ├── hooks/                      # 🚧 Custom Hooks (70%)
│   │   ├── useAuth.ts              # ✅
│   │   ├── useUser.ts              # ✅
│   │   ├── useNotifications.ts     # 🚧 50%
│   │   ├── usePackStatus.ts        # 📝
│   │   ├── usePanelData.ts         # 📝
│   │   ├── useEmergencyProfile.ts  # ✅
│   │   ├── useAnalytics.ts         # 🚧 60%
│   │   ├── usePermissions.ts       # ✅
│   │   └── useDebounce.ts          # ✅
│   │
│   ├── pages/                      # 🚧 Páginas principales (65%)
│   │   ├── admin/                  # 🚧 20%
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── UsersManagement.tsx         # 📝
│   │   │   ├── WebIDsManagement.tsx        # 📝
│   │   │   ├── PanelsManagement.tsx        # 📝
│   │   │   ├── OrdersManagement.tsx        # 📝
│   │   │   ├── CouponsPage.tsx             # 📝
│   │   │   ├── SupportTickets.tsx          # 📝
│   │   │   └── content/                    # 📝 Gestión de contenido
│   │   │       ├── EditHomePage.tsx
│   │   │       ├── EditPricingPage.tsx
│   │   │       ├── ManageBannersPage.tsx
│   │   │       ├── EditFooterPage.tsx
│   │   │       └── ManageFAQsPage.tsx
│   │   │
│   │   ├── auth/                   # ✅ 100%
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── ResetPasswordPage.tsx
│   │   │   └── VerifyEmailPage.tsx
│   │   │
│   │   ├── dashboard/              # 🚧 60%
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── AnalyticsPage.tsx
│   │   │   ├── DocumentsPage.tsx
│   │   │   ├── ContactsPage.tsx
│   │   │   ├── SettingsPage.tsx
│   │   │   ├── FamilyDashboard.tsx         # 📝 Sprint 4
│   │   │   ├── FamilyMembersPage.tsx       # 📝 Sprint 4
│   │   │   ├── AddFamilyMember.tsx         # 📝 Sprint 4
│   │   │   ├── EnterpriseDashboard.tsx     # 📝 Sprint 5
│   │   │   ├── EmployeesPage.tsx           # 📝 Sprint 5
│   │   │   ├── AddEmployee.tsx             # 📝 Sprint 5
│   │   │   ├── BulkImportPage.tsx          # 📝 Sprint 5
│   │   │   └── ReportsPage.tsx             # 📝 Sprint 5
│   │   │
│   │   ├── public/                 # ✅ 100%
│   │   │   ├── HomePage.tsx
│   │   │   ├── PricingPage.tsx
│   │   │   ├── HowItWorksPage.tsx
│   │   │   ├── TestimonialsPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── FAQPage.tsx
│   │   │   ├── TermsPage.tsx
│   │   │   └── PrivacyPage.tsx
│   │   │
│   │   ├── PerfilPublico.tsx       # ✅ 100% CRÍTICO
│   │   ├── CheckoutPage.tsx        # ✅ 100%
│   │   ├── PurchaseSuccessPage.tsx # ✅ 100%
│   │   └── ActivateBraceletPage.tsx # 📝
│   │
│   ├── services/                   # 🚧 Servicios de negocio (70%)
│   │   ├── admin/                  # 📝 10%
│   │   │   ├── users.ts
│   │   │   ├── webids.ts
│   │   │   ├── panels.ts
│   │   │   ├── orders.ts
│   │   │   └── coupons.ts
│   │   │
│   │   ├── analytics/              # 🚧 40%
│   │   │   ├── profileAnalytics.ts
│   │   │   ├── userAnalytics.ts
│   │   │   └── systemAnalytics.ts
│   │   │
│   │   ├── firestore/              # 🚧 70%
│   │   │   ├── users.ts            # ✅
│   │   │   ├── emergencyProfiles.ts # ✅
│   │   │   ├── webids.ts           # ✅
│   │   │   ├── familyPanels.ts     # 📝
│   │   │   ├── enterprisePanels.ts # 📝
│   │   │   ├── orders.ts           # ✅
│   │   │   ├── coupons.ts          # 📝
│   │   │   ├── accessLogs.ts       # ✅
│   │   │   ├── notifications.ts    # ✅
│   │   │   ├── supportTickets.ts   # 📝
│   │   │   ├── faqs.ts             # 📝
│   │   │   ├── testimonials.ts     # 📝
│   │   │   └── systemConfig.ts     # ✅
│   │   │
│   │   ├── payment/                # ✅ 100%
│   │   │   └── mercadoPagoService.ts
│   │   │
│   │   ├── shipping/               # 🚧 30%
│   │   │   └── chilexpressService.ts
│   │   │
│   │   └── storage/                # ✅ 100%
│   │       ├── index.ts
│   │       ├── uploadFile.ts
│   │       ├── deleteFile.ts
│   │       └── getDownloadURL.ts
│   │
│   ├── types/                      # ✅ TypeScript Types (100%)
│   │   ├── user.ts                 # ✅ Sincronizado
│   │   ├── emergencyProfile.ts     # ✅ Sincronizado
│   │   ├── webid.ts                # ✅ Sincronizado
│   │   ├── panel.ts                # ✅ Sincronizado
│   │   ├── order.ts                # ✅ Sincronizado
│   │   ├── coupon.ts               # ✅ Sincronizado
│   │   ├── notification.ts         # ✅ Sincronizado
│   │   ├── admin.ts                # ✅ Sincronizado
│   │   └── index.ts                # ✅ Barrel export
│   │
│   ├── utils/                      # ✅ Utilidades (100%)
│   │   ├── validation.ts           # Validaciones (Zod)
│   │   ├── formatters.ts           # Formateo de datos
│   │   ├── helpers.ts              # Funciones auxiliares
│   │   ├── seo.ts                  # Utilidades SEO
│   │   ├── logger.ts               # Logging frontend
│   │   └── constants.ts            # Constantes
│   │
│   ├── styles/                     # Estilos
│   │   ├── globals.css             # Estilos globales
│   │   ├── tailwind.css            # Tailwind base
│   │   └── themes/                 # Temas (futuro)
│   │
│   ├── App.tsx                     # ✅ Componente raíz
│   ├── main.tsx                    # ✅ Entry point
│   └── vite-env.d.ts               # Vite types
│
├── .env.example                    # Ejemplo de variables de entorno
├── .env.local                      # Variables locales (gitignored)
├── .eslintrc.json                  # ESLint config
├── .prettierrc                     # Prettier config
├── .gitignore
├── firebase.json                   # Firebase config
├── firestore.rules                 # ✅ Firestore security rules (100%)
├── firestore.indexes.json          # ✅ Firestore indexes (100%)
├── storage.rules                   # ✅ Storage security rules (100%)
├── package.json
├── tsconfig.json                   # TypeScript config
├── tailwind.config.js              # Tailwind config
├── postcss.config.js               # PostCSS config
├── vite.config.ts                  # Vite config
└── README.md
```

---

## 📦 CONVENCIONES DE NOMENCLATURA (Sincronizadas)

### Archivos y Carpetas
```
✅ CORRECTO:
- PascalCase para componentes: UserCard.tsx
- camelCase para utilidades: formatters.ts
- camelCase para servicios: mercadoPagoService.ts
- kebab-case para páginas multi-palabra: reset-password.tsx (opcional)
- lowercase para carpetas: components/, services/

❌ INCORRECTO:
- user-card.tsx (componente en kebab-case)
- Formatters.ts (utilidad en PascalCase)
- Components/ (carpeta en PascalCase)
```

### Componentes
```typescript
// ✅ CORRECTO: Un componente por archivo
// src/components/ui/Button.tsx
export const Button: React.FC<Props> = ({ ... }) => { ... };

// ✅ CORRECTO: Componentes relacionados en misma carpeta
// src/components/dashboard/
// ├── DashboardHome.tsx (componente principal)
// ├── WebIdCard.tsx (subcomponente)
// └── ActivityCard.tsx (subcomponente)

// ❌ INCORRECTO: Múltiples componentes sin relación en un archivo
```

### Servicios
```typescript
// ✅ CORRECTO: Agrupar por dominio
// src/services/firestore/users.ts
export const createUser = async () => { ... };
export const getUser = async () => { ... };
export const updateUser = async () => { ... };

// ❌ INCORRECTO: Un archivo por función
// src/services/createUser.ts
// src/services/getUser.ts
```

### Types (Sincronizados con database-schema.md)
```typescript
// ✅ CORRECTO: Tipos por dominio
// src/types/user.ts
export interface User { ... }
export type SystemRole = 'user' | 'admin' | 'super_admin' | 'moderator' | 'content_editor';
export type ProfileType = 'individual' | 'familiar_admin' | 'familiar_member' 
                        | 'empresarial_admin' | 'empresarial_employee';

// src/types/index.ts (barrel export)
export * from './user';
export * from './emergencyProfile';
export * from './panel';
```

---

## 🎯 REGLAS DE ORGANIZACIÓN

### 1. Componentes
```
Regla: Un componente = Un archivo
Excepción: Subcomponentes pequeños privados del componente padre

✅ CORRECTO:
components/
├── dashboard/
│   ├── DashboardHome.tsx       # Componente principal
│   ├── WebIdCard.tsx           # Subcomponente reutilizable
│   └── ActivityCard.tsx        # Subcomponente reutilizable

❌ INCORRECTO:
components/
└── Dashboard.tsx               # Múltiples componentes en un archivo
```

### 2. Servicios
```
Regla: Agrupar funciones relacionadas por dominio

✅ CORRECTO:
services/
├── firestore/
│   ├── users.ts                # CRUD de usuarios
│   ├── emergencyProfiles.ts    # CRUD de perfiles
│   └── webids.ts               # CRUD de WebIDs

❌ INCORRECTO:
services/
├── createUser.ts
├── getUser.ts
├── updateUser.ts               # Demasiada fragmentación
└── deleteUser.ts
```

### 3. Pages
```
Regla: Una página = Un archivo principal + componentes específicos

✅ CORRECTO:
pages/
├── admin/
│   ├── AdminDashboard.tsx      # Página principal
│   └── UsersManagement.tsx     # Página específica

components/
├── admin/
│   ├── Dashboard/              # Componentes de AdminDashboard
│   │   ├── MetricsCard.tsx
│   │   └── QuickActions.tsx
│   └── Users/                  # Componentes de UsersManagement
│       ├── UsersTable.tsx
│       └── UserEditModal.tsx
```

### 4. Hooks
```
Regla: Un hook = Un archivo
Prefijo: use + PascalCase

✅ CORRECTO:
hooks/
├── useAuth.ts
├── useNotifications.ts
├── usePermissions.ts
└── useDebounce.ts

❌ INCORRECTO:
hooks/
└── hooks.ts                    # Todos los hooks juntos
```

---

## 📂 CARPETAS ESPECIALES

### `.github/` (12 documentos sincronizados)
**Propósito**: Configuración de GitHub y documentación del proyecto  
**Regla**: Solo archivos relacionados con GitHub o documentación de Copilot

```
.github/
├── workflows/                  # GitHub Actions
│   ├── ci.yml
│   ├── deploy.yml
│   └── lighthouse.yml
├── copilot-instructions.md     # ✅ v2.0.0 - Sincronizado
├── tech-stack.md               # ✅ v2.0.0 - Sincronizado
├── user-roles.md               # ✅ v2.0.0 - Sincronizado
├── emergency-profile-design.md # ✅ v2.0.0 - Sincronizado
├── project-status.md           # ✅ v2.0.0 - Sincronizado
├── routes-architecture.md      # ✅ v2.0.0 - Sincronizado (56 rutas)
├── database-schema.md          # ✅ v2.0.0 - Sincronizado (16 colecciones)
├── folder-structure.md         # ✅ v2.0.0 - Este archivo
├── user-flows-complete.md      # 📝 Pendiente
├── api-integrations.md         # 📝 Pendiente
├── admin-manageable-elements.md # ✅ v2.0.0 - Sincronizado
└── testing-guidelines.md       # 📝 Pendiente
```

### `functions/` (Backend Firebase)
**Propósito**: Cloud Functions (Backend serverless)  
**Regla**: Separar por tipo de función (webhooks, triggers, scheduled)

```
functions/
├── src/
│   ├── webhooks/               # HTTP endpoints externos
│   │   ├── mercadoPagoWebhook.ts ✅
│   │   └── chilexpressWebhook.ts 📝
│   ├── triggers/               # Firestore triggers
│   │   ├── onUserCreated.ts 🚧
│   │   ├── onOrderCreated.ts 🚧
│   │   └── onProfileAccessed.ts ✅
│   ├── scheduled/              # Cron jobs
│   │   ├── expirationReminders.ts 📝
│   │   └── dailyBackup.ts 📝
│   ├── generators/             # Generadores de IDs
│   │   ├── webIdGenerator.ts ✅
│   │   ├── panelIdGenerator.ts ✅
│   │   └── orderIdGenerator.ts ✅
│   ├── notifications/          # Sistema de notificaciones
│   │   ├── notificationService.ts ✅
│   │   ├── emailService.ts ✅
│   │   └── pushService.ts 🚧
│   └── utils/                  # Utilidades backend
│       ├── validation.ts ✅
│       ├── helpers.ts ✅
│       └── logger.ts ✅
└── package.json
```

### `src/components/` (Organización por dominio)
**Propósito**: Componentes React reutilizables  
**Regla**: Organizar por dominio/funcionalidad, no por tipo

```
✅ CORRECTO:
components/
├── admin/                      # Dominio: Admin
├── dashboard/                  # Dominio: Dashboard
├── family/                     # Dominio: Panel Familiar
├── enterprise/                 # Dominio: Panel Empresarial
├── emergency/                  # Dominio: Perfil Público
├── guards/                     # Guards (excepción)
└── ui/                         # Componentes base (excepción)

❌ INCORRECTO:
components/
├── buttons/                    # Por tipo
├── forms/                      # Por tipo
└── modals/                     # Por tipo
```

### `src/services/` (Lógica de negocio)
**Propósito**: Lógica de negocio y llamadas a APIs  
**Regla**: Separar por fuente de datos o API externa

```
services/
├── firestore/                  # Datos de Firestore (16 colecciones)
│   ├── users.ts ✅
│   ├── emergencyProfiles.ts ✅
│   ├── webids.ts ✅
│   ├── familyPanels.ts 📝
│   ├── enterprisePanels.ts 📝
│   ├── orders.ts ✅
│   ├── coupons.ts 📝
│   ├── accessLogs.ts ✅
│   ├── notifications.ts ✅
│   ├── supportTickets.ts 📝
│   ├── faqs.ts 📝
│   ├── testimonials.ts 📝
│   └── systemConfig.ts ✅
├── payment/                    # API de MercadoPago
│   └── mercadoPagoService.ts ✅
├── shipping/                   # API de Chilexpress
│   └── chilexpressService.ts 🚧
└── storage/                    # Firebase Storage
    ├── uploadFile.ts ✅
    ├── deleteFile.ts ✅
    └── getDownloadURL.ts ✅
```

---

## 🔍 CÓMO ENCONTRAR ARCHIVOS

### "¿Dónde va este archivo?"

#### Nuevo Componente UI Base
```
✅ src/components/ui/ComponentName.tsx
Ejemplo: src/components/ui/Button.tsx
```

#### Nuevo Componente de Dashboard
```
✅ src/components/dashboard/ComponentName.tsx
Ejemplo: src/components/dashboard/ActivityCard.tsx
```

#### Nuevo Componente de Panel Familiar
```
✅ src/components/family/ComponentName.tsx
Ejemplo: src/components/family/MemberCard.tsx
```

#### Nueva Página
```
✅ src/pages/section/PageName.tsx
Ejemplo: src/pages/admin/UsersManagement.tsx
```

#### Nuevo Servicio Firestore
```
✅ src/services/firestore/collectionName.ts
Ejemplo: src/services/firestore/familyPanels.ts
```

#### Nuevo Hook
```
✅ src/hooks/useFunctionality.ts
Ejemplo: src/hooks/usePanelData.ts
```

#### Nuevo Type (Sincronizado con database-schema.md)
```
✅ src/types/domainName.ts
Ejemplo: src/types/panel.ts

Y agregar a src/types/index.ts:
export * from './panel';
```

#### Nueva Cloud Function
```
✅ functions/src/category/functionName.ts
Ejemplo: functions/src/triggers/onPanelCreated.ts
```

#### Nuevo Guard
```
✅ src/components/guards/GuardName.tsx
Ejemplo: src/components/guards/FamilyPackGuard.tsx
```

---

## 🚫 ANTI-PATRONES (Qué NO Hacer)

### ❌ NO mezclar componentes y páginas
```
❌ INCORRECTO:
src/components/HomePage.tsx     # Esto es una página, no un componente

✅ CORRECTO:
src/pages/HomePage.tsx
```

### ❌ NO crear carpetas con un solo archivo
```
❌ INCORRECTO:
src/services/email/
└── emailService.ts             # Solo un archivo

✅ CORRECTO:
src/services/emailService.ts    # Archivo suelto está bien
```

### ❌ NO duplicar lógica
```
❌ INCORRECTO:
src/services/firestore/users.ts      # Lógica de usuarios
src/services/admin/users.ts          # Duplica lógica de usuarios

✅ CORRECTO:
src/services/firestore/users.ts      # Lógica base
src/services/admin/users.ts          # Usa la lógica base + añade específico admin

import { getUser, updateUser } from '@/services/firestore/users';
```

### ❌ NO hardcodear rutas de importación
```
❌ INCORRECTO:
import { User } from '../../../types/user';

✅ CORRECTO:
import { User } from '@/types/user';

// Configurar en tsconfig.json:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### ❌ NO crear archivos sin tipos definidos
```
❌ INCORRECTO:
// users.ts
export const getUser = (id) => { ... }  // Sin tipos

✅ CORRECTO:
// users.ts
import { User } from '@/types/user';

export const getUser = async (id: string): Promise<User> => { ... }
```

---

## 📝 IMPORTS RECOMENDADOS

### Orden de Imports
```typescript
// 1. React y librerías externas
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Componentes internos
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// 3. Hooks
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';

// 4. Servicios
import { getUser } from '@/services/firestore/users';
import { uploadFile } from '@/services/storage';

// 5. Types (sincronizados)
import type { User, EmergencyProfile, WebID } from '@/types';

// 6. Utilidades
import { formatDate } from '@/utils/formatters';
import { OFFICIAL_LIMITS } from '@/utils/constants';

// 7. Estilos
import './styles.css';
```

---

## 🔄 SINCRONIZACIÓN CON OTROS DOCUMENTOS

### Al crear nuevo archivo:

1. **Verificar en `project-status.md`**
   - ¿Ya existe algo similar?
   - ¿En qué sprint está planificado?

2. **Verificar en `database-schema.md`**
   - ¿La colección de Firestore existe?
   - ¿Los tipos están definidos?

3. **Verificar en `routes-architecture.md`**
   - ¿La ruta está documentada?
   - ¿Tiene el guard correcto?

4. **Verificar en `user-roles.md`**
   - ¿El permiso existe?
   - ¿El rol está definido?

5. **Actualizar este documento**
   - Marcar archivo como ✅, 🚧, o 📝

---

## ⚠️ IMPORTANTE PARA COPILOT

### Antes de Crear un Archivo:

1. **Verificar si ya existe**
   ```bash
   # Buscar en VSCode: Cmd+P / Ctrl+P
   # Buscar: filename.tsx
   ```

2. **Seguir convención de nombres**
   - Componente: `PascalCase.tsx`
   - Servicio: `camelCase.ts`
   - Type: `camelCase.ts`
   - Hook: `use + PascalCase.ts`

3. **Usar alias de imports**
   ```typescript
   ✅ import { User } from '@/types';
   ❌ import { User } from '../../../types';
   ```

4. **Agrupar archivos relacionados**
   ```
   ✅ components/family/MemberCard.tsx
   ✅ components/family/AddMemberModal.tsx
   ❌ components/MemberCard.tsx (sin carpeta family)
   ```

5. **Actualizar barrel exports**
   ```typescript
   // src/types/index.ts
   export * from './user';
   export * from './panel';  // ← Agregar cuando crees panel.ts
   export * from './webid';
   ```

6. **Sincronizar con documentación**
   - Actualizar `project-status.md` con progreso
   - Verificar que tipos coincidan con `database-schema.md`
   - Asegurar que rutas existan en `routes-architecture.md`

---

## 📊 ESTADO ACTUAL DE ARCHIVOS

### Por Categoría

```
Components:
├── UI Base:           ████████████████████ 100% ✅
├── Auth:              ████████████████████ 100% ✅
├── Dashboard:         ████████████░░░░░░░░  60% 🚧
├── Family:            ░░░░░░░░░░░░░░░░░░░░   0% 📝
├── Enterprise:        ░░░░░░░░░░░░░░░░░░░░   0% 📝
├── Admin:             ████░░░░░░░░░░░░░░░░  20% 🚧
├── Emergency:         ████████████████████ 100% ✅
├── Guards:            ████████████████████ 100% ✅
└── Layout:            ████████████████████ 100% ✅

Services:
├── Firestore:         ██████████████░░░░░░  70% 🚧
├── Payment:           ████████████████████ 100% ✅
├── Shipping:          ██████░░░░░░░░░░░░░░  30% 🚧
├── Storage:           ████████████████████ 100% ✅
├── Analytics:         ████████░░░░░░░░░░░░  40% 🚧
└── Admin:             ██░░░░░░░░░░░░░░░░░░  10% 📝

Pages:
├── Public:            ████████████████████ 100% ✅
├── Auth:              ████████████████████ 100% ✅
├── Dashboard:         ████████████░░░░░░░░  60% 🚧
├── Admin:             ████░░░░░░░░░░░░░░░░  20% 🚧
└── Checkout:          ████████████████████ 100% ✅

Types:
└── All:               ████████████████████ 100% ✅ (Sincronizados)

Hooks:
└── All:               ██████████████░░░░░░  70% 🚧

Utils:
└── All:               ████████████████████ 100% ✅

Config:
└── All:               ████████████████████ 100% ✅

Context:
└── All:               ████████████████████ 100% ✅
```

---

**Última sincronización**: 2025-01-21 21:10:28 UTC  
**Versión**: 2.0.0  
**Estado**: ✅ SINCRONIZADO CON 12 DOCUMENTOS  
**Referencias**: 
- `.github/copilot-instructions.md` (reglas generales)
- `.github/database-schema.md` (16 colecciones)
- `.github/routes-architecture.md` (56 rutas)
- `.github/project-status.md` (estado actual)
- `.github/user-roles.md` (tipos y permisos)