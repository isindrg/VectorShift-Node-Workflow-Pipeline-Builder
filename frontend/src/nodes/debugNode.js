// debugNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DebugNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`,
    },
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
      title="Debug"
      handles={handles}
      className="debug-node"
    >
      <div className="node-description">
        <span>🐛 Logs input data</span>
      </div>
    </BaseNode>
  );
};
