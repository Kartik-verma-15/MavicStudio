import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ExploreWorlds from './Section2.jsx'
import StepsSection from './Stepssection.jsx'
import Footer from './Footer.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ExploreWorlds />
    <StepsSection />
    <Footer />
  </StrictMode>
)
