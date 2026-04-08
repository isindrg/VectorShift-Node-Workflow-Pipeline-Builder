// submit.js

import { useState } from 'react';
import { useStore } from './store';
import './styles/submit.css';

export const SubmitButton = () => {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const { nodes, edges, clearPipeline } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
        clearPipeline: state.clearPipeline,
    }));

    const handleClear = () => {
        clearPipeline();
        setAlert(null);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            setAlert({
                num_nodes: data.num_nodes,
                num_edges: data.num_edges,
                is_dag: data.is_dag,
                status: data.status,
            });

            // Auto-hide alert after 5 seconds
            setTimeout(() => {
                setAlert(null);
            }, 5000);
        } catch (error) {
            console.error('Error:', error);
            setAlert({
                error: error.message,
                status: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="submit-container">
                <button 
                    className="clear-button"
                    onClick={handleClear}
                >
                    Clear Pipeline
                </button>
                <button 
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Pipeline'}
                </button>
            </div>

            {alert && (
                <div className="pipeline-alert">
                    {alert.status === 'error' ? (
                        <>
                            <h3>❌ Error</h3>
                            <div className="pipeline-alert-item">
                                <span className="pipeline-alert-label">Message:</span>
                                <span className="pipeline-alert-value">{alert.error}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3>✅ Pipeline Validated</h3>
                            <div className="pipeline-alert-item">
                                <span className="pipeline-alert-label">Nodes:</span>
                                <span className="pipeline-alert-value">{alert.num_nodes}</span>
                            </div>
                            <div className="pipeline-alert-item">
                                <span className="pipeline-alert-label">Edges:</span>
                                <span className="pipeline-alert-value">{alert.num_edges}</span>
                            </div>
                            <div className="pipeline-alert-item">
                                <span className="pipeline-alert-label">Is DAG:</span>
                                <span className={`pipeline-alert-value pipeline-alert-status-dag-${alert.is_dag}`}>
                                    {alert.is_dag ? '✓ Yes' : '✗ No'}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
