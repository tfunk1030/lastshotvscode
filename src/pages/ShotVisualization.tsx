import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Maximize2 } from 'lucide-react';

interface TrajectoryPoint {
  x: number;
  y: number;
  time: number;
}

const ShotVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number>();

  const trajectory: TrajectoryPoint[] = [
    { x: 0, y: 0, time: 0 },
    { x: 50, y: 30, time: 0.5 },
    { x: 100, y: 50, time: 1 },
    { x: 150, y: 60, time: 1.5 },
    { x: 200, y: 55, time: 2 },
    { x: 250, y: 40, time: 2.5 },
    { x: 300, y: 20, time: 3 },
    { x: 350, y: 0, time: 3.5 }
  ];

  const drawTrajectory = (ctx: CanvasRenderingContext2D, progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up coordinate system (origin at bottom left)
    ctx.save();
    ctx.translate(50, canvas.height - 50);
    ctx.scale(1, -1);

    // Draw ground line
    ctx.beginPath();
    ctx.strokeStyle = '#374151';
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width - 100, 0);
    ctx.stroke();

    // Draw trajectory
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    
    const currentPoints = trajectory.filter(point => point.time <= progress * 3.5);
    
    currentPoints.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x * 2, point.y * 2);
      } else {
        ctx.lineTo(point.x * 2, point.y * 2);
      }
    });
    
    ctx.stroke();

    // Draw ball at current position
    if (currentPoints.length > 0) {
      const lastPoint = currentPoints[currentPoints.length - 1];
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(lastPoint.x * 2, lastPoint.y * 2, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw grid
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let x = 0; x <= canvas.width - 100; x += 100) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height - 100);
      ctx.stroke();
      
      // Draw yardage markers
      ctx.save();
      ctx.scale(1, -1);
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Arial';
      ctx.fillText(`${x/2}y`, x - 10, 20);
      ctx.restore();
    }

    // Horizontal grid lines
    for (let y = 0; y <= canvas.height - 100; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width - 100, y);
      ctx.stroke();
      
      // Draw height markers
      ctx.save();
      ctx.scale(1, -1);
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Arial';
      ctx.fillText(`${y/2}ft`, -40, -y + 4);
      ctx.restore();
    }

    ctx.restore();
  };

  const animate = (timestamp: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    if (isPlaying) {
      setProgress(prev => {
        const newProgress = prev + 0.005;
        return newProgress > 1 ? 1 : newProgress;
      });
    }

    drawTrajectory(ctx, progress);
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Shot Visualization</h1>

      <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-gray-700/50">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-[400px] bg-gray-900/50 rounded-lg"
          />
          
          <div className="absolute bottom-4 left-4 flex space-x-2">
            <button
              onClick={handlePlayPause}
              className="p-2 bg-gray-800/80 rounded-lg hover:bg-gray-700/80 transition-colors"
            >
              {isPlaying ? <Pause className="text-emerald-400" /> : <Play className="text-emerald-400" />}
            </button>
            <button
              onClick={handleReset}
              className="p-2 bg-gray-800/80 rounded-lg hover:bg-gray-700/80 transition-colors"
            >
              <RotateCcw className="text-emerald-400" />
            </button>
          </div>

          <div className="absolute top-4 right-4">
            <button className="p-2 bg-gray-800/80 rounded-lg hover:bg-gray-700/80 transition-colors">
              <Maximize2 className="text-emerald-400" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900/30 p-4 rounded-lg">
            <p className="text-sm text-emerald-500">Carry Distance</p>
            <p className="text-2xl text-white">245 yards</p>
          </div>
          <div className="bg-gray-900/30 p-4 rounded-lg">
            <p className="text-sm text-emerald-500">Max Height</p>
            <p className="text-2xl text-white">89 feet</p>
          </div>
          <div className="bg-gray-900/30 p-4 rounded-lg">
            <p className="text-sm text-emerald-500">Landing Angle</p>
            <p className="text-2xl text-white">45°</p>
          </div>
          <div className="bg-gray-900/30 p-4 rounded-lg">
            <p className="text-sm text-emerald-500">Ball Speed</p>
            <p className="text-2xl text-white">168 mph</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShotVisualization;
