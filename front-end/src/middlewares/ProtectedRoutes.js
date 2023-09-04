import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Outlet, useNavigate} from 'react-router-dom';
import LoginHomePage from '../pages/LoginHomePage.jsx';

const auth = () => {
  return localStorage.getItem('loggedUser');
}

export const useSession = () => {
  const session = auth();
  const decodedSession = session ? jwtDecode(session) : null;

  const navigate = useNavigate();

  useEffect(() => {
    if(!session) {
      navigate('/', { replace: true });
    }
  }, [navigate, session])

  return decodedSession;
}

const ProtectedRoute = () => {
  const isAuthorized = auth();
  const session = useSession();

  return isAuthorized ? <Outlet /> : <LoginHomePage />;
}

export default ProtectedRoute;
