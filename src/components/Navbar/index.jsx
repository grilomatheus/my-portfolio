import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SunIcon, MoonIcon } from '../SvgIcons';
import flagEn from '/flags/united-states.png';
import flagPt from '/flags/brazil.png';
import './index.scss';

const Navbar = () => {
	const { i18n, t } = useTranslation();
	const [menuActive, setMenuActive] = useState(false);
	const [menuVisible, setMenuVisible] = useState(true);
	const [darkMode, setDarkMode] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [currentLang, setCurrentLang] = useState(i18n.language);
	const dropdownRef = useRef(null);
    const lastScrollTop = useRef(0);

	const sections = {
		home: '#hero',
		services: '#services',
		portfolio: '#portfolio',
		contact: '#contact',
	};

	const languageOptions = [
		{ code: 'en', flag: flagEn, label: t('language.english') },
		{ code: 'pt', flag: flagPt, label: t('language.portuguese') },
	];

	const toggleDropdown = () => {
		if (showDropdown) {
			document.querySelector('.dropdown').classList.add('fade-out');
			setTimeout(() => setShowDropdown(false), 500);
		} else {
			document.querySelector('.dropdown')?.classList.remove('fade-out');
			setShowDropdown(true);
		}
	};

	const toggleMenu = () => {
		setMenuActive(!menuActive);

		if (!menuActive) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
	};

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		document.body.classList.toggle('dark-theme');
	};

	const handleNavigation = (sectionId) => {
		const section = document.querySelector(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleMenuSelection = (sectionId) => {
		setMenuActive(false);
		document.body.classList.remove('no-scroll');

		handleNavigation(sectionId);
	};

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		document.querySelector('.dropdown').classList.add('fade-out');
		setCurrentLang(lng);
		setTimeout(() => {
			setShowDropdown(false);
		}, 500);
	};

	useEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
			if (currentScroll > lastScrollTop.current) {
				setMenuVisible(false);
			} else {
				setMenuVisible(true);
			}
			lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target) && showDropdown) {
				document.querySelector('.dropdown').classList.add('fade-out');
				setTimeout(() => {
					setShowDropdown(false);
				}, 500);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [showDropdown]);

	return (
		<header className={`${menuActive ? 'active' : ''} ${menuVisible ? '' : 'hidden'}`}>
			<div className="content">
				<a href="index.html" className="logo">
					<img src="../../assets/logo.png" />
				</a>
				<div className="menu-hamburger" onClick={toggleMenu} />
				<ul className={`nav ${menuActive ? 'active' : ''}`}>
					<li className="nav__item"><button onClick={() => handleMenuSelection(sections.home)}>{t('menu.home')}</button></li>
					<li className="nav__item"><button onClick={() => handleMenuSelection(sections.services)}>{t('menu.services')}</button></li>
					<li className="nav__item"><button onClick={() => handleMenuSelection(sections.portfolio)}>{t('menu.portfolio')}</button></li>
					<li className="nav__item"><button onClick={() => handleMenuSelection(sections.contact)}>{t('menu.contact')}</button></li>

					<button onClick={toggleDarkMode} className="dark-mode-toggle">
						{darkMode ? <SunIcon /> : <MoonIcon />}
					</button>
					<div className="language-select" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
						<img src={languageOptions.find(option => option.code === currentLang)?.flag} alt="Select Language" className="flag-icon" />
						{showDropdown && (
							<div className="dropdown" ref={dropdownRef}>
								{languageOptions.map(option => (
									<div key={option.code} className="dropdown__item" onClick={() => changeLanguage(option.code)}>
										<img src={option.flag} alt={option.label} className="flag-icon" />
										<span>{option.label}</span>
									</div>
								))}
							</div>
						)}
					</div>
				</ul>
			</div>
		</header>
	);
};

export default Navbar;
