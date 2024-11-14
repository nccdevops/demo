
// components/Landing.js
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to DesignPad</h1>
          <p className="text-xl mb-8">Create, design, and collaborate with our intuitive design tools.</p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Intuitive Design</h3>
            <p>Create beautiful designs with our easy-to-use interface.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Real-time Collaboration</h3>
            <p>Work together with your team in real-time.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Export Anywhere</h3>
            <p>Export your designs in multiple formats.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;