import { useTranslation } from 'react-i18next';
import { EmailIcon, PhoneIcon, LinkedinIcon, WhatsappIcon } from '../SvgIcons/SvgIcons';
import Logo from '/assets/logo.png';
import "./Footer.scss";

export default function Footer() {
	const { t } = useTranslation();
	return (
		<footer className='grid-container'>
			<div className="content">
				<a href={t('footer.methods.email.url')} target="_blank" rel="noreferrer">
					<EmailIcon />
					<span className="label">{t('footer.methods.email.title')}</span>
					<span className="desc">{t('footer.methods.email.link')}</span>
				</a>
				<a href={t('footer.methods.phone.url')} target="_blank" rel="noreferrer">
					<PhoneIcon />
					<span className="label">{t('footer.methods.phone.title')}</span>
					<span className="desc">{t('footer.methods.phone.link')}</span>
				</a>
				<a href={t('footer.methods.linkedin.url')} target="_blank" rel="noreferrer">
					<LinkedinIcon />
					<span className="label">{t('footer.methods.linkedin.title')}</span>
					<span className="desc">{t('footer.methods.linkedin.link')}</span>
				</a>
				<a href={t('footer.methods.whatsapp.url')} target="_blank" rel="noreferrer">
					<WhatsappIcon />
					<span className="label">{t('footer.methods.whatsapp.title')}</span>
					<span className="desc">{t('footer.methods.whatsapp.link')}</span>
				</a>
			</div>
			<hr className="divider"/>
			<p className="copyrights">{t('footer.copyright')}</p>
			<div className="logo">
				<img src={Logo} alt="Grilo Tech Insights" />
			</div>
		</footer>
	);
}
