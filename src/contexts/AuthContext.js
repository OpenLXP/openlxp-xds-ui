import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useLocalStorage } from '../hooks/useStorage';
import axios from 'axios';
import { userOwnedLists } from '../config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { backendHost } from '../config/endpoints';

export const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const router = useRouter();
  // const [nothing, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [user, setLocal, removeLocal] = useLocalStorage('user', null);

  useEffect(() => checkUserLoggedIn(), []);

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
    axiosInstance
      .post(`${backendHost}/api/auth/logout`)
      .then((res) => {
        removeLocal();
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
    removeLocal();
  };

  // // Check if user is logged in
  const checkUserLoggedIn = async () => {
    if (typeof window !== 'undefined') {
      if (user) {
        axiosInstance.get(`${backendHost}/api/auth/validate`).catch((error) => {
          removeLocal();
          logout()
        });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}