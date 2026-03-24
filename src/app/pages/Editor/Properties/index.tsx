'use client';

import { theme, Form, Input, Select } from 'antd';
import { useCallback, useState } from 'react';
import { type Node, useOnSelectionChange, useReactFlow } from '@xyflow/react';
import { NODE_SCHEMAS } from '../Nodes/constants';

type NodeData = {
  label: string;
  description?: string;
  cmd?: string;
  [key: string]: any;
};

export const Properties = () => {
  const {
    token: { colorBorder },
  } = theme.useToken();
  const { setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | undefined>(undefined);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNode(nodes[0] as Node<NodeData> | undefined);
    },
  });

  const onChange = useCallback(
    (patch: Partial<NodeData>) => {
      if (!selectedNode) {
        return;
      }

      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id !== selectedNode.id) {
            return node;
          }

          return {
            ...node,
            data: {
              ...node.data,
              ...patch,
            },
          };
        }),
      );
    },
    [selectedNode, setNodes],
  );

  const schema = NODE_SCHEMAS.find((s) => s.kind === selectedNode?.data?.kind);
  return (
    <div
      style={{
        borderLeft: `1px solid ${colorBorder}`,
        width: 260,
        height: '100%',
      }}
    >
      {!selectedNode && (
        <div
          style={{
            padding: 12,
          }}
        >
          Select a node
        </div>
      )}

      {selectedNode && (
        <div style={{ padding: 12 }}>
          <h3>Node Settings</h3>
          <Form
            key={selectedNode.id}
            layout="vertical"
            initialValues={selectedNode.data}
            onValuesChange={(_, all) => onChange?.(all)}
          >
            {(
              schema?.fields || [
                { key: 'label', label: 'Label', type: 'input' },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'cmd', label: 'Command', type: 'input' },
              ]
            ).map((f) => {
              if (f.type === 'select') {
                return (
                  <Form.Item key={f.key} label={f.label} name={f.key}>
                    <Select placeholder={f.placeholder} options={f.options} />
                  </Form.Item>
                );
              }
              if (f.type === 'textarea') {
                return (
                  <Form.Item key={f.key} label={f.label} name={f.key}>
                    <Input.TextArea placeholder={f.placeholder} autoSize />
                  </Form.Item>
                );
              }
              return (
                <Form.Item key={f.key} label={f.label} name={f.key}>
                  <Input placeholder={f.placeholder} />
                </Form.Item>
              );
            })}
          </Form>
        </div>
      )}
    </div>
  );
};
