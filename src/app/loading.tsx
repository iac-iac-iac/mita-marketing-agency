export default function Loading() {
  return (
    <div className="min-h-screen bg-direct-dark flex items-center justify-center">
      <div className="text-center">
        {/* Спиннер */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          {/* Внешнее кольцо */}
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          {/* Вращающееся кольцо */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-direct-primary border-r-direct-primary/50 animate-spin" />
          {/* Внутреннее кольцо */}
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-direct-accent/50 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        </div>

        {/* Текст */}
        <p className="text-gray-300 text-lg">
          Загрузка...
        </p>

        {/* Прогресс-бар */}
        <div className="w-48 h-1 bg-white/10 rounded-full mx-auto mt-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-direct-primary to-direct-accent rounded-full animate-pulse" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
}
