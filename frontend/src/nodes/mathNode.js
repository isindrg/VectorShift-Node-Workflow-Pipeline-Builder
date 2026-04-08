// mathNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || '+');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-a`,
      style: { top: '33%' },
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-b`,
      style: { top: '66%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-result`,
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      handles={handles}
      className="math-node"
    >
      <label className="node-label">
        Operation:
        <select value={operation} onChange={(e) => setOperation(e.target.value)} className="node-select">
          <option value="+">Add (+)</option>
          <option value="-">Subtract (-)</option>
          <option value="*">Multiply (*)</option>
          <option value="/">Divide (/)</option>
          <option value="**">Power (**)</option>
          <option value="%">Modulo (%)</option>
        </select>
      </label>
    </BaseNode>
  );
};
