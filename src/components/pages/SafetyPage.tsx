import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Award, FileCheck, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Certifications, CompanyValues } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { format } from 'date-fns';

export default function SafetyPage() {
  const [certifications, setCertifications] = useState<Certifications[]>([]);
  const [companyValues, setCompanyValues] = useState<CompanyValues[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [certsResult, valuesResult] = await Promise.all([
        BaseCrudService.getAll<Certifications>('certifications'),
        BaseCrudService.getAll<CompanyValues>('companyvalues'),
      ]);
      setCertifications(certsResult.items);
      setCompanyValues(valuesResult.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'MMMM yyyy');
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/3232e5_4e1f66c26a204458a1593d2ef3b4693d~mv2.png?originWidth=1152&originHeight=640"
            alt="Safety and certifications in industrial work"
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
            <span className="font-paragraph text-primary text-sm uppercase tracking-wider">Our Commitment</span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white mt-4 mb-8 leading-tight sm:leading-none">
              SAFETY &<br />
              <span className="text-primary">CERTIFICATIONS</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              Maintaining the highest standards of safety compliance and quality assurance in every project we undertake
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32">
        <div className="min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-6">
                  OUR <span className="text-primary">VALUES</span>
                </h2>
                <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
                  Built on decades of experience and unwavering commitment to excellence
                </p>
              </motion.div>

              {companyValues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                  {companyValues.map((value, index) => (
                    <motion.div
                      key={value._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-dark-grey/5 border-l-4 border-primary p-8"
                    >
                      {value.valueTitle && (
                        <h3 className="font-heading text-3xl text-foreground mb-4">
                          {value.valueTitle}
                        </h3>
                      )}
                      
                      {value.valueDescription && (
                        <p className="font-paragraph text-base text-foreground/80 mb-6 leading-relaxed">
                          {value.valueDescription}
                        </p>
                      )}

                      <div className="space-y-4">
                        {value.safetyComplianceDetails && (
                          <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <div className="font-paragraph text-sm font-bold text-foreground mb-1">
                                Safety Compliance
                              </div>
                              <div className="font-paragraph text-sm text-foreground/70">
                                {value.safetyComplianceDetails}
                              </div>
                            </div>
                          </div>
                        )}

                        {value.qualityWorkmanship && (
                          <div className="flex items-start gap-3">
                            <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <div className="font-paragraph text-sm font-bold text-foreground mb-1">
                                Quality Workmanship
                              </div>
                              <div className="font-paragraph text-sm text-foreground/70">
                                {value.qualityWorkmanship}
                              </div>
                            </div>
                          </div>
                        )}

                        {value.clientCommunication && (
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <div className="font-paragraph text-sm font-bold text-foreground mb-1">
                                Client Communication
                              </div>
                              <div className="font-paragraph text-sm text-foreground/70">
                                {value.clientCommunication}
                              </div>
                            </div>
                          </div>
                        )}

                        {value.yearsOfExperience && (
                          <div className="mt-6 pt-6 border-t border-dark-grey/20">
                            <div className="font-heading text-4xl text-primary">
                              {value.yearsOfExperience}+
                            </div>
                            <div className="font-paragraph text-sm text-foreground/60 uppercase tracking-wider">
                              Years of Experience
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      {/* Certifications */}
      <section className="w-full bg-secondary py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-6">
              INDUSTRY <span className="text-primary">CERTIFICATIONS</span>
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-3xl mx-auto">
              Certified and compliant with international safety and quality standards
            </p>
          </motion.div>

          {isLoading ? null : certifications.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-white/60">Certification information coming soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 hover:border-primary transition-colors"
                >
                  {cert.logo && (
                    <div className="mb-6 h-24 flex items-center justify-center">
                      <Image
                        src={cert.logo}
                        alt={cert.certificationName || 'Certification logo'}
                        className="max-h-full w-auto object-contain"
                        width={200}
                      />
                    </div>
                  )}

                  {cert.certificationName && (
                    <h3 className="font-heading text-2xl text-white mb-3">
                      {cert.certificationName}
                    </h3>
                  )}

                  {cert.issuingBody && (
                    <div className="font-paragraph text-sm text-white/60 mb-4">
                      Issued by: {cert.issuingBody}
                    </div>
                  )}

                  {cert.description && (
                    <p className="font-paragraph text-sm text-white/70 mb-6 leading-relaxed">
                      {cert.description}
                    </p>
                  )}

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {cert.dateIssued && (
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-primary" />
                        <span className="font-paragraph text-xs text-white/60">
                          Issued: {formatDate(cert.dateIssued)}
                        </span>
                      </div>
                    )}

                    {cert.expirationDate && (
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-primary" />
                        <span className="font-paragraph text-xs text-white/60">
                          Expires: {formatDate(cert.expirationDate)}
                        </span>
                      </div>
                    )}

                    {cert.certificationUrl && (
                      <a
                        href={cert.certificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-paragraph text-xs text-primary hover:text-primary/80 transition-colors mt-2"
                      >
                        View Certificate
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Safety Commitment */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-8 leading-tight">
              SAFETY<br />
              <span className="text-primary">FIRST</span> ALWAYS
            </h2>
            <div className="space-y-6">
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                At Russo NV, safety is not just a priority—it's our foundation. Every project begins and ends with comprehensive safety protocols that protect our team, your facility, and the environment.
              </p>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                Our commitment to safety compliance has earned us industry-leading certifications and the trust of major industrial clients across five countries.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: Shield,
                title: 'VCA Certified',
                desc: 'Safety, Health and Environment Checklist for Contractors',
              },
              {
                icon: Award,
                title: 'NACE Standards',
                desc: 'International corrosion control and coating standards',
              },
              {
                icon: FileCheck,
                title: 'ISO Compliance',
                desc: 'Quality management and environmental standards',
              },
              {
                icon: CheckCircle,
                title: 'Daily Reporting',
                desc: 'Transparent project updates and safety documentation',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-dark-grey/5 p-6 border-l-4 border-primary"
              >
                <item.icon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-xl text-foreground mb-2">{item.title}</h3>
                  <p className="font-paragraph text-sm text-foreground/70">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-foreground py-32">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-5xl md:text-6xl text-white mb-8 leading-tight">
              WORK WITH A<br />
              <span className="text-primary">CERTIFIED</span> PARTNER
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-12">
              Experience the difference of working with a fully certified and safety-compliant industrial coating partner
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
