import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '@/services/auth';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const navigate = useNavigate();  
  const handleLogout = () => {
    removeToken();
    window.localStorage.clear();
    window.sessionStorage.clear();
    navigate('/login');
  };

  return (
    <Button onClick={handleLogout} className="mt-4">
      <LogOut className="mr-2 h-4 w-4" />
       تسجيل الخروج   
    </Button>
  );
};
export default LogoutButton;