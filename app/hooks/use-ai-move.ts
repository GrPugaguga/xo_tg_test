import { useCallback } from 'react';

type Player = 'X' | 'O';
type BoardState = (Player | null)[];
type MakeMoveFunction = (index: number, player: Player) => void;

export const calculateWinner = (board: BoardState): Player | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export const useAiMove = (board: BoardState, makeMove: MakeMoveFunction) => {
  const aiMove = useCallback(() => {
    const availableMoves = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];

    if (Math.random() < 0.4) {
      if (availableMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        makeMove(availableMoves[randomIndex], 'O');
        return;
      }
    }

    const findWinningMove = (currentBoard: BoardState, player: Player) => {
      for (let i = 0; i < availableMoves.length; i++) {
        const move = availableMoves[i];
        const tempBoard = currentBoard.slice();
        tempBoard[move] = player;
        if (calculateWinner(tempBoard) === player) {
          return move;
        }
      }
      return null;
    };

    let move = findWinningMove(board, 'O');
    if (move !== null) {
      makeMove(move, 'O');
      return;
    }

    move = findWinningMove(board, 'X');
    if (move !== null) {
      makeMove(move, 'O');
      return;
    }

    if (board[4] === null) {
      makeMove(4, 'O');
      return;
    }

    const corners = [0, 2, 6, 8].filter(idx => board[idx] === null);
    if (corners.length > 0) {
      const randomCorner = corners[Math.floor(Math.random() * corners.length)];
      makeMove(randomCorner, 'O');
      return;
    }

    if (availableMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      makeMove(availableMoves[randomIndex], 'O');
    }
  }, [board, makeMove]);

  return aiMove;
};
