import React from 'react';

interface ScheduleScreenProps {
  onBack: () => void;
}

const ScheduleScreen: React.FC<ScheduleScreenProps> = ({ onBack }) => {
  const scheduleItems = [
    { date: 'TODAY - April 15, 2026', type: 'GENERAL WASTE', status: 'Active', time: '8:00 AM - 12:00 PM' },
    { date: '', type: 'GARDEN WASTE', status: 'UPCOMING', time: '7:00 AM - 11:00 AM' },
    { date: 'April 18, 2026', type: 'RECYCLING', status: 'UPCOMING', time: '9:00 AM - 1:00 PM' },
    { date: 'April 22, 2026', type: 'GARDEN WASTE', status: 'UPCOMING', time: '7:00 AM - 11:00 AM' },
    { date: 'April 25, 2026', type: 'HAZARDOUS', status: 'UPCOMING', time: 'By appointment only' },
    { date: 'April 29, 2026', type: 'GENERAL WASTE', status: 'UPCOMING', time: '8:00 AM - 12:00 PM' },
    { date: 'May 2, 2026', type: 'RECYCLING', status: 'UPCOMING', time: '9:00 AM - 1:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-600 text-2xl">←</button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Collection Schedule</h1>
            <p className="text-gray-400 text-xs mt-0.5">View all upcoming pickups</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="space-y-4">
          {scheduleItems.map((item, idx) => (
            <div key={idx} className="border-b border-gray-50 pb-3">
              {item.date && <p className="text-xs text-gray-400 mb-2">{item.date}</p>}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{item.type}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
                <p className={`text-xs font-medium ${item.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-50 rounded-lg p-3">
          <p className="font-medium text-gray-700 text-xs">⚠️ Hazardous Waste</p>
          <p className="text-xs text-gray-400 mt-0.5">By appointment only. Call (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleScreen;