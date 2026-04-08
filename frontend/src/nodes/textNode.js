// textNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [size, setSize] = useState({ width: 240, height: 120 });
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Extract variables from text in format {{ variable }}
  useEffect(() => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const foundVariables = new Set();
    let match;

    while ((match = variableRegex.exec(currText)) !== null) {
      foundVariables.add(match[1]);
    }

    setVariables(Array.from(foundVariables));
    updateNodeField(id, 'text', currText);
    updateNodeField(id, 'variables', Array.from(foundVariables));
  }, [currText, id, updateNodeField]);

  // Calculate width AND height based on text content
  useEffect(() => {
    const lines = currText.split('\n');
    const numLines = lines.length;
    const longestLine = Math.max(...lines.map(l => l.length));

    const minWidth = 240;
    const minHeight = 120;
    const charWidth = 8;
    const lineHeight = 20;
    const paddingH = 80;
    const paddingV = 100;

    const newWidth = Math.min(Math.max(minWidth, longestLine * charWidth + paddingH), 500);
    const newHeight = Math.min(Math.max(minHeight, numLines * lineHeight + paddingV), 400);

    setSize({ width: newWidth, height: newHeight });
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create handles for variables
  const variableHandles = variables.map((variable, idx) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-${variable}`,
    style: { top: `${(idx + 1) * (100 / (variables.length + 1))}%` },
    label: variable,
  }));

  // Add output handle
  const handles = [
    ...variableHandles,
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      handles={handles}
      className="text-node"
      style={{ width: size.width }}
    >
      <textarea 
        value={currText} 
        onChange={handleTextChange}
        className="node-textarea"
        style={{ 
          height: Math.max(size.height - 100, 40),
          width: '100%',
          minHeight: '40px',
          resize: 'none',
        }}
      />
      {variables.length > 0 && (
        <div className="variables-display">
          <small>Variables: {variables.join(', ')}</small>
        </div>
      )}
    </BaseNode>
  );
}
