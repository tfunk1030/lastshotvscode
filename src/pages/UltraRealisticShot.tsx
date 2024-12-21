import React, { useState, useRef, useEffect } from 'react';
import { Wind, Thermometer, Mountain, Gauge, Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface ShotSettings {
  club: string;
  power: number;
  aim: number;
  elevation: number;
}

interface Environment {
  windSpeed: number;
  windDirection: string;
  temperature: number;
  humidity: number;
  altitude: number;
  pressure: number;
}

const UltraRealisticShot: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [settings, setSettings] = useState<ShotSettings>({
    club: 'DRIVER',
    power: 100,
    aim: 0,
    elevation: 0
  });
  const [environment] = useState<Environment>({
    windSpeed: 12,
    windDirection: 'NNE',
    temperature: 72,
    humidity: 45,
    altitude: 850,
    pressure: 29.92
  });

  const drawScene = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(1, '#1e293b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height * 0.7);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < canvas.height * 0.7; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 400;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawScene(ctx);
  }, []);

  const handlePowerChange = (value: number) => {
    setSettings(prev => ({ ...prev, power: value }));
  };

  const handleAimChange = (value: number) => {
    setSettings(prev => ({ ...prev, aim: value }));
  };

  const handleElevationChange = (value: number) => {
    setSettings(prev => ({ ...prev, elevation: value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Ultra-Realistic Shot</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Visualization */}
        <div className="lg:col-span-2 bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full rounded-lg bg-gray-900/50"
            />
            
            <div className="absolute bottom-4 left-4 flex space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-gray-800/80 rounded-lg hover:bg-gray-700/80 transition-colors"
              >
                {isPlaying ? 
                  <Pause className="text-emerald-400" /> : 
                  <Play className="text-emerald-400" />
                }
              </button>
              <button
                className="p-2 bg-gray-800/80 rounded-lg hover:bg-gray-700/80 transition-colors"
              >
                <RotateCcw className="text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Shot Controls */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-emerald-500">Power</label>
                <span className="text-sm text-gray-400">{settings.power}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={settings.power}
                onChange={(e) => handlePowerChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-900/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-emerald-500">Aim</label>
                <span className="text-sm text-gray-400">{settings.aim}°</span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                value={settings.aim}
                onChange={(e) => handleAimChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-900/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-emerald-500">Elevation</label>
                <span className="text-sm text-gray-400">{settings.elevation}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={settings.elevation}
                onChange={(e) => handleElevationChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-900/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Environment Panel */}
        <div className="space-y-6">
          {/* Club Selection */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Club Selection</h2>
            <select 
              value={settings.club}
              onChange={(e) => setSettings(prev => ({ ...prev, club: e.target.value }))}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-emerald-300"
            >
              <option value="DRIVER">Driver</option>
              <option value="3-WOOD">3 Wood</option>
              <option value="5-IRON">5 Iron</option>
              <option value="7-IRON">7 Iron</option>
              <option value="PW">Pitching Wedge</option>
            </select>
          </div>

          {/* Environmental Conditions */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Environment</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/30 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wind className="text-emerald-500 w-4 h-4" />
                  <p className="text-sm text-emerald-500">Wind</p>
                </div>
                <p className="text-lg text-white">{environment.windSpeed} mph {environment.windDirection}</p>
              </div>
              <div className="bg-gray-900/30 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Thermometer className="text-emerald-500 w-4 h-4" />
                  <p className="text-sm text-emerald-500">Temp</p>
                </div>
                <p className="text-lg text-white">{environment.temperature}°F</p>
              </div>
              <div className="bg-gray-900/30 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Mountain className="text-emerald-500 w-4 h-4" />
                  <p className="text-sm text-emerald-500">Altitude</p>
                </div>
                <p className="text-lg text-white">{environment.altitude} ft</p>
              </div>
              <div className="bg-gray-900/30 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Gauge className="text-emerald-500 w-4 h-4" />
                  <p className="text-sm text-emerald-500">Pressure</p>
                </div>
                <p className="text-lg text-white">{environment.pressure} inHg</p>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-emerald-400">Advanced</h2>
              <button className="p-2 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors">
                <Settings className="text-emerald-400 w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Spin optimization</span>
                <span className="text-emerald-400">Enabled</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Ground effect</span>
                <span className="text-emerald-400">Enabled</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Air density calc</span>
                <span className="text-emerald-400">Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltraRealisticShot;
