import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthPage from './Auth.jsx'

const routes = {
  '/': App,
  '/auth': AuthPage,
}

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const RootPage = routes[pathname] || App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootPage />
  </StrictMode>
)
