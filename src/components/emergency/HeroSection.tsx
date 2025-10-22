import type { EmergencyProfile } from '@/types/emergencyProfile';
import { calculateAge } from '@/utils/dateHelpers';

interface HeroSectionProps {
  profile: EmergencyProfile;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const age = calculateAge(profile.birthDate);

  return (
    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-2xl">🚨</span>
            <span className="font-semibold text-sm uppercase tracking-wide">
              Perfil de Emergencia
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Foto de perfil (si privacidad lo permite) */}
          {profile.privacySettings.showPhoto && profile.photoURL && (
            <div className="flex-shrink-0">
              <img
                src={profile.photoURL}
                alt={profile.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}

          {/* Información principal */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              {profile.privacySettings.showFullName 
                ? profile.fullName 
                : `${profile.firstName} ${profile.lastName[0]}.`}
            </h1>

            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-4">
              {/* Badge de edad */}
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                <span className="text-lg">🎂</span>
                <span className="font-medium">{age} años</span>
              </div>

              {/* Badge de tipo de sangre */}
              {profile.bloodType && (
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <span className="text-lg">🩸</span>
                  <span className="font-medium">{profile.bloodType}</span>
                </div>
              )}
            </div>

            {/* Botón de contacto de emergencia */}
            {profile.emergencyContacts.length > 0 && (
              <a
                href={`tel:${profile.emergencyContacts[0].phone}`}
                className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg"
              >
                <span className="text-xl">📞</span>
                <span>Contactar Emergencia</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
