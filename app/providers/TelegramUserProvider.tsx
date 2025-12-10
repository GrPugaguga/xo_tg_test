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

interface TelegramContextType {
  telegramUser: TelegramUser | null;
  initData: string | null;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [initData, setInitData] = useState<string | null>(null);

  useEffect(() => {
    let initDataString: string | null = null;

    if (typeof window !== 'undefined') {
      if (window.Telegram?.WebApp?.initData) {
        initDataString = window.Telegram.WebApp.initData;
      } 
      else {
        const hash = window.location.hash.slice(1);
        const params = new URLSearchParams(hash);
        initDataString = params.get('tgWebAppData');
      }
    }

    if (initDataString) {
      setInitData(initDataString);
      try {
        const params = new URLSearchParams(initDataString);
        const userParam = params.get('user');
        if (userParam) {
          const user = JSON.parse(decodeURIComponent(userParam));
          setTelegramUser(user);
        }
      } catch (error) {
        console.error("Failed to parse user data from initData:", error);
      }
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ telegramUser, initData }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
};
