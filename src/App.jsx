// src\App.jsx
import { useRef, useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Contact from "./components/Contact/Contact"
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer";
// import Location from "./components/Location/Location"

function App() {
	const headerRef = useRef(null);
	const servicesRef = useRef(null);
	const portfolioRef = useRef(null);
	const aftercareRef = useRef(null);
	const contactRef = useRef(null);
  const heroRef = useRef(null);

  const scrollToRef = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRefs = [headerRef, heroRef, servicesRef /* adicione outras referências aqui */];

  useEffect(() => {
    const handleScroll = () => {
      const direction = window.pageYOffset > sectionsRefs[currentSection].current.offsetTop ? 1 : -1;
      const nextSection = currentSection + direction;

      if (nextSection >= 0 && nextSection < sectionsRefs.length) {
        sectionsRefs[nextSection].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setCurrentSection(nextSection);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentSection, sectionsRefs]);
	
	return (
		<div>
			{/* <Navbar scrollToRef={scrollToRef} refs={{ headerRef, servicesRef, portfolioRef, aftercareRef, contactRef }} /> */}
			<div ref={headerRef}><Header /></div>
			<Hero />
			<div ref={servicesRef}><Services /></div>
			<div ref={portfolioRef}><Portfolio /></div>
			<div ref={contactRef}><Contact /></div>
			<Footer />
		</div>
	);
}

export default App;
