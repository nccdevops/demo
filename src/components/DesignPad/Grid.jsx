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

  // Initialize BPMN modeler
  useEffect(() => {
    if (!bpmnRef.current) return;

    const bpmnModeler = new BpmnJS({
      container: bpmnRef.current,
      keyboard: {
        bindTo: window
      }
    });

    setModeler(bpmnModeler);

    return () => {
      bpmnModeler.destroy();
    };
  }, []);

  // Load BPMN diagram
  useEffect(() => {
    if (!modeler) return;

    const loadDiagram = async () => {
      try {
        // Try to fetch custom diagram first
        const response = await fetch('/data/diagram.bpmn');
        
        if (!response.ok) {
          throw new Error('Custom diagram not found');
        }

        const bpmnXML = await response.text();
        await importDiagram(bpmnXML);
      } catch (error) {
        console.warn('Loading default empty diagram:', error);
        // Fall back to empty diagram if custom one fails
        await importDiagram(EMPTY_DIAGRAM);
      }
    };

    const importDiagram = async (xml) => {
      try {
        const result = await modeler.importXML(xml);
        
        if (result.warnings.length) {
          console.warn('Warnings while importing BPMN diagram:', result.warnings);
        }

        // Zoom to fit the diagram
        const canvas = modeler.get('canvas');
        canvas.zoom('fit-viewport');
        
        setError(null);
      } catch (err) {
        console.error('Error importing BPMN diagram:', err);
        setError(`Failed to load diagram: ${err.message}`);
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
          <div className="error-alert__description">{error}</div>
        </div>
      ) : (
        <div ref={bpmnRef} className="bpmn-container" />
      )}
    </div>
  );
};