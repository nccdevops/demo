import React, { useEffect, useRef, useState } from 'react';
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate
} from 'tiny-svg';
import BpmnJS from 'bpmn-js';
import './styles/Grid.css';

const EMPTY_DIAGRAM = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
                  id="Definitions_1" 
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_1" bpmnElement="StartEvent_1">
        <dc:Bounds x="152" y="102" width="36" height="36"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

export const Grid = () => {
  const canvasRef = useRef(null);
  const bpmnRef = useRef(null);
  const [error, setError] = useState(null);
  const [modeler, setModeler] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState('initializing');

  // Initialize BPMN modeler
  useEffect(() => {
    if (!bpmnRef.current) return;

    try {
      const bpmnModeler = new BpmnJS({
        container: bpmnRef.current,
        keyboard: {
          bindTo: window
        }
      });

      setModeler(bpmnModeler);
      setLoadingStatus('modeler-created');

      return () => {
        bpmnModeler.destroy();
      };
    } catch (err) {
      console.error('Error initializing BPMN modeler:', err);
      setError(`Failed to initialize BPMN modeler: ${err.message}`);
    }
  }, []);

  // Load BPMN diagram
  useEffect(() => {
    if (!modeler) return;

    const loadDiagram = async () => {
      try {
        setLoadingStatus('loading-file');
        // Try to fetch custom diagram first
        const diagramPath = '/data/diagram.bpmn';
        console.log('Attempting to load diagram from:', diagramPath);
        
        const response = await fetch(diagramPath);
        console.log('Fetch response:', response.status, response.statusText);
        
        if (!response.ok) {
          throw new Error(`Failed to load file (${response.status} ${response.statusText})`);
        }

        const bpmnXML = await response.text();
        console.log('Successfully loaded BPMN XML:', bpmnXML.substring(0, 100) + '...');
        
        await importDiagram(bpmnXML);
      } catch (error) {
        console.error('Error loading diagram:', error);
        // Attempt to load empty diagram instead
        console.log('Attempting to load empty diagram as fallback');
        try {
          await importDiagram(EMPTY_DIAGRAM);
        } catch (emptyError) {
          setError(`Failed to load both custom and empty diagrams. Original error: ${error.message}. Empty diagram error: ${emptyError.message}`);
        }
      }
    };

    const importDiagram = async (xml) => {
      try {
        setLoadingStatus('importing-xml');
        const result = await modeler.importXML(xml);
        
        if (result.warnings?.length) {
          console.warn('Warnings while importing BPMN diagram:', result.warnings);
        }

        // Zoom to fit the diagram
        const canvas = modeler.get('canvas');
        canvas.zoom('fit-viewport');
        
        setError(null);
        setLoadingStatus('complete');
      } catch (err) {
        console.error('Error importing BPMN XML:', err);
        setError(`Failed to import diagram: ${err.message}`);
        setLoadingStatus('error');
      }
    };

    loadDiagram();
  }, [modeler]);

  // Initialize grid
  useEffect(() => {
    if (!canvasRef.current) return;

    const svg = canvasRef.current;
    const defs = svgCreate('defs');
    svgAppend(svg, defs);

    const pattern = svgCreate('pattern');
    const patternId = `grid-pattern-${Math.random().toString(36).substr(2, 9)}`;
    
    svgAttr(pattern, {
      id: patternId,
      width: 20,
      height: 20,
      patternUnits: 'userSpaceOnUse'
    });

    const circle = svgCreate('circle');
    svgAttr(circle, {
      cx: 0.5,
      cy: 0.5,
      r: 0.5,
      fill: '#ccc'
    });

    svgAppend(pattern, circle);
    svgAppend(defs, pattern);

    const grid = svgCreate('rect');
    svgAttr(grid, {
      width: '100%',
      height: '100%',
      fill: `url(#${patternId})`
    });

    svgAppend(svg, grid);
  }, []);

  return (
    <div className="design-pad">
      <svg ref={canvasRef} className="design-pad__grid" />
      {error ? (
        <div className="error-alert">
          <div className="error-alert__title">Error</div>
          <div className="error-alert__description">
            {error}
            <div className="error-alert__status">Loading status: {loadingStatus}</div>
          </div>
        </div>
      ) : (
        <div ref={bpmnRef} className="bpmn-container" />
      )}
    </div>
  );
};