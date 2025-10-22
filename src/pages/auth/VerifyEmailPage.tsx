import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { toast } from 'sonner';

export default function VerifyEmailPage() {
  const { verifyEmail, firebaseUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResendEmail = async () => {
    try {
      setLoading(true);
      await verifyEmail();
      setEmailSent(true);
      toast.success('Email de verificación enviado');
    } catch (error: any) {
      toast.error(error.message || 'Error al enviar email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">NFCores</h1>
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">
          Verifica tu Email
        </h2>
      </div>

      <Card className="mt-8">
        <div className="text-center space-y-4">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Revisa tu bandeja de entrada
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Hemos enviado un email de verificación a:
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {firebaseUser?.email}
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <p className="text-sm text-gray-600">
              Haz clic en el link del email para verificar tu cuenta y continuar.
            </p>

            {emailSent && (
              <div className="p-3 bg-green-50 rounded-md">
                <p className="text-sm text-green-800">
                  ✓ Email reenviado exitosamente
                </p>
              </div>
            )}

            <Button
              variant="primary"
              className="w-full"
              onClick={handleResendEmail}
              isLoading={loading}
            >
              Reenviar Email de Verificación
            </Button>

            <div className="pt-2 space-y-2">
              <p className="text-xs text-gray-500">
                ¿No ves el email? Revisa tu carpeta de spam o correo no deseado.
              </p>

              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  Ya verifiqué mi email
                </Button>

                <Button
                  variant="outline"
                  onClick={() => logout()}
                  className="w-full"
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              ¿Necesitas ayuda?{' '}
              <Link
                to="/contacto"
                className="font-medium text-primary hover:text-primary-hover"
              >
                Contáctanos
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
