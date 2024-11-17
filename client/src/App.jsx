// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./components/Dashboard";
import Activities from "./pages/Activities";
import Goals from "./pages/Goals";

// Import the GIF image
import gifImage from "../public/200w-unscreen.gif"; // Update the path if necessary

const App = () => {
  return (
    <Router>
      <div className="app-container flex flex-col min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
        {/* Navbar */}
        <header className="header flex items-center justify-between px-6 py-2 mt-4">
          {/* Logo on the Left */}
          <div className="flex-none">
            <h1 className="text-2xl font-bold text-[var(--primary-color)]">
              <Link to="/">Fitness Tracker</Link>
            </h1>
          </div>

          {/* Centered Nav Links */}
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

        {/* Main Content with Left and Right Margin */}
        <main className="flex-grow container mx-auto px-12 py-8 text-center">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/goals" element={<Goals />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer bg-[var(--footer-bg-color)] text-[var(--footer-text-color)] py-6 text-center">
          <div className="container mx-auto text-sm">
            &copy; {new Date().getFullYear()} Fitness Tracker
          </div>
        </footer>

        {/* GIF in the top-right corner */}
        <img
          src={gifImage}
          alt="Decorative GIF"
          className="fixed top-0 right-0 m-4 w-16 h-16 z-50" // Adjust width and height as needed
        />
      </div>
    </Router>
  );
};

export default App;
