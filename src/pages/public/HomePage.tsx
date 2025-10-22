import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-[80vh]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-primary-hover text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tu Información Médica
              <br />
              Siempre Contigo
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Acceso instantáneo a tu perfil de emergencia mediante tecnología NFC
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button variant="secondary" size="lg">
                  Comenzar Ahora
                </Button>
              </Link>
              <Link to="/como-funciona">
                <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Cómo Funciona
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Por qué NFCores?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Acceso Instantáneo</h3>
              <p className="text-gray-600">
                Personal de emergencia accede a tu información en menos de 2 segundos
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Seguro</h3>
              <p className="text-gray-600">
                Tu información está protegida y solo tú controlas qué se comparte
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sin Apps</h3>
              <p className="text-gray-600">
                No requiere instalación. Funciona con cualquier smartphone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Protege a tu familia hoy
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Desde $29.990 por 12 meses de protección
          </p>
          <Link to="/precios">
            <Button variant="primary" size="lg">
              Ver Planes
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
