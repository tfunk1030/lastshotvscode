# LastShot Mobile Golf Calculator

A mobile-optimized golf shot calculator that helps players calculate shot adjustments based on environmental conditions.

## Features

- Mobile-first design optimized for iOS and Android
- Environmental condition adjustments (temperature, humidity, altitude)
- Club selection assistance
- Shot distance calculations
- Touch-friendly interface
- Responsive layout for all screen sizes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tfunk1030/lastshotvscode.git
cd lastshotvscode
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Using the UI with Your Own Research Data

This UI is designed to be easily integrated with external research data and calculations. Here's how to use it with your own research:

### Integration Methods

1. **Direct Import Method**
   - Import your research algorithms as JavaScript modules
   - Integrate directly into the frontend code
   - Best for simple calculations and immediate results

2. **API Integration Method**
   - Set up your research as a backend service
   - Connect through API endpoints
   - Example integration in BasicCalculator.tsx:
   ```typescript
   const calculateShot = async () => {
     const response = await fetch('your-api/calculate', {
       method: 'POST',
       body: JSON.stringify({
         temperature: conditions.temperature,
         humidity: conditions.humidity,
         altitude: conditions.altitude,
         club: shot.club,
         distance: shot.distance
       })
     });
     const data = await response.json();
     setAdjustments(data.adjustments);
   };
   ```

3. **Hybrid Approach**
   - Combine client-side and server-side calculations
   - Use local processing for simple operations
   - Offload complex computations to your backend

### Integration Steps

1. Fork this repository
2. Choose your integration method
3. Import your research data/algorithms
4. Modify calculation functions
5. Update UI components as needed
6. Test thoroughly on mobile devices

## Project Structure

```
lastshotvscode/
├── src/
│   ├── pages/           # Page components
│   ├── styles/          # CSS styles
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
└── package.json         # Project configuration
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests (if configured)

## Mobile Optimization

- Touch-friendly interface elements
- Mobile-specific viewport settings
- iOS and Android compatibility
- Responsive design for all screen sizes
- Touch gesture support
- Mobile keyboard optimization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
