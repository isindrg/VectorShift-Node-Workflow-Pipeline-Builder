# VectorShift Node Workflow Pipeline Builder
A visual programming platform for building and executing data processing pipelines using a drag-and-drop node-based interface.

## Overview

VectorShift Node Workflow is an interactive pipeline builder that enables users to create complex data processing workflows by connecting different node types. The React frontend provides a smooth, intuitive canvas for designing workflows, while the FastAPI backend handles pipeline validation and execution. This project demonstrates advanced node abstraction patterns, real-time UI updates, and robust frontend-backend integration.

## How It Works

1. **User drags nodes** - Drag node types from the sidebar onto the canvas
2. **Configure nodes** - Click nodes to customize their parameters and settings
3. **Connect nodes** - Link output handles to input handles to create data flow
4. **Dynamic variables** - Text nodes automatically create input handles for `{{ variable }}` placeholders
5. **Submit pipeline** - Click "SUBMIT PIPELINE" to validate the workflow with the backend
6. **Backend validates** - FastAPI checks node count, edge count, and DAG structure
7. **User receives feedback** - Alert displays validation results and pipeline metrics

## Files

### Frontend
 **App.js** - Main React component and canvas orchestration
 **store.js** - State management for nodes, edges, and workflow data
 **BaseNode.js** - Reusable node abstraction for rapid node creation
 **submit.js** - Handles pipeline submission to backend API
 **draggableNode.js** - Drag and drop functionality
 **toolbar.js** - UI toolbar and controls
 **ui.js** - Utility functions and helpers
 **nodes/** - Individual node implementations (Input, Output, Math, Filter, Concat, HTTP, LLM, Debug, Text)
 **styles/** - CSS styling (app.css, nodes.css, toolbar.css, ui.css, submit.css)

### Backend
 **main.py** - FastAPI server with `/pipelines/parse` endpoint
 **requirements.txt** - Python dependencies

## Results
**10+ Node Types** - Rapidly deployable with BaseNode abstraction
**Real-time Rendering** - ReactFlow canvas with smooth interactions
**DAG Validation** - O(V+E) cycle detection algorithm on backend
**Dynamic UI Updates** - Text node resizes based on content

# DEMO
<img width="600" height="200" alt="Main Interface" src="https://github.com/user-attachments/assets/aa3fa746-2db3-49c1-9a58-31a92875d002" />

<img width="600" height="200" alt="node" src="https://github.com/user-attachments/assets/12b73bab-97f3-42f1-8f5f-c743d6478397" />

<img width="600" height="200" alt="connected node" src="https://github.com/user-attachments/assets/8f8bea14-18e3-430a-adf9-b66bb9e1d5c3" />

<img width="600" height="200" alt="node3" src="https://github.com/user-attachments/assets/670981a6-bdcf-410b-8e94-e01a0d59c117" />


