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
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
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
        height: '100%',
        width: '100%'
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
        const response = await fetch('/data/diagram.bpmn');
        
        if (!response.ok) {
          throw new Error(`Failed to load file (${response.status} ${response.statusText})`);
        }

        const bpmnXML = await response.text();
        console.log('Loaded BPMN XML length:', bpmnXML.length);
        
        // Validate XML structure
        if (!bpmnXML.includes('<?xml') || !bpmnXML.includes('bpmn:definitions')) {
          throw new Error('Invalid BPMN XML structure');
        }

        await importDiagram(bpmnXML);
      } catch (error) {
        console.error('Error loading diagram:', error);
        try {
          console.log('Loading empty diagram as fallback');
          await importDiagram(EMPTY_DIAGRAM);
        } catch (emptyError) {
          setError(`Failed to load diagrams: ${error.message}`);
        }
      }
    };

    const importDiagram = async (xml) => {
      try {
        setLoadingStatus('importing-xml');
        
        // Create a new promise to handle the import
        const importResult = await new Promise((resolve, reject) => {
          modeler.importXML(xml, (err, warnings) => {
            if (err) {
              reject(err);
            } else {
              resolve(warnings);
            }
          });
        });

        console.log('Import successful, warnings:', importResult);

        // Get the canvas and zoom to fit
        const canvas = modeler.get('canvas');
        if (canvas) {
          canvas.zoom('fit-viewport');
        }

        setError(null);
        setLoadingStatus('complete');
      } catch (err) {
        console.error('Error importing BPMN XML:', err);
        setError(`Import error: ${err.message}`);
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
    <div className="design-pad" style={{ width: '100%', height: '800px' }}>
      <svg ref={canvasRef} className="design-pad__grid" />
      {error ? (
        <div className="error-alert">
          <div className="error-alert__title">Error</div>
          <div className="error-alert__description">
            {error}
            <div className="error-alert__status">Status: {loadingStatus}</div>
          </div>
        </div>
      ) : (
        <div ref={bpmnRef} className="bpmn-container" />
      )}
    </div>
  );
};