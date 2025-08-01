import React from 'react';
import ParticleCanvas from './ParticleCanvas';

const Hero: React.FC = () => {
    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (!href || href === '#') return;

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="home" className="relative h-screen flex items-center justify-center text-center">
            <ParticleCanvas />
            <div className="relative z-10 p-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 hero-glow">
                    テクノロジーと人材で、<br />ビジネスの未来を創造する。
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                    AJOB合同会社は、専門性の高いIT人材と最先端の技術力で、お客様のデジタルトランスフォーメーションを成功に導きます。
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#services" onClick={handleScrollTo} className="px-8 py-3 bg-[#00BFFF] text-white font-semibold rounded-full shadow-lg hover:bg-sky-400 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                        事業内容を見る
                    </a>
                    <a href="#contact" onClick={handleScrollTo} className="px-8 py-3 bg-transparent border-2 border-[#00FF7F] text-[#00FF7F] font-semibold rounded-full hover:bg-[#00FF7F] hover:text-[#1A1A1A] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                        お問い合わせ
                    </a>
                </div>
            </div>
            <div className="absolute inset-0 bg-black opacity-50"></div>
        </section>
    );
};

export default Hero;