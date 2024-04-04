import { useTranslation } from 'react-i18next';
import "./Hero.scss";

const Hero = () => {
	const { t } = useTranslation();

	const scrollToContact = () => {
		const contactSection = document.querySelector('#contact');
		if (contactSection) {
			contactSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section id="hero">
			<div className="hero__container">
				<div className="hero__content">
					<h2 className='title-primary'>{t('hero.name')}</h2>
					<p>
						{t('hero.description')}
					</p>
					<button onClick={scrollToContact} className="btn-primary">{t('hero.button')}</button>
				</div>
				<img src="assets/avatar.png" className="avatar" alt="avatar" />
			</div>
		</section>
	);
};

export default Hero;
