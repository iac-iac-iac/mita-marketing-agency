/**
 * Тесты для API endpoint /api/submit-lead
 * 
 * Запуск: npm test -- submit-lead
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { POST } from '@/app/api/submit-lead/route';
import { NextRequest } from 'next/server';

// Моки для NextRequest
function createMockRequest(body: Record<string, unknown>, headers: Record<string, string> = {}) {
  return {
    json: async () => body,
    headers: {
      get: (key: string) => headers[key] || null,
    },
  } as unknown as NextRequest;
}

describe('POST /api/submit-lead', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Валидация запроса', () => {
    it('должен вернуть ошибку при отсутствии обязательных полей', async () => {
      const request = createMockRequest({
        name: 'Test',
        // phone отсутствует
        email: 'test@example.com',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('валидации');
    });

    it('должен принять корректные данные', async () => {
      const request = createMockRequest(
        {
          name: 'Иван Иванов',
          phone: '+7 (999) 123-45-67',
          email: 'test@example.com',
          form_name: 'contact_form',
        },
        { origin: 'http://localhost:3000' }
      );

      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it('должен отклонить запрос с некорректным email', async () => {
      const request = createMockRequest(
        {
          name: 'Иван Иванов',
          phone: '+7 (999) 123-45-67',
          email: 'invalid-email',
          form_name: 'contact_form',
        },
        { origin: 'http://localhost:3000' }
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.details).toBeDefined();
    });

    it('должен отклонить запрос с некорректным телефоном', async () => {
      const request = createMockRequest(
        {
          name: 'Иван Иванов',
          phone: '123',
          email: 'test@example.com',
          form_name: 'contact_form',
        },
        { origin: 'http://localhost:3000' }
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.details).toBeDefined();
    });
  });

  describe('CSRF защита', () => {
    it('должен отклонить запрос с некорректным origin', async () => {
      const request = createMockRequest(
        {
          name: 'Иван Иванов',
          phone: '+7 (999) 123-45-67',
          email: 'test@example.com',
          form_name: 'contact_form',
        },
        { origin: 'https://evil.com' }
      );

      const response = await POST(request);

      expect(response.status).toBe(403);
    });

    it('должен принять запрос с корректным origin', async () => {
      const request = createMockRequest(
        {
          name: 'Иван Иванов',
          phone: '+7 (999) 123-45-67',
          email: 'test@example.com',
          form_name: 'contact_form',
        },
        { origin: 'http://localhost:3000' }
      );

      const response = await POST(request);

      expect(response.status).not.toBe(403);
    });
  });

  describe('Rate limiting', () => {
    it('должен вернуть 429 при превышении лимита', async () => {
      // Создаём 11 запросов подряд
      const requests = Array(11).fill(null).map(() =>
        createMockRequest(
          {
            name: 'Иван Иванов',
            phone: '+7 (999) 123-45-67',
            email: 'test@example.com',
            form_name: 'contact_form',
          },
          { origin: 'http://localhost:3000' }
        )
      );

      // Первые 10 должны пройти
      for (let i = 0; i < 10; i++) {
        const response = await POST(requests[i]);
        expect(response.status).not.toBe(429);
      }

      // 11-й должен быть отклонён
      const response = await POST(requests[10]);

      expect(response.status).toBe(429);
    });
  });

  describe('UTM метки', () => {
    it('должен сохранить UTM метки', async () => {
      const request = createMockRequest(
        {
          name: 'Иван Иванов',
          phone: '+7 (999) 123-45-67',
          email: 'test@example.com',
          form_name: 'contact_form',
          utm_source: 'google',
          utm_medium: 'cpc',
          utm_campaign: 'spring_sale',
        },
        { origin: 'http://localhost:3000' }
      );

      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it('должен обработать запрос без UTM меток', async () => {
      const request = createMockRequest(
        {
          name: 'Иван Иванов',
          phone: '+7 (999) 123-45-67',
          email: 'test@example.com',
          form_name: 'contact_form',
        },
        { origin: 'http://localhost:3000' }
      );

      const response = await POST(request);

      expect(response.status).toBe(200);
    });
  });

  describe('Валидация Bitrix24 webhook URL', () => {
    it('должен обработать некорректный webhook URL', async () => {
      // Сохраняем оригинальное значение
      const originalWebhook = process.env.BITRIX24_WEBHOOK_URL;

      // Устанавливаем некорректный URL
      process.env.BITRIX24_WEBHOOK_URL = 'invalid-url';

      const request = createMockRequest(
        {
          name: 'Иван Иванов',
          phone: '+7 (999) 123-45-67',
          email: 'test@example.com',
          form_name: 'contact_form',
        },
        { origin: 'http://localhost:3000' }
      );

      const response = await POST(request);

      // Запрос должен пройти (ошибка webhook логируется, но не блокирует)
      expect(response.status).toBe(200);

      // Восстанавливаем оригинальное значение
      process.env.BITRIX24_WEBHOOK_URL = originalWebhook;
    });
  });
});
