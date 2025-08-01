import React from 'react';
import ScrollAnimator from './ScrollAnimator';

const CTA: React.FC = () => {
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
        <section className="bg-slate-900">
            <ScrollAnimator>
                <div className="max-w-4xl mx-auto text-center py-20 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        ビジネスの課題、私たちにご相談ください。
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                        専門のコンサルタントが、お客様の状況を丁寧にヒアリングし、最適なソリューションをご提案します。
                    </p>
                    <a href="#contact"
                        onClick={handleScrollTo}
                        className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-[#00BFFF] hover:bg-sky-400 sm:w-auto transition-all duration-300 transform hover:scale-105">
                        無料で相談する
                    </a>
                </div>
            </ScrollAnimator>
        </section>
    );
};

export default CTA;