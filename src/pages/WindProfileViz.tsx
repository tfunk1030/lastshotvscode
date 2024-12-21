import React, { useEffect, useRef, useState } from 'react';
import { Wind, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface WindProfile {
  speed: number;
  direction: number;
  altitude: number;
  turbulence: number;
}

interface ShotAdjustment {
  distance: number;
  lateral: number;
  conditions: {
    wind: {
      headwind: number;
      crosswind: number;
    };
    altitude: {
      carry: number;
      total: number;
    };
    temperature: {
      distance: number;
    };
  };
}

const WindProfileViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedAltitude, setSelectedAltitude] = useState(100);
  const [shotParams, setShotParams] = useState({
    direction: 0,
    yardage: 150,
    height: 10
  });
  const [adjustment, setAdjustment] = useState<ShotAdjustment>({ 
    distance: 0, 
    lateral: 0,
    conditions: {
      wind: {
        headwind: 0,
        crosswind: 0
      },
      altitude: {
        carry: 0,
        total: 0
      },
      temperature: {
        distance: 0
      }
    }
  });

  const windProfiles: WindProfile[] = [
    { speed: 10, direction: 45, altitude: 0, turbulence: 0.1 },
    { speed: 12, direction: 50, altitude: 50, turbulence: 0.15 },
    { speed: 15, direction: 55, altitude: 100, turbulence: 0.2 },
    { speed: 18, direction: 60, altitude: 150, turbulence: 0.25 },
    { speed: 20, direction: 65, altitude: 200, turbulence: 0.3 }
  ];

  const calculateWindAdjustment = () => {
    const currentWind = windProfiles.find(p => p.altitude === selectedAltitude) || windProfiles[0];
    
    // Calculate wind effect based on shot parameters
    const windAngleRadians = (currentWind.direction - shotParams.direction) * (Math.PI / 180);
    
    // Headwind/tailwind component affects distance
    const distanceEffect = Math.cos(windAngleRadians) * currentWind.speed * 0.1;
    
    // Crosswind component affects lateral movement
    const lateralEffect = Math.sin(windAngleRadians) * currentWind.speed * 0.1;
    
    // Height factor - higher shots are affected more by wind
    const heightFactor = 1 + (shotParams.height / 100);
    
    // Calculate individual condition effects
    const headwindEffect = Math.cos(windAngleRadians) * currentWind.speed * 0.1;
    const crosswindEffect = Math.sin(windAngleRadians) * currentWind.speed * 0.1;
    
    // Altitude effect (approximately 2% per 1000ft)
    const altitudeEffect = (currentWind.altitude / 1000) * 0.02;
    
    // Temperature effect (baseline at 70°F)
    const temperatureEffect = ((70 - 70) / 10) * 0.01; // Example temperature adjustment
    
    // Combined effects
    const totalDistanceEffect = distanceEffect * heightFactor * (shotParams.yardage / 100);
    const totalLateralEffect = lateralEffect * heightFactor * (shotParams.yardage / 100);

    setAdjustment({
      distance: totalDistanceEffect,
      lateral: totalLateralEffect,
      conditions: {
        wind: {
          headwind: headwindEffect * shotParams.yardage,
          crosswind: crosswindEffect * shotParams.yardage
        },
        altitude: {
          carry: altitudeEffect * shotParams.yardage,
          total: (altitudeEffect * 1.1) * shotParams.yardage // Total includes roll
        },
        temperature: {
          distance: temperatureEffect * shotParams.yardage
        }
      }
    });
  };

  const drawWindRose = (ctx: CanvasRenderingContext2D) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw compass rose
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw wind vector
    const currentWind = windProfiles.find(p => p.altitude === selectedAltitude) || windProfiles[0];
    const angle = (currentWind.direction - 90) * (Math.PI / 180);
    const length = (currentWind.speed / 20) * radius;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(angle) * length,
      centerY + Math.sin(angle) * length
    );
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw arrow head
    const headLength = 15;
    const headAngle = Math.PI / 6;

    ctx.beginPath();
    ctx.moveTo(
      centerX + Math.cos(angle) * length,
      centerY + Math.sin(angle) * length
    );
    ctx.lineTo(
      centerX + Math.cos(angle) * length - headLength * Math.cos(angle - headAngle),
      centerY + Math.sin(angle) * length - headLength * Math.sin(angle - headAngle)
    );
    ctx.lineTo(
      centerX + Math.cos(angle) * length - headLength * Math.cos(angle + headAngle),
      centerY + Math.sin(angle) * length - headLength * Math.sin(angle + headAngle)
    );
    ctx.closePath();
    ctx.fillStyle = '#10b981';
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 400;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawWindRose(ctx);
  }, [selectedAltitude]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Wind Profile Visualization</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wind Rose */}
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Wind Rose</h2>
          <canvas
            ref={canvasRef}
            className="w-full bg-gray-900/50 rounded-lg"
          />
          
          {/* Altitude Selection */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium text-emerald-400">Select Altitude</h3>
            <div className="grid grid-cols-2 gap-4">
              {windProfiles.map((profile) => (
                <button
                  key={profile.altitude}
                  onClick={() => setSelectedAltitude(profile.altitude)}
                  className={`p-3 rounded-lg transition-colors ${
                    selectedAltitude === profile.altitude
                      ? 'bg-emerald-600/20 border-emerald-500'
                      : 'bg-gray-900/30 hover:bg-gray-900/50'
                  } border border-gray-700`}
                >
                  <div className="text-sm text-emerald-400">{profile.altitude} ft</div>
                  <div className="text-xs text-gray-400">{profile.speed} mph</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Shot Calculator */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Shot Calculator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-emerald-500 mb-2">Shot Direction (degrees)</label>
                <input
                  type="number"
                  value={shotParams.direction}
                  onChange={(e) => setShotParams(prev => ({ ...prev, direction: Number(e.target.value) }))}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-emerald-300"
                  placeholder="0-360 degrees"
                />
              </div>
              <div>
                <label className="block text-sm text-emerald-500 mb-2">Shot Distance (yards)</label>
                <input
                  type="number"
                  value={shotParams.yardage}
                  onChange={(e) => setShotParams(prev => ({ ...prev, yardage: Number(e.target.value) }))}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-emerald-300"
                  placeholder="Enter yardage"
                />
              </div>
              <div>
                <label className="block text-sm text-emerald-500 mb-2">Max Height (feet)</label>
                <input
                  type="number"
                  value={shotParams.height}
                  onChange={(e) => setShotParams(prev => ({ ...prev, height: Number(e.target.value) }))}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-emerald-300"
                  placeholder="Enter max height"
                />
              </div>
              <button
                onClick={calculateWindAdjustment}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-500 transition-colors"
              >
                Calculate Adjustment
              </button>
            </div>
          </div>

          {/* Detailed Adjustment Results */}
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Shot Adjustments</h2>
            
            {/* Total Adjustments */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <p className="text-sm text-emerald-500">Total Distance Adjustment</p>
                <p className="text-2xl text-white">
                  {adjustment.distance > 0 ? '+' : ''}{adjustment.distance.toFixed(1)} yards
                </p>
                <p className="text-xs text-gray-400">
                  {adjustment.distance > 0 ? 'Add' : 'Subtract'} to total distance
                </p>
              </div>
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <p className="text-sm text-emerald-500">Total Lateral Adjustment</p>
                <p className="text-2xl text-white">
                  {adjustment.lateral > 0 ? '+' : ''}{adjustment.lateral.toFixed(1)} yards
                </p>
                <p className="text-xs text-gray-400">
                  {adjustment.lateral > 0 ? 'Right' : 'Left'} of target
                </p>
              </div>
            </div>

            {/* Detailed Condition Effects */}
            <div className="space-y-4">
              {/* Wind Effects */}
              <div className="bg-gray-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-emerald-400 mb-3">Wind Effects</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-emerald-500">Headwind/Tailwind</p>
                    <p className="text-lg text-white">
                      {adjustment.conditions.wind.headwind > 0 ? '+' : ''}
                      {adjustment.conditions.wind.headwind.toFixed(1)} yards
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-emerald-500">Crosswind</p>
                    <p className="text-lg text-white">
                      {adjustment.conditions.wind.crosswind > 0 ? '+' : ''}
                      {adjustment.conditions.wind.crosswind.toFixed(1)} yards
                    </p>
                  </div>
                </div>
              </div>

              {/* Altitude Effects */}
              <div className="bg-gray-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-emerald-400 mb-3">Altitude Effects</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-emerald-500">Carry Distance</p>
                    <p className="text-lg text-white">
                      {adjustment.conditions.altitude.carry > 0 ? '+' : ''}
                      {adjustment.conditions.altitude.carry.toFixed(1)} yards
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-emerald-500">Total Distance</p>
                    <p className="text-lg text-white">
                      {adjustment.conditions.altitude.total > 0 ? '+' : ''}
                      {adjustment.conditions.altitude.total.toFixed(1)} yards
                    </p>
                  </div>
                </div>
              </div>

              {/* Temperature Effect */}
              <div className="bg-gray-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-emerald-400 mb-3">Temperature Effect</h3>
                <div>
                  <p className="text-sm text-emerald-500">Distance Adjustment</p>
                  <p className="text-lg text-white">
                    {adjustment.conditions.temperature.distance > 0 ? '+' : ''}
                    {adjustment.conditions.temperature.distance.toFixed(1)} yards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindProfileViz;
