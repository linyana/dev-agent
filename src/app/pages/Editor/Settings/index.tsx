import { theme } from 'antd';

export const Settings = () => {
  const {
    token: { colorBorder },
  } = theme.useToken();
  return (
    <div
      style={{
        borderLeft: `1px solid ${colorBorder}`,
        width: 260,
        height: '100%',
      }}
    ></div>
  );
};
