import type { EmergencyProfile } from '@/types/emergencyProfile';
import { formatDate } from '@/utils/dateHelpers';

interface DocumentsCardProps {
  profile: EmergencyProfile;
}

export const DocumentsCard: React.FC<DocumentsCardProps> = ({ profile }) => {
  // Solo mostrar si hay documentos Y la privacidad lo permite
  if (!profile.privacySettings.showDocuments || !profile.documents || profile.documents.length === 0) {
    return null;
  }

  // Filtrar solo documentos públicos
  const publicDocuments = profile.documents.filter(doc => doc.isPublic);

  if (publicDocuments.length === 0) {
    return null;
  }

  const getDocumentIcon = (type: 'pdf' | 'image') => {
    return type === 'pdf' ? '📄' : '🖼️';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-3xl">📋</span>
        Documentos Médicos
      </h2>

      <div className="space-y-3">
        {publicDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span className="text-3xl flex-shrink-0">
                  {getDocumentIcon(doc.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {doc.name}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                    <span>{doc.type.toUpperCase()}</span>
                    <span>•</span>
                    <span>{formatFileSize(doc.size)}</span>
                    <span>•</span>
                    <span>{formatDate(doc.uploadedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap flex items-center justify-center gap-1"
                >
                  <span>👁️</span>
                  <span>Ver</span>
                </a>
                <a
                  href={doc.url}
                  download={doc.name}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap flex items-center justify-center gap-1"
                >
                  <span>⬇️</span>
                  <span>Descargar</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Solo se muestran documentos marcados como públicos por el usuario
      </p>
    </div>
  );
};
