// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="text-center ">
      <h2 className="text-2xl font-bold">Welcome to the Fitness Tracker</h2>
      <p className="text-lg mb-6">
        Track your activities, set goals, and stay fit!
      </p>
      <Link to="/dashboard"></Link>
    </div>
  );
};

export default Landing;
