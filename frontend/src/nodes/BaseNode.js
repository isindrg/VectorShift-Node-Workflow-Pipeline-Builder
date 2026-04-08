// BaseNode.js
// Base abstraction for all node types

import { Handle, Position } from 'reactflow';
import '../styles/nodes.css';

export const BaseNode = ({ 
  id, 
  data, 
  title,
  children,
  handles = [],
  className = 'base-node',
  style = {}
}) => {
  return (
    <div className={`node ${className}`} style={style}>
      {handles.map((handle, idx) => (
        <>
          <Handle
            key={`handle-${idx}`}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            style={handle.style}
          />
          {handle.label && (
            <div
              key={`label-${idx}`}
              style={{
                position: 'absolute',
                fontSize: '9px',
                color: '#94a3b8',
                fontWeight: 500,
                left: handle.position === Position.Left ? '10px' : undefined,
                right: handle.position === Position.Right ? '10px' : undefined,
                top: handle.style?.top,
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                letterSpacing: '0.3px',
                textTransform: 'uppercase',
              }}
            >
              {handle.label}
            </div>
          )}
        </>
      ))}
      
      <div className="node-header">
        <span className="node-title">{title}</span>
      </div>
      
      <div className="node-content">
        {children}
      </div>
    </div>
  );
};
