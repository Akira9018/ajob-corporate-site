import React from 'react';
import ScrollAnimator from './ScrollAnimator';

const About: React.FC = () => {
    const companyInfo = {
        '会社名': 'AJOB合同会社',
        '所在地': '東京都千代田区丸の内1-2-3',
        '設立': '2024年8月1日',
        '代表者': '代表取締役CEO 鈴木 一郎',
        '事業内容': 'ITコンサルティング事業、システム開発事業'
    };

    return (
        <section id="about" className="py-20 md:py-32 bg-[#1A1A1A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimator>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">About Us</h2>
                        <p className="mt-4 text-lg text-gray-400">私たちについて</p>
                        <div className="mt-6 w-24 h-1 bg-[#00BFFF] mx-auto"></div>
                    </div>
                </ScrollAnimator>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                    <div className="lg:col-span-3">
                        <ScrollAnimator>
                            <h3 className="text-2xl font-bold text-white mb-4 text-[#00FF7F]">Our Mission</h3>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                最先端テクノロジーと優秀な人材の力で、クライアントのビジネス成長を加速させ、社会に貢献する。
                            </p>
                            <h3 className="text-2xl font-bold text-white mb-4 text-[#00FF7F]">CEO Message</h3>
                            <p className="text-gray-300 leading-relaxed">
                                目まぐるしく変化する現代において、企業が持続的に成長するためには、テクノロジーの活用と、それを使いこなす人材の力が不可欠です。私たちAJOB合同会社は、お客様一人ひとりの課題に真摯に向き合い、最高の技術と人材を提供することで、お客様が描く未来の実現をサポートする、最強のパートナーでありたいと考えています。常識にとらわれず、常に半歩先の未来を見据えたご提案をお約束します。
                            </p>
                        </ScrollAnimator>
                    </div>
                    <div className="lg:col-span-2">
                        <ScrollAnimator>
                            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border-l-4 border-[#00BFFF]">
                                <h3 className="text-xl font-bold text-white mb-6">会社概要</h3>
                                <div className="space-y-4">
                                    {Object.entries(companyInfo).map(([key, value]) => (
                                        <div key={key} className="text-sm">
                                            <p className="font-semibold text-gray-400">{key}</p>
                                            <p className="text-white">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollAnimator>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;