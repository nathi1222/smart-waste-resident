import React from 'react';

interface CollectionHistoryScreenProps {
  onBack: () => void;
}

const CollectionHistoryScreen: React.FC<CollectionHistoryScreenProps> = ({ onBack }) => {
  const historyData = [
    { date: 'April 8, 2026', type: 'General Waste', status: 'Completed', time: '9:15 AM', rating: 5 },
    { date: 'April 1, 2026', type: 'Recycling', status: 'Completed', time: '10:30 AM', rating: 4 },
    { date: 'March 25, 2026', type: 'Garden Waste', status: 'Completed', time: '8:45 AM', rating: 5 },
    { date: 'March 18, 2026', type: 'General Waste', status: 'Completed', time: '9:00 AM', rating: 4 },
    { date: 'March 11, 2026', type: 'Recycling', status: 'Completed', time: '11:15 AM', rating: 3 },
    { date: 'March 4, 2026', type: 'General Waste', status: 'Completed', time: '8:30 AM', rating: 5 },
  ];

  const stats = {
    totalCollections: 24,
    onTimeRate: 95,
    averageRating: 4.3,
    missedCollections: 1,
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-12"></div>
      <div className="px-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-600 text-2xl p-2 -ml-2">←</button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Collection History</h1>
            <p className="text-gray-400 text-xs mt-0.5">Your past pickups</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.totalCollections}</p>
            <p className="text-xs text-gray-600">Total Collections</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.onTimeRate}%</p>
            <p className="text-xs text-gray-600">On-Time Rate</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-amber-600">{stats.averageRating}</p>
            <p className="text-xs text-gray-600">Avg Rating</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.missedCollections}</p>
            <p className="text-xs text-gray-600">Missed</p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-3">
          {historyData.map((item, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.type}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-600 font-medium">{item.status}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`text-sm ${star <= item.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <button className="text-xs text-green-600">View Details →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pb-2 flex justify-center">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default CollectionHistoryScreen;