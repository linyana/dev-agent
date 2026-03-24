import { theme } from 'antd';

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
      }}
    ></div>
  );
};
