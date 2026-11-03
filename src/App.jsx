import ExploreWorlds from './Section2.jsx'
import StepsSection from './Stepssection.jsx'
import Footer from './Footer.jsx'
import BackendTest from './Backendtest.jsx'
import Herosection from './Herosection.jsx'
import AuthPage from './Auth.jsx'
export default function App() {
  if (window.location.pathname === '/auth') {
    return <AuthPage />
  }

  return (
    <div className="min-h-screen bg-[#f4efd9]">
      <Herosection />
      <ExploreWorlds />
      <StepsSection />
      <Footer />
      <BackendTest />
    </div>
  );
}