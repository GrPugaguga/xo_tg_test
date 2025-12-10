import Board from './components/Board';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-18 lg:p-24">
      <h1 className="absolute top-12 sm:top-24 text-4xl font-bold">
        Крестики-нолики
      </h1>
      <Board />
    </main>
  );
}

