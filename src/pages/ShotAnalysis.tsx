import React, { useState } from 'react';
import { Wind, Thermometer, ArrowUpRight, Target } from 'lucide-react';

interface ShotData {
  conditions: {
    temperature: string;
    humidity: string;
    pressure: string;
    altitude: string;
    wind: {
      speed: string;
      direction: string;
    };
  };
  shot: {
    intendedYardage: number;
    adjustedYardage: number;
    actualYardage: number;
    suggestedClub: string;
    alternateClub: string;
    flightPath: {
      apex: string;
      landingAngle: string;
      carry: string;
      total: string;
    };
  };
}

const ShotAnalysis: React.FC = () => {
  const [shotData] = useState<ShotData>({
    conditions: {
      temperature: "72°F",
      humidity: "45%",
      pressure: "29.92 inHg",
      altitude: "850 ft",
      wind: {
        speed: "12 mph",
        direction: "NNE"
      }
    },
    shot: {
      intendedYardage: 150,
      adjustedYardage: 156,
      actualYardage: 153,
      suggestedClub: "7 Iron",
      alternateClub: "6 Iron",
      flightPath: {
        apex: "82 ft",
        landingAngle: "45°",
        carry: "148 yards",
        total: "153 yards"
      }
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Shot Analysis</h1>

      <div className="grid gap-6">
        {/* Conditions Card */}
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Current Conditions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-gray-900/30 p-4 rounded-lg">
              <Thermometer className="text-emerald-500" />
              <div>
                <p className="text-sm text-emerald-500">Temperature</p>
                <p className="text-lg text-white">{shotData.conditions.temperature}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-900/30 p-4 rounded-lg">
              <Wind className="text-emerald-500" />
              <div>
                <p className="text-sm text-emerald-500">Wind</p>
                <p className="text-lg text-white">{shotData.conditions.wind.speed} {shotData.conditions.wind.direction}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-900/30 p-4 rounded-lg">
              <Target className="text-emerald-500" />
              <div>
                <p className="text-sm text-emerald-500">Altitude</p>
                <p className="text-lg text-white">{shotData.conditions.altitude}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shot Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Shot Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-900/30 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-emerald-500">Intended Distance</p>
                  <p className="text-lg text-white">{shotData.shot.intendedYardage} yards</p>
                </div>
                <ArrowUpRight className="text-emerald-500" size={24} />
              </div>
              <div className="flex justify-between items-center bg-gray-900/30 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-emerald-500">Adjusted Distance</p>
                  <p className="text-lg text-white">{shotData.shot.adjustedYardage} yards</p>
                </div>
                <ArrowUpRight className="text-emerald-500" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Club Selection</h2>
            <div className="space-y-4">
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <p className="text-sm text-emerald-500">Suggested Club</p>
                <p className="text-2xl text-white">{shotData.shot.suggestedClub}</p>
                <p className="text-sm text-gray-400 mt-1">Primary recommendation</p>
              </div>
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <p className="text-sm text-emerald-500">Alternative</p>
                <p className="text-2xl text-white">{shotData.shot.alternateClub}</p>
                <p className="text-sm text-gray-400 mt-1">Secondary option</p>
              </div>
            </div>
          </div>
        </div>

        {/* Flight Path Details */}
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Flight Path Analysis</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <p className="text-sm text-emerald-500">Apex</p>
              <p className="text-2xl text-white">{shotData.shot.flightPath.apex}</p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <p className="text-sm text-emerald-500">Landing Angle</p>
              <p className="text-2xl text-white">{shotData.shot.flightPath.landingAngle}</p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <p className="text-sm text-emerald-500">Carry</p>
              <p className="text-2xl text-white">{shotData.shot.flightPath.carry}</p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <p className="text-sm text-emerald-500">Total</p>
              <p className="text-2xl text-white">{shotData.shot.flightPath.total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShotAnalysis;
