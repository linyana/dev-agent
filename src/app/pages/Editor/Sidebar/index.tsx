import { useReactFlow, XYPosition } from '@xyflow/react';
import { useCallback, useState } from 'react';
import { OnDropAction, useDnD } from '@/hooks';
import { DragGhost } from './ghost';
import { theme } from 'antd';
import { nanoid } from 'nanoid';
import { NODE_SCHEMAS } from '../Nodes/constants';
import { NodeCard } from '../Nodes/card';

export const createNodeFromSchema = (schema: any, position: XYPosition) => {
  const data: any = {
    kind: schema.kind,
    label: schema.title,
  };

  schema.fields.forEach((f: any) => {
    if (f.defaultValue !== undefined) {
      data[f.key] = f.defaultValue;
    }
  });

  return {
    id: nanoid(),
    type: 'custom',
    position,
    data,
  };
};

export const Sidebar = () => {
  const { onDragStart, isDragging } = useDnD();
  const [type, setType] = useState<string | null>(null);
  const { token } = theme.useToken();
  const { setNodes } = useReactFlow();

  const createAddNewNode = useCallback(
    (schema: any): OnDropAction => {
      return ({ position }: { position: XYPosition }) => {
        const newNode = createNodeFromSchema(schema, position);
        setNodes((nds) => nds.concat(newNode));
        setType(null);
      };
    },
    [setNodes],
  );

  return (
    <>
      {isDragging && <DragGhost type={type} />}

      <div
        style={{
          borderRight: `1px solid ${token.colorBorder}`,
          width: 260,
          height: '100%',
          padding: 8,
        }}
      >
        {NODE_SCHEMAS.map((schema) => (
          <NodeCard
            key={schema.kind}
            schema={schema}
            onDragStart={(event: React.PointerEvent<HTMLDivElement>) => {
              setType(schema.kind);
              onDragStart(event, createAddNewNode(schema));
            }}
          />
        ))}
      </div>
    </>
  );
};
