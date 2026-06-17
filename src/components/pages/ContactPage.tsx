import { Image } from '@/components/ui/image';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { serializeJsonLd } from '@/lib/json-ld';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, ChevronDown, Clock, Mail, MapPin, Phone, Search, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { COUNTRIES, DEFAULT_COUNTRY, flagEmoji, type Country } from '@/lib/countries';

const CONTACT_PHONE_DISPLAY = '+32 475 43 48 19';
const CONTACT_PHONE_HREF = '+32475434819';
const CONTACT_EMAIL = 'info@russonv.be';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
// Set PUBLIC_WEB3FORMS_KEY in the environment to the Web3Forms access key.
const WEB3FORMS_ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '';
// Optional second recipient: a best-effort duplicate send to the owner's own
// Web3Forms key (PUBLIC_WEB3FORMS_NOTIFY_KEY) so they also receive every enquiry
// by email + in their dashboard. Never blocks or fails the primary client submit.
const WEB3FORMS_NOTIFY_KEY = import.meta.env.PUBLIC_WEB3FORMS_NOTIFY_KEY ?? '';
// Address components, used both in the visible UI and the JSON-LD structured
// data below. Single source of truth for the HQ address.
const HQ_STREET = 'Taxandriastraat 35';
const HQ_POSTAL = '2170';
const HQ_CITY = 'Antwerp';
const HQ_COUNTRY_CODE = 'BE';
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${HQ_STREET}, ${HQ_POSTAL} ${HQ_CITY}`)}`;

// schema.org LocalBusiness JSON-LD - surfaces address, phone, email, opening
// hours to search engines so the business shows up in knowledge panels.
const BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.russonv.com/#localbusiness',
  name: 'Russo NV',
  alternateName: 'Russo Industriële Coatings',
  description: 'Industrieel coatingbedrijf in Antwerpen, gespecialiseerd in industriële coatings, stralen, brandwerende coatings, corrosiebescherming en oppervlaktevoorbehandeling voor petrochemie, maritieme sector en industrie in heel België en de Benelux.',
  url: 'https://www.russonv.com',
  telephone: '+32475434819',
  email: 'info@russonv.be',
  logo: 'https://static.wixstatic.com/media/3232e5_48e2024c6d3f441e817637ccdd99f28f~mv2.png',
  image: 'https://static.wixstatic.com/media/3232e5_48e2024c6d3f441e817637ccdd99f28f~mv2.png',
  priceRange: '€€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: HQ_STREET,
    postalCode: HQ_POSTAL,
    addressLocality: HQ_CITY,
    addressRegion: 'Antwerpen',
    addressCountry: HQ_COUNTRY_CODE,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.2654,
    longitude: 4.4685,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:30',
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'Belgium' },
    { '@type': 'Country', name: 'Netherlands' },
    { '@type': 'Country', name: 'Luxembourg' },
    { '@type': 'AdministrativeArea', name: 'Flanders' },
    { '@type': 'City', name: 'Antwerp' },
    { '@type': 'City', name: 'Ghent' },
    { '@type': 'City', name: 'Brussels' },
    { '@type': 'City', name: 'Zeebrugge' },
  ],
  knowsLanguage: ['nl', 'en', 'fr'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Industrial Coating Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Industriële coatings' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Stralen (abrasive blasting)' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Brandwerende coatings (intumescent fireproofing)' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Corrosiebescherming' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Waterdichting' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Hogedruk waterstralen' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Coating-inspectie' },
      },
    ],
  },
  sameAs: [
    'https://www.linkedin.com/company/russo-nv/',
    'https://www.instagram.com/russo.n.v/',
    'https://www.facebook.com/share/16myRf73Ju/?mibextid=wwXIfr',
  ],
};

// Plausible-phone check on the local-number portion (excludes country dial).
// 6 digits is loose enough for the shortest national numbers; rejects "test",
// "12345", and the typical fake-input strings.
function isPhoneNumberPlausible(localNumber: string): boolean {
  return localNumber.replace(/\D/g, '').length >= 6;
}

interface CountrySelectProps {
  value: Country;
  onChange: (c: Country) => void;
  invalid?: boolean;
}

function CountrySelect({ value, onChange, invalid }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Bring the currently-selected country into view when the dropdown opens -
  // otherwise it always opens scrolled to the top, hiding the active row.
  useEffect(() => {
    if (open && selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [open]);

  const q = query.trim().toLowerCase();
  const dialQuery = q.replace(/^\+/, '');
  const filtered = q
    ? COUNTRIES.filter(
        c => c.name.toLowerCase().includes(q) || c.dial.startsWith(dialQuery),
      )
    : COUNTRIES;

  const borderClass = invalid
    ? 'border-destructive'
    : open
      ? 'border-primary'
      : 'border-dark-grey/20';

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code: ${value.name} +${value.dial}`}
        className={`flex items-center gap-2 bg-dark-grey/5 border-2 ${borderClass} border-r-0 px-3 py-4 h-full font-paragraph text-base text-foreground hover:bg-dark-grey/10 transition-colors`}
      >
        <span className="text-xl leading-none">{flagEmoji(value.iso)}</span>
        <span className="font-bold">+{value.dial}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-20 mt-1 w-72 max-w-[calc(100vw-2rem)] bg-background border-2 border-dark-grey/20 shadow-lg">
          <div className="relative border-b border-dark-grey/10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              autoFocus
              aria-label="Search countries"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search country"
              className="w-full bg-transparent pl-9 pr-3 py-3 font-paragraph text-sm text-foreground focus:outline-none"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-3 py-3 font-paragraph text-sm text-foreground/60">
                No matches
              </li>
            ) : (
              filtered.map(c => (
                <li key={c.iso} ref={c.iso === value.iso ? selectedItemRef : null}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={c.iso === value.iso}
                    onClick={() => {
                      onChange(c);
                      setOpen(false);
                      setQuery('');
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left font-paragraph text-sm hover:bg-primary/10 transition-colors ${
                      c.iso === value.iso ? 'bg-primary/5 text-primary font-bold' : 'text-foreground'
                    }`}
                  >
                    <span className="text-lg leading-none">{flagEmoji(c.iso)}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-foreground/60">+{c.dial}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
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
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phoneError, setPhoneError] = useState(false);
  // Honeypot - kept out of formData so it never participates in resets/submits.
  // Bots eagerly fill any text field they find; humans never see this one.
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot trap: if the hidden field has any value, the submitter is
    // almost certainly a bot. Pretend success so the bot moves on, but never
    // call the API. No false positives for real users - they never see it.
    if (honeypot) {
      setIsSubmitted(true);
      return;
    }
    if (!isPhoneNumberPlausible(formData.phone)) {
      setPhoneError(true);
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    const localDigits = formData.phone.replace(/\D/g, '');
    const fullPhone = `+${selectedCountry.dial}${localDigits}`;
    const payload = {
      subject: 'New website enquiry: Russo NV',
      from_name: 'Russo NV website',
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: fullPhone,
      message: formData.message,
    };
    const post = (accessKey: string) =>
      fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: accessKey, ...payload }),
      });
    try {
      // Owner's personal copy - best-effort; must never block or fail the client send.
      if (WEB3FORMS_NOTIFY_KEY) {
        post(WEB3FORMS_NOTIFY_KEY).catch(() => {});
      }
      // Primary submit → the client's inbox. This is the one that determines success.
      const response = await post(WEB3FORMS_ACCESS_KEY);
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result?.success === false) {
        throw new Error(result?.message || `Submission failed (${response.status})`);
      }
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      });
      setSelectedCountry(DEFAULT_COUNTRY);
      setIsSubmitted(true);
      // Fire-and-forget: let our own (cookieless) analytics tie this conversion
      // to the visitor's session. Name + company only; email/phone stay in the
      // inbox. Never blocks or fails the real submit (errors swallowed).
      try {
        fetch('/_event', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'contact',
            name: payload.name,
            company: payload.company,
            page: window.location.pathname,
          }),
          keepalive: true,
        }).catch(() => {});
      } catch {
        /* ignore */
      }
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(BUSINESS_JSON_LD) }}
      />

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-hero.jpg"
            alt={t('contact', 'heroImageAlt')}
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
              {/* Honeypot - invisible to humans, bots fill it, we silently drop.
                  Uses the canonical visually-hidden CSS (clip-path) instead of
                  off-screen positioning so it doesn't depend on layout context
                  or risk creating a horizontal scrollbar. */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  padding: 0,
                  margin: '-1px',
                  overflow: 'hidden',
                  clip: 'rect(0,0,0,0)',
                  whiteSpace: 'nowrap',
                  border: 0,
                }}
              >
                <label htmlFor="website">Website (leave blank)</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

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
                      autoCapitalize="words"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-grey/5 border-2 border-dark-grey/20 px-6 py-4 font-paragraph text-base text-foreground focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="font-paragraph text-sm text-foreground/80 uppercase tracking-wider mb-3 block">
                      {t('contact', 'company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
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
                    <div className="flex">
                      <CountrySelect
                        value={selectedCountry}
                        onChange={setSelectedCountry}
                        invalid={phoneError}
                      />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        autoComplete="tel-national"
                        aria-invalid={phoneError}
                        aria-describedby={phoneError ? 'phone-error' : undefined}
                        value={formData.phone}
                        onChange={(e) => {
                          handleChange(e);
                          if (phoneError) setPhoneError(false);
                        }}
                        required
                        placeholder="475 12 34 56"
                        className={`flex-1 min-w-0 bg-dark-grey/5 border-2 ${phoneError ? 'border-destructive' : 'border-dark-grey/20'} px-6 py-4 font-paragraph text-base text-foreground focus:border-primary focus:outline-none transition-colors`}
                      />
                    </div>
                    {phoneError && (
                      <p id="phone-error" className="font-paragraph text-sm text-destructive mt-2">
                        {t('contact', 'phoneInvalid')}
                      </p>
                    )}
                  </div>
                </div>
              </fieldset>

              <fieldset className="space-y-8 border-0 p-0 m-0">
                <legend className="sr-only">{t('contact', 'fieldsetMessage')}</legend>
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

              <p className="font-paragraph text-xs text-white/50 mt-4 max-w-prose">
                {t('contact', 'privacyNotice')}
              </p>
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
            <address
              id="info"
              aria-labelledby="contact-info-heading"
              className="not-italic bg-dark-grey text-white p-12 space-y-12 lg:sticky lg:top-24 scroll-mt-24"
            >
              <div>
                <h2 id="contact-info-heading" className="font-heading text-xl md:text-2xl mb-8 uppercase">
                  {t('contact', 'contactInfo')}
                </h2>
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
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-paragraph text-lg text-white hover:text-primary transition-colors block"
                    >
                      {t('contact', 'locationValue')}
                    </a>
                    <div className="font-paragraph text-sm text-white/70 mt-2">
                      {t('contact', 'servingRegion')}
                    </div>
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 font-paragraph text-xs text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
                    >
                      {t('contact', 'locationDirections')} →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider mb-2">
                      {t('contact', 'businessHours')}
                    </div>
                    <dl className="font-paragraph text-base text-white space-y-1 grid grid-cols-[auto_1fr] gap-x-4">
                      <dt className="sr-only">{t('contact', 'mondayFriday')}</dt>
                      <dd className="col-span-2">{t('contact', 'mondayFriday')}</dd>
                      <dt className="sr-only">{t('contact', 'saturday')}</dt>
                      <dd className="col-span-2">{t('contact', 'saturday')}</dd>
                      <dt className="sr-only">{t('contact', 'sunday')}</dt>
                      <dd className="col-span-2">{t('contact', 'sunday')}</dd>
                    </dl>
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
            </address>
          </motion.div>
        </div>
      </section>

      {/* Coverage Section */}
      <section id="coverage" className="w-full bg-background py-32 scroll-mt-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <SectionLabel text={t('contact', 'coverageSectionLabel')} />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-foreground mb-8 uppercase leading-tight">
              {t('contact', 'coverageTitle')} <span className="text-primary">{t('contact', 'coverageHighlight')}</span>
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-foreground/70 mb-16">
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
                className="bg-dark-grey/5 border border-dark-grey/10 p-8 hover:border-primary transition-colors text-center"
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

    </div>
  );
}
