import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                <p className="text-lg font-semibold text-white">AJOB合同会社</p>
                <p className="mt-2 text-sm">大阪府大阪市北区天神橋1丁目19-16</p>
                <p className="mt-1 text-xs">有料職業紹介事業許可番号：27-ユ-304270</p>
                <p className="mt-4 text-xs">&copy; 2025 AJOB LLC. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;