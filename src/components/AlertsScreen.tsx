import React from 'react';

interface AlertsScreenProps {
  onBack: () => void;
}

const AlertsScreen: React.FC<AlertsScreenProps> = ({ onBack }) => {
  const alerts = [
    { id: 1, title: 'Holiday Schedule Change', message: 'No pickup on Monday, April 20th', date: 'April 10, 2026', read: false, type: 'warning' },
    { id: 2, title: 'New recycling guidelines', message: 'Plastic types 1-7 now accepted', date: 'April 5, 2026', read: false, type: 'info' },
    { id: 3, title: 'Weather Delay Notice', message: 'Collections may be delayed', date: 'April 3, 2026', read: true, type: 'info' },
    { id: 4, title: 'Service Update', message: 'New routes added', date: 'April 1, 2026', read: true, type: 'info' },
  ];

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-600 text-2xl">←</button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Alerts</h1>
              <p className="text-gray-400 text-xs mt-0.5">Stay informed</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <div className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount} new</div>
          )}
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-3 rounded-lg ${!alert.read ? 'bg-gray-50' : ''}`}>
              <div className="flex gap-3">
                <span className="text-lg">{alert.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className={`text-sm ${!alert.read ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                      {alert.title}
                    </h3>
                    {!alert.read && <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">New</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{alert.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsScreen;