import { Button, Flex, theme } from 'antd';

export const Actions = () => {
  const {
    token: { colorBorder },
  } = theme.useToken();

  return (
    <Flex
      justify="flex-end"
      style={{
        padding: 16,
        borderBottom: `1px solid ${colorBorder}`,
      }}
    >
      <Button>Add Node</Button>
    </Flex>
  );
};
