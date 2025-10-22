# ✅ CONFIGURACIÓN COMPLETADA - Próximos Pasos

**Fecha:** 22 de octubre de 2025  
**Proyecto:** nfcores-web-test  
**Estado:** ✅ Firebase conectado - Servidor corriendo

---

## 🎉 LO QUE YA ESTÁ HECHO

### ✅ Archivo `.env` creado con tus credenciales de Firebase:
```
Project: nfcores-web-test
API Key: AIzaSyDFtF_5IzvcxYI5-wYj9W0gYJkNW6s0DMU
Auth Domain: nfcores-web-test.firebaseapp.com
Project ID: nfcores-web-test
```

### ✅ Servidor de desarrollo:
- **Status:** ✅ Corriendo
- **URL:** http://localhost:5173/
- **Variables de entorno:** ✅ Cargadas

### ✅ Simple Browser:
- ✅ Abierto en VS Code mostrando la aplicación

---

## 📋 SIGUIENTE: Configurar Firebase Console

### PASO 1: Habilitar Authentication (5 min)

**URL:** https://console.firebase.google.com/project/nfcores-web-test/authentication

**Acciones:**

1. **Habilitar Email/Password:**
   - Click en pestaña **"Sign-in method"**
   - Click en **"Email/Password"**
   - Toggle **"Enable"** → ON
   - Click **"Save"**

2. **Habilitar Google OAuth:**
   - Click en **"Google"**
   - Toggle **"Enable"** → ON
   - En "Project support email" selecciona tu email
   - Click **"Save"**

**✅ Resultado esperado:**
- Email/Password: ✅ Enabled
- Google: ✅ Enabled

---

### PASO 2: Crear Firestore Database (2 min)

**URL:** https://console.firebase.google.com/project/nfcores-web-test/firestore

**Acciones:**

1. Click en **"Create database"**
2. Seleccionar **"Start in test mode"** (por ahora)
3. Location: **"southamerica-east1"** (São Paulo)
4. Click **"Enable"**

**✅ Resultado esperado:**
- Firestore Database creado
- Sin colecciones aún (normal)

---

### PASO 3: Crear perfil de emergencia de prueba (5 min)

**URL:** https://console.firebase.google.com/project/nfcores-web-test/firestore/data

**Acciones:**

#### A. Crear colección:
1. Click en **"Start collection"**
2. Collection ID: `emergencyProfiles`
3. Click **"Next"**

#### B. Crear documento:
1. Document ID: `test_profile_001`
2. Agregar campos según la tabla de abajo
3. Click **"Save"**

#### C. Campos del documento (copiar exactamente):

**Campos simples (strings):**
```
profileId: test_profile_001
userId: user_test_001
webId: TEST12345
panelId: (dejar vacío)
firstName: Juan
lastName: Pérez
fullName: Juan Pérez García
bloodType: O+
photoURL: (dejar vacío)
```

**Campos booleanos:**
```
isActive: true
isPublic: true
```

**Campos numéricos:**
```
totalAccesses: 0
```

**Campos timestamp:**
```
birthDate: 15/03/1985 00:00:00 (usar selector de fecha)
createdAt: (fecha actual)
updatedAt: (fecha actual)
lastAccessedAt: null
```

**Campos array - Alergias:**

Field: `allergies` | Type: `array`

Click "Add item" → Type: `map` (3 veces para 3 alergias)

**Alergia 1 (GRAVE):**
```
name: Penicilina
severity: grave
notes: Anafilaxia - NO ADMINISTRAR
```

**Alergia 2 (MODERADA):**
```
name: Maní
severity: moderada
notes: Reacción cutánea y dificultad respiratoria
```

**Alergia 3 (LEVE):**
```
name: Polen
severity: leve
notes: Estornudos y ojos llorosos
```

**Campos array - Medicamentos:**

Field: `medications` | Type: `array`

Click "Add item" → Type: `map` (2 veces)

**Medicamento 1:**
```
name: Losartán
dosage: 50mg
frequency: 1 vez al día (mañana)
reason: Hipertensión arterial
```

**Medicamento 2:**
```
name: Metformina
dosage: 850mg
frequency: 2 veces al día
reason: Diabetes Tipo 2
```

**Campos array - Condiciones médicas:**

Field: `medicalConditions` | Type: `array`

Click "Add item" → Type: `string` (3 veces)

```
[0]: Hipertensión arterial
[1]: Diabetes Tipo 2
[2]: Asma leve
```

**Campos array - Contactos de emergencia:**

Field: `emergencyContacts` | Type: `array`

Click "Add item" → Type: `map` (3 veces)

**Contacto 1:**
```
name: María González
phone: +56912345678
email: maria.gonzalez@gmail.com
relationship: Esposa
priority: 1
notifyOnAccess: true
```

**Contacto 2:**
```
name: Pedro Pérez
phone: +56987654321
email: pedro.perez@gmail.com
relationship: Hijo
priority: 2
notifyOnAccess: true
```

**Contacto 3:**
```
name: Dr. Carlos Muñoz
phone: +56922334455
email: dr.munoz@hospital.cl
relationship: Médico de cabecera
priority: 3
notifyOnAccess: false
```

**Campos string largos:**

Field: `emergencyNotes` | Type: `string`
```
Propenso a hipoglucemia. Siempre llevo caramelos en bolsillo derecho del pantalón. En caso de confusión o sudoración excesiva, dar algo dulce inmediatamente.
```

**Campos array vacíos:**

Field: `documents` | Type: `array`
```
(dejar vacío - no agregar items)
```

**Campos map - Privacy Settings:**

Field: `privacySettings` | Type: `map`

Agregar estos campos dentro del map:
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

**4. Click "Save"**

✅ **Verificar:** El documento aparece en la colección `emergencyProfiles`

---

## 🧪 TESTING INMEDIATO (2 min)

Una vez completados los pasos anteriores:

### Probar página de emergencia:

**URL:** http://localhost:5173/id/TEST12345

**✅ Debe mostrar:**
- Badge rojo "🚨 PERFIL DE EMERGENCIA"
- Nombre: "Juan Pérez García"
- Edad: "40 años"
- Tipo de sangre: "🩸 O+"
- **Alergias con colores:**
  - Penicilina: ROJO 🚨 (grave)
  - Maní: AMARILLO ⚠️ (moderada)
  - Polen: AZUL ℹ️ (leve)
- Medicamentos (Losartán, Metformina)
- 3 contactos de emergencia
- **Botón 911 EXTRA GRANDE** en rojo

### Medir performance:

1. Abre DevTools (F12)
2. Ve a pestaña **Network**
3. Recarga la página (Ctrl+R)
4. **Verificar:** Tiempo total < 2 segundos ⚡

### Verificar access logging:

1. Vuelve a Firebase Console → Firestore
2. **Debe aparecer nueva colección:** `accessLogs`
3. Abre un documento → **Verificar campos:**
   - `webId: "TEST12345"`
   - `timestamp` (fecha actual)
   - `userAgent` (tu navegador)
4. Ve a `emergencyProfiles/test_profile_001`
5. **Verificar:** `totalAccesses` cambió de 0 a 1

---

## 🎯 TESTING COMPLETO (30 min)

Después de verificar que la página de emergencia funciona:

### 1. Probar autenticación:

**Registro:**
- http://localhost:5173/auth/register
- Crear cuenta de prueba
- Verificar que redirecciona a `/auth/verify-email`

**Login:**
- http://localhost:5173/auth/login
- Login con las credenciales creadas
- Verificar que redirecciona a `/dashboard`

**Google OAuth:**
- Click en "Continuar con Google"
- Seleccionar cuenta de Google
- Verificar que funciona

### 2. Probar dashboard:
- http://localhost:5173/dashboard (requiere login)
- Verificar que muestra nombre del usuario
- Verificar 3 cards de funcionalidades

### 3. Probar estados de error:
- http://localhost:5173/id/INVALID → Error "Código Inválido"
- http://localhost:5173/id/NOTEXIST1 → Error "Perfil no encontrado"
- En ambos casos: botón 911 visible

### 4. Probar responsive:
- DevTools → Toggle device toolbar (Ctrl+Shift+M)
- Probar en iPhone SE (375px)
- Verificar que todo se ve bien

---

## 📚 DOCUMENTACIÓN DE REFERENCIA

- **`QUICK_START.md`** - Guía rápida (ya la leíste)
- **`TESTING_GUIDE.md`** - Guía completa con 100+ verificaciones
- **`TESTING_STATUS.md`** - Estado y checklist

---

## ✅ CHECKLIST RÁPIDO

```
FIREBASE CONSOLE:
[ ] Authentication habilitado (Email + Google)
[ ] Firestore Database creado
[ ] Colección emergencyProfiles creada
[ ] Documento test_profile_001 creado
[ ] webId: "TEST12345" (exacto)
[ ] isActive: true

TESTING BÁSICO:
[ ] /id/TEST12345 carga sin errores
[ ] Alergias muestran colores correctos
[ ] Botón 911 visible y grande
[ ] Access logging funciona (colección accessLogs)
[ ] totalAccesses se incrementa
[ ] Performance < 2 segundos ⚡

TESTING ADICIONAL (opcional):
[ ] Registro funciona
[ ] Login funciona
[ ] Dashboard carga (requiere auth)
[ ] Google OAuth funciona
[ ] Responsive funciona
```

---

## 🎉 UNA VEZ COMPLETADO

Si todos los checks están ✅:

**ESTÁS LISTO PARA PROMPT 7** 🚀

Puedes continuar con la siguiente fase de desarrollo con confianza de que todo funciona correctamente.

---

## 🐛 ¿PROBLEMAS?

### Firebase no conecta:
```powershell
# Verificar que .env existe
Get-Content .env

# Reiniciar servidor
# Ctrl+C
npm run dev
```

### Perfil no carga:
1. Verificar en Firestore que el documento existe
2. Verificar que `webId` es exactamente "TEST12345" (mayúsculas)
3. Verificar que `isActive` es `true`
4. Abrir consola del navegador (F12) y buscar errores

### Página carga pero sin datos:
1. F12 → Console → Buscar errores en rojo
2. Network → Filtrar por "firestore" → Verificar status 200

---

**Última actualización:** 22 de octubre de 2025  
**Proyecto:** nfcores-web-test  
**Estado:** ✅ Listo para testing
