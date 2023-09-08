import { Router, RootRoute, RouterProvider, Route } from '@tanstack/react-router';

import { Root } from '@/routes/Root';
import { Commands } from './routes/Commands';
import { Settings } from './routes/Settings';
import { ScreenConfig } from './routes/ScreenConfig';

// ROUTES
const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Commands,
});

const screenConfigRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/screen-config',
  component: ScreenConfig,
});

const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
});

// ROUTER
const routeTree = rootRoute.addChildren([
  indexRoute,
  screenConfigRoute,
  settingsRoute
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}
