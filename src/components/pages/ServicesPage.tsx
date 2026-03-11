import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { IndustrialServices } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useLanguageStore } from '@/lib/i18n/useLanguage';

export default function ServicesPage() {
  const { t } = useLanguageStore();
  const [services, setServices] = useState<IndustrialServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32">
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <LoadingSpinner />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-32">
              <p className="font-paragraph text-lg text-foreground/60">No services available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-32">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="relative h-[500px] overflow-hidden">
                      <Image
                        src={service.serviceImage || 'https://static.wixstatic.com/media/3232e5_361542816ae042acac6c1000f5ee8a72~mv2.png?originWidth=768&originHeight=448'}
                        alt={service.serviceName || 'Industrial service'}
                        className="w-full h-full object-cover"
                        width={800}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="space-y-6">
                      <div className="inline-block border-l-4 border-primary pl-6">
                        <h2 className="font-heading text-4xl md:text-5xl text-foreground">
                          {service.serviceName}
                        </h2>
                      </div>

                      <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                        {service.description}
                      </p>

                      {service.keyBenefits && (
                        <div className="bg-dark-grey/5 border-l-4 border-primary p-8">
                          <h3 className="font-heading text-2xl text-foreground mb-4">Key Benefits</h3>
                          <p className="font-paragraph text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                            {service.keyBenefits}
                          </p>
                        </div>
                      )}

                      {service.processOverview && (
                        <div>
                          <h3 className="font-heading text-2xl text-foreground mb-4">Process Overview</h3>
                          <p className="font-paragraph text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                            {service.processOverview}
                          </p>
                        </div>
                      )}

                      {service.targetIndustries && (
                        <div>
                          <h3 className="font-heading text-xl text-foreground mb-3">Target Industries</h3>
                          <p className="font-paragraph text-base text-foreground/70">
                            {service.targetIndustries}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
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
