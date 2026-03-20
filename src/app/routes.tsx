import { Navigate } from 'react-router-dom';
import type { IRouteType } from '@/types';
import { LayoutDashboard, Plug, Settings, NotepadText, LayoutDashboardIcon } from 'lucide-react';
import { Dashboard } from './pages';

const NotFound = () => {
  throw new Response('Not Found', {
    status: 404,
    statusText: 'Not Found',
  });
};

export const routes: IRouteType[] = [
  {
    id: '/',
    path: '/',
    element: <Dashboard />,
    handle: {
      layout: 'DEFAULT',
      menu: {
        label: 'Dashboard',
        icon: (
          <LayoutDashboardIcon
            size={18}
            style={{
              verticalAlign: 'middle',
            }}
          />
        ),
      },
    },
  },
  {
    id: 'not-found',
    path: '*',
    element: <NotFound />,
  },
];
