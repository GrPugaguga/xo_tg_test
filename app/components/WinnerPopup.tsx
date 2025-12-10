import React, { useEffect, useState } from 'react';

type WinnerPopupProps = {
  onClose: () => void;
};

const WinnerPopup = ({ onClose }: WinnerPopupProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
        isMounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white p-8 rounded-lg shadow-xl text-center transform transition-all duration-300 ease-in-out ${
          isMounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Вы победили!</h2>
        <p className="mb-6">Ваш промокод отправлен в Телеграм.</p>
        <button
          className="px-4 py-2 min-h-[44px] bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          onClick={onClose}
        >
          Закрыть и начать заново
        </button>
      </div>
    </div>
  );
};

export default WinnerPopup;
