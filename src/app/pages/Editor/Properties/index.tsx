'use client';

import { theme, Form, Input, Select } from 'antd';
import { type Node } from '@xyflow/react';
import { NODE_SCHEMAS } from '../Nodes/constants';

type IPropsType = {
  selectedNode?: Node<NodeData>;
  onChange?: (patch: Partial<NodeData>) => void;
};

type NodeData = {
  label: string;
  description?: string;
  cmd?: string;
  [key: string]: any;
};

export const Properties = ({ selectedNode, onChange }: IPropsType) => {
  const {
    token: { colorBorder },
  } = theme.useToken();
  const schema = NODE_SCHEMAS.find((s) => s.kind === selectedNode?.data?.kind);
  return (
    <div
      style={{
        borderLeft: `1px solid ${colorBorder}`,
        width: 260,
        height: '100%',
      }}
    >
      {!selectedNode && <div>Select a node</div>}

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
