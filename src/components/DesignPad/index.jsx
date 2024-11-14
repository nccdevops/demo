// src/components/DesignPad/index.jsx
import React from 'react';
import BpmnJS from 'bpmn-js/dist/bpmn-modeler.development.js';
import { Grid } from './Grid';
import { UserStoryCards } from './UserStoryCards';
import { ChatBox } from './ChatBox';
import { PdfViewer } from './PdfViewer';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { ZoomControls } from './ZoomControls';
import './styles/DesignPad.css';

export const DesignPad = () => {
  return (
    <div className="design-pad">
      <div className="design-pad__logo-section">
        <Logo />
      </div>
      <div className="design-pad__stories-section">
        <UserStoryCards />
      </div>
      <div className="design-pad__documents">
        <PdfViewer />
      </div>
      <div className="design-pad__canvas-container">
        <div id="canvas">
          <Grid />
        </div>
        <ZoomControls />
      </div>
      <ChatBox />
      <Navigation />
    </div>
  );
};
