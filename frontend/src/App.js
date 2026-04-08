import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './styles/app.css';

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        <div className="app-header-title">
          <div className="app-header-logo">⚡</div>
          <span className="app-header-name">VectorShift</span>
          <span className="app-header-badge">Pipeline Editor</span>
        </div>
        <div className="app-header-stats">
          <div className="app-stat">
            <div className="app-stat-dot"></div>
            <span>Backend Connected</span>
          </div>
        </div>
      </div>
      <div className="app-body">
        <PipelineToolbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <PipelineUI />
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default App;
