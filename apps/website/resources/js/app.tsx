import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

import { SocketProvider } from './providers/SocketProvider';

createInertiaApp({
  id: 'app',
  resolve: (pageName) => require(`./pages/${pageName}`),
  setup({ el, App, props }) {
    createRoot(el).render(
      <SocketProvider>
        <App {...props} />
      </SocketProvider>,
    );
  },
});
