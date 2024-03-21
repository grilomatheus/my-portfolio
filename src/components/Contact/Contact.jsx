import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpIcon } from '../SvgIcons/SvgIcons';
import './Contact.scss';

const Contact = () => {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({ name: '', email: '', message: '' });
	const [submitStatus, setSubmitStatus] = useState({ status: '', message: '' });

	const isFormFilled = formData.name && formData.email && formData.message;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.name || !formData.email || !formData.message) {
			setSubmitStatus({ status: 'error', message: t('contact.validation.fillAllFields') });
			return;
		}

		if (!emailRegex.test(formData.email)) {
			setSubmitStatus({ status: 'error', message: t('contact.validation.unformattedEmail') });
			return;
		}

		setSubmitStatus({ status: 'success', message: t('contact.validation.formSubmitted') });
		// Limpar formData aqui pode causar problemas com isFormFilled se não for tratado corretamente
		setFormData({ name: '', email: '', message: '' });
	};

	useEffect(() => {
		if (submitStatus.message) {
			const timer = setTimeout(() => {
				setSubmitStatus({ status: '', message: '' });
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [submitStatus]);

	return (
		<section id="contact">
			<div className="secText">
				<h2 className="title-dark">{t('contact_form.get_in_touch')}</h2>
				<p className="text-dark">{t('contact_form.description')}</p>
			</div>
			<div className="content">
				<a href={`mailto:${t('contact.methods.email')}`} target="_blank" rel="noreferrer">
					<svg viewBox="-10 0 532 512"><path d="M64 112q-15 1 -16 16v22l173 142q16 12 35 12q20 0 36 -12l172 -142v-22q-1 -15 -16 -16h-384v0zM48 212v172q1 15 16 16h384q15 -1 16 -16v-172l-142 117q-30 23 -66 23t-66 -23l-142 -117v0zM0 128q1 -27 19 -45v0q18 -18 45 -19h384q27 1 45 19t19 45v256 q-1 27 -19 45t-45 19h-384q-27 -1 -45 -19t-19 -45v-256v0z" /></svg>
					{t('contact.methods.email')}
				</a>
				<a href={`tel:${t('contact.methods.phone')}`} target="_blank" rel="noreferrer">
					<svg viewBox="-10 0 532 512"><path d="M376 275q-27 -10 -47 12l-33 40q-70 -41 -111 -111l40 -33q22 -20 12 -47l-48 -112q-6 -13 -19 -19q-12 -7 -26 -4l-112 24q-30 8 -32 39v0q1 117 54 213q52 96 142 158q90 61 204 75l30 2v0v0v0v0v0h18v0q31 -2 39 -31l24 -112q3 -15 -3 -27q-7 -13 -20 -19l-112 -48v0z M442 464q-110 -3 -198 -56v0q-88 -52 -140 -140v0q-53 -88 -56 -197l99 -22l43 101l-36 29q-13 12 -16 29q-3 16 5 32q48 81 129 129q16 9 33 5q16 -3 28 -16l30 -36l100 43l-21 99v0zM48 64v0v0v0v0v0v0v0v0v0v0v0v0v0v0v0v0v0v0v0v0v0v0v0v0v0v0z" /></svg>
					{t('contact.methods.phone')}
				</a>
				<a href={t('contact.methods.linkedin')} target="_blank" rel="noreferrer">
					<svg viewBox="-10 0 469 512"><path d="M100 448h-93v-299h93v299zM54 108q-23 -1 -38 -16v0q-15 -15 -16 -38q1 -31 27 -47q27 -14 54 0q26 16 27 47q-1 23 -16 38t-38 16v0zM448 448h-93v-146q2 -27 -6 -52t-42 -27q-35 1 -46 24t-10 53v148h-93v-299h90v41h1q9 -19 31 -33q23 -15 57 -16q68 2 91 41 q22 40 20 102v164v0z" /></svg>            LinkedIn
				</a>
				<a href={t('contact.methods.whatsapp')} target="_blank" rel="noreferrer">
					<svg viewBox="-10 0 468 512"><path d="M381 97q-66 -64 -157 -65q-62 1 -112 30q-50 30 -80 80q-29 50 -30 112q0 60 29 111l-31 115l118 -31q49 27 106 27v0q62 -1 112 -30q51 -30 81 -80t31 -112q0 -45 -18 -85q-17 -40 -49 -72v0zM224 439q-51 -1 -94 -26l-7 -4l-70 18l19 -68l-4 -7q-28 -45 -29 -98 q2 -78 55 -130q52 -53 130 -54q76 0 130 54q55 54 57 130q-3 78 -56 131q-53 52 -131 54v0zM325 301q-5 -3 -19 -10v0q-14 -6 -19 -8q-7 -5 -12 2q-4 5 -9 12q-6 7 -9 10q-4 6 -12 1q-24 -11 -42 -25t-33 -41q-4 -6 3 -12q5 -4 13 -18q2 -5 -1 -10q-1 -1 -4 -10 q-3 -8 -7 -18q-4 -8 -6 -13q-6 -12 -11 -9h-1h-11q-6 -1 -15 6q0 1 -1 2q-5 4 -11 15t-7 30q1 20 10 37q9 16 12 20h1q0 1 1 2q5 9 30 36q24 27 63 46q26 11 40 14q15 2 27 0q9 -2 21 -9t16 -17q7 -22 4 -27q-2 -3 -8 -5q-2 -1 -3 -1v0z" /></svg>
					Whatsapp
				</a>
			</div>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<div className="group">
						<input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
						<span className="highlight" />
						<span className="bar" />
						<label>{t('contact_form.fields.name')}</label>
					</div>
					<div className="group">
						<input id="email" name="email" type="text" value={formData.email} onChange={handleChange} required />
						<span className="highlight" />
						<span className="bar" />
						<label>{t('contact_form.fields.email')}</label>
					</div>
					<div className="group">
						<textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required />
						<span className="highlight" /><span className="bar" />
						<label>{t('contact_form.fields.message')}</label>
					</div>
					<div className="btn-box">
						<input type="submit" className="btn-dark" value={t('contact_form.fields.button')} disabled={!isFormFilled} />
					</div>
				</form>
			</div>
		</section>
	);
};

export default Contact;
