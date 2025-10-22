interface ErrorStateProps {
  error: string;
  token?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, token }) => {
  const errorMessages = {
    token_missing: {
      title: 'Código no proporcionado',
      description: 'No se encontró un código de identificación válido.',
      icon: '❌',
    },
    token_invalid: {
      title: 'Código inválido',
      description: `El código "${token}" no tiene el formato correcto. Debe ser un código de 9 caracteres alfanuméricos.`,
      icon: '⚠️',
    },
    profile_not_found: {
      title: 'Perfil no encontrado',
      description: `No se encontró un perfil asociado al código "${token}". Verifica que el código sea correcto.`,
      icon: '🔍',
    },
    profile_inactive: {
      title: 'Perfil inactivo',
      description: 'Este perfil de emergencia está actualmente inactivo.',
      icon: '🚫',
    },
    unknown_error: {
      title: 'Error al cargar perfil',
      description: 'Ocurrió un error inesperado al cargar la información. Por favor, intenta nuevamente.',
      icon: '⚠️',
    },
  };

  const errorData = errorMessages[error as keyof typeof errorMessages] || errorMessages.unknown_error;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">{errorData.icon}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {errorData.title}
          </h1>
          <p className="text-gray-600 mb-8">
            {errorData.description}
          </p>

          {/* Botón 911 SIEMPRE visible */}
          <a
            href="tel:911"
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-6 rounded-lg transition-colors text-2xl mb-4"
          >
            🚨 LLAMAR 911
          </a>

          <div className="space-y-2 text-sm text-gray-500">
            <p>En caso de emergencia médica, siempre llama a servicios de emergencia.</p>
            <p className="text-xs">Código: {token || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
