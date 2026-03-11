import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
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

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Quote Request Received',
        description: 'Thank you for your interest. Our team will contact you within 24 hours.',
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
            <span className="font-paragraph text-primary text-sm uppercase tracking-wider">Get In Touch</span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mt-4 mb-8 leading-tight">
              CONTACT<br />
              <span className="text-primary">US</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              Request a quote or get in touch with our team for your industrial coating project
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
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                REQUEST A QUOTE
              </h2>
              <p className="font-paragraph text-base text-foreground/70">
                Fill out the form below and our team will get back to you within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="font-paragraph text-sm text-foreground/80 uppercase tracking-wider mb-3 block">
                    Full Name *
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
                    Company Name *
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
                    Email Address *
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
                    Phone Number *
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
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-grey/5 border-2 border-dark-grey/20 px-6 py-4 font-paragraph text-base text-foreground focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="sandblasting">Sandblasting</option>
                  <option value="industrial-painting">Industrial Painting</option>
                  <option value="fireproofing">Fireproofing Coatings</option>
                  <option value="protective-coatings">Protective Coatings</option>
                  <option value="coat-removal">Coat Removal</option>
                  <option value="tank-coating">Tank Coating</option>
                  <option value="pipeline-coating">Pipeline Coating</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="font-paragraph text-sm text-foreground/80 uppercase tracking-wider mb-3 block">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-dark-grey/5 border-2 border-dark-grey/20 px-6 py-4 font-paragraph text-base text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Please provide details about your project, timeline, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
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
                <h3 className="font-heading text-3xl mb-8">CONTACT INFO</h3>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider mb-2">
                      Phone
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
                      Email
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
                      Location
                    </div>
                    <div className="font-paragraph text-lg text-white">
                      Antwerp, Belgium
                    </div>
                    <div className="font-paragraph text-sm text-white/70 mt-2">
                      Serving BE, NL, FR, DE, LU
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider mb-2">
                      Business Hours
                    </div>
                    <div className="font-paragraph text-base text-white space-y-1">
                      <div>Monday - Friday: 8:00 - 18:00</div>
                      <div>Saturday: 9:00 - 14:00</div>
                      <div>Sunday: Closed</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider mb-4">
                  Emergency Contact
                </div>
                <p className="font-paragraph text-sm text-white/80 mb-4">
                  For urgent project matters outside business hours:
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
            <h2 className="font-heading text-5xl md:text-6xl text-white mb-8">
              OUR <span className="text-primary">COVERAGE</span>
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-3xl mx-auto mb-16">
              Based in Antwerp with projects across five European countries
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { country: 'Belgium', flag: '🇧🇪' },
                { country: 'Netherlands', flag: '🇳🇱' },
                { country: 'France', flag: '🇫🇷' },
                { country: 'Germany', flag: '🇩🇪' },
                { country: 'Luxembourg', flag: '🇱🇺' },
              ].map((location, index) => (
                <motion.div
                  key={location.country}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 hover:border-primary transition-colors"
                >
                  <div className="text-5xl mb-4">{location.flag}</div>
                  <div className="font-paragraph text-sm text-white/80">{location.country}</div>
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
