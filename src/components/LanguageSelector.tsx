import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
    { code: 'xh', name: 'isiXhosa', flag: '🇿🇦' },
    { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
    { code: 'st', name: 'Sesotho', flag: '🇿🇦' },
    { code: 'tn', name: 'Setswana', flag: '🇿🇦' },
    { code: 'ts', name: 'Xitsonga', flag: '🇿🇦' },
    { code: 've', name: 'Tshivenda', flag: '🇿🇦' },
    { code: 'ss', name: 'SiSwati', flag: '🇿🇦' },
    { code: 'nr', name: 'isiNdebele', flag: '🇿🇦' },
    { code: 'nso', name: 'Sepedi', flag: '🇿🇦' },
  ];

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 text-gray-700 text-sm hover:bg-gray-200 transition"
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <span>▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-50 max-h-80 overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as any);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 transition ${
                language === lang.code ? 'bg-green-50 text-green-600 font-medium' : 'text-gray-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
              {language === lang.code && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;