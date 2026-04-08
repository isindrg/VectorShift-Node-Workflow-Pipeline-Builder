from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str = None
    source: str
    target: str
    animated: bool = False
    type: str = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm for topological sort to detect cycles.
    """
    if not nodes:
        return True
    
    # Build adjacency list and in-degree count
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize in-degrees for all nodes
    for node in nodes:
        if node.id not in in_degree:
            in_degree[node.id] = 0
    
    # Build the graph
    for edge in edges:
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1
    
    # Kahn's algorithm for topological sort
    queue = deque([node.id for node in nodes if in_degree[node.id] == 0])
    topo_sort_count = 0
    
    while queue:
        node = queue.popleft()
        topo_sort_count += 1
        
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If all nodes are in topological order, it's a DAG
    return topo_sort_count == len(nodes)

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    """
    Parse a pipeline and return:
    - num_nodes: int
    - num_edges: int
    - is_dag: bool
    """
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        dag = is_dag(pipeline.nodes, pipeline.edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': dag,
            'status': 'success'
        }
    except Exception as e:
        return {
            'num_nodes': 0,
            'num_edges': 0,
            'is_dag': False,
            'status': 'error',
            'error': str(e)
        }
