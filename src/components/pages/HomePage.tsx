// HPI 1.7-V
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle, Clock, Shield, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// --- Canonical Data Sources ---
const SERVICES_DATA = [
  {
    id: '01',
    titleKey: 'sandblastingTitle',
    descKey: 'sandblastingDesc',
    detailsKeys: ['surfaceProfileCreation', 'rustScaleRemoval', 'contaminantElimination']
  },
  {
    id: '02',
    titleKey: 'fireproofingTitle',
    descKey: 'fireproofingDesc',
    detailsKeys: ['passiveFireProtection', 'hydrocarbonFireDefense', 'thermalInsulation']
  },
  {
    id: '03',
    titleKey: 'protectiveCoatingsTitle',
    descKey: 'protectiveCoatingsDesc',
    detailsKeys: ['antiCorrosionSystems', 'chemicalResistance', 'uvProtection']
  },
  {
    id: '04',
    titleKey: 'industrialPaintingTitle',
    descKey: 'industrialPaintingDesc',
    detailsKeys: ['airlessSpraying', 'colorCodingSystems', 'maintenancePainting']
  }
];

const INDUSTRIES_DATA = [
  { titleKey: 'chemicalPlants', descKey: 'chemicalPlantsDesc' },
  { titleKey: 'foodProduction', descKey: 'foodProductionDesc' },
  { titleKey: 'storageTerminals', descKey: 'storageTerminalsDesc' },
  { titleKey: 'industrialConstruction', descKey: 'industrialConstructionDesc' },
  { titleKey: 'warehouses', descKey: 'warehousesDesc' },
  { titleKey: 'manufacturing', descKey: 'manufacturingDesc' },
];

const STATS_DATA = [
  { valueKey: '30+', labelKey: 'statsYearsExperience', subKey: 'statsSince' },
  { valueKey: '05', labelKey: 'statsCountriesServed', subKey: 'statsEuRegion' },
  { valueKey: '100%', labelKey: 'statsSafetyCertified', subKey: 'statsVcaIso' },
  { valueKey: '24/7', labelKey: 'Project Updates', subKey: 'Real-time Data' },
];

const CERTIFICATIONS = [
  'VCA-P PETROCHEMICAL',
  'NACE CERTIFIED',
  'SSPC STANDARDS',
  'FROSIO INSPECTORS',
  'APAC CERTIFICATION',
  'CERTIFIED SAFETY ADVISOR'
];

// --- Components ---

const SectionLabel = ({ text, align = 'left' }: { text: string, align?: 'left' | 'right' | 'center' }) => (
  <div className={`flex items-center gap-3 mb-6 ${align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start'}`}>
    <span className="w-2 h-2 bg-primary rounded-none" />
    <span className="font-paragraph text-xs font-bold tracking-[0.2em] text-primary uppercase">{text}</span>
    <span className="h-[1px] w-12 bg-primary/30" />
  </div>
);

const ParallaxText = ({ children, baseVelocity = 100 }: { children: string; baseVelocity: number }) => {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(scrollY, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 5], { clamp: false });
  const [x, setX] = useState(0);
  const xRef = useRef(0);

  // Loop logic
  const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  useEffect(() => {
    let lastTime = performance.now();
    let animationFrameId: number;

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000; // seconds
      lastTime = time;

      let moveBy = baseVelocity * delta;
      // Apply velocity from scroll
      const velocity = velocityFactor.get();
      if (velocity !== 0) {
        moveBy += velocity * moveBy;
      }

      xRef.current += moveBy;
      setX(wrap(-20, -45, xRef.current)); // Wrap between -20% and -45% to create seamless loop effect
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [baseVelocity, velocityFactor]);

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="font-heading font-black text-[12vw] leading-[0.8] text-white/5 uppercase flex whitespace-nowrap" style={{ x: `${x}%` }}>
        <span className="mr-12">{children}</span>
        <span className="mr-12">{children}</span>
        <span className="mr-12">{children}</span>
        <span className="mr-12">{children}</span>
      </motion.div>
    </div>
  );
};

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax for Hero
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  const { t } = useLanguageStore();

  return (
    <div ref={containerRef} className="bg-black min-h-screen text-white selection:bg-primary selection:text-white overflow-clip">
      <style>{`
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        .clip-diagonal-reverse {
          clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
        }
        .grid-bg {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}</style>
      <Header />
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Background Parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/3232e5_51222d38774747a49bdf5faf7d72b00a~mv2.png?originWidth=1920&originHeight=1024"
            alt="Industrial coating facility"
            className="w-full h-full object-cover opacity-60"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-20"
        >
          <div className="md:border-l md:border-white/20 md:pl-12 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4"
            >
              <span className="font-paragraph text-primary font-bold tracking-widest text-sm uppercase">EST. 1984</span>
              <span className="h-[1px] w-16 bg-white/20" />
              <span className="font-paragraph text-white/60 text-sm uppercase tracking-widest">Antwerpen, België</span>
            </motion.div>

            <div className="max-w-[min(100%,900px)]">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.85] font-black text-white uppercase tracking-tighter text-center md:text-left">
                <motion.span
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                  className="block"
                >
                  Industriële
                </motion.span>
                <motion.span
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50"
                >
                  Coating
                </motion.span>
                <motion.span
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                  className="block text-primary"
                >SPECIALISTEN</motion.span>
              </h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-8 md:pl-12 max-w-4xl w-full"
          >
            <div className="flex-1 min-w-0 text-center md:text-left">
              <p className="font-paragraph text-white/70 text-lg leading-relaxed max-w-xl">
                {t('home', 'heroSubtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 justify-center md:justify-start">
              <Link to="/contact" className="group relative overflow-hidden bg-primary px-8 py-4 flex items-center gap-3 whitespace-nowrap">
                <span className="relative z-10 font-paragraph font-bold uppercase text-white text-sm tracking-wider">{t('home', 'heroCtaMain')}</span>
                <ArrowRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out mix-blend-overlay" />
              </Link>
              <Link to="/projects" className="group px-8 py-4 border border-white/30 hover:border-white transition-colors flex items-center gap-3 whitespace-nowrap">
                <span className="font-paragraph font-bold uppercase text-white text-sm tracking-wider">{t('home', 'heroCtaSecondary')}</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-paragraph text-[10px] uppercase tracking-[0.3em] text-white/40">{t('home', 'scroll')}</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>
      {/* --- MARQUEE --- */}
      <div className="w-full bg-primary py-4 overflow-hidden border-y border-white/10 relative z-20">
        <div className="flex items-center whitespace-nowrap animate-marquee-mobile md:animate-marquee-desktop">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-6">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={`${i}-${idx}`} className="flex items-center gap-4">
                  <span className="font-heading font-bold text-black text-lg sm:text-xl md:text-2xl uppercase tracking-tight">{cert}</span>
                  <div className="w-2 h-2 bg-black rotate-45" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-mobile {
            animation: marquee 18s linear infinite;
          }
          @media (min-width: 768px) {
            .animate-marquee-desktop {
              animation: marquee 30s linear infinite;
            }
          }
        `}</style>
      </div>
      {/* --- INTRO / STATS --- */}
      <section className="relative w-full max-w-[120rem] mx-auto px-6 md:px-12 py-20 md:py-24 xl:py-32 bg-dark-grey overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] 2xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] gap-10 xl:gap-12 2xl:gap-16 items-start">

          {/* Left Column */}
          <div className="relative min-w-0 w-full z-20">
            <SectionLabel text={t('home', 'companyProfile')} />

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl xl:text-[3.2rem] 2xl:text-[3.9rem] text-white leading-[0.9] tracking-tight mb-8 max-w-[9ch]">
              <span className="block text-4xl">{t('home', 'engineeringDurability')}</span>
              <span className="block text-white/30 text-4xl">{t('home', 'durability')}</span>
              <span className="block text-4xl">{t('home', 'since1994')}</span>
            </h2>

            <p className="font-paragraph text-white/60 text-base md:text-lg leading-relaxed mb-10 md:mb-12 max-w-[56ch]">
              {t('home', 'companyDescription')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-2xl">
              {STATS_DATA.map((stat, index) => (
                <div key={index} className="border-t border-white/10 pt-4 min-w-0">
                  <div className="font-heading text-3xl md:text-4xl text-primary mb-1">
                    {stat.valueKey}
                  </div>
                  <div className="font-paragraph text-white font-bold text-sm uppercase break-words">
                    {t('home', stat.labelKey)}
                  </div>
                  <div className="font-paragraph text-white/40 text-xs mt-1 break-words">
                    {t('home', stat.subKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative min-w-0 w-full z-10">
            <div className="relative w-full h-[420px] md:h-[520px] xl:h-[560px] 2xl:h-[600px] overflow-hidden group rounded-none">
              <div className="absolute inset-0 border border-white/10 z-10 pointer-events-none" />
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary z-20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary z-20" />

              <Image
                src="https://static.wixstatic.com/media/3232e5_ccacd4497b0147e8a64b40b832b79772~mv2.png?originWidth=1152&originHeight=576"
                alt="Industrial worker sandblasting"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                width={1200}
              />

              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20 bg-black/80 backdrop-blur-md p-4 md:p-6 border-l-2 border-primary max-w-[85%] sm:max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-heading text-white text-lg">{t('home', 'safetyFirstTitle')}</span>
                </div>
                <p className="font-paragraph text-white/70 text-xs leading-relaxed">
                  {t('home', 'safetyFirstDesc')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* --- STICKY SERVICES --- */}
      <section className="relative w-full bg-black py-32 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] 2xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-12 xl:gap-14 2xl:gap-16 items-start">

            {/* Sticky Header */}
            <div className="relative min-w-0 w-full z-20">
              <div className="xl:sticky xl:top-32 w-full max-w-full xl:max-w-[30rem] 2xl:max-w-[34rem]">
                <SectionLabel text={t('home', 'ourExpertise')} />

                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[clamp(3.8rem,5vw,5.6rem)] 2xl:text-[clamp(4.5rem,5vw,6.2rem)] leading-[0.92] tracking-tight text-white mb-8 max-w-full">
                  <span className="block whitespace-nowrap text-5xl">{t('home', 'coreServices').split(' ')[0]}</span>
                  <span className="block text-primary whitespace-nowrap">{t('home', 'coreServices').split(' ')[1]}</span>
                </h2>

                <p className="font-paragraph text-white/60 text-base md:text-lg leading-relaxed mb-12 max-w-[32rem]">
                  {t('home', 'coreServicesDesc')}
                </p>

                <Link to="/services">
                  <button className="group flex items-center gap-4 text-white hover:text-primary transition-colors max-w-full">
                    <div className="w-12 h-12 border border-current flex items-center justify-center rounded-full group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all shrink-0">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <span className="font-paragraph font-bold uppercase tracking-wider text-sm">
                      {t('home', 'viewAllServices')}
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Scrollable Cards */}
            <div className="relative min-w-0 w-full z-10 flex flex-col gap-8">
              {SERVICES_DATA.map((service, index) => (
                <StickyServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* --- PARALLAX INDUSTRIES --- */}
      <section className="relative w-full py-40 overflow-hidden bg-dark-grey clip-diagonal">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <ParallaxText baseVelocity={-2}>{t('home', 'industriesServed')}</ParallaxText>
          <ParallaxText baseVelocity={2}>{t('home', 'globalReach')}</ParallaxText>
        </div>

        <div className="relative z-10 max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <SectionLabel text={t('home', 'sectors')} align="center" />
            <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
              BUILT FOR <span className="text-primary">HEAVY INDUSTRY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {INDUSTRIES_DATA.map((industry, index) => (
              <IndustryCard key={index} industry={industry} index={index} />
            ))}
          </div>
        </div>
      </section>
      {/* --- FEATURED PROJECT --- */}
      <section className="relative w-full py-24 md:py-32 bg-black">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] xl:grid-cols-[0.78fr_1.22fr] 2xl:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left Column: Image */}
            <div className="relative w-full min-w-0 aspect-video lg:aspect-[4/3] overflow-hidden border border-white/10">
              <Image
                src="https://static.wixstatic.com/media/3232e5_227722fce6c544bfa11ad9bde5ff07a5~mv2.png?originWidth=1920&originHeight=1024"
                alt="Large scale tank farm project"
                className="w-full h-full object-cover"
                width={1920}
              />
            </div>

            {/* Right Column: Text Content */}
            <div className="flex flex-col justify-center min-w-0">
              <SectionLabel text={t('home', 'featuredProject')} />
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[2.9rem] xl:text-[3.5rem] 2xl:text-[4.1rem] text-white leading-[0.9] tracking-tight mb-8 w-full min-w-0">
                <span className="block text-5xl">{t('home', 'totalTankFarm')}</span>
                <span className="block text-primary tracking-[-0.02em] text-5xl">
                  {t('home', 'refurbishment')}
                </span>
              </h2>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6 mb-8 min-w-0">
                <span className="font-paragraph text-primary font-bold text-lg md:text-xl">
                  {t('home', 'antwerpPort')}
                </span>
                <span className="font-paragraph text-white/40 text-sm uppercase tracking-[0.12em]">
                  {t('home', 'duration18Months')}
                </span>
              </div>

              <p className="font-paragraph text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-[60ch]">
                {t('home', 'projectDescription')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 min-w-0">
                <div className="border-t border-white/10 pt-4 min-w-0">
                  <h4 className="font-paragraph text-white/60 text-xs uppercase tracking-widest mb-2">
                    {t('home', 'scope')}
                  </h4>
                  <p className="font-paragraph text-white text-sm leading-relaxed">
                    {t('home', 'scopeDesc')}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 min-w-0">
                  <h4 className="font-paragraph text-white/60 text-xs uppercase tracking-widest mb-2">
                    {t('home', 'challenge')}
                  </h4>
                  <p className="font-paragraph text-white text-sm leading-relaxed">
                    {t('home', 'challengeDesc')}
                  </p>
                </div>
              </div>

              <Link to="/projects">
                <button className="group relative overflow-hidden bg-primary px-8 py-4 flex items-center gap-3 whitespace-nowrap w-fit">
                  <span className="relative z-10 font-paragraph font-bold uppercase text-white text-sm tracking-wider">
                    {t('home', 'viewCaseStudy')}
                  </span>
                  <ArrowRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out mix-blend-overlay" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* --- CTA SECTION --- */}
      <section className="relative w-full bg-primary py-32 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 mix-blend-multiply" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-black/10 skew-x-12 transform origin-top" />

        <div className="relative z-10 max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-8 leading-[0.9]">
              {t('home', 'readyToMobilize')} <br/>
              <span className="text-black">?</span>
            </h2>
            <p className="font-paragraph text-white/90 text-xl max-w-2xl mx-auto mb-12 font-medium">
              {t('home', 'ctaDescription')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact">
                <button className="bg-black text-white font-paragraph font-bold uppercase px-10 py-5 hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3 shadow-xl">
                  {t('home', 'requestQuote')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="bg-transparent border-2 border-black text-black font-paragraph font-bold uppercase px-10 py-5 hover:bg-black hover:text-white transition-all duration-300">
                  {t('home', 'callUsNow')}
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

// --- Sub-Components ---

function StickyServiceCard({ service, index }: { service: typeof SERVICES_DATA[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const { t } = useLanguageStore();

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x }}
      className="group relative bg-dark-grey border border-white/10 p-8 md:p-12 hover:border-primary transition-colors duration-500"
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 font-heading text-6xl text-white group-hover:opacity-10 transition-opacity">
        {service.id}
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <h3 className="font-heading text-3xl md:text-4xl text-white mb-4 group-hover:text-primary transition-colors">
            {t('home', service.titleKey)}
          </h3>
          <p className="font-paragraph text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            {t('home', service.descKey)}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.detailsKeys.map((detailKey, i) => (
              <li key={i} className="flex items-center gap-2 font-paragraph text-xs text-white/80 uppercase tracking-wide">
                <div className="w-1 h-1 bg-primary" />
                {t('home', detailKey)}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-48 h-32 bg-black/20 border border-white/5 relative overflow-hidden">
           {/* Placeholder for service specific imagery - using generic for now but styled */}
           <Image
             src="https://static.wixstatic.com/media/3232e5_1f2a1a565833417a9c5c5ea40e20a310~mv2.png?originWidth=384&originHeight=320"
             alt={t('home', service.titleKey)}
             className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
             width={400}
           />
        </div>
      </div>
    </motion.div>
  );
}

function IndustryCard({ industry, index }: { industry: typeof INDUSTRIES_DATA[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguageStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-black p-10 h-80 flex flex-col justify-between group overflow-hidden"
    >
      {/* Hover Background */}
      <div className={`absolute inset-0 bg-primary transition-transform duration-500 origin-bottom ${isHovered ? 'scale-y-100' : 'scale-y-0'}`} />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 border ${isHovered ? 'border-black text-black' : 'border-white/20 text-primary'} transition-colors`}>
            {index === 0 ? <Shield className="w-6 h-6" /> :
             index === 1 ? <CheckCircle className="w-6 h-6" /> :
             index === 2 ? <Clock className="w-6 h-6" /> :
             <Users className="w-6 h-6" />}
          </div>
          <span className={`font-paragraph text-xs font-bold ${isHovered ? 'text-black' : 'text-white/30'}`}>0{index + 1}</span>
        </div>

        <h3 className={`font-heading text-2xl mb-2 ${isHovered ? 'text-black' : 'text-white'}`}>
          {t('home', industry.titleKey)}
        </h3>
        <p className={`font-paragraph text-sm ${isHovered ? 'text-black/80' : 'text-white/50'}`}>
          {t('home', industry.descKey)}
        </p>
      </div>

      <div className="relative z-10 flex justify-end">
        <div className={`w-10 h-10 flex items-center justify-center border ${isHovered ? 'border-black text-black rotate-45' : 'border-white/20 text-white'} transition-all duration-300`}>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}
