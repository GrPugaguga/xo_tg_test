'use client'; 

import Board from './components/Board';
import { useTelegram } from './providers/TelegramUserProvider';

export default function Home() {
  const { telegramUser } = useTelegram();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 pt-20 sm:p-12 sm:pt-32 md:p-18 lg:p-24">
      <h1 className="text-4xl font-bold mb-8">
        Крестики-нолики
      </h1>
      <Board telegramUser={telegramUser} />
    </main>
  );
}

