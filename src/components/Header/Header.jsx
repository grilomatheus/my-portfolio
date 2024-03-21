import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Header.scss';
import flagEn from '/flags/united-states.png';
import flagPt from '/flags/brazil.png';

const Header = ({ scrollToRef, refs }) => {
	const { i18n, t } = useTranslation();
	const [menuActive, setMenuActive] = useState(false);

	const [showDropdown, setShowDropdown] = useState(false);
	const [currentLang, setCurrentLang] = useState(i18n.language);
	const dropdownRef = useRef(null);

	const scrollToContact = (e) => {
		e.preventDefault();
		const contactSection = document.querySelector('#contact');
		if (contactSection) {
			contactSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const languageOptions = [
		{ code: 'en', flag: flagEn, label: t('language.english') },
		{ code: 'pt', flag: flagPt, label: t('language.portuguese') },
	];

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		document.querySelector('.dropdown').classList.add('fade-out');
		setCurrentLang(lng);
		setTimeout(() => {
			setShowDropdown(false);
		}, 500);
	};

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
	};

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
	// const changeLanguage = (lng) => {
	//     i18n.changeLanguage(lng);
	// };

	return (
		<header className={menuActive ? 'active' : ''}>
			<div className="content">
				<a href="index.html" className="logo">
					<img src="../../img/logo.png" />
				</a>
				<div className="menuToggle" onClick={toggleMenu}></div>
				<ul className={`nav ${menuActive ? 'active' : ''}`}>
					<li><a href="#home">{t('menu.home')}</a></li>
					<li><a href="#services">{t('menu.services')}</a></li>
					<li><a href="#portfolio">{t('menu.portfolio')}</a></li>
					<li><a href="#contact" onClick={scrollToContact}>{t('menu.contact')}</a></li>

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

export default Header;
