import type { EmergencyProfile } from '@/types/emergencyProfile';

interface ContactsCardProps {
  profile: EmergencyProfile;
}

export const ContactsCard: React.FC<ContactsCardProps> = ({ profile }) => {
  // Aplicar límite de contactos visibles según configuración de privacidad
  const visibleContacts = profile.emergencyContacts
    .sort((a, b) => a.priority - b.priority)
    .slice(0, profile.privacySettings.maxContactsVisible);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-3xl">📱</span>
        Contactos de Emergencia
      </h2>

      {visibleContacts.length > 0 ? (
        <div className="space-y-3 mb-6">
          {visibleContacts.map((contact, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-lg">
                    {contact.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {contact.relationship}
                  </p>
                  {contact.email && (
                    <p className="text-xs text-gray-500 mt-1">
                      {contact.email}
                    </p>
                  )}
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span className="text-xl">📞</span>
                  <span>Llamar</span>
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {contact.phone}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4 mb-6">
          No hay contactos de emergencia configurados
        </div>
      )}

      {/* Separador visual */}
      <div className="border-t-2 border-gray-200 my-6"></div>

      {/* Botón 911 - EXTRA GRANDE y SIEMPRE visible */}
      <a
        href="tel:911"
        className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-6 rounded-lg transition-colors text-center text-2xl shadow-lg"
      >
        <span className="block text-3xl mb-1">🚨</span>
        <span>LLAMAR 911</span>
      </a>
      
      <p className="text-center text-sm text-gray-500 mt-3">
        En caso de emergencia médica grave
      </p>
    </div>
  );
};
