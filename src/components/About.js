import React from 'react';
import './About.css';  // Import the external CSS file

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About DesignPad</h1>
      <div className="about-content">
        <p className="about-text">
          DesignPad is an innovative design tool that empowers creators to bring their ideas to life.
          Built with the latest web technologies, our platform provides a seamless experience for
          designers, developers, and creative professionals.
        </p>
        <h2 className="about-subtitle">Our Mission</h2>
        <p className="about-text">
          We believe in making design accessible to everyone. Our mission is to provide powerful
          yet intuitive tools that enable creativity without barriers.
        </p>
        <h2 className="about-subtitle">Features</h2>
        <ul className="features-list">
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
