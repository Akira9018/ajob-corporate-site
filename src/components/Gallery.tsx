import React from 'react';
import type { GalleryItem } from '../types';
import ScrollAnimator from './ScrollAnimator';

const galleryData: GalleryItem[] = [
    {
        id: 1,
        title: 'コーポレートサイト制作',
        category: 'Web Design',
        image: 'https://picsum.photos/seed/corp-site/600/400',
        url: '#'
    },
    {
        id: 2,
        title: 'Eコマースアプリ',
        category: 'Mobile App',
        image: 'https://picsum.photos/seed/ecommerce-app/600/400',
        url: '#'
    },
    {
        id: 3,
        title: '予約管理システム',
        category: 'Web Application',
        image: 'https://picsum.photos/seed/booking-system/600/400',
        url: '#'
    },
    {
        id: 4,
        title: 'ブランドLP制作',
        category: 'Web Design',
        image: 'https://picsum.photos/seed/brand-lp/600/400',
        url: '#'
    },
    {
        id: 5,
        title: 'SNS連携ツール',
        category: 'Web Application',
        image: 'https://picsum.photos/seed/sns-tool/600/400',
        url: '#'
    },
    {
        id: 6,
        title: 'チャットボット開発',
        category: 'AI / System',
        image: 'https://picsum.photos/seed/chatbot/600/400',
        url: '#'
    }
];

const Gallery: React.FC = () => {
    return (
        <section id="gallery" className="py-20 md:py-32 bg-[#1A1A1A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimator>
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Gallery</h2>
                        <p className="mt-4 text-lg text-gray-400">HP制作やアプリケーション開発の実績をご覧ください</p>
                        <div className="mt-6 w-24 h-1 bg-[#00FF7F] mx-auto"></div>
                    </div>
                </ScrollAnimator>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {galleryData.map((item) => (
                        <ScrollAnimator key={item.id}>
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block overflow-hidden rounded-lg shadow-xl"
                            >
                                <img src={item.image} alt={item.title} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300"></div>
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <span className="text-xs font-bold text-[#00FF7F] uppercase tracking-wider">{item.category}</span>
                                    <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
                                </div>
                            </a>
                        </ScrollAnimator>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;