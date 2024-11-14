

// src/components/DesignPad/Navigation.jsx
import React from 'react';
import './styles/Navigation.css';

export const Navigation = () => {
  return (
    <div className="io-about">
      <ul className="io-control-list io-horizontal">
        <li>
          <a href="/" target="_blank" title="privacy policy">Privacy</a>
        </li>
        <li>
          <a href="/" target="_blank" title="terms of use">Terms</a>
        </li>
        <li>
          <a href="/" target="_blank" title="imprint">Imprint</a>
        </li>
        <li>
          <a href="/" onClick={() => window.Osano?.cm.showDrawer()}>
            Cookie Preferences
          </a>
        </li>
        <li>
          <a href="#" title="More information about this demo">About</a>
        </li>
        <li>
          <a href="/" title="Report an issue" target="_blank">
            Give Feedback
          </a>
        </li>
      </ul>
    </div>
  );
};

