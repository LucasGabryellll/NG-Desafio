import React, { useEffect, useState, createContext } from 'react';

type UserContextProps = {
  children: React.ReactNode
}

export type AuthUser = {
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

export type tokenContext = {
  token: string
}

type UserContextType = {
  user: AuthUser | null
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null >>
  signInContext: (username: string, password: string, dateUser: AuthUser, token:tokenContext ) => void
  token: tokenContext | null
  setToken: React.Dispatch<React.SetStateAction<tokenContext | null >>
  loading: boolean
  logout: () => void
}

export const AuthContext = createContext<UserContextType | null>(null);

function AuthProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<tokenContext | null>(null);
  const [loading, setLoading] = useState(true);

  function signInContext(username: string, password: string, dateUser: AuthUser, token:tokenContext ) {
    if (username !== '' && password !== '') {
      setUser(dateUser);

      setToken(token)
      
      localStorage.setItem("user", JSON.stringify(dateUser));
      localStorage.setItem("token", JSON.stringify(token));

      setLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  }
  
  useEffect(() => {
    // Faz a permanência do usuário na aplicação
    const recoveredUser = localStorage.getItem("user");
    const recoveredToken = localStorage.getItem("token");
    
    if (recoveredUser && recoveredToken) {
      setUser(JSON.parse(recoveredUser));
      setToken(JSON.parse(recoveredToken));
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, signInContext, token, setToken, loading, logout }}>
      {children}
    </AuthContext.Provider>

  )
}

export default AuthProvider;