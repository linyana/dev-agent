import { useCallback, useMemo } from 'react';
import {
  Background,
  Connection,
  Controls,
  Node,
  NodeTypes,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { NodeComponent } from '../Nodes';

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    data: { kind: 'cmd', label: 'CMD' },
    position: { x: 250, y: 120 },
  },
];

export const Flows = () => {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeTypes = useMemo<NodeTypes>(
    () => ({
      custom: NodeComponent,
    }),
    [],
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      nodeOrigin={[0.5, 0.5]}
      fitView
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
};
