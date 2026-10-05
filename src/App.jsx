import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Facility from './pages/Facility.jsx';
import Location from './pages/Location.jsx';
import Company from './pages/Company.jsx';
import Contact from './pages/Contact.jsx';
import useScrollReveal from './hooks/useScrollReveal.js';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  useScrollReveal(pathname);
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facility" element={<Facility />} />
          <Route path="/location" element={<Location />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
