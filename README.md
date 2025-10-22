# NFCores - Plataforma de Información Médica de Emergencia

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7.1-orange)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-cyan)](https://tailwindcss.com/)

## 🎯 Objetivo

Salvar vidas permitiendo que personal de emergencia acceda a información médica crítica en menos de 2 segundos, sin contraseñas ni apps, mediante pulseras NFC.

## 📚 Documentación

Toda la arquitectura del proyecto está documentada en 12 archivos sincronizados en `.github/`:

- `copilot-instructions.md` - Instrucciones generales
- `tech-stack.md` - Stack tecnológico completo  
- `database-schema.md` - 16 colecciones Firestore
- `routes-architecture.md` - 56 rutas documentadas
- `user-roles.md` - Roles y permisos
- `emergency-profile-design.md` - Diseño crítico de página de emergencia
- Y 6 documentos más...

## 🚀 Stack Tecnológico

### Frontend
- **React 18.2.0** - Concurrent rendering, Suspense
- **TypeScript** - Type safety
- **Vite 5.x** - Build tool ultra-rápido
- **Tailwind CSS 3.4** - Utility-first CSS
- **React Router DOM 6.21** - Routing
- **React Hook Form 7.49** + **Zod 3.22** - Validación de formularios

### Backend & Servicios
- **Firebase 10.7.1**
  - Authentication
  - Firestore Database (16 colecciones)
  - Cloud Storage
  - Cloud Functions
  - Analytics
  - Hosting

### UI Components
- **Headless UI 1.7.17** - Componentes accesibles
- **React Icons 4.12** - Iconos
- **Sonner** - Toasts/notificaciones

### Herramientas
- **Axios 1.6.2** - HTTP client
- **date-fns** - Manejo de fechas
- **clsx** - Utilidad de clases CSS

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Componentes base (Button, Input, etc.)
│   ├── auth/            # Componentes de autenticación
│   ├── dashboard/       # Dashboard del usuario
│   ├── emergency/       # Perfil público de emergencia
│   ├── family/          # Panel familiar
│   ├── enterprise/      # Panel empresarial
│   ├── admin/           # Panel de administración
│   ├── layout/          # Layouts generales
│   ├── shared/          # Componentes compartidos
│   └── guards/          # Route guards
├── context/             # Context API (Auth, Notifications, Panel)
├── hooks/               # Custom hooks
├── pages/               # Páginas de la aplicación
│   ├── auth/
│   ├── dashboard/
│   ├── public/
│   └── admin/
├── services/            # Servicios de Firebase y APIs
│   ├── firestore/
│   ├── admin/
│   ├── analytics/
│   ├── payment/
│   ├── shipping/
│   └── storage/
├── types/               # TypeScript types/interfaces
├── utils/               # Funciones utilitarias
├── config/              # Configuración (Firebase, etc.)
├── schemas/             # Schemas de Zod
└── router/              # Configuración de rutas
```

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/cknight775/nfcores-v3.git
cd nfcores-v3
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiar `.env.example` a `.env` y completar con las credenciales de Firebase:

```bash
cp .env.example .env
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
```

## 🔐 Roles y Permisos

### Roles de Sistema (permisos técnicos)
- `user` - Usuario básico
- `admin` - Administrador
- `super_admin` - Super administrador
- `moderator` - Moderador
- `content_editor` - Editor de contenido

### Tipos de Perfil (contexto de negocio)
- `individual` - Pack individual (1 usuario)
- `familiar_admin` - Admin de panel familiar
- `familiar_member` - Miembro de panel familiar
- `empresarial_admin` - Admin de panel empresarial
- `empresarial_employee` - Empleado de empresa

## 🎨 Convenciones de Código

### Imports
Usar siempre alias `@/` para imports:

```typescript
// ✅ CORRECTO
import { Button } from '@/components/ui/Button';
import { User } from '@/types/user';

// ❌ INCORRECTO
import { Button } from '../../../components/ui/Button';
```

### Nombres de Archivos
- Componentes: `PascalCase.tsx`
- Servicios: `camelCase.ts`
- Tipos: `camelCase.ts`
- Hooks: `use + PascalCase.ts`

### Formato de Identificadores
```typescript
panelId: "FAM-00001" // Panel Familiar
panelId: "EMP-00001" // Panel Empresarial
webIdCode: "ABC123XYZ" // 9 caracteres alfanuméricos
```

## 🚨 Página Crítica de Emergencia

La ruta `/id/:token` es **CRÍTICA**:

- ✅ Tiempo de carga < 2 segundos
- ✅ Funciona sin autenticación
- ✅ Funciona offline (PWA)
- ✅ Compatible Android 8+ e iOS 12+
- ✅ Uptime 99.9%

## 📦 Packs Disponibles

### Individual
- 1 perfil
- 1 WebID
- 5 contactos de emergencia
- 10 documentos médicos
- CLP $29.990

### Familiar
- 5 perfiles
- 5 WebIDs
- 25 contactos de emergencia
- 50 documentos médicos
- CLP $69.990 (ahorro de $49.970)

### Empresarial
- Perfiles ilimitados
- Mínimo 10 WebIDs
- Contactos ilimitados
- Documentos ilimitados
- Desde CLP $399.990

## 🔗 Enlaces Útiles

- [Repositorio GitHub](https://github.com/cknight775/nfcores-v3)
- [Documentación Completa](./.github/)
- [Firebase Console](https://console.firebase.google.com/)

## 👤 Autor

**@cknight775**

---

**Versión**: 1.0.0  
**Última actualización**: 2025-10-21  
**Estado**: ✅ Proyecto inicializado
