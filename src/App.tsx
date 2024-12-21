import { Routes, Route, Link } from 'react-router-dom'
import BasicCalculator from './pages/BasicCalculator'
import ClubSelection from './pages/ClubSelection'
import FlightTesting from './pages/FlightTesting'
import ShotAnalysis from './pages/ShotAnalysis'
import ShotVisualization from './pages/ShotVisualization'
import SimpleWeatherDisplay from './pages/SimpleWeatherDisplay'
import WindProfileViz from './pages/WindProfileViz'
import UltraRealisticShot from './pages/UltraRealisticShot'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <nav className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-emerald-400 text-xl font-bold">LastShot</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">Basic Calculator</Link>
              <Link to="/club-selection" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">Club Selection</Link>
              <Link to="/flight-testing" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">Flight Testing</Link>
              <Link to="/shot-analysis" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">Shot Analysis</Link>
              <Link to="/shot-visualization" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">Shot Visualization</Link>
              <Link to="/weather-display" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">Weather Display</Link>
              <Link to="/wind-profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">Wind Profile</Link>
              <Link to="/ultra-realistic" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">Ultra Realistic</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<BasicCalculator />} />
          <Route path="/club-selection" element={<ClubSelection />} />
          <Route path="/flight-testing" element={<FlightTesting />} />
          <Route path="/shot-analysis" element={<ShotAnalysis />} />
          <Route path="/shot-visualization" element={<ShotVisualization />} />
          <Route path="/weather-display" element={<SimpleWeatherDisplay />} />
          <Route path="/wind-profile" element={<WindProfileViz />} />
          <Route path="/ultra-realistic" element={<UltraRealisticShot />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
