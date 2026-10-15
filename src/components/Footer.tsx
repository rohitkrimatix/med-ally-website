import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Facebook, Youtube, Instagram, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  // Site navigation plus parent-company policy/contact resources.
  const quickLinks = [
    { name: 'About Us', path: '/about-us', isExternal: false },
    { name: 'How It Works', path: '/how-it-works', isExternal: false },
    { name: 'Features', path: '/features', isExternal: false },
    { name: 'Clinical Workflow Software', path: '/clinical-workflow-software', isExternal: false },
    { name: 'AI Clinical Decision Support', path: '/ai-clinical-decision-support', isExternal: false },
    { name: 'AI Clinical Documentation', path: '/clinical-documentation-ai', isExternal: false },
    { name: 'AI Medical Coding', path: '/ai-medical-coding', isExternal: false },
    { name: 'AI Medical Scribe', path: '/ai-medical-scribe', isExternal: false },
    { name: 'Best AI Medical Scribes', path: '/resources/best-ai-medical-scribes', isExternal: false },
    { name: 'Benefits', path: '/benefits', isExternal: false },
    { name: 'ROI Calculator', path: '/roi-calculator', isExternal: false },
    { name: 'FAQ', path: '/faq', isExternal: false },
    { name: 'Pricing', path: '/pricing', isExternal: false },
    { name: 'Calonji Website', path: 'https://www.calonji.com/', isExternal: true },
    { name: 'Blog', path: 'https://www.calonji.com/blog', isExternal: true },
    { name: 'MedAlly App', path: 'https://app.medally.ai/', isExternal: true },
    { name: 'Contact Us', path: 'https://www.calonji.com/contact', isExternal: true },
    { name: 'Privacy Policy', path: 'https://www.calonji.com/privacy-policy', isExternal: true },
    { name: 'Terms of Service', path: 'https://www.calonji.com/terms-of-service', isExternal: true },
  ];

  const socialLinks = [
    { Icon: Linkedin, href: 'https://www.linkedin.com/company/medally-ai', label: 'LinkedIn' },
    { Icon: Twitter, href: 'https://twitter.com/medAllyAI', label: 'X (Twitter)' },
    {
      Icon: Facebook,
      href: 'https://www.facebook.com/profile.php?id=491843437354106',
      label: 'Facebook',
    },
    { Icon: Instagram, href: 'https://www.instagram.com/medally_saas', label: 'Instagram' },
    { Icon: Youtube, href: 'https://www.youtube.com/@Medally.global', label: 'YouTube' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background pb-8 pt-16 text-muted-foreground transition-colors duration-300">
      {/* Dynamic atmospheric back-glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(54,183,181,0.08),transparent_34rem),radial-gradient(circle_at_82%_20%,rgba(166,244,225,0.04),transparent_30rem)] dark:bg-[radial-gradient(circle_at_18%_0%,rgba(54,183,181,0.16),transparent_34rem),radial-gradient(circle_at_82%_20%,rgba(166,244,225,0.08),transparent_30rem)] pointer-events-none" />
      
      {/* Adaptive line grid pattern */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(hsla(var(--foreground) / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsla(var(--foreground) / 0.04) 1px, transparent 1px)`,
          backgroundSize: '72px 72px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-[1.15fr_1.1fr_0.9fr]">
          {/* About MedAlly */}
          <motion.div {...fadeInUp} className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-600 dark:text-teal-400/80">Clinical AI platform</p>
            <h3 className="text-2xl font-bold text-foreground">MedAlly</h3>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              MedAlly helps physicians and practice leaders connect AI clinical documentation,
              decision support, follow-up, and medical coding context in one reviewable workflow.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
              <ShieldCheck className="h-4 w-4" />
              HIPAA-aware physician review workflows
            </div>
          </motion.div>

          {/* Quick Links - Enhanced with all navigation links */}
          <motion.div {...fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link) => (
                <div key={link.name} className="flex items-center">
                  {link.isExternal ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-muted-foreground transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      {link.name}
                      <ExternalLink className="ml-1 w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Parent Company */}
          <motion.div {...fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Parent Company – Calonji</h3>
            <p className="text-sm leading-7 text-muted-foreground">
              MedAlly is a product of Calonji, Inc. a company committed to building innovative,
              human-centered solutions that leverage AI and technology to solve real-world
              challenges in healthcare and beyond.
            </p>
          </motion.div>
        </div>

        {/* Full-width Waitlist Button */}
        <motion.div {...fadeInUp} className="border-t border-border py-8">
          <a 
            href="https://app.medally.ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block w-full rounded-2xl border border-border bg-muted/20 py-6 text-lg font-semibold text-foreground shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500/30 hover:bg-black"
          >
            <span className="flex items-center justify-center">
              Join the Future of Healthcare
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform text-teal-500" />
            </span>
          </a>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          {...fadeInUp}
          className="flex justify-center space-x-6 border-t border-border py-8"
        >
          {socialLinks.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground/60 transition-colors hover:text-teal-600 dark:hover:text-teal-400"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          {...fadeInUp}
          className="border-t border-border pt-4 text-center text-sm text-muted-foreground/50"
        >
          © {new Date().getFullYear()} MedAlly. All Rights Reserved. A Calonji Company.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
