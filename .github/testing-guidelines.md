# Guías de Testing - NFCores

**Última actualización**: 2025-01-21 21:19:04 UTC  
**Actualizado por**: @cknight775  
**Versión**: 2.0.0 - SINCRONIZADA

---

## 🎯 Filosofía de Testing

```
Pirámide de Testing NFCores:

                    /\
                   /  \
                  / E2E\         10% - Tests End-to-End
                 /______\
                /        \
               /Integration\     30% - Tests de Integración
              /__________  \
             /              \
            /   Unit Tests   \   60% - Tests Unitarios
           /__________________\
```

**Prioridades (sincronizadas con criticidad):**
1. **🔴 CRÍTICO**: Funcionalidades de emergencia (página pública `/id/:token`)
2. **🟠 ALTO**: Flujos de pago y generación de WebIDs
3. **🟡 MEDIO**: Dashboard de usuario, paneles familiares/empresariales
4. **🟢 BAJO**: Contenido estático, páginas informativas

---

## 🧪 1. TESTS UNITARIOS

### Setup (Sincronizado con tech-stack.md)

```json
{
  "vitest": "^1.1.0",
  "@testing-library/react": "^14.1.2",
  "@testing-library/jest-dom": "^6.1.5",
  "@testing-library/user-event": "^14.5.1"
}
```

### Configuración Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Setup de Testing

```typescript
// src/tests/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup después de cada test
afterEach(() => {
  cleanup();
});

// Mock de Firebase (sincronizado con firebase.ts)
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
  getApp: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  serverTimestamp: vi.fn(() => new Date()),
  increment: vi.fn((n) => n),
  FieldValue: {
    serverTimestamp: vi.fn(() => new Date()),
    increment: vi.fn((n) => n),
    arrayUnion: vi.fn((val) => val),
    arrayRemove: vi.fn((val) => val),
  },
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(),
  ref: vi.fn(),
  uploadBytesResumable: vi.fn(),
  getDownloadURL: vi.fn(),
  deleteObject: vi.fn(),
}));

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock de navigator.geolocation
Object.defineProperty(global.navigator, 'geolocation', {
  writable: true,
  value: {
    getCurrentPosition: vi.fn(),
    watchPosition: vi.fn(),
  },
});
```

---

### 1.1. Componentes UI

```typescript
// src/components/ui/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when loading', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
  
  it('renders with correct variant class', () => {
    const { container } = render(<Button variant="primary">Click me</Button>);
    expect(container.firstChild).toHaveClass('btn-primary');
  });
  
  it('shows loading spinner when loading prop is true', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });
});
```

---

### 1.2. Servicios Firestore (Sincronizados con database-schema.md)

```typescript
// src/services/firestore/__tests__/users.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUser, createUser, updateUser } from '../users';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

vi.mock('firebase/firestore');

describe('Users Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('getUser', () => {
    it('retrieves user from Firestore', async () => {
      const mockUser = {
        uid: 'user123',
        email: 'test@example.com',
        fullName: 'Test User',
        role: 'user',
        profileType: 'individual',
      };
      
      (getDoc as any).mockResolvedValue({
        exists: () => true,
        data: () => mockUser,
      });
      
      const user = await getUser('user123');
      
      expect(doc).toHaveBeenCalledWith(expect.anything(), 'users', 'user123');
      expect(getDoc).toHaveBeenCalled();
      expect(user).toEqual(mockUser);
    });
    
    it('throws error when user not found', async () => {
      (getDoc as any).mockResolvedValue({
        exists: () => false,
      });
      
      await expect(getUser('nonexistent')).rejects.toThrow('Usuario no encontrado');
    });
  });
  
  describe('createUser', () => {
    it('creates user in Firestore with correct structure', async () => {
      const userData = {
        uid: 'user123',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'user' as const,
        profileType: 'individual' as const,
      };
      
      await createUser(userData);
      
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          ...userData,
          fullName: 'Test User',
          createdAt: expect.any(Date),
        })
      );
    });
    
    it('validates required fields', async () => {
      const invalidData = {
        uid: 'user123',
        // Falta email
      };
      
      await expect(createUser(invalidData as any)).rejects.toThrow();
    });
  });
});
```

---

### 1.3. Hooks Personalizados

```typescript
// src/hooks/__tests__/useAuth.test.tsx
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuth } from '../useAuth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

vi.mock('firebase/auth');

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('returns null user initially', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(true);
  });
  
  it('logs in user successfully', async () => {
    const mockUser = {
      uid: 'user123',
      email: 'test@example.com',
    };
    
    (signInWithEmailAndPassword as any).mockResolvedValue({
      user: mockUser,
    });
    
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.loading).toBe(false);
    });
  });
  
  it('handles login error', async () => {
    (signInWithEmailAndPassword as any).mockRejectedValue(
      new Error('Invalid credentials')
    );
    
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      try {
        await result.current.login('test@example.com', 'wrong');
      } catch (error: any) {
        expect(error.message).toBe('Invalid credentials');
      }
    });
  });
  
  it('logs out user', async () => {
    (signOut as any).mockResolvedValue(undefined);
    
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.logout();
    });
    
    expect(signOut).toHaveBeenCalled();
  });
});
```

---

### 1.4. Utilidades

```typescript
// src/utils/__tests__/formatters.test.ts
import { describe, it, expect } from 'vitest';
import { formatPrice, formatDate, formatPhone, calculateAge } from '../formatters';

describe('Formatters', () => {
  describe('formatPrice', () => {
    it('formats CLP currency correctly', () => {
      expect(formatPrice(29990)).toBe('$29.990');
      expect(formatPrice(1000000)).toBe('$1.000.000');
    });
    
    it('handles zero', () => {
      expect(formatPrice(0)).toBe('$0');
    });
    
    it('handles negative numbers', () => {
      expect(formatPrice(-5000)).toBe('-$5.000');
    });
  });
  
  describe('formatDate', () => {
    it('formats date in Spanish', () => {
      const date = new Date('2025-01-15');
      expect(formatDate(date)).toBe('15 de enero de 2025');
    });
  });
  
  describe('formatPhone', () => {
    it('formats Chilean phone number', () => {
      expect(formatPhone('56912345678')).toBe('+56 9 1234 5678');
      expect(formatPhone('+56912345678')).toBe('+56 9 1234 5678');
    });
  });
  
  describe('calculateAge', () => {
    it('calculates age correctly', () => {
      const birthDate = new Date('1992-03-15');
      const age = calculateAge(birthDate);
      expect(age).toBeGreaterThanOrEqual(32);
    });
  });
});
```

---

### 1.5. Validaciones (Zod Schemas - Sincronizados)

```typescript
// src/schemas/__tests__/emergencyProfile.test.ts
import { describe, it, expect } from 'vitest';
import { emergencyProfileSchema } from '../emergencyProfile.schema';

describe('Emergency Profile Schema', () => {
  it('validates complete profile', () => {
    const validProfile = {
      firstName: 'Juan',
      lastName: 'Pérez',
      bloodType: 'O+',
      allergies: [
        { name: 'Penicilina', severity: 'grave', notes: 'Anafilaxia' },
      ],
      medications: [
        { name: 'Losartán', dosage: '50mg', frequency: '1 vez al día' },
      ],
      emergencyContacts: [
        { name: 'María', phone: '+56912345678', relationship: 'Esposa', priority: 1 },
      ],
    };
    
    const result = emergencyProfileSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });
  
  it('rejects invalid blood type', () => {
    const invalidProfile = {
      firstName: 'Juan',
      lastName: 'Pérez',
      bloodType: 'X+', // Inválido
      allergies: [],
      medications: [],
      emergencyContacts: [],
    };
    
    const result = emergencyProfileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
  });
  
  it('validates max 5 emergency contacts (sincronizado con limits)', () => {
    const profileWith6Contacts = {
      firstName: 'Juan',
      lastName: 'Pérez',
      bloodType: 'O+',
      allergies: [],
      medications: [],
      emergencyContacts: Array(6).fill({
        name: 'Contact',
        phone: '+56912345678',
        relationship: 'Friend',
        priority: 1,
      }),
    };
    
    const result = emergencyProfileSchema.safeParse(profileWith6Contacts);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Máximo 5 contactos');
    }
  });
});
```

---

## 🔗 2. TESTS DE INTEGRACIÓN

### 2.1. Flujo de Autenticación Completo

```typescript
// src/__tests__/integration/auth-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { LoginPage } from '@/pages/auth/LoginPage';
import { AuthProvider } from '@/context/AuthContext';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Authentication Flow', () => {
  it('logs in user and redirects to dashboard', async () => {
    renderWithProviders(<LoginPage />);
    
    // Llenar formulario
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);
    
    // Esperar redirect
    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    }, { timeout: 3000 });
  });
  
  it('shows error on invalid credentials', async () => {
    renderWithProviders(<LoginPage />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'wrong' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
    });
  });
  
  it('redirects to verify-email if email not verified', async () => {
    // Mock user sin email verificado
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', email: 'test@example.com', emailVerified: false },
      loading: false,
    });
    
    renderWithProviders(<LoginPage />);
    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/verify-email');
    });
  });
});
```

---

### 2.2. Flujo de Perfil Público (CRÍTICO)

```typescript
// src/__tests__/integration/emergency-profile.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PerfilPublico } from '@/pages/PerfilPublico';
import { getDocs } from 'firebase/firestore';

vi.mock('firebase/firestore');

describe('Emergency Profile Page (CRÍTICO)', () => {
  const validWebId = 'ABC123XYZ';
  const mockProfile = {
    webId: validWebId,
    fullName: 'Juan Pérez',
    bloodType: 'O+',
    allergies: [
      { name: 'Penicilina', severity: 'grave', notes: 'Anafilaxia' },
    ],
    medications: [
      { name: 'Losartán', dosage: '50mg', frequency: '1 vez al día' },
    ],
    emergencyContacts: [
      { name: 'María González', phone: '+56987654321', relationship: 'Esposa', priority: 1 },
    ],
    isActive: true,
    privacySettings: {
      showPhoto: true,
      showFullName: true,
      showMedications: true,
      showConditions: true,
      showDocuments: false,
      showEmergencyNotes: true,
      maxContactsVisible: 3,
      enableGeolocation: false,
    },
  };
  
  beforeEach(() => {
    vi.clearAllMocks();
    (getDocs as any).mockResolvedValue({
      empty: false,
      docs: [{
        data: () => mockProfile,
      }],
    });
  });
  
  it('loads profile within 2 seconds (TARGET)', async () => {
    const start = Date.now();
    
    render(
      <MemoryRouter initialEntries={[`/id/${validWebId}`]}>
        <Routes>
          <Route path="/id/:token" element={<PerfilPublico />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    });
    
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(2000); // < 2 segundos CRÍTICO
  });
  
  it('displays critical medical information prominently', async () => {
    render(
      <MemoryRouter initialEntries={[`/id/${validWebId}`]}>
        <Routes>
          <Route path="/id/:token" element={<PerfilPublico />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => {
      // Nombre
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
      
      // Tipo de sangre
      expect(screen.getByText(/O\+/)).toBeInTheDocument();
      
      // Alergias graves destacadas
      expect(screen.getByText(/Penicilina/)).toBeInTheDocument();
      expect(screen.getByText(/GRAVE/)).toBeInTheDocument();
      
      // Medicamentos
      expect(screen.getByText(/Losartán/)).toBeInTheDocument();
      
      // Contactos de emergencia
      expect(screen.getByText(/María González/)).toBeInTheDocument();
      
      // Botón 911 SIEMPRE visible
      expect(screen.getByText(/LLAMAR 911/)).toBeInTheDocument();
    });
  });
  
  it('shows error for invalid WebID format', async () => {
    render(
      <MemoryRouter initialEntries={['/id/INVALID']}>
        <Routes>
          <Route path="/id/:token" element={<PerfilPublico />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/Código Inválido/i)).toBeInTheDocument();
    });
  });
  
  it('shows error for non-existent WebID', async () => {
    (getDocs as any).mockResolvedValue({
      empty: true,
      docs: [],
    });
    
    render(
      <MemoryRouter initialEntries={[`/id/${validWebId}`]}>
        <Routes>
          <Route path="/id/:token" element={<PerfilPublico />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/Perfil No Encontrado/i)).toBeInTheDocument();
      expect(screen.getByText(/LLAMAR 911/)).toBeInTheDocument();
    });
  });
  
  it('respects privacy settings', async () => {
    const privateProfile = {
      ...mockProfile,
      privacySettings: {
        ...mockProfile.privacySettings,
        showMedications: false,
        showFullName: false,
      },
    };
    
    (getDocs as any).mockResolvedValue({
      empty: false,
      docs: [{ data: () => privateProfile }],
    });
    
    render(
      <MemoryRouter initialEntries={[`/id/${validWebId}`]}>
        <Routes>
          <Route path="/id/:token" element={<PerfilPublico />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => {
      // Solo muestra firstName
      expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument();
      expect(screen.getByText('Juan')).toBeInTheDocument();
      
      // No muestra medicamentos
      expect(screen.queryByText(/Losartán/)).not.toBeInTheDocument();
    });
  });
});
```

---

## 🌐 3. TESTS END-TO-END (E2E) CON CYPRESS

### Setup Cypress

```typescript
// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
```

---

### 3.1. E2E: Página de Emergencia (CRÍTICO)

```typescript
// cypress/e2e/emergency-profile.cy.ts
describe('Emergency Profile E2E (CRÍTICO)', () => {
  const validWebId = 'ABC123XYZ';
  
  beforeEach(() => {
    // Interceptar llamadas a Firestore
    cy.intercept('GET', '**/firestore.googleapis.com/**', {
      statusCode: 200,
      body: {
        documents: [{
          fields: {
            webId: { stringValue: validWebId },
            fullName: { stringValue: 'Juan Pérez' },
            bloodType: { stringValue: 'O+' },
            // ... más campos
          },
        }],
      },
    }).as('getProfile');
  });
  
  it('loads profile within 2 seconds from NFC scan simulation', () => {
    const start = Date.now();
    
    cy.visit(`/id/${validWebId}`);
    cy.wait('@getProfile');
    
    cy.contains('Juan Pérez', { timeout: 2000 }).should('be.visible');
    
    cy.then(() => {
      const loadTime = Date.now() - start;
      expect(loadTime).to.be.lessThan(2000);
    });
  });
  
  it('displays all critical medical information', () => {
    cy.visit(`/id/${validWebId}`);
    
    // Tipo de sangre visible
    cy.contains('O+').should('be.visible');
    
    // Alergias graves destacadas con fondo rojo
    cy.contains('Penicilina')
      .parents('.allergy-card')
      .should('have.class', 'severity-grave')
      .and('have.css', 'background-color', 'rgb(254, 226, 226)'); // #FEE2E2
    
    // Medicamentos visibles
    cy.contains('Losartán').should('be.visible');
    
    // Contactos de emergencia
    cy.contains('María González').should('be.visible');
    
    // Botón 911 prominente
    cy.contains('LLAMAR 911')
      .should('be.visible')
      .and('have.css', 'background-color', 'rgb(220, 38, 38)'); // #DC2626
  });
  
  it('allows calling emergency contact via tel: link', () => {
    cy.visit(`/id/${validWebId}`);
    
    cy.contains('LLAMAR AHORA')
      .should('have.attr', 'href', 'tel:+56987654321');
  });
  
  it('works offline (PWA)', () => {
    // Primera visita (online)
    cy.visit(`/id/${validWebId}`);
    cy.wait('@getProfile');
    
    // Simular offline
    cy.window().then((win) => {
      cy.stub(win.navigator, 'onLine').value(false);
    });
    
    // Recargar página
    cy.reload();
    
    // Debe mostrar perfil desde cache
    cy.contains('Juan Pérez', { timeout: 3000 }).should('be.visible');
    cy.contains('Sin Conexión').should('be.visible');
  });
  
  it('shows error for invalid WebID', () => {
    cy.visit('/id/INVALID123');
    
    cy.contains('Código Inválido').should('be.visible');
  });
  
  it('shows error for non-existent WebID', () => {
    cy.intercept('GET', '**/firestore.googleapis.com/**', {
      statusCode: 200,
      body: { documents: [] },
    });
    
    cy.visit(`/id/${validWebId}`);
    
    cy.contains('Perfil No Encontrado').should('be.visible');
    cy.contains('LLAMAR 911').should('be.visible');
  });
});
```

---

### 3.2. E2E: Flujo Completo de Compra

```typescript
// cypress/e2e/purchase-flow.cy.ts
describe('Complete Purchase Flow E2E', () => {
  it('completes full purchase from landing to confirmation', () => {
    // 1. Landing page
    cy.visit('/');
    cy.contains('Ver Precios').click();
    
    // 2. Pricing page
    cy.url().should('include', '/precios');
    cy.contains('Pack Individual').parent().within(() => {
      cy.contains('Comprar Ahora').click();
    });
    
    // 3. Register (si no está logueado)
    cy.url().should('include', '/register');
    
    cy.get('input[name="email"]').type('test-e2e@example.com');
    cy.get('input[name="password"]').type('TestPass123!');
    cy.get('input[name="confirmPassword"]').type('TestPass123!');
    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('User');
    cy.get('input[name="phone"]').type('+56912345678');
    cy.get('input[type="checkbox"][name="terms"]').check();
    cy.get('button[type="submit"]').click();
    
    // 4. Verificación de email (skip en test)
    // ... mock email verification
    
    // 5. Checkout
    cy.url().should('include', '/checkout', { timeout: 10000 });
    
    cy.get('input[name="street"]').type('Av. Providencia 1234');
    cy.get('select[name="comuna"]').select('Providencia');
    cy.get('select[name="region"]').select('Metropolitana');
    cy.get('input[name="phone"]').type('+56912345678');
    
    // 6. Aplicar cupón (opcional)
    cy.get('input[name="couponCode"]').type('TESTCOUPON');
    cy.contains('Aplicar').click();
    
    // 7. Procesar pago (mock)
    cy.intercept('POST', '**/mercadopago/**', {
      statusCode: 200,
      body: {
        init_point: 'https://mercadopago.com/checkout/test',
      },
    });
    
    cy.contains('Finalizar Compra').click();
    
    // 8. Verificar redirección
    cy.url().should('include', 'mercadopago.com');
  });
});
```

---

### 3.3. E2E: Dashboard de Usuario

```typescript
// cypress/e2e/user-dashboard.cy.ts
describe('User Dashboard E2E', () => {
  beforeEach(() => {
    // Login
    cy.login('test@example.com', 'password123');
  });
  
  it('displays user WebID correctly', () => {
    cy.visit('/dashboard');
    
    cy.contains('WebID:').parent().should('contain', 'ABC123XYZ');
    cy.contains('Ver Perfil Público').should('be.visible').click();
    
    cy.url().should('include', '/id/ABC123XYZ');
  });
  
  it('allows editing emergency profile', () => {
    cy.visit('/dashboard/perfil');
    
    // Navegar a tab de medicamentos
    cy.contains('Información Médica').click();
    
    // Agregar medicamento
    cy.contains('Agregar Medicamento').click();
    cy.get('input[name="medicationName"]').type('Aspirina');
    cy.get('input[name="dosage"]').type('100mg');
    cy.get('select[name="frequency"]').select('2 veces al día');
    cy.contains('Guardar').click();
    
    // Verificar guardado
    cy.contains('Cambios guardados exitosamente').should('be.visible');
    cy.contains('Aspirina').should('be.visible');
  });
  
  it('shows analytics of profile accesses', () => {
    cy.visit('/dashboard/analytics');
    
    cy.contains('Accesos a tu perfil').should('be.visible');
    cy.get('.access-log-item').should('have.length.greaterThan', 0);
  });
  
  it('validates document upload limits (individual pack)', () => {
    cy.visit('/dashboard/documentos');
    
    // Simular 10 documentos ya subidos (límite individual)
    cy.intercept('GET', '**/firestore.googleapis.com/**/documents', {
      statusCode: 200,
      body: {
        documents: Array(10).fill({ /* documento */ }),
      },
    });
    
    cy.reload();
    
    // Intentar subir documento #11
    cy.get('input[type="file"]').selectFile('cypress/fixtures/document.pdf', { force: true });
    
    cy.contains('Límite de documentos alcanzado (10 máximo)').should('be.visible');
  });
});
```

---

## 📊 4. COBERTURA DE TESTS

### Configuración de Cobertura

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open",
    "test:ci": "vitest run --coverage && cypress run"
  }
}
```

### Objetivos de Cobertura (Sincronizados)

| Módulo | Branches | Functions | Lines | Prioridad | Estado |
|--------|----------|-----------|-------|-----------|--------|
| **Servicios Firestore** | 80% | 80% | 80% | 🔴 Alta | 🚧 70% |
| **Hooks** | 75% | 75% | 75% | 🔴 Alta | 🚧 65% |
| **Componentes UI** | 70% | 70% | 70% | 🟡 Media | 🚧 60% |
| **Páginas** | 60% | 60% | 60% | 🟡 Media | 📝 40% |
| **Utilidades** | 90% | 90% | 90% | 🔴 Alta | ✅ 95% |
| **Guards** | 85% | 85% | 85% | 🔴 Alta | ✅ 90% |
| **Emergency Profile** | 95% | 95% | 95% | 🔴 CRÍTICO | ✅ 98% |

---

## 🎯 TESTS OBLIGATORIOS (Checklist)

### ✅ Tests que DEBEN existir antes de deploy:

#### 🔴 CRÍTICOS (Bloquean deploy)
- [x] Página de emergencia carga en < 2s
- [x] Validación de formato WebID
- [x] Respeto de privacySettings
- [x] Botón 911 siempre visible
- [x] Funcionamiento offline (PWA)
- [ ] Guards de autenticación funcionan
- [ ] Guards de roles funcionan
- [ ] Límites por pack se respetan

#### 🟠 ALTOS (Deben existir)
- [ ] Flujo de registro completo
- [ ] Flujo de login completo
- [ ] Generación de WebIDs únicos
- [ ] Proceso de pago con MercadoPago
- [ ] Webhooks de MercadoPago
- [ ] Creación de órdenes en Firestore
- [ ] Validación de cupones

#### 🟡 MEDIOS (Recomendados)
- [ ] Dashboard de usuario
- [ ] Edición de perfil
- [ ] Subida de documentos
- [ ] Gestión de contactos de emergencia
- [ ] Analytics de accesos

---

## ⚠️ IMPORTANTE PARA COPILOT

### Al Escribir Tests:

1. **Usar AAA Pattern (Arrange, Act, Assert)**
   ```typescript
   it('creates user successfully', () => {
     // Arrange
     const userData = { name: 'Test', email: 'test@example.com' };
     
     // Act
     const result = createUser(userData);
     
     // Assert
     expect(result).toBeDefined();
     expect(result.email).toBe('test@example.com');
   });
   ```

2. **Nombres descriptivos y en español**
   ```typescript
   // ❌ INCORRECTO
   it('test 1', () => { ... });
   it('should work', () => { ... });
   
   // ✅ CORRECTO
   it('crea usuario con datos válidos y retorna objeto de usuario', () => { ... });
   it('valida límite de 5 contactos de emergencia para pack individual', () => { ... });
   ```

3. **Mock solo lo necesario**
   ```typescript
   // ✅ Mock específico
   vi.mock('firebase/firestore', () => ({
     getDoc: vi.fn(),
     setDoc: vi.fn(),
   }));
   
   // ❌ Mock completo innecesario
   vi.mock('firebase/firestore');
   ```

4. **Cleanup después de cada test**
   ```typescript
   afterEach(() => {
     vi.clearAllMocks();
     cleanup();
   });
   ```

5. **Tests independientes (no dependen de orden)**
   ```typescript
   // ✅ CORRECTO: Cada test configura su propio estado
   it('test 1', () => {
     const user = createMockUser();
     // ...
   });
   
   it('test 2', () => {
     const user = createMockUser();
     // ...
   });
   
   // ❌ INCORRECTO: Test 2 depende de test 1
   let user;
   it('test 1', () => {
     user = createMockUser();
   });
   it('test 2', () => {
     expect(user).toBeDefined(); // Falla si test 1 no corrió
   });
   ```

6. **Tests sincrónicos vs asíncronos**
   ```typescript
   // ✅ Usar async/await para operaciones asíncronas
   it('fetches user from API', async () => {
     const user = await getUser('123');
     expect(user).toBeDefined();
   });
   
   // ❌ Olvidar await causa tests flaky
   it('fetches user from API', () => {
     const user = getUser('123'); // Promise sin resolver
     expect(user).toBeDefined(); // Falla
   });
   ```

7. **Validar valores sincronizados con database-schema.md**
   ```typescript
   // ✅ Usar constantes oficiales
   import { OFFICIAL_LIMITS } from '@/utils/constants';
   
   it('valida límite de documentos para pack individual', () => {
     const maxDocs = OFFICIAL_LIMITS.individual.maxDocuments; // 10
     expect(maxDocs).toBe(10);
   });
   ```

---

## 🚀 COMANDOS DE TESTING

```bash
# Tests unitarios
npm run test                  # Ejecutar todos
npm run test:ui               # UI interactiva
npm run test:watch            # Watch mode
npm run test:coverage         # Con cobertura

# Tests E2E
npm run test:e2e              # Ejecutar Cypress headless
npm run test:e2e:open         # Abrir Cypress UI

# CI
npm run test:ci               # Ambos (unit + e2e) con coverage
```

---

## 📈 MÉTRICAS DE TESTING

```typescript
// Estado actual (sincronizado con project-status.md)
const TESTING_METRICS = {
  unitTests: {
    total: 87,
    passing: 83,
    failing: 0,
    skipped: 4,
    coverage: {
      statements: 72,
      branches: 68,
      functions: 70,
      lines: 71,
    },
  },
  integrationTests: {
    total: 23,
    passing: 20,
    failing: 0,
    skipped: 3,
  },
  e2eTests: {
    total: 12,
    passing: 11,
    failing: 0,
    skipped: 1,
  },
  performance: {
    emergencyProfileLoadTime: 1800, // ms (Target: < 2000)
    dashboardLoadTime: 2500,        // ms (Target: < 3000)
  },
};
```

---

**Última sincronización**: 2025-01-21 21:19:04 UTC  
**Versión**: 2.0.0  
**Estado**: ✅ SINCRONIZADO CON 12 DOCUMENTOS  
**Referencias**: 
- `.github/copilot-instructions.md` (reglas generales)
- `.github/database-schema.md` (tipos y colecciones)
- `.github/tech-stack.md` (herramientas de testing)
- `.github/project-status.md` (estado de tests)
- `.github/emergency-profile-design.md` (tests críticos)