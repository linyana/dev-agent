import React, { useMemo } from 'react';
import { Segmented } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import type { IRouteType } from '@/types';
import { Icon } from '@/components';
import { useMobile } from '@/hooks';

export const LayoutRouteMenu: React.FC<{
  routes: IRouteType[];
}> = ({ routes }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMobile();

  const options = useMemo(() => {
    return routes
      .filter((r) => r?.handle?.menu)
      .map((r) => ({
        label: r?.handle?.menu?.label,
        value: r.path,
        icon: r?.handle?.menu?.iconName ? (
          <Icon name={r.handle.menu.iconName} size={isMobile ? 14 : 18} />
        ) : null,
      }));
  }, [routes, isMobile]);

  const current = useMemo(() => {
    const match = routes.find((r) => location.pathname.startsWith(r.path || ''));
    return match?.path;
  }, [location.pathname, routes]);

  console.log(location.pathname);
  console.log(options);
  console.log(current);

  return (
    <Segmented
      size={isMobile ? 'medium' : 'large'}
      options={options}
      value={current}
      onChange={(val) => {
        if (typeof val === 'string') {
          navigate(val);
        }
      }}
    />
  );
};
