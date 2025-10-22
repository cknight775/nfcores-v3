import type { EmergencyProfile } from '@/types/emergencyProfile';

interface MedicalInfoCardProps {
  profile: EmergencyProfile;
}

export const MedicalInfoCard: React.FC<MedicalInfoCardProps> = ({ profile }) => {
  const getAllergySeverityStyles = (severity: 'grave' | 'moderada' | 'leve') => {
    switch (severity) {
      case 'grave':
        return {
          bg: 'bg-red-50',
          border: 'border-red-600',
          text: 'text-red-900',
          icon: '🚨',
        };
      case 'moderada':
        return {
          bg: 'bg-yellow-50',
          border: 'border-amber-500',
          text: 'text-amber-900',
          icon: '⚠️',
        };
      case 'leve':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-400',
          text: 'text-blue-900',
          icon: 'ℹ️',
        };
    }
  };

  const hasVisibleContent = 
    profile.allergies.length > 0 ||
    (profile.privacySettings.showMedications && profile.medications.length > 0) ||
    (profile.privacySettings.showConditions && profile.medicalConditions.length > 0);

  if (!hasVisibleContent) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-3xl">⚕️</span>
        Información Médica
      </h2>

      <div className="space-y-6">
        {/* Alergias - SIEMPRE visibles (críticas) */}
        {profile.allergies.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🛑 Alergias
            </h3>
            <div className="space-y-2">
              {profile.allergies.map((allergy, index) => {
                const styles = getAllergySeverityStyles(allergy.severity);
                return (
                  <div
                    key={index}
                    className={`${styles.bg} border-l-4 ${styles.border} p-4 rounded-r-lg`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{styles.icon}</span>
                      <div className="flex-1">
                        <p className={`font-semibold ${styles.text} text-lg`}>
                          {allergy.name}
                        </p>
                        {allergy.notes && (
                          <p className="text-sm text-gray-700 mt-1">
                            Notas: {allergy.notes}
                          </p>
                        )}
                        <p className="text-xs font-medium text-gray-600 mt-1 uppercase">
                          Severidad: {allergy.severity}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Medicamentos (si privacidad lo permite) */}
        {profile.privacySettings.showMedications && profile.medications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-xl">💊</span>
              Medicamentos
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-3">
                {profile.medications.map((med, index) => (
                  <li key={index} className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold text-gray-900">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.dosage}</p>
                    {med.frequency && (
                      <p className="text-sm text-gray-500">
                        Frecuencia: {med.frequency}
                      </p>
                    )}
                    {med.reason && (
                      <p className="text-xs text-gray-500 mt-1">
                        Razón: {med.reason}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Condiciones médicas (si privacidad lo permite) */}
        {profile.privacySettings.showConditions && profile.medicalConditions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-xl">🏥</span>
              Condiciones Médicas
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2">
                {profile.medicalConditions.map((condition, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">▪</span>
                    <span className="text-gray-800">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
