import '../css/app.css';

import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  id: 'app',
  resolve: (pageName) => require(`./pagess/${pageName}`),
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
