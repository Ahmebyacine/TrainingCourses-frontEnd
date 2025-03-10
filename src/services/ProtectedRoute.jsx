import { getTokenData, isAuthenticated } from './auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ roles = [], redirectPath = '/login', children }) => {
  const location = useLocation();
  
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  const tokenData = getTokenData();

  if (!tokenData) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  const { role } = tokenData;

  if (roles.length > 0) {
    const hasRequiredRole = roles.some((requiredRole) => 
      role?.toLowerCase() === requiredRole.toLowerCase()
    );
    
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;