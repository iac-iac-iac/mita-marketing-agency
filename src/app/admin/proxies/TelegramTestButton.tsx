'use client';

import { useState, useTransition } from 'react';
import { sendTelegramTestAction, type TelegramTestResult } from './actions';

export default function TelegramTestButton() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<TelegramTestResult | null>(null);

  const handleClick = () => {
    setResult(null);
    startTransition(async () => {
      const res = await sendTelegramTestAction();
      setResult(res);
    });
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 disabled:opacity-50 text-white font-medium rounded-xl transition-colors"
      >
        {pending ? 'Отправка…' : 'Отправить тестовое сообщение'}
      </button>
      {result && (
        <p
          className={`mt-4 text-sm ${result.ok ? 'text-green-400' : 'text-red-400'}`}
          role="status"
        >
          {result.message}
        </p>
      )}
    </div>
  );
}
