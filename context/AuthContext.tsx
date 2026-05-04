import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  memberId?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setSession: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedToken = await AsyncStorage.getItem('token');
        if (storedUser && storedToken) {
          setUserState(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to load session:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  const setSession = async (newUser: User, newToken: string) => {
    setUserState(newUser);
    setToken(newToken);
    try {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      await AsyncStorage.setItem('token', newToken);
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  };

  const setUser = async (newUser: User | null) => {
    setUserState(newUser);
    try {
      if (newUser) {
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
      } else {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
        setToken(null);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const logout = async () => {
    setUserState(null);
    setToken(null);
    try {
      await AsyncStorage.multiRemove(['user', 'token']);
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setSession, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
