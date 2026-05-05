import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { submissions } from '@wix/forms';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useState } from 'react';

const CONTACT_PHONE_DISPLAY = '+32 475 43 48 19';
const CONTACT_PHONE_HREF = '+32475434819';
const CONTACT_EMAIL = 'info@russonv.be';
const WIX_FORM_ID = 'cd161b70-3a80-4193-a8b4-04df43cdcf89';
// Bump this each time you push code. Visible next to the form heading so you
// can refresh and instantly tell whether you're testing the latest build.
const FORM_VERSION = 'v3';

// Plausible-phone check: at least 8 digits anywhere in the string. Country
// code alone (+32) has 2 digits; a real number adds 7-10+ more. Loose enough
// to accept international formats; strict enough to catch "test", "12345", etc.
function isPhonePlausible(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8;
}

const SectionLabel = ({ text, align = 'center' }: { text: string; align?: 'left' | 'center' }) => (
  <div className={`flex items-center gap-3 mb-6 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
    {align === 'center' && <span className="h-[1px] w-12 bg-primary/30" />}
    <span className="font-paragraph text-xs font-bold tracking-[0.2em] text-primary uppercase">{text}</span>
    <span className="h-[1px] w-12 bg-primary/30" />
  </div>
);

export default function ContactPage() {
  const { t } = useLanguageStore();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhonePlausible(formData.phone)) {
      setPhoneError(true);
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submissions.createSubmission({
        formId: WIX_FORM_ID,
        submissions: {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
      });
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setSubmitError(
        error instanceof Error ? error.message : 'Unknown error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-hero.jpg"
            alt="Contact Russo NV for industrial coating services"
            className="w-full h-full object-cover"
            width={1152}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/50" />
        </div>

        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-paragraph text-primary text-sm uppercase tracking-wider">
              {t('contact', 'heroLabel')}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white mt-4 mb-8 leading-tight sm:leading-none uppercase">
              {t('contact', 'heroLine1')}<br />
              <span className="text-primary">{t('contact', 'heroLine2')}</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              {t('contact', 'heroDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section id="form" className="w-full max-w-[100rem] mx-auto px-8 py-32 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <SectionLabel text={t('contact', 'formSectionLabel')} align="left" />
            <div className="border-l-4 border-primary pl-8 mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 uppercase leading-tight">
                {t('contact', 'formTitle')}
                <span className="ml-3 align-middle font-paragraph text-xs font-bold tracking-wider text-primary/60 normal-case">
                  {FORM_VERSION}
                </span>
              </h2>
              <p className="font-paragraph text-base text-foreground/70">
                {t('contact', 'formDescription')}
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <CheckCircle className="w-16 h-16 text-primary mb-6" />
                <h3 className="font-heading text-2xl sm:text-3xl text-foreground mb-4 uppercase">
                  {t('contact', 'toastTitle')}
                </h3>
                <p className="font-paragraph text-lg text-foreground/70 mb-8 max-w-md">
                  {t('contact', 'toastDescription')}
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmitError(null);
                  }}
                  className="bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors inline-flex items-center gap-3"
                >
                  {t('contact', 'sendAnother')}
                </button>
              </motion.div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <fieldset className="space-y-8 border-0 p-0 m-0">
                <legend className="sr-only">{t('contact', 'fieldsetDetails')}</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="font-paragraph text-sm text-foreground/80 uppercase tracking-wider mb-3 block">
                      {t('contact', 'name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-grey/5 border-2 border-dark-grey/20 px-6 py-4 font-paragraph text-base text-foreground focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="font-paragraph text-sm text-foreground/80 uppercase tracking-wider mb-3 block">
                      {t('contact', 'company')} *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-grey/5 border-2 border-dark-grey/20 px-6 py-4 font-paragraph text-base text-foreground focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="email" className="font-paragraph text-sm text-foreground/80 uppercase tracking-wider mb-3 block">
                      {t('contact', 'email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-grey/5 border-2 border-dark-grey/20 px-6 py-4 font-paragraph text-base text-foreground focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="font-paragraph text-sm text-foreground/80 uppercase tracking-wider mb-3 block">
                      {t('contact', 'phone')} *
                    </label>
                    <PhoneInput
                      defaultCountry="be"
                      value={formData.phone}
                      onChange={(phone) => {
                        setFormData((prev) => ({ ...prev, phone }));
                        if (phoneError) setPhoneError(false);
                      }}
                      inputProps={{
                        id: 'phone',
                        name: 'phone',
                        autoComplete: 'tel',
                        required: true,
                      }}
                      className="phone-input-wrapper"
                      inputClassName={`!w-full !bg-dark-grey/5 !border-2 ${phoneError ? '!border-destructive' : '!border-dark-grey/20 focus:!border-primary'} !px-4 !py-4 !font-paragraph !text-base !text-foreground !rounded-none !transition-colors !h-auto`}
                      countrySelectorStyleProps={{
                        buttonClassName: `!bg-dark-grey/5 !border-2 !border-r-0 ${phoneError ? '!border-destructive' : '!border-dark-grey/20'} !rounded-none !px-3 !h-auto`,
                      }}
                    />
                    {phoneError && (
                      <p className="font-paragraph text-sm text-destructive mt-2">
                        {t('contact', 'phoneInvalid')}
                      </p>
                    )}
                  </div>
                </div>
              </fieldset>

              <fieldset className="space-y-8 border-0 p-0 m-0">
                <legend className="sr-only">{t('contact', 'fieldsetProject')}</legend>
                <div>
                  <label htmlFor="message" className="font-paragraph text-sm text-foreground/80 uppercase tracking-wider mb-3 block">
                    {t('contact', 'projectDetails')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-dark-grey/5 border-2 border-dark-grey/20 px-6 py-4 font-paragraph text-base text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder={t('contact', 'projectDetailsPlaceholder')}
                  />
                </div>
              </fieldset>

              {submitError && (
                <div
                  role="alert"
                  className="flex items-start gap-3 bg-destructive/10 border-l-4 border-destructive p-4"
                >
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="font-paragraph text-sm text-destructive">
                    <span className="font-bold uppercase tracking-wider block mb-1">
                      {t('contact', 'submitErrorTitle')}
                    </span>
                    {t('contact', 'submitErrorDescription')}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
              >
                {isSubmitting ? t('contact', 'sending') : t('contact', 'send')}
                <Send className="w-5 h-5" />
              </button>
            </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div id="info" className="bg-dark-grey text-white p-12 space-y-12 sticky top-24 scroll-mt-24">
              <div>
                <h3 className="font-heading text-xl md:text-2xl mb-8 uppercase">{t('contact', 'contactInfo')}</h3>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider mb-2">
                      {t('contact', 'phoneLabel')}
                    </div>
                    <a
                      href={`tel:${CONTACT_PHONE_HREF}`}
                      className="font-paragraph text-lg text-white hover:text-primary transition-colors"
                    >
                      {CONTACT_PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider mb-2">
                      {t('contact', 'emailLabel')}
                    </div>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-paragraph text-lg text-white hover:text-primary transition-colors"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider mb-2">
                      {t('contact', 'locationLabel')}
                    </div>
                    <div className="font-paragraph text-lg text-white">
                      {t('contact', 'locationValue')}
                    </div>
                    <div className="font-paragraph text-sm text-white/70 mt-2">
                      {t('contact', 'servingRegion')}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider mb-2">
                      {t('contact', 'businessHours')}
                    </div>
                    <div className="font-paragraph text-base text-white space-y-1">
                      <div>{t('contact', 'mondayFriday')}</div>
                      <div>{t('contact', 'saturday')}</div>
                      <div>{t('contact', 'sunday')}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider mb-4">
                  {t('contact', 'emergencyContact')}
                </div>
                <p className="font-paragraph text-sm text-white/80 mb-4">
                  {t('contact', 'emergencyDescription')}
                </p>
                <a
                  href={`tel:${CONTACT_PHONE_HREF}`}
                  className="font-paragraph text-lg text-primary hover:text-primary/80 transition-colors"
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coverage Section */}
      <section id="coverage" className="w-full bg-secondary py-32 scroll-mt-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <SectionLabel text={t('contact', 'coverageSectionLabel')} />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-8 uppercase leading-tight">
              {t('contact', 'coverageTitle')} <span className="text-primary">{t('contact', 'coverageHighlight')}</span>
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-white/80 mb-16">
              {t('contact', 'coverageDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { stat: 'EU', titleKey: 'allEurope', descKey: 'allEuropeDesc' },
              { stat: '24/7', titleKey: 'updatesTitle', descKey: 'updatesDesc' },
              { stat: 'QC', titleKey: 'qcTitle', descKey: 'qcDesc' },
              { stat: '100%', titleKey: 'safetyTitle', descKey: 'safetyDesc' },
            ].map((item) => (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-dark-grey/10 p-8 hover:border-primary transition-colors text-center"
              >
                <div className="font-heading text-3xl sm:text-4xl text-primary mb-4">{item.stat}</div>
                <div className="font-heading text-base sm:text-lg lg:text-xl text-foreground mb-2">
                  {t('contact', item.titleKey)}
                </div>
                <div className="font-paragraph text-sm text-foreground/60">
                  {t('contact', item.descKey)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
