import React, { useState } from 'react';
import { Cloud, Sun, Wind, Thermometer, Droplets, Gauge, Mountain } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: string;
  altitude: number;
  conditions: string;
}

const SimpleWeatherDisplay: React.FC = () => {
  const [weather] = useState<WeatherData>({
    temperature: 72,
    humidity: 45,
    pressure: 29.92,
    windSpeed: 12,
    windDirection: 'NNE',
    altitude: 850,
    conditions: 'Partly Cloudy'
  });

  const getWindDirectionArrow = (direction: string) => {
    const directions: { [key: string]: number } = {
      'N': 0, 'NNE': 22.5, 'NE': 45, 'ENE': 67.5,
      'E': 90, 'ESE': 112.5, 'SE': 135, 'SSE': 157.5,
      'S': 180, 'SSW': 202.5, 'SW': 225, 'WSW': 247.5,
      'W': 270, 'WNW': 292.5, 'NW': 315, 'NNW': 337.5
    };

    return `rotate(${directions[direction] || 0}deg)`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Weather Conditions</h1>

      {/* Main Weather Card */}
      <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-md border border-gray-700/50 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{weather.temperature}°F</h2>
            <p className="text-emerald-400 flex items-center gap-2">
              {weather.conditions === 'Partly Cloudy' ? (
                <>
                  <Cloud className="h-5 w-5" />
                  Partly Cloudy
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5" />
                  Sunny
                </>
              )}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-emerald-400">
              <Wind className="h-5 w-5" />
              <span>{weather.windSpeed} mph</span>
            </div>
            <div className="mt-2">
              <div 
                className="inline-block transform transition-transform"
                style={{ transform: getWindDirectionArrow(weather.windDirection) }}
              >
                ↑
              </div>
              <span className="ml-2 text-gray-400">{weather.windDirection}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Temperature & Humidity */}
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Temperature & Humidity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-gray-900/30 p-4 rounded-lg">
              <Thermometer className="text-emerald-500" />
              <div>
                <p className="text-sm text-emerald-500">Temperature</p>
                <p className="text-xl text-white">{weather.temperature}°F</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-900/30 p-4 rounded-lg">
              <Droplets className="text-emerald-500" />
              <div>
                <p className="text-sm text-emerald-500">Humidity</p>
                <p className="text-xl text-white">{weather.humidity}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pressure & Altitude */}
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Pressure & Altitude</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-gray-900/30 p-4 rounded-lg">
              <Gauge className="text-emerald-500" />
              <div>
                <p className="text-sm text-emerald-500">Pressure</p>
                <p className="text-xl text-white">{weather.pressure} inHg</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-900/30 p-4 rounded-lg">
              <Mountain className="text-emerald-500" />
              <div>
                <p className="text-sm text-emerald-500">Altitude</p>
                <p className="text-xl text-white">{weather.altitude} ft</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wind Conditions */}
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Wind Conditions</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-gray-900/30 p-4 rounded-lg">
              <Wind className="text-emerald-500" />
              <div>
                <p className="text-sm text-emerald-500">Wind Speed</p>
                <p className="text-xl text-white">{weather.windSpeed} mph</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-900/30 p-4 rounded-lg">
              <div className="text-emerald-500">
                <div 
                  className="inline-block transform transition-transform text-xl"
                  style={{ transform: getWindDirectionArrow(weather.windDirection) }}
                >
                  ↑
                </div>
              </div>
              <div>
                <p className="text-sm text-emerald-500">Wind Direction</p>
                <p className="text-xl text-white">{weather.windDirection}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Time */}
      <div className="mt-6 text-center text-gray-400">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default SimpleWeatherDisplay;
