import { Navigate } from 'react-router-dom';
import type { IRouteType } from '@/types';
import {
  LayoutDashboard,
  Plug,
  Settings,
  NotepadText,
  LayoutDashboardIcon,
  ListIcon,
} from 'lucide-react';
import { Dashboard, Tasks } from './pages';

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
    id: '/tasks',
    path: '/tasks',
    element: <Tasks />,
    handle: {
      menu: {
        label: 'Tasks',
        icon: (
          <ListIcon
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
