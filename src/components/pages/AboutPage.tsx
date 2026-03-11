import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Target, Zap, Globe, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/3232e5_5b13ff3f27794050a136372ba7d7e289~mv2.png?originWidth=1152&originHeight=640"
            alt="Russo NV industrial coating company"
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
            <span className="font-paragraph text-primary text-sm uppercase tracking-wider">Since 1994</span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-white mt-4 mb-8 leading-none">
              ABOUT<br />
              <span className="text-primary">RUSSO NV</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              Three decades of industrial coating excellence, serving major industries across Belgium and neighboring countries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-[600px]">
              <Image
                src="https://static.wixstatic.com/media/3232e5_023a500fd54f44c4a9f17d757eb2abdb~mv2.png?originWidth=768&originHeight=576"
                alt="Russo NV team at work"
                className="w-full h-full object-cover"
                width={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="border-l-4 border-primary pl-4 sm:pl-8">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                30 YEARS OF<br />
                <span className="text-primary">EXCELLENCE</span>
              </h2>
            </div>

            <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed">
              Founded in 1994 in Antwerp, Belgium, Russo NV has grown from a local coating specialist to an international leader in industrial surface preparation and protective coatings.
            </p>

            <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed">
              Our expertise spans industrial painting, sandblasting, coat removal, fireproofing coatings, and protective coatings for heavy industry. We serve clients across Belgium, the Netherlands, France, Germany, and Luxembourg.
            </p>

            <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed">
              What sets us apart is our unwavering commitment to safety compliance, quality workmanship, fast project turnaround, and transparent communication. Every client receives daily project updates through dedicated site managers, ensuring complete visibility throughout the project lifecycle.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <div className="font-heading text-5xl text-primary mb-2">30+</div>
                <div className="font-paragraph text-sm text-foreground/70 uppercase tracking-wider">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="font-heading text-5xl text-primary mb-2">5</div>
                <div className="font-paragraph text-sm text-foreground/70 uppercase tracking-wider">
                  Countries Served
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="w-full bg-dark-grey py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl text-white mb-6">
              OUR <span className="text-primary">MISSION</span>
            </h2>
            <p className="font-paragraph text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              To deliver world-class industrial coating solutions that protect assets, ensure safety, and exceed client expectations through technical expertise, certified quality, and transparent communication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
            {[
              {
                icon: Users,
                title: 'Expert Team',
                desc: 'Highly trained professionals with decades of combined experience in industrial coatings',
              },
              {
                icon: Target,
                title: 'Quality Focus',
                desc: 'Uncompromising standards in every project, backed by international certifications',
              },
              {
                icon: Zap,
                title: 'Fast Execution',
                desc: 'Efficient project management and execution without sacrificing quality or safety',
              },
              {
                icon: Globe,
                title: 'International Reach',
                desc: 'Serving major industrial clients across five European countries',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 hover:border-primary transition-colors"
              >
                <value.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="font-heading text-2xl text-white mb-4">{value.title}</h3>
                <p className="font-paragraph text-sm text-white/70 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-6">
            OUR <span className="text-primary">EXPERTISE</span>
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
            Specialized capabilities across all aspects of industrial coating and surface preparation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Tank Coatings',
              desc: 'Complete coating solutions for storage tanks, including interior and exterior applications',
            },
            {
              title: 'Pipeline Protection',
              desc: 'Specialized coatings for industrial pipelines and distribution systems',
            },
            {
              title: 'Steel Structures',
              desc: 'Comprehensive surface preparation and coating for structural steel',
            },
            {
              title: 'Sandblasting',
              desc: 'Professional abrasive blasting for optimal surface preparation',
            },
            {
              title: 'Fireproofing',
              desc: 'Fire-resistant coatings for industrial safety compliance',
            },
            {
              title: 'Protective Coatings',
              desc: 'Long-lasting protection against corrosion, chemicals, and environmental factors',
            },
          ].map((expertise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-grey/5 border-l-4 border-primary p-8"
            >
              <h3 className="font-heading text-2xl text-foreground mb-4">{expertise.title}</h3>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                {expertise.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Client Types */}
      <section className="w-full bg-secondary py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl text-white mb-6">
              WHO WE <span className="text-primary">SERVE</span>
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-3xl mx-auto">
              Trusted by leading companies across multiple industrial sectors
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              'Chemical Plants',
              'Food Production',
              'Storage Terminals',
              'Tank Farms',
              'Industrial Factories',
              'Warehouses',
              'Pipeline Companies',
              'Construction Firms',
              'Manufacturing',
              'Petrochemical',
              'Logistics Centers',
              'Processing Plants',
            ].map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 p-6 text-center hover:border-primary transition-colors"
              >
                <div className="font-paragraph text-sm text-white/80">{client}</div>
              </motion.div>
            ))}
          </div>
        </div>
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
              PARTNER WITH<br />
              <span className="text-primary">EXPERIENCE</span>
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-12">
              Let our 30 years of expertise work for your next industrial coating project
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact">
                <button className="bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors inline-flex items-center gap-3 group">
                  Request Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/projects">
                <button className="bg-transparent text-white border-2 border-white font-paragraph font-bold uppercase px-8 py-4 hover:bg-white hover:text-secondary transition-colors">
                  View Projects
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
