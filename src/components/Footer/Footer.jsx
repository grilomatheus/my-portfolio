import { useTranslation } from 'react-i18next';
import "./Footer.scss";
import { InstagramIcon, FacebookIcon, PinterestIcon } from '../SvgIcons/SvgIcons';
import Logo from '/logos/logo.png';

export default function Footer() {
	const { t } = useTranslation();
	return (
		<footer className='grid-container'>
			<p className="copyrights">© Grilo Tech Insights 2023</p>
		</footer>
	);
}
