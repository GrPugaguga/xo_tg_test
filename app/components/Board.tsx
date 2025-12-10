'use client';

import React, { useState, useEffect, useCallback } from 'react';
import X_icon from './X_icon';
import O_icon from './O_icon';
import WinnerPopup from './WinnerPopup'; 
import { useAiMove, calculateWinner } from '../hooks/use-ai-move';

type Player = 'X' | 'O';
type BoardState = (Player | null)[];

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

interface BoardProps {
  telegramUser: TelegramUser | null;
}

const Cell = ({ value, onClick }: { value: Player | null; onClick: () => void }) => {
  return (
    <div
      className="border-2 border-gray-400 rounded-lg flex items-center justify-center cursor-pointer aspect-square p-4"
      onClick={onClick}
    >
      {value === 'X' && <X_icon />}
      {value === 'O' && <O_icon />}
    </div>
  );
};

const Board = ({ telegramUser }: BoardProps) => { 
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const makeMove = useCallback((index: number, player: Player) => {
    setBoard(prevBoard => {
      if (prevBoard[index] || winner) return prevBoard;
      const newBoard = prevBoard.slice();
      newBoard[index] = player;
      return newBoard;
    });
    setCurrentTurn(player === 'X' ? 'O' : 'X');
  }, [winner]);

  const aiMove = useAiMove(board, makeMove); 

  const startGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsDraw(false);
    setCurrentTurn(Math.random() < 0.5 ? 'X' : 'O');
    setIsPopupOpen(false); 
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    const currentWinner = calculateWinner(board);
    if (currentWinner) {
      setWinner(currentWinner);
      if (currentWinner === 'X') {
        setIsPopupOpen(true); 
        if (telegramUser) { 
          fetch('/api/promo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: telegramUser.id,
              message: `Поздравляем ${telegramUser.first_name || ''}! Вы выиграли промокод!`, 
              initData: window.Telegram?.WebApp.initData 
            }),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Promocode API response:', data);
          })
          .catch(error => {
            console.error('Error sending promocode:', error);
          });
        }
      }
    } else if (board.every(cell => cell !== null)) {
      setIsDraw(true);
    } else if (currentTurn === 'O' && !winner && !isDraw) {
      const timer = setTimeout(() => {
        aiMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [board, currentTurn, winner, isDraw, aiMove, telegramUser]); 

  const handleClick = (i: number) => {
    if (currentTurn === 'X' && !winner && !isDraw && board[i] === null) {
      makeMove(i, 'X');
    }
  };

  let status;
  if (winner) {
    status = `Победитель: ${winner}`;
  } else if (isDraw) {
    status = 'Ничья!';
  } else {
    const playerName = telegramUser?.first_name || 'Игрок'; 
    status = `Следующий ход: ${currentTurn === 'X' ? playerName : 'Компьютер'}`;
  }

  return (
    <div className="flex flex-col items-center w-full">
      {isPopupOpen && <WinnerPopup onClose={startGame} />}
      <div className="text-xl font-semibold mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
        {board.map((cell, i) => (
          <Cell key={i} value={cell} onClick={() => handleClick(i)} />
        ))}
      </div>
      <button
        className="mt-6 min-h-[44px] px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={startGame}
        disabled={!winner && !isDraw}
      >
        Начать заново
      </button>
    </div>
  );
};

export default Board;
