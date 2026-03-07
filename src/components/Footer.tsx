import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-foreground text-white">
      <div className="max-w-[100rem] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="font-heading text-3xl mb-6">
              RUSSO <span className="text-primary">NV</span>
            </div>
            <p className="font-paragraph text-sm text-white/80 mb-8 leading-relaxed">
              Leading industrial coating and surface preparation company serving Belgium and neighboring countries since 1994. Specialized in heavy industry solutions with strict safety compliance.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-xl mb-6 text-primary">Quick Links</h3>
            <nav className="space-y-3">
              <Link
                to="/"
                className="block font-paragraph text-sm text-white/80 hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="block font-paragraph text-sm text-white/80 hover:text-primary transition-colors"
              >
                Services
              </Link>
              <Link
                to="/industries"
                className="block font-paragraph text-sm text-white/80 hover:text-primary transition-colors"
              >
                Industries Served
              </Link>
              <Link
                to="/projects"
                className="block font-paragraph text-sm text-white/80 hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link
                to="/about"
                className="block font-paragraph text-sm text-white/80 hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-xl mb-6 text-primary">Our Services</h3>
            <nav className="space-y-3">
              <div className="font-paragraph text-sm text-white/80">Industrial Painting</div>
              <div className="font-paragraph text-sm text-white/80">Sandblasting</div>
              <div className="font-paragraph text-sm text-white/80">Fireproofing Coatings</div>
              <div className="font-paragraph text-sm text-white/80">Protective Coatings</div>
              <div className="font-paragraph text-sm text-white/80">Surface Preparation</div>
              <div className="font-paragraph text-sm text-white/80">Coat Removal</div>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-xl mb-6 text-primary">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div className="font-paragraph text-sm text-white/80">
                  Antwerp, Belgium<br />
                  Serving BE, NL, FR, DE, LU
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+3234567890"
                  className="font-paragraph text-sm text-white/80 hover:text-primary transition-colors"
                >
                  +32 3 456 78 90
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@russonv.be"
                  className="font-paragraph text-sm text-white/80 hover:text-primary transition-colors"
                >
                  info@russonv.be
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <h4 className="font-heading text-lg mb-6 text-center">Certified & Compliant</h4>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider border border-white/20 px-6 py-3">
              VCA Certified
            </div>
            <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider border border-white/20 px-6 py-3">
              NACE Certified
            </div>
            <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider border border-white/20 px-6 py-3">
              ISO Certified
            </div>
            <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider border border-white/20 px-6 py-3">
              Safety Compliant
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-white/60">
              © {new Date().getFullYear()} Russo NV. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="font-paragraph text-sm text-white/60 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="font-paragraph text-sm text-white/60 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
