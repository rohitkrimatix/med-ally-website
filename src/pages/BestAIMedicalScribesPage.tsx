import { type FC, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Layers,
  Search,
  Check,
  AlertCircle,
  Stethoscope,
  Building2,
  UserCheck,
  Workflow,
  Scale,
  Activity,
  Info
} from 'lucide-react';
import Layout from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { MotionReveal } from '@/components/MotionReveal';

interface VendorData {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  isMedAlly?: boolean;
  documentation: string;
  beyondTheNote: string;
  publicPricing: string;
  usefulFit: string;
  overview: string[];
  pricingDetails: {
    label: string;
    description: string;
    tiers?: { name: string; price: string; note: string }[];
    notes?: string[];
  };
  officialSources: { label: string; url: string; isExternal?: boolean }[];
  confirmBeforeChoosing: string;
  considerIf: string;
  category: 'independent' | 'specialty' | 'enterprise';
}

const vendors: VendorData[] = [
  {
    id: 'medally',
    name: 'MedAlly',
    tagline: 'Encounter-to-workflow AI documentation & clinical intelligence',
    badge: 'Publisher · Hybrid Workflow',
    isMedAlly: true,
    category: 'independent',
    documentation: 'Encounter-based structured documentation and SOAP-style notes for physician review',
    beyondTheNote: 'Decision-support context, differential review, lab context, treatment/follow-up information, coding context, workflow handoff',
    publicPricing: 'Forever Free: $0 USD (10 encounters/mo); Professional: $49 USD/mo per clinician; Ultimate: $99 USD/mo per clinician; Enterprise: Custom',
    usefulFit: 'Physicians wanting a scribe connected to a broader clinical workflow',
    overview: [
      'MedAlly combines an AI medical scribe with a broader encounter workflow.',
      'During the patient encounter, MedAlly listens to the clinical conversation and prepares structured documentation for physician review. Its current workflow includes SOAP-style clinical notes, with the physician reviewing and editing the prepared documentation before it moves forward.',
      'MedAlly also extends beyond the scribe itself. Depending on the workflow, physicians can review diagnostic and differential-support information, lab-related context, treatment and follow-up information, and coding information connected to the same encounter.',
      'For buyers evaluating more than documentation alone, that broader workflow is the main reason to include MedAlly on the shortlist.'
    ],
    pricingDetails: {
      label: 'Verified Public Pricing',
      description: 'One MedAlly session counts as one encounter, and the Forever Free allowance renews monthly.',
      tiers: [
        { name: 'Forever Free', price: '$0 USD', note: '10 clinical encounters per month (renews monthly)' },
        { name: 'Professional', price: '$49 USD/mo', note: 'Per clinician · Unlimited encounters · Coding context' },
        { name: 'Ultimate', price: '$99 USD/mo', note: 'Per clinician · Predictive support · 200+ guideline scans' },
        { name: 'Enterprise', price: 'Custom', note: 'Tailored EHR deployments, custom integrations, dedicated onboarding' }
      ],
      notes: [
        'One MedAlly session counts as one encounter.',
        'Forever Free renews every month with 10 encounters.',
        'Flexible monthly agreements with no long-term lock-in on Professional and Ultimate.'
      ]
    },
    officialSources: [
      { label: 'MedAlly AI Medical Scribe', url: '/ai-medical-scribe', isExternal: false },
      { label: 'MedAlly Pricing', url: '/pricing', isExternal: false }
    ],
    confirmBeforeChoosing: 'Exact EHR/workflow handoff varies by deployment. Confirm the integration path and plan capabilities required for your environment.',
    considerIf: 'You want an AI scribe that connects documentation to additional physician-reviewed clinical and administrative context rather than stopping at note generation.'
  },
  {
    id: 'abridge',
    name: 'Abridge',
    tagline: 'Enterprise ambient AI with linked clinical evidence',
    badge: 'Enterprise Health Systems',
    category: 'enterprise',
    documentation: 'Ambient documentation with EHR-integrated clinical notes',
    beyondTheNote: 'Linked Evidence, pre-visit context, clinical insights, problem prediction, and clinician-reviewed actionable outputs',
    publicPricing: 'Contact vendor',
    usefulFit: 'Large health systems evaluating enterprise-scale ambient AI and deep EHR integration',
    overview: [
      'Abridge is strongly oriented toward enterprise healthcare systems.',
      'Its public product materials describe ambient documentation and deep EHR workflow integration. Abridge also describes Linked Evidence, which connects AI-drafted outputs to source information, along with pre-visit context, clinical insights, and actionable workflow outputs for clinician review.'
    ],
    pricingDetails: {
      label: 'Commercial Terms',
      description: 'Public per-clinician pricing was not confirmed during this review. Abridge is primarily marketed through enterprise health-system deployments.'
    },
    officialSources: [
      { label: 'Abridge Product', url: 'https://www.abridge.com/product', isExternal: true },
      { label: 'Abridge for Clinicians', url: 'https://www.abridge.com/platform/clinicians', isExternal: true }
    ],
    confirmBeforeChoosing: 'Confirm the EHR integration, deployment scope, feature availability, and commercial terms for your health system.',
    considerIf: 'You are evaluating ambient AI for a large healthcare organization where enterprise-scale deployment, EHR integration, and traceability of AI-generated documentation are major requirements.'
  },
  {
    id: 'ambience',
    name: 'Ambience Healthcare',
    tagline: 'Real-time ambient documentation and multi-speaker AI platform',
    badge: 'Enterprise Platform',
    category: 'enterprise',
    documentation: 'Real-time ambient scribe with structured, coding-ready notes',
    beyondTheNote: 'Multiple-speaker attribution, Translation for Documentation, generators, coding, and order-related workflows',
    publicPricing: 'Contact vendor',
    usefulFit: 'Enterprise organizations evaluating broad workflow support across care settings',
    overview: [
      'Ambience Healthcare provides an enterprise-oriented ambient AI platform.',
      'Its product materials describe real-time ambient scribing, structured and coding-ready notes, multiple-speaker attribution, and Translation for Documentation, which translates clinical conversations into English documentation in real time. Ambience also describes clinical-text generators, coding support, and order-related workflows.'
    ],
    pricingDetails: {
      label: 'Commercial Terms',
      description: 'Public per-clinician pricing was not confirmed during this review. Available via enterprise commercial agreements.'
    },
    officialSources: [
      { label: 'Ambience Products', url: 'https://www.ambiencehealthcare.com/products', isExternal: true },
      { label: 'Ambience for Clinicians', url: 'https://www.ambiencehealthcare.com/clinicians', isExternal: true }
    ],
    confirmBeforeChoosing: 'Confirm which capabilities are available in your care setting, EHR environment, and deployment. "Translation for Documentation" should not be assumed to be a live medical-interpreting service.',
    considerIf: 'You are evaluating enterprise ambient AI across multiple care settings and want to investigate documentation, coding, translation-for-documentation, and related workflow capabilities in one platform.'
  },
  {
    id: 'deepscribe',
    name: 'DeepScribe',
    tagline: 'Specialty-focused ambient documentation and pre-charting',
    badge: 'Specialty & Oncology Focus',
    category: 'specialty',
    documentation: 'Ambient, customizable, specialty-oriented clinical notes',
    beyondTheNote: 'Pre-charting, diagnosis intelligence, coding, and EHR-connected workflows',
    publicPricing: 'Contact vendor',
    usefulFit: 'Specialty practices evaluating deeper specialty and pre-charting workflows',
    overview: [
      'DeepScribe provides ambient documentation with a strong specialty-care orientation.',
      'Its current public positioning highlights specialty-specific notes, customization, pre-visit intelligence through SmartPrep, diagnosis intelligence, AI coding, and EHR-connected workflows. In 2026, the company\'s public site places especially strong emphasis on oncology and complex specialty workflows.'
    ],
    pricingDetails: {
      label: 'Commercial Terms',
      description: 'A current official public per-clinician starting price was not confirmed during this review.'
    },
    officialSources: [
      { label: 'DeepScribe AI Medical Scribe', url: 'https://www.deepscribe.ai/solutions/ai-medical-scribe', isExternal: true },
      { label: 'DeepScribe Solutions', url: 'https://www.deepscribe.ai/solutions', isExternal: true }
    ],
    confirmBeforeChoosing: 'Confirm specialty coverage, EHR integration depth, implementation requirements, and current commercial terms for your practice.',
    considerIf: 'You operate in a specialty environment and want to investigate ambient documentation alongside pre-charting, coding, and specialty-specific clinical context.'
  },
  {
    id: 'freed',
    name: 'Freed',
    tagline: 'AI scribe designed for independent clinicians and practices',
    badge: 'Independent Practice',
    category: 'independent',
    documentation: 'AI scribe with specialty-specific templates and customizable notes',
    beyondTheNote: 'Visit prep, patient instructions/letters, clinical decision support, and ICD-10/CPT coding on higher tiers',
    publicPricing: 'Starter: $39/mo (up to 40 notes); Core: $79/mo (unlimited); Premier: $119/mo ($1,248/yr annual commit); 7-day free trial',
    usefulFit: 'Independent clinicians and clinics that value transparent individual pricing',
    overview: [
      'Freed positions its AI scribe around independent clinicians and clinics. Its public materials describe customized clinical notes, specialty-specific templates, in-person and virtual visit support, and EHR push functionality on qualifying plans.',
      'Freed\'s higher tiers also list prior-visit context, patient instructions and letters, coding support, and additional post-visit workflow tools.'
    ],
    pricingDetails: {
      label: 'Public Individual Plans (October 2026)',
      description: 'Freed\'s official pages use the $ symbol but did not explicitly label the currency in the materials reviewed for this page.',
      tiers: [
        { name: 'Starter', price: '$39/mo', note: 'Up to 40 notes per month per clinician' },
        { name: 'Core', price: '$79/mo', note: 'Unlimited note generation per clinician' },
        { name: 'Premier', price: '$119/mo', note: 'Month-to-month billing per clinician' },
        { name: 'Premier Annual', price: '$1,248/year', note: 'Equivalent to $104/mo with an annual commitment' },
        { name: 'Groups', price: 'Custom', note: 'Multi-clinician clinic pricing' }
      ],
      notes: [
        'Includes a 7-day free trial.',
        'Features such as EHR push and coding are plan-dependent.'
      ]
    },
    officialSources: [
      { label: 'Freed Pricing', url: 'https://www.getfreed.ai/pricing', isExternal: true },
      { label: 'Freed Pricing Help Center', url: 'https://help.getfreed.ai/en/articles/9242518-freed-pricing-discounts-and-referral-program', isExternal: true }
    ],
    confirmBeforeChoosing: 'Features such as EHR push, coding, and other advanced workflows are plan-dependent. Confirm EHR support, currency at checkout, and whether monthly or annual billing matches your preferred commitment.',
    considerIf: 'You are an independent clinician or smaller clinic that wants transparent individual-plan pricing, specialty templates, and an AI scribe that can expand into additional workflow tools.'
  },
  {
    id: 'heidi',
    name: 'Heidi',
    tagline: 'AI documentation with templates and integrated evidence tools',
    badge: 'Evidence Features',
    category: 'independent',
    documentation: 'AI documentation with templates and note-generation workflow',
    beyondTheNote: 'Evidence tools, patient-context-aware answers, document generation, and coding features on qualifying plans',
    publicPricing: 'Free plan available; current U.S. paid-plan price and billing commitment not confirmed in this review',
    usefulFit: 'Clinicians who want documentation plus integrated evidence features',
    overview: [
      'Heidi provides AI-assisted clinical documentation with customizable templates and note-generation workflows. Its public U.S. materials also describe evidence features, transparent citations, patient-context-aware answers, and coding on qualifying plans.'
    ],
    pricingDetails: {
      label: 'Freemium Entry',
      description: 'Heidi has a Free plan. The current U.S. paid-plan price and billing commitment were not confirmed in this review.'
    },
    officialSources: [
      { label: 'Heidi U.S. Pricing', url: 'https://www.heidihealth.com/en-us/pricing', isExternal: true },
      { label: 'Heidi U.S. Medical Scribe Guide', url: 'https://www.heidihealth.com/en-us/blog/medical-scribes-solutions', isExternal: true }
    ],
    confirmBeforeChoosing: 'Confirm the current U.S. price, billing commitment, EHR integration availability, and which evidence/coding capabilities are included in the plan you are considering.',
    considerIf: 'You want AI documentation with a free entry point and are particularly interested in integrated evidence features alongside the scribe.'
  },
  {
    id: 'nabla',
    name: 'Nabla',
    tagline: 'Ambient clinical documentation, medical dictation & coding support',
    badge: 'Documentation + Dictation',
    category: 'specialty',
    documentation: 'Ambient documentation plus medical dictation',
    beyondTheNote: 'ICD-10 diagnosis suggestions; HCC/MCC suggestions; E/M coding suggestions for eligible outpatient providers; EHR-connected workflows',
    publicPricing: 'Public individual starting price not confirmed in this review; free-trial CTA available',
    usefulFit: 'Organizations evaluating documentation, dictation, and coding support in one clinical AI workflow',
    overview: [
      'Nabla combines ambient documentation with medical dictation and coding support.',
      'Its public materials describe real-time dictation, ICD-10 diagnosis suggestions, HCC/MCC coding suggestions, and E/M coding suggestions. Nabla notes that E/M coding is limited to eligible providers in supported outpatient specialties/settings, so coding availability should be evaluated against the buyer\'s actual workflow.'
    ],
    pricingDetails: {
      label: 'Trial Entry',
      description: 'A current public individual starting price was not confirmed during this review. Nabla\'s site displayed a Try it for free option.'
    },
    officialSources: [
      { label: 'Nabla Platform', url: 'https://nabla.com/', isExternal: true },
      { label: 'Nabla EHR Integration', url: 'https://nabla.com/ehr', isExternal: true },
      { label: 'Suggested Diagnoses', url: 'https://help.nabla.com/en/articles/4856898', isExternal: true },
      { label: 'E/M Coding Guide', url: 'https://help.nabla.com/en/articles/9875522', isExternal: true }
    ],
    confirmBeforeChoosing: 'Confirm which coding features apply to your specialty and setting, the EHR integration available to your organization, and current commercial terms.',
    considerIf: 'You are evaluating ambient documentation, dictation, and coding suggestions as parts of one clinical AI workflow.'
  },
  {
    id: 'suki',
    name: 'Suki',
    tagline: 'Ambient clinical intelligence with order staging and evidence integration',
    badge: 'Order Staging & UpToDate',
    category: 'enterprise',
    documentation: 'Ambient clinical documentation plus AI dictation',
    beyondTheNote: 'Order staging and Ask; UpToDate-powered clinical answers are available to clinicians with UpToDate access',
    publicPricing: 'Contact vendor',
    usefulFit: 'Practices and health systems prioritizing deep EHR-connected workflows',
    overview: [
      'Suki positions itself around Ambient Clinical Intelligence rather than scribing alone.',
      'Its public materials describe ambient documentation, AI dictation, and EHR-connected workflows. Suki also describes order staging and Ask, which can combine patient-specific chart context with UpToDate-powered clinical information. UpToDate-powered answers require UpToDate access.'
    ],
    pricingDetails: {
      label: 'Commercial Terms',
      description: 'Public individual pricing was not confirmed in this review. Buyers should contact Suki for current commercial terms.'
    },
    officialSources: [
      { label: 'Suki Platform', url: 'https://www.suki.ai/', isExternal: true },
      { label: 'Suki Ask with UpToDate', url: 'https://www.suki.ai/press-releases/suki-launches-ask-accelerating-complex-clinical-decision-support-powered-by-wolters-kluwer-up-to-date-expert-ai/', isExternal: true },
      { label: 'Suki Orders', url: 'https://www.suki.ai/orders/', isExternal: true }
    ],
    confirmBeforeChoosing: 'Confirm EHR compatibility, order-staging availability, UpToDate access requirements for evidence-powered answers, and current pricing for your organization.',
    considerIf: 'You are a practice or health system that prioritizes EHR-connected ambient documentation and wants capabilities extending into orders and clinical-information retrieval.'
  }
];

const faqs = [
  {
    q: 'What is the best AI medical scribe?',
    a: 'There is no universal best option. The right choice depends on practice size, specialty, note requirements, EHR workflow, pricing, and whether you need capabilities beyond documentation.'
  },
  {
    q: 'What should I look for in an AI medical scribe?',
    a: 'Compare note quality and structure, clinician review controls, customization, specialty fit, EHR workflow, pricing, coding or other post-note capabilities, and the product\'s stated limitations.'
  },
  {
    q: 'Are free AI medical scribes available?',
    a: 'Yes. Some vendors offer free plans or trials, but the limits vary. MedAlly\'s Forever Free plan includes 10 clinical encounters per month. Other vendors should be checked directly for their current free-plan or trial terms.'
  },
  {
    q: 'Is an ambient AI scribe the same as an AI medical scribe?',
    a: 'The terms overlap heavily in the market. "Ambient" usually emphasizes capturing the natural patient-clinician conversation in the background of the encounter, while "AI medical scribe" is the broader product category used for software that helps generate clinical documentation.'
  },
  {
    q: 'Should physicians review AI-generated notes?',
    a: 'Yes. AI-generated clinical documentation should be reviewed for accuracy, completeness, and appropriateness before it becomes part of the clinical record.'
  },
  {
    q: 'Do all AI medical scribes integrate with EHRs the same way?',
    a: 'No. Integration depth varies substantially. Buyers should confirm whether a product copies text, pushes notes, works inside the EHR, supports structured fields, stages orders, or provides another workflow.'
  },
  {
    q: 'Can an AI medical scribe help with coding?',
    a: 'Some platforms include coding support, but the scope differs by vendor and plan. Coding output should be reviewed and validated before use.'
  }
];

const comparisonCriteria = [
  {
    num: '1',
    title: 'Encounter Capture & Documentation',
    desc: 'Does the product support ambient listening, conversation-based capture, or structured note generation?',
    icon: Mic
  },
  {
    num: '2',
    title: 'Clinician Review & Safety Gates',
    desc: 'Is the output presented for physician editing and validation rather than treated as unquestioned final documentation?',
    icon: UserCheck
  },
  {
    num: '3',
    title: 'Customization & Specialty Fit',
    desc: 'Can documentation adapt to diverse SOAP note structures, specialist vocabulary, and clinician preferences?',
    icon: Stethoscope
  },
  {
    num: '4',
    title: 'Beyond-the-Note Workflow',
    desc: 'Does the system extend into ICD-10/CPT coding, diagnostic context, order staging, pre-charting, or patient summaries?',
    icon: Layers
  },
  {
    num: '5',
    title: 'EHR & Downstream Integration',
    desc: 'Does the vendor support structured data handoffs, direct EHR push, or practice management connections?',
    icon: Workflow
  },
  {
    num: '6',
    title: 'Pricing Transparency',
    desc: 'Is current clinician pricing publicly disclosed, or does it require sales calls and enterprise commitments?',
    icon: Scale
  }
];

const checklistItems = [
  {
    title: '1. The note you actually receive',
    text: 'Ask to see a real de-identified example. Look at structure, irrelevant content, missing context, and the amount of editing required.'
  },
  {
    title: '2. Physician review and control',
    text: 'The system should make it clear what the clinician must review, approve, sign, or send forward.'
  },
  {
    title: '3. Ambient capture versus dictation',
    text: 'Some physicians want the system to listen during the natural encounter. Others still need fast direct dictation. Some platforms support both.'
  },
  {
    title: '4. What happens beyond documentation',
    text: 'If your workflow also requires coding, clinical context, patient instructions, orders, evidence, follow-up, or pre-charting, compare those capabilities separately rather than assuming every "AI scribe" includes them.'
  },
  {
    title: '5. EHR workflow',
    text: '"Integration" can mean very different things—from copying text into the chart to structured two-way workflows. Ask each vendor exactly what happens after the note is reviewed.'
  },
  {
    title: '6. Pricing at your actual usage level',
    text: 'A low starting price can have encounter limits, feature restrictions, or higher-tier requirements. Compare the plan you would realistically use.'
  },
  {
    title: '7. Product evidence and limitations',
    text: 'Ask how the vendor evaluates note quality, how limitations are communicated, and what happens when the system is uncertain or misses information.'
  }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.medally.ai/resources/best-ai-medical-scribes#webpage',
      url: 'https://www.medally.ai/resources/best-ai-medical-scribes',
      name: 'Best AI Medical Scribes for Physicians | MedAlly',
      description:
        'Compare leading AI medical scribes for physicians by documentation workflow, clinical support, coding, integrations, pricing, and practice fit.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.medally.ai/#website',
        name: 'MedAlly',
        url: 'https://www.medally.ai'
      },
      datePublished: '2026-10-13',
      dateModified: '2026-10-13'
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.medally.ai/resources/best-ai-medical-scribes#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.medally.ai/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Resources',
          item: 'https://www.medally.ai/resources/best-ai-medical-scribes'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Best AI Medical Scribes',
          item: 'https://www.medally.ai/resources/best-ai-medical-scribes'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.medally.ai/resources/best-ai-medical-scribes#faq',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a
        }
      }))
    }
  ]
};

export const BestAIMedicalScribesPage: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'independent' | 'specialty' | 'enterprise'>('all');

  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.documentation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.beyondTheNote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.usefulFit.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = filterCategory === 'all' || v.category === filterCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, filterCategory]);

  return (
    <Layout>
      <SEO
        title="Best AI Medical Scribes for Physicians | MedAlly"
        description="Compare leading AI medical scribes for physicians by documentation workflow, clinical support, coding, integrations, pricing, and practice fit."
        url="https://www.medally.ai/resources/best-ai-medical-scribes"
        image="/images/medally/clinical-hero.webp"
        imageAlt="Comparison guide of the best AI medical scribes for physicians in 2026."
        keywords={[
          'best ai medical scribe',
          'best ai medical scribes',
          'best ai medical scribe for small practices',
          'best ai medical scribe for specialist physicians',
          'AI medical scribe comparison',
          'AI scribe for physicians'
        ]}
        structuredData={structuredData}
      />

      <main className="bg-background text-foreground min-h-screen transition-colors duration-300">
        
        {/* =========================================================================
            SECTION 1: HERO & EDITORIAL DISCLOSURE
            ========================================================================= */}
        <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-border">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-teal-500/10 dark:bg-teal-500/5 blur-[140px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Breadcrumb nav
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-xs font-medium text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span>Resources</span>
              <span>/</span>
              <span className="text-foreground font-bold">Best AI Medical Scribes</span>
            </nav> */}

            <div className="max-w-4xl space-y-8">
              <MotionReveal>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase">
                    <Scale className="w-3.5 h-3.5" />
                    BUYER EVALUATION GUIDE
                  </div>
                  {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/30 text-xs font-semibold text-muted-foreground">
                    <CalendarCheck className="w-3.5 h-3.5 text-teal-500" />
                    Last reviewed: October 2026
                  </div> */}
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-editorial leading-[1.15] mb-6">
                  Best AI Medical Scribes for Physicians — 8 Options to Compare in 2026
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mb-4">
                  The best AI medical scribe depends on what you actually need after the patient conversation. Some products concentrate on ambient documentation. Others extend into coding, pre-visit context, orders, evidence, or broader clinical workflow support.
                </p>

                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl">
                  This guide compares eight AI medical scribe options using the same practical questions: <strong className="font-semibold text-foreground">What does the product prepare? What can the clinician review? How far does it extend beyond the note? What does pricing look like when it is publicly available? And what type of practice appears to be the best fit?</strong>
                </p>
              </MotionReveal>

              {/* Prominent Editorial Disclosure Box */}
              <MotionReveal delay={0.1}>
                <div className="mt-8 rounded-3xl border border-teal-500/25 bg-teal-500/5 dark:bg-teal-950/20 p-6 sm:p-8 backdrop-blur-sm shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0 mt-0.5">
                      <Info className="w-4 h-4" />
                    </div>
                    <div className="space-y-3 text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                      <p>
                        <strong className="font-bold text-foreground">Editorial Disclosure:</strong> MedAlly publishes this comparison and is one of the products included below. Competitor information was checked against public vendor materials in October 2026. Features, plans, and prices can change, so verify current terms directly with each vendor before purchasing.
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <Link
                          to="/ai-medical-scribe"
                          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:text-foreground transition-colors group"
                        >
                          See MedAlly's AI Medical Scribe Product
                          <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <span className="text-border">•</span>
                        <a
                          href="#quick-table"
                          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Skip to Quick Comparison Table ↓
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: METHODOLOGY
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border bg-muted/20">
          <div className="max-w-7xl mx-auto px-6">
            <MotionReveal>
              <div className="max-w-3xl space-y-4 mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-2">
                  <Activity className="w-3.5 h-3.5" />
                  TRANSPARENCY & STANDARDS
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight">
                  How This Comparison Was Researched
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  This is a comparison of <strong className="font-semibold text-foreground">vendor-published information</strong>, not an independent clinical-performance study.
                </p>
              </div>
            </MotionReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MotionReveal delay={0.05}>
                <div className="glass-obsidian rounded-3xl border border-border p-7 h-full space-y-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Official Vendor Sources</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Capabilities, pricing, and plan details were checked against official vendor product, pricing, help-center, or release pages available in October 2026.
                  </p>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.1}>
                <div className="glass-obsidian rounded-3xl border border-border p-7 h-full space-y-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  <h3 className="text-lg font-bold text-foreground">No Competitor Testing</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    No hands-on testing of competitor products was performed for this guide. MedAlly's own product description was cross-checked against internal product-confirmed materials.
                  </p>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <div className="glass-obsidian rounded-3xl border border-border p-7 h-full space-y-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Order Is Not a Ranking</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    MedAlly appears first because it publishes this guide; the remaining seven vendors are presented alphabetically. The order is not a performance ranking.
                  </p>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <div className="glass-obsidian rounded-3xl border border-border p-7 h-full space-y-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
                    04
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Editorial Practice Fit</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    "Useful fit to investigate" and similar practice-fit notes are editorial assessments based on published capabilities—not measured superiority claims.
                  </p>
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: QUICK COMPARISON TABLE (INTERACTIVE)
            ========================================================================= */}
        <section id="quick-table" className="py-20 lg:py-28 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <MotionReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-2">
                    <Activity className="w-3.5 h-3.5" />
                    SIDE-BY-SIDE OVERVIEW
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight">
                    Quick Comparison of AI Medical Scribes
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                    Compare documentation format, beyond-the-note capabilities, verified public pricing, and recommended practice fit.
                  </p>
                </div>

                {/* Filter and search controls */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search scribes, features..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-10 pl-9 pr-4 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/40 w-full sm:w-60"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border bg-muted/30">
                    <button
                      onClick={() => setFilterCategory('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        filterCategory === 'all'
                          ? 'bg-teal-500 text-white dark:text-slate-950 shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterCategory('independent')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        filterCategory === 'independent'
                          ? 'bg-teal-500 text-white dark:text-slate-950 shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Solo / Small
                    </button>
                    <button
                      onClick={() => setFilterCategory('specialty')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        filterCategory === 'specialty'
                          ? 'bg-teal-500 text-white dark:text-slate-950 shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Specialty
                    </button>
                    <button
                      onClick={() => setFilterCategory('enterprise')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        filterCategory === 'enterprise'
                          ? 'bg-teal-500 text-white dark:text-slate-950 shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Enterprise
                    </button>
                  </div>
                </div>
              </div>
            </MotionReveal>

            {/* Responsive Table */}
            <div className="overflow-x-auto rounded-3xl border border-border bg-background shadow-xl">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="py-5 px-6 min-w-[200px]">AI medical scribe</th>
                    <th className="py-5 px-6 min-w-[240px]">Documentation</th>
                    <th className="py-5 px-6 min-w-[260px]">Beyond the note</th>
                    <th className="py-5 px-6 min-w-[250px]">Public pricing checked</th>
                    <th className="py-5 px-6 min-w-[230px]">Useful fit to investigate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredVendors.map((vendor) => (
                    <tr
                      key={vendor.id}
                      className={`transition-colors hover:bg-muted/20 ${
                        vendor.isMedAlly ? 'bg-teal-500/[0.04] dark:bg-teal-950/20' : ''
                      }`}
                    >
                      <td className="py-5 px-6 align-top">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-base text-foreground">
                              {vendor.name}
                            </span>
                            {vendor.isMedAlly && (
                              <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-teal-500/20 text-teal-600 dark:text-teal-400">
                                Publisher
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground font-light leading-snug">
                            {vendor.tagline}
                          </p>
                          <a
                            href={`#${vendor.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:text-foreground transition-colors pt-1"
                          >
                            Read review ↓
                          </a>
                        </div>
                      </td>

                      <td className="py-5 px-6 align-top text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                        {vendor.documentation}
                      </td>

                      <td className="py-5 px-6 align-top text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                        {vendor.beyondTheNote}
                      </td>

                      <td className="py-5 px-6 align-top text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                        <div className="space-y-1">
                          {vendor.publicPricing.includes(';') ? (
                            <ul className="space-y-1 text-xs font-light text-muted-foreground">
                              {vendor.publicPricing.split(';').map((p, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-teal-500 font-bold">•</span>
                                  <span className="font-medium text-foreground">{p.trim()}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className={vendor.publicPricing === 'Contact vendor' ? 'text-muted-foreground font-light italic' : 'font-semibold text-foreground'}>
                              {vendor.publicPricing}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-5 px-6 align-top text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                        <span className="inline-block rounded-lg bg-muted/40 px-3 py-1.5 text-foreground font-medium text-xs border border-border">
                          {vendor.usefulFit}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Pricing Note */}
            <div className="mt-4 flex items-start gap-2 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              <Info className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <p>
                <strong className="font-semibold text-foreground">Pricing note:</strong> Public prices above reflect official vendor pages available during this review. A monthly equivalent for an annual plan is labeled as such and should not be mistaken for month-to-month billing.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: HOW WE COMPARED AI MEDICAL SCRIBES (EVALUATION CRITERIA)
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border bg-muted/10">
          <div className="max-w-7xl mx-auto px-6">
            <MotionReveal>
              <div className="max-w-3xl space-y-4 mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  EVALUATION FRAMEWORK
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight">
                  How We Compared AI Medical Scribes
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  A useful comparison should go beyond whether a tool can convert speech into a note. We evaluated each option across six core dimensions:
                </p>
              </div>
            </MotionReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisonCriteria.map((c) => {
                const IconComponent = c.icon;
                return (
                  <MotionReveal key={c.num} delay={Number(c.num) * 0.05}>
                    <div className="glass-obsidian rounded-3xl border border-border p-7 h-full space-y-4 shadow-sm hover:border-teal-500/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-muted-foreground font-mono">0{c.num}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground pt-1">
                        {c.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>

            <div className="mt-8 p-5 rounded-2xl border border-border bg-muted/30 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              <strong className="font-semibold text-foreground">Context matters:</strong> These criteria are not a universal scorecard. A solo physician and a multi-hospital health system may reasonably choose different products. Public documentation can also omit capabilities that may be available under specific contracts, integrations, or deployments.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: DETAILED VENDOR REVIEWS (8 OPTIONS)
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 space-y-20">
            <MotionReveal>
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-2">
                  <Stethoscope className="w-3.5 h-3.5" />
                  IN-DEPTH PROFILES
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight">
                  Detailed Vendor Comparisons
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  Explore how each AI scribe operates, what is documented publicly, official pricing terms, and specific practice-fit considerations.
                </p>
              </div>
            </MotionReveal>

            {/* Individual Vendor Sections */}
            <div className="space-y-16">
              {vendors.map((v) => (
                <article
                  key={v.id}
                  id={v.id}
                  className={`scroll-mt-24 rounded-[2.5rem] border ${
                    v.isMedAlly
                      ? 'border-teal-500/40 bg-teal-500/[0.03] dark:bg-teal-950/20 shadow-xl'
                      : 'border-border bg-card/60'
                  } p-7 sm:p-12 transition-all`}
                >
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border/80 pb-6">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-editorial">
                            {v.name}
                          </h3>
                          {v.badge && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 uppercase tracking-wider">
                              {v.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-base text-muted-foreground font-light leading-relaxed mt-2">
                          {v.tagline}
                        </p>
                      </div>

                      {v.isMedAlly ? (
                        <div className="flex items-center gap-3">
                          <Link
                            to="/ai-medical-scribe"
                            className="inline-flex h-11 items-center justify-center px-5 rounded-full bg-gradient-to-r from-[#36b7b5] to-[#2da19f] text-slate-950 hover:text-slate-950 dark:text-white dark:hover:text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-all"
                          >
                            Explore MedAlly Scribe
                          </Link>
                          <Link
                            to="/pricing"
                            className="inline-flex h-11 items-center justify-center px-5 rounded-full border border-border bg-background text-foreground font-bold text-xs hover:bg-muted transition-colors"
                          >
                            Compare Plans
                          </Link>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {v.officialSources.map((src, i) => (
                            <a
                              key={i}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-background text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                            >
                              {src.label}
                              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Overview paragraphs */}
                    <div className="space-y-4 text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-4xl">
                      {v.overview.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>

                    {/* Pricing Breakdown Card */}
                    <div className="rounded-3xl border border-border bg-muted/30 p-6 sm:p-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-teal-500" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                            {v.name} Pricing
                          </h4>
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground">
                          {v.pricingDetails.label}
                        </span>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                        {v.pricingDetails.description}
                      </p>

                      {v.pricingDetails.tiers && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                          {v.pricingDetails.tiers.map((tier, idx) => (
                            <div
                              key={idx}
                              className="rounded-2xl border border-border bg-background p-5 space-y-2 shadow-sm"
                            >
                              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                {tier.name}
                              </div>
                              <div className="text-2xl font-extrabold text-foreground">
                                {tier.price}
                              </div>
                              <div className="text-xs text-muted-foreground font-light leading-relaxed">
                                {tier.note}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {v.pricingDetails.notes && (
                        <ul className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed space-y-1.5 pt-2 list-disc pl-5">
                          {v.pricingDetails.notes.map((note, nIdx) => (
                            <li key={nIdx}>{note}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Due Diligence Grid (Confirm Before Choosing & Consider If) */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Confirm Before Choosing */}
                      <div className="rounded-3xl border border-amber-500/20 bg-amber-500/[0.04] p-6 sm:p-7 space-y-3">
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                          <AlertCircle className="w-4 h-4" />
                          Confirm Before Choosing
                        </div>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          {v.confirmBeforeChoosing}
                        </p>
                      </div>

                      {/* Consider If */}
                      <div className="rounded-3xl border border-teal-500/20 bg-teal-500/[0.04] p-6 sm:p-7 space-y-3">
                        <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4" />
                          Consider {v.name} If
                        </div>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          {v.considerIf}
                        </p>
                      </div>
                    </div>

                    {/* Official Sources footer bar */}
                    <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground font-light">
                      <span className="font-bold text-foreground">Official Sources:</span>
                      {v.officialSources.map((src, sIdx) => (
                        <span key={sIdx} className="inline-flex items-center gap-1">
                          {src.isExternal ? (
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal-600 dark:text-teal-400 font-semibold hover:underline inline-flex items-center gap-0.5"
                            >
                              {src.label}
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <Link to={src.url} className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                              {src.label}
                            </Link>
                          )}
                          {sIdx < v.officialSources.length - 1 && <span className="text-border ml-2">•</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: PRACTICE FIT GUIDES (SMALL PRACTICE & SPECIALIST)
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border bg-muted/20">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <MotionReveal>
              <div className="max-w-3xl space-y-4 mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-2">
                  <Building2 className="w-3.5 h-3.5" />
                  TARGETED SHORTLISTS
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight">
                  Which AI Medical Scribe Fits Your Setting?
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  Practice size and clinical complexity fundamentally alter what you should prioritize.
                </p>
              </div>
            </MotionReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Card 1: Small Practices */}
              <MotionReveal delay={0.1}>
                <div className="glass-obsidian rounded-[2.5rem] border border-border p-8 sm:p-10 h-full space-y-6 flex flex-col justify-between shadow-sm">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                      <Building2 className="w-3.5 h-3.5" />
                      Solo Clinicians & Small Practices
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground text-editorial leading-snug">
                      Which AI Medical Scribe Is Best for a Small Practice?
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                      For a small practice, the most useful shortlist is usually different from the shortlist for a large health system. Start by comparing:
                    </p>

                    <ul className="space-y-2.5 text-sm text-muted-foreground font-light leading-relaxed pt-2">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>Monthly cost per clinician and budget transparency</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>Whether there is a free plan or realistic trial</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>Encounter or monthly note caps</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>Rapid self-service adoption without large IT implementation</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>Note structure customization and specialty template flexibility</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>Post-note handoffs and whether coding assistance is included</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-5 border-t border-border/80 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                    <p>
                      <strong className="font-semibold text-foreground">Editorial Shortlist:</strong> <strong className="font-semibold text-foreground">MedAlly</strong>, <strong className="font-semibold text-foreground">Freed</strong>, and <strong className="font-semibold text-foreground">Heidi</strong> all publish individual-access options or entry paths that make them relevant to investigate for smaller practices. That is an editorial shortlist based on public access and pricing information—not a performance ranking.
                    </p>
                  </div>
                </div>
              </MotionReveal>

              {/* Card 2: Specialist Physicians */}
              <MotionReveal delay={0.2}>
                <div className="glass-obsidian rounded-[2.5rem] border border-border p-8 sm:p-10 h-full space-y-6 flex flex-col justify-between shadow-sm">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                      <Stethoscope className="w-3.5 h-3.5" />
                      Specialist Physicians
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground text-editorial leading-snug">
                      Which AI Medical Scribe Is Best for Specialist Physicians?
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                      Specialists should look beyond generic SOAP-note generation. Important clinical questions include:
                    </p>

                    <ul className="space-y-2.5 text-sm text-muted-foreground font-light leading-relaxed pt-2">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>Can the note structure adapt to specialized procedure & exam templates?</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>Does the system preserve longitudinal context and disease staging?</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>Can it incorporate pre-encounter information and lab results?</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>Does it support ICD-10 and CPT coding depth required for complex billing?</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>Can it handle multi-problem assessments and detailed treatment planning?</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>Is the EHR integration deep enough for specialty workflows?</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-5 border-t border-border/80 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                    <p>
                      <strong className="font-semibold text-foreground">Specialist Considerations:</strong> <strong className="font-semibold text-foreground">DeepScribe</strong>'s current positioning is particularly specialty-focused (notably oncology). <strong className="font-semibold text-foreground">Abridge</strong>, <strong className="font-semibold text-foreground">Suki</strong>, <strong className="font-semibold text-foreground">Ambience</strong>, <strong className="font-semibold text-foreground">Nabla</strong>, <strong className="font-semibold text-foreground">Heidi</strong>, <strong className="font-semibold text-foreground">Freed</strong>, and <strong className="font-semibold text-foreground">MedAlly</strong> also describe different forms of specialty or workflow adaptability. Evaluate your specific specialty requirements rather than assuming one platform fits all.
                    </p>
                  </div>
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: WHAT PHYSICIANS SHOULD COMPARE BEFORE CHOOSING (7 POINTS)
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <MotionReveal>
              <div className="max-w-3xl space-y-4 mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-2">
                  <UserCheck className="w-3.5 h-3.5" />
                  BUYER DUE DILIGENCE
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight">
                  What Should Physicians Compare Before Choosing an AI Medical Scribe?
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  Before signing a contract or integrating a tool into your daily clinic schedule, use this practical 7-point evaluation checklist:
                </p>
              </div>
            </MotionReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {checklistItems.map((item, idx) => (
                <MotionReveal key={idx} delay={idx * 0.05}>
                  <div className="rounded-3xl border border-border bg-card/60 p-7 space-y-3 h-full shadow-sm">
                    <h3 className="text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMPARISON LIMITATIONS CALLOUT
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border bg-muted/20">
          <div className="max-w-5xl mx-auto px-6">
            <MotionReveal>
              <div className="rounded-[2.5rem] border border-border bg-background p-8 sm:p-12 space-y-8 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground text-editorial">
                      Comparison Limitations
                    </h3>
                    <p className="text-sm text-muted-foreground font-light mt-1">
                      Understanding the scope and boundaries of this review
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-base text-muted-foreground font-light leading-relaxed">
                  <p>
                    This guide compares what vendors publicly document; it does <strong className="font-semibold text-foreground">not</strong> measure note accuracy, clinician satisfaction, implementation quality, or real-world performance head-to-head.
                  </p>
                  <p>
                    Public pages can also understate or omit capabilities that are available only through specific plans, EHR integrations, specialties, regions, or enterprise contracts. Before choosing a product, verify:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 pt-3 text-sm text-foreground font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      The exact plan required for the capabilities you need
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      EHR compatibility and integration depth
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      Usage or encounter limits
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      Specialty and care-setting restrictions
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      Current pricing and billing commitment
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      What the clinician must review or approve before information moves forward
                    </li>
                  </ul>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: THE SHORT ANSWER & ACTION BLOCK
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border bg-gradient-to-b from-transparent via-teal-500/[0.03] to-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <MotionReveal>
              <div className="max-w-3xl space-y-4 mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  SUMMARY & NEXT STEPS
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight">
                  AI Medical Scribe Comparison: The Short Answer
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  There is no single best AI medical scribe for every physician.
                </p>
              </div>
            </MotionReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <MotionReveal delay={0.05}>
                <div className="glass-obsidian rounded-3xl border border-border p-7 h-full space-y-3 shadow-sm">
                  <h3 className="font-bold text-foreground text-base">Independent & Small Clinics</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Prioritize fast setup, transparent month-to-month pricing, and a usable free or trial tier.
                  </p>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.1}>
                <div className="glass-obsidian rounded-3xl border border-border p-7 h-full space-y-3 shadow-sm">
                  <h3 className="font-bold text-foreground text-base">Specialty Practices</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Care more about specialty-specific notes, longitudinal disease context, coding depth, and pre-visit prep.
                  </p>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <div className="glass-obsidian rounded-3xl border border-border p-7 h-full space-y-3 shadow-sm">
                  <h3 className="font-bold text-foreground text-base">Large Health Systems</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Put deep EHR integration, enterprise governance, deployment scale, and workflow breadth ahead of individual licenses.
                  </p>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <div className="glass-obsidian rounded-3xl border border-border p-7 h-full space-y-3 shadow-sm">
                  <h3 className="font-bold text-foreground text-base">Beyond-the-Note Workflow</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Physicians who want more than notes should evaluate what happens <em>after</em> the documentation is drafted.
                  </p>
                </div>
              </MotionReveal>
            </div>

            {/* MedAlly Encounter Workflow Callout */}
            <MotionReveal delay={0.25}>
              <div className="rounded-[2.5rem] border border-teal-500/30 bg-teal-500/5 dark:bg-teal-950/20 p-8 sm:p-12 space-y-6 max-w-4xl mx-auto text-center shadow-lg">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  THE MEDALLY PHILOSOPHY
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-editorial leading-tight">
                  AI Prepares. Clinicians Review. Clinicians Decide.
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                  MedAlly is designed around that broader encounter workflow: the AI prepares the documentation and related reviewable context, while the physician reviews, edits, validates, and decides what moves forward.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
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
                    to="/ai-medical-scribe"
                    className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-base transition-all duration-300 text-center"
                  >
                    See MedAlly's AI Medical Scribe
                  </Link>
                  <Link
                    to="/how-it-works"
                    className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-base transition-all duration-300 text-center"
                  >
                    See How MedAlly Works
                  </Link>
                  <Link
                    to="/pricing"
                    className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-base transition-all duration-300 text-center"
                  >
                    View MedAlly Pricing
                  </Link>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: FREQUENTLY ASKED QUESTIONS (ACCORDION)
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <MotionReveal className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <Activity className="w-3.5 h-3.5" />
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Common questions physicians ask when evaluating AI medical scribe software.
              </p>
            </MotionReveal>

            <div className="space-y-4 mb-12">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <MotionReveal key={faq.q} delay={index * 0.03}>
                    <div className="rounded-2xl border border-border bg-background/80 overflow-hidden transition-all duration-300">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-semibold text-foreground text-base sm:text-lg hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <h3 className="font-editorial text-base sm:text-lg font-bold">{faq.q}</h3>
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-teal-500' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out px-6 ${
                          isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden'
                        }`}
                      >
                        <div className="border-t border-border/50 pt-4 space-y-3">
                          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>

            <MotionReveal delay={0.2} className="text-center">
              <Link
                to="/faq"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-muted/60 border border-border text-foreground hover:bg-muted font-bold text-sm transition-all group"
              >
                View All FAQs
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MotionReveal>
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default BestAIMedicalScribesPage;
