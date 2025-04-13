import { useEffect} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserStore } from '../stores/userStore';


// Custom hook to fetch and manage Auth0 token
export const useAuthToken = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { token, setToken } = useUserStore();

  

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated && !token) {
        try {
          const newToken = await getAccessTokenSilently();
          setToken(newToken);
        } catch (error) {
          console.error('Error fetching token:', error);
          setToken('');
        }
      }
    };

    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently, token, setToken]);

  return token;
};
