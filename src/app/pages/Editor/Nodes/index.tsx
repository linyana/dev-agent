import { Handle, Position } from '@xyflow/react';
import { icons } from 'lucide-react';
import { getNodeSchema } from './constants';

export const NodeComponent = ({ data }: { data: any }) => {
  const schema = getNodeSchema(data.kind);
  if (!schema) return null;

  const Icon = schema.icon ? icons[schema.icon] : icons['Terminal'];

  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${schema.color}`,
        background: '#fff',
        minWidth: 160,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: 4,
          background: schema.color,
        }}
      />

      <Handle type="target" position={Position.Top} />

      <div style={{ padding: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon size={14} />
          <div style={{ fontWeight: 600 }}>{data.label || schema.title}</div>
        </div>

        <div style={{ fontSize: 12, opacity: 0.6 }}>{schema.description}</div>

        <div style={{ marginTop: 6, fontSize: 12 }}>
          {schema.fields.slice(0, 2).map((f) => (
            <div key={f.key}>
              {f.label}: {String(data[f.key] || '').slice(0, 20)}
            </div>
          ))}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
