import { type FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Workflow,
  FileText,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Database,
  Edit3,
  Check,
  ShieldCheck,
  Stethoscope,
  Tag,
  Clock,
  Activity,
  CheckSquare,
  GitBranch,
  Building2,
  Sliders,
  AlertCircle,
  Eye,
  Settings2,
  Share2,
  BarChart3,
  CalendarCheck2,
  ArrowUpRight
} from 'lucide-react';
import Layout from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { MotionReveal } from '@/components/MotionReveal';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.medally.ai/clinical-workflow-software#webpage',
      url: 'https://www.medally.ai/clinical-workflow-software',
      name: 'Clinical Workflow Software for Physicians | MedAlly',
      description:
        'Learn what clinical workflow software should support, how to evaluate it, and where MedAlly fits across documentation, review, coding, follow-up, and handoff.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.medally.ai/#website',
        name: 'MedAlly',
        url: 'https://www.medally.ai',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.medally.ai/clinical-workflow-software#breadcrumb',
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
          name: 'Clinical Workflow Software',
          item: 'https://www.medally.ai/clinical-workflow-software',
        },
      ],
    },
  ],
};

const problemCapabilityMatrix = [
  {
    problem: 'Documentation takes too many separate steps',
    capability: 'Encounter capture, note preparation, editing, and clinician review',
    category: 'Documentation',
    icon: FileText,
    medallyFits: 'Encounter listening, SOAP-style note preparation, and fast editing interface',
  },
  {
    problem: 'Clinicians cannot easily see what requires review',
    capability: 'Review queues, status visibility, clear clinician-validation steps',
    category: 'Review & Oversight',
    icon: Eye,
    medallyFits: 'Structured review panes for notes, differentials, labs, and coding before approval',
  },
  {
    problem: 'Follow-up work becomes disconnected from the encounter',
    capability: 'Follow-up capture, ownership, status, and next-step workflow',
    category: 'Care Continuity',
    icon: CalendarCheck2,
    medallyFits: 'Treatment-planning and follow-up context linked directly to the encounter note',
  },
  {
    problem: 'Coding information is prepared separately from the clinical work',
    capability: 'Coding context tied to the reviewed encounter',
    category: 'Coding & Billing',
    icon: Tag,
    medallyFits: 'ICD-10/CPT coding context and billing-related information organized for validation',
  },
  {
    problem: 'Work has to move between multiple systems',
    capability: 'Integration, export, handoff, or transfer methods',
    category: 'Handoff & EHR',
    icon: GitBranch,
    medallyFits: 'Supports practice / EHR workflow handoff after physician review (deployment-dependent)',
  },
  {
    problem: 'Staff lose visibility into where work or patients are in a process',
    capability: 'Task/status coordination, patient-flow visibility, notifications, or routing',
    category: 'Operations',
    icon: Building2,
    medallyFits: 'Category capability; evaluate specialized operational routing if primary focus',
  },
  {
    problem: 'Administrative work slows clinical operations',
    capability: 'Scheduling, intake, authorization, referral, or revenue-cycle workflow support, where relevant',
    category: 'Administration',
    icon: Settings2,
    medallyFits: 'Category capability; evaluate specialized administrative platforms where needed',
  },
];

const categoryComparison = [
  {
    name: 'AI Medical Scribe',
    focus: 'Capturing the encounter and helping prepare a note draft',
    scope: 'One part of the documentation workflow',
    link: '/ai-medical-scribe',
    linkText: 'Explore AI Medical Scribe',
    badge: 'Single-Purpose Capture',
  },
  {
    name: 'AI Clinical Documentation',
    focus: 'Structuring, reviewing, and editing clinical documentation',
    scope: 'Documentation-focused workflow',
    link: '/clinical-documentation-ai',
    linkText: 'Explore Clinical Documentation AI',
    badge: 'Structured Note Workflow',
  },
  {
    name: 'Clinical Workflow Software',
    focus: 'Coordinating multiple clinical tasks, reviews, handoffs, or process stages',
    scope: 'Broader than documentation alone',
    linkText: 'Current Category Guide',
    badge: 'Encounter & Task Coordination',
    isCurrent: true,
  },
  {
    name: 'AI Clinical Decision Support',
    focus: 'Organizing differential-review, lab, treatment-planning, and follow-up context for clinician validation',
    scope: 'Decision-support & differential review',
    link: '/ai-clinical-decision-support',
    linkText: 'Explore AI Clinical Decision Support',
    badge: 'Review-Assisted CDS',
  },
  {
    name: 'AI Medical Coding',
    focus: 'Preparing ICD-10/CPT and billing information in clinical context for review',
    scope: 'Encounter-linked coding workflow',
    link: '/ai-medical-coding',
    linkText: 'Explore AI Medical Coding',
    badge: 'Review-Assisted Coding',
  },
  {
    name: 'Healthcare Workflow Software',
    focus: 'Clinical plus potentially administrative and operational workflows',
    scope: 'Often the broadest term',
    badge: 'Enterprise Operations',
  },
];

const evaluationAreas = [
  {
    id: 'documentation',
    title: 'Documentation',
    icon: FileText,
    ask: 'A realistic sample draft and the physician editing/review process',
    guidance:
      'Inspect whether the output is structured (e.g. SOAP format), how quickly clinicians can modify sections, and whether drafting preserves clinical context without clutter.',
  },
  {
    id: 'review',
    title: 'Clinician Review',
    icon: UserCheck,
    ask: 'Which outputs require clinician validation and how pending work is identified',
    guidance:
      'Ensure AI drafts remain uncommitted until verified. Look for clear review flags, diff visibility, and explicit sign-off gates.',
  },
  {
    id: 'follow-up',
    title: 'Follow-Up',
    icon: CalendarCheck2,
    ask: 'How a follow-up action is created, assigned, recorded, or tracked, where supported',
    guidance:
      'Verify how patient instructions, interval tests, and future visits stay linked to the encounter rather than scattered across sticky notes or disconnected inboxes.',
  },
  {
    id: 'coding',
    title: 'Coding Context',
    icon: Tag,
    ask: 'How coding information is connected to the encounter and what must be reviewed',
    guidance:
      'Examine whether ICD-10 and CPT suggestions reflect actual documented findings and how physicians or billing specialists validate suggestions prior to billing handoff.',
  },
  {
    id: 'handoff',
    title: 'Handoff Methods',
    icon: Share2,
    ask: 'The actual method used to move approved work to the next system or workflow step',
    guidance:
      'Demand clarification on how approved documentation and codes reach the EHR or practice management software in your specific deployment setting.',
  },
  {
    id: 'integration',
    title: 'Integration Scope',
    icon: GitBranch,
    ask: 'Which systems are supported, what setup is required, and what varies by deployment',
    guidance:
      'Check technical prerequisites, API availability, local client vs browser extension architectures, and IT involvement required before launch.',
  },
  {
    id: 'implementation',
    title: 'Implementation & Training',
    icon: Sliders,
    ask: 'Required configuration, training, workflow changes, and responsibilities',
    guidance:
      'Identify onboarding time, template customization requirements, and how the tool adapts to individual specialty workflows.',
  },
  {
    id: 'governance',
    title: 'Governance & Roles',
    icon: ShieldCheck,
    ask: 'Which actions are automated, which require approval, and how user roles are handled',
    guidance:
      'Confirm where automation stops. Ensure clinical judgment, prescription ordering, and final chart commitments remain strictly with licensed clinicians.',
  },
  {
    id: 'measurement',
    title: 'Measurement & Metrics',
    icon: BarChart3,
    ask: 'Which workflow outcomes the practice can monitor after implementation',
    guidance:
      'Ask what visibility practice managers receive into encounter completion status, review bottlenecks, and adoption across clinical teams.',
  },
];

const demoSteps = [
  {
    step: '01',
    title: 'Information Ingestion',
    question: 'What information enters the workflow?',
    detail: 'Demonstrate audio encounter capture, patient history inputs, and prior context ingestion during a live or mock conversation.',
  },
  {
    step: '02',
    title: 'AI Preparation & Synthesis',
    question: 'What does the software prepare or change?',
    detail: 'Inspect the generation of SOAP notes, lab summaries, differential review considerations, and coding recommendations.',
  },
  {
    step: '03',
    title: 'Physician Review Queue',
    question: 'What must the clinician review?',
    detail: 'Identify where the draft surfaces, how pending items are marked, and how the clinician inspects clinical nuances.',
  },
  {
    step: '04',
    title: 'Editing & Exception Handling',
    question: 'What happens when the clinician edits or rejects an output?',
    detail: 'Test inline editing speed, rejecting unwanted suggestions, and correcting clinical details with zero friction.',
  },
  {
    step: '05',
    title: 'Follow-Up & Coding Linkage',
    question: 'How are follow-up and coding work handled?',
    detail: 'Verify that treatment plans, patient instructions, and ICD-10/CPT coding context align precisely with the validated visit.',
  },
  {
    step: '06',
    title: 'Downstream Handoff',
    question: 'How does approved work reach the next step?',
    detail: 'Observe the validated package moving into the EHR or next practice workflow step based on the deployment architecture.',
  },
  {
    step: '07',
    title: 'Deployment & Configuration',
    question: 'What requires configuration before go-live?',
    detail: 'Confirm IT prerequisites, template alignment, user permission setup, and ongoing maintenance expectations.',
  },
];

const rolloutChecklist = [
  {
    title: 'Workflow boundaries',
    desc: 'Document which parts of the current process the software will support and which remain outside the product.',
    icon: Workflow,
  },
  {
    title: 'Physician responsibilities',
    desc: 'Define what clinicians must review, edit, validate, or approve before work moves forward.',
    icon: UserCheck,
  },
  {
    title: 'Integration and handoff',
    desc: 'Confirm the actual systems involved, the transfer method, implementation requirements, and any deployment-specific limitations.',
    icon: GitBranch,
  },
  {
    title: 'Follow-up ownership',
    desc: 'Clarify who is responsible for follow-up actions and where their status is tracked.',
    icon: CalendarCheck2,
  },
  {
    title: 'Coding and billing review',
    desc: 'Establish who validates coding and billing-related information before use.',
    icon: Tag,
  },
  {
    title: 'Training and change management',
    desc: 'Identify what clinicians and staff need to learn and whether the existing workflow must change.',
    icon: Sliders,
  },
];

const faqs = [
  {
    q: 'What should a practice evaluate before choosing clinical workflow software?',
    a: 'Start with the workflow problem, then ask vendors to demonstrate the actual process: what enters the system, what the software prepares, what clinicians must review, how exceptions are handled, and how approved work reaches the next step.',
  },
  {
    q: 'How is encounter documentation different from workflow coordination?',
    a: 'Encounter documentation focuses on capturing and structuring the clinical note. Workflow coordination is broader and can include review responsibilities, follow-up, task or status management, coding, handoff, integration, and other steps surrounding the encounter.',
  },
  {
    q: 'Is healthcare workflow software the same as clinical workflow software?',
    a: 'Not always. The terms can overlap, but healthcare workflow software may include broader administrative and operational processes in addition to clinician-facing clinical workflows.',
  },
  {
    q: 'What should a practice confirm about EHR handoff?',
    a: 'Confirm the exact transfer method, which systems are supported, what requires clinician approval, what setup is needed, and which behaviors vary by deployment. Do not assume that "EHR integration" means automatic chart commitment.',
  },
  {
    q: 'How can a practice test whether software fits its workflow?',
    a: 'Use a realistic fictional or de-identified scenario and ask the vendor to demonstrate the complete path from input through review, edits, exceptions, approval, and downstream handoff.',
  },
  {
    q: 'Where does MedAlly fit within clinical workflow software?',
    a: 'MedAlly focuses on the physician encounter workflow: encounter listening, SOAP-style documentation, reviewable clinical information, treatment/follow-up support, ICD-10/CPT and billing-related information, physician review, and the next workflow step after approval.',
    linkText: 'See How MedAlly Works',
    linkHref: '/how-it-works',
    postLinkText: ' for the detailed encounter sequence.',
  },
  {
    q: 'Does MedAlly replace physician review?',
    a: 'No. MedAlly prepares and organizes information for review. Clinical judgment and final clinical decisions remain with the physician.',
  },
  {
    q: 'Can MedAlly support an EHR-connected workflow?',
    a: 'MedAlly can support practice / EHR workflow handoff after physician review and approval. The exact integration and handoff method vary by deployment.',
    linkText: 'Explore MedAlly Features',
    linkHref: '/features',
    postLinkText: ' for the full capability overview.',
  },
];

const ClinicalWorkflowSoftwarePage: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'soap' | 'labs' | 'treatment' | 'coding' | 'handoff'>('soap');
  const [selectedArea, setSelectedArea] = useState<string>('documentation');
  const [filterProblem, setFilterProblem] = useState<string>('all');
  const [isApproved, setIsApproved] = useState(false);

  const filteredMatrix =
    filterProblem === 'all'
      ? problemCapabilityMatrix
      : problemCapabilityMatrix.filter((item) => item.category.toLowerCase().includes(filterProblem.toLowerCase()));

  return (
    <Layout>
      <SEO
        title="Clinical Workflow Software for Physicians | MedAlly"
        description="Learn what clinical workflow software should support, how to evaluate it, and where MedAlly fits across documentation, review, coding, follow-up, and handoff."
        url="https://www.medally.ai/clinical-workflow-software"
        image="/images/medally/clinical-workflow-real.png"
        imageAlt="MedAlly clinical workflow software interface for physician review, documentation, coding, and EHR handoff"
        keywords={[
          'clinical workflow software',
          'healthcare workflow software',
          'medical workflow software',
          'clinical workflow management software',
          'clinical workflow',
        ]}
        structuredData={structuredData}
      />

      <main className="bg-background text-foreground min-h-screen transition-colors duration-300">
        
        {/* =========================================================================
            SECTION 1: HERO
            ========================================================================= */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden border-b border-border">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-teal-500/10 dark:bg-teal-500/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Copy & CTAs */}
              <div className="lg:col-span-7 space-y-8 text-left">
                <MotionReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-4 shadow-sm">
                    <Workflow className="w-3.5 h-3.5" />
                    CLINICAL WORKFLOW SOFTWARE
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-editorial leading-[1.15] mb-6">
                    Clinical Workflow Software for Physicians Across the Patient Encounter
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                    Clinical workflow software helps coordinate the tasks, information, reviews, and handoffs that make up clinical work.
                  </p>
                  <p className="text-base sm:text-lg text-muted-foreground/90 font-normal leading-relaxed max-w-2xl mt-4">
                    The category is broader than documentation alone. Depending on the product and care setting, clinical workflow software can support areas such as encounter documentation, patient flow, task coordination, clinical review, follow-up, coding, operational handoffs, and connections between systems.
                  </p>
                  <div className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/20 max-w-2xl mt-4">
                    <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed">
                      <strong className="text-teal-600 dark:text-teal-400">MedAlly focuses on the physician encounter workflow</strong> — from listening during the visit through documentation, reviewable clinical information, coding and follow-up work, physician approval, and the next practice or EHR workflow step.
                    </p>
                  </div>
                </MotionReveal>

                <MotionReveal delay={0.1}>
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
                        to="/how-it-works"
                        className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-base transition-all duration-300"
                      >
                        See How MedAlly Works
                      </Link>
                    </div>
                    <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                      Forever Free includes <strong>10 clinical encounters each month</strong>.
                    </p>
                  </div>
                </MotionReveal>

                <MotionReveal delay={0.2}>
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-border/80 bg-muted/30 text-xs sm:text-sm font-medium text-foreground shadow-sm">
                    <Sparkles className="w-4 h-4 text-teal-500 shrink-0" />
                    <span><strong>AI prepares.</strong> Clinicians review. Clinicians decide.</span>
                  </div>
                </MotionReveal>
              </div>

              {/* Right Column: Interactive Workflow Visual */}
              <div className="lg:col-span-5">
                <MotionReveal delay={0.15}>
                  <div className="glass-obsidian rounded-3xl border border-border p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-6">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-border/60 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                          <Workflow className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-foreground block">Encounter Workflow Flow</span>
                          <span className="text-[11px] text-muted-foreground">From Conversation to Next Step</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        Active Flow
                      </span>
                    </div>

                    {/* Step-by-Step Flow Stages */}
                    <div className="space-y-3 relative">
                      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-teal-500/40 via-teal-500/20 to-border -z-0" />

                      {/* Stage 1 */}
                      <div className="relative z-10 flex items-start gap-3.5 p-3 rounded-2xl bg-card border border-border/70 hover:border-teal-500/40 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold text-xs flex items-center justify-center shrink-0">
                          1
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                            Encounter Listening
                            <span className="text-[10px] font-normal text-muted-foreground px-1.5 py-0.5 rounded bg-muted">During visit</span>
                          </h4>
                          <p className="text-[11px] text-muted-foreground leading-snug">
                            Captures patient-physician dialogue ambiently in real time.
                          </p>
                        </div>
                      </div>

                      {/* Stage 2 */}
                      <div className="relative z-10 flex items-start gap-3.5 p-3 rounded-2xl bg-card border border-border/70 hover:border-teal-500/40 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold text-xs flex items-center justify-center shrink-0">
                          2
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                            AI Synthesis & Preparation
                            <span className="text-[10px] font-normal text-teal-600 dark:text-teal-400 px-1.5 py-0.5 rounded bg-teal-500/10">SOAP + Coding</span>
                          </h4>
                          <p className="text-[11px] text-muted-foreground leading-snug">
                            Drafts SOAP notes, differential considerations, labs, and ICD-10/CPT context.
                          </p>
                        </div>
                      </div>

                      {/* Stage 3 */}
                      <div className="relative z-10 flex items-start gap-3.5 p-3 rounded-2xl bg-card border-2 border-teal-500/40 shadow-sm transition-colors">
                        <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                          3
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                            Physician Review & Validation
                            <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/10">Clinical Gate</span>
                          </h4>
                          <p className="text-[11px] text-muted-foreground leading-snug">
                            Physician inspects, edits, validates clinical accuracy, and approves.
                          </p>
                        </div>
                      </div>

                      {/* Stage 4 */}
                      <div className="relative z-10 flex items-start gap-3.5 p-3 rounded-2xl bg-card border border-border/70 hover:border-teal-500/40 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground font-bold text-xs flex items-center justify-center shrink-0">
                          4
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                            Practice / EHR Workflow Handoff
                            <span className="text-[10px] font-normal text-muted-foreground px-1.5 py-0.5 rounded bg-muted">Next step</span>
                          </h4>
                          <p className="text-[11px] text-muted-foreground leading-snug">
                            Approved work transitions into the practice record (varies by deployment).
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer note */}
                    <div className="p-3 rounded-xl bg-muted/40 border border-border text-[11px] text-muted-foreground flex items-center justify-between">
                      <span>Clinical judgment remains with the physician</span>
                      <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
                    </div>

                  </div>
                </MotionReveal>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: WHAT IS CLINICAL WORKFLOW SOFTWARE?
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border relative overflow-hidden bg-card/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl space-y-5 mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                Category Scope
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                What Is Clinical Workflow Software?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Clinical workflow software is software that helps organize how clinical tasks and information move between people, systems, and stages of care.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                The exact scope varies significantly by product. For example, one platform may focus on patient flow and staff coordination. Another may focus on scheduling, prior authorization, or operational task routing. Another may center on encounter documentation, physician review, follow-up, coding, or downstream handoff.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base">Encounter & Review</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Capturing visit dialogue, generating SOAP drafts, surfacing lab and differential context, and facilitating physician review.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base">Patient Flow & Status</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tracking patient movement across waiting areas, exam rooms, diagnostic suites, and status boards in ambulatory or acute facilities.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base">Operational Task Routing</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Routing referrals, scheduling requests, prior authorizations, orders, and administrative work queues among support staff.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <GitBranch className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base">System Handoffs</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Moving validated clinical notes, ICD-10/CPT coding data, and follow-up directives into practice EHRs or billing engines.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-muted/40 border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground">
                  "Clinical workflow software" describes a category, not one standardized feature set.
                </h4>
                <p className="text-xs text-muted-foreground">
                  Healthcare workflow software can be an even broader term because it may include administrative, financial, access, and operational workflows in addition to clinician-facing clinical work.
                </p>
              </div>
              <Link
                to="/features"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline shrink-0"
              >
                View MedAlly Capabilities <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: WHAT PROBLEMS CAN CLINICAL WORKFLOW SOFTWARE ADDRESS?
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl space-y-5 mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                Problem-to-Capability Alignment
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                What Problems Can Clinical Workflow Software Address?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Different workflow problems require different software capabilities. Before comparing vendors, first identify which problem the practice is trying to solve.
              </p>
            </div>

            {/* Interactive Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap mb-8">
              <span className="text-xs font-semibold text-muted-foreground mr-2">Filter by area:</span>
              {['all', 'Documentation', 'Review', 'Care Continuity', 'Coding', 'Handoff', 'Operations', 'Administration'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterProblem(tab.toLowerCase())}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    filterProblem === tab.toLowerCase()
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-muted hover:bg-muted/80 text-foreground border border-border'
                  }`}
                >
                  {tab === 'all' ? 'All Problems' : tab}
                </button>
              ))}
            </div>

            {/* Responsive Table / Card Matrix */}
            <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="py-4 px-6 font-bold">Workflow problem</th>
                      <th className="py-4 px-6 font-bold">Capability to evaluate</th>
                      <th className="py-4 px-6 font-bold hidden md:table-cell">MedAlly Scope / Focus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {filteredMatrix.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <tr key={idx} className="hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-6 font-semibold text-foreground flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span>{item.problem}</span>
                          </td>
                          <td className="py-4 px-6 text-muted-foreground">
                            {item.capability}
                          </td>
                          <td className="py-4 px-6 text-xs text-muted-foreground hidden md:table-cell">
                            <span className="inline-block px-2.5 py-1 rounded-md bg-muted/60 text-foreground font-medium">
                              {item.medallyFits}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-teal-500/5 border border-teal-500/20 text-xs text-muted-foreground flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
              <span>
                <strong>Evaluation principle:</strong> A product does not need to address every row. The goal is to match the software to the workflow problem that actually exists.
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: COMPARISON MATRIX (WORKFLOW vs SCRIBE vs DOC AI)
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border bg-card/30 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl space-y-5 mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                Category Clarity
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Clinical Workflow Software vs. AI Medical Scribe vs. Clinical Documentation AI
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These categories overlap, but they are not interchangeable. Understanding the distinction ensures you select the appropriate tool for your operational requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {categoryComparison.map((cat, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    cat.isCurrent
                      ? 'bg-card border-2 border-teal-500 shadow-xl relative'
                      : 'bg-card border-border hover:border-border/80'
                  }`}
                >
                  <div className="space-y-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full inline-block ${
                      cat.isCurrent
                        ? 'bg-teal-500 text-slate-950'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {cat.badge}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">{cat.name}</h3>
                    <div className="space-y-2 pt-2 border-t border-border/60">
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Primary focus:</strong> {cat.focus}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Typical scope:</strong> {cat.scope}
                      </p>
                    </div>
                  </div>

                  {cat.link ? (
                    <div className="pt-6 mt-4 border-t border-border/40">
                      <Link
                        to={cat.link}
                        className="inline-flex items-center text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline gap-1 group"
                      >
                        {cat.linkText}
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  ) : cat.linkText ? (
                    <div className="pt-6 mt-4 border-t border-border/40">
                      <span className="inline-flex items-center text-xs font-semibold text-teal-600 dark:text-teal-400 gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {cat.linkText}
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
              <h4 className="text-sm font-bold text-foreground">How MedAlly Positions These Capabilities:</h4>
              <ul className="grid sm:grid-cols-3 gap-4 text-xs text-muted-foreground">
                <li className="p-3 rounded-xl bg-muted/40 border border-border">
                  <Link to="/ai-medical-scribe" className="font-bold text-teal-600 dark:text-teal-400 hover:underline block mb-1">
                    AI Medical Scribe →
                  </Link>
                  Explains the encounter-listening and note-drafting workflow.
                </li>
                <li className="p-3 rounded-xl bg-muted/40 border border-border">
                  <Link to="/clinical-documentation-ai" className="font-bold text-teal-600 dark:text-teal-400 hover:underline block mb-1">
                    AI Clinical Documentation →
                  </Link>
                  Explains the structured documentation and SOAP note editing workflow.
                </li>
                <li className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30">
                  <span className="font-bold text-teal-600 dark:text-teal-400 block mb-1">
                    Clinical Workflow Software
                  </span>
                  Explains how to evaluate the broader category and where MedAlly fits across documentation, review, coding, follow-up, and handoff.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: WHAT SHOULD A PRACTICE EVALUATE BEFORE CHOOSING?
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl space-y-5 mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                Buyer Guide
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                What Should a Practice Evaluate Before Choosing Clinical Workflow Software?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A useful evaluation goes beyond a feature checklist. Ask the vendor to show how the product behaves in the workflow your clinicians actually use.
              </p>
            </div>

            {/* Interactive 9 Evaluation Areas Explorer */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Selector List */}
              <div className="lg:col-span-5 space-y-2">
                {evaluationAreas.map((area) => {
                  const Icon = area.icon;
                  const isSelected = selectedArea === area.id;
                  return (
                    <button
                      key={area.id}
                      onClick={() => setSelectedArea(area.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-card border-teal-500 shadow-md text-foreground'
                          : 'bg-muted/30 border-border hover:bg-muted/60 text-muted-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? 'bg-teal-500/20 text-teal-600 dark:text-teal-400'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold">{area.title}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isSelected ? '-rotate-90 text-teal-500' : 'text-muted-foreground'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Right Detail Card */}
              <div className="lg:col-span-7">
                {(() => {
                  const current = evaluationAreas.find((a) => a.id === selectedArea) || evaluationAreas[0];
                  const Icon = current.icon;
                  return (
                    <div className="p-8 rounded-3xl bg-card border border-border shadow-xl space-y-6 relative overflow-hidden">
                      <div className="flex items-center gap-3 border-b border-border pb-4">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Evaluation Domain</span>
                          <h3 className="text-xl font-bold text-foreground">{current.title}</h3>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide block">
                          What to ask the vendor to show:
                        </span>
                        <div className="p-4 rounded-xl bg-muted/50 border border-border text-foreground font-semibold text-base leading-snug">
                          "{current.ask}"
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">
                          Evaluation Guidance:
                        </span>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {current.guidance}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>
                          <strong>Warning:</strong> Do not accept broad terms such as "automated workflow" without seeing where automation starts, where clinician review occurs, and what happens after approval.
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: HOW CAN A PRACTICE TEST WORKFLOW FIT BEFORE IMPLEMENTATION?
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border bg-card/20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl space-y-5 mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                Demonstration Framework
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                How Can a Practice Test Workflow Fit Before Implementation?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A product demonstration is more useful when it follows a real practice scenario rather than a generic feature tour.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                A practical evaluation can use a fictional or de-identified encounter and ask the vendor to demonstrate these seven core verification checkpoints:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20">
                        Step {step.step}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                    <h3 className="font-bold text-foreground text-base">{step.title}</h3>
                    <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                      {step.question}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/60">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-muted/40 border border-border text-center max-w-3xl mx-auto space-y-2">
              <p className="text-sm font-semibold text-foreground">
                This approach helps reveal whether a product fits the existing workflow or requires the practice to redesign it around the software.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: WHERE DOES MEDALLY FIT IN THE CLINICAL WORKFLOW CATEGORY?
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                  MedAlly Scope
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  Where Does MedAlly Fit in the Clinical Workflow Category?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  MedAlly's scope is centered on the <strong>physician encounter and the work that follows it</strong>.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  MedAlly listens during the patient encounter and prepares structured, reviewable context for physician validation before any downstream handoff:
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    'SOAP-style clinical documentation for physician review',
                    'Decision-support and differential-review information',
                    'Lab-related information for encounter review',
                    'Treatment-planning and follow-up information',
                    'ICD-10/CPT coding information',
                    'Billing-related information',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                      <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border text-xs text-muted-foreground leading-relaxed">
                  Physicians review and edit AI-prepared work before approval. After approval, MedAlly can support the next practice or EHR workflow step, with the exact handoff method varying by deployment.
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <Link
                    to="/how-it-works"
                    className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    See How MedAlly Works <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-border">•</span>
                  <Link
                    to="/features"
                    className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Explore Full Feature Inventory <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Visual Image Card */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl border border-border overflow-hidden bg-card shadow-2xl">
                  <div className="p-4 border-b border-border bg-muted/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                      <span className="text-xs font-mono text-muted-foreground ml-2">medally-encounter-workspace</span>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400">
                      Encounter Scope
                    </span>
                  </div>
                  <img
                    src="/images/medally/clinical-workflow-real.png"
                    alt="MedAlly clinical workflow workspace showing clinical note, differential review, and coding context"
                    className="w-full h-auto object-cover max-h-[440px]"
                    loading="lazy"
                  />
                  <div className="p-4 bg-background/90 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>Annotated: SOAP Draft • Differentials • Labs • ICD-10/CPT</span>
                    <span className="font-semibold text-foreground">Physician Review Interface</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: EXAMPLE: EVALUATING MEDALLY WITH A FICTIONAL ENCOUNTER
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border bg-card/20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl space-y-5 mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                Fictional Walkthrough
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Example: Evaluating MedAlly With a Fictional Encounter
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Consider a fictional follow-up visit. During the encounter, MedAlly listens to the patient-physician conversation. After the visit, the physician can review a SOAP-style note together with other MedAlly-prepared information relevant to the encounter.
              </p>
              <p className="text-sm text-muted-foreground">
                This example lets you inspect the <strong>actual outputs, review points, editing experience, and handoff behavior</strong> instead of relying only on a feature list.
              </p>
            </div>

            {/* Interactive Fictional Encounter Workspace Viewer */}
            <div className="rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
              
              {/* Workspace Top Toolbar */}
              <div className="p-4 sm:p-5 border-b border-border bg-muted/40 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Encounter #4829 — Fictional Patient (Follow-up)</h3>
                    <p className="text-xs text-muted-foreground">Type 2 Diabetes Mellitus & Hypertension Follow-Up</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsApproved(!isApproved)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      isApproved
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                    }`}
                  >
                    {isApproved ? (
                      <>
                        <Check className="w-4 h-4" /> Approved for Practice Handoff
                      </>
                    ) : (
                      <>
                        <CheckSquare className="w-4 h-4" /> Physician Validate & Approve
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Workspace Navigation Tabs */}
              <div className="flex items-center border-b border-border bg-background px-4 overflow-x-auto">
                {([
                  { key: 'soap', label: '1. SOAP Documentation Draft', icon: FileText },
                  { key: 'labs', label: '2. Lab & Differential Context', icon: Activity },
                  { key: 'treatment', label: '3. Treatment & Follow-Up Plan', icon: CalendarCheck2 },
                  { key: 'coding', label: '4. ICD-10 / CPT & Billing Info', icon: Tag },
                  { key: 'handoff', label: '5. Downstream Handoff Status', icon: Share2 },
                ] as const).map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`py-3.5 px-4 text-xs font-bold flex items-center gap-2 whitespace-nowrap border-b-2 transition-all ${
                        isActive
                          ? 'border-teal-500 text-teal-600 dark:text-teal-400 bg-teal-500/5'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Panels */}
              <div className="p-6 sm:p-8 bg-card">
                
                {activeTab === 'soap' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4 text-teal-500" /> SOAP Note Draft (Prepared for Physician Review)
                      </span>
                      <span className="text-xs text-muted-foreground">Editable by Physician</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-background border border-border space-y-1.5">
                        <h4 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Subjective</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          58-year-old female presents for routine 3-month follow-up of Type 2 Diabetes Mellitus and Essential Hypertension. Patient reports adherence to Metformin 1000mg BID and Lisinopril 20mg daily. Home blood glucose readings average 130–145 mg/dL. Denies chest pain, shortness of breath, visual changes, or numbness.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-background border border-border space-y-1.5">
                        <h4 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Objective</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          BP: 128/82 mmHg | HR: 74 bpm | Temp: 98.6°F | BMI: 28.4<br />
                          Labs: HbA1c 7.2% (down from 7.6%), eGFR &gt;60 mL/min/1.73m², Urine microalbumin normal.<br />
                          Exam: Alert, oriented. Cardiovascular regular rate/rhythm. Bilateral feet intact sensation to 10g monofilament.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-background border border-border space-y-1.5">
                        <h4 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Assessment</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          1. Type 2 diabetes mellitus without complications (E11.9) — Improving glycemic control.<br />
                          2. Essential (primary) hypertension (I10) — Stable on current ACE inhibitor.<br />
                          3. Preventive diabetic surveillance up to date.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-background border border-border space-y-1.5">
                        <h4 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Plan</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          1. Continue Metformin 1000mg PO BID & Lisinopril 20mg PO daily.<br />
                          2. Recheck HbA1c and basic metabolic panel in 3 months.<br />
                          3. Annual diabetic ophthalmology exam confirmed for next month.<br />
                          4. Follow-up in clinic in 3 months.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'labs' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Encounter Lab Context & Differential Review Information
                      </span>
                      <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">Reviewable Context</span>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-background border border-border space-y-1">
                        <span className="text-[11px] text-muted-foreground font-mono">Glycemic Control</span>
                        <div className="text-base font-bold text-foreground">HbA1c: 7.2%</div>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400">Previous: 7.6% (3 mo ago)</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-background border border-border space-y-1">
                        <span className="text-[11px] text-muted-foreground font-mono">Renal Parameters</span>
                        <div className="text-base font-bold text-foreground">eGFR: &gt;60 mL/min</div>
                        <p className="text-[11px] text-muted-foreground">Creatinine: 0.9 mg/dL (Normal)</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-background border border-border space-y-1">
                        <span className="text-[11px] text-muted-foreground font-mono">Surveillance</span>
                        <div className="text-base font-bold text-foreground">Microalbumin: Normal</div>
                        <p className="text-[11px] text-muted-foreground">&lt;30 mg/g ratio</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'treatment' && (
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Treatment Planning & Follow-Up Context
                    </span>
                    <div className="p-4 rounded-2xl bg-background border border-border space-y-3">
                      <div className="flex items-center justify-between border-b border-border/60 pb-2">
                        <span className="text-xs font-bold text-foreground">Actionable Follow-Up Items</span>
                        <span className="text-xs text-muted-foreground">Linked to Encounter</span>
                      </div>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                          <span>Order 3-month repeat HbA1c and Comprehensive Metabolic Panel.</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                          <span>Reminder sent for annual dilated retinal examination.</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                          <span>Next clinic encounter scheduled: 3-month interval follow-up.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'coding' && (
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      ICD-10 / CPT & Billing-Related Information (For Review)
                    </span>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-background border border-border space-y-2">
                        <h4 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase">Prepared ICD-10 Diagnoses</h4>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40">
                            <span className="font-mono font-bold text-foreground">E11.9</span>
                            <span className="text-muted-foreground">Type 2 diabetes mellitus w/o complications</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40">
                            <span className="font-mono font-bold text-foreground">I10</span>
                            <span className="text-muted-foreground">Essential (primary) hypertension</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-background border border-border space-y-2">
                        <h4 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase">Suggested Evaluation & Management (E/M)</h4>
                        <div className="p-2 rounded-lg bg-muted/40 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-foreground">CPT 99214</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold">Established Patient</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            Moderate complexity medical decision making (2 stable chronic illnesses addressed). Requires clinician review and validation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'handoff' && (
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Downstream Practice / EHR Handoff Status
                    </span>
                    <div className="p-5 rounded-2xl bg-background border border-border space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-teal-500" />
                          <span className="text-xs font-bold text-foreground">Handoff Gate Status</span>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          isApproved
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}>
                          {isApproved ? 'Ready for Next Step' : 'Awaiting Physician Approval'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        The specific downstream handoff depends on your deployment setting (e.g. EHR direct transfer, practice workflow sync, or clipboard transfer). Approved work is handed off only after explicit clinician sign-off.
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: WHAT SHOULD BE CONFIRMED BEFORE A ROLLOUT?
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl space-y-5 mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                Implementation Readiness
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                What Should Be Confirmed Before a Clinical Workflow Software Rollout?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Before implementation, confirm the practical details that determine whether a workflow will function in production:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rolloutChecklist.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-teal-500/40 transition-all space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-foreground text-base">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-muted/40 border border-border text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold text-foreground">
                A workflow product should be evaluated in the context of the practice's real process, not just its feature list.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: HOW IS CLINICAL WORKFLOW SOFTWARE DIFFERENT FROM AN EHR?
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border bg-card/30 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                  System Architecture
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  How Is Clinical Workflow Software Different From an EHR?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  An EHR is the system of record used to maintain the patient chart and support a wide range of clinical, administrative, and regulatory functions.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Clinical workflow software focuses on how particular tasks, reviews, information, and handoffs move through a process. Depending on the product, it works alongside the EHR rather than replacing it.
                </p>
                <div className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/20 text-sm text-foreground">
                  <strong>For MedAlly:</strong> The relevant question is how physician-approved work moves into the next practice or EHR workflow step. That method varies by deployment and should be confirmed during evaluation.
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl bg-card border border-border space-y-2">
                  <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
                    <Database className="w-4 h-4" /> EHR (System of Record)
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Maintains longitudinal health record, regulatory compliance, billing history, and legal medical charts.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-card border-2 border-teal-500/50 space-y-2">
                  <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
                    <Workflow className="w-4 h-4" /> Clinical Workflow Software (e.g. MedAlly)
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Coordinates ambient encounter capture, AI draft synthesis, physician review queues, follow-up linkage, coding context, and handoff to the EHR.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: WHO SHOULD EVALUATE MEDALLY FOR CLINICAL WORKFLOW?
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl space-y-5 mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                Audience & Fit
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Who Should Evaluate MedAlly for Clinical Workflow?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                MedAlly is designed specifically for physician-led encounters and the clinical, coding, and review steps immediately surrounding the visit.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Relevant Evaluators */}
              <div className="p-8 rounded-3xl bg-card border border-border shadow-lg space-y-5">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  MedAlly may be relevant for:
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>Physicians who want workflow support beyond note drafting alone.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>Clinicians evaluating AI-supported documentation and review.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>Practices examining how encounter information connects to follow-up, coding, and downstream work.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>Clinical teams comparing a broader encounter workflow with a single-purpose scribe.</span>
                  </li>
                </ul>
              </div>

              {/* Scope Demarcation */}
              <div className="p-8 rounded-3xl bg-muted/30 border border-border space-y-5">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-muted-foreground" />
                  When to evaluate specialized tools:
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If the primary need is patient-location tracking, scheduling automation, prior authorization, staff task routing, or another operational workflow, evaluate products designed specifically for those requirements rather than assuming every clinical workflow platform covers them.
                </p>
                <div className="pt-2">
                  <Link
                    to="/features"
                    className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Check MedAlly Feature Catalog <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: CAN I TRY MEDALLY BEFORE CHOOSING A PAID PLAN?
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border bg-card/20 relative">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
                Forever Free Plan
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Can I Try MedAlly Before Choosing a Paid Plan?
              </h2>
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                Yes.
              </p>
              <div className="p-6 rounded-3xl bg-card border border-border shadow-xl space-y-3 text-left">
                <p className="text-base text-foreground font-semibold">
                  <strong>Forever Free includes 10 clinical encounters every month.</strong>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  One MedAlly session counts as one encounter, and the free allowance renews monthly.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="https://app.medally.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center px-8 rounded-full bg-gradient-to-r from-[#36b7b5] to-[#2da19f] text-slate-950 hover:text-slate-950 dark:text-white dark:hover:text-white font-bold shadow-xl hover:scale-[1.02] transition-all duration-300 text-center group"
                >
                  Start MedAlly Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                <Link
                  to="/pricing"
                  className="w-full sm:w-auto inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-card text-foreground hover:bg-muted font-bold text-base transition-all"
                >
                  Compare MedAlly Plans
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: FAQS
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-background">
          <div className="max-w-4xl mx-auto px-6">
            
            <MotionReveal className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <Activity className="w-3.5 h-3.5" />
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Frequently Asked Questions About Clinical Workflow Software
              </h2>
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
                            {faq.a}{' '}
                            {faq.linkHref && faq.linkText && (
                              <Link
                                to={faq.linkHref}
                                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:text-foreground transition-colors group ml-1"
                              >
                                {faq.linkText}
                                <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            )}
                            {faq.postLinkText || ''}
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
            SECTION 14: FINAL CALL TO ACTION
            ========================================================================= */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-background via-card to-background">
          <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-2">
                Evaluate & Get Started
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl mx-auto">
                Evaluate the Workflow, Then Evaluate the Product
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Clinical workflow software should be chosen around the workflow a practice needs to improve. If your focus is the physician encounter and the work that follows it, explore how MedAlly handles that sequence in more detail.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a
                  href="https://app.medally.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center px-8 rounded-full bg-gradient-to-r from-[#36b7b5] to-[#2da19f] text-slate-950 hover:text-slate-950 dark:text-white dark:hover:text-white font-bold shadow-xl hover:scale-[1.02] transition-all"
                >
                  Start MedAlly Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                <Link
                  to="/how-it-works"
                  className="inline-flex h-14 items-center justify-center px-7 rounded-full border border-border bg-card hover:bg-muted text-foreground font-bold text-sm transition-all"
                >
                  See How MedAlly Works
                </Link>
                <Link
                  to="/features"
                  className="inline-flex h-14 items-center justify-center px-7 rounded-full border border-border bg-card hover:bg-muted text-foreground font-bold text-sm transition-all"
                >
                  Explore MedAlly Features
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex h-14 items-center justify-center px-7 rounded-full border border-border bg-card hover:bg-muted text-foreground font-bold text-sm transition-all"
                >
                  View Pricing
                </Link>
                <Link
                  to="/faq"
                  className="inline-flex h-14 items-center justify-center px-7 rounded-full border border-border bg-card hover:bg-muted text-foreground font-bold text-sm transition-all"
                >
                  Read MedAlly FAQs
                </Link>
              </div>
            </MotionReveal>
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default ClinicalWorkflowSoftwarePage;
