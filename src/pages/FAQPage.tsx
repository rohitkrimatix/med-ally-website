import { type FC, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Search,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Layers,
  FileText,
  Activity,
  CheckCircle2,
  CreditCard,
  Building2,
  X,
  Play,
  Pause
} from 'lucide-react';
import Layout from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { MotionReveal } from '@/components/MotionReveal';

import rawFaqCategories from '@/data/faqData.json';
import { getFaqAnswerText, type FaqItem, type FaqCategoryData } from '@/data/faqUtils';

interface FaqCategory {
  id: string;
  title: string;
  description: string;
  icon: typeof HelpCircle;
  faqs: FaqItem[];
}

const iconMap: Record<string, typeof HelpCircle> = {
  Layers,
  FileText,
  Activity,
  CheckCircle2,
  CreditCard,
  Building2,
};

const faqCategories: FaqCategory[] = (rawFaqCategories as FaqCategoryData[]).map((cat) => ({
  ...cat,
  icon: iconMap[cat.icon] || HelpCircle,
}));

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.medally.ai/faq#webpage',
      url: 'https://www.medally.ai/faq',
      name: 'MedAlly FAQ | Clinical AI, Scribe, Pricing & Workflow',
      description:
        'Get answers about MedAlly clinical AI, AI medical scribe, SOAP notes, ICD-10/CPT coding, physician review, workflow, pricing, and free encounters.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.medally.ai/#website',
        name: 'MedAlly',
        url: 'https://www.medally.ai',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.medally.ai/faq#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.medally.ai/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'FAQ',
          item: 'https://www.medally.ai/faq',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.medally.ai/faq#faq',
      mainEntity: faqCategories.flatMap((category) =>
        category.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: getFaqAnswerText(faq),
          },
        }))
      ),
    },
  ],
};

const FAQPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(faqCategories[0].id);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'what-is-medally': true,
    'does-medally-include-scribe': true,
    'decision-support-or-differential': true,
    'clinical-decisions': true,
    'plans-available': true,
    'where-to-start-evaluating-myself': true
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (const cat of faqCategories) {
        const el = document.getElementById(cat.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqCategories;
    }
    const q = searchQuery.toLowerCase().trim();
    return faqCategories
      .map((cat) => {
        const matchingFaqs = cat.faqs.filter(
          (faq) =>
            faq.q.toLowerCase().includes(q) ||
            faq.a.some((ans) => ans.toLowerCase().includes(q))
        );
        return {
          ...cat,
          faqs: matchingFaqs
        };
      })
      .filter((cat) => cat.faqs.length > 0);
  }, [searchQuery]);

  const totalQuestionsCount = useMemo(() => {
    return faqCategories.reduce((acc, cat) => acc + cat.faqs.length, 0);
  }, []);

  const matchingQuestionsCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.faqs.length, 0);
  }, [filteredCategories]);

  return (
    <Layout className="medally-dark-page">
      <SEO
        title="MedAlly FAQ | Clinical AI, Scribe, Pricing & Workflow"
        description="Get answers about MedAlly clinical AI, AI medical scribe, SOAP notes, ICD-10/CPT coding, physician review, workflow, pricing, and free encounters."
        url="https://www.medally.ai/faq"
        image="/images/medally/clinical-workflow-real.png"
        imageAlt="MedAlly Frequently Asked Questions about Clinical AI, Medical Scribe, and Pricing"
        keywords={[
          'MedAlly FAQ',
          'clinical AI questions',
          'AI medical scribe FAQ',
          'SOAP notes AI',
          'medical coding AI FAQ',
          'physician review clinical AI',
          'MedAlly pricing FAQ'
        ]}
        structuredData={structuredData}
      />

      <main className="bg-background text-foreground min-h-screen transition-colors duration-300">
        {/* =========================================================================
            SECTION 1: HERO & CORE ADOPTION HUB INTRO (H1)
            ========================================================================= */}
        <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-teal-500/10 dark:bg-teal-500/5 blur-[140px] rounded-full pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <MotionReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6 backdrop-blur-sm shadow-sm">
                  <HelpCircle className="w-3.5 h-3.5" /> Direct Adoption Answers
                </div>
              </MotionReveal>

              <MotionReveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-serif text-editorial leading-[1.15] tracking-tight mb-8">
                  Frequently Asked Questions About MedAlly
                </h1>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto mb-10">
                  Get direct answers about MedAlly's clinical AI workflow, AI medical scribe, clinical documentation, physician review, coding, pricing, and adoption.
                </p>
              </MotionReveal>

              {/* Primary Action Buttons */}
              <MotionReveal delay={0.25}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <a
                    href="https://app.medally.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center justify-center px-8 rounded-full bg-gradient-to-r from-[#36b7b5] to-[#2da19f] text-slate-950 hover:text-slate-950 dark:text-white dark:hover:text-white font-bold shadow-xl hover:scale-[1.02] transition-all duration-300 text-center group"
                  >
                    Start MedAlly Free
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link
                    to="/pricing"
                    className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-base transition-all text-center"
                  >
                    View Pricing
                  </Link>
                </div>
              </MotionReveal>

              {/* Search Bar Filter */}
              <MotionReveal delay={0.3}>
                <div className="max-w-xl mx-auto relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={`Search ${totalQuestionsCount} verified questions & answers...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-10 py-3.5 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 shadow-sm transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: CREATIVE AUTO-ROTATING CATEGORY RADAR (PAUSE ON HOVER)
            ========================================================================= */}
        <section className="sticky top-16 md:top-20 z-30 py-4 backdrop-blur-xl bg-background/80 transition-all duration-300">
          {/* Header & Controls Bar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-1.5">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Browse by Category
                </span>
                <span className="hidden sm:inline-block text-[11px] text-muted-foreground font-light">
                  • Auto-rotating • Hover to pause
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMarqueePaused((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border border-border/70 bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title={isMarqueePaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
                  aria-label={isMarqueePaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
                >
                  {isMarqueePaused ? (
                    <>
                      <Play className="w-3 h-3 text-teal-500 fill-teal-500" />
                      <span className="hidden md:inline">Play</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3 text-muted-foreground" />
                      <span className="hidden md:inline">Pause</span>
                    </>
                  )}
                </button>

                <span className="text-[11px] font-semibold text-muted-foreground px-2 py-0.5 rounded-md bg-muted/40 border border-border/60">
                  {faqCategories.length} Topics
                </span>
              </div>
            </div>
          </div>

          {/* Full-Width Infinite Auto-Rotating Ribbon (covers full screen width) */}
          <div
            className="w-full relative overflow-hidden py-0.5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left and Right Smooth Edge Fade Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background via-background/85 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background via-background/85 to-transparent z-10" />

            {/* Seamless Dual Loop Track */}
            <div
              className={`animate-marquee-horizontal flex gap-3.5 w-max px-4 ${
                isMarqueePaused || isHovered ? 'marquee-paused' : ''
              }`}
            >
              {[...faqCategories, ...faqCategories].map((cat, index) => {
                const CategoryIcon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={`${cat.id}-${index}`}
                    type="button"
                    onClick={() => scrollToCategory(cat.id)}
                    className={`group relative shrink-0 inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                      isActive
                        ? 'border-teal-500/60 bg-teal-500/[0.12] shadow-md ring-1 ring-teal-500/30 text-foreground'
                        : 'border-border/80 bg-card/85 dark:bg-card/60 hover:border-teal-500/40 hover:bg-card hover:shadow-lg text-foreground hover:-translate-y-0.5'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                        isActive
                          ? 'bg-teal-500/25 text-teal-600 dark:text-teal-400'
                          : 'bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500/20'
                      }`}
                    >
                      <CategoryIcon className="w-4 h-4" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold tracking-tight text-foreground whitespace-nowrap group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {cat.title}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors shrink-0 ${
                        isActive
                          ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/40'
                          : 'bg-muted/80 text-muted-foreground border-border/60 group-hover:border-teal-500/30 group-hover:text-foreground'
                      }`}
                    >
                      {cat.faqs.length} FAQs
                    </span>

                    <ArrowRight className="w-3 h-3 text-muted-foreground/60 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: FAQ CATEGORIES & QUESTIONS (H2 & H3)
            ========================================================================= */}
        <section className="py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-6">
            {searchQuery && (
              <div className="mb-8 text-sm text-muted-foreground">
                Showing <strong className="text-foreground">{matchingQuestionsCount}</strong> results for &ldquo;{searchQuery}&rdquo;
              </div>
            )}

            {filteredCategories.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-3xl p-8">
                <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-bold text-foreground mb-2">No matching questions found</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                  We couldn&rsquo;t find an answer matching &ldquo;{searchQuery}&rdquo;. Try using different keywords or explore our direct product pages.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-2.5 rounded-full bg-muted border border-border text-xs font-bold uppercase tracking-wider hover:bg-muted/80 text-foreground transition-colors"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="space-y-16">
                {filteredCategories.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <section
                      key={category.id}
                      id={category.id}
                      className="scroll-mt-36"
                    >
                      {/* Category Header (H2) */}
                      <MotionReveal>
                        <div className="flex items-start justify-between border-b border-border pb-6 mb-8">
                          <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                              <CategoryIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-editorial text-foreground leading-snug">
                                {category.title}
                              </h2>
                              <p className="text-xs sm:text-sm text-muted-foreground font-light mt-1">
                                {category.description}
                              </p>
                            </div>
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground shrink-0 hidden sm:inline-block">
                            {category.faqs.length} {category.faqs.length === 1 ? 'Question' : 'Questions'}
                          </span>
                        </div>
                      </MotionReveal>

                      {/* Accordion List of H3 Questions */}
                      <div className="space-y-4">
                        {category.faqs.map((faq, idx) => {
                          const isOpen = openItems[faq.id] ?? false;
                          return (
                            <MotionReveal key={faq.id} delay={idx * 0.04}>
                              <div
                                className={`rounded-2xl border transition-all duration-300 ${
                                  isOpen
                                    ? 'border-teal-500/40 bg-card/90 shadow-md ring-1 ring-teal-500/10'
                                    : 'border-border bg-card/60 hover:border-border/90 hover:bg-card'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleItem(faq.id)}
                                  className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 font-semibold text-foreground text-base sm:text-lg hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                  aria-expanded={isOpen}
                                  aria-controls={`faq-answer-${faq.id}`}
                                >
                                  {/* Semantic H3 tag inside the button */}
                                  <h3 className="font-editorial text-base sm:text-lg text-foreground font-bold leading-snug">
                                    {faq.q}
                                  </h3>
                                  <ChevronDown
                                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                                      isOpen ? 'rotate-180 text-teal-500' : ''
                                    }`}
                                  />
                                </button>

                                <div
                                  id={`faq-answer-${faq.id}`}
                                  className={`transition-all duration-300 ease-in-out px-6 sm:px-7 ${
                                    isOpen
                                      ? 'max-h-[600px] pb-6 sm:pb-7 opacity-100'
                                      : 'max-h-0 pb-0 opacity-0 overflow-hidden pointer-events-none'
                                  }`}
                                >
                                  <div className="border-t border-border/50 pt-4 space-y-3">
                                    {faq.a.map((paragraph, pIdx) => (
                                      <p
                                        key={pIdx}
                                        className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed"
                                      >
                                        {paragraph}
                                      </p>
                                    ))}

                                    {/* Action Links & Deep References */}
                                    {faq.links && faq.links.length > 0 && (
                                      <div className="pt-2 flex flex-wrap items-center gap-x-1.5 text-xs sm:text-sm font-medium">
                                        {faq.links.map((link, lIdx) => (
                                          <span key={lIdx} className="inline-flex items-center">
                                            {link.prefix && (
                                              <span className="text-muted-foreground mr-1">
                                                {link.prefix}
                                              </span>
                                            )}
                                            {link.isExternal ? (
                                              <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-teal-600 dark:text-teal-400 font-bold hover:underline inline-flex items-center gap-1 group"
                                              >
                                                <span>{link.text}</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                              </a>
                                            ) : (
                                              <Link
                                                to={link.href}
                                                className="text-teal-600 dark:text-teal-400 font-bold hover:underline inline-flex items-center gap-1 group"
                                              >
                                                <span>{link.text}</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                              </Link>
                                            )}
                                            {link.suffix && (
                                              <span className="text-muted-foreground ml-1">
                                                {link.suffix}
                                              </span>
                                            )}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </MotionReveal>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: STILL HAVE A QUESTION? (CONVERSION & EXPLORATION HUB)
            ========================================================================= */}
        <section className="relative py-20 lg:py-28 overflow-hidden border-t border-border bg-muted/20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-teal-500/10 dark:bg-teal-500/5 blur-[140px] rounded-full pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" /> Next Steps
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-editorial text-foreground leading-tight mb-4">
                Still Have a Question?
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-10">
                Explore the product in more detail or contact MedAlly about your specific practice workflow.
              </p>

              {/* Exploration Hub Links */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10 text-left">
                <Link
                  to="/features"
                  className="p-5 rounded-2xl border border-border bg-card/80 hover:bg-card hover:border-teal-500/30 transition-all group"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
                    Capabilities
                  </div>
                  <div className="text-sm font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
                    Explore Features
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  to="/how-it-works"
                  className="p-5 rounded-2xl border border-border bg-card/80 hover:bg-card hover:border-teal-500/30 transition-all group"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
                    Sequence
                  </div>
                  <div className="text-sm font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
                    How MedAlly Works
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  to="/pricing"
                  className="p-5 rounded-2xl border border-border bg-card/80 hover:bg-card hover:border-teal-500/30 transition-all group"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
                    Tiers & Costs
                  </div>
                  <div className="text-sm font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
                    View Pricing
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  to="/contact"
                  className="p-5 rounded-2xl border border-border bg-card/80 hover:bg-card hover:border-teal-500/30 transition-all group"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
                    Conversations
                  </div>
                  <div className="text-sm font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
                    Contact MedAlly
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              {/* Final CTA Button */}
              <div>
                <a
                  href="https://app.medally.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center px-10 rounded-full bg-gradient-to-r from-[#36b7b5] to-[#2da19f] text-slate-950 hover:text-slate-950 dark:text-white dark:hover:text-white font-bold shadow-xl hover:scale-[1.02] transition-all duration-300 text-center group text-sm uppercase tracking-wider"
                >
                  Start MedAlly Free
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </MotionReveal>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default FAQPage;
