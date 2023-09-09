import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useAuthStore } from './stores/auth';
import { App } from './App';

useAuthStore.getState().init();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
