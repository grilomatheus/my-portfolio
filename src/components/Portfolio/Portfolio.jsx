import { useState, useEffect } from 'react';
import PhotoAlbum from "react-photo-album";
import { useTranslation } from 'react-i18next';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { PinterestIcon } from '../SvgIcons/SvgIcons';

import "./Portfolio.scss";

const Portfolio = () => {
	const { t } = useTranslation();
	const [index, setIndex] = useState(-1);
	const [photos, setPhotos] = useState();
	const [count, setCount] = useState(0);
	const [hasMoreClick, setHasMoreClick] = useState(true);
	const [showPinterestMessage, setShowPinterestMessage] = useState(false);
	const [targetRowHeight, setTargetRowHeight] = useState(600);

	useEffect(() => {
		const fetchPics = Array.from({ length: 6 }, (_, i) => {
			return { key: `${i}`, src: `./uploads/${i}.jpg`, width: 1080, height: 1080 };
		});
		setPhotos(fetchPics)
		setCount(6)
	}, []);

	useEffect(() => {
		const updateTargetRowHeight = () => {
			const screenWidth = window.innerWidth;

			switch (true) {
				case screenWidth < 480:
					setTargetRowHeight(200);
					break;
				case screenWidth >= 480 && screenWidth < 768:
					setTargetRowHeight(300);
					break;
				case screenWidth >= 768 && screenWidth < 1024:
					setTargetRowHeight(400);
					break;
				case screenWidth >= 1024 && screenWidth < 1280:
					setTargetRowHeight(500);
					break;
				default:
					setTargetRowHeight(600);
			}
		};

		updateTargetRowHeight();
		window.addEventListener('resize', updateTargetRowHeight);

		return () => window.removeEventListener('resize', updateTargetRowHeight);
	}, []);

	const handleViewMore = () => {
		setHasMoreClick(false);
		setShowPinterestMessage(true);
		const morePics = Array.from({ length: 6 }, (_, i) => {
			return { key: `${i + count}`, src: `./uploads/${i + count}.jpg`, width: 1080, height: 1080 };
		});
		const combinationPhotos = [...photos, ...morePics]
		setPhotos(combinationPhotos);
		setCount(count + 6);
	}


	return (
		<section id="portfolio">
			<div className="secText">
				<h2 className="title-light">{t('portfolio.title')}</h2>
				<p className="text-light">{t('portfolio.description')}</p>
			</div>
			<div className="content">
				<div className="imgBx">
					<img src="img/sites/img1.png" alt="sites web" />
				</div>
				<div className="imgBx">
					<img src="img/sites/img2.png" alt="sites web" />
				</div>
				<div className="imgBx">
					<img src="img/sites/img3.png" alt="sites web" />
				</div>
				<div className="imgBx">
					<img src="img/sites/img4.png" alt="sites web" />
				</div>
				<div className="imgBx">
					<img src="img/sites/img5.png" alt="sites web" />
				</div>
				<div className="imgBx">
					<img src="img/sites/img6.png" alt="sites web" />
				</div>
			</div>
			<div className="center">
				<a href="pages/gallery/index.html" className="btn-light">{t('portfolio.button')}</a>
			</div>
		</section>
	);
};

export default Portfolio;
