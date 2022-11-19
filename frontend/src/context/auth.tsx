import React, { useState, useContext, createContext } from 'react';

type UserContextProps = {
  children: React.ReactNode
}

interface AppContext {
  "user": {
    "id": number,
    "username": string,
    "account": {
      "id": number,
      "balance": number
    }
  },
  "token": string
}

type dateUser = {
  "id": number,
  "username": string,
  "account": {
    "id": number,
    "balance": number
  }
}

export const AuthContext = createContext<AppContext | null>(null);

function AuthProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<dateUser>();
  const [token, setToken] = useState('');

  function signInContext(username: string, password: string, tokenAuth: string, dateUser: dateUser) {
    if (username !== '' && password !== '') {
      setUser(dateUser);

      setToken(tokenAuth);
    }
  }

  return (
    <AuthContext.Provider value={{ token: token }}>
      {children}
    </AuthContext.Provider>
  )
}