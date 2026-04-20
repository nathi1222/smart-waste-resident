import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ReportIssueScreenProps {
  onBack: () => void;
}

const ReportIssueScreen: React.FC<ReportIssueScreenProps> = ({ onBack }) => {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const issueTypes = [
    { value: 'missed', label: 'Missed Collection', icon: '🗑️' },
    { value: 'damaged', label: 'Damaged Bin', icon: '💔' },
    { value: 'overflow', label: 'Overflowing Bin', icon: '📦' },
    { value: 'blocked', label: 'Blocked Access', icon: '🚧' },
    { value: 'other', label: 'Other Issue', icon: '📝' },
  ];

  const handleSubmit = () => {
    if (!issueType) {
      toast.error('Please select an issue type');
      return;
    }
    setSubmitted(true);
    toast.success('Issue reported successfully!');
    setTimeout(() => onBack(), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">✓</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Issue Reported!</h2>
          <p className="text-gray-400 text-xs">Thank you for your feedback</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-600 text-2xl">←</button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Report Issue</h1>
            <p className="text-gray-400 text-xs mt-0.5">Let us know what's wrong</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2">Issue Type</label>
          <div className="grid grid-cols-2 gap-2">
            {issueTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setIssueType(type.value)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  issueType === type.value ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
                }`}
              >
                <span className="text-xl">{type.icon}</span>
                <p className={`text-xs mt-1 ${issueType === type.value ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                  {type.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            defaultValue="45 Main Street"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
            placeholder="Please provide details..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 transition-all text-sm"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default ReportIssueScreen;