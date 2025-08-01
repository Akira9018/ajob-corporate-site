import React from 'react';
import type { NewsItem } from '../types';
import ScrollAnimator from './ScrollAnimator';

const newsData: NewsItem[] = [
    { date: '2025.07.10', title: 'Webサイトをリニューアルしました。' },
    { date: '2025.06.20', title: 'DX推進に関するウェビナーを開催しました。' },
    { date: '2025.05.15', title: '大手製造業様とのパートナーシップ契約を締結しました。' }
];

const News: React.FC = () => {
    return (
        <section id="news" className="py-20 md:py-32 bg-[#1A1A1A]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimator>
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">News</h2>
                        <p className="mt-4 text-lg text-gray-400">最新情報</p>
                        <div className="mt-6 w-24 h-1 bg-[#00FF7F] mx-auto"></div>
                    </div>
                </ScrollAnimator>

                <ScrollAnimator>
                    <div className="mt-12">
                        <ul className="divide-y divide-gray-700">
                            {newsData.map((item, index) => (
                                <li key={index} className="py-6 flex flex-col sm:flex-row items-baseline">
                                    <time className="text-sm font-semibold text-[#00FF7F] w-full sm:w-40 flex-shrink-0">{item.date}</time>
                                    <p className="mt-2 sm:mt-0 text-white">{item.title}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </ScrollAnimator>
            </div>
        </section>
    );
};

export default News;