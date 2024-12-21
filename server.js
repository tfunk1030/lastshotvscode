const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const BallFlightCalculator = require('./ball-flight-physics.js');
const { calculateEnvironmentalImpact } = require('./environmental-calculations.js');

const app = express();
const port = process.env.PORT || 3333;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));  // Serve static files from current directory

// Root route to serve the test client
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test-client.html');
});

// Initialize ball flight calculator
const ballFlightCalculator = new BallFlightCalculator();

// Routes
app.post('/api/analyze-shot', (req, res) => {
    try {
        const {
            initialConditions,
            environmentalConditions,
            clubData
        } = req.body;

        // Calculate environmental impact
        const environmentalImpact = calculateEnvironmentalImpact(environmentalConditions);

        // Calculate trajectory
        const trajectory = ballFlightCalculator.calculateTrajectory(
            initialConditions,
            {
                ...environmentalConditions,
                airDensity: environmentalImpact.airDensity
            },
            clubData
        );

        // Calculate final results
        const results = {
            trajectory,
            environmentalImpact,
            shotMetrics: {
                carry: trajectory[trajectory.length - 2].position.x,
                totalDistance: trajectory[trajectory.length - 1].position.x,
                apex: Math.max(...trajectory.map(point => point.position.y)),
                landingAngle: calculateLandingAngle(trajectory)
            }
        };

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/environmental-conditions', (req, res) => {
    try {
        const conditions = req.body;
        const impact = calculateEnvironmentalImpact(conditions);
        res.json(impact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Helper function to calculate landing angle
function calculateLandingAngle(trajectory) {
    if (trajectory.length < 2) return 0;
    
    // Get last two points before ground contact
    const lastPoint = trajectory[trajectory.length - 2];
    const secondLastPoint = trajectory[trajectory.length - 3];
    
    // Calculate angle using arctangent
    const deltaY = lastPoint.position.y - secondLastPoint.position.y;
    const deltaX = lastPoint.position.x - secondLastPoint.position.x;
    const angleRadians = Math.atan2(Math.abs(deltaY), deltaX);
    
    // Convert to degrees
    return angleRadians * (180 / Math.PI);
}

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
