
// components/About.js
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About DesignPad</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          DesignPad is an innovative design tool that empowers creators to bring their ideas to life.
          Built with the latest web technologies, our platform provides a seamless experience for
          designers, developers, and creative professionals.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">
          We believe in making design accessible to everyone. Our mission is to provide powerful
          yet intuitive tools that enable creativity without barriers.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Features</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Intuitive design interface</li>
          <li>Real-time collaboration</li>
          <li>Cloud storage</li>
          <li>Multiple export formats</li>
          <li>Version history</li>
        </ul>
      </div>
    </div>
  );
};

export default About;