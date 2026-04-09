'use client';

import { useFormStatus } from 'react-dom';

export default function DeleteButton({ label, type }: { label: string; type: 'статью' | 'кейс' }) {
  return (
    <button
      type="submit"
      className="text-red-400 hover:text-red-300 text-sm"
      onClick={(e) => {
        if (!confirm(`Удалить ${type} "${label}"?`)) {
          e.preventDefault();
        }
      }}
    >
      Удалить
    </button>
  );
}
