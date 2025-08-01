import React from 'react';
import type { Feature } from '../types';
import { ChartBarIcon, CpuChipIcon, PuzzlePieceIcon } from './IconComponents';
import ScrollAnimator from './ScrollAnimator';

const featuresData: Feature[] = [
    {
        icon: <PuzzlePieceIcon />,
        title: 'ワンストップソリューション',
        description: '戦略立案から人材採用、システム開発、運用まで一気通貫でサポート。ビジネスのあらゆるフェーズに対応します。'
    },
    {
        icon: <CpuChipIcon />,
        title: '高い専門性',
        description: '各分野のトップエキスパートが在籍。最新の技術トレンドと深い業界知識で、高難易度の課題を解決します。'
    },
    {
        icon: <ChartBarIcon />,
        title: '柔軟な開発体制',
        description: 'お客様のニーズに合わせて、アジャイル、ウォーターフォールなど最適な開発手法を選択し、迅速に価値を提供します。'
    }
];

const Features: React.FC = () => {
    return (
        <section id="features" className="py-20 md:py-32 bg-[#1A1A1A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimator>
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Strengths</h2>
                        <p className="mt-4 text-lg text-gray-400">AJOBが選ばれる理由</p>
                        <div className="mt-6 w-24 h-1 bg-[#00FF7F] mx-auto"></div>
                    </div>
                </ScrollAnimator>
                <div className="mt-16 max-w-4xl mx-auto grid gap-10 md:grid-cols-3">
                    {featuresData.map((feature, index) => (
                        <ScrollAnimator key={index}>
                            <div className="text-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-800 mx-auto mb-6 border-2 border-[#00FF7F]">
                                    <div className="text-[#00FF7F]">{feature.icon}</div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </div>
                        </ScrollAnimator>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;