'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createProxy,
  deleteProxy,
  updateProxy,
  type ProxyInput,
} from '@/lib/cms/db-proxies';
import { recordProxyCheck } from '@/lib/cms/db-proxies';
import { sendTelegramMessage } from '@/lib/integrations/telegram';

function parseProxyInput(formData: FormData): ProxyInput {
  return {
    name: String(formData.get('name') ?? '').trim(),
    url: String(formData.get('url') ?? '').trim(),
    is_enabled: formData.get('is_enabled') === 'on',
    priority: parseInt(String(formData.get('priority') ?? '0'), 10) || 0,
  };
}

export async function createProxyAction(formData: FormData) {
  const input = parseProxyInput(formData);
  if (!input.name || !input.url) {
    throw new Error('Заполните название и URL прокси');
  }
  createProxy(input);
  revalidatePath('/admin/proxies');
  redirect('/admin/proxies');
}

export async function updateProxyAction(id: number, formData: FormData) {
  const input = parseProxyInput(formData);
  if (!input.name || !input.url) {
    throw new Error('Заполните название и URL прокси');
  }
  updateProxy(id, input);
  revalidatePath('/admin/proxies');
  redirect('/admin/proxies');
}

export async function deleteProxyAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (id) {
    deleteProxy(id);
    revalidatePath('/admin/proxies');
  }
}

export type TelegramTestResult = {
  ok: boolean;
  message: string;
  proxyUrl?: string | null;
};

export async function sendTelegramTestAction(): Promise<TelegramTestResult> {
  const text =
    '✅ Тест М.И.Т.А.\nБот и канал настроены корректно.\nСообщение отправлено из админки /admin/proxies.';

  const result = await sendTelegramMessage(text);

  if (result.proxyId) {
    recordProxyCheck(result.proxyId, result.ok, result.error || '');
  }

  if (result.ok) {
    const via = result.proxyUrl
      ? `через прокси: ${result.proxyUrl}`
      : 'напрямую (без прокси)';
    return {
      ok: true,
      message: `Сообщение доставлено ${via}.`,
      proxyUrl: result.proxyUrl,
    };
  }

  return {
    ok: false,
    message: result.error || 'Не удалось отправить сообщение',
    proxyUrl: result.proxyUrl,
  };
}
