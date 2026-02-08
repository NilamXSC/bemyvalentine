import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserData {
  hisName: string;
  herName: string;
  hisNickname: string;
  herNickname: string;
  isLoggedIn: boolean;
}

interface UserContextType {
  user: UserData | null;
  isLoading: boolean;
  login: (userData: Omit<UserData, 'isLoggedIn'>) => void;
  logout: () => void;
  setSharedUser: (userData: UserData) => void;
  isSharedExperience: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSharedExperience, setIsSharedExperience] = useState(false);

  useEffect(() => {
    // Check if this is a shared experience URL
    const isShared = window.location.pathname.startsWith('/v/');
    setIsSharedExperience(isShared);
    
    if (!isShared) {
      const saved = localStorage.getItem('valentineUser');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: Omit<UserData, 'isLoggedIn'>) => {
    const newUser = { ...userData, isLoggedIn: true };
    setUser(newUser);
    localStorage.setItem('valentineUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsSharedExperience(false);
    localStorage.removeItem('valentineUser');
    localStorage.removeItem('valentineSelections');
  };

  // Set user data from a shared link (doesn't persist to localStorage)
  const setSharedUser = (userData: UserData) => {
    setUser(userData);
    setIsSharedExperience(true);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, setSharedUser, isSharedExperience }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
