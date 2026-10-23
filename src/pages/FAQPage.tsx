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

interface FaqItem {
  id: string;
  q: string;
  a: string[];
  links?: {
    text: string;
    href: string;
    isExternal?: boolean;
    prefix?: string;
    suffix?: string;
  }[];
}

interface FaqCategory {
  id: string;
  title: string;
  description: string;
  icon: typeof HelpCircle;
  faqs: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    id: 'about-medally-and-the-workflow',
    title: 'About MedAlly and the Workflow',
    description: 'Foundational concepts, platform scope, and how MedAlly fits the clinical day.',
    icon: Layers,
    faqs: [
      {
        id: 'what-is-medally',
        q: 'What is MedAlly?',
        a: [
          'MedAlly is a clinical AI platform for physicians. It starts with the patient encounter and can prepare SOAP-style documentation, organize clinical information for review, prepare ICD-10/CPT and billing information, support treatment and follow-up work, and connect physician-approved work to the next practice workflow step.'
        ],
        links: [
          {
            prefix: 'See ',
            text: 'MedAlly Features',
            href: '/features',
            suffix: ' for the broader capability set.'
          }
        ]
      },
      {
        id: 'how-does-medally-work',
        q: 'How does MedAlly work?',
        a: [
          'MedAlly listens during the patient encounter and uses information from the visit to prepare reviewable work. The physician can then review and edit the documentation and related information before approved work moves to the next workflow step.'
        ],
        links: [
          {
            prefix: 'See the full sequence on ',
            text: 'How MedAlly Works',
            href: '/how-it-works',
            suffix: '.'
          }
        ]
      },
      {
        id: 'is-medally-only-scribe',
        q: 'Is MedAlly only an AI medical scribe?',
        a: [
          'No. The AI medical scribe is one part of MedAlly. The broader workflow can also include structured clinical documentation, decision-support and differential-review information, lab-related information, treatment and follow-up support, ICD-10/CPT coding, billing information, and workflow handoff after physician review.'
        ],
        links: [
          {
            prefix: 'Explore ',
            text: 'AI Clinical Decision Support',
            href: '/ai-clinical-decision-support',
            suffix: ' to see how differential and planning context are organized.'
          }
        ]
      },
      {
        id: 'who-is-medally-designed-for',
        q: 'Who is MedAlly designed for?',
        a: [
          'MedAlly is designed for physicians and clinical teams evaluating AI-supported documentation and broader encounter workflows. Individual clinicians can start with Forever Free, while Enterprise is available for clinical teams and custom systems.'
        ]
      },
      {
        id: 'can-i-try-medally-before-subscribing',
        q: 'Can I try MedAlly before subscribing?',
        a: [
          'Yes. Forever Free includes 10 clinical encounters every month.'
        ],
        links: [
          {
            text: 'Start MedAlly Free',
            href: 'https://app.medally.ai/',
            isExternal: true
          }
        ]
      }
    ]
  },
  {
    id: 'ai-medical-scribe-and-clinical-documentation',
    title: 'AI Medical Scribe and Clinical Documentation',
    description: 'Encounter listening, structured SOAP documentation drafts, and physician validation.',
    icon: FileText,
    faqs: [
      {
        id: 'does-medally-include-scribe',
        q: 'Does MedAlly include an AI medical scribe?',
        a: [
          'Yes. MedAlly includes an AI medical scribe workflow that listens during the patient encounter and helps prepare clinical documentation for physician review.'
        ],
        links: [
          {
            prefix: 'See ',
            text: 'MedAlly AI Medical Scribe',
            href: '/ai-medical-scribe',
            suffix: ' for the scribe-specific experience.'
          }
        ]
      },
      {
        id: 'what-does-medally-do-during-encounter',
        q: 'What does MedAlly do during a patient encounter?',
        a: [
          'MedAlly listens during the patient-physician encounter and uses information from the visit to prepare the work that follows, including structured documentation and other reviewable outputs.'
        ]
      },
      {
        id: 'does-medally-create-soap-notes',
        q: 'Does MedAlly create SOAP-style notes?',
        a: [
          'Yes. MedAlly prepares SOAP-style clinical documentation for physician review and editing.'
        ],
        links: [
          {
            prefix: 'See ',
            text: 'AI Clinical Documentation',
            href: '/clinical-documentation-ai',
            suffix: ' for the documentation workflow.'
          }
        ]
      },
      {
        id: 'can-physicians-edit-notes',
        q: 'Can physicians edit the notes MedAlly prepares?',
        a: [
          'Yes. Physicians can review and edit MedAlly-prepared documentation before it is used as part of the final clinical record.'
        ]
      },
      {
        id: 'is-note-automatically-final-record',
        q: 'Is the AI-generated note automatically the final clinical record?',
        a: [
          'No. MedAlly prepares documentation for physician review. The physician remains responsible for reviewing the information and the final clinical record.'
        ]
      },
      {
        id: 'difference-between-scribe-and-documentation',
        q: "What is the difference between MedAlly's AI medical scribe and clinical documentation workflow?",
        a: [
          'The AI medical scribe focuses on listening during the encounter and helping create the initial draft. The clinical documentation workflow focuses on the structured note, review, editing, and related documentation work that follows.'
        ],
        links: [
          {
            prefix: 'See ',
            text: 'AI Medical Scribe',
            href: '/ai-medical-scribe',
            suffix: ' and '
          },
          {
            text: 'AI Clinical Documentation',
            href: '/clinical-documentation-ai',
            suffix: ' for the deeper workflows.'
          }
        ]
      }
    ]
  },
  {
    id: 'clinical-support-coding-and-follow-up',
    title: 'Clinical Support, Coding, and Follow-Up',
    description: 'Decision support, laboratory integration, care plans, ICD-10/CPT coding, and billing.',
    icon: Activity,
    faqs: [
      {
        id: 'decision-support-or-differential',
        q: 'Does MedAlly provide decision-support or differential-review information?',
        a: [
          'Yes. MedAlly can prepare decision-support and differential-review information for physician review.',
          'This information supports clinical judgment; it does not replace the physician’s clinical decision-making.'
        ]
      },
      {
        id: 'lab-related-information',
        q: 'Does MedAlly work with lab-related information?',
        a: [
          'Yes. MedAlly brings lab-related information into the encounter review workflow so the physician can consider it alongside the other information connected to the visit.'
        ]
      },
      {
        id: 'treatment-planning',
        q: 'Does MedAlly support treatment planning?',
        a: [
          'Yes. MedAlly provides treatment-planning information for physician review. The physician remains responsible for deciding the appropriate treatment and clinical action.'
        ]
      },
      {
        id: 'follow-up-work',
        q: 'Does MedAlly support follow-up work?',
        a: [
          'Yes. MedAlly supports follow-up information and workflow connected to the patient encounter.'
        ]
      },
      {
        id: 'icd10-and-cpt-coding',
        q: 'Does MedAlly provide ICD-10 and CPT coding information?',
        a: [
          'Yes. MedAlly prepares ICD-10/CPT coding information around the encounter for physician review and validation.'
        ]
      },
      {
        id: 'billing-support',
        q: 'Does MedAlly support billing work?',
        a: [
          'Yes. MedAlly prepares billing-related information around the encounter in addition to ICD-10/CPT coding information.',
          'Physicians should review and validate billing information before use.'
        ]
      }
    ]
  },
  {
    id: 'physician-review-and-workflow-handoff',
    title: 'Physician Review and Workflow Handoff',
    description: 'Physician oversight, reviewable components, and deployment-qualified EHR handoffs.',
    icon: CheckCircle2,
    faqs: [
      {
        id: 'clinical-decisions',
        q: 'Does MedAlly make clinical decisions for the physician?',
        a: [
          'No. MedAlly prepares and organizes information for review. Clinical judgment and final clinical decisions remain with the physician.'
        ]
      },
      {
        id: 'what-physician-reviews',
        q: 'What does the physician review in MedAlly?',
        a: [
          'Depending on the workflow, physician review can include the SOAP-style note, decision-support or differential information, lab-related information, treatment and follow-up information, and ICD-10/CPT or billing information.'
        ]
      },
      {
        id: 'after-review-and-approval',
        q: 'What happens after the physician reviews and approves the work?',
        a: [
          'After physician review and approval, MedAlly can support moving approved work into the next practice or EHR workflow step.',
          'The exact handoff method varies by deployment, so the specific transfer method should be confirmed for the workflow being evaluated.'
        ],
        links: [
          {
            prefix: 'For the broader sequence, see ',
            text: 'How MedAlly Works',
            href: '/how-it-works',
            suffix: '.'
          }
        ]
      }
    ]
  },
  {
    id: 'plans-and-pricing',
    title: 'Plans and Pricing',
    description: 'Tier allowances, encounter limits, renewal terms, and cancellation policies.',
    icon: CreditCard,
    faqs: [
      {
        id: 'plans-available',
        q: 'What MedAlly plans are available?',
        a: [
          'MedAlly offers Forever Free, Professional, Ultimate, and Enterprise.'
        ]
      },
      {
        id: 'how-much-does-medally-cost',
        q: 'How much does MedAlly cost?',
        a: [
          'Current pricing is: Forever Free — $0 USD; Professional — $49 USD/mo per clinician; Ultimate — $99 USD/mo per clinician; Enterprise — Custom.'
        ],
        links: [
          {
            prefix: 'See ',
            text: 'MedAlly Pricing',
            href: '/pricing',
            suffix: ' for the current plan comparison.'
          }
        ]
      },
      {
        id: 'what-counts-as-encounter',
        q: 'What counts as one MedAlly encounter?',
        a: [
          'One MedAlly session counts as one encounter.'
        ]
      },
      {
        id: 'encounters-in-forever-free',
        q: 'How many encounters are included with Forever Free?',
        a: [
          'Forever Free includes 10 clinical encounters per month.'
        ]
      },
      {
        id: 'do-encounters-renew',
        q: 'Do the 10 free encounters renew every month?',
        a: [
          'Yes. You receive 10 free encounters every month.'
        ]
      },
      {
        id: 'after-using-10-free-encounters',
        q: 'What happens after I use all 10 free encounters?',
        a: [
          'After all 10 free encounters for the current month are used, you need a Professional, Ultimate, or Enterprise subscription to start additional MedAlly encounters before the next monthly renewal.',
          'If you stay on Forever Free, your allowance renews to 10 free encounters at the next monthly reset.'
        ]
      },
      {
        id: 'professional-unlimited-encounters',
        q: 'Does Professional include unlimited encounters?',
        a: [
          'Yes. The Professional plan includes unlimited encounters.'
        ]
      },
      {
        id: 'difference-pro-ultimate',
        q: 'What is the difference between Professional and Ultimate?',
        a: [
          'Professional is $49 USD/mo per clinician and includes unlimited encounters, Advanced multilingual scribe, Medical coding maps (ICD-10), and Basic HIPAA storage.',
          'Ultimate is $99 USD/mo per clinician and includes all Professional features, plus Predictive clinical support, 200+ guideline scans, Treatment plan assistance, and Priority AI latency.'
        ],
        links: [
          {
            prefix: 'See the current side-by-side comparison on ',
            text: 'Pricing',
            href: '/pricing',
            suffix: '.'
          }
        ]
      },
      {
        id: 'who-is-enterprise-for',
        q: 'Who is Enterprise for?',
        a: [
          'Enterprise is for clinical teams and custom systems that need a tailored MedAlly deployment.'
        ],
        links: [
          {
            prefix: 'See ',
            text: 'Pricing',
            href: '/pricing',
            suffix: ' or '
          },
          {
            text: 'Contact MedAlly',
            href: '/contact',
            suffix: ' to discuss an Enterprise deployment.'
          }
        ]
      },
      {
        id: 'can-i-cancel-pro-ultimate',
        q: 'Can I cancel Professional or Ultimate?',
        a: [
          'Yes. Professional and Ultimate use flexible monthly agreements and can be canceled anytime.',
          'For the exact cancellation effective date or billing treatment, follow the current checkout/billing terms. Enterprise uses custom commercial terms, so Contact MedAlly for Enterprise contract details.'
        ],
        links: [
          {
            prefix: 'For Enterprise contract details, ',
            text: 'Contact MedAlly',
            href: '/contact',
            suffix: '.'
          }
        ]
      }
    ]
  },
  {
    id: 'practice-and-enterprise-adoption',
    title: 'Practice and Enterprise Adoption',
    description: 'Evaluation roadmaps, multi-clinician rollouts, EHR capabilities, and ROI modeling.',
    icon: Building2,
    faqs: [
      {
        id: 'where-to-start-evaluating-myself',
        q: 'Where should I start if I am evaluating MedAlly for myself?',
        a: [
          'Start with Forever Free if you want to experience MedAlly directly. It includes 10 encounters every month.'
        ],
        links: [
          {
            text: 'Start MedAlly Free',
            href: 'https://app.medally.ai/',
            isExternal: true
          }
        ]
      },
      {
        id: 'where-to-start-evaluating-practice',
        q: 'Where should a practice start if it is evaluating MedAlly for multiple clinicians?',
        a: [
          'Review MedAlly Features and How MedAlly Works first, then use Pricing to compare the current plans.',
          'For a larger or custom deployment, Contact MedAlly.'
        ],
        links: [
          {
            prefix: 'Review ',
            text: 'MedAlly Features',
            href: '/features',
            suffix: ' and '
          },
          {
            text: 'How MedAlly Works',
            href: '/how-it-works',
            suffix: ' first, then use '
          },
          {
            text: 'Pricing',
            href: '/pricing',
            suffix: ' to compare current plans. For custom deployments, '
          },
          {
            text: 'Contact MedAlly',
            href: '/contact',
            suffix: '.'
          }
        ]
      },
      {
        id: 'ehr-connected-workflow',
        q: 'Can MedAlly support an EHR-connected workflow?',
        a: [
          'MedAlly supports practice / EHR workflow handoff after physician review and approval. The exact integration and handoff behavior can vary by deployment.',
          'Enterprise currently includes a Custom EPIC/Cerner integration offering. Discuss the required workflow with MedAlly before assuming a specific integration behavior.'
        ],
        links: [
          {
            prefix: 'For broader guidance on evaluating workflow platforms, integration, review responsibilities, and handoff, see ',
            text: 'Clinical Workflow Software',
            href: '/clinical-workflow-software',
            suffix: '.'
          }
        ]
      },
      {
        id: 'security-and-privacy',
        q: 'Where can I find current security and privacy information?',
        a: [
          'For security, privacy, and compliance information applicable to your organization or deployment, Contact MedAlly.'
        ],
        links: [
          {
            prefix: 'To request compliance details, ',
            text: 'Contact MedAlly',
            href: '/contact',
            suffix: '.'
          }
        ]
      },
      {
        id: 'estimate-roi-value',
        q: 'How can I estimate the potential value of MedAlly for my practice?',
        a: [
          'Use the MedAlly ROI Calculator to model potential workflow impact using your own practice assumptions.'
        ],
        links: [
          {
            prefix: 'Model workflow savings on the ',
            text: 'MedAlly ROI Calculator',
            href: '/roi-calculator',
            suffix: '.'
          }
        ]
      }
    ]
  }
];

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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does MedAlly fit into clinical workflows?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MedAlly captures encounter context, drafts structured documentation, surfaces decision-support context, and prepares coding signals for physician review before chart completion.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can MedAlly support clinical documentation and decision support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. MedAlly prepares reviewable documentation and clinical decision support context while physicians remain responsible for reviewing and approving all outputs.'
          }
        }
      ]
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
