
import React from 'react';

interface HeaderProps {
  toggleCoverMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleCoverMode }) => {
  const [language, setLanguage] = React.useState<'EN' | 'HI'>('EN');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'EN' ? 'HI' : 'EN'));
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-sahaara-blue-dark">
          {language === 'EN' ? 'Sahaara' : 'सहारा'}
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="text-sm font-semibold text-gray-600 hover:text-sahaara-blue-dark transition-colors"
          >
            {language === 'EN' ? 'HI' : 'EN'}
          </button>
          <button
            onClick={toggleCoverMode}
            title="Toggle Cover Mode"
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M4.222 4.222l1.414 1.414m12.728 0l-1.414 1.414M5.636 18.364l-1.414 1.414" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
