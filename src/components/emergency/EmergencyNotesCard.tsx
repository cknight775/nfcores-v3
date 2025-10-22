import type { EmergencyProfile } from '@/types/emergencyProfile';

interface EmergencyNotesCardProps {
  profile: EmergencyProfile;
}

export const EmergencyNotesCard: React.FC<EmergencyNotesCardProps> = ({ profile }) => {
  // Solo mostrar si hay notas Y la privacidad lo permite
  if (!profile.emergencyNotes || !profile.privacySettings.showEmergencyNotes) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-3xl">📝</span>
        Notas de Emergencia
      </h2>

      <div className="bg-gray-100 border border-gray-300 rounded-lg p-5">
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {profile.emergencyNotes}
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Información adicional proporcionada por el usuario
      </p>
    </div>
  );
};
