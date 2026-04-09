import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { z } from 'zod';

// Простой in-memory rate limiter (для production использовать Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 минута
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 запросов в минуту

/**
 * Проверка rate limiting
 */
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // Новый窗口
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
}

/**
 * Очистка старых записей rate limiter (каждую минуту)
 */
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 60 * 1000);

/**
 * Zod схема валидации для лидов
 */
const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(100, 'Имя слишком длинное')
    .regex(/^[\p{L}\s'-]+$/u, 'Имя должно содержать только буквы'),
  
  phone: z
    .string()
    .min(10, 'Телефон должен содержать минимум 10 символов')
    .max(20, 'Телефон слишком длинный')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Некорректный формат телефона'),
  
  email: z
    .string()
    .email('Некорректный формат email')
    .max(255, 'Email слишком длинный'),
  
  company: z
    .string()
    .max(200, 'Название компании слишком длинное')
    .optional()
    .or(z.literal('')),
  
  message: z
    .string()
    .max(2000, 'Сообщение слишком длинное')
    .optional()
    .or(z.literal('')),
  
  service: z
    .string()
    .max(100, 'Название услуги слишком длинное')
    .optional()
    .or(z.literal('')),
  
  utm_source: z
    .string()
    .max(100, 'Некорректный UTM источник')
    .optional()
    .or(z.literal('')),
  
  utm_medium: z
    .string()
    .max(100, 'Некорректный UTM канал')
    .optional()
    .or(z.literal('')),
  
  utm_campaign: z
    .string()
    .max(200, 'Некорректная UTM кампания')
    .optional()
    .or(z.literal('')),

  utm_content: z
    .string()
    .max(200, 'Некорректный UTM контент')
    .optional()
    .or(z.literal('')),

  utm_term: z
    .string()
    .max(200, 'Некорректный UTM термин')
    .optional()
    .or(z.literal('')),
  
  form_name: z
    .string()
    .min(1, 'Название формы обязательно')
    .max(100, 'Название формы слишком длинное'),
  
  timestamp: z
    .string()
    .optional()
    .or(z.literal('')),
  
  // Скрытые поля для защиты от CSRF
  origin: z
    .string()
    .url('Некорректный origin')
    .optional()
    .or(z.literal('')),
});

type LeadInput = z.infer<typeof leadSchema>;

/**
 * Получение IP адреса клиента
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  return 'unknown';
}

/**
 * Проверка Origin заголовка для CSRF защиты
 */
function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  
  if (!origin) {
    // Для не-browser запросов разрешаем
    return true;
  }

  try {
    const originUrl = new URL(origin);
    const hostUrl = new URL(`https://${host}`);
    
    // Разрешаем только запросы с того же домена
    return originUrl.hostname === hostUrl.hostname;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. CSRF защита - проверка Origin
    if (!validateOrigin(request)) {
      console.error('CSRF: Invalid origin detected');
      return NextResponse.json(
        { error: 'Запрос заблокирован по соображениям безопасности' },
        { status: 403 }
      );
    }

    // 2. Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Слишком много запросов. Попробуйте через минуту',
          retryAfter: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
          }
        }
      );
    }

    // 3. Парсинг JSON тела
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Некорректный формат данных' },
        { status: 400 }
      );
    }

    // 4. Валидация Zod схемой
    const validationResult = leadSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      console.error('Validation errors:', errors);

      return NextResponse.json(
        {
          error: 'Ошибка валидации данных',
          details: errors
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 5. Сохранение в SQLite
    let leadId: number | null = null;
    try {
      const { createLead } = await import('@/lib/cms/db-leads');
      const lead = createLead({
        form_name: data.form_name,
        name: data.name,
        phone: data.phone,
        email: data.email,
        company: data.company,
        message: data.message,
        service: data.service,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        utm_content: data.utm_content,
        utm_term: data.utm_term,
      });
      leadId = lead.id;
    } catch (dbError) {
      console.error('Failed to save lead to database:', dbError);
    }

    // 7. Отправка в Bitrix24 (если настроен webhook)
    if (process.env.BITRIX24_WEBHOOK_URL) {
      try {
        // Валидация URL webhook
        let webhookUrl: string;
        try {
          webhookUrl = process.env.BITRIX24_WEBHOOK_URL.trim();
          new URL(webhookUrl); // Проверяем валидность URL
        } catch (urlError) {
          console.error('Bitrix24 webhook URL is invalid:', urlError);
          throw new Error('Некорректный URL Bitrix24 webhook');
        }

        const bitrixPayload = {
          fields: {
            TITLE: `Заявка с сайта: ${data.form_name}`,
            NAME: data.name,
            PHONE: [{ VALUE: data.phone, VALUE_TYPE: 'WORK' }],
            EMAIL: [{ VALUE: data.email, VALUE_TYPE: 'WORK' }],
            COMPANY_TITLE: data.company || undefined,
            COMMENTS: data.message || undefined,
            UTMSOURCE: data.utm_source || undefined,
            UTMEDIUM: data.utm_medium || undefined,
            UTMCAMPAIGN: data.utm_campaign || undefined,
          },
          params: { REGISTER_SON_EVENT: 'Y' },
        };

        // Создаём AbortController для timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 секунд timeout

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bitrixPayload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Bitrix24 API error:', response.status, errorText);
        } else {
          console.log('Lead sent to Bitrix24 successfully');
        }
      } catch (bitrixError) {
        if (bitrixError instanceof Error && bitrixError.name === 'AbortError') {
          console.error('Bitrix24 request timeout (5s)');
        } else {
          console.error('Failed to send lead to Bitrix24:', bitrixError);
        }
      }
    } else {
      console.log('Bitrix24 webhook not configured (BITRIX24_WEBHOOK_URL)');
    }

    // 8. Успешный ответ
    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена',
        rateLimit: {
          remaining: rateLimit.remaining,
          limit: RATE_LIMIT_MAX_REQUESTS,
        }
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX_REQUESTS),
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        }
      }
    );
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
