export const CONTACT_ENDPOINT = 'https://formspree.io/f/mqalbgwy';
export type DeliveryFailure = 'server' | 'network' | 'timeout';
export class ContactDeliveryError extends Error {
  kind: DeliveryFailure;
  constructor(kind: DeliveryFailure) { super(kind); this.name = 'ContactDeliveryError'; this.kind = kind; }
}
/** AJOBポータル（管理画面）の問い合わせ記録先。環境変数が無ければ記録をスキップする。 */
export type PortalConfig = { url: string; key: string };
export const PORTAL_SITE_SLUG = 'ajob-hp';
export function portalConfigFromEnv(): PortalConfig | null {
  const env = (import.meta as { env?: Record<string, string | undefined> }).env;
  const url = env?.VITE_SUPABASE_URL?.trim();
  const key = env?.VITE_SUPABASE_ANON_KEY?.trim();
  return url && key ? { url: url.replace(/\/$/, ''), key } : null;
}
export function portalInquiryBody(payload: Record<string, string>) {
  const line = (label: string, key: string) => (payload[key] ? `${label}: ${payload[key]}` : '');
  const message = [line('ご相談の内容', 'type'), line('会社名', 'company'), line('お名前', 'name'), line('メール', 'email'), line('電話', 'phone'), '', payload.message || ''].filter((v, i, a) => v !== '' || (i > 0 && a[i - 1] !== '')).join('\n').trim();
  return {
    p_site_slug: PORTAL_SITE_SLUG,
    p_channel: 'form',
    p_name: payload.name || '',
    p_contact: payload.email || payload.phone || '',
    p_area: '',
    p_message: message,
    p_source_page: 'contact',
    p_company_slug: null,
  };
}
/** 問い合わせをポータルDBに記録する。失敗しても送信結果には影響させない（戻り値のみ）。 */
export async function recordInquiry(payload: Record<string, string>, fetcher: typeof fetch = fetch, config: PortalConfig | null = portalConfigFromEnv()): Promise<boolean> {
  if (!config)
    return false;
  try {
    const response = await fetcher(`${config.url}/rest/v1/rpc/submit_inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: config.key, Authorization: `Bearer ${config.key}` },
      body: JSON.stringify(portalInquiryBody(payload)),
    });
    if (!response.ok)
      console.warn('portal inquiry record failed', response.status);
    return response.ok;
  }
  catch (error) {
    console.warn('portal inquiry record error', error);
    return false;
  }
}
/** A successful HTTP response means the existing intake service accepted the request.
 * It does not verify the recipient's inbox or promise an email delivery time.
 * 受付成功後にポータルDBへも記録する（記録の失敗は成功判定に影響しない）。
 */
export async function sendContact(payload: Record<string, string>, fetcher: typeof fetch = fetch, timeoutMs = 20000, portal: PortalConfig | null = portalConfigFromEnv()): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, _subject: `【AJOB】お問い合わせ：${payload.type}` }),
      signal: controller.signal,
    });
    if (!response.ok)
      throw new ContactDeliveryError('server');
  }
  catch (error) {
    if (error instanceof ContactDeliveryError)
      throw error;
    throw new ContactDeliveryError(controller.signal.aborted ? 'timeout' : 'network');
  }
  finally {
    clearTimeout(timer);
  }
  if (portal)
    await recordInquiry(payload, fetcher, portal);
}
