import React, { useState } from 'react';
import { Thermometer, Droplets, Mountain, Gauge, Club, Clock } from 'lucide-react';

const BasicCalculator: React.FC = () => {
  const [tab, setTab] = useState('shot');
  const [conditions, setConditions] = useState({
    temperature: '',
    humidity: '',
    altitude: '',
    pressure: ''
  });
  const [shot, setShot] = useState({
    club: '',
    distance: '',
    height: ''
  });
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [adjustments, setAdjustments] = useState({
    temperature: { yards: 0, direction: '', explanation: '' },
    altitude: { yards: 0, direction: '', explanation: '' },
    humidity: { yards: 0, direction: '', explanation: '' }
  });

  const tabs = [
    { id: 'shot', label: 'Shot', icon: Club },
    { id: 'conditions', label: 'Conditions', icon: Thermometer },
    { id: 'history', label: 'History', icon: Clock }
  ];

  const calculateShot = () => {
    setAdjustments({
      temperature: {
        yards: -2.3,
        direction: 'shorter',
        explanation: 'Cold air (45°F) increases density'
      },
      altitude: {
        yards: 3.1,
        direction: 'longer',
        explanation: 'Elevation (850ft) reduces air resistance'
      },
      humidity: {
        yards: -0.8,
        direction: 'shorter',
        explanation: 'High humidity affects ball spin'
      }
    });
    setShowAdjustments(true);
  };

  const renderShotTab = () => (
    <div className="space-y-4 scroll-container">
      <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-md border border-gray-700/50">
        <h3 className="text-xl font-semibold text-emerald-400 mb-4">Shot Details</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-base font-medium text-emerald-500 mb-2">Club Selection</label>
            <select 
              value={shot.club}
              onChange={(e) => setShot({...shot, club: e.target.value})}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-emerald-300 focus:ring-2 focus:ring-emerald-500 text-lg appearance-none"
            >
              <option value="">Select Club</option>
              <option value="driver">Driver</option>
              <option value="3-wood">3 Wood</option>
              <option value="5-iron">5 Iron</option>
              <option value="7-iron">7 Iron</option>
              <option value="pw">Pitching Wedge</option>
            </select>
          </div>
          
          <div>
            <label className="block text-base font-medium text-emerald-500 mb-2">Distance (yards)</label>
            <input
              type="number"
              inputMode="decimal"
              pattern="[0-9]*"
              value={shot.distance}
              onChange={(e) => setShot({...shot, distance: e.target.value})}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-emerald-300 focus:ring-2 focus:ring-emerald-500 text-lg"
              placeholder="Enter distance"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-md border border-gray-700/50">
        <h3 className="text-xl font-semibold text-emerald-400 mb-4">Current Conditions</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 bg-gray-900/30 p-3 rounded-lg">
            <Thermometer className="text-emerald-500 w-6 h-6" />
            <div>
              <p className="text-sm text-emerald-500">Temperature</p>
              <p className="text-lg text-white">{conditions.temperature || '--'}°F</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-900/30 p-3 rounded-lg">
            <Droplets className="text-emerald-500 w-6 h-6" />
            <div>
              <p className="text-sm text-emerald-500">Humidity</p>
              <p className="text-lg text-white">{conditions.humidity || '--'}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-900/30 p-3 rounded-lg">
            <Mountain className="text-emerald-500 w-6 h-6" />
            <div>
              <p className="text-sm text-emerald-500">Altitude</p>
              <p className="text-lg text-white">{conditions.altitude || '--'} ft</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-900/30 p-3 rounded-lg">
            <Gauge className="text-emerald-500 w-6 h-6" />
            <div>
              <p className="text-sm text-emerald-500">Pressure</p>
              <p className="text-lg text-white">{conditions.pressure || '--'} inHg</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={calculateShot}
        className="w-full bg-emerald-600 text-white py-5 rounded-xl font-semibold active:bg-emerald-700 transition-colors text-lg no-select"
      >
        Calculate Shot
      </button>

      {showAdjustments && (
        <div className="space-y-3">
          {Object.entries(adjustments).map(([condition, data]) => (
            <div 
              key={condition}
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-emerald-400 capitalize">{condition}</span>
                <span className={`text-lg ${data.direction === 'longer' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {data.direction === 'longer' ? '+' : ''}{data.yards} yards
                </span>
              </div>
              <p className="text-sm text-gray-400">{data.explanation}</p>
            </div>
          ))}
          <div className="bg-emerald-900/30 rounded-lg p-4 border border-emerald-700/50">
            <div className="flex justify-between items-center">
              <span className="text-emerald-400 font-medium">Total Adjustment</span>
              <span className="text-xl text-emerald-400">
                {Object.values(adjustments).reduce((sum, adj) => sum + adj.yards, 0).toFixed(1)} yards
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-yellow-500/10 rounded-xl p-4 flex items-center gap-4">
        <div className="bg-yellow-500/20 rounded-lg p-2">
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-yellow-500 font-medium">Upgrade to Pro</p>
          <p className="text-sm text-yellow-500/80">Get access to advanced wind calculations</p>
        </div>
        <button className="bg-yellow-500 text-gray-900 px-4 py-3 rounded-lg font-medium active:bg-yellow-600 transition-colors no-select">
          Upgrade
        </button>
      </div>
    </div>
  );

  const renderConditionsTab = () => (
    <div className="space-y-4 scroll-container">
      <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-md border border-gray-700/50">
        <h3 className="text-xl font-semibold text-emerald-400 mb-4">Environmental Conditions</h3>
        <div className="grid gap-4">
          {Object.entries(conditions).map(([key, value]) => (
            <div key={key}>
              <label className="block text-base font-medium text-emerald-500 mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="number"
                inputMode="decimal"
                pattern="[0-9]*"
                value={value}
                onChange={(e) => setConditions({...conditions, [key]: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-emerald-300 focus:ring-2 focus:ring-emerald-500 text-lg"
                placeholder={`Enter ${key}`}
              />
            </div>
          ))}
        </div>
      </div>

      <button className="w-full bg-emerald-600 text-white py-5 rounded-xl font-semibold active:bg-emerald-700 transition-colors text-lg no-select">
        Get Current Conditions
      </button>
    </div>
  );

  const renderContent = () => {
    switch(tab) {
      case 'shot': return renderShotTab();
      case 'conditions': return renderConditionsTab();
      default: return renderShotTab();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 touch-manipulation ios-height-fix">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-emerald-400 text-center w-full">Shot Calculator</h1>
        </div>

        <div className="flex justify-between bg-gray-800/50 rounded-xl p-1 backdrop-blur-md mb-4 overflow-x-auto no-select">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors min-w-[100px] justify-center ${
                tab === id 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-gray-400 active:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default BasicCalculator;
