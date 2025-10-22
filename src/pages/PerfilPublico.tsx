import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { EmergencyProfile } from '@/types/emergencyProfile';
import { getProfileByWebId, incrementProfileAccess } from '@/services/firestore/emergencyProfiles';
import { logEmergencyAccess } from '@/services/analytics/accessLogs';

// Componentes de emergencia
import { ErrorState } from '@/components/emergency/ErrorState';
import { HeroSection } from '@/components/emergency/HeroSection';
import { MedicalInfoCard } from '@/components/emergency/MedicalInfoCard';
import { ContactsCard } from '@/components/emergency/ContactsCard';
import { EmergencyNotesCard } from '@/components/emergency/EmergencyNotesCard';
import { DocumentsCard } from '@/components/emergency/DocumentsCard';

type ErrorType = 'token_missing' | 'token_invalid' | 'profile_not_found' | 'profile_inactive' | 'unknown_error';

const WEBID_REGEX = /^[A-Z0-9]{9}$/;

export default function PerfilPublico() {
  const { token } = useParams<{ token: string }>();
  const [profile, setProfile] = useState<EmergencyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Validación 1: Token existe
        if (!token) {
          setError('token_missing');
          setLoading(false);
          return;
        }

        // Validación 2: Token tiene formato correcto (9 caracteres alfanuméricos mayúsculas)
        if (!WEBID_REGEX.test(token)) {
          setError('token_invalid');
          setLoading(false);
          return;
        }

        // Cargar perfil desde Firestore (query optimizado)
        const profileData = await getProfileByWebId(token);

        // Validación 3: Perfil existe
        if (!profileData) {
          setError('profile_not_found');
          setLoading(false);
          return;
        }

        // Validación 4: Perfil está activo
        if (!profileData.isActive) {
          setError('profile_inactive');
          setLoading(false);
          return;
        }

        // Perfil cargado exitosamente
        setProfile(profileData);
        setLoading(false);

        // Tareas en segundo plano (NO BLOQUEANTES)
        // 1. Incrementar contador de accesos
        incrementProfileAccess(token).catch(err => {
          console.error('Error incrementando accesos:', err);
        });

        // 2. Registrar log de acceso con geolocalización
        logEmergencyAccess(token, {
          profileId: profileData.profileId,
          userId: profileData.userId,
        }).catch(err => {
          console.error('Error registrando acceso:', err);
        });

      } catch (err) {
        console.error('Error cargando perfil de emergencia:', err);
        setError('unknown_error');
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  // Estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando información de emergencia...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return <ErrorState error={error} token={token} />;
  }

  // Estado normal: mostrar perfil
  if (!profile) {
    return <ErrorState error="unknown_error" token={token} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection profile={profile} />

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Información médica */}
        <MedicalInfoCard profile={profile} />

        {/* Contactos de emergencia + Botón 911 */}
        <ContactsCard profile={profile} />

        {/* Notas de emergencia (condicional) */}
        <EmergencyNotesCard profile={profile} />

        {/* Documentos médicos (condicional) */}
        <DocumentsCard profile={profile} />

        {/* Footer informativo */}
        <div className="text-center text-sm text-gray-500 py-6 border-t border-gray-200">
          <p className="mb-2">
            Esta información es proporcionada por el usuario para situaciones de emergencia.
          </p>
          <p>
            En caso de duda, siempre contacte a servicios de emergencia (911).
          </p>
          <p className="mt-4 text-xs text-gray-400">
            Código de acceso: {token}
          </p>
        </div>
      </div>
    </div>
  );
}
