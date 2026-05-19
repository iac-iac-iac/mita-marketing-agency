import { fetchWithProxies } from '@/lib/integrations/proxy-fetch';

export function normalizeTelegramChatId(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith('-')) return trimmed;
  if (/^\d+$/.test(trimmed)) {
    return `-100${trimmed}`;
  }
  return trimmed;
}

export type TelegramSendResult = {
  ok: boolean;
  proxyId: number | null;
  proxyUrl: string | null;
  error?: string;
};

export async function sendTelegramMessage(
  text: string
): Promise<TelegramSendResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatRaw = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token) {
    return { ok: false, proxyId: null, proxyUrl: null, error: 'TELEGRAM_BOT_TOKEN не задан' };
  }
  if (!chatRaw) {
    return { ok: false, proxyId: null, proxyUrl: null, error: 'TELEGRAM_CHAT_ID не задан' };
  }

  const chatId = normalizeTelegramChatId(chatRaw);
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const { response, proxyId, proxyUrl } = await fetchWithProxies(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });

    const body = await response.json().catch(() => ({})) as {
      ok?: boolean;
      description?: string;
    };

    if (!response.ok || !body.ok) {
      return {
        ok: false,
        proxyId,
        proxyUrl,
        error: body.description || `HTTP ${response.status}`,
      };
    }

    return { ok: true, proxyId, proxyUrl };
  } catch (err) {
    return {
      ok: false,
      proxyId: null,
      proxyUrl: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export function formatLeadTelegramMessage(data: {
  form_name: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  message?: string;
  service?: string;
  leadId?: number;
}): string {
  const lines = [
    '🆕 Новая заявка с сайта',
    `Источник: ${data.form_name}`,
    `Имя: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Email: ${data.email}`,
  ];
  if (data.company) lines.push(`Компания: ${data.company}`);
  if (data.service) lines.push(`Услуга: ${data.service}`);
  if (data.message) lines.push(`Сообщение: ${data.message}`);
  if (data.leadId) lines.push(`ID в базе: ${data.leadId}`);
  return lines.join('\n');
}
