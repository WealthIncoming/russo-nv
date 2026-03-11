import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { ProjectPortfolio } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectPortfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await BaseCrudService.getAll<ProjectPortfolio>('projectportfolio');
      setProjects(result.items);
    } catch (error) {
      console.error('Error loading projects:', error);
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
            src="https://static.wixstatic.com/media/3232e5_2db4503607404e1eb913f55386b981bc~mv2.png?originWidth=1152&originHeight=640"
            alt="Industrial project portfolio"
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
            <span className="font-paragraph text-primary text-sm uppercase tracking-wider">Our Work</span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white mt-4 mb-8 leading-none">
              PROJECT<br />
              <span className="text-primary">PORTFOLIO</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              Showcasing our expertise in large-scale industrial coating projects across multiple sectors and countries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32">
        <div className="min-h-[400px]">
          {isLoading ? null : projects.length === 0 ? (
            <div className="text-center py-32">
              <p className="font-paragraph text-lg text-foreground/60">No projects available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-24">
              {projects.map((project, index) => (
                <motion.article
                  key={project._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group"
                >
                  {/* Project Images */}
                  <div className={`grid grid-cols-1 ${project.secondaryProjectImage ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-6 mb-8`}>
                    <div className={project.secondaryProjectImage ? 'lg:col-span-2' : ''}>
                      <div className="relative h-[500px] overflow-hidden">
                        <Image
                          src={project.mainProjectImage || 'https://static.wixstatic.com/media/3232e5_f5459a9114494b2681b5a99bcb24a698~mv2.png?originWidth=1152&originHeight=448'}
                          alt={project.projectTitle || 'Industrial project'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          width={1200}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    </div>

                    {project.secondaryProjectImage && (
                      <div className="relative h-[500px] overflow-hidden">
                        <Image
                          src={project.secondaryProjectImage}
                          alt={`${project.projectTitle} - additional view` || 'Industrial project detail'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          width={600}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                      <div className="border-l-4 border-primary pl-8 mb-6">
                        <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                          {project.projectTitle}
                        </h2>
                      </div>

                      <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-8">
                        {project.projectDescription}
                      </p>
                    </div>

                    <div className="lg:col-span-4">
                      <div className="bg-dark-grey/5 border-l-4 border-primary p-8 space-y-6">
                        <div>
                          <h3 className="font-heading text-xl text-foreground mb-4">Project Details</h3>
                        </div>

                        {project.clientName && (
                          <div>
                            <div className="font-paragraph text-sm text-foreground/60 uppercase tracking-wider mb-2">
                              Client
                            </div>
                            <div className="font-paragraph text-base text-foreground font-bold">
                              {project.clientName}
                            </div>
                          </div>
                        )}

                        {project.projectLocation && (
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <div className="font-paragraph text-sm text-foreground/60 uppercase tracking-wider mb-2">
                                Location
                              </div>
                              <div className="font-paragraph text-base text-foreground">
                                {project.projectLocation}
                              </div>
                            </div>
                          </div>
                        )}

                        {project.completionDate && (
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <div className="font-paragraph text-sm text-foreground/60 uppercase tracking-wider mb-2">
                                Completed
                              </div>
                              <div className="font-paragraph text-base text-foreground">
                                {formatDate(project.completionDate)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {index < projects.length - 1 && (
                    <div className="mt-24 border-b border-dark-grey/20" />
                  )}
                </motion.article>
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
            <h2 className="font-heading text-5xl md:text-6xl text-white mb-8 leading-tight">
              START YOUR<br />
              <span className="text-primary">NEXT PROJECT</span>
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-12">
              Let us bring the same level of expertise and quality to your industrial coating needs
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
