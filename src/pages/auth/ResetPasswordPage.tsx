import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { toast } from 'sonner';

const resetSchema = z.object({
  email: z.string().email('Email inválido'),
});

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetFormData) => {
    try {
      setLoading(true);
      await resetPassword(data.email);
      setEmailSent(true);
      toast.success('Email enviado. Revisa tu bandeja de entrada.');
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
          Recuperar Contraseña
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Ingresa tu email y te enviaremos un link para restablecer tu contraseña
        </p>
      </div>

      <Card className="mt-8">
        {emailSent ? (
          <div className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Email enviado</h3>
            <p className="text-sm text-gray-600">
              Si existe una cuenta con ese email, recibirás un link para restablecer tu contraseña.
            </p>
            <Link to="/auth/login">
              <Button variant="primary" className="w-full">
                Volver al login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              {...register('email')}
              type="email"
              label="Email"
              placeholder="tu@email.com"
              error={errors.email?.message}
            />

            <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
              Enviar Email de Recuperación
            </Button>

            <div className="text-center">
              <Link
                to="/auth/login"
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                Volver al login
              </Link>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
