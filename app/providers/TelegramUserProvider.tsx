'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

interface TelegramUserContextType {
  telegramUser: TelegramUser | null;
}

const TelegramUserContext = createContext<TelegramUserContextType | undefined>(undefined);

interface TelegramUserProviderProps {
  children: ReactNode;
}

export const TelegramUserProvider = ({ children }: TelegramUserProviderProps) => {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      try {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user) {
          setTelegramUser(user as TelegramUser);
        }
      } catch (error) {
        console.error("Error accessing Telegram WebApp user data:", error);
      }
    }
  }, []);

  return (
    <TelegramUserContext.Provider value={{ telegramUser }}>
      {children}
    </TelegramUserContext.Provider>
  );
};

export const useTelegramUser = () => {
  const context = useContext(TelegramUserContext);
  if (context === undefined) {
    throw new Error('useTelegramUser must be used within a TelegramUserProvider');
  }
  return context;
};
