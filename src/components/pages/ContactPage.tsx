import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { useToast } from '@/hooks/use-toast';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const { toast } = useToast();
  const { t } = useLanguageStore();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: t('contact', 'toastTitle'),
        description: t('contact', 'toastDescription'),
      });
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/3232e5_abc4740164f349a88d847d29e75a10b1~mv2.png?originWidth=1152&originHeight=640"
            alt="Contact Russo NV for industrial coating services"
            className="w-full h-full object-cover"
            width={1920}
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
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mt-4 mb-8 leading-tight uppercase">
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
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="border-l-4 border-primary pl-8 mb-12">
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4 uppercase">
                {t('contact', 'formTitle')}
              </h2>
              <p className="font-paragraph text-base text-foreground/70">
                {t('contact', 'formDescription')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="font-paragraph text-sm text-foreground/80 uppercase tracking-wider mb-3 block">
                    {t('contact', 'name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
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
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-grey/5 border-2 border-dark-grey/20 px-6 py-4 font-paragraph text-base text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectType" className="font-paragraph text-sm text-foreground/80 uppercase tracking-wider mb-3 block">
                  {t('contact', 'projectType')} *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-grey/5 border-2 border-dark-grey/20 px-6 py-4 font-paragraph text-base text-foreground focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">{t('contact', 'selectService')}</option>
                  <option value="sandblasting">{t('contact', 'sandblasting')}</option>
                  <option value="industrial-painting">{t('contact', 'industrialPainting')}</option>
                  <option value="fireproofing">{t('contact', 'fireproofing')}</option>
                  <option value="protective-coatings">{t('contact', 'protectiveCoatings')}</option>
                  <option value="coat-removal">{t('contact', 'coatRemoval')}</option>
                  <option value="tank-coating">{t('contact', 'tankCoating')}</option>
                  <option value="pipeline-coating">{t('contact', 'pipelineCoating')}</option>
                  <option value="other">{t('contact', 'other')}</option>
                </select>
              </div>

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

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
              >
                {isSubmitting ? t('contact', 'sending') : t('contact', 'send')}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="bg-dark-grey text-white p-12 space-y-12 sticky top-32">
              <div>
                <h3 className="font-heading text-3xl mb-8 uppercase">{t('contact', 'contactInfo')}</h3>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider mb-2">
                      {t('contact', 'phoneLabel')}
                    </div>
                    <a
                      href="tel:+3234567890"
                      className="font-paragraph text-lg text-white hover:text-primary transition-colors"
                    >
                      +32 3 456 78 90
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
                      href="mailto:info@russonv.be"
                      className="font-paragraph text-lg text-white hover:text-primary transition-colors"
                    >
                      info@russonv.be
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
                  href="tel:+32498765432"
                  className="font-paragraph text-lg text-primary hover:text-primary/80 transition-colors"
                >
                  +32 498 76 54 32
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full bg-secondary py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-8 uppercase">
              {t('contact', 'coverageTitle')} <span className="text-primary">{t('contact', 'coverageHighlight')}</span>
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-3xl mx-auto mb-16">
              {t('contact', 'coverageDescription')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { countryKey: 'countryBelgium', flag: '🇧🇪' },
                { countryKey: 'countryNetherlands', flag: '🇳🇱' },
                { countryKey: 'countryFrance', flag: '🇫🇷' },
                { countryKey: 'countryGermany', flag: '🇩🇪' },
                { countryKey: 'countryLuxembourg', flag: '🇱🇺' },
                { countryKey: 'countryUK', flag: '🇬🇧' },
                { countryKey: 'countryScandinavia', flag: '🇸🇪' },
                { countryKey: 'countryRestOfEurope', flag: '🇪🇺' },
              ].map((location, index) => (
                <motion.div
                  key={location.countryKey}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 hover:border-primary transition-colors"
                >
                  <div className="text-5xl mb-4">{location.flag}</div>
                  <div className="font-paragraph text-sm text-white/80">
                    {t('contact', location.countryKey)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
