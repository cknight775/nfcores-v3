# Diseño de Página Pública de Emergencia - NFCores

**Última actualización**: 2025-01-21 21:16:15 UTC  
**Actualizado por**: @cknight775  
**Versión**: 2.0.0 - SINCRONIZADA

---

## 🎯 Objetivo de la Página

**Propósito:** Mostrar información médica crítica en menos de 2 segundos cuando alguien escanea una pulsera NFC en una emergencia.

**Ruta:** `/id/:token` donde token es el WebID (formato: `ABC123XYZ`)

**Características críticas (sincronizadas):**
- ✅ Acceso público (sin login)
- ✅ Tiempo de carga < 2 segundos
- ✅ Funciona offline (PWA)
- ✅ Responsive móvil-first
- ✅ Compatible Android 8+ e iOS 12+
- ✅ Uptime 99.9%

---

## 🎨 REFERENCIA DE DISEÑO

**URL de referencia:** https://nfcores.com/profile/9SMAM8

**Paleta de colores oficial (sincronizada con `systemConfig/branding`):**
```css
:root {
  --primary: #DC2626;        /* Red-600 - Color principal */
  --primary-hover: #B91C1C;  /* Red-700 - Hover */
  --secondary: #10B981;      /* Green-600 - Éxito */
  --accent: #3B82F6;         /* Blue-600 - Información */
  --danger: #EF4444;         /* Red-500 - Peligro */
  --warning: #F59E0B;        /* Amber-500 - Advertencia */
  --neutral: #6B7280;        /* Gray-600 - Texto secundario */
  --bg-light: #F9FAFB;       /* Gray-50 - Fondo claro */
}
```

---

## 📱 DISEÑO COMPLETO (Mobile-First)

### Estructura General
```
┌─────────────────────────────────────────────────────┐
│ 🆘 PERFIL DE EMERGENCIA                             │
│                                                     │
│              [FOTO CIRCULAR 192px]                  │
│           Juan Pérez Rodríguez                      │
│                   32 años                           │
│                                                     │
│   [🩸 O+]  [📅 32 años]  [📞 CONTACTAR]            │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 🏥 INFORMACIÓN MÉDICA                               │
│                                                     │
│ ⚠️ ALERGIAS:                                        │
│ ┌─────────────────────────────────────────────┐   │
│ │ Penicilina (GRAVE - Anafilaxia) 🚨          │   │
│ │ Fondo rojo claro #FEE2E2                     │   │
│ │ Borde rojo oscuro #DC2626                    │   │
│ └─────────────────────────────────────────────┘   │
│ ┌─────────────────────────────────────────────┐   │
│ │ Maní (Moderada)                              │   │
│ │ Fondo amarillo claro #FEF3C7                 │   │
│ │ Borde naranja #F59E0B                        │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 💊 MEDICAMENTOS ACTUALES:                           │
│ ┌─────────────────────────────────────────────┐   │
│ │ • Losartán 50mg - 1 vez al día               │   │
│ │   Motivo: Hipertensión arterial              │   │
│ │ Fondo azul claro #DBEAFE                     │   │
│ └─────────────────────────────────────────────┘   │
│ ┌─────────────────────────────────────────────┐   │
│ │ • Metformina 850mg - 2 veces al día          │   │
│ │   Motivo: Diabetes tipo 2                    │   │
│ │ Fondo azul claro #DBEAFE                     │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 🏥 CONDICIONES MÉDICAS:                             │
│ [Hipertensión] [Diabetes Tipo 2]                   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 📞 CONTACTOS DE EMERGENCIA                          │
│                                                     │
│ 1️⃣ María González (Esposa)                         │
│    📱 +56 9 8765 4321                               │
│    ┌───────────────────────────────────────┐       │
│    │    [📞 LLAMAR AHORA]                  │       │
│    │ Botón verde grande prominente          │       │
│    │ Fondo #10B981 hover #059669            │       │
│    └───────────────────────────────────────┘       │
│                                                     │
│ 2️⃣ Pedro Pérez (Hijo)                              │
│    📱 +56 9 1234 5678                               │
│    [📞 LLAMAR]                                      │
│                                                     │
│ ─────────────────────────────────                  │
│ 🚨 EMERGENCIA INMEDIATA                             │
│ ┌───────────────────────────────────────────┐      │
│ │         [LLAMAR 911]                       │      │
│ │  Botón rojo EXTRA grande                   │      │
│ │  Fondo #DC2626 hover #B91C1C               │      │
│ │  padding: 20px 40px                        │      │
│ │  font-size: 24px                           │      │
│ └───────────────────────────────────────────┘      │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 📝 NOTAS DE EMERGENCIA                              │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ Propenso a hipoglucemia. Siempre llevo      │   │
│ │ caramelos en bolsillo derecho del pantalón. │   │
│ │ En caso de convulsión, NO meter nada en     │   │
│ │ la boca. Solo girar de lado.                │   │
│ │                                              │   │
│ │ Fondo gris claro #F3F4F6                    │   │
│ │ Borde gris #D1D5DB                          │   │
│ │ padding: 16px                                │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 📄 DOCUMENTOS MÉDICOS (si están públicos)          │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ 📄 Receta_Losartan_2025.pdf (1.2 MB)        │   │
│ │ [👁️ VER] [⬇️ DESCARGAR]                     │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 COMPONENTES DETALLADOS

### 1. Hero Section (Header)
```tsx
// src/components/emergency/HeroSection.tsx
<HeroSection className="bg-white py-6 px-4 shadow-sm">
  <div className="max-w-2xl mx-auto text-center">
    {/* Badge de emergencia */}
    <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
      <span className="text-2xl">🆘</span>
      <span>PERFIL DE EMERGENCIA</span>
    </div>
    
    {/* Foto de perfil (si privacySettings.showPhoto = true) */}
    {profile.privacySettings.showPhoto && profile.photoURL && (
      <img
        src={profile.photoURL}
        alt={profile.fullName}
        className="w-48 h-48 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
      />
    )}
    
    {/* Nombre completo o solo firstName según privacySettings */}
    <h1 className="text-3xl font-bold text-gray-900 mb-2">
      {profile.privacySettings.showFullName 
        ? profile.fullName 
        : profile.firstName}
    </h1>
    
    {/* Edad calculada desde birthDate */}
    <p className="text-lg text-gray-600 mb-4">
      {calculateAge(profile.birthDate)} años
    </p>
    
    {/* Badges informativos */}
    <div className="flex flex-wrap justify-center gap-3">
      {/* Tipo de sangre */}
      <Badge className="bg-red-100 text-red-800 text-lg px-4 py-2">
        🩸 {profile.bloodType}
      </Badge>
      
      {/* Edad */}
      <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
        📅 {calculateAge(profile.birthDate)} años
      </Badge>
      
      {/* Botón contactar (scroll a contactos) */}
      <button
        onClick={() => scrollToContacts()}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium text-lg transition-colors"
      >
        📞 CONTACTAR
      </button>
    </div>
  </div>
</HeroSection>
```

---

### 2. Información Médica (Sección más crítica)
```tsx
// src/components/emergency/MedicalInfoCard.tsx
<MedicalInfoCard className="bg-white rounded-xl shadow-lg p-6 mb-6">
  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
    <span className="text-3xl">🏥</span>
    INFORMACIÓN MÉDICA
  </h2>
  
  {/* ALERGIAS (Prioridad máxima) */}
  {profile.allergies.length > 0 && (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span className="text-2xl">⚠️</span>
        ALERGIAS:
      </h3>
      
      <div className="space-y-3">
        {profile.allergies.map((allergy, index) => (
          <AllergyCard
            key={index}
            allergy={allergy}
            className={`p-4 rounded-lg border-2 ${
              allergy.severity === 'grave'
                ? 'bg-red-50 border-red-600 text-red-900'
                : allergy.severity === 'moderada'
                ? 'bg-yellow-50 border-amber-500 text-amber-900'
                : 'bg-blue-50 border-blue-400 text-blue-900'
            }`}
          >
            <div className="flex items-start gap-3">
              {allergy.severity === 'grave' && (
                <span className="text-3xl flex-shrink-0">🚨</span>
              )}
              <div className="flex-1">
                <p className="font-bold text-lg">
                  {allergy.name} {' '}
                  {allergy.severity === 'grave' && (
                    <span className="uppercase text-sm">
                      (GRAVE - Anafilaxia)
                    </span>
                  )}
                  {allergy.severity === 'moderada' && (
                    <span className="uppercase text-sm">(Moderada)</span>
                  )}
                </p>
                {allergy.notes && (
                  <p className="text-sm mt-1">{allergy.notes}</p>
                )}
              </div>
            </div>
          </AllergyCard>
        ))}
      </div>
    </div>
  )}
  
  {/* MEDICAMENTOS (si privacySettings.showMedications = true) */}
  {profile.privacySettings.showMedications && profile.medications.length > 0 && (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span className="text-2xl">💊</span>
        MEDICAMENTOS ACTUALES:
      </h3>
      
      <div className="space-y-3">
        {profile.medications.map((medication, index) => (
          <MedicationCard
            key={index}
            className="bg-blue-50 border border-blue-300 rounded-lg p-4"
          >
            <p className="font-semibold text-gray-900">
              • {medication.name} {medication.dosage} - {medication.frequency}
            </p>
            {medication.reason && (
              <p className="text-sm text-gray-700 mt-1">
                Motivo: {medication.reason}
              </p>
            )}
          </MedicationCard>
        ))}
      </div>
    </div>
  )}
  
  {/* CONDICIONES MÉDICAS (si privacySettings.showConditions = true) */}
  {profile.privacySettings.showConditions && profile.medicalConditions.length > 0 && (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span className="text-2xl">🏥</span>
        CONDICIONES MÉDICAS:
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {profile.medicalConditions.map((condition, index) => (
          <Badge
            key={index}
            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full"
          >
            {condition}
          </Badge>
        ))}
      </div>
    </div>
  )}
</MedicalInfoCard>
```

---

### 3. Contactos de Emergencia
```tsx
// src/components/emergency/ContactsCard.tsx
<ContactsCard className="bg-white rounded-xl shadow-lg p-6 mb-6">
  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
    <span className="text-3xl">📞</span>
    CONTACTOS DE EMERGENCIA
  </h2>
  
  <div className="space-y-4">
    {/* Mostrar solo maxContactsVisible según privacySettings */}
    {profile.emergencyContacts
      .slice(0, profile.privacySettings.maxContactsVisible)
      .map((contact, index) => (
        <ContactItem
          key={index}
          className="bg-green-50 border-2 border-green-300 rounded-lg p-4"
        >
          <div className="flex items-start gap-3">
            {/* Priority badge */}
            <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
              {contact.priority}
            </div>
            
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-lg">
                {contact.name}
              </p>
              <p className="text-gray-700 text-sm">
                {contact.relationship}
              </p>
              <p className="text-gray-900 font-mono text-lg mt-1">
                📱 {contact.phone}
              </p>
              
              {/* Botón de llamada (tel: protocol) */}
              <a
                href={`tel:${contact.phone}`}
                className={`mt-3 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-lg transition-colors ${
                  contact.priority === 1
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                onClick={() => logContactCalled(profile.webId, contact.priority)}
              >
                <span className="text-xl">📞</span>
                {contact.priority === 1 ? 'LLAMAR AHORA' : 'LLAMAR'}
              </a>
            </div>
          </div>
        </ContactItem>
      ))}
  </div>
  
  {/* Separador */}
  <div className="border-t-2 border-gray-300 my-6"></div>
  
  {/* Botón 911 - SIEMPRE visible */}
  <div className="text-center">
    <p className="text-gray-700 font-semibold mb-3 text-lg">
      🚨 EMERGENCIA INMEDIATA
    </p>
    <a
      href="tel:911"
      className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-xl font-bold text-2xl shadow-2xl transition-all hover:scale-105"
      onClick={() => logEmergencyCall(profile.webId)}
    >
      <span className="text-3xl">🚨</span>
      LLAMAR 911
    </a>
  </div>
</ContactsCard>
```

---

### 4. Notas de Emergencia
```tsx
// src/components/emergency/EmergencyNotesCard.tsx
{profile.privacySettings.showEmergencyNotes && profile.emergencyNotes && (
  <EmergencyNotesCard className="bg-white rounded-xl shadow-lg p-6 mb-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <span className="text-3xl">📝</span>
      NOTAS DE EMERGENCIA
    </h2>
    
    <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-5">
      <p className="text-gray-900 whitespace-pre-wrap leading-relaxed text-lg">
        {profile.emergencyNotes}
      </p>
    </div>
  </EmergencyNotesCard>
)}
```

---

### 5. Documentos Médicos
```tsx
// src/components/emergency/DocumentsCard.tsx
{profile.privacySettings.showDocuments && profile.documents?.length > 0 && (
  <DocumentsCard className="bg-white rounded-xl shadow-lg p-6 mb-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <span className="text-3xl">📄</span>
      DOCUMENTOS MÉDICOS
    </h2>
    
    <div className="space-y-3">
      {/* Solo mostrar documentos marcados como isPublic */}
      {profile.documents
        .filter(doc => doc.isPublic)
        .map((document) => (
          <DocumentItem
            key={document.id}
            className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-3xl">
                {document.type === 'pdf' ? '📄' : '🖼️'}
              </span>
              <div>
                <p className="font-semibold text-gray-900">
                  {document.name}
                </p>
                <p className="text-sm text-gray-600">
                  {formatFileSize(document.size)}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => viewDocument(document.url)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                👁️ VER
              </button>
              <a
                href={document.url}
                download={document.name}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                onClick={() => logDocumentViewed(profile.webId, document.id)}
              >
                ⬇️ DESCARGAR
              </a>
            </div>
          </DocumentItem>
        ))}
    </div>
  </DocumentsCard>
)}
```

---

## 🔒 CONFIGURACIÓN DE PRIVACIDAD (Respetada)

```typescript
interface PrivacySettings {
  showPhoto: boolean;                // Mostrar foto de perfil
  showFullName: boolean;             // Mostrar nombre completo vs solo firstName
  showMedications: boolean;          // Mostrar medicamentos
  showConditions: boolean;           // Mostrar condiciones médicas
  showDocuments: boolean;            // Mostrar documentos
  showEmergencyNotes: boolean;       // Mostrar notas de emergencia
  maxContactsVisible: number;        // 1-5 contactos visibles
  enableGeolocation: boolean;        // Loguear ubicación de accesos
}

// Aplicar configuración antes de renderizar
const applyPrivacySettings = (profile: EmergencyProfile) => {
  return {
    ...profile,
    photoURL: profile.privacySettings.showPhoto ? profile.photoURL : null,
    fullName: profile.privacySettings.showFullName ? profile.fullName : profile.firstName,
    medications: profile.privacySettings.showMedications ? profile.medications : [],
    medicalConditions: profile.privacySettings.showConditions ? profile.medicalConditions : [],
    documents: profile.privacySettings.showDocuments 
      ? profile.documents?.filter(doc => doc.isPublic) 
      : [],
    emergencyNotes: profile.privacySettings.showEmergencyNotes ? profile.emergencyNotes : null,
    emergencyContacts: profile.emergencyContacts.slice(0, profile.privacySettings.maxContactsVisible),
  };
};
```

---

## 📊 REGISTRO DE ACCESOS (Background)

```typescript
// src/services/analytics/logEmergencyAccess.ts
export const logEmergencyAccess = async (
  webId: string,
  options: {
    geolocation?: GeolocationPosition;
    userAgent: string;
  }
) => {
  try {
    // No bloquear renderizado - ejecutar en background
    const accessLog: AccessLog = {
      logId: generateId(),
      webId,
      userId: profile.userId,
      profileId: profile.profileId,
      timestamp: serverTimestamp(),
      userAgent: options.userAgent,
      geolocation: options.geolocation ? {
        latitude: options.geolocation.coords.latitude,
        longitude: options.geolocation.coords.longitude,
      } : null,
      contactsCalled: [],
      documentsViewed: [],
    };
    
    // Guardar en Firestore
    await addDoc(collection(db, 'accessLogs'), accessLog);
    
    // Actualizar contador en perfil
    await updateDoc(doc(db, 'emergencyProfiles', profile.profileId), {
      totalAccesses: increment(1),
      lastAccessedAt: serverTimestamp(),
    });
    
    // Notificar al propietario (async)
    notifyProfileOwner(profile.userId, webId);
    
  } catch (error) {
    // No fallar si logging falla
    console.error('Error logging access:', error);
  }
};
```

---

## 🚨 ESTADOS DE ERROR (Sincronizados)

### Error: WebID No Encontrado
```tsx
{error === 'profile_not_found' && (
  <ErrorState className="max-w-2xl mx-auto text-center py-16 px-4">
    <span className="text-9xl mb-6 block">⚠️</span>
    <h2 className="text-3xl font-bold text-gray-900 mb-4">
      Perfil No Encontrado
    </h2>
    <p className="text-lg text-gray-700 mb-6">
      El código de esta pulsera no es válido o ha sido desactivado.
    </p>
    <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-6">
      <p className="text-gray-900 font-semibold mb-2">
        Si encontraste esta pulsera y la persona necesita ayuda urgente:
      </p>
    </div>
    <a
      href="tel:911"
      className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-xl font-bold text-2xl shadow-2xl transition-all"
    >
      <span className="text-3xl">🚨</span>
      LLAMAR 911
    </a>
    <p className="text-sm text-gray-600 mt-8">
      Código: {token} | Contacto: info@nfcores.com
    </p>
  </ErrorState>
)}
```

### Error: WebID Desactivado
```tsx
{error === 'profile_inactive' && (
  <ErrorState className="max-w-2xl mx-auto text-center py-16 px-4">
    <span className="text-9xl mb-6 block">⏸️</span>
    <h2 className="text-3xl font-bold text-gray-900 mb-4">
      Pulsera Desactivada
    </h2>
    <p className="text-lg text-gray-700 mb-6">
      Este perfil ha sido temporalmente desactivado por su propietario.
    </p>
    <a
      href="tel:911"
      className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl"
    >
      🚨 LLAMAR 911 SI ES EMERGENCIA
    </a>
  </ErrorState>
)}
```

### Error: Sin Conexión (PWA Offline)
```tsx
{!navigator.onLine && (
  <OfflineState className="max-w-2xl mx-auto">
    <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-4xl">📡</span>
        <h3 className="text-xl font-bold text-amber-900">
          Sin Conexión
        </h3>
      </div>
      <p className="text-amber-800">
        Mostrando última versión disponible del perfil.
      </p>
      <p className="text-sm text-amber-700 mt-2">
        Última actualización: {formatDate(cachedProfile.updatedAt)}
      </p>
    </div>
    <CachedProfile profile={cachedProfile} />
  </OfflineState>
)}
```

---

## 📱 RESPONSIVE DESIGN

### Mobile (< 768px)
```css
/* Stack vertical */
.emergency-profile {
  padding: 16px;
}

.hero-photo {
  width: 128px;
  height: 128px;
}

h1 {
  font-size: 24px;
}

.contact-button {
  width: 100%;
  font-size: 18px;
  padding: 16px;
}

.call-911-button {
  width: 100%;
  font-size: 22px;
  padding: 20px;
}
```

### Tablet (768px - 1024px)
```css
.emergency-profile {
  padding: 24px;
  max-width: 768px;
  margin: 0 auto;
}

.hero-photo {
  width: 160px;
  height: 160px;
}

h1 {
  font-size: 28px;
}
```

### Desktop (> 1024px)
```css
.emergency-profile {
  padding: 32px;
  max-width: 896px;
  margin: 0 auto;
}

.hero-photo {
  width: 192px;
  height: 192px;
}

h1 {
  font-size: 32px;
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
```

---

## ⚡ OPTIMIZACIÓN DE PERFORMANCE

### Lazy Loading de Imágenes
```tsx
<img
  src={profile.photoURL}
  alt={profile.fullName}
  loading="lazy"
  className="w-48 h-48 rounded-full"
  onError={(e) => {
    e.currentTarget.src = '/images/default-avatar.png';
  }}
/>
```

### Compresión de Imágenes
```typescript
// Al subir foto de perfil, comprimir a max 500KB
const compressImage = async (file: File): Promise<Blob> => {
  const maxSizeKB = 500;
  const options = {
    maxSizeMB: maxSizeKB / 1024,
    maxWidthOrHeight: 512,
    useWebWorker: true,
  };
  
  const compressedBlob = await imageCompression(file, options);
  return compressedBlob;
};
```

### Service Worker (PWA)
```javascript
// public/sw.js
self.addEventListener('fetch', (event) => {
  // Cache-first para perfiles de emergencia
  if (event.request.url.includes('/id/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          // Devolver del cache
          return response;
        }
        
        // Fetch y guardar en cache
        return fetch(event.request).then((response) => {
          return caches.open('emergency-profiles-v1').then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});
```

---

## ⚠️ IMPORTANTE PARA COPILOT

### Al Trabajar en Página de Emergencia:

1. **NUNCA romper el tiempo de carga < 2s**
   - Sin librerías pesadas
   - Lazy load solo para imágenes no críticas
   - Minimizar queries a Firestore

2. **Seguir diseño exacto de referencia**
   - Colores: `#DC2626` (rojo primario)
   - Fuente: Inter (system-ui fallback)
   - Espaciado consistente

3. **Respetar privacySettings SIEMPRE**
   ```typescript
   if (!profile.privacySettings.showMedications) {
     return null; // No mostrar medicamentos
   }
   ```

4. **Botones de llamada con tel: protocol**
   ```tsx
   <a href={`tel:${phone}`}>LLAMAR</a>
   ```

5. **Logging no bloquea renderizado**
   ```typescript
   // ✅ CORRECTO
   useEffect(() => {
     logEmergencyAccess(webId); // Async, no await
   }, []);
   
   // ❌ INCORRECTO
   await logEmergencyAccess(webId); // Bloquea renderizado
   ```

6. **Estados de error amigables**
   - Siempre mostrar botón 911
   - Mensajes claros en español
   - Iconos grandes y descriptivos

---

**Última sincronización**: 2025-01-21 21:16:15 UTC  
**Versión**: 2.0.0  
**Estado**: ✅ SINCRONIZADO CON 12 DOCUMENTOS  
**Referencias**: 
- `.github/copilot-instructions.md` (reglas críticas)
- `.github/database-schema.md` (estructura EmergencyProfile)
- `.github/tech-stack.md` (colores sincronizados con branding)
- `.github/routes-architecture.md` (ruta `/id/:token`)