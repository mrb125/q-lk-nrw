import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import LearningModule from './views/LearningModule';
import Strukturlegekarten from './views/Strukturlegekarten';
import Explore from './views/Explore';
import Flashcards from './views/Flashcards';
import Formulas from './views/Formulas';
import AbiturSimulation from './views/AbiturSimulation';
import Badges from './views/Badges';
import Auswertung from './views/Auswertung';
import Navigation from './components/Navigation';
import { ThemeToggle } from './components/ThemeToggle';
import './index.css';

const Router = import.meta.env.VITE_STANDALONE === 'true' ? HashRouter : BrowserRouter;


function App() {
  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', zIndex: 1000 }}>
          <ThemeToggle />
        </div>
        <main style={{ flex: 1, padding: '2rem', paddingBottom: '100px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/module/:id" element={<LearningModule />} />
            <Route path="/strukturlegekarten" element={<Strukturlegekarten />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/formulas" element={<Formulas />} />
            <Route path="/abitur" element={<AbiturSimulation />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/auswertung" element={<Auswertung />} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
