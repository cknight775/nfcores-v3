import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requireVerified?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireVerified = true 
}) => {
  const { user, firebaseUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !firebaseUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requireVerified && !firebaseUser.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};
