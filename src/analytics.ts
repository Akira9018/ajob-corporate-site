// GA4 (gtag) へのカスタムイベント送信。gtag が読み込まれていない環境では何もしない。
// 計測するイベント:
//   contact_submit … お問い合わせフォームの送信が受付サービスに受理されたとき（GA4 のキーイベント）
//   contact_error  … 送信に失敗したとき（reason: server | network | timeout）
export type EventParams = Record<string, string | number | boolean>;
type Gtag = (command: 'event', name: string, params?: EventParams) => void;
export type GtagHost = { gtag?: Gtag };

export function trackEvent(name: string, params: EventParams = {}, host: GtagHost = globalThis as GtagHost): boolean {
  if (typeof host.gtag !== 'function')
    return false;
  try {
    host.gtag('event', name, params);
    return true;
  }
  catch {
    return false;
  }
}
