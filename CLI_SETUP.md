# 🚀 SETUP COMPLETO POR LÍNEA DE COMANDOS

## ✅ YA COMPLETADO:

1. ✅ Firebase CLI instalado
2. ✅ Login en Firebase (c.c.guerrero107@gmail.com)
3. ✅ Archivo `.env` creado con credenciales
4. ✅ Servidor corriendo en http://localhost:5173/

---

## 📋 COMANDOS RÁPIDOS:

### OPCIÓN 1: Setup Automático (RECOMENDADO)

```powershell
# 1. Configurar Firebase (índices y reglas)
.\setup-firebase.ps1

# 2. Instalar firebase-admin (si no está)
npm install --save-dev firebase-admin

# 3. Crear perfil de prueba
.\create-test-profile.ps1
# Luego ejecutar:
node import-profile.js

# 4. Probar
# Abrir: http://localhost:5173/id/TEST12345
```

### OPCIÓN 2: Comandos manuales

```powershell
# Conectar con proyecto
firebase use nfcores-web-test

# Desplegar índices de Firestore
firebase deploy --only firestore:indexes

# Desplegar reglas de Firestore
firebase deploy --only firestore:rules

# Desplegar reglas de Storage
firebase deploy --only storage

# Ver estado del proyecto
firebase projects:list

# Ver información del proyecto actual
firebase use
```

---

## ⚠️ LO QUE SÍ NECESITAS HACER EN CONSOLE (2 clicks):

### 1. Habilitar Authentication (1 min)

**URL:** https://console.firebase.google.com/project/nfcores-web-test/authentication

**Acciones:**
- Click en "Sign-in method"
- Click en "Email/Password" → Enable → Save
- Click en "Google" → Enable → Agregar email → Save

**Alternativa por CLI (experimental):**
```powershell
# Nota: Esto puede no funcionar, Firebase recomienda usar Console
firebase auth:import users.json --hash-algo=SCRYPT
```

### 2. Crear Firestore Database (si no existe) (1 min)

**URL:** https://console.firebase.google.com/project/nfcores-web-test/firestore

**Acciones:**
- Click en "Create database"
- Seleccionar "Test mode"
- Location: "southamerica-east1"
- Click "Enable"

**Verificar por CLI:**
```powershell
firebase firestore:databases:list
```

---

## 🎯 FLUJO COMPLETO RECOMENDADO:

```powershell
# PASO 1: Setup de Firebase (automático)
.\setup-firebase.ps1

# PASO 2: Habilitar Auth en Console (manual - 1 min)
# Ir a: https://console.firebase.google.com/project/nfcores-web-test/authentication

# PASO 3: Crear Firestore (manual - 1 min)
# Ir a: https://console.firebase.google.com/project/nfcores-web-test/firestore

# PASO 4: Crear perfil de prueba (automático)
.\create-test-profile.ps1
node import-profile.js

# PASO 5: Probar la app
# Abrir: http://localhost:5173/id/TEST12345
```

**Tiempo total:** ~5 minutos (3 min automático + 2 min manual)

---

## 📦 COMANDOS ÚTILES DE FIREBASE CLI:

```powershell
# Ver proyectos
firebase projects:list

# Usar proyecto específico
firebase use nfcores-web-test

# Ver configuración actual
firebase use

# Desplegar todo
firebase deploy

# Desplegar solo Firestore
firebase deploy --only firestore

# Desplegar solo reglas
firebase deploy --only firestore:rules

# Desplegar solo índices
firebase deploy --only firestore:indexes

# Desplegar solo Storage
firebase deploy --only storage

# Desplegar solo Hosting
firebase deploy --only hosting

# Ver logs
firebase functions:log

# Iniciar emuladores locales
firebase emulators:start

# Ver estado de emuladores
firebase emulators:start --only firestore,auth

# Backup de Firestore
firebase firestore:export gs://nfcores-web-test.appspot.com/backups

# Restaurar Firestore
firebase firestore:import gs://nfcores-web-test.appspot.com/backups/[timestamp]
```

---

## 🔧 TROUBLESHOOTING:

### Error: "Permission denied"
```powershell
# Volver a hacer login
firebase logout
firebase login
```

### Error: "Project not found"
```powershell
# Listar proyectos disponibles
firebase projects:list

# Usar proyecto correcto
firebase use nfcores-web-test
```

### Error: "firebase-admin not found"
```powershell
# Instalar firebase-admin
npm install --save-dev firebase-admin
```

### Verificar que todo funciona
```powershell
# Ver configuración
firebase use

# Ver servicios activos
firebase projects:list

# Probar reglas
firebase deploy --only firestore:rules --debug
```

---

## ✅ CHECKLIST:

```
COMPLETADO:
✅ Firebase CLI instalado
✅ Login exitoso
✅ Proyecto conectado (nfcores-web-test)
✅ .env configurado
✅ Scripts creados (setup-firebase.ps1, create-test-profile.ps1)

PENDIENTE:
⏳ Ejecutar setup-firebase.ps1
⏳ Habilitar Authentication en Console (2 clicks)
⏳ Crear Firestore Database en Console (1 click)
⏳ Ejecutar create-test-profile.ps1
⏳ Ejecutar node import-profile.js
⏳ Probar /id/TEST12345
```

---

## 🚀 EJECUTA AHORA:

```powershell
.\setup-firebase.ps1
```

¡Y sigue las instrucciones que aparecen en pantalla!
