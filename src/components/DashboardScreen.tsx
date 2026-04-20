import React from 'react';

interface DashboardScreenProps {
  userName: string;
  userEmail: string;
  onViewSchedule: () => void;
  onReportIssue: () => void;
  onViewAlerts: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ 
  userName, 
  userEmail, 
  onViewSchedule, 
  onReportIssue, 
  onViewAlerts 
}) => {
  const alerts = [
    { title: 'Holiday Schedule Change', message: 'No pickup on Monday, April 20th' },
    { title: 'New recycling guidelines', message: 'Plastic types 1-7 now accepted' }
  ];

  const scheduleItems = [
    { date: 'TODAY - April 15, 2026', type: 'GENERAL WASTE', status: 'Active', time: '8:00 AM - 12:00 PM' },
    { date: '', type: 'GARDEN WASTE', status: 'UPCOMING', time: '7:00 AM - 11:00 AM' },
    { date: 'April 18, 2026', type: 'RECYCLING', status: 'UPCOMING', time: '9:00 AM - 1:00 PM' },
    { date: 'April 22, 2026', type: 'GARDEN WASTE', status: 'UPCOMING', time: '7:00 AM - 11:00 AM' },
    { date: 'April 25, 2026', type: 'HAZARDOUS', status: 'UPCOMING', time: 'By appointment only' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold text-gray-800 mt-0.5">{userName}!</h1>
            <p className="text-gray-400 text-xs mt-1">{userEmail}</p>
          </div>
          <button onClick={onViewAlerts} className="relative">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {alerts.length}
            </span>
          </button>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Next Collection Card */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs">Your next collection is</p>
          <p className="text-lg font-semibold text-gray-800 mt-1">Tuesday, April 15th</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="bg-gray-100 rounded-full p-1">
              <span className="text-xs">🗑️</span>
            </div>
            <span className="text-sm font-medium text-gray-700">General Waste</span>
            <span className="text-xs text-gray-400 ml-auto">8:00 AM - 12:00 PM</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-6">
          <button onClick={onViewSchedule} className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-left">
            <span className="text-2xl mb-1 block">📅</span>
            <div className="font-medium text-gray-800 text-sm">Schedule</div>
            <div className="text-xs text-gray-400 mt-0.5">View →</div>
          </button>
          <button onClick={onReportIssue} className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-left">
            <span className="text-2xl mb-1 block">⚠️</span>
            <div className="font-medium text-gray-800 text-sm">Report Issue</div>
            <div className="text-xs text-gray-400 mt-0.5">Report →</div>
          </button>
        </div>

        {/* Recent Alerts */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-semibold text-sm mb-3">RECENT ALERTS</h3>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-gray-800 text-sm">{alert.title}</p>
                <p className="text-gray-500 text-xs mt-1">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-gray-800 font-semibold text-sm">Schedule</h3>
            <button onClick={onViewSchedule} className="text-green-600 text-xs">View All →</button>
          </div>
          <div className="space-y-3">
            {scheduleItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div className="flex-1">
                  {item.date && <p className="text-xs text-gray-400">{item.date}</p>}
                  <p className="font-medium text-gray-800 text-sm mt-1">{item.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{item.time}</p>
                  <p className={`text-xs ${item.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;