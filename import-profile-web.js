import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';

// Configuración de Firebase (desde .env)
const firebaseConfig = {
  apiKey: "AIzaSyDFtF_5IzvcxYI5-wYj9W0gYJkNW6s0DMU",
  authDomain: "nfcores-web-test.firebaseapp.com",
  projectId: "nfcores-web-test",
  storageBucket: "nfcores-web-test.firebasestorage.app",
  messagingSenderId: "530064245701",
  appId: "1:530064245701:web:16f52ddedcd9456b40c1ac",
  measurementId: "G-G1DFRMK1P8"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Leer datos del perfil
const profileData = JSON.parse(fs.readFileSync('temp_profile.json', 'utf8'));

// Convertir timestamps
profileData.createdAt = serverTimestamp();
profileData.updatedAt = serverTimestamp();

// Convertir birthDate a objeto Date
const birthDate = new Date(1985, 2, 15); // Marzo 15, 1985
profileData.birthDate = birthDate;

console.log('📤 Importando perfil de emergencia a Firestore...');
console.log('');

// Crear documento en Firestore
const docRef = doc(db, 'emergencyProfiles', 'test_profile_001');

setDoc(docRef, profileData)
  .then(() => {
    console.log('✅ Perfil de emergencia creado exitosamente');
    console.log('');
    console.log('📊 DATOS CREADOS:');
    console.log('  📍 Colección: emergencyProfiles');
    console.log('  🆔 Document ID: test_profile_001');
    console.log('  🔑 WebID: TEST12345');
    console.log('  👤 Nombre: Juan Pérez García');
    console.log('  🩸 Tipo de sangre: O+');
    console.log('  ⚠️  Alergias: 3 (Penicilina, Maní, Polen)');
    console.log('  💊 Medicamentos: 2 (Losartán, Metformina)');
    console.log('  📞 Contactos: 3');
    console.log('');
    console.log('🧪 PROBAR AHORA EN:');
    console.log('  👉 http://localhost:5173/id/TEST12345');
    console.log('');
    console.log('✅ ¡Todo listo para testear!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('');
    console.error('❌ Error al crear perfil:', error.message);
    console.error('');
    console.error('⚠️  POSIBLES CAUSAS:');
    console.error('   1. Firestore Database no está habilitado');
    console.error('      → Ir a: https://console.firebase.google.com/project/nfcores-web-test/firestore');
    console.error('      → Click en "Create database"');
    console.error('');
    console.error('   2. Reglas de Firestore muy restrictivas');
    console.error('      → Cambiar a test mode temporalmente');
    console.error('');
    process.exit(1);
  });
