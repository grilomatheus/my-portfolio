import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.scss';

const Contact = () => {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({ name: '', email: '', message: '' });
	const [submitStatus, setSubmitStatus] = useState({ status: '', message: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isFormFilled = formData.name && formData.email && formData.message;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.name || !formData.email || !formData.message) {
			setSubmitStatus({ status: 'error', message: t('contact.validation.fillAllFields') });
			setIsSubmitting(false);
			return;
		}

		if (!emailRegex.test(formData.email)) {
			setSubmitStatus({ status: 'error', message: t('contact.validation.unformattedEmail') });
			setIsSubmitting(false);
			return;
		}

		try {
			const response = await fetch('https://grilo-mailer.vercel.app/send-email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setSubmitStatus({ status: 'success', message: t('contact.fields.sent_success') });
				setFormData({ name: '', email: '', message: '' });
			} else {
				setSubmitStatus({ status: 'error', message: t('contact.fields.sent_error') });
			}
		} catch (error) {
			setSubmitStatus({ status: 'error', message: t('contact.fields.sent_error') });
		} finally {
			setIsSubmitting(false);
		}
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
				<h2 className="title-secondary">{t('contact.get_in_touch')}</h2>
				<p className="text-secondary">{t('contact.description')}</p>
			</div>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<div className="contact--name group">
						<input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
						<span className="highlight" />
						<span className="bar" />
						<label>{t('contact.fields.name')}</label>
					</div>
					<div className="contact--email group">
						<input id="email" name="email" type="text" value={formData.email} onChange={handleChange} required />
						<span className="highlight" />
						<span className="bar" />
						<label>{t('contact.fields.email')}</label>
					</div>
					<div className="contact--message group">
						<textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required />
						<span className="highlight" /><span className="bar" />
						<label>{t('contact.fields.message')}</label>
					</div>
					<div className="contact--submit">
						<div className="contact__feedback">
							{isSubmitting ? (
								<p className="contact__submit-status--info">{t('contact.fields.sending')}</p>
							) : (
								submitStatus.message && <p className={`contact__submit-status--${submitStatus.status}`}>{submitStatus.message}</p>
							)}
						</div>
						<input type="submit" className="btn-secondary" value={t('contact.fields.button')} disabled={!isFormFilled} />
					</div>
				</form>
			</div>
		</section>
	);
};

export default Contact;
