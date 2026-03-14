import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { IndustrialServices } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const [services, setServices] = useState<IndustrialServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguageStore();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const result = await BaseCrudService.getAll<IndustrialServices>('industrialservices');
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/3232e5_9c963dcc60f34f52af898b723a8fc190~mv2.png?originWidth=1152&originHeight=640"
            alt="Industrial services and coating work"
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
            <span className="font-paragraph text-primary text-sm uppercase tracking-wider">Our Expertise</span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white mt-4 mb-8 leading-none">
              INDUSTRIAL<br />
              <span className="text-primary">SERVICES</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              Comprehensive coating and surface preparation solutions for heavy industry across Belgium and neighboring countries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Content */}
      <section className="w-full max-w-[100rem] mx-auto px-6 sm:px-8 py-20 sm:py-24 xl:py-28 overflow-hidden">
        <div className="min-h-[400px] min-w-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <LoadingSpinner />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-24 min-w-0">
              <p className="font-paragraph text-lg text-foreground/60 break-words">
                No services available at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-20 sm:space-y-24 xl:space-y-28 min-w-0">
              {services.map((service, index) => {
                const isReversed = index % 2 === 1;

                return (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="min-w-0"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-stretch min-w-0">
                      {/* Image Column */}
                      <div className={`min-w-0 w-full ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className="relative h-[300px] sm:h-[380px] lg:h-full min-h-[420px] w-full overflow-hidden group border border-dark-grey/10 bg-dark-grey/5">
                          <Image
                            src={
                              service.serviceImage ||
                              'https://static.wixstatic.com/media/3232e5_361542816ae042acac6c1000f5ee8a72~mv2.png?originWidth=768&originHeight=448'
                            }
                            alt={service.serviceName || 'Industrial service'}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            width={800}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary z-10" />
                          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary z-10" />
                        </div>
                      </div>

                      {/* Text Column */}
                      <div className={`min-w-0 w-full flex ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="w-full border border-dark-grey/10 bg-white p-6 sm:p-8 xl:p-10 flex flex-col justify-center min-w-0">
                          <div className="space-y-6 min-w-0 w-full">
                            {/* Service number */}
                            <div className="flex items-center gap-4">
                              <span className="font-heading text-primary/30 text-4xl sm:text-5xl font-black leading-none shrink-0">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <div className="h-px flex-1 bg-dark-grey/10" />
                            </div>

                            <div className="min-w-0">
                              <h2 className="font-heading text-3xl sm:text-4xl xl:text-5xl text-foreground leading-[0.95] tracking-tight break-words">
                                {service.serviceName}
                              </h2>
                            </div>

                            <p className="font-paragraph text-base sm:text-lg text-foreground/70 leading-relaxed break-words max-w-[62ch]">
                              {service.description}
                            </p>

                            {service.keyBenefits && (
                              <div className="border-t border-dark-grey/10 pt-6 min-w-0 w-full">
                                <h3 className="font-heading text-lg sm:text-xl text-foreground mb-3 break-words">
                                  Key Benefits
                                </h3>
                                <p className="font-paragraph text-base text-foreground/70 leading-relaxed whitespace-pre-line break-words">
                                  {service.keyBenefits}
                                </p>
                              </div>
                            )}

                            {service.processOverview && (
                              <div className="border-t border-dark-grey/10 pt-6 min-w-0 w-full">
                                <h3 className="font-heading text-lg sm:text-xl text-foreground mb-3 break-words">
                                  Process Overview
                                </h3>
                                <p className="font-paragraph text-base text-foreground/70 leading-relaxed whitespace-pre-line break-words">
                                  {service.processOverview}
                                </p>
                              </div>
                            )}

                            {service.targetIndustries && (
                              <div className="border-t border-dark-grey/10 pt-6 min-w-0 w-full">
                                <h3 className="font-heading text-sm uppercase tracking-widest text-foreground/50 mb-2 break-words">
                                  Target Industries
                                </h3>
                                <p className="font-paragraph text-base text-foreground/70 break-words">
                                  {service.targetIndustries}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-secondary py-32">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
              NEED A <span className="text-primary">CUSTOM</span> SOLUTION?
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-12">
              Our team can develop tailored coating solutions for your specific industrial requirements
            </p>
            <Link to="/contact">
              <button className="bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors inline-flex items-center gap-3 group">
                Request Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
