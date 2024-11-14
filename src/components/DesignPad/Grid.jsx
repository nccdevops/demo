
// src/components/DesignPad/Grid.jsx
import React, { useEffect, useRef } from 'react';
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate
} from 'tiny-svg';
import './styles/Grid.css';

export const Grid = () => {
  const canvasRef = useRef(null);

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

  return <svg ref={canvasRef} className="design-pad__grid" />;
};
