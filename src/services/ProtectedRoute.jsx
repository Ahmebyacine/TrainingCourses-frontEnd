import { getTokenData, isAuthenticated } from './auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ roles = [], redirectPath = '/login', children }) => {
  const location = useLocation();
  const { role } = getTokenData();
  if (!isAuthenticated()) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has required role
  if (roles.length > 0) {
    const hasRequiredRole = roles.some((rol) => role?.includes(rol));
    
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;