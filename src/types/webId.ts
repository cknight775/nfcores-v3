// WebID Types - Sincronizado con database-schema.md

export type WebIDStatus = 'pending_activation' | 'active' | 'inactive' | 'deactivated' | 'expired';

export interface WebID {
  code: string; // "ABC123XYZ" - 9 caracteres alfanuméricos
  userId: string | null;
  profileId: string | null;
  status: WebIDStatus;
  packType: 'individual' | 'familiar' | 'empresarial';
  panelId?: string; // "FAM-00001" | "EMP-00001"
  
  // Metadata
  generatedAt: Date;
  activatedAt: Date | null;
  deactivatedAt: Date | null;
  expiresAt: Date | null;
  
  // Tracking
  accessCount: number;
  lastAccessedAt: Date | null;
}

// Función helper para validar formato de WebID
export const isValidWebIDFormat = (code: string): boolean => {
  return /^[A-Z0-9]{9}$/.test(code);
};

// Función helper para generar WebID (implementación básica)
export const generateWebIDCode = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let code = '';
  
  // 3 letras
  for (let i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  // 3 números
  for (let i = 0; i < 3; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  // 3 letras
  for (let i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  return code;
};
