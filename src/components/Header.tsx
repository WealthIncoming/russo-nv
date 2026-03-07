import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/industries', label: 'Industries' },
    { path: '/projects', label: 'Projects' },
    { path: '/safety', label: 'Safety & Certifications' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const languages = ['EN', 'NL', 'FR'];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-white border-b border-dark-grey/20 sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <Image
              src="https://static.wixstatic.com/media/3232e5_a9937279cd4a45fea82cb09da4986d7b~mv2.png"
              alt="RUSSO N.V. Company Logo"
              width={120}
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-sm uppercase tracking-wider transition-colors relative ${
                  isActive(link.path)
                    ? 'text-primary font-bold'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Language Selector */}
            <div className="flex items-center gap-2 border border-dark-grey/20 px-4 py-2">
              <Globe className="w-4 h-4 text-foreground" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="font-paragraph text-sm bg-transparent border-none outline-none cursor-pointer text-foreground"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone CTA */}
            <a
              href="tel:+3234567890"
              className="flex items-center gap-3 bg-primary text-primary-foreground font-paragraph font-bold uppercase px-6 py-3 hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-dark-grey/20"
          >
            <nav className="px-8 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-paragraph text-sm uppercase tracking-wider py-2 ${
                    isActive(link.path)
                      ? 'text-primary font-bold border-l-4 border-primary pl-4'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 space-y-4">
                {/* Language Selector Mobile */}
                <div className="flex items-center gap-2 border border-dark-grey/20 px-4 py-3">
                  <Globe className="w-4 h-4 text-foreground" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="font-paragraph text-sm bg-transparent border-none outline-none cursor-pointer text-foreground flex-1"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phone CTA Mobile */}
                <a
                  href="tel:+3234567890"
                  className="flex items-center justify-center gap-3 bg-primary text-primary-foreground font-paragraph font-bold uppercase px-6 py-3 hover:bg-primary/90 transition-colors w-full"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
