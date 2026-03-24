import { Icon } from '@/components';
import { Card, Flex, theme, Typography, Avatar } from 'antd';

const { Text } = Typography;

export const Nodes = () => {
  const {
    token: { colorBorder },
  } = theme.useToken();
  return (
    <div
      style={{
        borderRight: `1px solid ${colorBorder}`,
        width: 260,
        height: '100%',
        padding: 8,
      }}
    >
      <Card
        draggable
        hoverable
        styles={{
          root: {
            border: `1px solid ${colorBorder}`,
          },
          body: {
            padding: '8px 16px',
          },
        }}
      >
        <Flex align="center" gap="middle">
          <Avatar shape="square" icon={<Icon name="Terminal" size={16} />} />
          <Flex vertical>
            <Text strong>CMD</Text>
            <Text
              style={{
                fontSize: 12,
              }}
            >
              执行一个CMD命令
            </Text>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};
