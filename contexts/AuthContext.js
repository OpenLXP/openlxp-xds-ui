import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useLocalStorage } from '../hooks/useStorage';
export const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const router = useRouter();
  // const [nothing, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [user, setLocal, removeLocal] = useLocalStorage('user', undefined);

  // useEffect(() => checkUserLoggedIn(), []);

  // Register user
  const register = (userData) => {
    setError(null);
    setLocal(userData);
  };

  // Login user
  const login = (userData) => {
    setError(null);
    setLocal(userData);
  };

  // Logout user
  const logout = async () => {
    removeLocal();
  };

  // // Check if user is logged in
  const checkUserLoggedIn = async () => {
    if (typeof window !== 'undefined') {
      axios
        .get(interestLists + 'owned', {
          headers: { Authorization: 'Token ' + userData.token },
        })
        .then((res) => {})
        .catch((error) => {
          removeLocal();
          router.push('/');
        });
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
