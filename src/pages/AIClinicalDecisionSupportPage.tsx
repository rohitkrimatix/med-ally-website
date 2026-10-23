import { type FC, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  FileText,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  ShieldCheck,
  Activity,
  GitBranch,
  AlertCircle,
  ExternalLink,
  Layers,
  Search,
  BookOpen,
  FlaskConical,
  ClipboardList,
  Compass,
  CalendarCheck2,
  AlertTriangle,
  Award,
  GitMerge,
  Clock
} from 'lucide-react';
import Layout from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { MotionReveal } from '@/components/MotionReveal';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.medally.ai/ai-clinical-decision-support#webpage',
      url: 'https://www.medally.ai/ai-clinical-decision-support',
      name: 'AI Clinical Decision Support for Physicians | MedAlly',
      description:
        'See how MedAlly supports AI clinical decision support with differential-review, lab, treatment-planning, and follow-up information for physician review.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.medally.ai/#website',
        name: 'MedAlly',
        url: 'https://www.medally.ai',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.medally.ai/ai-clinical-decision-support#breadcrumb',
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
          name: 'AI Clinical Decision Support',
          item: 'https://www.medally.ai/ai-clinical-decision-support',
        },
      ],
    },
  ],
};

const capabilityRows = [
  {
    capability: 'Diagnostic assessment',
    icon: Stethoscope,
    medallyOutput:
      'Risk factors, clinical indicators, chief complaints, chief-complaint analysis, clinical findings, risk assessment, and an initial diagnosis with an ICD-10 code',
    physicianRole:
      'Review the assessment context and determine what is clinically valid',
  },
  {
    capability: 'Differential review',
    icon: Compass,
    medallyOutput:
      'Ranked diagnostic considerations with ICD-10 codes, interface labels such as High/Moderate/Low, a Primary designation, and supporting sections for clinical evidence, risk factors, findings, diagnostic criteria, and common pitfalls',
    physicianRole:
      'Interpret the differential, change which listed consideration is designated primary when appropriate, and make the final diagnosis; do not treat the relative labels as verified probability scores',
  },
  {
    capability: 'Diagnostic planning',
    icon: ClipboardList,
    medallyOutput:
      'Prioritized diagnostic tests with priority/urgency, test rationale, expected findings, and diagnostic criteria',
    physicianRole:
      'Decide which tests, if any, are appropriate',
  },
  {
    capability: 'Evidence and guideline context',
    icon: Award,
    medallyOutput:
      'An Evidence Levels view with interface sections labeled Level A, Level B, and Level C, plus a Clinical Guidelines view that can show named guideline organizations, guideline/version labels and years, key recommendations, evidence-level descriptions, applicability, and limitations',
    physicianRole:
      'Review the stated evidence and guideline context; do not assume MedAlly’s Level A/B/C interface labels map to a named external grading framework unless that mapping is confirmed',
  },
  {
    capability: 'Lab follow-up',
    icon: FlaskConical,
    medallyOutput:
      'A Lab Followup view that can organize a summary and include normal or abnormal findings when available',
    physicianRole:
      'Interpret lab-related information in the context of the patient and decide what action is appropriate',
  },
  {
    capability: 'Treatment planning',
    icon: Activity,
    medallyOutput:
      'A step-by-step treatment implementation view with sequenced steps, timing and responsible-role labels, step details, success metrics, failure metrics, and next steps',
    physicianRole:
      'Decide which treatment actions are clinically appropriate and whether the plan should be used or changed',
  },
  {
    capability: 'Follow-up',
    icon: CalendarCheck2,
    medallyOutput:
      'Follow-up information can appear in the SOAP Plan and treatment workflow, including monitoring, timing, next-step context, and patient-education information',
    physicianRole:
      'Determine the appropriate follow-up and act as needed',
  },
];

const categoryComparisonTable = [
  {
    scope: 'Clinical decision support broadly',
    focus: 'Can include alerts, reminders, order sets, reference information, diagnostic support, and other patient-specific interventions',
    verify: 'Which CDS functions are actually included and how they fit the clinical workflow',
  },
  {
    scope: 'AI-enabled clinical decision support',
    focus: 'Uses AI for one or more decision-support functions, such as organizing, synthesizing, or surfacing information relevant to review',
    verify: 'What AI contributes, what other methods are used, and what requires clinician review',
  },
  {
    scope: 'MedAlly’s verified decision-support scope',
    focus: 'Encounter-linked differential-review information, lab-related context, treatment-planning information, and follow-up context',
    verify: 'What the physician reviews, interprets, decides, and approves before work moves forward',
  },
];

const buyerEvaluationCriteria = [
  {
    area: 'Clinical inputs',
    ask: 'What patient, encounter, documentation, and lab information the system uses',
    medallyApproach: 'Uses real-time encounter listening, documented history, chief complaints, and structured clinical findings',
  },
  {
    area: 'Output',
    ask: 'What decision-support information the system prepares or surfaces',
    medallyApproach: 'Prepares structured diagnostic assessments, differential rankings, diagnostic plans, and evidence contexts for physician review',
  },
  {
    area: 'Differential support',
    ask: 'How differential-review information is presented and what the clinician is expected to validate',
    medallyApproach: 'Ranked considerations with ICD-10 codes, relative labels (High/Moderate/Low), clinical evidence, criteria, and clinician-controlled Primary selection',
  },
  {
    area: 'Lab context',
    ask: 'How lab-related information is incorporated into review',
    medallyApproach: 'Lab Followup view organizing summary, abnormal findings, and normal findings within the encounter context',
  },
  {
    area: 'Treatment-planning support',
    ask: 'What information is presented and where clinician decision-making remains required',
    medallyApproach: 'Sequenced implementation steps with timing, responsible roles, success/failure metrics; clinician makes all care decisions',
  },
  {
    area: 'Follow-up',
    ask: 'How next-step information stays connected to the encounter',
    medallyApproach: 'Integrated into SOAP Plan and treatment steps with monitoring intervals, patient education, and referrals',
  },
  {
    area: 'Evidence and currency',
    ask: 'What sources inform the output, whether clinicians can inspect them, and how their relevance and currency are maintained',
    medallyApproach: 'Structured Level A/B/C interface sections and Clinical Guidelines view with named organizations (WHO, NICE), guideline years, recommendations, and limitations',
  },
  {
    area: 'Validation and limitations',
    ask: 'What evaluation supports the intended use, what limitations are documented, and where information may be incomplete or unreliable',
    medallyApproach: 'Explicit transparent limitations on every evidence and guideline summary; no black-box autonomous claims',
  },
  {
    area: 'Clinician control',
    ask: 'What requires physician review, interpretation, approval, or action',
    medallyApproach: 'Physician reviews, validates, alters, and approves every diagnostic consideration, test, treatment, and follow-up step',
  },
  {
    area: 'Workflow connection',
    ask: 'How decision-support information relates to documentation and downstream workflow',
    medallyApproach: 'Directly linked to encounter SOAP documentation, diagnostic workspaces, and billing/coding context',
  },
  {
    area: 'Integration / handoff',
    ask: 'What happens after review and how the next practice or EHR step works',
    medallyApproach: 'Supports practice and EHR workflow handoff after explicit physician review and approval (deployment-dependent)',
  },
  {
    area: 'Scope boundaries',
    ask: 'Which CDS functions the product does and does not provide',
    medallyApproach: 'Clearly framed as review-assisted decision support; not an autonomous diagnostic device, not an automatic order placer',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Begin with the patient encounter',
    description:
      'MedAlly starts with information from the patient encounter. If the primary need is encounter listening and initial note drafting, explore MedAlly AI Medical Scribe.',
    link: '/ai-medical-scribe',
    linkText: 'Explore MedAlly AI Medical Scribe',
  },
  {
    step: '02',
    title: 'Prepare structured clinical documentation',
    description:
      'MedAlly prepares SOAP-style clinical documentation for physician review. The documentation provides encounter context that the physician can consider alongside other reviewable information.',
    link: '/clinical-documentation-ai',
    linkText: 'Explore AI Clinical Documentation',
  },
  {
    step: '03',
    title: 'Review assessment, differential, evidence, and planning context',
    description:
      'Within the Diagnostics workspace, MedAlly organizes diagnostic assessment information, ranked differential considerations, diagnostic-test planning, evidence context, and treatment plans around the encounter.',
  },
  {
    step: '04',
    title: 'Physician reviews and decides',
    description:
      'The physician interprets the information, determines what is clinically valid, and remains solely responsible for all diagnostic and therapeutic decisions.',
  },
  {
    step: '05',
    title: 'Approved work moves to EHR workflow',
    description:
      'After physician review and approval, MedAlly supports the next practice or EHR workflow step. The exact handoff method varies by deployment.',
    link: '/how-it-works',
    linkText: 'See How MedAlly Works',
  },
];

const faqs = [
  {
    q: 'What is AI clinical decision support?',
    a: 'AI clinical decision support uses artificial intelligence to help organize, synthesize, or surface information that may be relevant to clinical review and decision-making. The exact functionality varies by product.',
  },
  {
    q: 'Is AI clinical decision support the same as a clinical decision support system?',
    a: 'AI clinical decision support is part of the broader CDS category. A clinical decision support system can use AI, rule-based logic, reference content, alerts, or a combination of approaches. "AI clinical decision support" describes the use of AI within that broader decision-support workflow.',
  },
  {
    q: 'Does MedAlly provide clinical decision-support information?',
    a: 'Yes. MedAlly’s Diagnostic Assessment workspace can organize risk factors, clinical indicators, clinical findings, risk assessment, differential considerations, diagnostic planning, evidence context, treatment planning, and related review information around the encounter.',
  },
  {
    q: 'Does MedAlly make diagnoses for physicians?',
    a: 'MedAlly can display an initial diagnosis and ranked differential considerations with ICD-10 codes, but those outputs are for clinician review. The physician remains responsible for the final diagnosis, clinical interpretation, and clinical decisions.',
  },
  {
    q: 'Does MedAlly work with lab-related information?',
    a: 'Yes. MedAlly brings lab-related information into the encounter review workflow so the physician can consider it alongside the other information connected to the visit.',
  },
  {
    q: 'Does MedAlly provide treatment-planning support?',
    a: 'Yes. MedAlly can present a step-by-step treatment implementation plan with timing, responsible-role labels, step details, success and failure metrics, and next-step context. Treatment decisions and clinical actions remain with the physician.',
  },
  {
    q: 'Does MedAlly support follow-up?',
    a: 'Yes. Follow-up information can appear in the SOAP Plan and treatment workflow, including monitoring, timing, next-step context, and patient-education information. The physician determines the appropriate follow-up.',
  },
  {
    q: 'Is MedAlly an autonomous clinical decision-making system?',
    a: 'No. MedAlly is designed around physician review. It prepares and organizes information, while clinical judgment and final clinical decisions remain with the physician.',
  },
  {
    q: 'How does MedAlly connect decision support to clinical documentation?',
    a: 'MedAlly keeps decision-support information connected to the encounter workflow that also produces SOAP-style clinical documentation, allowing the physician to review clinical context around the same visit.',
  },
  {
    q: 'Can MedAlly support an EHR-connected workflow?',
    a: 'Yes. After physician review and approval, MedAlly can support the next practice or EHR workflow step. The exact handoff method varies by deployment.',
  },
];

const workspaceTabs = [
  { id: 'differential', label: 'Differential Review', icon: Compass },
  { id: 'assessment', label: 'Diagnostic Assessment', icon: Stethoscope },
  { id: 'planning', label: 'Diagnostic Plan', icon: ClipboardList },
  { id: 'evidence', label: 'Evidence & Guidelines', icon: Award },
  { id: 'labs', label: 'Lab Follow-up', icon: FlaskConical },
  { id: 'treatment', label: 'Treatment Implementation', icon: Activity },
  { id: 'soap', label: 'SOAP Note & Plan', icon: FileText },
] as const;

const AIClinicalDecisionSupportPage: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<
    'differential' | 'assessment' | 'planning' | 'evidence' | 'labs' | 'treatment' | 'soap'
  >('differential');
  const [selectedPrimaryDiagnosis, setSelectedPrimaryDiagnosis] = useState<string>('acute_bronchitis');
  const [labFilter, setLabFilter] = useState<'all' | 'abnormal' | 'normal'>('all');
  const tabsRef = useRef<HTMLDivElement>(null);

  const handlePrevTab = () => {
    const currentIndex = workspaceTabs.findIndex((t) => t.id === activeWorkspaceTab);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : workspaceTabs.length - 1;
    setActiveWorkspaceTab(workspaceTabs[newIndex].id);
    if (tabsRef.current) {
      const activeEl = tabsRef.current.children[newIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleNextTab = () => {
    const currentIndex = workspaceTabs.findIndex((t) => t.id === activeWorkspaceTab);
    const newIndex = currentIndex < workspaceTabs.length - 1 ? currentIndex + 1 : 0;
    setActiveWorkspaceTab(workspaceTabs[newIndex].id);
    if (tabsRef.current) {
      const activeEl = tabsRef.current.children[newIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <Layout>
      <SEO
        title="AI Clinical Decision Support for Physicians | MedAlly"
        description="See how MedAlly supports AI clinical decision support with differential-review, lab, treatment-planning, and follow-up information for physician review."
        url="https://www.medally.ai/ai-clinical-decision-support"
        structuredData={structuredData}
      />

      <main className="bg-background text-foreground min-h-screen transition-colors duration-300">
        
        {/* =========================================================================
            SECTION 1: HERO
            ========================================================================= */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden border-b border-border">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-teal-500/10 dark:bg-teal-500/5 blur-[140px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-4xl space-y-8 text-left">
              <MotionReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-4">
                  <Stethoscope className="w-3.5 h-3.5" />
                  AI CLINICAL DECISION SUPPORT
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-editorial leading-[1.15] mb-6">
                  AI Clinical Decision Support for Physicians — <span className="gradient-text">Information for Review, Decisions by Clinicians</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl">
                  AI clinical decision support can help organize patient and encounter information so clinicians can review relevant context when making care decisions.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mt-4">
                  MedAlly prepares <strong className="text-foreground font-medium">decision-support and differential-review information</strong>, brings <strong className="text-foreground font-medium">lab-related context</strong> into the encounter review workflow, and keeps treatment-planning and follow-up information connected to the same clinical context.
                </p>
              </MotionReveal>

              {/* Guiding Principle Badge - Consistent with FeaturesPage */}
              <MotionReveal delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-border/80 bg-muted/30 text-xs sm:text-sm font-medium text-foreground shadow-sm">
                  <Sparkles className="w-4 h-4 text-teal-500 shrink-0" />
                  <span><strong>AI prepares.</strong> Clinicians review. Clinicians decide.</span>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row gap-4">
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
                      to="/features"
                      className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-base transition-all duration-300 text-center"
                    >
                      Explore MedAlly Features
                    </Link>
                  </div>
                  <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                    Forever Free includes <strong>10 encounters per month</strong>. Renews monthly.
                  </p>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <div className="inline-flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-medium text-foreground">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    Review-assisted CDS architecture
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    Ranked differential diagnosis review
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    Preserves complete physician clinical judgment
                  </span>
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: EDUCATIONAL DEFINITION & THE REVIEW-ASSISTED PARADIGM
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border bg-muted/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left: Definition & Grounding */}
              <div className="lg:col-span-6 space-y-6">
                <MotionReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-4">
                    <BookOpen className="w-3.5 h-3.5" />
                    Educational Foundation
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                    What Is AI Clinical Decision Support?
                  </h2>
                </MotionReveal>

                <MotionReveal delay={0.1}>
                  <div className="space-y-4 text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                    <p className="text-foreground font-medium">
                      Clinical decision support is designed to provide timely information that helps inform decisions about patient care. The U.S. Agency for Healthcare Research and Quality describes CDS as providing knowledge and person-specific information at appropriate times to support health and healthcare decisions.
                    </p>
                    <p>
                      See the{' '}
                      <a
                        href="https://www.ahrq.gov/topics/clinical-decision-support-cds.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 dark:text-teal-400 font-semibold underline underline-offset-4 hover:opacity-80 inline-flex items-center gap-1"
                      >
                        AHRQ Clinical Decision Support overview
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      .
                    </p>
                    <p>
                      <strong className="text-foreground">AI clinical decision support</strong> applies artificial intelligence to help organize, surface, or prepare information that may be relevant to clinical review.
                    </p>
                    <p>
                      The exact function varies by product. Some clinical decision support systems focus on alerts, reminders, order sets, or narrow rule-based interventions. Others use AI to help synthesize larger amounts of clinical information.
                    </p>
                  </div>
                </MotionReveal>

                <MotionReveal delay={0.2}>
                  <div className="p-6 sm:p-8 rounded-3xl bg-background border border-border shadow-sm space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Review-Assisted vs. Autonomous Hype
                    </h3>
                    <p className="text-base text-foreground font-light leading-relaxed">
                      For MedAlly, AI clinical decision support is <strong className="font-semibold text-foreground">review-assisted</strong>: the system prepares supporting information for the physician, while interpretation, clinical judgment, and final decisions remain with the clinician.
                    </p>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed border-t border-border pt-3">
                      MedAlly does not make autonomous diagnoses, prescribe treatments, place orders, or override clinical judgment.
                    </p>
                  </div>
                </MotionReveal>
              </div>

              {/* Right: 4 Pillar Cards */}
              <div className="lg:col-span-6">
                <MotionReveal delay={0.2}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="p-6 rounded-2xl bg-background border border-border flex flex-col justify-between shadow-sm">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold text-foreground mb-2">Diagnostic Assessment</h4>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          Synthesizes risk factors, clinical indicators, and chief complaint analyses into a unified reviewable workspace.
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-background border border-border flex flex-col justify-between shadow-sm">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                          <Compass className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold text-foreground mb-2">Ranked Differential Review</h4>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          Surfaces ranked diagnostic considerations with ICD-10 codes, evidence criteria, and clinician primary controls.
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-background border border-border flex flex-col justify-between shadow-sm">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Award className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold text-foreground mb-2">Evidence &amp; Guidelines</h4>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          Exposes Level A/B/C interface sections and named guideline organization summaries (WHO, NICE) with applicability.
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-background border border-border flex flex-col justify-between shadow-sm">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold text-foreground mb-2">Clinician Sovereignty</h4>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          Keeps treatment plans, lab evaluations, and follow-up actions under full physician validation and approval.
                        </p>
                      </div>
                    </div>
                  </div>
                </MotionReveal>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: INTERACTIVE CLINICAL REVIEW WORKSPACE (WHAT MEDALLY SHOWS)
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <MotionReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                  <Activity className="w-3.5 h-3.5" />
                  Product-Confirmed Architecture
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                  What Does MedAlly Actually Show for Clinical Review?
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  MedAlly keeps decision-support information connected to the encounter, but the output is structured, transparent, and reviewable — not a generic black-box recommendation.
                </p>
              </MotionReveal>
            </div>

            {/* Interactive Workspace Mockup */}
            <MotionReveal delay={0.1}>
              <div className="rounded-[2.5rem] border border-border bg-card shadow-2xl overflow-hidden mb-16">
                
                {/* Workspace Header Bar */}
                <div className="p-5 sm:p-7 border-b border-border bg-muted/40 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Diagnostics Workspace</span>
                      <h3 className="text-base sm:text-lg font-bold text-foreground">Analysis &amp; Recommendations</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-background px-3.5 py-1.5 rounded-xl border border-border shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-teal-500" />
                    <span className="text-foreground font-semibold">Encounter:</span> Adult Respiratory Consultation
                  </div>
                </div>

                {/* Workspace Navigation Tabs with Navigation Arrows */}
                <div className="relative border-b border-border bg-muted/20 px-2 sm:px-4 flex items-center gap-1 sm:gap-2">
                  <button
                    type="button"
                    onClick={handlePrevTab}
                    className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 active:scale-95 transition-all shrink-0 border border-border/50 bg-background/50 shadow-sm"
                    aria-label="Previous tab"
                    title="Previous tab"
                  >
                    <ChevronLeft className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </button>

                  <div
                    ref={tabsRef}
                    className="flex overflow-x-auto gap-2 py-3 px-1 no-scrollbar scroll-smooth flex-1 items-center [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {workspaceTabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeWorkspaceTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveWorkspaceTab(tab.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                            isActive
                              ? 'bg-teal-500 text-slate-950 shadow-md'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextTab}
                    className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 active:scale-95 transition-all shrink-0 border border-border/50 bg-background/50 shadow-sm"
                    aria-label="Next tab"
                    title="Next tab"
                  >
                    <ChevronRight className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </button>
                </div>

                {/* Tab Content Panes */}
                <div className="p-6 sm:p-10 bg-background min-h-[460px]">
                  
                  {/* TAB 1: DIFFERENTIAL REVIEW */}
                  {activeWorkspaceTab === 'differential' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                        <div>
                          <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <Compass className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                            Ranked Diagnoses Based on Clinical Evidence
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground font-light mt-1">
                            Interface relative rankings (High / Moderate / Low) for physician validation. Clinicians set the primary diagnosis.
                          </p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-semibold">
                          Physician Review Active
                        </span>
                      </div>

                      {/* Differential Cards */}
                      <div className="space-y-4">
                        
                        {/* Card 1 */}
                        <div
                          className={`p-6 rounded-2xl border transition-all duration-200 ${
                            selectedPrimaryDiagnosis === 'acute_bronchitis'
                              ? 'border-teal-500/60 bg-teal-500/5 ring-1 ring-teal-500/30'
                              : 'border-border bg-card'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <span className="px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-700 dark:text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                                J20.9
                              </span>
                              <h5 className="text-base font-bold text-foreground">Acute Bronchitis, Unspecified</h5>
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                High
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {selectedPrimaryDiagnosis === 'acute_bronchitis' ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500 text-slate-950 font-bold text-xs">
                                  <Check className="w-3.5 h-3.5" /> Primary Designated
                                </span>
                              ) : (
                                <button
                                  onClick={() => setSelectedPrimaryDiagnosis('acute_bronchitis')}
                                  className="text-xs font-bold px-3 py-1 rounded-lg border border-border bg-muted hover:bg-teal-500 hover:text-slate-950 transition-colors"
                                >
                                  Set as primary
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                              <span className="font-bold text-foreground block mb-1 text-xs uppercase tracking-wider">Clinical Evidence</span>
                              <p className="text-muted-foreground font-light leading-relaxed text-xs">
                                Productive cough for 8 days, wheezing on auscultation, absence of high fevers or focal consolidation.
                              </p>
                            </div>
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                              <span className="font-bold text-foreground block mb-1 text-xs uppercase tracking-wider">Diagnostic Criteria</span>
                              <p className="text-muted-foreground font-light leading-relaxed text-xs">
                                Acute onset of cough with or without sputum in the absence of chronic bronchopulmonary disease.
                              </p>
                            </div>
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                              <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1 text-xs uppercase tracking-wider flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" /> Common Pitfalls
                              </span>
                              <p className="text-muted-foreground font-light leading-relaxed text-xs">
                                Over-prescribing antibacterial agents for viral presentations; underestimating early reactive airway disease.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Card 2 */}
                        <div
                          className={`p-6 rounded-2xl border transition-all duration-200 ${
                            selectedPrimaryDiagnosis === 'cap'
                              ? 'border-teal-500/60 bg-teal-500/5 ring-1 ring-teal-500/30'
                              : 'border-border bg-card'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <span className="px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-700 dark:text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                                J18.9
                              </span>
                              <h5 className="text-base font-bold text-foreground">Community-Acquired Pneumonia</h5>
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                Moderate
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {selectedPrimaryDiagnosis === 'cap' ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500 text-slate-950 font-bold text-xs">
                                  <Check className="w-3.5 h-3.5" /> Primary Designated
                                </span>
                              ) : (
                                <button
                                  onClick={() => setSelectedPrimaryDiagnosis('cap')}
                                  className="text-xs font-bold px-3 py-1 rounded-lg border border-border bg-muted hover:bg-teal-500 hover:text-slate-950 transition-colors"
                                >
                                  Set as primary
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                              <span className="font-bold text-foreground block mb-1 text-xs uppercase tracking-wider">Clinical Evidence</span>
                              <p className="text-muted-foreground font-light leading-relaxed text-xs">
                                Moderate tachypnea, localized crackles at right lower base; oxygen saturation 96% on room air.
                              </p>
                            </div>
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                              <span className="font-bold text-foreground block mb-1 text-xs uppercase tracking-wider">Risk Factors</span>
                              <p className="text-muted-foreground font-light leading-relaxed text-xs">
                                History of tobacco use, age &gt; 55, seasonal viral exposure.
                              </p>
                            </div>
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                              <span className="font-bold text-foreground block mb-1 text-xs uppercase tracking-wider">Diagnostic Plan Step</span>
                              <p className="text-muted-foreground font-light leading-relaxed text-xs">
                                Consider Chest PA/Lateral imaging if localized findings persist or vital signs deteriorate.
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* TAB 2: DIAGNOSTIC ASSESSMENT */}
                  {activeWorkspaceTab === 'assessment' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-border">
                        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                          <Stethoscope className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                          Diagnostic Assessment &amp; Clinical Indicators
                        </h4>
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-muted text-muted-foreground font-mono font-bold">
                          Initial Code: J20.9
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs sm:text-sm">
                        <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                            Chief Complaints
                          </span>
                          <p className="text-foreground font-medium">Persistent cough, mild shortness of breath upon exertion (8 days)</p>
                          <p className="text-muted-foreground font-light pt-2 border-t border-border text-xs leading-relaxed">
                            Analysis: Gradual onset post viral prodrome, non-hemoptytic, exacerbated by cold air.
                          </p>
                        </div>

                        <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                            Clinical Indicators &amp; Vitals
                          </span>
                          <p className="text-foreground font-medium">BP 128/82 • HR 78 • RR 18 • SpO2 97% • Temp 98.6°F</p>
                          <p className="text-muted-foreground font-light pt-2 border-t border-border text-xs leading-relaxed">
                            Bilateral mild expiratory wheezing; no stridor, no subcostal retractions noted.
                          </p>
                        </div>

                        <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                            Risk Assessment
                          </span>
                          <p className="text-foreground font-medium">Low acute severity; moderate recurrence risk</p>
                          <p className="text-muted-foreground font-light pt-2 border-t border-border text-xs leading-relaxed">
                            Comorbidities: Seasonal allergies, historical tobacco cessation (5 yrs).
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: DIAGNOSTIC PLANNING */}
                  {activeWorkspaceTab === 'planning' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-border">
                        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                          <ClipboardList className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                          Prioritized Diagnostic Plan
                        </h4>
                        <span className="text-xs text-muted-foreground font-medium">Clinician validates test necessity</span>
                      </div>

                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl border border-border bg-card flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs sm:text-sm">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                                Routine / Discretionary
                              </span>
                              <span className="font-bold text-foreground text-sm sm:text-base">Spirometry / Peak Flow</span>
                            </div>
                            <p className="text-muted-foreground font-light leading-relaxed">
                              <strong className="text-foreground">Test Rationale:</strong> Evaluate reactive airway component and reversibility if symptoms extend past 2 weeks.
                            </p>
                          </div>
                          <div className="text-muted-foreground text-right flex-shrink-0 text-xs">
                            <span className="font-medium text-foreground">Expected Finding:</span> Normal FEV1/FVC or mild reversible obstruction
                          </div>
                        </div>

                        <div className="p-5 rounded-2xl border border-border bg-card flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs sm:text-sm">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs">
                                Conditional / If Worsening
                              </span>
                              <span className="font-bold text-foreground text-sm sm:text-base">Chest Radiograph (PA &amp; Lateral)</span>
                            </div>
                            <p className="text-muted-foreground font-light leading-relaxed">
                              <strong className="text-foreground">Test Rationale:</strong> Rule out parenchymal consolidation or secondary infiltration if fever develops.
                            </p>
                          </div>
                          <div className="text-muted-foreground text-right flex-shrink-0 text-xs">
                            <span className="font-medium text-foreground">Diagnostic Criteria:</span> Absence of focal consolidation confirms bronchitis
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: EVIDENCE & GUIDELINES */}
                  {activeWorkspaceTab === 'evidence' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-border">
                        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                          <Award className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                          Evidence-Based Recommendations &amp; Best Practices
                        </h4>
                        <span className="text-xs text-muted-foreground font-medium">WHO &amp; NICE Guidelines</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
                        <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-lg bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold text-xs">
                              WHO Guideline Summary (2024)
                            </span>
                            <span className="text-muted-foreground font-mono text-xs">Level A Evidence</span>
                          </div>
                          <h5 className="font-bold text-foreground text-base">Symptomatic Management in Viral Bronchitis</h5>
                          <p className="text-muted-foreground font-light leading-relaxed">
                            <strong className="text-foreground font-medium">Key Recommendation:</strong> Routine antibacterial therapy is not recommended for uncomplicated acute bronchitis in immunocompetent adults.
                          </p>
                          <div className="pt-3 border-t border-border text-muted-foreground space-y-1.5 text-xs">
                            <p><strong className="text-foreground">Applicability:</strong> Outpatient ambulatory encounters without red-flag symptoms.</p>
                            <p><strong className="text-foreground">Limitations:</strong> Re-evaluate if immunocompromise, COPD history, or elderly age.</p>
                          </div>
                        </div>

                        <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-lg bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold text-xs">
                              NICE Clinical Guideline (CG191)
                            </span>
                            <span className="text-muted-foreground font-mono text-xs">Level B Evidence</span>
                          </div>
                          <h5 className="font-bold text-foreground text-base">Cough &amp; Airway Hyperresponsiveness</h5>
                          <p className="text-muted-foreground font-light leading-relaxed">
                            <strong className="text-foreground font-medium">Key Recommendation:</strong> Consider short-acting bronchodilator trial for patients with demonstrable bronchospasm or nocturnal cough.
                          </p>
                          <div className="pt-3 border-t border-border text-muted-foreground space-y-1.5 text-xs">
                            <p><strong className="text-foreground">Applicability:</strong> Adults with auscultatory wheeze or cough-variant features.</p>
                            <p><strong className="text-foreground">Limitations:</strong> Discontinue if no symptomatic improvement within 48–72 hours.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: LAB FOLLOW-UP */}
                  {activeWorkspaceTab === 'labs' && (
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
                        <div>
                          <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <FlaskConical className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                            Lab Results Analysis &amp; Recommendations
                          </h4>
                          <p className="text-xs text-muted-foreground font-light mt-1">
                            Encounter-linked lab context for physician review and interpretation.
                          </p>
                        </div>

                        {/* Filter Toggles */}
                        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted border border-border text-xs">
                          {(['all', 'abnormal', 'normal'] as const).map((mode) => (
                            <button
                              key={mode}
                              onClick={() => setLabFilter(mode)}
                              className={`px-3 py-1 rounded-lg font-bold uppercase tracking-wider text-[11px] transition-all ${
                                labFilter === mode
                                  ? 'bg-background text-teal-600 dark:text-teal-400 shadow-sm border border-border/80'
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 text-xs sm:text-sm">
                        {(labFilter === 'all' || labFilter === 'abnormal') && (
                          <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                                <AlertTriangle className="w-4 h-4" /> Abnormal Finding Context
                              </span>
                              <span className="text-muted-foreground text-xs">Prior Panel (30d)</span>
                            </div>
                            <p className="text-foreground font-medium">Mild Eosinophilia (5.8%) noted on prior differential</p>
                            <p className="text-muted-foreground font-light leading-relaxed">
                              Context: Correlates with reported history of atopic rhinitis and seasonal allergic triggers. Physician to evaluate relevance to current bronchial presentation.
                            </p>
                          </div>
                        )}

                        {(labFilter === 'all' || labFilter === 'normal') && (
                          <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" /> Normal Findings Summary
                              </span>
                              <span className="text-muted-foreground text-xs">Recent Panel</span>
                            </div>
                            <p className="text-foreground font-medium">Basic Metabolic Panel &amp; Inflammatory Markers within expected baseline</p>
                            <p className="text-muted-foreground font-light leading-relaxed">
                              Serum creatinine 0.9 mg/dL, eGFR &gt; 90, electrolytes normal.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 6: TREATMENT IMPLEMENTATION */}
                  {activeWorkspaceTab === 'treatment' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-border">
                        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                          <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                          Step-by-Step Implementation Plan
                        </h4>
                        <span className="text-xs text-muted-foreground font-medium">Physician retains final prescription &amp; treatment decisions</span>
                      </div>

                      <div className="space-y-4 text-xs sm:text-sm">
                        <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground flex items-center gap-2 text-sm sm:text-base">
                              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">1</span>
                              Supportive Care &amp; Hydration Strategy
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-semibold text-xs">Immediate • Patient</span>
                          </div>
                          <p className="text-muted-foreground font-light leading-relaxed">
                            <strong className="text-foreground">Step Details:</strong> Oral hydration, honey/lozenges for cough reflex, humidification. Avoid exposure to smoke or aerosol irritants.
                          </p>
                          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border text-muted-foreground text-xs">
                            <div><strong className="text-foreground">Success Metric:</strong> Reduction in nocturnal cough frequency</div>
                            <div><strong className="text-foreground">Next Steps:</strong> Transition to PRN antitussive if severe disruption continues</div>
                          </div>
                        </div>

                        <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground flex items-center gap-2 text-sm sm:text-base">
                              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">2</span>
                              Targeted Bronchodilator Trial (Physician Review)
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-semibold text-xs">Days 1–5 • Clinician Decision</span>
                          </div>
                          <p className="text-muted-foreground font-light leading-relaxed">
                            <strong className="text-foreground">Step Details:</strong> Albuterol HFA 90 mcg 1–2 puffs q4–6h PRN for bronchospastic cough or wheezing.
                          </p>
                          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border text-muted-foreground text-xs">
                            <div><strong className="text-foreground">Success Metric:</strong> Rapid relief of dyspnea and wheeze</div>
                            <div><strong className="text-foreground">Failure Metric:</strong> Persistent bronchospasm &gt; 5 days; re-evaluate asthma</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 7: SOAP PLAN & FOLLOW-UP */}
                  {activeWorkspaceTab === 'soap' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-border">
                        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                          <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                          Encounter SOAP Note Assessment &amp; Plan
                        </h4>
                        <span className="text-xs px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold">
                          Connected Context
                        </span>
                      </div>

                      <div className="p-6 rounded-2xl border border-border bg-muted/20 space-y-4 text-xs sm:text-sm font-mono">
                        <div className="space-y-1.5">
                          <span className="font-bold text-teal-600 dark:text-teal-400 font-sans uppercase text-xs tracking-wider block">
                            Assessment:
                          </span>
                          <p className="text-foreground font-medium">
                            1. Acute Bronchitis (ICD-10: J20.9) — Clinical course consistent with post-viral airway inflammation; no signs of focal consolidation.
                          </p>
                        </div>

                        <div className="space-y-2 pt-4 border-t border-border">
                          <span className="font-bold text-teal-600 dark:text-teal-400 font-sans uppercase text-xs tracking-wider block">
                            Plan:
                          </span>
                          <div className="space-y-1.5 text-muted-foreground font-sans text-xs sm:text-sm leading-relaxed">
                            <p><strong className="text-foreground">Medications:</strong> Albuterol HFA Inhaler 90mcg, 1-2 puffs q4-6h PRN wheeze/cough. Guaifenesin 600mg PO q12h PRN.</p>
                            <p><strong className="text-foreground">Tests / Procedures:</strong> None today. Chest radiograph ordered conditionally if fever &gt; 101°F or hemoptysis occurs.</p>
                            <p><strong className="text-foreground">Patient Education:</strong> Counseled on expected 10–14 day viral cough duration, warning signs, and hydration.</p>
                            <p><strong className="text-foreground">Follow-up:</strong> Clinic re-evaluation in 2 weeks if cough not significantly improved, or sooner for worsening SOB.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </MotionReveal>

            {/* Verified Capabilities Table - Styled with FeaturesPage table pattern */}
            <MotionReveal delay={0.2}>
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-foreground font-bold text-xl sm:text-2xl text-editorial">
                  <ClipboardList className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h3>Verified MedAlly Decision-Support Capabilities</h3>
                </div>

                <div className="rounded-3xl border border-border bg-background shadow-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                          <th className="p-5 sm:p-6 font-bold w-1/4">Capability</th>
                          <th className="p-5 sm:p-6 font-bold w-1/2 text-teal-600 dark:text-teal-400">What MedAlly Prepares for Review</th>
                          <th className="p-5 sm:p-6 font-bold w-1/4 text-foreground">Physician Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-xs sm:text-sm">
                        {capabilityRows.map((row, idx) => {
                          const Icon = row.icon;
                          return (
                            <tr key={idx} className="hover:bg-muted/10 transition-colors">
                              <td className="p-5 sm:p-6 font-bold text-foreground align-top">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <span>{row.capability}</span>
                                </div>
                              </td>
                              <td className="p-5 sm:p-6 text-muted-foreground font-light leading-relaxed align-top">
                                {row.medallyOutput}
                              </td>
                              <td className="p-5 sm:p-6 text-foreground font-medium align-top">
                                {row.physicianRole}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Label Context Callout */}
                <div className="p-6 rounded-2xl bg-muted/30 border border-border text-xs sm:text-sm space-y-2">
                  <p className="font-bold text-foreground flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    Label Context &amp; Evidence Grounding Note
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    <strong className="text-foreground">High/Moderate/Low</strong> and <strong className="text-foreground">Level A/B/C</strong> are interface labels visible in MedAlly. This page does not assign probability thresholds to the relative diagnostic labels or map the Level A/B/C interface labels to a named external grading framework. Separately, the Clinical Guidelines view can show source-specific evidence labels and descriptions associated with named guideline organizations.
                  </p>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: HOW AI FITS WITHIN CLINICAL DECISION SUPPORT
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-muted/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <MotionReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                  <Layers className="w-3.5 h-3.5" />
                  Category Context
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                  How AI Fits Within Clinical Decision Support
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  Clinical decision support is a broad category, and <strong className="text-foreground font-medium">AI is one approach that can be used within it</strong>. The important distinction is not whether a system is &quot;AI&quot; or &quot;traditional,&quot; but what functions it actually provides and how clinicians are expected to use the output.
                </p>
              </MotionReveal>
            </div>

            <MotionReveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-background shadow-xl overflow-hidden mb-10">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                        <th className="p-5 sm:p-6 font-bold w-1/4">Scope</th>
                        <th className="p-5 sm:p-6 font-bold w-1/2 text-teal-600 dark:text-teal-400">Typical Focus</th>
                        <th className="p-5 sm:p-6 font-bold w-1/4 text-foreground">What to Verify</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-xs sm:text-sm">
                      {categoryComparisonTable.map((item, idx) => (
                        <tr key={idx} className="hover:bg-muted/10 transition-colors">
                          <td className="p-5 sm:p-6 font-bold text-foreground align-top">
                            {item.scope}
                          </td>
                          <td className="p-5 sm:p-6 text-muted-foreground font-light leading-relaxed align-top">
                            {item.focus}
                          </td>
                          <td className="p-5 sm:p-6 text-foreground font-medium align-top">
                            {item.verify}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="p-8 rounded-[2.5rem] bg-background border border-border shadow-sm flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-foreground">Verified Scope Boundaries</h4>
                  <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                    MedAlly should not be assumed to provide every capability associated with the broader clinical decision support system category. Its verified role is to <strong className="text-foreground font-medium">prepare and organize reviewable information around the encounter</strong>.
                  </p>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: ENCOUNTER INTEGRATION WORKFLOW
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <MotionReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                  <GitBranch className="w-3.5 h-3.5" />
                  Clinical Integration
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                  How Does MedAlly’s AI Clinical Decision Support Fit Into the Encounter?
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  MedAlly’s decision-support capability sits directly inside the natural sequence of physician practice.
                </p>
              </MotionReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {workflowSteps.map((step, idx) => (
                <MotionReveal key={idx} delay={idx * 0.1}>
                  <div className="p-6 sm:p-7 rounded-[2rem] bg-muted/10 border border-border h-full flex flex-col justify-between shadow-sm relative group hover:border-teal-500/40 transition-colors">
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 font-mono font-bold flex items-center justify-center text-sm">
                        {step.step}
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {step.link && (
                      <div className="pt-4 mt-4 border-t border-border">
                        <Link
                          to={step.link}
                          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:text-foreground transition-colors group"
                        >
                          {step.linkText}
                          <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    )}
                  </div>
                </MotionReveal>
              ))}
            </div>

            <MotionReveal delay={0.3}>
              <div className="mt-14 text-center">
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-muted/60 border border-border text-foreground hover:bg-muted font-bold text-sm transition-all group"
                >
                  See How MedAlly Works
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: BUYER EVALUATION FRAMEWORK
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-muted/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <MotionReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                  <Search className="w-3.5 h-3.5" />
                  Buyer &amp; Physician Evaluation
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                  What Should Physicians Evaluate in AI Clinical Decision Support?
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  The phrase &quot;AI-powered&quot; does not explain how a clinical decision-support product actually works. Clarify these 12 critical areas before selecting a CDS solution:
                </p>
              </MotionReveal>
            </div>

            <MotionReveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-background shadow-xl overflow-hidden mb-12">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                        <th className="p-5 sm:p-6 font-bold w-1/4">Evaluation Area</th>
                        <th className="p-5 sm:p-6 font-bold w-1/3 text-teal-600 dark:text-teal-400">What to Clarify</th>
                        <th className="p-5 sm:p-6 font-bold w-5/12 text-foreground">MedAlly Approach</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-xs sm:text-sm">
                      {buyerEvaluationCriteria.map((item, idx) => (
                        <tr key={idx} className="hover:bg-muted/10 transition-colors">
                          <td className="p-5 sm:p-6 font-bold text-foreground align-top">
                            {item.area}
                          </td>
                          <td className="p-5 sm:p-6 text-muted-foreground font-light leading-relaxed align-top">
                            {item.ask}
                          </td>
                          <td className="p-5 sm:p-6 text-foreground font-medium align-top">
                            {item.medallyApproach}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="p-8 sm:p-10 rounded-[2.5rem] bg-background border border-border shadow-sm space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground text-editorial flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  Evidence Traceability &amp; Currency Inspection
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                  MedAlly can present structured evidence-level summaries with evidence criteria, examples, limitations, and clinical applicability. Its Clinical Guidelines view can also display named guideline organizations, guideline/version labels and years, key recommendations, evidence-level descriptions, applicability, and limitations. Teams that require direct source-document links, article-level citations, or publication-level traceability should confirm how those references are exposed in their workflow or deployment.
                </p>
                <p className="text-xs sm:text-sm text-foreground font-medium border-t border-border pt-3">
                  The most important distinction is whether AI output is presented as information to review or as a substitute for clinical judgment. With MedAlly, clinical judgment remains with the physician.
                </p>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: WHERE MEDALLY FITS ACROSS THE CLINICAL WORKFLOW
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <MotionReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-4">
                    <Compass className="w-3.5 h-3.5" />
                    Holistic Practice Fit
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                    Where Does MedAlly Fit?
                  </h2>
                  <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
                    MedAlly uses AI clinical decision support as one part of a broader physician workflow that connects encounter context, SOAP-style documentation, reviewable clinical information, treatment and follow-up context, physician review, and the approved next workflow step.
                  </p>
                  <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                    The physician remains responsible for interpreting the information, determining diagnosis, treatment, and follow-up, and deciding what is ready to move forward.
                  </p>
                </MotionReveal>

                <MotionReveal delay={0.1}>
                  <div className="pt-2">
                    <Link
                      to="/clinical-workflow-software"
                      className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-base transition-all duration-300 text-center"
                    >
                      Explore Clinical Workflow Software
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </MotionReveal>
              </div>

              <div className="lg:col-span-5">
                <MotionReveal delay={0.2}>
                  <div className="p-8 sm:p-10 rounded-[2.5rem] bg-muted/10 border border-border space-y-6 shadow-xl">
                    <h3 className="text-xl font-bold text-foreground text-editorial flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      Can Physicians Try MedAlly Free?
                    </h3>
                    <p className="text-3xl sm:text-4xl font-extrabold text-foreground text-editorial">
                      Yes. <span className="text-teal-600 dark:text-teal-400">10 encounters</span> per month.
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                      Forever Free includes 10 clinical encounters per month. One MedAlly session counts as one encounter, and the free allowance renews monthly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a
                        href="https://app.medally.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center justify-center px-6 rounded-full bg-gradient-to-r from-[#36b7b5] to-[#2da19f] text-slate-950 hover:text-slate-950 dark:text-white dark:hover:text-white font-bold shadow-xl hover:scale-[1.02] transition-all duration-300 text-center group"
                      >
                        Start MedAlly Free
                      </a>
                      <Link
                        to="/pricing"
                        className="inline-flex h-12 items-center justify-center px-6 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-base transition-all duration-300 text-center"
                      >
                        View Pricing
                      </Link>
                    </div>
                  </div>
                </MotionReveal>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: FAQS
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-background">
          <div className="max-w-4xl mx-auto px-6">
            
            <MotionReveal className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <Activity className="w-3.5 h-3.5" />
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Frequently Asked Questions About AI Clinical Decision Support
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Key answers on clinical validation, decision boundaries, EHR workflows, and product features.
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

            <MotionReveal delay={0.3} className="text-center">
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

        {/* =========================================================================
            SECTION 9: BOTTOM CONVERSION CTA (Consistent with FeaturesPage)
            ========================================================================= */}
        <section className="py-24 lg:py-36 relative overflow-hidden bg-muted/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(54,183,181,0.08),transparent_60%)] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <GitMerge className="w-3.5 h-3.5" />
                Unified Clinical Decision Review
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Use AI to Support the Review — <span className="gradient-text">Keep Clinical Decisions With the Physician</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-10">
                MedAlly keeps decision-support context connected to documentation, labs, treatment-planning information, follow-up, and the broader encounter workflow while leaving clinical judgment with the physician.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                  to="/how-it-works"
                  className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-base transition-all text-center"
                >
                  See How MedAlly Works
                </Link>
                <Link
                  to="/features"
                  className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/30 backdrop-blur-md text-foreground hover:text-foreground font-bold hover:bg-muted/60 hover:border-border/80 transition-all duration-300 text-center"
                >
                  Explore Features
                </Link>
              </div>
            </MotionReveal>

            {/* Quick Navigation Footer Links */}
            <MotionReveal delay={0.2}>
              <div className="pt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-muted-foreground border-t border-border/60 max-w-2xl mx-auto mt-12">
                <Link to="/" className="hover:text-teal-600 dark:text-teal-400 transition-colors">
                  MedAlly Platform
                </Link>
                <span>•</span>
                <Link to="/features" className="hover:text-teal-600 dark:text-teal-400 transition-colors">
                  Features
                </Link>
                <span>•</span>
                <Link to="/how-it-works" className="hover:text-teal-600 dark:text-teal-400 transition-colors">
                  How It Works
                </Link>
                <span>•</span>
                <Link to="/pricing" className="hover:text-teal-600 dark:text-teal-400 transition-colors">
                  Pricing
                </Link>
                <span>•</span>
                <Link to="/clinical-workflow-software" className="hover:text-teal-600 dark:text-teal-400 transition-colors">
                  Clinical Workflow
                </Link>
              </div>
            </MotionReveal>
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default AIClinicalDecisionSupportPage;
