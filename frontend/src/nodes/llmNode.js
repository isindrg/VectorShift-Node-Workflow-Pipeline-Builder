// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-system`,
      style: { top: `${100/3}%` },
      label: 'system',
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: `${200/3}%` },
      label: 'prompt',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`,
      label: 'response',
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={handles}
      className="llm-node"
    >
      <span className="node-description">Language Model</span>
    </BaseNode>
  );
}
