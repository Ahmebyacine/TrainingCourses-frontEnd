import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '@/services/auth';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const navigate = useNavigate();  
  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <Button onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
};
export default LogoutButton;