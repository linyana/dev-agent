import type { IRouteType } from '@/types';
import { Dashboard, Editor } from './pages';
import { Icon } from './components';

const NotFound = () => {
  throw new Response('Not Found', {
    status: 404,
    statusText: 'Not Found',
  });
};

export const routes: IRouteType[] = [
  {
    id: '/dashboard',
    path: '/dashboard',
    element: <Dashboard />,
    handle: {
      menu: {
        label: 'Dashboard',
        iconName: 'LayoutDashboard',
      },
    },
  },
  {
    id: '/editor',
    path: '/editor',
    element: <Editor />,
    handle: {
      menu: {
        label: 'Editor',
        iconName: 'Workflow',
      },
    },
  },
  {
    id: 'not-found',
    path: '*',
    element: <NotFound />,
  },
];
