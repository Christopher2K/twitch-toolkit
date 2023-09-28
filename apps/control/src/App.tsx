import { Router, RootRoute, RouterProvider, Route } from '@tanstack/react-router';

import { Root } from '@/routes/Root';
import { Commands } from './routes/Commands';
import { Settings } from './routes/Settings';
import { ScreenConfig } from './routes/ScreenConfig';
import { Dashboard } from './routes/Dashboard';
import { Subscriptions } from './routes/Subscriptions';
import { useAppStore } from './stores/app';

// ROUTES
const rootRoute = new RootRoute({
  component: Root,
});

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

const commandsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/commands',
  component: Commands,
});

const screenConfigRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/screen-config',
  component: ScreenConfig,
});

const subscriptionsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/subscriptions',
  component: Subscriptions,
});

const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
});

// ROUTER
const routeTree = rootRoute.addChildren([
  dashboardRoute,
  commandsRoute,
  screenConfigRoute,
  settingsRoute,
  subscriptionsRoute,
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const { ready } = useAppStore();
  if (!ready) {
    return null;
  }

  return <RouterProvider router={router} />;
}
