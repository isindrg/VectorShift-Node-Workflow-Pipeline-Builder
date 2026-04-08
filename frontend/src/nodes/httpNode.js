// httpNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const HttpNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-body`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-error`,
      style: { top: '66%' },
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="HTTP"
      handles={handles}
      className="http-node"
    >
      <label className="node-label">
        Method:
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="node-select">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </label>
      <label className="node-label">
        URL:
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
          className="node-input"
          placeholder="https://..."
        />
      </label>
    </BaseNode>
  );
};
