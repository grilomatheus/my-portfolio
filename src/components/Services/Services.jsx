import { useTranslation } from 'react-i18next';
import "./Services.scss";

const Services = () => {
	const { t } = useTranslation();

	return (
		<section id="services">
			<div className="secText">
				<h2 className="title-dark">{t('skills.title')}</h2>
				<p className="text-dark">{t('skills.description')}</p>
			</div>
			<div className="content">
				<div className="servicesBx">
					<img src="img/icons/icon1.png" alt="icon web" />
					<h3>{t('skills.items.web_designing')}</h3>
				</div>
				<div className="servicesBx">
					<img src="img/icons/icon2.png" alt="icon web" />
					<h3>{t('skills.items.web_development')}</h3>
				</div>
				<div className="servicesBx">
					<img src="img/icons/icon3.png" alt="icon web" />
					<h3>{t('skills.items.web_apps')}</h3>
				</div>
				<div className="servicesBx">
					<img src="img/icons/icon4.png" alt="icon web" />
					<h3>{t('skills.items.web_editing')}</h3>
				</div>
			</div>
			<div className="center">
				<a href="pages/services/index.html" className="btn-dark">{t('skills.button')}</a>
			</div>
		</section>
	);
};

export default Services;
