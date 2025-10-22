import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { toast } from 'sonner';

const registerSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'Mínimo 6 caracteres'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      await registerUser(data.email, data.password, {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      });
      toast.success('¡Cuenta creada! Verifica tu email para continuar.');
      navigate('/auth/verify-email');
    } catch (error: any) {
      toast.error(error.message || 'Error al crear cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">NFCores</h1>
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">
          Crear Cuenta
        </h2>
      </div>

      <Card className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              {...register('firstName')}
              type="text"
              label="Nombre"
              placeholder="Juan"
              error={errors.firstName?.message}
            />

            <Input
              {...register('lastName')}
              type="text"
              label="Apellido"
              placeholder="Pérez"
              error={errors.lastName?.message}
            />
          </div>

          <Input
            {...register('email')}
            type="email"
            label="Email"
            placeholder="tu@email.com"
            error={errors.email?.message}
          />

          <Input
            {...register('phone')}
            type="tel"
            label="Teléfono (opcional)"
            placeholder="+56912345678"
            error={errors.phone?.message}
          />

          <Input
            {...register('password')}
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            error={errors.password?.message}
          />

          <Input
            {...register('confirmPassword')}
            type="password"
            label="Confirmar Contraseña"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
          />

          <div className="flex items-start">
            <input
              {...register('terms')}
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              Acepto los{' '}
              <Link to="/terminos" className="text-primary hover:text-primary-hover">
                términos y condiciones
              </Link>{' '}
              y la{' '}
              <Link to="/privacidad" className="text-primary hover:text-primary-hover">
                política de privacidad
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-600">{errors.terms.message}</p>
          )}

          <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
            Crear Cuenta
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:text-primary-hover"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </Card>
    </div>
  );
}
