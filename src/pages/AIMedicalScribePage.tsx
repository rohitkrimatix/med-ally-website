import { type FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  FileText,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Layers,
  Database,
  BrainCircuit,
  FileCode2,
  Edit3,
  Check,
  RotateCcw,
  Volume2,
  Lock
} from 'lucide-react';
import Layout from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { MotionReveal } from '@/components/MotionReveal';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.medally.ai/ai-medical-scribe#webpage',
      url: 'https://www.medally.ai/ai-medical-scribe',
      name: 'AI Medical Scribe for Physicians | MedAlly',
      description:
        'MedAlly helps physicians turn patient encounters into structured, reviewable clinical notes, then move approved work into the clinical workflow.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.medally.ai/#website',
        name: 'MedAlly',
        url: 'https://www.medally.ai',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.medally.ai/ai-medical-scribe#breadcrumb',
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
          name: 'AI Medical Scribe',
          item: 'https://www.medally.ai/ai-medical-scribe',
        },
      ],
    },
  ],
};

const faqs = [
  {
    q: 'What documentation format can MedAlly produce?',
    a: "MedAlly's current product experience includes structured SOAP-style clinical documentation prepared from encounter context for physician review.",
  },
  {
    q: 'How does a physician review the MedAlly note?',
    a: 'The physician reviews the generated draft, makes any needed edits, validates the content, and approves what moves forward in the workflow.',
  },
  {
    q: 'How does the approved note reach the clinical record?',
    a: 'MedAlly is designed to move physician-approved work into the practice workflow, including the EHR workflow where supported by the specific deployment. Exact integration depth can vary, so practices and health systems should confirm support for their environment during evaluation.',
  },
  {
    q: 'What is included in the Forever Free plan?',
    a: 'The Forever Free plan includes 10 free encounters per month.',
    linkText: 'View Pricing',
    linkHref: '/pricing',
    postLinkText: ' for current plan details and included capabilities.',
  },
  {
    q: 'What happens after I use the 10 free encounters?',
    a: 'The free allowance is 10 encounters per month.',
    linkText: 'View Pricing',
    linkHref: '/pricing',
    postLinkText: ' for the current options available after the monthly allowance is used.',
  },
  {
    q: 'Is MedAlly only an AI medical scribe?',
    a: 'No. AI-assisted documentation is one part of MedAlly. The broader platform also organizes encounter context, surfaces reviewable decision-support information, prepares coding context, and supports workflow handoffs.',
    linkText: 'Explore MedAlly Features',
    linkHref: '/features',
  },
  {
    q: 'Does MedAlly replace physician review?',
    a: 'No. Physicians remain responsible for reviewing, editing, validating, approving, and making final clinical decisions.',
  },
  {
    q: 'What should I verify about privacy and security?',
    a: "Before deployment, healthcare organizations should review MedAlly's current privacy and security documentation and confirm the requirements relevant to their organization, including any needed contractual, data-handling, retention, encryption, and governance details.",
  },
];

const AIMedicalScribePage: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSoapTab, setActiveSoapTab] = useState<'S' | 'O' | 'A' | 'P'>('S');
  const [isEditing, setIsEditing] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [soapData, setSoapData] = useState({
    S: 'Patient is a 54-year-old male presenting with a 4-day history of non-productive dry cough and mild exertional dyspnea. Denies fever, chills, orthopnea, or lower extremity edema. Past medical history significant for well-controlled mild asthma.',
    O: 'Vital Signs: BP 124/78 mmHg | HR 72 bpm | Temp 98.4°F | SpO2 98% on room air.\nPhysical Exam: Clear to auscultation bilaterally. No audible wheezing, rales, or rhonchi. Normal heart sounds S1/S2, regular rate and rhythm.',
    A: '1. Acute bronchitis, viral etiology suspected.\n2. Mild intermittent asthma, currently stable without acute bronchospasm exacerbation.',
    P: '1. Supportive care: aggressive hydration, OTC antitussives, and throat lozenges.\n2. Continue baseline Albuterol HFA 90 mcg inhaler 1-2 puffs PRN wheezing.\n3. Return to clinic or seek urgent evaluation if high fevers, hemoptysis, or worsening dyspnea develop in 7 days.',
  });

  return (
    <Layout>
      <SEO
        title="AI Medical Scribe for Physicians | MedAlly"
        description="MedAlly helps physicians turn patient encounters into structured, reviewable clinical notes, then move approved work into the clinical workflow."
        url="https://www.medally.ai/ai-medical-scribe"
        image="/images/medally/clinical-hero.webp"
        imageAlt="MedAlly AI medical scribe interface showing a structured SOAP-style clinical note draft for physician review."
        keywords={[
          'AI medical scribe',
          'medical scribe',
          'ambient scribe',
          'ambient AI scribe',
          'ambient medical scribe',
          'medical scribe software',
          'free ai medical scribe',
          'ai medical scribe software',
        ]}
        structuredData={structuredData}
      />

      <main className="bg-background text-foreground min-h-screen transition-colors duration-300">
        
        {/* =========================================================================
            SECTION 4.1: HERO
            ========================================================================= */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden border-b border-border">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-teal-500/10 dark:bg-teal-500/5 blur-[140px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Copy & CTAs */}
              <div className="lg:col-span-7 space-y-8 text-left">
                <MotionReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-4">
                    <Mic className="w-3.5 h-3.5" />
                    AI MEDICAL SCRIBE FOR PHYSICIANS
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-editorial leading-[1.15] mb-6">
                    AI Medical Scribe for Physicians — From Encounter to Reviewable Note
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                    MedAlly listens to the patient encounter, prepares a structured clinical note for physician review, and keeps the approved documentation connected to the broader clinical workflow.
                  </p>
                </MotionReveal>

                <MotionReveal delay={0.1}>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <a
                        href="https://app.medally.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-14 items-center justify-center px-8 rounded-full bg-gradient-to-r from-[#36b7b5] to-[#2da19f] text-slate-950 hover:text-slate-950 dark:text-white dark:hover:text-white font-bold shadow-xl hover:scale-[1.02] transition-all duration-300 text-center group"
                      >
                        Start MedAlly Free
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a
                        href="https://www.calonji.com/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-base transition-all duration-300"
                      >
                        Book a Demo
                      </a>
                    </div>
                    <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                      Forever Free includes 10 free encounters per month.
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

              {/* Right Column: Hero Visual Card (LCP-friendly, structured UI) */}
              <div className="lg:col-span-5">
                <MotionReveal delay={0.15}>
                  <div className="glass-obsidian rounded-3xl border border-border p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-5">
                    
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-border/60 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Encounter Capture</span>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5" />
                        Listening Active
                      </span>
                    </div>

                    {/* Dialogue excerpt */}
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                        <span className="font-semibold text-foreground flex items-center gap-1.5">
                          <Mic className="w-3.5 h-3.5 text-teal-500" />
                          Encounter Dialogue Context (54yo M)
                        </span>
                        <span>03:45</span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                        <p className="italic"><strong className="text-foreground not-italic">Doctor:</strong> "BP is 124/78, SpO2 98% on room air. How is your 4-day dry cough and breathing?"</p>
                        <p className="italic"><strong className="text-foreground not-italic">Patient:</strong> "Mild shortness of breath with exertion, no fevers. Baseline asthma is mostly quiet."</p>
                        <p className="italic"><strong className="text-foreground not-italic">Doctor:</strong> "Lungs clear, S1/S2 normal. Let's do hydration, OTC antitussives, Albuterol PRN, and return in 7 days if needed."</p>
                      </div>
                    </div>

                    {/* Structured SOAP Draft Preview */}
                    <div className="p-4 rounded-2xl bg-background/90 border border-border space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-teal-500" />
                          Structured SOAP Draft
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                          Ready for Review
                        </span>
                      </div>
                      <div className="text-xs text-foreground space-y-1.5 font-mono bg-muted/20 p-3 rounded-xl border border-border/50">
                        <p><span className="text-teal-600 dark:text-teal-400 font-bold">S:</span> 54yo M with 4d dry cough, mild exertional dyspnea. No fevers.</p>
                        <p><span className="text-teal-600 dark:text-teal-400 font-bold">O:</span> BP 124/78, SpO2 98% RA. Lungs clear bilaterally, S1/S2 normal.</p>
                        <p><span className="text-teal-600 dark:text-teal-400 font-bold">A:</span> Acute bronchitis (viral suspected); stable asthma.</p>
                        <p><span className="text-teal-600 dark:text-teal-400 font-bold">P:</span> Hydration, OTC antitussives, Albuterol PRN, 7d safety net.</p>
                      </div>
                    </div>

                    {/* Footer / Review verification indicator */}
                    <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border/60">
                      <span className="flex items-center gap-1.5 text-foreground font-medium">
                        <UserCheck className="w-4 h-4 text-teal-500" />
                        Physician Review Required
                      </span>
                      <span className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">Workflow Ready</span>
                    </div>

                  </div>
                </MotionReveal>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4.2: DIRECT PRODUCT ANSWER (AEO / GEO)
            ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-border bg-muted/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-4">
                <BrainCircuit className="w-3.5 h-3.5" />
                Direct Product Answer
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-editorial mb-6">
                What Is MedAlly's AI Medical Scribe?
              </h2>
              <div className="text-lg sm:text-xl text-foreground font-light leading-relaxed space-y-5 text-left p-8 sm:p-10 rounded-3xl bg-background border border-border shadow-sm">
                <p>
                  MedAlly's <strong>AI medical scribe</strong> uses encounter context to prepare structured clinical documentation for physician review. The clinician can review, edit, validate, and approve the draft before approved work moves into the practice workflow.
                </p>
                <p className="text-muted-foreground">
                  For physicians evaluating an <strong>ambient AI scribe</strong>, MedAlly's documentation experience is designed to support the encounter without making the generated note the final authority.
                </p>
                <div className="pt-2">
                  <Link
                    to="/how-it-works"
                    className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:text-foreground transition-colors group"
                  >
                    See How MedAlly Works
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4.3: HOW THE MEDALLY SCRIBING WORKFLOW WORKS (4 STEPS)
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-6">
            
            <MotionReveal className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <Layers className="w-3.5 h-3.5" />
                Step-by-Step Scribing Workflow
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                From Encounter to Reviewable Clinical Note
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Four transparent steps that protect physician attention during the encounter while keeping clinicians firmly in control of the final record.
              </p>
            </MotionReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              
              {/* Step 1 */}
              <MotionReveal delay={0.05} className="h-full">
                <div className="h-full p-6 sm:p-8 rounded-3xl border border-border bg-muted/20 shadow-sm flex flex-col justify-between hover:border-teal-500/40 transition-colors">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 font-bold text-lg flex items-center justify-center mb-6">
                      01
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      1. MedAlly Listens to the Encounter
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      MedAlly uses the clinical conversation as encounter context while the physician focuses on the patient.
                    </p>
                  </div>
                </div>
              </MotionReveal>

              {/* Step 2 */}
              <MotionReveal delay={0.1} className="h-full">
                <div className="h-full p-6 sm:p-8 rounded-3xl border border-border bg-muted/20 shadow-sm flex flex-col justify-between hover:border-teal-500/40 transition-colors">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 font-bold text-lg flex items-center justify-center mb-6">
                      02
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      2. MedAlly Prepares the Draft
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      The encounter is converted into structured clinical documentation. MedAlly's current product experience includes structured SOAP-style documentation.
                    </p>
                  </div>
                </div>
              </MotionReveal>

              {/* Step 3 */}
              <MotionReveal delay={0.15} className="h-full">
                <div className="h-full p-6 sm:p-8 rounded-3xl border border-border bg-muted/20 shadow-sm flex flex-col justify-between hover:border-teal-500/40 transition-colors">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 font-bold text-lg flex items-center justify-center mb-6">
                      03
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      3. The Physician Reviews and Edits
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      The physician reviews the draft, makes any necessary edits, validates the information, and decides what is approved.
                    </p>
                  </div>
                </div>
              </MotionReveal>

              {/* Step 4 */}
              <MotionReveal delay={0.2} className="h-full">
                <div className="h-full p-6 sm:p-8 rounded-3xl border border-border bg-muted/20 shadow-sm flex flex-col justify-between hover:border-teal-500/40 transition-colors">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 font-bold text-lg flex items-center justify-center mb-6">
                      04
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      4. Approved Work Moves Forward
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      Physician-approved output can move into the practice workflow, including the EHR workflow where supported by the specific deployment.
                    </p>
                  </div>
                </div>
              </MotionReveal>

            </div>

            {/* Essential Physician Review Callout */}
            <MotionReveal delay={0.25} className="max-w-4xl mx-auto text-center space-y-6">
              <div className="p-6 rounded-2xl bg-teal-500/5 border border-teal-500/20 text-muted-foreground text-sm sm:text-base leading-relaxed">
                <p>
                  <strong className="text-foreground">This physician-review step is essential:</strong> MedAlly assists with documentation; the clinician remains responsible for the final clinical record.
                </p>
              </div>

              <div>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:text-foreground transition-colors group"
                >
                  See How MedAlly Works
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </MotionReveal>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4.4: PRODUCT DEMONSTRATION / INFORMATION-GAIN MODULE
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-muted/10">
          <div className="max-w-6xl mx-auto px-6">
            
            <MotionReveal className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <FileText className="w-3.5 h-3.5" />
                Product Demonstration
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                See the Draft a Physician Actually Reviews
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Explore an illustrative demonstration of the review workspace: inspect the structured SOAP output, toggle edit mode, test adjustments, and observe the clinician-controlled approval workflow.
              </p>
            </MotionReveal>

            {/* High-Fidelity Interactive UI Demonstration */}
            <MotionReveal delay={0.1}>
              <div className="glass-obsidian rounded-3xl border border-border shadow-2xl overflow-hidden">
                
                {/* Top Workspace Header */}
                <div className="p-4 sm:p-6 border-b border-border/70 flex flex-wrap items-center justify-between gap-4 bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-500 font-bold">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">Encounter Note Draft #8429</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                          Fictional Demo Encounter
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Fictional Outpatient Visit — Primary Care Encounter (Demonstration)</p>
                    </div>
                  </div>

                  {/* Status & Review Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        isEditing
                          ? 'bg-teal-500/20 text-teal-600 dark:text-teal-400 border-teal-500/40'
                          : 'bg-background text-foreground border-border hover:bg-muted'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      {isEditing ? 'Editing Mode Active' : 'Edit Section'}
                    </button>

                    <button
                      onClick={() => setIsApproved(!isApproved)}
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                        isApproved
                          ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                          : 'bg-foreground text-background dark:bg-white dark:text-slate-950 hover:opacity-90'
                      }`}
                    >
                      {isApproved ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Approved by Physician
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3.5 h-3.5" />
                          Approve Draft
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* SOAP Section Selector Tabs */}
                <div className="flex border-b border-border/60 bg-muted/10 overflow-x-auto">
                  {([
                    { id: 'S', label: 'Subjective (S)', title: 'History of Present Illness' },
                    { id: 'O', label: 'Objective (O)', title: 'Vitals & Physical Exam' },
                    { id: 'A', label: 'Assessment (A)', title: 'Clinical Impression' },
                    { id: 'P', label: 'Plan (P)', title: 'Treatment & Next Steps' },
                  ] as const).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSoapTab(tab.id)}
                      className={`flex-1 min-w-[140px] px-5 py-3.5 text-left text-xs transition-all border-b-2 ${
                        activeSoapTab === tab.id
                          ? 'border-teal-500 bg-background text-foreground font-bold'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20 font-medium'
                      }`}
                    >
                      <div className="font-mono text-teal-600 dark:text-teal-400">{tab.label}</div>
                      <div className="text-[11px] opacity-75 truncate">{tab.title}</div>
                    </button>
                  ))}
                </div>

                {/* Active Section Content Workspace */}
                <div className="p-6 sm:p-8 space-y-6 bg-background/50">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono">
                        Section Draft Content
                      </span>
                      {isEditing && (
                        <span className="text-[11px] text-teal-600 dark:text-teal-400 flex items-center gap-1 font-medium">
                          <RotateCcw className="w-3 h-3" />
                          Live clinician editable field
                        </span>
                      )}
                    </div>

                    {isEditing ? (
                      <textarea
                        value={soapData[activeSoapTab]}
                        onChange={(e) =>
                          setSoapData({ ...soapData, [activeSoapTab]: e.target.value })
                        }
                        rows={5}
                        className="w-full p-4 rounded-2xl bg-background border border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/30 text-sm font-mono text-foreground leading-relaxed transition-all"
                      />
                    ) : (
                      <div className="p-5 rounded-2xl bg-muted/20 border border-border font-mono text-sm text-foreground leading-relaxed whitespace-pre-line">
                        {soapData[activeSoapTab]}
                      </div>
                    )}
                  </div>

                  {/* Workflow state footer within demo */}
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${isApproved ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                      <span className="text-foreground font-medium">
                        {isApproved
                          ? 'Encounter status: Approved — Ready to move into practice workflow'
                          : 'Encounter status: Draft prepared — Physician review & validation in progress'}
                      </span>
                    </div>
                    <div className="text-muted-foreground">
                      {isApproved ? 'Structured SOAP Output • Clinician Verified & Approved' : 'Structured SOAP Output • Pending Clinician Review'}
                    </div>
                  </div>

                </div>

              </div>
            </MotionReveal>

            {/* Required Spec Caption */}
            <MotionReveal delay={0.2} className="mt-6 text-center max-w-3xl mx-auto">
              <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                Example MedAlly clinical note draft from a fictional encounter. Physicians review and edit the output before approving it for the clinical workflow.
              </p>
            </MotionReveal>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4.5: WHAT PHYSICIANS RECEIVE (5 DELIVERABLES)
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-6">
            
            <MotionReveal className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <FileText className="w-3.5 h-3.5" />
                Structured Clinical Outputs
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                What Does MedAlly Produce From the Encounter?
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Clear, organized clinical assets derived from the encounter to support thorough physician evaluation.
              </p>
            </MotionReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              
              {/* Deliverable 1 */}
              <MotionReveal delay={0.05} className="h-full">
                <div className="h-full p-8 rounded-3xl border border-border bg-muted/20 hover:border-teal-500/40 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 mb-6">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Structured Clinical Documentation
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      MedAlly prepares a structured clinical note from encounter context for physician review and editing.
                    </p>
                  </div>
                </div>
              </MotionReveal>

              {/* Deliverable 2 */}
              <MotionReveal delay={0.1} className="h-full">
                <div className="h-full p-8 rounded-3xl border border-border bg-muted/20 hover:border-teal-500/40 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 mb-6">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      SOAP-Style Documentation
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      The current MedAlly product experience includes SOAP-style documentation, organizing the encounter into structured clinical sections.
                    </p>
                  </div>
                </div>
              </MotionReveal>

              {/* Deliverable 3 */}
              <MotionReveal delay={0.15} className="h-full">
                <div className="h-full p-8 rounded-3xl border border-border bg-muted/20 hover:border-teal-500/40 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 mb-6">
                      <Database className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Organized Encounter Context
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      Relevant encounter information remains available within the workflow so the physician can review the note in the context of the visit.
                    </p>
                  </div>
                </div>
              </MotionReveal>

              {/* Deliverable 4 */}
              <MotionReveal delay={0.2} className="h-full">
                <div className="h-full p-8 rounded-3xl border border-border bg-muted/20 hover:border-teal-500/40 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 mb-6">
                      <FileCode2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Coding Context
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      MedAlly can prepare coding-related context from the encounter for review as part of the broader workflow.
                    </p>
                  </div>
                </div>
              </MotionReveal>

              {/* Deliverable 5 */}
              <MotionReveal delay={0.25} className="h-full md:col-span-2 lg:col-span-2">
                <div className="h-full p-8 rounded-3xl border border-teal-500/30 bg-teal-500/5 hover:border-teal-500/50 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 mb-6">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Physician-Controlled Approval
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                      The generated output is not the final authority. The clinician reviews, edits, validates, and approves what moves forward.
                    </p>
                  </div>

                  <div>
                    <Link
                      to="/features"
                      className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:text-foreground transition-colors group"
                    >
                      MedAlly Features
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </MotionReveal>

            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4.6: AMBIENT SCRIBE POSITIONING
            ========================================================================= */}
        <section className="py-24 lg:py-32 border-b border-border bg-muted/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <MotionReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-2">
                    <Mic className="w-3.5 h-3.5" />
                    Ambient Scribe Positioning
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight">
                    Ambient Scribe Support Without Losing Physician Control
                  </h2>
                </MotionReveal>

                <MotionReveal delay={0.1}>
                  <div className="space-y-4 text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                    <p>
                      An <strong>ambient scribe</strong> is designed to help reduce manual note-building during the patient visit.
                    </p>
                    <p>
                      For physicians evaluating an <strong>ambient medical scribe</strong>, MedAlly uses encounter context to prepare a structured draft while keeping the physician responsible for the final documentation.
                    </p>
                    <p className="text-foreground font-medium">
                      The value of the ambient workflow is not simply that a note appears. The useful outcome is a note the physician can review, correct, approve, and move forward as part of the clinical workflow.
                    </p>
                  </div>
                </MotionReveal>
              </div>

              <div className="lg:col-span-5">
                <MotionReveal delay={0.15}>
                  <div className="p-8 rounded-3xl border border-border bg-background space-y-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground">Clinician Responsibility Gate</h3>
                        <p className="text-xs text-muted-foreground">Every ambient draft is validated by the physician.</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-muted-foreground uppercase tracking-wider">Clinical Guardrails</span>
                        <span className="text-teal-600 dark:text-teal-400 font-semibold">Physician-Led</span>
                      </div>
                      <div className="space-y-2 text-xs text-foreground">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                          <span>Physician reviews and edits draft note directly</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                          <span>No unreviewed autonomous commitments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                          <span>Complete transparency into encounter context</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionReveal>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4.7: ONE CONCISE DIFFERENTIATION SECTION ("BEYOND THE NOTE")
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-background">
          <div className="max-w-5xl mx-auto px-6">
            
            <MotionReveal className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Differentiated Intelligence
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Beyond the Note — Without Losing Focus on Documentation
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="p-8 sm:p-12 rounded-3xl border border-border bg-muted/20 space-y-6 text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                <p className="text-foreground font-normal">
                  MedAlly includes AI-assisted scribing, but the documentation can remain connected to other reviewable parts of the same encounter.
                </p>
                <p>
                  After the note is prepared, the same encounter context can support:
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-background border border-border flex items-start gap-3">
                    <Database className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Organized clinical context</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Encounter history and vitals unified with the note.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-background border border-border flex items-start gap-3">
                    <BrainCircuit className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Reviewable decision-support</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Clinical guideline context presented for clinician decision.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-background border border-border flex items-start gap-3">
                    <FileCode2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Coding context</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">ICD and procedure context prepared for validation.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-background border border-border flex items-start gap-3">
                    <Layers className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Follow-up tasks and handoffs</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Streamlined handoffs across the practice care team.</p>
                    </div>
                  </div>
                </div>

                <p className="pt-2">
                  MedAlly uses <strong>Clinical Workflow Intelligence</strong> to describe this connected approach, keeping documentation synchronized with the broader care team workflow. An AI medical scribe addresses one part of the encounter process. See how MedAlly fits within a{' '}
                  <Link
                    to="/clinical-workflow-software"
                    className="text-teal-600 dark:text-teal-400 font-bold underline underline-offset-4 hover:text-foreground transition-colors"
                  >
                    broader clinical workflow
                  </Link>
                  .
                </p>

                <div className="pt-4 border-t border-border/60 flex flex-wrap gap-4 items-center justify-between">
                  <Link
                    to="/"
                    className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:text-foreground transition-colors group"
                  >
                    Clinical AI Platform
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/clinical-workflow-software"
                    className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:text-foreground transition-colors group"
                  >
                    Clinical Workflow Software
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/clinical-documentation-ai"
                    className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:text-foreground transition-colors group"
                  >
                    Explore AI Clinical Documentation
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </MotionReveal>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4.8: FREE PLAN CONVERSION SECTION
            ========================================================================= */}
        <section className="py-24 lg:py-32 border-b border-border bg-muted/10">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Forever Free Plan
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Looking for a Free AI Medical Scribe?
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="max-w-3xl mx-auto space-y-6 text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-10">
                <p>
                  MedAlly's <strong>Forever Free plan includes 10 free encounters per month</strong>, giving physicians a practical way to experience the documentation workflow before deciding whether a paid plan or broader practice deployment is appropriate.
                </p>
                <div className="p-6 rounded-2xl bg-background border border-border text-left space-y-2">
                  <h3 className="text-base font-bold text-foreground">What happens after the monthly free allowance is used?</h3>
                  <p className="text-sm text-muted-foreground">
                    The Forever Free plan includes 10 encounters per month.{' '}
                    <Link to="/pricing" className="text-teal-600 dark:text-teal-400 font-semibold underline underline-offset-4 hover:text-foreground">
                      View Pricing
                    </Link>{' '}
                    for the current options available beyond the monthly free allowance.
                  </p>
                </div>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
            </MotionReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4.9: PRACTICAL BUYER QUESTIONS (8 VERIFIED FAQS)
            ========================================================================= */}
        <section className="py-24 lg:py-36 border-b border-border bg-background">
          <div className="max-w-4xl mx-auto px-6">
            
            <MotionReveal className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <Lock className="w-3.5 h-3.5" />
                Physician Evaluation Questions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Questions Physicians Ask Before Choosing an AI Medical Scribe
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Clear answers regarding documentation formats, clinician review, EHR compatibility, free allowances, and security.
              </p>
            </MotionReveal>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <MotionReveal key={faq.q} delay={idx * 0.04}>
                    <div className="rounded-2xl border border-border bg-background/80 overflow-hidden transition-all duration-300">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
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
                            {faq.postLinkText && <span>{faq.postLinkText}</span>}
                          </p>
                        </div>
                      </div>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4.10: FINAL CONVERSION CTA
            ========================================================================= */}
        <section className="py-24 lg:py-36 relative bg-muted/10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Get Started Today
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Turn the Patient Encounter Into a Note You Can Review
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                Use MedAlly to prepare structured clinical documentation from the encounter, review and edit the draft, and move approved work into the clinical workflow.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="space-y-4">
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
                  <a
                    href="https://www.calonji.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/50 backdrop-blur-md text-foreground hover:bg-muted font-bold text-base transition-all duration-300"
                  >
                    Book a Demo
                  </a>
                </div>
                <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                  Forever Free includes 10 free encounters per month.
                </p>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-border bg-muted/40 text-xs sm:text-sm font-medium text-foreground shadow-sm">
                <Sparkles className="w-4 h-4 text-teal-500 shrink-0" />
                <span><strong>AI prepares.</strong> Clinicians review. Clinicians decide.</span>
              </div>
            </MotionReveal>
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default AIMedicalScribePage;
