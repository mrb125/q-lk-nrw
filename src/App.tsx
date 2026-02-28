import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import LearningModule from './views/LearningModule';
import Strukturlegekarten from './views/Strukturlegekarten';
import Explore from './views/Explore';
import Navigation from './components/Navigation';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1, padding: '2rem', paddingBottom: '100px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/module/:id" element={<LearningModule />} />
            <Route path="/strukturlegekarten" element={<Strukturlegekarten />} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
