import React, { useState } from 'react';
import type { Work } from '../types';
import ScrollAnimator from './ScrollAnimator';
import { XMarkIcon } from './IconComponents';

const worksData: Work[] = [
    {
        id: 1,
        title: '介護事業者のDX支援プロジェクト',
        category: 'ITコンサルティング',
        description: 'AI技術の導入でDX化を推進',
        longDescription: 'ケアマネジメント業務に含まれる、ケアプラン作成工程がAIを組み込んだシステムの利用により自動化され、大幅な事務作業負担の軽減を実現しました',
        image: '/images/work1.svg'
    },
    {
        id: 2,
        title: '製造業における組織支援',
        category: '人材紹介',
        description: '大手製造事業所に多数の人材を紹介し、IT化を促進。',
        longDescription: '工場や倉庫などのDX化が進んでいない事業者に多数の人材を紹介し、人材不足を解消し社内のDX化を実現',
        image: '/images/work2.svg'
    },
    {
        id: 3,
        title: '介護施設向け申し送りシステム開発',
        category: 'システム開発',
        description: 'AIによる申し送りの自動化システムを開発',
        longDescription: '介護施設ないの毎日の申し送りを、AIを組み込んだシステムにより自動化。申し送りの漏れや記録の保管などの業務が大幅に改善され、現場から好評をいただいております',
        image: '/images/work3.svg'
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