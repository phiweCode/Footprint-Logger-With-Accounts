import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './routes.js'; 
import { RouterProvider } from 'react-router';
import { backendApi } from './lib/utils.js';

backendApi.interceptors.request.use(config => {
  const token = config.accessToken ?? backendApi.accessToken;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
