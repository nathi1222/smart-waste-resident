import React, { useState } from 'react';

interface BinRequestScreenProps {
  onBack: () => void;
  onSubmit: () => void;
}

const BinRequestScreen: React.FC<BinRequestScreenProps> = ({ onBack, onSubmit }) => {
  const [binType, setBinType] = useState('general');
  const [reason, setReason] = useState('new');
  const [size, setSize] = useState('standard');
  const [address, setAddress] = useState('45 Main Street, Springfield');
  const [instructions, setInstructions] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onSubmit();
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-green-600">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Request Submitted!</h2>
          <p className="text-gray-400 text-sm">We'll contact you within 2-3 business days</p>
        </div>
      </div>
    );
  }

  const binTypes = [
    { id: 'general', name: 'General Waste Bin', icon: '🗑️', price: 'Free' },
    { id: 'recycling', name: 'Recycling Bin', icon: '♻️', price: 'Free' },
    { id: 'garden', name: 'Garden Waste Bin', icon: '🌿', price: '$5/month' },
    { id: 'food', name: 'Food Waste Bin', icon: '🍎', price: 'Free' },
  ];

  const reasons = [
    { id: 'new', label: 'New bin (first time)', icon: '🆕' },
    { id: 'replacement', label: 'Replacement (damaged)', icon: '🔧' },
    { id: 'additional', label: 'Additional bin', icon: '➕' },
    { id: 'lost', label: 'Bin lost/stolen', icon: '🔍' },
  ];

  const sizes = [
    { id: 'small', label: 'Small (35L)', icon: '📦' },
    { id: 'standard', label: 'Standard (120L)', icon: '📦📦' },
    { id: 'large', label: 'Large (240L)', icon: '📦📦📦' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="h-12"></div>
      <div className="px-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-600 text-2xl p-2 -ml-2">←</button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Request a Bin</h1>
            <p className="text-gray-400 text-xs mt-0.5">New, replacement, or additional bins</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 pb-20">
        {/* Bin Type Selection */}
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2">Bin Type</label>
          <div className="grid grid-cols-2 gap-2">
            {binTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setBinType(type.id)}
                className={`p-3 rounded-lg border text-left transition ${
                  binType === type.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <span className="text-2xl">{type.icon}</span>
                <p className={`text-xs mt-1 ${binType === type.id ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                  {type.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{type.price}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Reason Selection */}
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2">Reason</label>
          <div className="grid grid-cols-2 gap-2">
            {reasons.map((r) => (
              <button
                key={r.id}
                onClick={() => setReason(r.id)}
                className={`p-2 rounded-lg border text-center transition ${
                  reason === r.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <span className="text-xl">{r.icon}</span>
                <p className={`text-xs mt-1 ${reason === r.id ? 'text-green-700' : 'text-gray-600'}`}>
                  {r.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Bin Size */}
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2">Bin Size</label>
          <div className="flex gap-2">
            {sizes.map((s) => (
              <button
                key={s.id}
                onClick={() => setSize(s.id)}
                className={`flex-1 p-3 rounded-lg border text-center transition ${
                  size === s.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <span className="text-xl">{s.icon}</span>
                <p className={`text-xs mt-1 ${size === s.id ? 'text-green-700' : 'text-gray-600'}`}>
                  {s.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Delivery Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-base"
          />
        </div>

        {/* Special Instructions */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Special Instructions</label>
          <textarea
            rows={3}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-base"
            placeholder="Any special delivery instructions? (e.g., gate code, best time, etc.)"
          />
        </div>

        {/* Delivery Info */}
        <div className="bg-blue-50 rounded-lg p-3 mb-6">
          <div className="flex items-start gap-2">
            <span className="text-lg">🚚</span>
            <div>
              <p className="font-medium text-blue-800 text-xs">Delivery Information</p>
              <p className="text-xs text-blue-600 mt-0.5">Standard delivery takes 5-7 business days</p>
              <p className="text-xs text-blue-600">You'll receive tracking info via email</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 transition"
        >
          Submit Request
        </button>
      </div>
      
      <div className="pb-2 flex justify-center">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default BinRequestScreen;