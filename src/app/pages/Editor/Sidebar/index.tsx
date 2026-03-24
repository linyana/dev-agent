import { useReactFlow, XYPosition } from '@xyflow/react';
import { useCallback, useState } from 'react';
import { OnDropAction, useDnD } from '@/hooks';
import { DragGhost } from './ghost';
import { Avatar, Card, Flex, theme, Typography } from 'antd';
import { NODE_SCHEMAS } from '../registry';
import { Icon } from '@/components';
import { nanoid } from 'nanoid';

const { Text } = Typography;

export const Sidebar = () => {
  const { onDragStart, isDragging } = useDnD();
  const [type, setType] = useState<string | null>(null);
  const { token } = theme.useToken();

  const { setNodes } = useReactFlow();

  const createAddNewNode = useCallback(
    (nodeType: string): OnDropAction => {
      return ({ position }: { position: XYPosition }) => {
        const newNode = {
          id: nanoid(),
          type: nodeType,
          position,
          data: { label: `${nodeType} node` },
        };

        setNodes((nds) => nds.concat(newNode));
        setType(null);
      };
    },
    [setNodes, setType],
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
        {NODE_SCHEMAS.filter((s) => s.draggable).map((s) => (
          <Card
            key={s.kind}
            draggable
            hoverable
            onPointerDown={(event) => {
              setType('default');
              onDragStart(event, createAddNewNode('default'));
            }}
            styles={{
              root: {
                border: `1px solid ${token.colorBorder}`,
                marginBottom: 8,
                cursor: 'grab',
              },
              body: {
                padding: '8px 16px',
              },
            }}
          >
            <Flex align="center" gap="middle">
              <Avatar shape="square" icon={<Icon name={s.icon || 'Box'} size={16} />} />
              <Flex vertical>
                <Text strong>{s.title}</Text>
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  {s.description}
                </Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </div>
    </>
  );
};
