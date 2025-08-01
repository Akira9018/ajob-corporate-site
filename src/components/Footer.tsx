import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                <p className="text-lg font-semibold text-white">AJOB合同会社</p>
                <p className="mt-2 text-sm">東京都千代田区丸の内1-2-3</p>
                <p className="mt-4 text-xs">&copy; 2025 AJOB LLC. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;