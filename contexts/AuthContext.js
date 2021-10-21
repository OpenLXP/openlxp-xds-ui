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
    // setUser(userData);
    setError(null);
    setLocal(userData);
    // if (typeof window !== 'undefined') {
    // window.localStorage.setItem('user', JSON.stringify(userData));
    // }

    // setIsLoading(true);
    // axios
    //   .post(authRegister, credentials)
    //   .then((res) => {
    //     setUser(res.data);
    //     if (typeof window !== 'undefined') {
    //       window.localStorage.setItem('user', JSON.stringify(res.data));
    //     }
    //     setIsLoading(false);
    //     router.push('/');
    //   })
    //   .catch((error) => {
    //     setUser({});
    //     setError(error);
    //     setIsLoading(false);
    //   });
  };

  // Login user
  const login = (userData) => {
    // setUser(userData);
    setError(null);
    setLocal(userData);
    // if (typeof window !== 'undefined') {
    //   window.localStorage.setItem('user', JSON.stringify(userData));
    // }
    // setIsLoading(true);
    // axios
    //   .post(authLogin, { username, password })
    //   .then((res) => {
    //     setUser(res.data);
    //     if (typeof window !== 'undefined') {
    //       window.localStorage.setItem('user', JSON.stringify(res.data));
    //     }
    //     setIsLoading(false);
    //     router.push('/');
    //   })
    //   .catch((error) => {
    //     setUser({});
    //     setError(error);
    //     setIsLoading(false);
    //   });
  };

  // Logout user
  const logout = async () => {
    // if (typeof window !== 'undefined') {
    //   window.localStorage.removeItem('user');
    //   // setUser(null);
    // }
    removeLocal();
  };

  // // Check if user is logged in
  // const checkUserLoggedIn = async () => {
  //   if (typeof window !== 'undefined') {
  //     const jsonData = window.localStorage.getItem('user2');

  //     // if there is local user data
  //     if (jsonData) {
  //       const userData = JSON.parse(jsonData);
  //       // verify the token works
  //       axios
  //         .get(interestLists + 'owned', {
  //           headers: { Authorization: 'Token ' + userData.token },
  //         })
  //         .then((res) => {
  //           setUser(JSON.parse(jsonData));
  //           setLocal(jsonData)
  //         })
  //         .catch((error) => {
  //           // setUser( null );
  //           removeLocal()
  //           router.push('/');
  //         });
  //     } else removeLocal();
  //   }
  // };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
