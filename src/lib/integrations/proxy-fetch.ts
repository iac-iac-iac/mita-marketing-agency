import { ProxyAgent, fetch as undiciFetch, type RequestInit as UndiciRequestInit } from 'undici';
import { getEnabledProxies, recordProxyCheck } from '@/lib/cms/db-proxies';

export type FetchWithProxyResult = {
  response: Response;
  proxyId: number | null;
  proxyUrl: string | null;
};

function toHeaders(init?: RequestInit): Record<string, string> {
  if (!init?.headers) return {};
  if (init.headers instanceof Headers) {
    return Object.fromEntries(init.headers.entries());
  }
  if (Array.isArray(init.headers)) {
    return Object.fromEntries(init.headers);
  }
  return { ...(init.headers as Record<string, string>) };
}

async function fetchOnce(
  url: string,
  init: RequestInit | undefined,
  proxyUrl: string | null
): Promise<Response> {
  const method = init?.method ?? 'GET';
  const headers = toHeaders(init);
  const body = init?.body ?? undefined;
  const signal = init?.signal ?? undefined;

  if (!proxyUrl) {
    return fetch(url, { method, headers, body, signal });
  }

  const dispatcher = new ProxyAgent(proxyUrl);
  const res = await undiciFetch(url, {
    method,
    headers,
    body: body as UndiciRequestInit['body'],
    signal,
    dispatcher,
  });

  const arrayBuffer = await res.arrayBuffer();
  const responseHeaders = Object.fromEntries(res.headers.entries());
  return new Response(arrayBuffer, {
    status: res.status,
    statusText: res.statusText,
    headers: responseHeaders,
  });
}

/**
 * Сначала без прокси, затем по очереди включённые прокси из БД.
 */
export async function fetchWithProxies(
  url: string,
  init?: RequestInit
): Promise<FetchWithProxyResult> {
  const proxies = getEnabledProxies();
  let lastDirect: Response | null = null;

  try {
    const direct = await fetchOnce(url, init, null);
    if (direct.ok) {
      return { response: direct, proxyId: null, proxyUrl: null };
    }
    lastDirect = direct;
    if (proxies.length === 0) {
      return { response: direct, proxyId: null, proxyUrl: null };
    }
  } catch {
    /* try proxies */
  }

  let lastError = lastDirect
    ? `HTTP ${lastDirect.status}`
    : 'Прямое соединение недоступно';

  for (const proxy of proxies) {
    try {
      const response = await fetchOnce(url, init, proxy.url);
      recordProxyCheck(proxy.id, response.ok, response.ok ? '' : `HTTP ${response.status}`);
      if (response.ok) {
        return { response, proxyId: proxy.id, proxyUrl: proxy.url };
      }
      lastError = `HTTP ${response.status}`;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      lastError = msg;
      recordProxyCheck(proxy.id, false, msg);
    }
  }

  throw new Error(lastError);
}
