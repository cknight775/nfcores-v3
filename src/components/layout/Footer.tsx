import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">NFCores</h3>
            <p className="text-gray-400">
              Acceso instantáneo a información médica de emergencia mediante pulseras NFC.
              Salvando vidas con tecnología.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Producto</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/precios" className="text-gray-400 hover:text-white transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link to="/como-funciona" className="text-gray-400 hover:text-white transition-colors">
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link to="/testimonios" className="text-gray-400 hover:text-white transition-colors">
                  Testimonios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terminos" className="text-gray-400 hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NFCores. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
