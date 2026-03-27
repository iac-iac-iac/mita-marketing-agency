/**
 * Валидация переменных окружения
 * Вызывается при старте приложения в development режиме
 */

type EnvValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

/**
 * Проверка валидности URL
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Проверка валидности email
 */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Основная функция валидации
 */
export function validateEnv(): EnvValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // ===========================================================================
  // ОБЯЗАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ
  // ===========================================================================

  // NEXT_PUBLIC_SITE_URL
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    errors.push('NEXT_PUBLIC_SITE_URL не установлена');
  } else if (!isValidUrl(process.env.NEXT_PUBLIC_SITE_URL)) {
    errors.push('NEXT_PUBLIC_SITE_URL должна быть валидным URL');
  }

  // BITRIX24_WEBHOOK_URL (предупреждение, если не установлена)
  if (!process.env.BITRIX24_WEBHOOK_URL) {
    warnings.push('BITRIX24_WEBHOOK_URL не установлена (интеграция с CRM не будет работать)');
  } else if (!isValidUrl(process.env.BITRIX24_WEBHOOK_URL)) {
    errors.push('BITRIX24_WEBHOOK_URL должна быть валидным URL');
  }

  // ===========================================================================
  // ОПЦИОНАЛЬНЫЕ ПЕРЕМЕННЫЕ — ПРОВЕРКА ФОРМАТА
  // ===========================================================================

  // NEXT_PUBLIC_GA_ID
  if (process.env.NEXT_PUBLIC_GA_ID) {
    if (!/^G-[A-Z0-9]{10}$/i.test(process.env.NEXT_PUBLIC_GA_ID)) {
      warnings.push('NEXT_PUBLIC_GA_ID имеет неверный формат (ожидается G-XXXXXXXXXX)');
    }
  }

  // NEXT_PUBLIC_YANDEX_METRIKA_ID
  if (process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) {
    if (!/^\d{8,10}$/.test(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID!)) {
      warnings.push('NEXT_PUBLIC_YANDEX_METRIKA_ID должна содержать 8-10 цифр');
    }
  }

  // SMTP переменные (все или ничего)
  const smtpVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'] as const;
  const smtpSet = smtpVars.filter((v) => process.env[v]);

  if (smtpSet.length > 0 && smtpSet.length < smtpVars.length) {
    const missing = smtpVars.filter((v) => !process.env[v]);
    warnings.push(`Настроены не все SMTP переменные: ${missing.join(', ')}`);
  }

  // EMAIL адреса
  if (process.env.EMAIL_FROM && !isValidEmail(process.env.EMAIL_FROM)) {
    errors.push('EMAIL_FROM должна быть валидным email адресом');
  }

  if (process.env.EMAIL_TO && !isValidEmail(process.env.EMAIL_TO)) {
    errors.push('EMAIL_TO должна быть валидным email адресом');
  }

  // ===========================================================================
  // РЕЗУЛЬТАТ
  // ===========================================================================

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Логирование результатов валидации
 */
export function logEnvValidation(): void {
  const result = validateEnv();

  if (result.warnings.length > 0) {
    console.warn('\n⚠️  Предупреждения конфигурации:');
    result.warnings.forEach((w) => console.warn(`   - ${w}`));
  }

  if (result.errors.length > 0) {
    console.error('\n❌ Ошибки конфигурации:');
    result.errors.forEach((e) => console.error(`   - ${e}`));
    console.error('\nПриложение не может быть запущено с некорректной конфигурацией.');
    console.error('Исправьте ошибки и перезапустите сервер.\n');

    // В development режиме выбрасываем ошибку
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`Конфигурация содержит ошибки: ${result.errors.join(', ')}`);
    }
  }

  if (result.valid && result.warnings.length === 0) {
    console.log('\n✅ Конфигурация проверена без ошибок\n');
  }
}
