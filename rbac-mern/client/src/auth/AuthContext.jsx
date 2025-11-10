import { createContext, useContext, useState } from 'react';
import http from '../api/http';

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const { data } = await http.post('/auth/login', { email, password });
    setUser(data.user);
  };

  const logout = async () => {
    await http.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
