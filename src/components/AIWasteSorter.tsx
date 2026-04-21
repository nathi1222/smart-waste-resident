import React, { useState, useRef } from 'react';

interface AIWasteSorterProps {
  onBack: () => void;
}

const AIWasteSorter: React.FC<AIWasteSorterProps> = ({ onBack }) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [result, setResult] = useState<{ bin: string; message: string; icon: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonItems = [
    { name: 'Plastic Bottle', category: 'recycling' },
    { name: 'Glass Jar', category: 'recycling' },
    { name: 'Cardboard Box', category: 'recycling' },
    { name: 'Newspaper', category: 'recycling' },
    { name: 'Aluminum Can', category: 'recycling' },
    { name: 'Food Scraps', category: 'garden' },
    { name: 'Grass Clippings', category: 'garden' },
    { name: 'Tree Branches', category: 'garden' },
    { name: 'Dirty Diaper', category: 'general' },
    { name: 'Broken Glass', category: 'general' },
    { name: 'Used Batteries', category: 'hazardous' },
    { name: 'Paint Cans', category: 'hazardous' },
    { name: 'Electronics', category: 'hazardous' },
  ];

  const getSuggestion = (item: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const found = commonItems.find(i => i.name.toLowerCase() === item.toLowerCase());
      if (found) {
        const binMap: Record<string, any> = {
          recycling: { bin: '♻️ Recycling Bin', message: 'This item can be recycled! Please rinse before recycling.', icon: '♻️', color: 'blue' },
          garden: { bin: '🌿 Garden Waste Bin', message: 'This is organic waste. Perfect for composting!', icon: '🌿', color: 'green' },
          general: { bin: '🗑️ General Waste Bin', message: 'This goes to general waste. Cannot be recycled.', icon: '🗑️', color: 'gray' },
          hazardous: { bin: '⚠️ Hazardous Waste', message: 'Special handling required. Take to designated drop-off point.', icon: '⚠️', color: 'red' },
        };
        setResult(binMap[found.category]);
      } else {
        setResult({ bin: '❓ Unknown', message: 'Try searching for a specific item (e.g., "plastic bottle")', icon: '❓', color: 'gray' });
      }
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-12"></div>
      <div className="px-5 pb-4 border-b">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-600 text-2xl">←</button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">AI Waste Sorter</h1>
            <p className="text-gray-400 text-xs">What bin does it go in?</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 pb-20">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🤖</span>
            <div>
              <p className="text-purple-800 text-sm font-medium">AI Assistant</p>
              <p className="text-purple-600 text-xs">Ask me what bin to use for any item!</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">What are you disposing?</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              placeholder="e.g., plastic bottle, glass jar..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && getSuggestion(selectedItem)}
            />
            <button
              onClick={() => getSuggestion(selectedItem)}
              disabled={!selectedItem || isAnalyzing}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
            >
              {isAnalyzing ? '🤔' : '🔍'}
            </button>
          </div>
        </div>

        {isAnalyzing && (
          <div className="text-center py-8">
            <div className="animate-pulse">
              <span className="text-4xl">🤖</span>
              <p className="text-gray-500 text-sm mt-2">Analyzing...</p>
            </div>
          </div>
        )}

        {result && !isAnalyzing && (
          <div className={`bg-${result.color}-50 rounded-xl p-5 border-2 border-${result.color}-200 animate-fadeIn`}>
            <div className="text-center mb-3">
              <span className="text-5xl">{result.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{result.bin}</h3>
            <p className="text-gray-600 text-sm text-center">{result.message}</p>
            <div className="mt-4 p-3 bg-white/50 rounded-lg">
              <p className="text-xs text-gray-500 text-center">
                💡 Tip: {result.bin === '♻️ Recycling Bin' ? 'Rinse containers before recycling!' : 
                           result.bin === '🌿 Garden Waste Bin' ? 'Remove plastic bags and tags!' :
                           result.bin === '⚠️ Hazardous Waste' ? 'Never put in regular bins!' :
                           'When in doubt, check our recycling guide!'}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-gray-800 font-semibold text-sm mb-3">Common Items</h3>
          <div className="flex flex-wrap gap-2">
            {commonItems.slice(0, 8).map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setSelectedItem(item.name);
                  getSuggestion(item.name);
                }}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="pb-2 flex justify-center"><div className="w-32 h-1 bg-gray-300 rounded-full"></div></div>
    </div>
  );
};

export default AIWasteSorter;