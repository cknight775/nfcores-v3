import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';

// Lazy loading para rutas no críticas
const HomePage = React.lazy(() => import('@/pages/public/HomePage'));
const LoginPage = React.lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('@/pages/auth/RegisterPage'));
const ResetPasswordPage = React.lazy(() => import('@/pages/auth/ResetPasswordPage'));
const VerifyEmailPage = React.lazy(() => import('@/pages/auth/VerifyEmailPage'));
const DashboardPage = React.lazy(() => import('@/pages/dashboard/DashboardPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Dashboard layout with auth guard
const DashboardLayout = () => (
  <AuthGuard>
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </div>
  </AuthGuard>
);

export const router = createBrowserRouter([
  // Rutas públicas (con layout completo)
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // Aquí se agregarán más rutas públicas después:
      // /precios, /como-funciona, /testimonios, /contacto, etc.
    ],
  },

  // Rutas de autenticación (sin header/footer)
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmailPage />,
      },
    ],
  },

  // Legacy routes (redirects para compatibilidad)
  {
    path: '/login',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: '/register',
    element: <Navigate to="/auth/register" replace />,
  },
  {
    path: '/reset-password',
    element: <Navigate to="/auth/reset-password" replace />,
  },

  // Rutas protegidas (requieren autenticación)
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      // Aquí se agregarán más rutas del dashboard después:
      // /dashboard/perfil, /dashboard/configuracion, etc.
    ],
  },

  // 404 Not Found
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    ),
  },
]);
