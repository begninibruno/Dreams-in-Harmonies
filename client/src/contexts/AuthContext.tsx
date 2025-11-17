import React, { createContext, useEffect, useState } from 'react';

type User = {
  name: string;
  email?: string;
  initials?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const computeInitials = (name?: string) => {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0]?.toUpperCase() ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0]?.toUpperCase() : '';
  return `${first}${last}` || name.slice(0, 2).toUpperCase();
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('token');
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem('auth_user', JSON.stringify(user));
      else localStorage.removeItem('auth_user');
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      if (token) localStorage.setItem('token', token);
      else localStorage.removeItem('token');
    } catch {}
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch('https://api-users-tb6b.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, key: password }),
    });
    const text = await res.text();
    let parsed: any = {};
    try {
      parsed = text ? JSON.parse(text) : {};
    } catch {
      parsed = { text };
    }
    if (!res.ok) throw new Error(parsed.error || parsed.message || parsed.text || 'Erro no login');
    if (parsed.token) setToken(parsed.token);

    // Determine name from response when available, otherwise fallback to local heuristics
    const name = parsed.name || parsed.user?.name || email.split('@')[0];
    const u: User = { name, email, initials: computeInitials(name) };
    setUser(u);
    return u;
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await fetch('https://api-users-tb6b.onrender.com/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, key: password }),
    });
    const text = await res.text();
    let parsed: any = {};
    try {
      parsed = text ? JSON.parse(text) : {};
    } catch {
      parsed = { text };
    }
    if (!res.ok) throw new Error(parsed.error || parsed.message || parsed.text || 'Erro no cadastro');
    // do not auto-login; return and let the caller redirect to /login
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
