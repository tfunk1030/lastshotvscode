import React, { useState } from 'react';
import { Sliders, BarChart, Wind, Crosshair, RotateCcw, Play } from 'lucide-react';

interface FlightParameters {
  launchAngle: number;
  ballSpeed: number;
  spinRate: number;
  spinAxis: number;
}

interface TestResult {
  carry: number;
  totalDistance: number;
  maxHeight: number;
  landingAngle: number;
  flightTime: number;
}

const FlightTesting: React.FC = () => {
  const [parameters, setParameters] = useState<FlightParameters>({
    launchAngle: 12.5,
    ballSpeed: 165,
    spinRate: 2800,
    spinAxis: 0
  });

  const [results, setResults] = useState<TestResult>({
    carry: 245,
    totalDistance: 265,
    maxHeight: 85,
    landingAngle: 42,
    flightTime: 6.2
  });

  const handleParameterChange = (param: keyof FlightParameters, value: number) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleTest = () => {
    // In a real implementation, this would calculate actual results
    // based on the physics engine
    console.log('Testing with parameters:', parameters);
  };

  const handleReset = () => {
    setParameters({
      launchAngle: 12.5,
      ballSpeed: 165,
      spinRate: 2800,
      spinAxis: 0
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Flight Testing</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parameters Panel */}
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-emerald-400">Launch Parameters</h2>
            <button
              onClick={handleReset}
              className="p-2 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors"
            >
              <RotateCcw className="text-emerald-400" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Launch Angle */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-emerald-500">Launch Angle</label>
                <span className="text-sm text-gray-400">{parameters.launchAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={parameters.launchAngle}
                onChange={(e) => handleParameterChange('launchAngle', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-900/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Ball Speed */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-emerald-500">Ball Speed</label>
                <span className="text-sm text-gray-400">{parameters.ballSpeed} mph</span>
              </div>
              <input
                type="range"
                min="120"
                max="190"
                step="1"
                value={parameters.ballSpeed}
                onChange={(e) => handleParameterChange('ballSpeed', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-900/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Spin Rate */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-emerald-500">Spin Rate</label>
                <span className="text-sm text-gray-400">{parameters.spinRate} rpm</span>
              </div>
              <input
                type="range"
                min="1500"
                max="4000"
                step="100"
                value={parameters.spinRate}
                onChange={(e) => handleParameterChange('spinRate', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-900/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Spin Axis */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-emerald-500">Spin Axis</label>
                <span className="text-sm text-gray-400">{parameters.spinAxis}°</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.5"
                value={parameters.spinAxis}
                onChange={(e) => handleParameterChange('spinAxis', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-900/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <button
              onClick={handleTest}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Run Test
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Primary Metrics */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Results</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Crosshair className="text-emerald-500 w-4 h-4" />
                  <p className="text-sm text-emerald-500">Carry</p>
                </div>
                <p className="text-2xl text-white">{results.carry} yards</p>
              </div>
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart className="text-emerald-500 w-4 h-4" />
                  <p className="text-sm text-emerald-500">Max Height</p>
                </div>
                <p className="text-2xl text-white">{results.maxHeight} feet</p>
              </div>
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Sliders className="text-emerald-500 w-4 h-4" />
                  <p className="text-sm text-emerald-500">Landing Angle</p>
                </div>
                <p className="text-2xl text-white">{results.landingAngle}°</p>
              </div>
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Wind className="text-emerald-500 w-4 h-4" />
                  <p className="text-sm text-emerald-500">Flight Time</p>
                </div>
                <p className="text-2xl text-white">{results.flightTime}s</p>
              </div>
            </div>
          </div>

          {/* Optimization Tips */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Optimization Tips</h2>
            <div className="space-y-3">
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <p className="text-sm text-emerald-500">Launch Angle</p>
                <p className="text-gray-300">Optimal range for current speed: 11-13°</p>
              </div>
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <p className="text-sm text-emerald-500">Spin Rate</p>
                <p className="text-gray-300">Consider reducing spin for more distance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightTesting;
