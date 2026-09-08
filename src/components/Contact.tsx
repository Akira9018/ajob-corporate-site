import Marker from './Marker';
import Icon from './Icon';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Arrow } from './Site';
import { CONTACT_ENDPOINT, ContactDeliveryError, sendContact } from '../contactTransport';
export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  const sending = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current)
      return;
    const form = event.currentTarget;
    const data = new FormData(form);
    for (const name of ['company', 'name', 'message']) {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
      field.setCustomValidity(String(data.get(name) || '').trim() ? '' : '空白以外の内容を入力してください。');
    }
    if (!form.reportValidity())
      return;
    sending.current = true;
    setStatus('sending');
    try {
      const payload = Object.fromEntries([...data.entries()].map(([key, value]) => [key, String(value).trim()]));
      await sendContact(payload);
      setStatus('sent');
      form.reset();
    }
    catch (e) {
      setError(e instanceof ContactDeliveryError && e.kind === 'timeout' ? '応答を確認できませんでした。送信済みの可能性があるため、時間をおいてから再度ご確認ください。' : e instanceof ContactDeliveryError && e.kind === 'server' ? '送信を完了できませんでした。入力内容は残っています。時間をおいて、もう一度お試しください。' : '通信に問題があり、送信結果を確認できませんでした。入力内容を残しています。接続状況をご確認ください。');
      setStatus('error');
    }
    finally {
      sending.current = false;
    }
  }
  return <div className="contact-layout wrap">
    <aside>
      <h2><Marker>まとまっていなくても、<br />大丈夫です。</Marker></h2>
      <p>今、気になっていること。<br />やってみたいと思っていること。<br />まずは気軽にお聞かせください。</p>
      <ol className="contact-steps">
        <li>
          <span>01</span><Icon name="journal" size={28} />フォームからご相談</li>
        <li>
          <span>02</span><Icon name="dialogue" size={28} />内容を確認し、ご連絡</li>
        <li>
          <span>03</span><Icon name="ai-advisory" size={28} />無料相談で、次の一歩を整理</li>
      </ol>
      <p className="small muted">相談後の契約は、支援内容と費用をご確認いただいたうえで決めていただけます。</p>
    </aside>
    <div className="form-panel">
      <p className="small">「必須」の項目をご入力ください。</p>
      <form action={CONTACT_ENDPOINT} method="post" onSubmit={submit} onInput={e => {
        const target = e.target as HTMLInputElement; if (target.setCustomValidity)
          target.setCustomValidity('');
      }}>
        <fieldset disabled={status === 'sending' || status === 'sent'}>
          <div className="form-grid">
            <label>会社名 <span className="required">必須</span>
              <input name="company" autoComplete="organization" required maxLength={160} />
            </label>
            <label>お名前 <span className="required">必須</span>
              <input name="name" autoComplete="name" required maxLength={100} />
            </label>
            <label className="full">メールアドレス <span className="required">必須</span>
              <input type="email" name="email" autoComplete="email" required maxLength={254} />
            </label>
            <label className="full">電話番号 <span className="optional">任意</span>
              <input type="tel" name="phone" autoComplete="tel" maxLength={30} />
            </label>
            <label className="full">ご相談の内容<select name="type" defaultValue="AI顧問について">
              <option>AI顧問について</option>
              <option>LINE連携アプリについて</option>
              <option>地域ポータルについて</option>
              <option>Webサイト・システム開発について</option>
              <option>その他のご相談</option>
            </select>
            </label>
            <label className="full">お問い合わせ内容 <span className="required">必須</span>
              <textarea name="message" rows={7} required maxLength={5000} placeholder="現在のお困りごとや、実現したいことをお聞かせください。" />
              <span className="field-help">個人の医療情報や機密情報は入力しないでください。</span>
            </label>
            <div className="honeypot" aria-hidden="true">
              <label>この項目は入力しないでください<input name="_gotcha" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className="consent full">
              <input type="checkbox" name="consent" required value="agreed" />
              <span>
                <a href="/privacy/" target="_blank" rel="noreferrer">プライバシーポリシー（別タブ）</a>を確認し、同意します。</span>
            </label>
          </div>
          <button className="button" type="submit">{status === 'sending' ? '送信中…' : 'この内容で送信する'}<Arrow />
          </button>
        </fieldset>
        <div className="form-status" role="status" aria-live="polite">{status === 'sent' && <p className="success">お問い合わせを受け付けました。内容を確認のうえ、ご入力のメールアドレスにご連絡します。</p>}{status === 'error' && <p className="error">{error}</p>}</div>
        {status === 'sent' && <button type="button" className="text-link" onClick={() => setStatus('idle')}>別のお問い合わせを作成する <Arrow />
        </button>}
      </form>
      <noscript>
        <p>JavaScriptが無効な場合、送信後は受付サービスの画面に移動します。</p>
      </noscript>
    </div>
  </div>;
}
