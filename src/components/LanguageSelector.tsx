import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, languageNames, languageFlags, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = { code: language, name: languageNames[language], flag: languageFlags[language] };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-3 py-1.5 text-white text-sm hover:bg-white/30 transition-all"
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-50">
          <div className="max-h-64 overflow-y-auto">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                  language === lang ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700'
                }`}
              >
                <span>{languageFlags[lang]}</span>
                <span>{languageNames[lang]}</span>
                {language === lang && <span className="ml-auto">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;