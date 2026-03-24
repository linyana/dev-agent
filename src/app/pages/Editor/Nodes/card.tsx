import { Card, Flex, Avatar, Typography, theme } from 'antd';
import { Icon } from '@/components';

const { Text } = Typography;

type Props = {
  schema: any;
  onDragStart?: (e: React.PointerEvent<HTMLDivElement>, schema: any) => void;
  marginBottom?: number;
};

export const NodeCard = ({ schema, onDragStart, marginBottom = 8 }: Props) => {
  const { token } = theme.useToken();

  return (
    <Card
      draggable={Boolean(onDragStart)}
      hoverable
      onPointerDown={(e) => onDragStart?.(e, schema)}
      styles={{
        root: {
          border: `1px solid ${schema.color || token.colorBorder}`,
          marginBottom,
          cursor: onDragStart ? 'grab' : 'default',
          backgroundColor: schema.bgColor,
        },
        body: {
          padding: '8px 12px',
        },
      }}
    >
      <Flex align="center" gap="middle">
        <Avatar
          shape="square"
          style={{
            background: `${schema.color}`,
            color: 'white',
          }}
          icon={<Icon name={schema.icon || 'Box'} size={16} />}
        />

        <Flex vertical>
          <Text strong>{schema.title}</Text>
          <Text style={{ fontSize: 12, color: token.colorTextSecondary }}>
            {schema.description}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
