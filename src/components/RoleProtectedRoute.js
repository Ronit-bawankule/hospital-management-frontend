import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Usage:
 * <RoleProtectedRoute allowedRoles={['ADMIN']}>
 *   <AdminPage />
 * </RoleProtectedRoute>
 */
const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const token   = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  if (!token || !userStr) return <Navigate to="/login" replace />;

  try {
    const user = JSON.parse(userStr);
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  } catch {
    return <Navigate to="/login" replace />;
  }
};

export default RoleProtectedRoute;