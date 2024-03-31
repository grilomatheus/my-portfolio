
import { useTranslation } from 'react-i18next';
import "./Portfolio.scss";

const Portfolio = () => {
	const { t } = useTranslation();

	return (
		<section id="portfolio">
			<div className="secText">
				<h2 className="title-primary">{t('portfolio.title')}</h2>
				<p className="text-primary">{t('portfolio.description')}</p>
			</div>
			<div className="content">
				<div className="imgBx">
					<img src="web/estante.png" alt="Estante Virtual" />
				</div>
				<div className="imgBx">
					<img src="web/safra.png" alt="Banco Safra" />
				</div>
				<div className="imgBx">
					<img src="web/oi.png" alt="Oi Telecom" />
				</div>
				<div className="imgBx">
					<img src="web/magalu.png" alt="Magazine Luiza" />
				</div>
				<div className="imgBx">
					<img src="web/riocard.png" alt="RioCard" />
				</div>
				<div className="imgBx">
					<img src="web/araujo.png" alt="Araujo Abreu" />
				</div>
			</div>
			<div className="center">
				<a href={t('portfolio.resume')} className="btn-primary" target="_blank" rel="noreferrer">{t('portfolio.button')}</a>
			</div>
		</section>
	);
};

export default Portfolio;
