# 🚀 INICIO RÁPIDO - Testing NFCores

## PASO 1: Configurar Firebase ⚠️ OBLIGATORIO

### A. Obtener credenciales de Firebase

1. Ve a: https://console.firebase.google.com/
2. Selecciona tu proyecto (o crea uno nuevo: "nfcores-web-test")
3. Click en ⚙️ **Configuración del proyecto** → **General**
4. Scroll hasta **"Tus aplicaciones"**
5. Si no tienes app web, click en **`</>`** (Web)
   - Nombre: `NFCores Web`
   - ✅ Marcar "Configurar Firebase Hosting"
   - Click **"Registrar app"**
6. Copiar el objeto `firebaseConfig`:

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

### B. Habilitar Authentication

1. Firebase Console → **Authentication** → **Get Started**
2. Pestaña **"Sign-in method"**
3. Habilitar **Email/Password**:
   - Click en Email/Password
   - Toggle **Enable**
   - Click **Save**
4. Habilitar **Google**:
   - Click en Google
   - Toggle **Enable**
   - Agregar tu email en "Project support email"
   - Click **Save**

### C. Crear archivo `.env`

**Ejecutar en PowerShell:**

```powershell
Copy-Item .env.example .env
notepad .env
```

**Pegar tus credenciales de Firebase:**

```bash
# ============================================
# FIREBASE CONFIGURATION
# ============================================
VITE_FIREBASE_API_KEY=AIza...  # ⚠️ PEGAR TU API KEY
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123XYZ

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
```

**Guardar y cerrar.**

### D. Reiniciar servidor

```powershell
# Detener servidor: Ctrl+C en la terminal donde corre
# Volver a iniciar:
npm run dev
```

---

## PASO 2: Crear perfil de emergencia de prueba en Firestore

### A. Crear colección y documento

1. Firebase Console → **Firestore Database**
2. Si es primera vez, click **"Create database"**
   - Start in **test mode**
   - Location: `southamerica-east1` (São Paulo)
   - Click **Enable**
3. Click **"Start collection"**
   - Collection ID: `emergencyProfiles`
   - Click **Next**
4. Document ID: `test_profile_001`
5. Agregar campos uno por uno (ver tabla abajo)

### B. Campos del documento

**Copiar y pegar cada campo:**

| Campo | Tipo | Valor |
|-------|------|-------|
| `profileId` | string | `test_profile_001` |
| `userId` | string | `user_test_001` |
| `webId` | string | `TEST12345` |
| `panelId` | string | `` (vacío) |
| `firstName` | string | `Juan` |
| `lastName` | string | `Pérez` |
| `fullName` | string | `Juan Pérez García` |
| `birthDate` | timestamp | 15/03/1985 00:00:00 |
| `bloodType` | string | `O+` |
| `photoURL` | string | `` (vacío) |
| `isActive` | boolean | `true` |
| `isPublic` | boolean | `true` |
| `totalAccesses` | number | `0` |
| `createdAt` | timestamp | (fecha actual) |
| `updatedAt` | timestamp | (fecha actual) |
| `lastAccessedAt` | null | `null` |

### C. Agregar arrays y maps

**allergies** (array con 3 maps):

1. Click en "+ Add field"
2. Field name: `allergies`
3. Type: `array`
4. Click **"Add item"** → Type: `map`

**Item 1 (Penicilina - GRAVE):**
```
name: "Penicilina"
severity: "grave"
notes: "Anafilaxia - NO ADMINISTRAR"
```

**Item 2 (Maní - MODERADA):**
```
name: "Maní"
severity: "moderada"
notes: "Reacción cutánea y dificultad respiratoria"
```

**Item 3 (Polen - LEVE):**
```
name: "Polen"
severity: "leve"
notes: "Estornudos y ojos llorosos"
```

---

**medications** (array con 2 maps):

**Item 1:**
```
name: "Losartán"
dosage: "50mg"
frequency: "1 vez al día (mañana)"
reason: "Hipertensión arterial"
```

**Item 2:**
```
name: "Metformina"
dosage: "850mg"
frequency: "2 veces al día"
reason: "Diabetes Tipo 2"
```

---

**medicalConditions** (array de strings):

```
[0]: "Hipertensión arterial"
[1]: "Diabetes Tipo 2"
[2]: "Asma leve"
```

---

**emergencyContacts** (array con 3 maps):

**Contact 1:**
```
name: "María González"
phone: "+56912345678"
email: "maria.gonzalez@gmail.com"
relationship: "Esposa"
priority: 1
notifyOnAccess: true
```

**Contact 2:**
```
name: "Pedro Pérez"
phone: "+56987654321"
email: "pedro.perez@gmail.com"
relationship: "Hijo"
priority: 2
notifyOnAccess: true
```

**Contact 3:**
```
name: "Dr. Carlos Muñoz"
phone: "+56922334455"
email: "dr.munoz@hospital.cl"
relationship: "Médico de cabecera"
priority: 3
notifyOnAccess: false
```

---

**emergencyNotes** (string):
```
Propenso a hipoglucemia. Siempre llevo caramelos en bolsillo derecho del pantalón. En caso de confusión o sudoración excesiva, dar algo dulce inmediatamente.
```

---

**documents** (array vacío):
```
[] (dejar vacío)
```

---

**privacySettings** (map):
```
showPhoto: true
showFullName: true
showMedications: true
showConditions: true
showDocuments: true
showEmergencyNotes: true
maxContactsVisible: 3
enableGeolocation: true
```

---

**6. Click "Save"**

---

## PASO 3: Probar la aplicación 🧪

### 1. Verificar que el servidor está corriendo

```powershell
# Debe estar corriendo en otra terminal:
npm run dev
```

**Ver en terminal:**
```
VITE v7.x.x  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 2. Abrir en navegador

**Homepage:**
http://localhost:5173/

**✅ Debe mostrar:**
- Navbar con logo "NFCores"
- Hero section
- 3 cards de características
- Footer

### 3. Probar autenticación

**Registro:**

1. Click en "Registrarse" (esquina superior derecha)
2. Llenar formulario:
   ```
   Nombre: Juan
   Apellido: Pérez
   Email: test@ejemplo.com
   Contraseña: Test1234!
   Confirmar: Test1234!
   [✓] Acepto términos
   ```
3. Click "Crear Cuenta"
4. **✅ Debe:** Redirigir a `/auth/verify-email`
5. **✅ Debe:** Mostrar toast verde "¡Cuenta creada!"

**Login:**

1. Ir a http://localhost:5173/auth/login
2. Ingresar:
   ```
   Email: test@ejemplo.com
   Contraseña: Test1234!
   ```
3. Click "Iniciar Sesión"
4. **✅ Debe:** Redirigir a `/dashboard`
5. **✅ Debe:** Mostrar "¡Hola, Juan!"

### 4. ⚡ PROBAR PÁGINA DE EMERGENCIA (CRÍTICO)

**URL:** http://localhost:5173/id/TEST12345

**🚨 ESTO ES LO MÁS IMPORTANTE**

**✅ Verificar:**

1. **Performance:**
   - Abre DevTools (F12) → Network
   - Recarga la página (Ctrl+R)
   - Verifica que el tiempo total es **< 2 segundos** ⚡

2. **Contenido visual:**
   - [ ] Badge rojo "🚨 PERFIL DE EMERGENCIA"
   - [ ] Nombre: "Juan Pérez García"
   - [ ] Edad: "40 años" (calculado desde 1985)
   - [ ] Tipo de sangre: "🩸 O+"
   - [ ] Botón "📞 Contactar Emergencia"

3. **Alergias con colores:**
   - [ ] **Penicilina:** Fondo ROJO + Icono 🚨 + "GRAVE"
   - [ ] **Maní:** Fondo AMARILLO + Icono ⚠️ + "MODERADA"
   - [ ] **Polen:** Fondo AZUL + Icono ℹ️ + "LEVE"

4. **Medicamentos:**
   - [ ] Losartán 50mg
   - [ ] Metformina 850mg

5. **Contactos:**
   - [ ] 3 contactos listados
   - [ ] Botón "📞 Llamar" en cada uno
   - [ ] **Botón 911 EXTRA GRANDE** en rojo

6. **Notas de emergencia:**
   - [ ] Card gris con el texto sobre hipoglucemia

7. **Access logging:**
   - Ve a Firebase Console → Firestore → `accessLogs`
   - **✅ Debe haber un documento nuevo** con:
     - `webId: "TEST12345"`
     - `timestamp` de ahora
     - `userAgent` de tu navegador
   - Ve a `emergencyProfiles/test_profile_001`
   - **✅ Verifica que `totalAccesses` cambió de 0 a 1**

8. **Responsive:**
   - Abre DevTools → Toggle device toolbar (Ctrl+Shift+M)
   - Prueba en iPhone SE (375px)
   - **✅ Todo debe verse bien en mobile**

### 5. Probar estados de error

**Token inválido:**
http://localhost:5173/id/abc-123-xyz

**✅ Debe mostrar:**
- Error "Código inválido"
- Botón 911 visible

**Perfil no encontrado:**
http://localhost:5173/id/NOTEXIST1

**✅ Debe mostrar:**
- Error "Perfil no encontrado"
- Botón 911 visible

---

## 📋 CHECKLIST RÁPIDO

```
CONFIGURACIÓN:
[✓] .env creado con credenciales de Firebase
[✓] Firebase Auth habilitado (Email + Google)
[✓] Servidor corriendo en http://localhost:5173/

FIRESTORE:
[✓] Colección emergencyProfiles creada
[✓] Documento test_profile_001 creado
[✓] webId: "TEST12345"
[✓] isActive: true

TESTING BÁSICO:
[✓] Homepage carga sin errores
[✓] Registro funciona
[✓] Login funciona
[✓] Dashboard carga (requiere auth)

TESTING CRÍTICO:
[✓] /id/TEST12345 carga en < 2 segundos ⚡
[✓] Alergias muestran colores correctos
[✓] Botón 911 visible y EXTRA GRANDE
[✓] Access logging funciona en Firestore
[✓] totalAccesses se incrementa
[✓] Responsive funciona en mobile
[✓] Errores muestran estados correctos
```

---

## 🐛 ¿Problemas?

### Firebase no conecta

```powershell
# Verifica que .env está en la raíz del proyecto
Get-Content .env

# Reinicia el servidor
# Ctrl+C en la terminal
npm run dev
```

### Perfil de emergencia no carga

1. Verifica en Firestore que el documento existe
2. Verifica que `webId` es exactamente "TEST12345"
3. Verifica que `isActive` es `true`
4. Abre la consola del navegador (F12) y busca errores

### Página carga pero sin datos

1. Abre DevTools (F12) → Console
2. Busca errores en rojo
3. Ve a Network → Filtra por "firestore"
4. Verifica que la petición fue exitosa (status 200)

---

## 📖 Documentación Completa

Para testing detallado, ver: **`TESTING_GUIDE.md`**

---

**¡Listo para testear!** 🚀
