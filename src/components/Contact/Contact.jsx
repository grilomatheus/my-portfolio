import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
				<h2 className="title-secondary">{t('contact_form.get_in_touch')}</h2>
				<p className="text-secondary">{t('contact_form.description')}</p>
			</div>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<div className="contact--name group">
						<input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
						<span className="highlight" />
						<span className="bar" />
						<label>{t('contact_form.fields.name')}</label>
					</div>
					<div className="contact--email group">
						<input id="email" name="email" type="text" value={formData.email} onChange={handleChange} required />
						<span className="highlight" />
						<span className="bar" />
						<label>{t('contact_form.fields.email')}</label>
					</div>
					<div className="contact--message group">
						<textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required />
						<span className="highlight" /><span className="bar" />
						<label>{t('contact_form.fields.message')}</label>
					</div>
					<div className="contact--submit">
						<input type="submit" className="btn-secondary" value={t('contact_form.fields.button')} disabled={!isFormFilled} />
					</div>
				</form>
			</div>
		</section>
	);
};

export default Contact;
