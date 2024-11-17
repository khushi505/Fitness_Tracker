// src/services/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../src/pages/Home";
import Dashboard from "../src/components/Dashboard";
import Activities from "../src/pages/Activities";
import Goals from "../src/pages/Goals";

const App = () => {
  return (
    <Router>
      <div className="app-container flex flex-col min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
        {/* Navbar */}
        <header className="header flex items-center justify-between px-6 py-2 mt-4">
          <div className="flex-none">
            <h1 className="text-2xl font-bold text-[var(--primary-color)]">
              <Link to="/">Fitness Tracker</Link>
            </h1>
          </div>

          <div className="flex-grow flex justify-center">
            <div className="flex items-center backdrop-blur-lg bg-[rgba(255,255,255,0.1)] px-6 py-3 rounded-full shadow-lg space-x-4">
              <Link
                to="/"
                aria-label="Home"
                className="px-6 py-2 bg-[rgba(255,255,255,0.15)] text-[var(--text-color)] font-semibold rounded-full transition-all duration-200 hover:bg-[var(--button-highlight-color)] hover:text-black backdrop-blur-md shadow-md"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                aria-label="Dashboard"
                className="px-6 py-2 bg-[rgba(255,255,255,0.15)] text-[var(--text-color)] font-semibold rounded-full transition-all duration-200 hover:bg-[var(--button-highlight-color)] hover:text-black backdrop-blur-md shadow-md"
              >
                Dashboard
              </Link>
              <Link
                to="/activities"
                aria-label="Activities"
                className="px-6 py-2 bg-[rgba(255,255,255,0.15)] text-[var(--text-color)] font-semibold rounded-full transition-all duration-200 hover:bg-[var(--button-highlight-color)] hover:text-black backdrop-blur-md shadow-md"
              >
                Activities
              </Link>
              <Link
                to="/goals"
                aria-label="Goals"
                className="px-6 py-2 bg-[rgba(255,255,255,0.15)] text-[var(--text-color)] font-semibold rounded-full transition-all duration-200 hover:bg-[var(--button-highlight-color)] hover:text-black backdrop-blur-md shadow-md"
              >
                Goals
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-12 py-8 text-center relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/goals" element={<Goals />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer bg-[var(--footer-bg-color)] text-[var(--footer-text-color)] py-4 px-6 text-center flex justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Fitness Tracker
          </div>
          <div className="text-sm">By Khushi Malhotra</div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
