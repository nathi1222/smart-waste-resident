import React, { useState } from 'react';

interface RecyclingTipsScreenProps {
  onBack: () => void;
}

const RecyclingTipsScreen: React.FC<RecyclingTipsScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: '📚' },
    { id: 'plastic', name: 'Plastic', icon: '🥤' },
    { id: 'paper', name: 'Paper', icon: '📄' },
    { id: 'glass', name: 'Glass', icon: '🍾' },
    { id: 'metal', name: 'Metal', icon: '🥫' },
  ];

  const tips = [
    { id: 1, category: 'plastic', icon: '🥤', title: 'Rinse Plastic Containers', description: 'Always rinse food residue from plastic containers before recycling to prevent contamination.', difficulty: 'Easy', time: '30 sec' },
    { id: 2, category: 'paper', icon: '📦', title: 'Flatten Cardboard Boxes', description: 'Break down and flatten cardboard boxes to save space in your recycling bin.', difficulty: 'Easy', time: '1 min' },
    { id: 3, category: 'plastic', icon: '🏷️', title: 'Remove Labels', description: 'Remove plastic labels from bottles and jars - they can jam recycling equipment.', difficulty: 'Medium', time: '2 min' },
    { id: 4, category: 'metal', icon: '🔋', title: 'Battery Disposal', description: 'Never put batteries in recycling bins. Use special drop-off locations.', difficulty: 'Easy', time: '1 min' },
    { id: 5, category: 'plastic', icon: '🛍️', title: 'No Plastic Bags', description: 'Plastic bags jam recycling equipment. Reuse them or drop off at grocery stores.', difficulty: 'Easy', time: '30 sec' },
    { id: 6, category: 'paper', icon: '🍕', title: 'Greasy Pizza Boxes', description: 'Grease contaminates paper recycling. Compost greasy boxes instead.', difficulty: 'Medium', time: '1 min' },
    { id: 7, category: 'glass', icon: '🍾', title: 'Keep Glass Whole', description: 'Don\'t break glass bottles - broken glass is harder to recycle and dangerous.', difficulty: 'Easy', time: '30 sec' },
    { id: 8, category: 'metal', icon: '🥫', title: 'Remove Lids', description: 'Remove metal lids from jars and bottles for separate recycling.', difficulty: 'Easy', time: '30 sec' },
  ];

  const filteredTips = selectedCategory === 'all' ? tips : tips.filter(tip => tip.category === selectedCategory);

  const funFacts = [
    '♻️ Recycling one aluminum can saves enough energy to run a TV for 3 hours!',
    '🌍 Recycling 1 ton of paper saves 17 trees and 7,000 gallons of water!',
    '🥤 Plastic bottles can be recycled into fleece jackets and carpet!',
    '🍾 Glass bottles can be recycled endlessly without losing quality!',
  ];

  const [currentFact] = useState(funFacts[Math.floor(Math.random() * funFacts.length)]);

  return (
    <div className="min-h-screen bg-white">
      <div className="h-12"></div>
      <div className="px-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-600 text-2xl p-2 -ml-2">←</button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Recycling Tips</h1>
            <p className="text-gray-400 text-xs mt-0.5">Learn how to recycle better</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Fun Fact Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3 mb-4">
          <p className="text-white text-xs font-medium">💡 DID YOU KNOW?</p>
          <p className="text-white text-sm mt-1">{currentFact}</p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Tips List */}
        <div className="space-y-3">
          {filteredTips.map((tip) => (
            <div key={tip.id} className="bg-gray-50 rounded-xl p-3">
              <div className="flex gap-3">
                <div className="text-3xl">{tip.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{tip.title}</h3>
                    <div className="flex gap-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{tip.difficulty}</span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">⏱️ {tip.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recycling Guide Image Placeholder */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-blue-800 text-sm font-medium">📖 Download Complete Recycling Guide</p>
          <p className="text-blue-600 text-xs mt-1">PDF with detailed instructions</p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs">Download →</button>
        </div>
      </div>
      
      <div className="pb-2 flex justify-center">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default RecyclingTipsScreen;