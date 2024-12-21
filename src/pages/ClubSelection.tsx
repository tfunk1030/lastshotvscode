import React, { useState } from 'react';
import { Club } from 'lucide-react';

interface ClubData {
  name: string;
  type: string;
  loft: number;
  averageDistance: number;
}

const ClubSelection: React.FC = () => {
  const [selectedClub, setSelectedClub] = useState<string>('');
  
  const clubs: ClubData[] = [
    { name: 'Driver', type: 'Wood', loft: 10.5, averageDistance: 230 },
    { name: '3-Wood', type: 'Wood', loft: 15, averageDistance: 215 },
    { name: '5-Iron', type: 'Iron', loft: 27, averageDistance: 180 },
    { name: '7-Iron', type: 'Iron', loft: 34, averageDistance: 160 },
    { name: 'PW', type: 'Wedge', loft: 46, averageDistance: 120 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Club Selection</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Club List */}
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Available Clubs</h2>
          <div className="space-y-4">
            {clubs.map((club) => (
              <div
                key={club.name}
                onClick={() => setSelectedClub(club.name)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedClub === club.name
                    ? 'bg-emerald-600/20 border-emerald-500'
                    : 'bg-gray-900/30 hover:bg-gray-900/50'
                } border border-gray-700`}
              >
                <div className="flex items-center gap-4">
                  <Club className="text-emerald-500" size={24} />
                  <div>
                    <h3 className="font-medium text-white">{club.name}</h3>
                    <p className="text-sm text-gray-400">{club.type}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-emerald-400">{club.averageDistance} yards</p>
                    <p className="text-sm text-gray-400">{club.loft}° loft</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Club Details */}
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Club Details</h2>
          {selectedClub ? (
            <div className="space-y-6">
              {/* Club details would go here */}
              <p className="text-gray-300">Selected club: {selectedClub}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/30 p-4 rounded-lg">
                  <p className="text-sm text-emerald-500">Average Distance</p>
                  <p className="text-2xl text-white">
                    {clubs.find(c => c.name === selectedClub)?.averageDistance} yards
                  </p>
                </div>
                <div className="bg-gray-900/30 p-4 rounded-lg">
                  <p className="text-sm text-emerald-500">Loft Angle</p>
                  <p className="text-2xl text-white">
                    {clubs.find(c => c.name === selectedClub)?.loft}°
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Select a club to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubSelection;
