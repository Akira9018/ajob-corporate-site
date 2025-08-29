import React, { useState } from 'react';
import ScrollAnimator from './ScrollAnimator';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        email: '',
        phone: '',
        type: 'ITコンサルティングについて',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('https://formspree.io/f/mqalbgwy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    company: formData.company,
                    name: formData.name,
                    phone: formData.phone,
                    type: formData.type,
                    message: formData.message,
                    _subject: `【AJOB】お問い合わせ：${formData.type}`,
                }),
            });

            if (response.ok) {
                setStatus('sent');
                setFormData({
                    company: '',
                    name: '',
                    email: '',
                    phone: '',
                    type: 'ITコンサルティングについて',
                    message: ''
                });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const requiredLabel = <span className="text-[#00FF7F] ml-1">*</span>;

    return (
        <section id="contact" className="py-20 md:py-32 bg-slate-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimator>
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Contact Us</h2>
                        <p className="mt-4 text-lg text-gray-400">お問い合わせフォーム</p>
                        <div className="mt-6 w-24 h-1 bg-[#00BFFF] mx-auto"></div>
                    </div>
                </ScrollAnimator>

                <ScrollAnimator>
                    <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-xl">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-300">会社名{requiredLabel}</label>
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                    className="form-input mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:outline-none transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">お名前{requiredLabel}</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:outline-none transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">メールアドレス{requiredLabel}</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:outline-none transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">電話番号</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-input mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:outline-none transition"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="type" className="block text-sm font-medium text-gray-300">お問い合わせ種別</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="form-select mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:outline-none transition"
                                >
                                    <option>ITコンサルティングについて</option>
                                    <option>システム開発について</option>
                                    <option>DX推進支援について</option>
                                    <option>その他</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300">お問い合わせ内容{requiredLabel}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="プロジェクトの内容、予算、スケジュール等、詳細をお聞かせください"
                                    className="form-textarea mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:outline-none transition"
                                ></textarea>
                            </div>
                            <div className="md:col-span-2 text-right">
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-[#00BFFF] hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#00BFFF] transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
                                >
                                    {status === 'sending' ? '送信中...' : '送信する'}
                                </button>
                            </div>
                        </form>
                        {status === 'sent' && (
                            <p className="mt-4 text-center text-green-400">
                                お問い合わせありがとうございます。内容を確認の上、担当者よりご連絡いたします。
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="mt-4 text-center text-red-400">
                                送信に失敗しました。必須項目を入力の上、もう一度お試しください。
                            </p>
                        )}
                    </div>
                </ScrollAnimator>
            </div>
        </section>
    );
};

export default Contact;