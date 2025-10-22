# Arquitectura de Rutas - NFCores

**Última actualización**: 2025-01-21 20:54:37 UTC  
**Actualizado por**: @cknight775  
**Versión**: 2.0.0 - SINCRONIZADA

---

## 🗺️ Mapa Completo de Rutas (Sincronizado)

```
/                           [Público]
├── /login                  [Público]
├── /register               [Público]
├── /reset-password         [Público]
├── /verify-email           [Público]
│
├── /id/:token              [Público - CRÍTICO] 🆘
│
├── /precios                [Público]
├── /como-funciona          [Público]
├── /testimonios            [Público]
├── /contacto               [Público]
├── /terminos               [Público]
├── /privacidad             [Público]
├── /faq                    [Público]
│
├── /checkout               [Requiere Auth]
├── /compra-exitosa         [Requiere Auth]
│
├── /dashboard              [Requiere Auth]
│   ├── /perfil             [Requiere Auth]
│   ├── /configuracion      [Requiere Auth]
│   ├── /analytics          [Requiere Auth]
│   ├── /documentos         [Requiere Auth]
│   ├── /contactos          [Requiere Auth]
│   │
│   ├── /familiar                       [Requiere Pack Familiar]
│   │   ├── /miembros       
│   │   ├── /agregar-miembro
│   │   └── /configuracion  
│   │
│   └── /empresarial                    [Requiere Pack Empresarial]
│       ├── /empleados      
│       ├── /agregar-empleado
│       ├── /importar       
│       └── /reportes       
│
└── /admin                              [Requiere rol Admin]
    ├── /dashboard          
    │
    ├── /content                        [Content Management]
    │   ├── /home
    │   ├── /pricing
    │   ├── /banners
    │   ├── /pages
    │   ├── /footer
    │   └── /faqs
    │
    ├── /config                         [System Config]
    │   ├── /branding
    │   ├── /emails
    │   ├── /notifications
    │   └── /features
    │
    ├── /usuarios                       [Users Management]
    ├── /paneles                        [Panels Management]
    │   ├── /familiares
    │   └── /empresariales
    │
    ├── /packs                          [Packs Config]
    ├── /webids                         [WebIDs Management]
    ├── /inventario                     [Inventory]
    │
    ├── /ordenes                        [Orders]
    ├── /cupones                        [Coupons]
    ├── /pagos                          [Payments]
    │
    ├── /soporte                        [Support Tickets]
    ├── /contactos                      [Contact Messages]
    │
    ├── /analytics                      [Analytics]
    ├── /ventas                         [Sales Reports]
    ├── /usuarios/stats                 [User Stats]
    └── /logs                           [Audit Logs]
```

---

## 🌍 RUTAS PÚBLICAS (Sin Autenticación)

### 1. Landing Page - `/`
```typescript
// src/pages/HomePage.tsx
<Route path="/" element={<HomePage />} />
```

**Componentes:**
- Hero section con CTAs
- Sección "Cómo Funciona"
- Testimonios (desde Firestore: `testimonials/`)
- Pricing preview
- Partners (desde Firestore: `partners/`)
- FAQ (desde Firestore: `faqs/`)
- Footer (desde Firestore: `systemConfig/footer`)

**Meta Tags (desde Firestore: `systemConfig/seo`):**
```html
<title>NFCores - Información Vital en Emergencias</title>
<meta name="description" content="..." />
```

---

### 2. 🆘 Perfil Público de Emergencia - `/id/:token`

**⚠️ RUTA MÁS CRÍTICA DEL SISTEMA**

```typescript
// src/pages/PerfilPublico.tsx
<Route path="/id/:token" element={<PerfilPublico />} />
```

**Parámetro:**
- `token`: WebID de 9 caracteres (ej: "ABC123XYZ")
- Formato: `/^[A-Z0-9]{9}$/`

**Características CRÍTICAS:**
- ✅ Acceso público sin login
- ✅ Tiempo de carga < 2 segundos
- ✅ Funciona offline (PWA con Service Worker)
- ✅ Responsive móvil-first
- ✅ Compatible Android 8+ e iOS 12+
- ✅ Uptime 99.9%

**Flujo de Carga:**
```typescript
useEffect(() => {
  const { token } = useParams<{ token: string }>();
  
  // 1. Validar formato
  if (!token || !/^[A-Z0-9]{9}$/.test(token)) {
    setError('token_invalid');
    return;
  }
  
  // 2. Buscar en Firestore
  const profileQuery = query(
    collection(db, 'emergencyProfiles'),
    where('webId', '==', token),
    where('isActive', '==', true),
    limit(1)
  );
  
  const snapshot = await getDocs(profileQuery);
  
  if (snapshot.empty) {
    setError('profile_not_found');
    return;
  }
  
  const profileDoc = snapshot.docs[0];
  const profile = profileDoc.data() as EmergencyProfile;
  
  // 3. Aplicar privacySettings
  const visibleData = applyPrivacySettings(profile);
  
  // 4. Registrar acceso (async, no bloquea)
  logEmergencyAccess(token, {
    timestamp: new Date(),
    geolocation: profile.privacySettings.enableGeolocation 
      ? await getGeolocation() 
      : null,
  });
  
  // 5. Notificar propietario (async)
  notifyProfileOwner(profile.userId, token);
  
  // 6. Renderizar
  setProfile(visibleData);
  setLoading(false);
}, [token]);
```

**Estados de Error:**
```tsx
// WebID no encontrado
{error === 'profile_not_found' && (
  <ErrorState
    icon="⚠️"
    title="Perfil No Encontrado"
    message="El código de esta pulsera no es válido o ha sido desactivado."
    action={<a href="tel:911" className="btn-emergency">🚨 LLAMAR 911</a>}
  />
)}

// WebID inactivo
{error === 'profile_inactive' && (
  <ErrorState
    icon="⏸️"
    title="Pulsera Desactivada"
    message="Este perfil ha sido temporalmente desactivado por su propietario."
  />
)}

// Formato inválido
{error === 'token_invalid' && (
  <ErrorState
    icon="❌"
    title="Código Inválido"
    message="El código proporcionado no tiene el formato correcto."
  />
)}
```

**Diseño (Referencia: https://nfcores.com/profile/9SMAM8):**
Ver `.github/emergency-profile-design.md` para diseño exacto.

---

### 3. Login - `/login`
```typescript
<Route path="/login" element={<LoginPage />} />
```

**Query Params:**
- `redirect`: URL a redirigir después del login
- Ejemplo: `/login?redirect=/dashboard/familiar`

**Redirect Logic:**
```typescript
const navigate = useNavigate();
const [searchParams] = useSearchParams();

// Si ya está autenticado
if (user) {
  const redirect = searchParams.get('redirect') || '/dashboard';
  navigate(redirect, { replace: true });
}

// Después de login exitoso
const handleLogin = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
  const redirect = searchParams.get('redirect') || '/dashboard';
  navigate(redirect);
};
```

---

### 4. Registro - `/register`
```typescript
<Route path="/register" element={<RegisterPage />} />
```

**Estado en Location:**
```typescript
interface RegisterState {
  from?: string;
  packType?: PackType;
}

// Ejemplo: Usuario seleccionó pack en /precios
// navigate('/register', { state: { from: '/precios', packType: 'familiar' } });
```

**Flujo:**
1. Usuario completa formulario
2. Firebase crea cuenta
3. Envía email de verificación
4. Redirect a `/verify-email`

---

### 5. Recuperar Contraseña - `/reset-password`
```typescript
<Route path="/reset-password" element={<ResetPasswordPage />} />
```

---

### 6. Verificar Email - `/verify-email`
```typescript
<Route path="/verify-email" element={<VerifyEmailPage />} />
```

**Query Params (Firebase Auth):**
```
/verify-email?mode=verifyEmail&oobCode=ABC123...
```

---

### 7. Precios - `/precios`
```typescript
<Route path="/precios" element={<PricingPage />} />
```

**Datos desde Firestore: `systemConfig/pricing`**

```typescript
const [pricing, setPricing] = useState<PricingConfig | null>(null);

useEffect(() => {
  const fetchPricing = async () => {
    const docRef = doc(db, 'systemConfig', 'pricing');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setPricing(docSnap.data() as PricingConfig);
    }
  };
  
  fetchPricing();
}, []);
```

**Cards de Packs (Precios Administrables):**
- Pack Individual: `pricing.individual.price` CLP
- Pack Familiar: `pricing.familiar.price` CLP
- Pack Empresarial: `pricing.empresarial.priceFrom` CLP

---

### 8. Cómo Funciona - `/como-funciona`
```typescript
<Route path="/como-funciona" element={<HowItWorksPage />} />
```

**Contenido desde Firestore: `systemConfig/content/how_it_works`** (Opcional, puede ser estático)

---

### 9. Testimonios - `/testimonios`
```typescript
<Route path="/testimonios" element={<TestimonialsPage />} />
```

**Datos desde Firestore: `testimonials/`**

```typescript
const testimonialsQuery = query(
  collection(db, 'testimonials'),
  where('isPublic', '==', true),
  orderBy('createdAt', 'desc')
);

const snapshot = await getDocs(testimonialsQuery);
const testimonials = snapshot.docs.map(doc => doc.data() as Testimonial);
```

---

### 10. Contacto - `/contacto`
```typescript
<Route path="/contacto" element={<ContactPage />} />
```

**Datos de contacto desde Firestore: `systemConfig/contact`**

```typescript
const contactInfo = await getDoc(doc(db, 'systemConfig', 'contact'));
const { companyInfo, socialMedia } = contactInfo.data();
```

---

### 11. FAQ - `/faq`
```typescript
<Route path="/faq" element={<FAQPage />} />
```

**Datos desde Firestore: `faqs/`**

```typescript
const faqsQuery = query(
  collection(db, 'faqs'),
  where('isPublic', '==', true),
  orderBy('order', 'asc')
);

const snapshot = await getDocs(faqsQuery);
const faqs = snapshot.docs.map(doc => doc.data() as FAQ);
```

---

### 12. Términos y Condiciones - `/terminos`
```typescript
<Route path="/terminos" element={<TermsPage />} />
```

**Contenido desde Firestore: `systemConfig/legal/terms`**

---

### 13. Política de Privacidad - `/privacidad`
```typescript
<Route path="/privacidad" element={<PrivacyPage />} />
```

**Contenido desde Firestore: `systemConfig/legal/privacy`**

---

## 🔐 RUTAS PRIVADAS (Requieren Autenticación)

### Guard de Autenticación
```typescript
// src/components/guards/AuthGuard.tsx
export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Verificar email
  if (!user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  
  return <>{children}</>;
};

// Uso en rutas
<Route element={<AuthGuard><Outlet /></AuthGuard>}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

---

### 14. Checkout - `/checkout`
```typescript
<Route 
  path="/checkout" 
  element={
    <AuthGuard>
      <CheckoutPage />
    </AuthGuard>
  } 
/>
```

**Datos en SessionStorage:**
```typescript
interface CheckoutSession {
  selectedPack: PackType;
  quantity: number;
  couponCode?: string;
  shippingAddress?: Address;
}

// Guardar al seleccionar pack
sessionStorage.setItem('checkout', JSON.stringify(checkoutData));

// Leer en checkout
const checkoutData = JSON.parse(sessionStorage.getItem('checkout') || '{}');
```

---

### 15. Compra Exitosa - `/compra-exitosa`
```typescript
<Route 
  path="/compra-exitosa" 
  element={
    <AuthGuard>
      <PurchaseSuccessPage />
    </AuthGuard>
  } 
/>
```

**Query Params:**
```
/compra-exitosa?orderId=ORD-202501-12345&payment_id=1234567890&status=approved
```

---

## 📊 RUTAS DE DASHBOARD (Usuario Autenticado)

### Layout Compartido
```typescript
// src/pages/dashboard/DashboardLayout.tsx
<Route element={<AuthGuard><Outlet /></AuthGuard>}>
  <Route element={<DashboardLayout />}>
    <Route path="/dashboard" element={<DashboardHome />} />
    <Route path="/dashboard/perfil" element={<ProfilePage />} />
    {/* ... más rutas */}
  </Route>
</Route>
```

**DashboardLayout incluye:**
- Navbar con user menu
- Sidebar con navegación (Desktop)
- BottomNav (Mobile)
- Main content area

---

### 16. Dashboard Principal - `/dashboard`
```typescript
<Route path="/dashboard" element={<DashboardHome />} />
```

**Vista según tipo de perfil:**
```typescript
const DashboardHome = () => {
  const { user } = useAuth();
  
  if (user.profileType === 'individual') {
    return <IndividualDashboard />;
  }
  
  if (user.profileType === 'familiar_admin') {
    return <Redirect to="/dashboard/familiar" />;
  }
  
  if (user.profileType === 'familiar_member') {
    return <FamilyMemberDashboard />;
  }
  
  if (user.profileType === 'empresarial_admin') {
    return <Redirect to="/dashboard/empresarial" />;
  }
  
  if (user.profileType === 'empresarial_employee') {
    return <EmployeeDashboard />;
  }
  
  return <IndividualDashboard />;
};
```

---

### 17. Mi Perfil - `/dashboard/perfil`
```typescript
<Route path="/dashboard/perfil" element={<ProfilePage />} />
```

**Tabs:**
- Información Personal
- Información Médica
- Contactos de Emergencia (máx según límites)
- Documentos (máx según límites)
- Configuración de Privacidad

**Límites según pack (desde `systemConfig/limits`):**
```typescript
const limits = await getDoc(doc(db, 'systemConfig', 'limits'));
const userLimits = limits.data()[user.pack.type];

// individual: 10 docs, 5 contactos
// familiar: 50 docs, 25 contactos
// empresarial: unlimited
```

---

### 18. Configuración - `/dashboard/configuracion`
```typescript
<Route path="/dashboard/configuracion" element={<SettingsPage />} />
```

---

### 19. Analytics - `/dashboard/analytics`
```typescript
<Route path="/dashboard/analytics" element={<AnalyticsPage />} />
```

**Datos desde Firestore: `accessLogs/`**

```typescript
const logsQuery = query(
  collection(db, 'accessLogs'),
  where('userId', '==', user.uid),
  orderBy('timestamp', 'desc'),
  limit(50)
);

const snapshot = await getDocs(logsQuery);
const logs = snapshot.docs.map(doc => doc.data() as AccessLog);
```

---

### 20. Documentos - `/dashboard/documentos`
```typescript
<Route path="/dashboard/documentos" element={<DocumentsPage />} />
```

**Funcionalidades:**
- Subir nuevos documentos (validar límites)
- Ver/descargar documentos
- Marcar como público/privado
- Eliminar documentos

---

### 21. Contactos de Emergencia - `/dashboard/contactos`
```typescript
<Route path="/dashboard/contactos" element={<ContactsPage />} />
```

**Validar límite según pack:**
```typescript
const maxContacts = OFFICIAL_LIMITS[user.pack.type].maxContacts;

if (currentContacts.length >= maxContacts) {
  toast.error(`Límite de contactos alcanzado (${maxContacts} máximo)`);
  return;
}
```

---

## 👨‍👩‍👧 RUTAS DE PANEL FAMILIAR

### Guard de Pack Familiar
```typescript
// src/components/guards/PackGuard.tsx
export const FamilyPackGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user?.panelId || !['familiar_admin', 'familiar_member'].includes(user.profileType)) {
    return (
      <Navigate 
        to="/precios" 
        state={{ message: 'Necesitas un Pack Familiar para acceder a esta sección' }} 
        replace 
      />
    );
  }
  
  return <>{children}</>;
};
```

---

### 22. Dashboard Familiar - `/dashboard/familiar`
```typescript
<Route 
  path="/dashboard/familiar" 
  element={
    <FamilyPackGuard>
      <FamilyDashboard />
    </FamilyPackGuard>
  } 
/>
```

**Datos desde Firestore: `familyPanels/{panelId}`**

```typescript
const panelRef = doc(db, 'familyPanels', user.panelId!);
const panelSnap = await getDoc(panelRef);
const panel = panelSnap.data() as FamilyPanel;

// Mostrar:
// - Panel ID: FAM-00042
// - Miembros: 3/5
// - WebIDs disponibles: 2
// - Lista de miembros
```

---

### 23. Gestión de Miembros - `/dashboard/familiar/miembros`
```typescript
<Route 
  path="/dashboard/familiar/miembros" 
  element={
    <FamilyPackGuard>
      <FamilyMembersPage />
    </FamilyPackGuard>
  } 
/>
```

**Solo accesible para `familiar_admin`:**
```typescript
const { user } = useAuth();

if (user.profileType !== 'familiar_admin') {
  return <Navigate to="/dashboard/familiar" />;
}
```

---

### 24. Agregar Miembro - `/dashboard/familiar/agregar-miembro`
```typescript
<Route 
  path="/dashboard/familiar/agregar-miembro" 
  element={
    <FamilyPackGuard>
      <AddFamilyMemberPage />
    </FamilyPackGuard>
  } 
/>
```

**Wizard de 5 pasos:**
1. Información personal
2. Información médica
3. Contactos de emergencia
4. Documentos (opcional)
5. Confirmación y activación

**Validar límite:**
```typescript
const panel = await getDoc(doc(db, 'familyPanels', user.panelId));
const panelData = panel.data() as FamilyPanel;

if (panelData.memberCount >= 5) {
  toast.error('Límite de miembros alcanzado (5 máximo)');
  navigate('/dashboard/familiar');
  return;
}
```

---

### 25. Configuración Familiar - `/dashboard/familiar/configuracion`
```typescript
<Route 
  path="/dashboard/familiar/configuracion" 
  element={
    <FamilyPackGuard>
      <FamilyConfigPage />
    </FamilyPackGuard>
  } 
/>
```

**Configuraciones:**
- Permitir a miembros editar su propio perfil
- Notificar a todos los admins en accesos
- Delegar permisos de admin

---

## 🏢 RUTAS DE PANEL EMPRESARIAL

### Guard de Pack Empresarial
```typescript
export const EnterprisePackGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user?.panelId || !['empresarial_admin', 'empresarial_employee'].includes(user.profileType)) {
    return <Navigate to="/precios" replace />;
  }
  
  return <>{children}</>;
};
```

---

### 26. Dashboard Empresarial - `/dashboard/empresarial`
```typescript
<Route 
  path="/dashboard/empresarial" 
  element={
    <EnterprisePackGuard>
      <EnterpriseDashboard />
    </EnterprisePackGuard>
  } 
/>
```

**Datos desde Firestore: `enterprisePanels/{panelId}`**

```typescript
const panelRef = doc(db, 'enterprisePanels', user.panelId!);
const panelSnap = await getDoc(panelRef);
const panel = panelSnap.data() as EnterprisePanel;

// Mostrar:
// - Panel ID: EMP-00008
// - Empresa: Constructora ABC S.A.
// - Empleados: 38/50
// - Métricas: activos, pendientes
```

---

### 27. Gestión de Empleados - `/dashboard/empresarial/empleados`
```typescript
<Route 
  path="/dashboard/empresarial/empleados" 
  element={
    <EnterprisePackGuard>
      <EmployeesPage />
    </EnterprisePackGuard>
  } 
/>
```

**Solo para admins del panel:**
```typescript
const panel = await getDoc(doc(db, 'enterprisePanels', user.panelId));
const panelData = panel.data() as EnterprisePanel;

if (!panelData.adminIds.includes(user.uid)) {
  return <Navigate to="/dashboard/empresarial" />;
}
```

---

### 28. Agregar Empleado - `/dashboard/empresarial/agregar-empleado`
```typescript
<Route 
  path="/dashboard/empresarial/agregar-empleado" 
  element={
    <EnterprisePackGuard>
      <AddEmployeePage />
    </EnterprisePackGuard>
  } 
/>
```

---

### 29. Importación Masiva - `/dashboard/empresarial/importar`
```typescript
<Route 
  path="/dashboard/empresarial/importar" 
  element={
    <EnterprisePackGuard>
      <BulkImportPage />
    </EnterprisePackGuard>
  } 
/>
```

**Formato CSV requerido:**
```csv
nombre,apellido,rut,area,email,telefono
Pedro,Soto,12345678-9,Obras,p@mail.com,+56912345678
Ana,Martínez,23456789-0,Admin,a@mail.com,+56987654321
```

---

### 30. Reportes Empresariales - `/dashboard/empresarial/reportes`
```typescript
<Route 
  path="/dashboard/empresarial/reportes" 
  element={
    <EnterprisePackGuard>
      <ReportsPage />
    </EnterprisePackGuard>
  } 
/>
```

---

## 👑 RUTAS DE ADMINISTRACIÓN (Completas y Sincronizadas)

### Guard de Admin
```typescript
export const AdminGuard: React.FC<{ 
  children: React.ReactNode;
  requiredPermission?: keyof AdminPermissions;
}> = ({ children, requiredPermission }) => {
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  
  // Verificar rol admin
  if (!user || !['admin', 'super_admin', 'moderator', 'content_editor'].includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Verificar permiso específico
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/admin/dashboard" state={{ 
      error: 'No tienes permisos para acceder a esta sección' 
    }} replace />;
  }
  
  return <>{children}</>;
};
```

---

### 31. Panel de Administración - `/admin/dashboard`
```typescript
<Route 
  path="/admin/dashboard" 
  element={
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  } 
/>
```

**Métricas desde Firestore:**
```typescript
// Total usuarios
const usersCount = await getCountFromServer(collection(db, 'users'));

// WebIDs activos
const activeWebIdsQuery = query(
  collection(db, 'webIds'),
  where('status', '==', 'active')
);
const activeWebIds = await getCountFromServer(activeWebIdsQuery);

// Ventas del mes
const startOfMonth = new Date();
startOfMonth.setDate(1);
startOfMonth.setHours(0, 0, 0, 0);

const ordersQuery = query(
  collection(db, 'orders'),
  where('paymentStatus', '==', 'approved'),
  where('createdAt', '>=', Timestamp.fromDate(startOfMonth))
);

const ordersSnapshot = await getDocs(ordersQuery);
const monthlyRevenue = ordersSnapshot.docs.reduce(
  (sum, doc) => sum + doc.data().total, 
  0
);
```

---

### CONTENIDO PÚBLICO (Content Management)

### 32. Editar Home - `/admin/content/home`
```typescript
<Route 
  path="/admin/content/home" 
  element={
    <AdminGuard requiredPermission="content_management">
      <EditHomePage />
    </AdminGuard>
  } 
/>
```

**Edita: `systemConfig/banners`, `testimonials/`, `partners/`**

---

### 33. Editar Precios - `/admin/content/pricing`
```typescript
<Route 
  path="/admin/content/pricing" 
  element={
    <AdminGuard requiredPermission="pricing_management">
      <EditPricingPage />
    </AdminGuard>
  } 
/>
```

**Edita: `systemConfig/pricing`**

```typescript
const updatePricing = async (newPricing: PricingConfig) => {
  const pricingRef = doc(db, 'systemConfig', 'pricing');
  
  await updateDoc(pricingRef, {
    ...newPricing,
    updatedAt: serverTimestamp(),
    updatedBy: user.uid,
  });
  
  // Auditar cambio
  await logAuditAction({
    action: 'update_pricing',
    performedBy: user.uid,
    targetId: 'systemConfig/pricing',
  });
};
```

---

### 34. Gestionar Banners - `/admin/content/banners`
```typescript
<Route 
  path="/admin/content/banners" 
  element={
    <AdminGuard requiredPermission="content_management">
      <ManageBannersPage />
    </AdminGuard>
  } 
/>
```

**Edita: `systemConfig/banners`**

---

### 35. Páginas Estáticas - `/admin/content/pages`
```typescript
<Route 
  path="/admin/content/pages" 
  element={
    <AdminGuard requiredPermission="content_management">
      <ManagePagesPage />
    </AdminGuard>
  } 
/>
```

**Edita: `systemConfig/legal/terms`, `systemConfig/legal/privacy`**

---

### 36. Editar Footer - `/admin/content/footer`
```typescript
<Route 
  path="/admin/content/footer" 
  element={
    <AdminGuard requiredPermission="content_management">
      <EditFooterPage />
    </AdminGuard>
  } 
/>
```

**Edita: `systemConfig/footer`**

---

### 37. Gestionar FAQs - `/admin/content/faqs`
```typescript
<Route 
  path="/admin/content/faqs" 
  element={
    <AdminGuard requiredPermission="faq_management">
      <ManageFAQsPage />
    </AdminGuard>
  } 
/>
```

**Edita: `faqs/`**

---

### CONFIGURACIÓN DEL SISTEMA (System Config)

### 38. Branding - `/admin/config/branding`
```typescript
<Route 
  path="/admin/config/branding" 
  element={
    <AdminGuard requiredPermission="branding_management">
      <BrandingConfigPage />
    </AdminGuard>
  } 
/>
```

**Edita: `systemConfig/branding`** (Solo Super Admin)

---

### 39. Plantillas de Email - `/admin/config/emails`
```typescript
<Route 
  path="/admin/config/emails" 
  element={
    <AdminGuard requiredPermission="email_templates">
      <EmailTemplatesPage />
    </AdminGuard>
  } 
/>
```

**Edita: `emailTemplates/`**

---

### 40. Notificaciones Globales - `/admin/config/notifications`
```typescript
<Route 
  path="/admin/config/notifications" 
  element={
    <AdminGuard requiredPermission="content_management">
      <GlobalNotificationsPage />
    </AdminGuard>
  } 
/>
```

**Edita: `systemConfig/globalNotifications`**

---

### 41. Feature Flags - `/admin/config/features`
```typescript
<Route 
  path="/admin/config/features" 
  element={
    <AdminGuard requiredPermission="feature_flags">
      <FeatureFlagsPage />
    </AdminGuard>
  } 
/>
```

**Edita: `systemConfig/features`** (Solo Super Admin)

```typescript
const toggleFeature = async (featureName: string, enabled: boolean) => {
  const featuresRef = doc(db, 'systemConfig', 'features');
  
  await updateDoc(featuresRef, {
    [featureName]: enabled,
    updatedAt: serverTimestamp(),
    updatedBy: user.uid,
  });
  
  // Auditar
  await logAuditAction({
    action: 'config_change',
    performedBy: user.uid,
    targetId: `systemConfig/features/${featureName}`,
    changes: { before: !enabled, after: enabled },
  });
};
```

---

### USUARIOS Y PANELES

### 42. Gestión de Usuarios - `/admin/usuarios`
```typescript
<Route 
  path="/admin/usuarios" 
  element={
    <AdminGuard requiredPermission="user_management">
      <UsersManagementPage />
    </AdminGuard>
  } 
/>
```

**Query desde: `users/`**

---

### 43. Paneles Familiares - `/admin/paneles/familiares`
```typescript
<Route 
  path="/admin/paneles/familiares" 
  element={
    <AdminGuard requiredPermission="panel_management">
      <FamilyPanelsPage />
    </AdminGuard>
  } 
/>
```

**Query desde: `familyPanels/`**

---

### 44. Paneles Empresariales - `/admin/paneles/empresariales`
```typescript
<Route 
  path="/admin/paneles/empresariales" 
  element={
    <AdminGuard requiredPermission="panel_management">
      <EnterprisePanelsPage />
    </AdminGuard>
  } 
/>
```

**Query desde: `enterprisePanels/`**

---

### PACKS Y WEBIDS

### 45. Gestión de Packs - `/admin/packs`
```typescript
<Route 
  path="/admin/packs" 
  element={
    <AdminGuard requiredPermission="pack_configuration">
      <ManagePacksPage />
    </AdminGuard>
  } 
/>
```

**Edita: `systemConfig/pricing`, `systemConfig/limits`**

---

### 46. Gestión de WebIDs - `/admin/webids`
```typescript
<Route 
  path="/admin/webids" 
  element={
    <AdminGuard requiredPermission="webid_generation">
      <WebIDsManagementPage />
    </AdminGuard>
  } 
/>
```

**Query desde: `webIds/`**

**Acciones:**
- Generar nuevos WebIDs
- Asignar/reasignar WebIDs
- Desactivar WebIDs
- Ver analytics por WebID

---

### 47. Inventario de Pulseras - `/admin/inventario`
```typescript
<Route 
  path="/admin/inventario" 
  element={
    <AdminGuard requiredPermission="inventory_management">
      <InventoryPage />
    </AdminGuard>
  } 
/>
```

**Edita: `systemConfig/inventory`**

---

### VENTAS

### 48. Órdenes - `/admin/ordenes`
```typescript
<Route 
  path="/admin/ordenes" 
  element={
    <AdminGuard requiredPermission="order_management">
      <OrdersManagementPage />
    </AdminGuard>
  } 
/>
```

**Query desde: `orders/`**

---

### 49. Cupones - `/admin/cupones`
```typescript
<Route 
  path="/admin/cupones" 
  element={
    <AdminGuard requiredPermission="pricing_management">
      <CouponsPage />
    </AdminGuard>
  } 
/>
```

**Query desde: `coupons/`**

---

### 50. Pagos - `/admin/pagos`
```typescript
<Route 
  path="/admin/pagos" 
  element={
    <AdminGuard requiredPermission="view_analytics">
      <PaymentsPage />
    </AdminGuard>
  } 
/>
```

**Query desde: `orders/` filtrado por `paymentStatus`**

---

### SOPORTE

### 51. Tickets de Soporte - `/admin/soporte`
```typescript
<Route 
  path="/admin/soporte" 
  element={
    <AdminGuard requiredPermission="support_tickets">
      <SupportTicketsPage />
    </AdminGuard>
  } 
/>
```

**Query desde: `supportTickets/`**

---

### 52. Mensajes de Contacto - `/admin/contactos`
```typescript
<Route 
  path="/admin/contactos" 
  element={
    <AdminGuard requiredPermission="support_tickets">
      <ContactMessagesPage />
    </AdminGuard>
  } 
/>
```

---

### REPORTES

### 53. Analytics General - `/admin/analytics`
```typescript
<Route 
  path="/admin/analytics" 
  element={
    <AdminGuard requiredPermission="view_analytics">
      <AnalyticsPage />
    </AdminGuard>
  } 
/>
```

---

### 54. Reportes de Ventas - `/admin/ventas`
```typescript
<Route 
  path="/admin/ventas" 
  element={
    <AdminGuard requiredPermission="view_analytics">
      <SalesReportsPage />
    </AdminGuard>
  } 
/>
```

---

### 55. Estadísticas de Usuarios - `/admin/usuarios/stats`
```typescript
<Route 
  path="/admin/usuarios/stats" 
  element={
    <AdminGuard requiredPermission="view_analytics">
      <UserStatsPage />
    </AdminGuard>
  } 
/>
```

---

### 56. Logs de Auditoría - `/admin/logs`
```typescript
<Route 
  path="/admin/logs" 
  element={
    <AdminGuard requiredPermission="view_audit_logs">
      <AuditLogsPage />
    </AdminGuard>
  } 
/>
```

**Query desde: `auditLogs/`** (Solo Super Admin)

---

## 🚫 RUTAS DE ERROR

### 404 - Página No Encontrada
```typescript
<Route path="*" element={<NotFoundPage />} />
```

### 401 - No Autorizado
```typescript
<Route path="/unauthorized" element={<UnauthorizedPage />} />
```

**Mostrado cuando:**
- Usuario sin permisos intenta acceder a ruta admin
- Usuario sin pack intenta acceder a ruta familiar/empresarial

---

## 🔀 REDIRECTS Y NAVEGACIÓN

### Redirects Automáticos
```typescript
// Usuario logueado intenta acceder a /login
if (user && location.pathname === '/login') {
  navigate('/dashboard');
}

// Usuario no logueado intenta acceder a ruta privada
if (!user && isPrivateRoute(location.pathname)) {
  navigate('/login', { state: { from: location.pathname } });
}

// Usuario con pack familiar accede a /dashboard
if (user?.profileType === 'familiar_admin' && location.pathname === '/dashboard') {
  navigate('/dashboard/familiar');
}
```

---

## 📱 NAVEGACIÓN MÓVIL (Bottom Nav)

### Rutas con Bottom Navigation (Mobile < 768px)
```typescript
const bottomNavRoutes = {
  user: [
    { path: '/dashboard', icon: 'Home', label: 'Inicio' },
    { path: '/dashboard/perfil', icon: 'User', label: 'Perfil' },
    { path: '/dashboard/analytics', icon: 'BarChart', label: 'Actividad' },
    { path: '/dashboard/configuracion', icon: 'Settings', label: 'Config' },
  ],
  
  familiar_admin: [
    { path: '/dashboard/familiar', icon: 'Users', label: 'Familia' },
    { path: '/dashboard/perfil', icon: 'User', label: 'Perfil' },
    { path: '/dashboard/analytics', icon: 'BarChart', label: 'Actividad' },
  ],
  
  empresarial_admin: [
    { path: '/dashboard/empresarial', icon: 'Building', label: 'Empresa' },
    { path: '/dashboard/empresarial/empleados', icon: 'Users', label: 'Empleados' },
    { path: '/dashboard/perfil', icon: 'User', label: 'Perfil' },
  ],
};
```

---

## 🔍 SEO Y META TAGS

```typescript
// src/utils/seo.ts (desde Firestore: systemConfig/seo)
export const getMetaTags = async (route: string) => {
  const seoDoc = await getDoc(doc(db, 'systemConfig', 'seo'));
  const seoConfig = seoDoc.data() as SEOConfig;
  
  // Meta tags por ruta
  const pageMeta = seoConfig.pages[route] || {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    keywords: seoConfig.defaultKeywords,
  };
  
  return pageMeta;
};

// Uso en componentes
const PricingPage = () => {
  const metaTags = useMetaTags('/precios');
  
  return (
    <>
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords.join(', ')} />
      </Helmet>
      {/* Contenido */}
    </>
  );
};
```

---

## ⚠️ IMPORTANTE PARA COPILOT

### Al Crear Nueva Ruta:

1. **Definir tipo de ruta:**
   - ¿Pública o privada?
   - ¿Requiere pack específico?
   - ¿Requiere rol admin específico?
   - ¿Requiere permiso específico?

2. **Aplicar guards correctos:**
   ```typescript
   <Route element={<AuthGuard><Outlet /></AuthGuard>}>
     <Route element={<PackGuard packType="familiar"><Outlet /></PackGuard>}>
       <Route path="/dashboard/familiar" element={<Page />} />
     </Route>
   </Route>
   ```

3. **Agregar a este documento:**
   - Número de ruta
   - Path completo
   - Descripción
   - Guards aplicados
   - Parámetros y query strings
   - Fuente de datos (Firestore collection)

4. **Meta tags (si es pública):**
   - Agregar a `systemConfig/seo`

5. **Testing:**
   - Test de renderizado
   - Test de guards
   - Test de redirects

6. **Sincronizar con otros documentos:**
   - Verificar que la colección de Firestore existe en `database-schema.md`
   - Verificar que los permisos existen en `user-roles.md`

---

**Última sincronización**: 2025-01-21 20:54:37 UTC  
**Versión**: 2.0.0  
**Estado**: ✅ SINCRONIZADO CON 12 DOCUMENTOS  
**Total de rutas**: 56 rutas documentadas  
**Referencias**: 
- `.github/copilot-instructions.md` (definiciones oficiales)
- `.github/user-roles.md` (permisos por rol)
- `.github/database-schema.md` (fuentes de datos)
- `.github/admin-manageable-elements.md` (contenido administrable)