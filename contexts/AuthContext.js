import axios from 'axios';
import { authLogin, authRegister, interestLists } from 'config/endpoints';
import { useRouter } from 'next/dist/client/router';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => checkUserLoggedIn(), []);

  // Register user
  const register = async (credentials) => {
    setIsLoading(true);
    axios
      .post(authRegister, credentials)
      .then((res) => {
        setUser(res.data);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('user', JSON.stringify(res.data));
        }
        setIsLoading(false);
        router.push('/');
      })
      .catch((error) => {
        setUser({});
        setError(error);
        setIsLoading(false);
      });
  };

  // Login user
  const login = async ({ username, password }) => {
    setIsLoading(true);
    axios
      .post(authLogin, { username, password })
      .then((res) => {
        setUser(res.data);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('user', JSON.stringify(res.data));
        }
        setIsLoading(false);
        router.push('/');
      })
      .catch((error) => {
        setUser({});
        setError(error);
        setIsLoading(false);
      });
  };

  // Logout user
  const logout = async () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('user');
      setUser(null);
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    if (typeof window !== 'undefined') {
      const jsonData = window.localStorage.getItem('user');

      // if there is local user data
      if (jsonData) {
        const userData = JSON.parse(jsonData);
        // verify the token works
        axios
          .get(interestLists + 'owned', {
            headers: { Authorization: 'Token ' + userData.token }
          })
          .then((res) => {
            setUser(JSON.parse(jsonData));
          })
          .catch((error) => {
            setUser(null);
            router.push('/');
          });
      } else setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
