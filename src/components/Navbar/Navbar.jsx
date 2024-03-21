/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '/logos/logo.png';
import flagEn from '/flags/united-states.png';
import flagPt from '/flags/brazil.png';
import flagEs from '/flags/spain.png';
import './Navbar.scss';

const Navbar = ({ scrollToRef, refs }) => {
	const { i18n, t } = useTranslation();
	const [showDropdown, setShowDropdown] = useState(false);
	const [currentLang, setCurrentLang] = useState(i18n.language);
	const dropdownRef = useRef(null);

	const navbarItems = [
		{ key: 'home' },
		{ key: 'services', ref: refs.servicesRef },
		{ key: 'portfolio', ref: refs.portfolioRef },
		{ key: 'aftercare', ref: refs.aftercareRef },
		{ key: 'booking', ref: refs.contactRef },
	];

	const languageOptions = [
		{ code: 'en', flag: flagEn, label: t('language.english') },
		{ code: 'pt', flag: flagPt, label: t('language.portuguese') },
		{ code: 'es', flag: flagEs, label: t('language.spanish') },
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

	const handleNavbarItemClick = (item) => {
		if (item.key === 'home') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if (item.ref) {
			scrollToRef(item.ref);
		}
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

	return (
		<div className='navbar'>
			<a href={t('common.website')} onClick={() => handleNavbarItemClick({ key: 'home' })}>
				<img src={logo} alt="Grilo Tech" className="logo" />
			</a>
			<nav className="navbar-list">
				{navbarItems.map(item => (
					<div className="navbar-list__item" key={item.key} onClick={() => handleNavbarItemClick(item)}>
						<span>{t(`navbar.${item.key}`)}</span>
					</div>
				))}
			</nav>
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

		</div>
	);
}

export default Navbar;