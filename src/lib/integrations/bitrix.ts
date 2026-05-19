export type BitrixLeadPayload = {
  form_name: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

function buildLeadAddUrl(webhookBase: string): string {
  const base = webhookBase.trim().replace(/\/+$/, '');
  if (base.endsWith('.json')) return base;
  if (base.endsWith('crm.lead.add')) return `${base}.json`;
  return `${base}/crm.lead.add.json`;
}

export async function sendLeadToBitrix(
  data: BitrixLeadPayload
): Promise<{ ok: boolean; bitrixId?: number; error?: string }> {
  const webhookBase = process.env.BITRIX24_WEBHOOK_URL?.trim();
  if (!webhookBase) {
    return { ok: false, error: 'BITRIX24_WEBHOOK_URL не задан' };
  }

  const assignedRaw = process.env.BITRIX24_ASSIGNED_BY_ID?.trim();
  const assignedById = assignedRaw ? parseInt(assignedRaw, 10) : undefined;

  const url = buildLeadAddUrl(webhookBase);

  const fields: Record<string, unknown> = {
    TITLE: `Заявка с сайта: ${data.form_name}`,
    NAME: data.name,
    PHONE: [{ VALUE: data.phone, VALUE_TYPE: 'WORK' }],
    SOURCE_ID: 'WEB',
  };

  if (data.email?.trim()) {
    fields.EMAIL = [{ VALUE: data.email.trim(), VALUE_TYPE: 'WORK' }];
  }

  if (assignedById && !Number.isNaN(assignedById)) {
    fields.ASSIGNED_BY_ID = assignedById;
  }
  if (data.company) fields.COMPANY_TITLE = data.company;
  if (data.message) fields.COMMENTS = data.message;
  if (data.utm_source) fields.UTM_SOURCE = data.utm_source;
  if (data.utm_medium) fields.UTM_MEDIUM = data.utm_medium;
  if (data.utm_campaign) fields.UTM_CAMPAIGN = data.utm_campaign;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields,
        params: { REGISTER_SONET_EVENT: 'Y' },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const text = await response.text();
    if (!response.ok) {
      return { ok: false, error: `Bitrix HTTP ${response.status}: ${text.slice(0, 200)}` };
    }

    let parsed: { result?: number } = {};
    try {
      parsed = JSON.parse(text) as { result?: number };
    } catch {
      /* ignore */
    }

    return { ok: true, bitrixId: parsed.result };
  } catch (err) {
    clearTimeout(timeoutId);
    const msg =
      err instanceof Error && err.name === 'AbortError'
        ? 'Bitrix timeout (8s)'
        : err instanceof Error
          ? err.message
          : String(err);
    return { ok: false, error: msg };
  }
}
