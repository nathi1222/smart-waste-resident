import React, { useState } from 'react';

interface ServiceMapScreenProps {
  onBack: () => void;
}

const ServiceMapScreen: React.FC<ServiceMapScreenProps> = ({ onBack }) => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const serviceAreas = [
    { id: 'downtown', name: 'Downtown', status: 'active', delay: 0, type: 'collection' },
    { id: 'north', name: 'North Springfield', status: 'delayed', delay: 15, type: 'collection' },
    { id: 'south', name: 'South Springfield', status: 'active', delay: 0, type: 'collection' },
    { id: 'east', name: 'East Springfield', status: 'active', delay: 0, type: 'recycling' },
    { id: 'west', name: 'West Springfield', status: 'delayed', delay: 30, type: 'collection' },
  ];

  const dropOffPoints = [
    { name: 'Springfield Recycling Center', distance: '0.3 miles', hours: '8AM-6PM', icon: '♻️' },
    { name: 'Household Waste Depot', distance: '1.2 miles', hours: '9AM-5PM', icon: '🏭' },
    { name: 'Battery Drop-off', distance: '0.8 miles', hours: '24/7', icon: '🔋' },
    { name: 'Electronics Recycling', distance: '2.1 miles', hours: '10AM-4PM', icon: '💻' },
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-600' : 'text-amber-600';
  };

  const getStatusBadge = (status: string, delay: number) => {
    if (status === 'delayed') {
      return <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{delay}+ min delay</span>;
    }
    return <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">On time</span>;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-12"></div>
      <div className="px-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-600 text-2xl p-2 -ml-2">←</button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Service Map</h1>
            <p className="text-gray-400 text-xs mt-0.5">Real-time service status & locations</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 pb-20">
        {/* Map Placeholder */}
        <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center mb-4 relative overflow-hidden">
          <div className="text-center">
            <span className="text-4xl block mb-2">🗺️</span>
            <p className="text-gray-500 text-sm">Live Map View</p>
            <p className="text-gray-400 text-xs">(Google Maps Integration)</p>
          </div>
          {/* Mock location pin */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-md">
            <span className="text-xs">📍 Your Location: Main Street</span>
          </div>
        </div>

        {/* Your Location Card */}
        <div className="bg-green-50 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📍</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800 text-sm">Your Location</p>
              <p className="text-xs text-gray-500">45 Main Street, Springfield</p>
            </div>
            <button className="text-green-600 text-xs">Update →</button>
          </div>
        </div>

        {/* Service Alerts */}
        <div className="mb-5">
          <h3 className="text-gray-800 font-semibold text-sm mb-2">🚨 Service Alerts</h3>
          <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-500">
            <p className="text-sm font-medium text-amber-800">Weather Delay</p>
            <p className="text-xs text-amber-700 mt-1">Collections delayed in North & West Springfield due to severe weather</p>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mb-5">
          <h3 className="text-gray-800 font-semibold text-sm mb-2">📍 Service Areas</h3>
          <div className="space-y-2">
            {serviceAreas.map((area) => (
              <div
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`bg-gray-50 rounded-lg p-3 cursor-pointer transition ${
                  selectedArea === area.id ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{area.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{area.type}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(area.status, area.delay)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drop-off Points */}
        <div>
          <h3 className="text-gray-800 font-semibold text-sm mb-2">📍 Nearby Drop-off Points</h3>
          <div className="space-y-2">
            {dropOffPoints.map((point, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">{point.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{point.name}</p>
                    <p className="text-xs text-gray-400">{point.distance} • {point.hours}</p>
                  </div>
                  <button className="text-green-600 text-xs">Directions →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="pb-2 flex justify-center">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default ServiceMapScreen;