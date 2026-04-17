import { Mail, Phone } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function MaintenancePage() {
  return (
    <main className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full flex flex-col items-center text-center">
        <Image
          src="https://static.wixstatic.com/media/3232e5_ac4fc036c36a4c538c8683ecd49f6ff8~mv2.png"
          alt="RUSSO N.V. Logo"
          width={200}
          height={200}
          className="h-32 sm:h-44 w-auto object-contain mb-10"
        />

        <div className="h-[1px] w-16 bg-primary mb-8" />

        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-foreground uppercase tracking-[0.04em] mb-6">
          Website Under Construction
        </h1>

        <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-12">
          We're updating our website. We'll be back soon.
        </p>

        <div className="w-full border-t border-dark-grey/20 pt-10">
          <p className="font-paragraph text-xs font-bold tracking-[0.2em] text-primary uppercase mb-6">
            Contact
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href="tel:+32475434819"
              className="flex items-center gap-3 bg-primary text-primary-foreground font-paragraph font-bold uppercase px-6 py-3 hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+32 475 43 48 19</span>
            </a>

            <a
              href="mailto:info@russonv.be"
              className="flex items-center gap-3 border border-dark-grey/30 text-foreground font-paragraph font-bold uppercase px-6 py-3 hover:border-primary hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>info@russonv.be</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
