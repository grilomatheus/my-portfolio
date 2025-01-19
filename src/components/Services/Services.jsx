import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackIcon, FrontIcon, DesignIcon, DevopsIcon, ArrowDownIcon } from '../SvgIcons/SvgIcons';
import "./Services.scss";

const Services = () => {
	const { t } = useTranslation();
	const skillTypes = t('services.types', { returnObjects: true });
	const [activeAccordion, setActiveAccordion] = useState(null);
	const [showSkills, setShowSkills] = useState(false);

	const serviceIcons = {
		frontend: FrontIcon,
		backend: BackIcon,
		design: DesignIcon,
		devops: DevopsIcon
	};

	const handleToggle = (id) => {
		setActiveAccordion(activeAccordion === id ? null : id);
	};

	const toggleSkillsView = () => {
		setShowSkills(!showSkills);
	};

	return (
		<section id="services">
			<div className="secText">
				<h2 className="title-secondary">{t('services.title')}</h2>
				<p className="text-secondary">{t('services.description')}</p>
			</div>
			{!showSkills ? (
				<div className="cards">
					{Object.entries(skillTypes).map(([type, { title, badgets }]) => (
						<div className={`servicesBx ${activeAccordion === type ? 'active' : ''}`} key={type} onClick={() => handleToggle(type)}>
							<div className="service-header">
								{serviceIcons[type] && React.createElement(serviceIcons[type], { className: `service-icon ${activeAccordion === type ? 'hidden' : ''}` })}
								<h3 className={`service-title`}>{title}</h3>
							</div>
							<div className={`service-skills ${activeAccordion === type ? '' : 'hidden'}`}>
								{badgets.map((badget, index) => (
									<span className="skill-badget" key={index}>{badget.name}</span>
								))}
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="skills">
					<div className="charts">
						{Object.entries(skillTypes).map(([type, { title, badgets }], index) => (
							<div className="accordion-card" key={type}>
								<div className="accordion-header">
									<div className={`accordion-toggle p-3 ${activeAccordion === index ? 'active' : ''}`} onClick={() => handleToggle(index)}>
										<h5 className="accordion-title">{title}</h5>
										<ArrowDownIcon className="accordion-icon"/>
									</div>
								</div>
								<div className={`accordion-collapse ${activeAccordion === index ? 'show' : ''}`} style={
									activeAccordion === index
										? { height: 'auto' }
										: { height: "0" }
								}>
									<div className="accordion-body">
										<ul className="ruler">
											<li>{t('services.levels.title')}</li>
											<li>{t('services.levels.basic')}</li>
											<li>{t('services.levels.mid')}</li>
											<li>{t('services.levels.high')}</li>
											<li>{t('services.levels.expert')}</li>
										</ul>
										<div className={`chart chart--${type.toLowerCase()}`}>
											<ul className="chart--item">
												{badgets.map((badge, skillIndex) => (
													<li className="chart__bar" style={{ width: badge.level }} key={skillIndex}>
														<span className="chart__label">{badge.name}</span>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			<div className="center">
				<button className="btn-secondary" onClick={toggleSkillsView}>
					{!showSkills ? (
						t('services.button-list')
					) : (
						t('services.button-card')
					)}
				</button>
			</div>
		</section>
	);
};

export default Services;
