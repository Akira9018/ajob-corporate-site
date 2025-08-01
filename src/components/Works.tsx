import React, { useState } from 'react';
import type { Work } from '../types';
import ScrollAnimator from './ScrollAnimator';
import { XMarkIcon } from './IconComponents';

const worksData: Work[] = [
    {
        id: 1,
        title: '大手製造業のDX支援プロジェクト',
        category: 'ITコンサルティング',
        description: '基幹システムの刷新とデータ活用基盤の構築を支援。',
        longDescription: '伝統的な大手製造業クライアントに対し、全社的なデジタルトランスフォーメーションを推進。老朽化した基幹システムをクラウドベースの最新アーキテクチャに刷新し、散在していたデータを統合。リアルタイムでの生産状況可視化や需要予測の精度向上を実現し、年間15%のコスト削減に貢献しました。',
        image: 'https://picsum.photos/seed/factory/600/400'
    },
    {
        id: 2,
        title: 'SaaS企業の開発チーム組成支援',
        category: '人材紹介',
        description: '急成長中のBtoB SaaS企業へ、リードエンジニアを含む5名の開発チームを提供。',
        longDescription: 'プロダクトの急成長に伴い開発リソース不足に悩むSaaS企業様に対し、当社のネットワークを駆使してスキルとカルチャーの両面でマッチする優秀なエンジニア5名（バックエンド3名、フロントエンド2名）を2ヶ月という短期間でご紹介。採用プロセスの設計から面接代行までトータルでサポートし、開発速度の向上に大きく貢献しました。',
        image: 'https://picsum.photos/seed/startup/600/400'
    },
    {
        id: 3,
        title: 'フィットネス向けモバイルアプリ開発',
        category: 'システム開発',
        description: 'AIによるパーソナルトレーニング提案機能を搭載したiOS/Androidアプリを開発。',
        longDescription: 'フィットネス業界のスタートアップ企業様向けに、AIトレーナー機能を核としたモバイルアプリケーションを企画段階から開発。ユーザーの目標や身体データに基づき、最適なトレーニングメニューを動画付きで提案します。UI/UXデザインにも注力し、継続利用率の高いサービスを実現しました。',
        image: 'https://picsum.photos/seed/fitness/600/400'
    }
];

const WorkModal: React.FC<{ work: Work; onClose: () => void }> = ({ work, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-800 text-white rounded-lg shadow-xl max-w-3xl w-full relative overflow-hidden" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <XMarkIcon />
                </button>
                <img src={work.image} alt={work.title} className="w-full h-64 object-cover" />
                <div className="p-8">
                    <span className="inline-block bg-[#00BFFF] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">{work.category}</span>
                    <h3 className="text-2xl font-bold mb-4">{work.title}</h3>
                    <p className="text-gray-300">{work.longDescription}</p>
                </div>
            </div>
        </div>
    );
};

const Works: React.FC = () => {
    const [selectedWork, setSelectedWork] = useState<Work | null>(null);

    return (
        <section id="works" className="py-20 md:py-32 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimator>
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Works</h2>
                        <p className="mt-4 text-lg text-gray-400">私たちが手がけたプロジェクトの一部をご紹介します</p>
                        <div className="mt-6 w-24 h-1 bg-[#00BFFF] mx-auto"></div>
                    </div>
                </ScrollAnimator>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {worksData.map((work) => (
                        <ScrollAnimator key={work.id}>
                            <div
                                className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer"
                                onClick={() => setSelectedWork(work)}
                            >
                                <img src={work.image} alt={work.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-75 transition-all duration-300"></div>
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <span className="text-xs font-bold text-[#00FF7F] uppercase tracking-wider">{work.category}</span>
                                    <h3 className="text-xl font-bold text-white mt-2">{work.title}</h3>
                                    <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{work.description}</p>
                                </div>
                            </div>
                        </ScrollAnimator>
                    ))}
                </div>
            </div>
            {selectedWork && <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />}
        </section>
    );
};

export default Works;