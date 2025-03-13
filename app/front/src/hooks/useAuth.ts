import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/services/userService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
        (async() => {
            const response = await getCurrentUser();
            if (response.ok) {
                const currentUser = await response.json();
                setUser(currentUser);
            } else  {
                logout();
            }
        })();
    } catch {
        logout();
    }
  }, []);

  const logout = async () => {
    setUser(null);
    router.push('/login');
  };

  return { user, logout };
};

export default useAuth;
