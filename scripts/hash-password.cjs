#!/usr/bin/env node

/**
 * Скрипт для генерации хеша пароля администратора
 * Использование: npm run hash-password <ваш-пароль>
 */

const bcrypt = require('bcryptjs');

async function main() {
  const password = process.argv[2];

  if (!password) {
    console.error('❌ Ошибка: укажите пароль');
    console.error('Использование: npm run hash-password <ваш-пароль>');
    process.exit(1);
  }

  if (password.length < 6) {
    console.error('❌ Ошибка: пароль должен быть не менее 6 символов');
    process.exit(1);
  }

  // Генерируем хеш
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  console.log('\n✅ Хеш пароля сгенерирован!\n');
  console.log('Добавьте эту строку в .env.local:\n');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log('\nНе забудьте изменить пароль по умолчанию!\n');
}

main();
