import React, { useContext } from 'react';
import { useLocalStorage } from '../shared/useLocalStorage';
import jwt_decode from 'jwt-decode';
import { apiUrl } from '../shared/config';

const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
  const [contextValue, setContextValue, onLogout] = useLocalStorage(
    'authContext',
    {
      token: null,
      user: null,
    }
  );

  async function onLogin(token) {
    const { sub: userId } = jwt_decode(token);

    const user = await fetch(`${apiUrl}/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    const newValue = {
      token,
      user: {
        firstName: user.firstName,
      },
    };
    setContextValue(newValue);
  }

  const value = { ...contextValue, onLogin, onLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      'Please use the Auth Context inside the AuthContextProvider!'
    );
  }
  return context;
}
