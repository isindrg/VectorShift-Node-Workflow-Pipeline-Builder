// concatNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConcatNode = ({ id, data }) => {
  const [separator, setSeparator] = useState(data?.separator || ' ');
  const [numInputs, setNumInputs] = useState(data?.numInputs || 2);

  const handles = [
    ...Array.from({ length: numInputs }, (_, i) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-input-${i}`,
      style: { top: `${((i + 1) * (100 / (numInputs + 1)))}%` },
    })),
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
      title="Concat"
      handles={handles}
      className="concat-node"
    >
      <label className="node-label">
        Separator:
        <input 
          type="text" 
          value={separator} 
          onChange={(e) => setSeparator(e.target.value)}
          className="node-input"
          placeholder=" "
        />
      </label>
      <label className="node-label">
        Inputs:
        <input 
          type="number" 
          value={numInputs} 
          onChange={(e) => setNumInputs(Math.max(2, parseInt(e.target.value) || 2))}
          className="node-input"
          min="2"
          max="5"
        />
      </label>
    </BaseNode>
  );
};
