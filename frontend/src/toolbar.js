// toolbar.js

import { DraggableNode } from './draggableNode';
import './styles/toolbar.css';

const BASIC_NODES = [
  { type: 'customInput', label: 'Input',  icon: '→' },
  { type: 'llm',         label: 'LLM',    icon: '🤖' },
  { type: 'customOutput',label: 'Output', icon: '←' },
  { type: 'text',        label: 'Text',   icon: '📝' },
];

const ADVANCED_NODES = [
  { type: 'filter', label: 'Filter', icon: '⚙' },
  { type: 'math',   label: 'Math',   icon: '∑' },
  { type: 'concat', label: 'Concat', icon: '⊕' },
  { type: 'http',   label: 'HTTP',   icon: '🌐' },
  { type: 'debug',  label: 'Debug',  icon: '🐛' },
];

export const PipelineToolbar = () => {
    return (
        <div className="toolbar-container">
            <div className="toolbar-logo">
                <div className="toolbar-logo-icon">⚡</div>
                <div>
                    <div className="toolbar-logo-text">Nodes</div>
                    <div className="toolbar-logo-sub">Drag to canvas</div>
                </div>
            </div>

            <div className="toolbar-section">
                <h3>Basic</h3>
                <div className="toolbar-row">
                    {BASIC_NODES.map(n => (
                        <DraggableNode key={n.type} type={n.type} label={n.label} icon={n.icon} />
                    ))}
                </div>
            </div>

            <div className="toolbar-divider" />

            <div className="toolbar-section">
                <h3>Advanced</h3>
                <div className="toolbar-row">
                    {ADVANCED_NODES.map(n => (
                        <DraggableNode key={n.type} type={n.type} label={n.label} icon={n.icon} />
                    ))}
                </div>
            </div>
        </div>
    );
};
