// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold">Welcome to the Fitness Tracker</h2>
      <p className="text-lg mb-6">
        Track your activities, set goals, and stay fit!
      </p>
      <Link to="/dashboard">
        <button className="bg-primary-color text-bg-color rounded-lg px-4 py-2 hover:bg-yellow-500 transition-all duration-200">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Landing;
