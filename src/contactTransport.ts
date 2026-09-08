export const CONTACT_ENDPOINT = 'https://formspree.io/f/mqalbgwy';
export type DeliveryFailure = 'server' | 'network' | 'timeout';
export class ContactDeliveryError extends Error {
  kind: DeliveryFailure;
  constructor(kind: DeliveryFailure) { super(kind); this.name = 'ContactDeliveryError'; this.kind = kind; }
}
/** A successful HTTP response means the existing intake service accepted the request.
 * It does not verify the recipient's inbox or promise an email delivery time.
 */
export async function sendContact(payload: Record<string, string>, fetcher: typeof fetch = fetch, timeoutMs = 20000): Promise<void> {
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
}
