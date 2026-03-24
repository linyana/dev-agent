'use client';

import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type Connection,
  Handle,
  Position,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useMemo, useState } from 'react';

type NodeData = {
  label: string;
};

const CustomNode = ({ id, data }: any) => {
  const { getEdges } = useReactFlow();

  const edges = getEdges();

  const hasOutgoing = edges.some((e) => e.source === id);
  const hasIncoming = edges.some((e) => e.target === id);

  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        border: '1px solid #ddd',
        background: '#fff',
        minWidth: 120,
      }}
    >
      <div style={{ fontWeight: 600 }}>{data.label}</div>

      <Handle type="target" position={Position.Top} isConnectable={!hasIncoming} />
      <Handle type="source" position={Position.Bottom} isConnectable={!hasOutgoing} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node<NodeData>[] = [
  {
    id: 'start',
    type: 'custom',
    position: { x: 250, y: 100 },
    data: { label: 'Start' },
  },
];

export const Flows = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId) || null,
    [nodes, selectedNodeId],
  );

  const isValidConnection = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return false;

      if (connection.source === connection.target) return false;

      const hasSourceEdge = edges.some((e) => e.source === connection.source);

      const hasTargetEdge = edges.some((e) => e.target === connection.target);

      if (hasSourceEdge || hasTargetEdge) return false;

      if (connection.target === 'start') return false;

      return true;
    },
    [edges],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!isValidConnection(connection)) return;

      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
          },
          eds,
        ),
      );
    },
    [isValidConnection],
  );

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  return (
    <div style={{ flex: 1, height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
