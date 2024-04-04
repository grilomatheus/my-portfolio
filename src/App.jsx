// src/App.jsx
import Navbar from "./components/Navbar/Navbar"
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import Contact from "./components/Contact/Contact"
import Footer from "./components/Footer/Footer";

function App() {
	return (
		<>
			<Navbar />
			<Hero />
			<Services />
			<Portfolio />
			<Contact />
			<Footer />
		</>
	);
}

export default App;
