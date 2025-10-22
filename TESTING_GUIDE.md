# 🧪 GUÍA COMPLETA DE TESTING - NFCores Web V3

**Fecha:** 22 de octubre de 2025  
**Versión:** 1.0.0  
**Estado:** Testing inicial completo antes del Prompt 7

---

## 📋 TABLA DE CONTENIDOS

1. [Preparación del Entorno](#1-preparación-del-entorno)
2. [Configuración de Firebase](#2-configuración-de-firebase)
3. [Testing del Router](#3-testing-del-router)
4. [Testing de Autenticación](#4-testing-de-autenticación)
5. [Testing de Guards](#5-testing-de-guards)
6. [Testing de Página de Emergencia](#6-testing-de-página-de-emergencia-crítico)
7. [Testing de Dashboard](#7-testing-de-dashboard)
8. [Testing de UI Components](#8-testing-de-ui-components)
9. [Testing de Performance](#9-testing-de-performance)
10. [Checklist Final](#10-checklist-final)

---

## 1. PREPARACIÓN DEL ENTORNO

### 1.1. Verificar instalación de dependencias

```powershell
# En terminal PowerShell en la raíz del proyecto
cd C:\proyectos\nfcores-web-v3

# Verificar que node_modules existe
Test-Path .\node_modules
# Debe devolver: True

# Si devuelve False, instalar dependencias:
npm install
```

### 1.2. Iniciar servidor de desarrollo

```powershell
# Iniciar servidor Vite
npm run dev
```

**✅ Resultado esperado:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

**⚠️ Si hay errores:**
- Verificar que el puerto 5173 no esté en uso
- Revisar errores de TypeScript en la consola
- Verificar que todos los imports usan alias `@/`

### 1.3. Verificar compilación sin errores

**✅ Debe compilar sin errores**  
**⚠️ Warnings de Markdown (MD022, MD032) son NORMALES y se pueden ignorar**

---

## 2. CONFIGURACIÓN DE FIREBASE

### 2.1. Obtener credenciales de Firebase

**Paso 1:** Ir a [Firebase Console](https://console.firebase.google.com/)

**Paso 2:** Seleccionar tu proyecto (o crear uno nuevo)

**Paso 3:** Ir a **Configuración del proyecto** (ícono de engranaje) → **General**

**Paso 4:** Scroll down hasta **"Tus aplicaciones"** → **SDK setup and configuration**

**Paso 5:** Si no tienes una app web, crear una:
- Click en **"Web"** (ícono `</>`
- Nombre: `NFCores Web`
- ✅ Marcar "También configurar Firebase Hosting"
- Click en **"Registrar app"**

**Paso 6:** Copiar las credenciales que aparecen:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-ABC123XYZ"
};
```

### 2.2. Habilitar autenticación en Firebase

**Paso 1:** En Firebase Console → **Authentication** → **Get Started**

**Paso 2:** En la pestaña **"Sign-in method"**, habilitar:
- ✅ **Email/Password** → Enable → Save
- ✅ **Google** → Enable → Agregar email de soporte → Save

### 2.3. Crear archivo `.env`

```powershell
# En la raíz del proyecto
Copy-Item .env.example .env
```

Ahora editar el archivo `.env` con tus credenciales:

```bash
# ============================================
# FIREBASE CONFIGURATION
# ============================================
VITE_FIREBASE_API_KEY=AIza...  # Pegar tu apiKey
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123XYZ

# ============================================
# EXTERNAL APIS (opcional por ahora)
# ============================================
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-...
VITE_MERCADOPAGO_ACCESS_TOKEN=TEST-...
VITE_CHILEXPRESS_API_KEY=test_key
VITE_CHILEXPRESS_API_URL=https://testservices.wschilexpress.com

# ============================================
# APP CONFIGURATION
# ============================================
VITE_APP_NAME=NFCores
VITE_APP_URL=http://localhost:5173
VITE_EMERGENCY_PROFILE_URL=http://localhost:5173/id

# ============================================
# FEATURE FLAGS
# ============================================
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PWA=false
VITE_ENABLE_GEOLOCATION=true
VITE_ENABLE_NOTIFICATIONS=true

# ============================================
# DEVELOPMENT SETTINGS
# ============================================
VITE_USE_EMULATORS=false
VITE_EMULATOR_AUTH_PORT=9099
VITE_EMULATOR_FIRESTORE_PORT=8080
VITE_EMULATOR_STORAGE_PORT=9199

# ============================================
# PERFORMANCE MONITORING (opcional)
# ============================================
VITE_SENTRY_DSN=
VITE_ENABLE_ERROR_TRACKING=false
```

### 2.4. Reiniciar servidor de desarrollo

```powershell
# Detener servidor (Ctrl+C)
# Volver a iniciar
npm run dev
```

**✅ El servidor debe reiniciar sin errores**

---

## 3. TESTING DEL ROUTER

### 3.1. Rutas públicas

#### 3.1.1. HomePage (`/`)

**URL:** http://localhost:5173/

**✅ Verificar:**
- [ ] Navbar se muestra correctamente
- [ ] Hero section con título "NFCores"
- [ ] 3 cards de características (Acceso Instantáneo, Seguro, Sin Apps)
- [ ] CTA con botón "Ver Precios"
- [ ] Footer con 4 columnas
- [ ] Sin errores en consola del navegador

**📱 Responsive:**
- [ ] Mobile (375px): Todo en 1 columna
- [ ] Tablet (768px): 2 columnas
- [ ] Desktop (1920px): 3 columnas

#### 3.1.2. Login (`/auth/login`)

**URL:** http://localhost:5173/auth/login

**✅ Verificar:**
- [ ] Card con título "Iniciar Sesión"
- [ ] Input de email
- [ ] Input de password con ícono de ojo para mostrar/ocultar
- [ ] Checkbox "Recordarme"
- [ ] Botón "Iniciar Sesión"
- [ ] Botón "Continuar con Google" con logo de Google
- [ ] Links: "¿Olvidaste tu contraseña?" y "¿No tienes cuenta? Regístrate"
- [ ] NO se muestra Navbar/Footer (solo el formulario)
- [ ] Sin errores en consola

#### 3.1.3. Register (`/auth/register`)

**URL:** http://localhost:5173/auth/register

**✅ Verificar:**
- [ ] Card con título "Crear Cuenta"
- [ ] Inputs: firstName, lastName, email, phone, password, confirmPassword
- [ ] Checkbox "Acepto los Términos y Condiciones"
- [ ] Botón "Crear Cuenta"
- [ ] Botón "Continuar con Google"
- [ ] Link "¿Ya tienes cuenta? Inicia sesión"
- [ ] Sin errores en consola

#### 3.1.4. Reset Password (`/auth/reset-password`)

**URL:** http://localhost:5173/auth/reset-password

**✅ Verificar:**
- [ ] Card con título "Recuperar Contraseña"
- [ ] Input de email
- [ ] Botón "Enviar Enlace"
- [ ] Link "Volver al inicio de sesión"
- [ ] Sin errores en consola

#### 3.1.5. Verify Email (`/auth/verify-email`)

**URL:** http://localhost:5173/auth/verify-email

**⚠️ Esta ruta requiere estar autenticado pero sin email verificado**

**Para probar:**
1. Registrarse con un nuevo usuario
2. Automáticamente redirecciona aquí

**✅ Verificar:**
- [ ] Muestra el email del usuario
- [ ] Botón "Reenviar correo de verificación"
- [ ] Botón "Ya verifiqué mi correo"
- [ ] Botón "Cerrar sesión"
- [ ] Mensaje sobre revisar spam
- [ ] Sin errores en consola

### 3.2. Rutas protegidas (requieren auth)

#### 3.2.1. Dashboard (`/dashboard`)

**URL:** http://localhost:5173/dashboard

**⚠️ Si NO estás autenticado:**
- Debe redirigir a `/auth/login`
- URL debe cambiar a: `http://localhost:5173/auth/login?from=/dashboard`

**✅ Si ESTÁS autenticado:**
- [ ] Muestra mensaje "¡Hola, [nombre]!"
- [ ] 3 cards: Mi Perfil, Contactos, Documentos
- [ ] Card con información del usuario
- [ ] Navbar con "Dashboard" y "Cerrar Sesión"
- [ ] Sin errores en consola

### 3.3. Página 404

**URL:** http://localhost:5173/ruta-que-no-existe

**✅ Verificar:**
- [ ] Muestra página de error 404
- [ ] Botón para volver a home
- [ ] Sin errores en consola

---

## 4. TESTING DE AUTENTICACIÓN

### 4.1. Registro de usuario (Email/Password)

**Paso 1:** Ir a http://localhost:5173/auth/register

**Paso 2:** Llenar formulario con datos de prueba:
```
Nombre: Juan
Apellido: Pérez
Email: juan.perez.test@gmail.com
Teléfono: +56912345678 (opcional)
Contraseña: Test1234!
Confirmar Contraseña: Test1234!
[✓] Acepto los Términos y Condiciones
```

**Paso 3:** Click en "Crear Cuenta"

**✅ Verificar:**
- [ ] Toast de notificación "¡Cuenta creada exitosamente!"
- [ ] Redirecciona a `/auth/verify-email`
- [ ] Muestra el email: juan.perez.test@gmail.com
- [ ] En Firebase Console → Authentication → Users → Se creó el usuario
- [ ] Sin errores en consola

**Paso 4:** Revisar email
- [ ] Debe llegar email de Firebase con link de verificación
- [ ] Click en el link para verificar

### 4.2. Testing de validaciones del formulario de registro

**Prueba 1: Campos vacíos**
- Dejar campos vacíos → Click "Crear Cuenta"
- **✅ Debe mostrar errores en rojo bajo cada campo**

**Prueba 2: Email inválido**
- Email: `correo-invalido` → Click "Crear Cuenta"
- **✅ Debe mostrar: "Email inválido"**

**Prueba 3: Contraseñas no coinciden**
- Contraseña: `Test1234!`
- Confirmar: `Test5678!`
- **✅ Debe mostrar: "Las contraseñas no coinciden"**

**Prueba 4: Contraseña débil**
- Contraseña: `123` → Click "Crear Cuenta"
- **✅ Debe mostrar: "La contraseña debe tener al menos 8 caracteres"**

**Prueba 5: Sin aceptar términos**
- Llenar todo pero NO marcar checkbox
- **✅ Debe mostrar: "Debes aceptar los términos y condiciones"**

### 4.3. Login con Email/Password

**Paso 1:** Ir a http://localhost:5173/auth/login

**Paso 2:** Intentar login con credenciales incorrectas:
```
Email: incorrecto@test.com
Contraseña: wrong123
```

**✅ Verificar:**
- [ ] Toast de error en rojo: "Credenciales inválidas"
- [ ] NO redirecciona
- [ ] Sin errores en consola

**Paso 3:** Login con credenciales correctas:
```
Email: juan.perez.test@gmail.com
Contraseña: Test1234!
```

**✅ Verificar:**
- [ ] Toast de éxito: "¡Bienvenido!"
- [ ] Redirecciona a `/dashboard`
- [ ] Navbar muestra "Dashboard" y "Cerrar Sesión"
- [ ] En Dashboard muestra: "¡Hola, Juan!"
- [ ] Sin errores en consola

### 4.4. Login con Google OAuth

**Paso 1:** Ir a http://localhost:5173/auth/login

**Paso 2:** Click en "Continuar con Google"

**✅ Verificar:**
- [ ] Se abre popup de Google
- [ ] Seleccionar cuenta de Google
- [ ] Popup se cierra automáticamente
- [ ] Toast: "¡Bienvenido!"
- [ ] Redirecciona a `/dashboard`
- [ ] En Firebase Console → Authentication → Se creó el usuario
- [ ] Sin errores en consola

**⚠️ Si hay error:**
- Verificar que Google OAuth está habilitado en Firebase Console
- Verificar que el dominio `localhost` está en la lista de dominios autorizados

### 4.5. Reset Password

**Paso 1:** Ir a http://localhost:5173/auth/reset-password

**Paso 2:** Ingresar email:
```
Email: juan.perez.test@gmail.com
```

**Paso 3:** Click en "Enviar Enlace"

**✅ Verificar:**
- [ ] Toast de éxito: "Correo enviado"
- [ ] Formulario cambia a estado de éxito con checkmark ✓
- [ ] Mensaje: "Revisa tu bandeja de entrada"
- [ ] Email de reset password llega al correo
- [ ] Sin errores en consola

### 4.6. Logout

**Paso 1:** Estando logueado, click en "Cerrar Sesión" en Navbar

**✅ Verificar:**
- [ ] Toast: "Sesión cerrada"
- [ ] Redirecciona a `/auth/login`
- [ ] Navbar vuelve a mostrar "Iniciar Sesión" y "Registrarse"
- [ ] Sin errores en consola

---

## 5. TESTING DE GUARDS

### 5.1. AuthGuard - Protección de rutas

**Prueba 1: Acceso sin autenticación**

```
1. Cerrar sesión (logout)
2. Intentar acceder a: http://localhost:5173/dashboard
```

**✅ Verificar:**
- [ ] Redirecciona automáticamente a `/auth/login`
- [ ] URL incluye `?from=/dashboard` para redirección después de login
- [ ] Toast: "Debes iniciar sesión"
- [ ] Sin errores en consola

**Prueba 2: Login y redirección automática**

```
1. Estando en /auth/login?from=/dashboard
2. Login con credenciales correctas
```

**✅ Verificar:**
- [ ] Después de login, redirecciona a `/dashboard` (no a home)
- [ ] Sin errores en consola

### 5.2. AuthLayout - Prevención de acceso a auth estando logueado

**Prueba:**

```
1. Estar logueado
2. Intentar acceder a: http://localhost:5173/auth/login
```

**✅ Verificar:**
- [ ] Redirecciona automáticamente a `/dashboard`
- [ ] Sin mostrar el formulario de login
- [ ] Sin errores en consola

---

## 6. TESTING DE PÁGINA DE EMERGENCIA (CRÍTICO)

⚠️ **ESTA ES LA PÁGINA MÁS IMPORTANTE - PUEDE SALVAR VIDAS**

### 6.1. Crear perfil de emergencia de prueba en Firestore

**Paso 1:** Ir a [Firebase Console](https://console.firebase.google.com/)

**Paso 2:** Firestore Database → Crear colección `emergencyProfiles`

**Paso 3:** Agregar documento con ID: `test_profile_001`

**Paso 4:** Copiar y pegar este JSON (ajustar tipos de datos):

```javascript
{
  // IDs y relaciones
  profileId: "test_profile_001",
  userId: "user_test_001",  // Cualquier string
  webId: "TEST12345",  // 9 caracteres mayúsculas
  panelId: "",  // string vacío
  
  // Información personal
  firstName: "Juan",
  lastName: "Pérez",
  fullName: "Juan Pérez García",
  birthDate: Timestamp (15/03/1985 00:00:00),  // Usar selector de fecha
  bloodType: "O+",
  photoURL: "",  // Dejar vacío por ahora
  
  // Alergias (array)
  allergies: [
    {
      name: "Penicilina",
      severity: "grave",
      notes: "Anafilaxia - NO ADMINISTRAR BAJO NINGUNA CIRCUNSTANCIA"
    },
    {
      name: "Maní",
      severity: "moderada",
      notes: "Reacción cutánea y dificultad respiratoria"
    },
    {
      name: "Polen",
      severity: "leve",
      notes: "Estornudos y ojos llorosos"
    }
  ],
  
  // Medicamentos (array)
  medications: [
    {
      name: "Losartán",
      dosage: "50mg",
      frequency: "1 vez al día (mañana)",
      reason: "Hipertensión arterial"
    },
    {
      name: "Metformina",
      dosage: "850mg",
      frequency: "2 veces al día",
      reason: "Diabetes Tipo 2"
    }
  ],
  
  // Condiciones médicas (array de strings)
  medicalConditions: [
    "Hipertensión arterial",
    "Diabetes Tipo 2",
    "Asma leve"
  ],
  
  // Contactos de emergencia (array)
  emergencyContacts: [
    {
      name: "María González",
      phone: "+56912345678",
      email: "maria.gonzalez@gmail.com",
      relationship: "Esposa",
      priority: 1,
      notifyOnAccess: true
    },
    {
      name: "Pedro Pérez",
      phone: "+56987654321",
      email: "pedro.perez@gmail.com",
      relationship: "Hijo",
      priority: 2,
      notifyOnAccess: true
    },
    {
      name: "Dr. Carlos Muñoz",
      phone: "+56922334455",
      email: "dr.munoz@hospital.cl",
      relationship: "Médico de cabecera",
      priority: 3,
      notifyOnAccess: false
    }
  ],
  
  // Notas de emergencia
  emergencyNotes: "Propenso a hipoglucemia. Siempre llevo caramelos en bolsillo derecho del pantalón. En caso de confusión o sudoración excesiva, dar algo dulce inmediatamente.",
  
  // Documentos (array vacío por ahora)
  documents: [],
  
  // Configuración de privacidad (map)
  privacySettings: {
    showPhoto: true,
    showFullName: true,
    showMedications: true,
    showConditions: true,
    showDocuments: true,
    showEmergencyNotes: true,
    maxContactsVisible: 3,
    enableGeolocation: true
  },
  
  // Estado y contadores
  isActive: true,
  isPublic: true,
  totalAccesses: 0,
  
  // Timestamps
  createdAt: Timestamp (fecha actual),
  updatedAt: Timestamp (fecha actual),
  lastAccessedAt: null
}
```

**📝 Notas al crear el documento:**
- Para `birthDate`, `createdAt`, `updatedAt`: Click en "Timestamp" y seleccionar fecha
- Para `lastAccessedAt`: Dejarlo como `null`
- Para arrays: Click en "Add item" para cada elemento
- Para maps (como `privacySettings`): Click en "Add field" para cada propiedad

**Paso 5:** Click en "Save"

**✅ Verificar que el documento se creó correctamente en Firestore**

### 6.2. Testing de carga de página de emergencia

**Paso 1:** Abrir Chrome DevTools (F12)

**Paso 2:** Ir a pestaña **"Network"**

**Paso 3:** Marcar "Disable cache"

**Paso 4:** Acceder a: http://localhost:5173/id/TEST12345

**Paso 5:** Observar tiempo de carga en pestaña Network

**✅ CRÍTICO - Verificar:**
- [ ] **Tiempo total de carga < 2 segundos** ⚡
- [ ] Sin errores en consola
- [ ] Sin errores 404
- [ ] Query a Firestore exitoso

### 6.3. Verificar elementos visuales

**✅ Hero Section:**
- [ ] Badge "🚨 PERFIL DE EMERGENCIA" en la parte superior
- [ ] Nombre completo: "Juan Pérez García"
- [ ] Badge de edad: "🎂 40 años" (calculado desde 1985)
- [ ] Badge de tipo de sangre: "🩸 O+"
- [ ] Botón "📞 Contactar Emergencia" (llama al primer contacto)
- [ ] Fondo degradado rojo (gradient-to-br from-red-500 to-red-600)

**✅ Sección de Alergias (MedicalInfoCard):**
- [ ] Título "⚕️ Información Médica"
- [ ] Subtítulo "🛑 Alergias"
- [ ] **Penicilina:**
  - [ ] Fondo ROJO (bg-red-50)
  - [ ] Borde izquierdo ROJO grueso (border-red-600)
  - [ ] Ícono 🚨
  - [ ] Texto: "Anafilaxia - NO ADMINISTRAR..."
  - [ ] Badge "SEVERIDAD: GRAVE"
- [ ] **Maní:**
  - [ ] Fondo AMARILLO (bg-yellow-50)
  - [ ] Borde izquierdo AMARILLO (border-amber-500)
  - [ ] Ícono ⚠️
  - [ ] Badge "SEVERIDAD: MODERADA"
- [ ] **Polen:**
  - [ ] Fondo AZUL (bg-blue-50)
  - [ ] Borde izquierdo AZUL (border-blue-400)
  - [ ] Ícono ℹ️
  - [ ] Badge "SEVERIDAD: LEVE"

**✅ Sección de Medicamentos:**
- [ ] Subtítulo "💊 Medicamentos"
- [ ] Losartán: "50mg - 1 vez al día (mañana)"
- [ ] Metformina: "850mg - 2 veces al día"
- [ ] Razones mostradas en gris

**✅ Sección de Condiciones Médicas:**
- [ ] Subtítulo "🏥 Condiciones Médicas"
- [ ] Lista con viñetas:
  - Hipertensión arterial
  - Diabetes Tipo 2
  - Asma leve

**✅ Sección de Contactos (ContactsCard):**
- [ ] Título "📱 Contactos de Emergencia"
- [ ] **3 contactos mostrados** (límite maxContactsVisible: 3)
- [ ] Cada contacto muestra:
  - [ ] Nombre
  - [ ] Relación
  - [ ] Email
  - [ ] Teléfono
  - [ ] Botón "📞 Llamar" (azul)
- [ ] Separador (línea gris)
- [ ] **Botón 911 EXTRA GRANDE:**
  - [ ] Fondo rojo intenso (bg-red-600)
  - [ ] Ícono 🚨 grande
  - [ ] Texto "LLAMAR 911" en texto-2xl
  - [ ] Padding vertical grande (py-5)
  - [ ] Ancho completo
  - [ ] Sombra pronunciada

**✅ Sección de Notas de Emergencia (EmergencyNotesCard):**
- [ ] Título "📝 Notas de Emergencia"
- [ ] Card gris con el texto de las notas
- [ ] Whitespace preservado (saltos de línea respetados)
- [ ] Texto: "Propenso a hipoglucemia..."

**✅ Footer:**
- [ ] Mensaje informativo
- [ ] Código de acceso: TEST12345

### 6.4. Testing de funcionalidad de links tel:

**⚠️ Ideal probar en móvil o simulador de dispositivo móvil**

**Prueba 1: Contacto de emergencia**
- [ ] Click en botón "📞 Llamar" del primer contacto
- [ ] Debe abrir marcador del teléfono con +56912345678

**Prueba 2: Botón 911**
- [ ] Click en botón "🚨 LLAMAR 911"
- [ ] Debe abrir marcador con 911

**En desktop:**
- [ ] Links `tel:` no hacen nada (comportamiento esperado)
- [ ] Sin errores en consola

### 6.5. Testing de estados de error

**Prueba 1: Token faltante**

**URL:** http://localhost:5173/id/

**✅ Verificar:**
- [ ] Muestra ErrorState con ícono ❌
- [ ] Título: "Código no proporcionado"
- [ ] Descripción: "No se encontró un código de identificación válido"
- [ ] Botón 911 visible y funcional
- [ ] Código mostrado: N/A

**Prueba 2: Token con formato inválido**

**URL:** http://localhost:5173/id/abc-123-xyz

**✅ Verificar:**
- [ ] Muestra ErrorState con ícono ⚠️
- [ ] Título: "Código inválido"
- [ ] Descripción: "El código 'abc-123-xyz' no tiene el formato correcto..."
- [ ] Botón 911 visible
- [ ] Código mostrado: abc-123-xyz

**Prueba 3: Perfil no encontrado**

**URL:** http://localhost:5173/id/NOTEXIST1

**✅ Verificar:**
- [ ] Muestra ErrorState con ícono 🔍
- [ ] Título: "Perfil no encontrado"
- [ ] Descripción: "No se encontró un perfil asociado al código 'NOTEXIST1'..."
- [ ] Botón 911 visible
- [ ] Código mostrado: NOTEXIST1

**Prueba 4: Perfil inactivo**

**Para probar:**
1. En Firestore, cambiar `isActive: false` en el perfil TEST12345
2. Acceder a http://localhost:5173/id/TEST12345

**✅ Verificar:**
- [ ] Muestra ErrorState con ícono 🚫
- [ ] Título: "Perfil inactivo"
- [ ] Descripción: "Este perfil de emergencia está actualmente inactivo"
- [ ] Botón 911 visible
- [ ] **IMPORTANTE:** Volver a cambiar `isActive: true` en Firestore

### 6.6. Testing de responsive design

**Abrir Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M)**

**Prueba 1: iPhone SE (375px)**
- [ ] Hero section: foto y texto en columna
- [ ] Cards ocupan ancho completo
- [ ] Alergias en columna
- [ ] Contactos en columna
- [ ] Botón 911 ancho completo
- [ ] Todo legible sin scroll horizontal

**Prueba 2: iPad (768px)**
- [ ] Hero section: foto y texto lado a lado
- [ ] Cards con padding adecuado
- [ ] Alergias con más espacio
- [ ] Contactos muestran botones a la derecha

**Prueba 3: Desktop (1920px)**
- [ ] Contenido centrado (max-w-4xl)
- [ ] Márgenes laterales amplios
- [ ] Cards con sombras sutiles
- [ ] Todo bien espaciado

### 6.7. Testing de access logging

**Paso 1:** Acceder a http://localhost:5173/id/TEST12345

**Paso 2:** Si el navegador pide permiso de geolocalización:
- [ ] Permitir acceso a ubicación

**Paso 3:** Ir a Firebase Console → Firestore

**Paso 4:** Verificar colección `accessLogs`

**✅ Debe existir un documento nuevo con:**
- [ ] `webId: "TEST12345"`
- [ ] `userId: "user_test_001"`
- [ ] `profileId: "test_profile_001"`
- [ ] `timestamp`: Fecha/hora actual
- [ ] `userAgent`: String del navegador
- [ ] `geolocation`: (si diste permiso)
  - [ ] `latitude`: número
  - [ ] `longitude`: número
  - [ ] `accuracy`: número
- [ ] `contactsCalled: []` (array vacío)
- [ ] `documentsViewed: []` (array vacío)

**Paso 5:** Verificar documento del perfil en `emergencyProfiles/test_profile_001`

**✅ Verificar:**
- [ ] `totalAccesses` se incrementó de 0 a 1
- [ ] `lastAccessedAt` tiene Timestamp actual

**Paso 6:** Acceder nuevamente a la página

**✅ Verificar:**
- [ ] Se crea un NUEVO documento en `accessLogs`
- [ ] `totalAccesses` se incrementó a 2

### 6.8. Testing de privacidad

**Prueba 1: Ocultar información**

En Firestore, cambiar `privacySettings` del perfil:

```javascript
privacySettings: {
  showPhoto: false,
  showFullName: false,
  showMedications: false,
  showConditions: false,
  showDocuments: false,
  showEmergencyNotes: false,
  maxContactsVisible: 1,
  enableGeolocation: false
}
```

**Guardar y recargar** http://localhost:5173/id/TEST12345

**✅ Verificar:**
- [ ] NO se muestra foto
- [ ] Nombre muestra solo: "Juan P." (inicial del apellido)
- [ ] NO se muestra sección de Medicamentos
- [ ] NO se muestra sección de Condiciones Médicas
- [ ] NO se muestra sección de Notas de Emergencia
- [ ] Solo se muestra 1 contacto (María González)
- [ ] Alergias SÍ se muestran (siempre visibles por seguridad)
- [ ] Botón 911 SÍ está visible (siempre)

**IMPORTANTE:** Volver a poner `privacySettings` como estaban originalmente

---

## 7. TESTING DE DASHBOARD

### 7.1. Acceso al dashboard

**Paso 1:** Login con credenciales

**Paso 2:** Verificar URL: http://localhost:5173/dashboard

**✅ Verificar:**
- [ ] Saludo: "¡Hola, Juan!" (nombre del usuario)
- [ ] 3 cards de funcionalidades:
  - [ ] "Mi Perfil de Emergencia" con ícono 👤
  - [ ] "Contactos de Emergencia" con ícono 📞
  - [ ] "Documentos Médicos" con ícono 📄
- [ ] Card de información del usuario:
  - [ ] Email
  - [ ] Nombre completo
  - [ ] Role
  - [ ] ProfileType
  - [ ] Status (badge verde si isActive)

### 7.2. Verificar Navbar en dashboard

**✅ Verificar:**
- [ ] Logo "NFCores" (link a /)
- [ ] Botón "Dashboard"
- [ ] Botón "Cerrar Sesión"
- [ ] NO muestra "Iniciar Sesión" ni "Registrarse"

---

## 8. TESTING DE UI COMPONENTS

### 8.1. Navbar

**Prueba 1: Usuario NO autenticado**

```
1. Logout
2. Ir a /
```

**✅ Verificar:**
- [ ] Logo "NFCores"
- [ ] Botones: "Iniciar Sesión" y "Registrarse" (azul)
- [ ] Responsive: en mobile se ve bien

**Prueba 2: Usuario autenticado**

```
1. Login
2. Ir a /
```

**✅ Verificar:**
- [ ] Logo "NFCores"
- [ ] Botones: "Dashboard" y "Cerrar Sesión" (rojo)
- [ ] Responsive: en mobile se ve bien

### 8.2. Footer

**URL:** Cualquier ruta con PublicLayout (/)

**✅ Verificar:**
- [ ] 4 columnas:
  1. Empresa (descripción)
  2. Producto (links)
  3. Legal (links)
  4. Soporte (links)
- [ ] Copyright: "© 2025 NFCores. Todos los derechos reservados."
- [ ] Responsive: en mobile 1 columna

### 8.3. Input Component

**Verificar en formularios de auth:**

**✅ Estados del input:**
- [ ] Normal: borde gris
- [ ] Focus: borde azul + ring azul
- [ ] Error: borde rojo + texto de error rojo
- [ ] Con valor: texto negro
- [ ] Placeholder: texto gris

### 8.4. Button Component

**Verificar en formularios:**

**✅ Variantes:**
- [ ] Primary: bg-blue-600
- [ ] Secondary: bg-gray-600
- [ ] Danger: bg-red-600
- [ ] Outline: borde + sin fondo

**✅ Estados:**
- [ ] Normal: color normal
- [ ] Hover: color más oscuro
- [ ] Loading: spinner + "Cargando..."
- [ ] Disabled: opacidad 50% + cursor not-allowed

### 8.5. Card Component

**Verificar en dashboard y auth:**

**✅ Estilos:**
- [ ] Fondo blanco
- [ ] Sombra sutil (shadow-md)
- [ ] Bordes redondeados (rounded-lg)
- [ ] Padding: p-6

---

## 9. TESTING DE PERFORMANCE

### 9.1. Lighthouse Audit

**Paso 1:** Abrir Chrome DevTools → Pestaña "Lighthouse"

**Paso 2:** Configurar:
- Mode: Navigation
- Device: Mobile
- Categories: ✅ Performance, ✅ Accessibility, ✅ Best Practices

**Paso 3:** Ejecutar audit en cada página:

**A. HomePage (`/`)**

```powershell
# Generar reporte
npm run build
npm run preview
# Abrir http://localhost:4173/
# Ejecutar Lighthouse
```

**✅ Objetivos:**
- [ ] Performance: > 90
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90

**B. Página de Emergencia (`/id/TEST12345`)**

```powershell
# Abrir http://localhost:4173/id/TEST12345
# Ejecutar Lighthouse
```

**✅ CRÍTICO - Objetivos:**
- [ ] Performance: > 95 ⚡
- [ ] FCP (First Contentful Paint): < 1s
- [ ] LCP (Largest Contentful Paint): < 2s
- [ ] TTI (Time to Interactive): < 2s

### 9.2. Network Analysis

**Paso 1:** Abrir DevTools → Network

**Paso 2:** Hard Reload (Ctrl+Shift+R) en cada página

**✅ Página de Emergencia - Verificar:**
- [ ] Requests totales: < 20
- [ ] Tamaño total: < 500 KB
- [ ] Tiempo de carga: < 2s
- [ ] No hay recursos bloqueantes

**✅ Dashboard - Verificar:**
- [ ] Tiempo de carga: < 3s
- [ ] Lazy loading funciona (solo carga lo necesario)

### 9.3. Bundle Size Analysis

```powershell
npm run build
```

**✅ Verificar output:**
```
dist/assets/index-[hash].js: < 250 KB (gzipped)
dist/assets/vendor-[hash].js: < 500 KB (gzipped)
Total: < 1 MB
```

---

## 10. CHECKLIST FINAL

### ✅ Testing Completo

```
ENTORNO:
[✓] Servidor dev corriendo sin errores
[✓] .env configurado correctamente
[✓] Firebase conectado
[✓] Auth habilitado (Email + Google)

ROUTER:
[✓] / (HomePage) carga
[✓] /auth/login carga
[✓] /auth/register carga
[✓] /auth/reset-password carga
[✓] /auth/verify-email carga (autenticado)
[✓] /dashboard carga (autenticado)
[✓] /id/:token carga (página de emergencia)
[✓] 404 funciona

AUTENTICACIÓN:
[✓] Registro funciona
[✓] Login funciona
[✓] Google OAuth funciona
[✓] Reset password funciona
[✓] Logout funciona
[✓] Validaciones de formularios funcionan

GUARDS:
[✓] AuthGuard protege /dashboard
[✓] Redirección después de login
[✓] AuthLayout previene acceso a /auth estando logueado

PÁGINA DE EMERGENCIA (CRÍTICO):
[✓] Carga en < 2 segundos ⚡
[✓] WebID validado correctamente
[✓] Hero section completo
[✓] Alergias con colores correctos (grave=rojo 🚨, moderada=amarillo, leve=azul)
[✓] Medicamentos se muestran
[✓] Condiciones médicas se muestran
[✓] Contactos de emergencia listados
[✓] Tel links funcionan
[✓] Botón 911 EXTRA GRANDE visible
[✓] Notas de emergencia se muestran
[✓] Estados de error funcionan (4 tipos)
[✓] Access logging funciona (Firestore)
[✓] totalAccesses se incrementa
[✓] Geolocalización funciona
[✓] Privacidad respetada
[✓] Responsive mobile/tablet/desktop

DASHBOARD:
[✓] Saludo con nombre
[✓] Cards de funcionalidades
[✓] Info del usuario

UI COMPONENTS:
[✓] Navbar cambia según auth state
[✓] Footer se ve correcto
[✓] Inputs con validación
[✓] Buttons con estados (loading, hover)
[✓] Cards con estilos correctos
[✓] Toaster muestra notificaciones

PERFORMANCE:
[✓] Página emergencia < 2s ⚡ CRÍTICO
[✓] Login < 1s
[✓] Dashboard < 3s
[✓] Bundle size < 1 MB
[✓] Lighthouse > 90 en todas las métricas
[✓] Sin errores en consola
[✓] Sin warnings críticos
```

---

## 🐛 TROUBLESHOOTING

### Problema: Servidor no inicia

**Síntomas:**
```
Error: Cannot find module...
```

**Solución:**
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

### Problema: Firebase no conecta

**Síntomas:**
```
Firebase: Error (auth/invalid-api-key)
```

**Solución:**
1. Verificar que `.env` tiene las credenciales correctas
2. Verificar que el archivo `.env` está en la raíz del proyecto
3. Reiniciar servidor: Ctrl+C → `npm run dev`
4. Verificar en Firebase Console que el proyecto existe

### Problema: Página de emergencia no carga perfil

**Síntomas:**
- Muestra "Perfil no encontrado"
- Console error: `Permission denied`

**Solución:**
1. Verificar que el documento existe en Firestore
2. Verificar que `webId` es exactamente "TEST12345"
3. Verificar que `isActive: true`
4. Verificar Firestore Rules:

```javascript
// En firestore.rules
match /emergencyProfiles/{profileId} {
  allow read: if true;  // ✅ Lectura pública
}
```

5. Deploy rules:
```powershell
firebase deploy --only firestore:rules
```

### Problema: Toaster no muestra notificaciones

**Síntomas:**
- No aparecen mensajes de éxito/error

**Solución:**
1. Verificar que `<Toaster />` está en `App.tsx`
2. Verificar import: `import { Toaster } from 'sonner'`
3. Hard reload: Ctrl+Shift+R

### Problema: Google OAuth no funciona

**Síntomas:**
- Error: "This app is not verified"
- Popup no abre

**Solución:**
1. Verificar en Firebase Console → Authentication → Sign-in method → Google → Enabled
2. Agregar dominio autorizado:
   - Firebase Console → Authentication → Settings → Authorized domains
   - Agregar: `localhost`
3. Verificar que el popup no está bloqueado por el navegador

---

## 📊 REPORTE DE TESTING

**Fecha:** 22 de octubre de 2025  
**Tester:** [Tu nombre]  
**Versión:** 1.0.0  
**Commit:** 00ae31c

### Resumen:

```
Total de tests: XX
✅ Pasados: XX
❌ Fallidos: XX
⚠️ Warnings: XX

Cobertura:
- Router: XX%
- Auth: XX%
- Emergency Page: XX%
- Dashboard: XX%
- UI Components: XX%
```

### Issues encontrados:

```
1. [CRÍTICO] Descripción del problema
   - Pasos para reproducir
   - Screenshot
   - Solución propuesta

2. [ALTO] Descripción del problema
   ...

3. [MEDIO] Descripción del problema
   ...
```

### Recomendaciones:

```
- [ ] Fix issue #1 antes de continuar
- [ ] Mejorar performance de X
- [ ] Agregar test E2E para Y
```

---

## ✅ APROBACIÓN PARA PROMPT 7

**Criterios para continuar:**

```
OBLIGATORIOS:
[✓] Página de emergencia carga en < 2s
[✓] Auth funciona (login + registro)
[✓] Guards protegen rutas
[✓] Sin errores críticos en consola
[✓] Access logging funciona

DESEABLES:
[✓] Performance > 90 en Lighthouse
[✓] Responsive funciona
[✓] Toaster funciona
[✓] UI components correctos
```

**Estado:** ✅ APROBADO para continuar con Prompt 7

---

**Fin de la guía de testing** 🎉
