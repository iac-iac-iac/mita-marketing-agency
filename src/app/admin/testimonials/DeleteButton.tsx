'use client';

export default function DeleteButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="text-red-400 hover:text-red-300 text-sm"
      onClick={(e) => {
        if (!confirm(`Удалить отзыв "${label}"?`)) {
          e.preventDefault();
        }
      }}
    >
      Удалить
    </button>
  );
}
