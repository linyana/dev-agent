import { Avatar, Flex, theme, Typography } from 'antd';
import { useEffect, useState } from 'react';
import type { IRouteType } from '@/types';
import { useGlobal, useMobile } from '@/hooks';
import { LucideFolderOpen } from 'lucide-react';
import { LayoutRouteMenu } from '../../Menu';

type IPropsType = {
  children: React.ReactNode;
  routes: IRouteType[];
};

const { Text } = Typography;

export const DefaultLayout = ({ routes, children }: IPropsType) => {
  const isMobile = useMobile();
  const [isInit, setIsInit] = useState<boolean>(true);
  const {
    token: { colorBorder },
  } = theme.useToken();
  const { actions } = useGlobal();

  useEffect(() => {
    if (!isInit) {
      actions.set({
        collapsed: isMobile,
      });
    }
    setIsInit(false);
  }, [isMobile]);

  return (
    <>
      <Flex
        style={{
          padding: '16px 32px',
          borderBottom: `1px solid ${colorBorder}`,
        }}
        justify="space-between"
      >
        <Flex
          align="center"
          gap="small"
          style={{
            width: '150px',
          }}
        >
          <Avatar
            shape="square"
            icon={<LucideFolderOpen size={18} />}
            style={{
              backgroundColor: 'black',
            }}
          />
          <Text strong>Dev Agent</Text>
        </Flex>
        <LayoutRouteMenu routes={routes} />
        <div
          style={{
            width: '150px',
          }}
        ></div>
      </Flex>
      <div
        style={{
          backgroundColor: '#F7F9FC',
          height: 'calc(100vh - 73px)',
        }}
      >
        {children}
      </div>
    </>
  );
};
