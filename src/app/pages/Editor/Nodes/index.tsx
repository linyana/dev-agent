import { Handle, Position } from '@xyflow/react';
import { getNodeSchema } from './constants';
import { NodeCard } from './card';

export const NodeComponent = ({ data }: { data: any }) => {
  const schema = getNodeSchema(data.kind);
  if (!schema) return null;

  const nodeSchema = {
    ...schema,
    title: data.label || schema.title,
  };

  return (
    <div
      style={{
        minWidth: 220,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <NodeCard schema={nodeSchema} marginBottom={0} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
