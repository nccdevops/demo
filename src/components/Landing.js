import React from 'react';
import { Link } from 'react-router-dom';
import collaborationImage from '../assets/collaboration.jpg';
import designImage from '../assets/design.jpg';
import exportImage from '../assets/export.jpg';
// import './Landing.css';

const Landing = () => {
  return (
    <div className="landing min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="hero-section relative h-screen">
        <div className="hero-overlay"></div>
        <div className="hero-content text-center text-white">
          <h1 className="title">Welcome to DesignPad</h1>
          <p className="subtitle">Create, design, and collaborate with our intuitive tools.</p>
          <div className="buttons">
            <Link to="/login" className="btn-primary">Get Started</Link>
            <Link to="/about" className="btn-secondary">Learn More</Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features container mx-auto">
        <h2 className="section-title">Our Key Features</h2>
        <div className="features-grid">
          <FeatureCard image={designImage} title="Intuitive Design" description="Create beautiful designs with our easy-to-use interface." />
          <FeatureCard image={collaborationImage} title="Real-time Collaboration" description="Work together with your team in real-time." />
          <FeatureCard image={exportImage} title="Export Anywhere" description="Export your designs in multiple formats." />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials container mx-auto">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          <Testimonial text="DesignPad transformed our workflow! The intuitive interface is a game-changer." author="Alex Johnson, Designer" />
          <Testimonial text="I love collaborating with my team on DesignPad. It's fast, responsive, and user-friendly!" author="Priya Patel, Project Manager" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq container mx-auto">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-grid">
          <FAQItem question="How much does it cost?" answer="Our pricing is flexible, with plans for all types of users. Check our pricing page for more details." />
          <FAQItem question="Can I collaborate with my team?" answer="Yes! DesignPad is built for real-time collaboration, making teamwork easy and effective." />
          <FAQItem question="Is there a trial period?" answer="Yes, we offer a 14-day free trial so you can explore all features." />
          <FAQItem question="What formats can I export?" answer="You can export in multiple formats, including PNG, JPG, SVG, and PDF." />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content container mx-auto">
          <div className="footer-left">
            <h3 className="footer-title">DesignPad</h3>
            <p className="footer-description">Your go-to design platform.</p>
          </div>
          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ image, title, description }) => (
  <div className="feature-card clay">
    <img src={image} alt={title} className="feature-image"/>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

const Testimonial = ({ text, author }) => (
  <div className="testimonial-card clay">
    <p className="testimonial-text">"{text}"</p>
    <p className="testimonial-author">- {author}</p>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <div className="faq-item clay">
    <h3 className="faq-question">{question}</h3>
    <p className="faq-answer">{answer}</p>
  </div>
);

export default Landing;
