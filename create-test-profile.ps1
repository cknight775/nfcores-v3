# ============================================
# SCRIPT PARA CREAR PERFIL DE EMERGENCIA DE PRUEBA
# ============================================
# Crea el documento de prueba en Firestore usando Firebase CLI
# Fecha: 22 de octubre de 2025
# Proyecto: nfcores-web-test
# ============================================

Write-Host "🏥 CREANDO PERFIL DE EMERGENCIA DE PRUEBA" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Variables
$PROJECT_ID = "nfcores-web-test"
$COLLECTION = "emergencyProfiles"
$DOC_ID = "test_profile_001"

# ============================================
# CREAR ARCHIVO JSON CON LOS DATOS
# ============================================
Write-Host "📝 Creando datos del perfil..." -ForegroundColor Yellow

$profileData = @"
{
  "profileId": "test_profile_001",
  "userId": "user_test_001",
  "webId": "TEST12345",
  "panelId": "",
  "firstName": "Juan",
  "lastName": "Pérez",
  "fullName": "Juan Pérez García",
  "birthDate": {
    "_seconds": 479520000,
    "_nanoseconds": 0
  },
  "bloodType": "O+",
  "photoURL": "",
  "allergies": [
    {
      "name": "Penicilina",
      "severity": "grave",
      "notes": "Anafilaxia - NO ADMINISTRAR"
    },
    {
      "name": "Maní",
      "severity": "moderada",
      "notes": "Reacción cutánea y dificultad respiratoria"
    },
    {
      "name": "Polen",
      "severity": "leve",
      "notes": "Estornudos y ojos llorosos"
    }
  ],
  "medications": [
    {
      "name": "Losartán",
      "dosage": "50mg",
      "frequency": "1 vez al día (mañana)",
      "reason": "Hipertensión arterial"
    },
    {
      "name": "Metformina",
      "dosage": "850mg",
      "frequency": "2 veces al día",
      "reason": "Diabetes Tipo 2"
    }
  ],
  "medicalConditions": [
    "Hipertensión arterial",
    "Diabetes Tipo 2",
    "Asma leve"
  ],
  "emergencyContacts": [
    {
      "name": "María González",
      "phone": "+56912345678",
      "email": "maria.gonzalez@gmail.com",
      "relationship": "Esposa",
      "priority": 1,
      "notifyOnAccess": true
    },
    {
      "name": "Pedro Pérez",
      "phone": "+56987654321",
      "email": "pedro.perez@gmail.com",
      "relationship": "Hijo",
      "priority": 2,
      "notifyOnAccess": true
    },
    {
      "name": "Dr. Carlos Muñoz",
      "phone": "+56922334455",
      "email": "dr.munoz@hospital.cl",
      "relationship": "Médico de cabecera",
      "priority": 3,
      "notifyOnAccess": false
    }
  ],
  "emergencyNotes": "Propenso a hipoglucemia. Siempre llevo caramelos en bolsillo derecho del pantalón. En caso de confusión o sudoración excesiva, dar algo dulce inmediatamente.",
  "documents": [],
  "privacySettings": {
    "showPhoto": true,
    "showFullName": true,
    "showMedications": true,
    "showConditions": true,
    "showDocuments": true,
    "showEmergencyNotes": true,
    "maxContactsVisible": 3,
    "enableGeolocation": true
  },
  "isActive": true,
  "isPublic": true,
  "totalAccesses": 0,
  "lastAccessedAt": null
}
"@

# Guardar en archivo temporal
$tempFile = "temp_profile.json"
$profileData | Out-File -FilePath $tempFile -Encoding UTF8

Write-Host "✅ Datos del perfil creados" -ForegroundColor Green
Write-Host ""

# ============================================
# IMPORTAR A FIRESTORE USANDO NODE.JS
# ============================================
Write-Host "📤 Importando a Firestore..." -ForegroundColor Yellow
Write-Host "⚠️  NOTA: Firebase CLI no soporta crear documentos directamente" -ForegroundColor Yellow
Write-Host "Creando script Node.js para importar..." -ForegroundColor Yellow
Write-Host ""

# Crear script de Node.js para importar
$nodeScript = @"
const admin = require('firebase-admin');
const fs = require('fs');

// Inicializar Firebase Admin
admin.initializeApp({
  projectId: '$PROJECT_ID'
});

const db = admin.firestore();

// Leer datos del perfil
const profileData = JSON.parse(fs.readFileSync('$tempFile', 'utf8'));

// Convertir timestamp
profileData.createdAt = admin.firestore.FieldValue.serverTimestamp();
profileData.updatedAt = admin.firestore.FieldValue.serverTimestamp();

// Crear documento
db.collection('$COLLECTION')
  .doc('$DOC_ID')
  .set(profileData)
  .then(() => {
    console.log('✅ Perfil de emergencia creado exitosamente');
    console.log('');
    console.log('📊 DATOS:');
    console.log('  - WebID: TEST12345');
    console.log('  - Nombre: Juan Pérez García');
    console.log('  - Alergias: 3 (Penicilina, Maní, Polen)');
    console.log('  - Medicamentos: 2 (Losartán, Metformina)');
    console.log('  - Contactos: 3');
    console.log('');
    console.log('🧪 PROBAR EN:');
    console.log('  http://localhost:5173/id/TEST12345');
    console.log('');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error al crear perfil:', error);
    process.exit(1);
  });
"@

$nodeScript | Out-File -FilePath "import-profile.js" -Encoding UTF8

# ============================================
# VERIFICAR SI FIREBASE-ADMIN ESTÁ INSTALADO
# ============================================
Write-Host "🔍 Verificando dependencias..." -ForegroundColor Yellow

$packageJson = Get-Content "package.json" | ConvertFrom-Json
$hasFirebaseAdmin = $packageJson.dependencies."firebase-admin" -or $packageJson.devDependencies."firebase-admin"

if (-not $hasFirebaseAdmin) {
    Write-Host "📦 Instalando firebase-admin..." -ForegroundColor Yellow
    npm install --save-dev firebase-admin
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "⚠️  INSTRUCCIONES FINALES" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "El script de importación está listo, pero necesitas:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Habilitar Authentication en Firebase Console:" -ForegroundColor Cyan
Write-Host "   https://console.firebase.google.com/project/$PROJECT_ID/authentication" -ForegroundColor Gray
Write-Host "   - Email/Password: Enable" -ForegroundColor Gray
Write-Host "   - Google: Enable" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Crear Firestore Database (si no existe):" -ForegroundColor Cyan
Write-Host "   https://console.firebase.google.com/project/$PROJECT_ID/firestore" -ForegroundColor Gray
Write-Host "   - Test mode → southamerica-east1" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Luego ejecuta:" -ForegroundColor Cyan
Write-Host "   node import-profile.js" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Archivos creados:" -ForegroundColor Yellow
Write-Host "  - $tempFile (datos del perfil)" -ForegroundColor Gray
Write-Host "  - import-profile.js (script de importación)" -ForegroundColor Gray
Write-Host ""
