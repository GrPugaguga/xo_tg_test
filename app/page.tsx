'use client'; 

import Board from './components/Board';
import { useTelegram } from './providers/TelegramUserProvider';

export default function Home() {
  const { telegramUser, initData } = useTelegram();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-18 lg:p-24">
      <h1 className="absolute top-20 sm:top-32 text-4xl font-bold">
        Крестики-нолики
      </h1>
      <Board telegramUser={telegramUser} />
    </main>
  );
}

