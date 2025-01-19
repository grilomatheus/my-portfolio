import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';
import "./Portfolio.scss";

const Portfolio = () => {
    const { t } = useTranslation();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
		arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section id="portfolio">
            <div className="secText">
                <h2 className="title-primary">{t('portfolio.title')}</h2>
                <p className="text-primary">{t('portfolio.description')}</p>
            </div>
            <div className="content">
                <Slider {...settings}>
                    <div><img src="web/estante.png" alt="Estante Virtual" /></div>
                    <div><img src="web/safra.png" alt="Banco Safra" /></div>
                    <div><img src="web/oi.png" alt="Oi Telecom" /></div>
                    <div><img src="web/magalu.png" alt="Magazine Luiza" /></div>
                    <div><img src="web/riocard.png" alt="RioCard" /></div>
                    <div><img src="web/araujo.png" alt="Araujo Abreu" /></div>
                </Slider>
                <a href={t('portfolio.resume')} className="btn-primary" target="_blank" rel="noreferrer">{t('portfolio.button')}</a>
            </div>
        </section>
    );
};

export default Portfolio;
