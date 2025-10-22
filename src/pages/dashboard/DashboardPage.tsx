import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenido, {user?.firstName}
          </h1>
          <p className="text-gray-600">
            Gestiona tu perfil de emergencia y configuración
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Perfil de Emergencia</h3>
                <p className="text-sm text-gray-600">Configura tu información médica</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-secondary text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Contactos de Emergencia</h3>
                <p className="text-sm text-gray-600">Gestiona tus contactos</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Documentos Médicos</h3>
                <p className="text-sm text-gray-600">Sube tus documentos</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Información de Usuario</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nombre:</span>
              <span className="font-medium">{user?.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rol:</span>
              <span className="font-medium">{user?.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tipo de perfil:</span>
              <span className="font-medium">{user?.profileType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado:</span>
              <span className={`font-medium ${user?.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {user?.isActive ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
