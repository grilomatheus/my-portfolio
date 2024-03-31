// src/App.jsx
import Hero from './components/Hero/Hero'
import Contact from "./components/Contact/Contact"
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import Navbar from "./components/Navbar/Navbar"
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
