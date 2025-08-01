import React from 'react';
import type { Service } from '../types';
import { BriefcaseIcon, LightBulbIcon, CodeBracketSquareIcon } from './IconComponents';
import ScrollAnimator from './ScrollAnimator';

const servicesData: Service[] = [
    {
        icon: <BriefcaseIcon />,
        title: '人材紹介事業',
        description: 'ITを利用した人材マッチング機能を駆使して全国の製造業を紹介可能'
    },
    {
        icon: <LightBulbIcon />,
        title: 'ITコンサルティング事業',
        description: 'DX推進、新規事業立案、IT戦略策定を支援。ビジネスの構想段階から伴走し、成功へと導きます。'
    },
    {
        icon: <CodeBracketSquareIcon />,
        title: 'システム開発事業',
        description: 'Webアプリケーションからモバイルアプリまで、アジャイルな開発体制で高品質なプロダクトを迅速に開発します。'
    }
];

const Services: React.FC = () => {
    return (
        <section id="services" className="py-20 md:py-32 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimator>
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Services</h2>
                        <p className="mt-4 text-lg text-gray-400">お客様のビジネスを加速させる3つのコア事業</p>
                        <div className="mt-6 w-24 h-1 bg-[#00BFFF] mx-auto"></div>
                    </div>
                </ScrollAnimator>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {servicesData.map((service, index) => (
                        <ScrollAnimator key={index} className={`transition-delay-${index * 150}`}>
                            <div className="bg-gray-800 rounded-lg shadow-xl p-8 h-full flex flex-col transform hover:-translate-y-2 transition-transform duration-300 border-t-4 border-[#00BFFF]">
                                <div className="text-[#00BFFF] mb-6">{service.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                                <p className="text-gray-300 flex-grow">{service.description}</p>
                            </div>
                        </ScrollAnimator>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;