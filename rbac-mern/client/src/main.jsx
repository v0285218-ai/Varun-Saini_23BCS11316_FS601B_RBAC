import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import AuthProvider from './auth/AuthContext';
import { ThemeModeProvider } from './ThemeContext';
import { AnimatePresence } from 'framer-motion';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <AuthProvider>
        <AnimatePresence mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
      </AuthProvider>
    </ThemeModeProvider>
  </React.StrictMode>
);
