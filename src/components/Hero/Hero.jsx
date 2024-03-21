import { useTranslation } from 'react-i18next';
import "./Hero.scss";

const Hero = () => {
	const { t } = useTranslation();

	return (
		<section id="hero">
			<div className="hero__container">
				<div className="hero__content">
					<h2 className='title-light'>{t('profile.name')}</h2>
					<p>
						{t('profile.description')}
					</p>
					<a href="#contact" className="btn-light">{t('contact.title')}</a>
				</div>
				<img src="img/avatar.png" className="avatar" alt="avatar" />
			</div>
		</section>
	);
};

export default Hero;
