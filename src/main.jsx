import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css'

import { RouterProvider } from 'react-router'

import router from '../src/routes/Router'
import AuthProvider from './provider/AuthProvider'
import { ToastProvider } from './provider/ToastProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
)
