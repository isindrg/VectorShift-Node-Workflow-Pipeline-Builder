// filterNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || '==');
  const [value, setValue] = useState(data?.value || '');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-true`,
      style: { top: '33%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-false`,
      style: { top: '66%' },
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      handles={handles}
      className="filter-node"
    >
      <label className="node-label">
        Operator:
        <select value={operator} onChange={(e) => setOperator(e.target.value)} className="node-select">
          <option value="==">=</option>
          <option value="!=">≠</option>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
          <option value=">=">&ge;</option>
          <option value="<=">&le;</option>
        </select>
      </label>
      <label className="node-label">
        Value:
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          className="node-input"
        />
      </label>
    </BaseNode>
  );
};
