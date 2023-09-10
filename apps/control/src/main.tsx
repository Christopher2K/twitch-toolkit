import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'

import { useAuthStore } from './stores/auth';
import { App } from './App';
import './index.css'

useAuthStore.getState().init();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>,
);
