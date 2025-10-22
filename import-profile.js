import admin from 'firebase-admin';
import fs from 'fs';

// Inicializar Firebase Admin
admin.initializeApp({
  projectId: 'nfcores-web-test'
});

const db = admin.firestore();

// Leer datos del perfil
const profileData = JSON.parse(fs.readFileSync('temp_profile.json', 'utf8'));

// Convertir timestamp
profileData.createdAt = admin.firestore.FieldValue.serverTimestamp();
profileData.updatedAt = admin.firestore.FieldValue.serverTimestamp();

// Crear documento
db.collection('emergencyProfiles')
  .doc('test_profile_001')
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
