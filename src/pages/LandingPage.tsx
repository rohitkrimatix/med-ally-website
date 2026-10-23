// @ts-nocheck
import { type FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  BrainCircuit,
  FileText,
  FileCheck2,
  ChevronDown,
  Layers,
  Activity,
  Stethoscope,
  Building2,
  Building,
  UserCheck,
  Cpu,
  Lock,
  GitMerge,
  HelpCircle,
  Clock,
  AlertCircle,
  Database
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import { MotionReveal } from '@/components/MotionReveal';
import LiveEncounterDemo from '@/components/LiveEncounterDemo';
import ClinicalEMRSuite from '@/components/ClinicalEMRSuite';
import SecurityVault from '@/components/SecurityVault';

const processWorkflowSteps = [
  { step: '01', title: 'Encounter', desc: 'The clinician conducts the patient visit.' },
  { step: '02', title: 'Documentation', desc: 'MedAlly helps structure clinical documentation from encounter information.' },
  { step: '03', title: 'Context', desc: 'Relevant information is organized into a more reviewable clinical picture.' },
  { step: '04', title: 'Clinical Support', desc: 'Decision-support information can be surfaced for physician consideration.' },
  { step: '05', title: 'Coding Context', desc: 'Relevant coding information can be prepared within the workflow.' },
  { step: '06', highlight: true, title: 'Physician Review', desc: 'The clinician reviews, edits, validates, and decides what moves forward.' },
];

const coreCapabilities = [
  {
    icon: FileText,
    title: 'AI Clinical Documentation',
    desc: 'Turn encounter information into structured clinical documentation for clinician review.',
    link: '/clinical-documentation-ai',
    linkText: 'Explore AI Clinical Documentation',
    tag: 'Documentation'
  },
  {
    icon: Database,
    title: 'Encounter Context',
    desc: 'Organize relevant information from the clinical encounter so physicians can review the patient picture more efficiently.',
    link: '/features',
    linkText: 'Learn About Encounter Context',
    tag: 'Context Synthesis'
  },
  {
    icon: BrainCircuit,
    title: 'Clinical Decision Support',
    desc: 'Surface reviewable clinical information that can support physician reasoning and decision-making.',
    link: '/ai-clinical-decision-support',
    linkText: 'Explore Decision Support',
    tag: 'Reasoning Support'
  },
  {
    icon: FileCheck2,
    title: 'Coding Context',
    desc: 'Prepare relevant coding information within the clinical workflow for clinician review.',
    link: '/ai-medical-coding',
    linkText: 'Explore Medical Coding Context',
    tag: 'Administrative Flow'
  },
  {
    icon: GitMerge,
    title: 'Clinical Workflow Support',
    desc: 'Connect documentation, context, decision-support information, and downstream administrative work around the encounter.',
    link: '/clinical-workflow-software',
    linkText: 'Explore Workflow Software',
    tag: 'Integrated Hub'
  }
];

const audienceGroups = [
  {
    icon: Stethoscope,
    title: 'Physicians',
    desc: 'Reduce friction around documentation and clinical workflow while retaining control over clinical decisions.',
    badge: 'Individual Practitioners'
  },
  {
    icon: Building2,
    title: 'Private & Group Practices',
    desc: 'Bring clinical AI into everyday workflows without turning every task into another disconnected tool.',
    badge: 'Independent Practices'
  },
  {
    icon: Layers,
    title: 'Clinics',
    desc: 'Support clinical documentation and workflow consistency across care teams.',
    badge: 'Multi-Provider Clinics'
  },
  {
    icon: Building,
    title: 'Hospitals & Health Systems',
    desc: 'Use clinical AI as part of broader physician and organizational workflows.',
    badge: 'Enterprise Systems'
  }
];

const faqItems = [
  {
    q: 'What is a clinical AI platform?',
    a: 'A clinical AI platform uses artificial intelligence to support parts of the clinical workflow such as documentation, information organization, decision-support context, and administrative tasks. The clinician remains responsible for interpreting information and making clinical decisions.'
  },
  {
    q: 'What is MedAlly?',
    a: 'MedAlly is a clinical AI platform designed for physicians and healthcare teams. It supports clinical documentation, encounter-context organization, reviewable decision-support information, coding context, and connected clinical workflows.'
  },
  {
    q: 'Is MedAlly an AI medical scribe?',
    a: 'MedAlly includes clinical documentation capabilities associated with AI medical scribes, but its broader positioning extends beyond documentation into clinical workflow intelligence, including encounter context, reviewable decision-support information, and coding-related workflow.',
    link: '/ai-medical-scribe',
    linkText: 'Explore AI Medical Scribe'
  },
  {
    q: 'What is clinical workflow intelligence?',
    a: 'Clinical workflow intelligence is the use of context-aware technology to help organize and prepare work across the clinical encounter rather than automating a single isolated task.'
  },
  {
    q: 'Does MedAlly make clinical decisions for physicians?',
    a: 'No. MedAlly is designed to support physicians with reviewable information. Clinicians remain responsible for reviewing outputs, applying clinical judgment, and making final decisions.'
  },
  {
    q: 'Who is MedAlly designed for?',
    a: 'MedAlly is designed for physicians, practices, clinics, hospitals, and healthcare organizations looking to integrate clinical AI into clinical and administrative workflows.'
  }
];

const LandingPage: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [comparisonState, setComparisonState] = useState<'traditional' | 'medally'>('medally');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <Layout>
      <SEO
        title="Clinical AI Platform for Physicians & Healthcare Teams | MedAlly"
        description="MedAlly is a clinical AI platform that supports documentation, encounter context, reviewable decision support and coding workflows while keeping physicians in control."
        url="https://www.medally.ai/"
        image="/images/medally/clinical-hero.webp"
        imageAlt="MedAlly Clinical AI Platform for Physicians"
        keywords={[
          'clinical AI platform',
          'clinical AI',
          'clinical workflow intelligence',
          'AI for physicians',
          'clinical workflow',
          'clinical documentation',
          'decision support'
        ]}
      />

      <main className="bg-background text-foreground overflow-x-hidden transition-colors duration-300">

        {/* =========================================================================
            SECTION 4.1: HERO (Obsidian Hero with Single H1)
            ========================================================================= */}
        <Hero />

        {/* =========================================================================
            SECTION 4.2: AEO / GEO ENTITY DEFINITION
            Purpose: Clean, visible, extractable definition of MedAlly near top of page
            ========================================================================= */}
        <section className="py-20 lg:py-28 relative border-b border-border bg-muted/20">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="glass-obsidian rounded-[2.5rem] border border-border/70 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-4xl mx-auto">
                <MotionReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                    <Cpu className="w-3.5 h-3.5" />
                    Entity Definition
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial tracking-tight mb-8 leading-tight">
                    What is MedAlly?
                  </h2>
                </MotionReveal>

                <MotionReveal delay={0.1}>
                  <div className="space-y-6 text-base sm:text-lg lg:text-xl text-foreground/90 font-light leading-relaxed">
                    <p>
                      <strong>MedAlly</strong> is a <strong>clinical AI platform</strong> for physicians and healthcare teams. It supports clinical documentation, organizes information from the patient encounter, surfaces reviewable decision-support context, and prepares coding information within a clinician-controlled workflow.
                    </p>
                    <p className="text-muted-foreground">
                      MedAlly is designed to assist clinical work—not replace physician judgment. Clinicians remain responsible for reviewing, editing, validating, and approving outputs before they become part of the care workflow.
                    </p>
                  </div>
                </MotionReveal>

                <MotionReveal delay={0.2} className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border text-xs font-semibold text-foreground">
                      <UserCheck className="w-3.5 h-3.5 text-teal-500" />
                      Physician-in-the-Loop
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border text-xs font-semibold text-foreground">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                      Clinician-Controlled AI
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border text-xs font-semibold text-foreground">
                      <Lock className="w-3.5 h-3.5 text-blue-500" />
                      HIPAA Compliant
                    </span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    AI prepares · Clinicians review · Clinicians decide
                  </span>
                </MotionReveal>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4.3: PROBLEM FRAMING
            Purpose: Explain the workflow problem without unverified statistics
            ========================================================================= */}
        <section className="py-24 lg:py-36 relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#4b268310_0%,transparent_50%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-5">
                <MotionReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 text-xs font-bold uppercase tracking-widest mb-6 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-coral-alert" />
                    Encounter Reality
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                    One Patient Encounter Creates <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-alert to-[#e41e3a]">More Than a Note</span>
                  </h2>
                </MotionReveal>

                <MotionReveal delay={0.1}>
                  <div className="space-y-4 text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-8">
                    <p className="text-foreground font-normal">
                      A clinical visit does not end when the patient leaves.
                    </p>
                    <p>
                      Documentation needs to be completed. Clinical information needs to be reviewed. Relevant context needs to be organized. Coding information may need preparation. Follow-up work may still remain.
                    </p>
                    <p>
                      When those tasks live across disconnected systems and workflows, the administrative tail of every encounter grows.
                    </p>
                    <p className="text-foreground font-medium pt-2">
                      MedAlly is designed to help bring that work into a more connected, reviewable clinical workflow.
                    </p>
                  </div>
                </MotionReveal>

                {/* Interactive State Toggle */}
                <div className="flex p-1.5 rounded-full bg-muted/50 border border-border max-w-sm shadow-inner backdrop-blur-sm">
                  <button
                    onClick={() => setComparisonState('traditional')}
                    className={`flex-1 py-3 px-6 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${comparisonState === 'traditional'
                        ? 'bg-foreground/10 text-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    <AlertCircle className="w-4 h-4 text-coral-alert" />
                    Fragmented Flow
                  </button>
                  <button
                    onClick={() => setComparisonState('medally')}
                    className={`flex-1 py-3 px-6 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${comparisonState === 'medally'
                        ? 'bg-foreground text-background dark:bg-white dark:text-[#030712] shadow-xl'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    <Sparkles className="w-4 h-4 text-teal-500" />
                    Connected Flow
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 min-h-[440px] flex items-center">
                <AnimatePresence mode="wait">
                  {comparisonState === 'traditional' ? (
                    <motion.div
                      key="trad"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full border border-red-500/30 bg-red-950/5 rounded-[2.5rem] p-8 lg:p-12 glass-obsidian relative overflow-hidden"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-12 w-12 rounded-2xl border border-red-500/20 bg-red-500/10 flex items-center justify-center text-coral-alert shadow-lg">
                          <Clock className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">The Fragmented Workflow</h3>
                          <p className="text-xs text-red-500 dark:text-red-400 font-bold uppercase tracking-wider mt-1">High Friction & Siloed Tasks</p>
                        </div>
                      </div>

                      <ul className="space-y-4">
                        {[
                          'Clinical visit ends, but documentation backlog remains pending',
                          'Toggling across disparate screens to cross-reference encounter history',
                          'Manual preparation of coding and billing details after clinic hours',
                          'Isolated decision contexts separated from the documentation workspace',
                          'Post-clinic administrative tail creating provider fatigue'
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                            <AlertCircle className="w-5 h-5 text-coral-alert/70 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="med"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full border border-teal-500/30 bg-teal-950/5 rounded-[2.5rem] p-8 lg:p-12 glass-obsidian relative overflow-hidden shadow-2xl"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-12 w-12 rounded-2xl border border-teal-500/20 bg-teal-500/10 flex items-center justify-center text-teal-500 dark:text-teal-400 shadow-lg">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">The Connected Clinical AI Workflow</h3>
                          <p className="text-xs text-teal-500 dark:text-teal-400 font-bold uppercase tracking-wider mt-1">Unified Review Pathway</p>
                        </div>
                      </div>

                      <ul className="space-y-4">
                        {[
                          'Encounter audio turns into structured documentation for review',
                          'Relevant clinical context synthesized alongside the draft note',
                          'Decision-support context surfaced for physician consideration',
                          'Coding information prepared within the workflow for verification',
                          'Clinician reviews, edits, and validates within one unified path'
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground dark:text-slate-200 leading-relaxed">
                            <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Visual Process Diagram (Semantic step labels in accessible HTML) */}
            <MotionReveal delay={0.2} className="mt-20 pt-16 border-t border-border relative">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 text-[11px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-3 backdrop-blur-sm">
                  <Activity className="w-3.5 h-3.5" /> End-to-End Execution
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground text-editorial">
                  Encounter Workflow Pipeline
                </h3>
                <p className="text-sm text-muted-foreground font-light mt-2 max-w-xl mx-auto">
                  How ambient clinical intelligence synchronizes every phase of the patient consultation.
                </p>
              </div>

              <div className="relative">
                {/* Continuous Animated Connecting Beam (Desktop) */}
                <div className="hidden lg:block absolute top-[56px] left-12 right-12 h-[2px] bg-border/80 dark:bg-border/40 overflow-hidden z-0 pointer-events-none rounded-full">
                  <motion.div
                    className="w-48 h-full bg-gradient-to-r from-transparent via-teal-500 dark:via-teal-400 to-transparent shadow-[0_0_14px_rgba(54,183,181,0.9)]"
                    animate={{
                      x: ['-100%', '650%']
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 relative z-10">
                  {[
                    { step: '01', label: 'Encounter', desc: 'Ambient audio capture during patient consultation', icon: Stethoscope },
                    { step: '02', label: 'Documentation', desc: 'Real-time structured SOAP draft generation', icon: FileText },
                    { step: '03', label: 'Clinical Context', desc: 'Synthesized medical history & previous encounters', icon: Layers },
                    { step: '04', label: 'Decision Support', desc: 'Evidence-based differential insights & alerts', icon: BrainCircuit },
                    { step: '05', label: 'Coding Context', desc: 'Automated ICD-10 & CPT code suggestions', icon: Activity },
                    { step: '06', label: 'Physician Review', desc: 'One-click clinician approval & EHR handoff', icon: UserCheck }
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08, duration: 0.5, ease: 'easeOut' }}
                        whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        className="relative p-6 rounded-3xl bg-card/80 dark:bg-card/40 backdrop-blur-xl border border-border hover:border-teal-500/50 dark:hover:border-teal-400/50 shadow-md hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 flex flex-col items-center text-center justify-between min-h-[250px] group overflow-hidden"
                      >
                        {/* Subtle top edge animated glow line on hover */}
                        <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Top Step Icon & Badge */}
                        <div className="relative mb-4 flex flex-col items-center">
                          <div className="h-14 w-14 rounded-2xl bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-teal-500/20 group-hover:border-teal-500/40 transition-all duration-300">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <span className="mt-2 text-[10px] font-mono font-bold tracking-widest text-teal-600/80 dark:text-teal-400/80 uppercase">
                            STEP {item.step}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-start">
                          <h4 className="text-base font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {item.label}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-2 font-light leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </MotionReveal>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4.4: CORE CAPABILITIES (Semantic Hub)
            ========================================================================= */}
        <section className="py-24 lg:py-36 relative border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-6 relative z-10">

            <MotionReveal className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <Layers className="w-3.5 h-3.5" />
                Comprehensive Platform
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Clinical AI Across the Workflow
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
                MedAlly brings several parts of the clinical workflow into one physician-controlled AI experience.
              </p>
            </MotionReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreCapabilities.map((cap, index) => {
                const IconComponent = cap.icon;
                return (
                  <MotionReveal key={cap.title} delay={index * 0.08} className="h-full">
                    <div className="h-full flex flex-col justify-between p-8 rounded-[2rem] border border-border bg-muted/20 hover:border-teal-500/40 hover:bg-muted/30 transition-all duration-300 group">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-background border border-border text-muted-foreground">
                            {cap.tag}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-teal-500 transition-colors">
                          {cap.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          {cap.desc}
                        </p>
                      </div>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4.5: CATEGORY DIFFERENTIATION
            Purpose: AI Scribe vs Workflow Automation vs Clinical Workflow Intelligence
            ========================================================================= */}
        <section className="py-24 lg:py-36 relative border-b border-border bg-muted/10">
          <div className="max-w-7xl mx-auto px-6 relative z-10">

            <MotionReveal className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-bold text-purple-600 dark:text-purple-400 tracking-widest uppercase mb-6">
                <BrainCircuit className="w-3.5 h-3.5" />
                Category Evolution
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Beyond the AI Medical Scribe
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground font-light leading-relaxed text-left sm:text-center">
                <p>
                  AI medical scribes have made clinical documentation faster and easier for many physicians. But documentation is only one part of the work created by a patient encounter.
                </p>
                <p className="text-foreground font-medium">
                  MedAlly connects the clinical day through <span className="text-teal-600 dark:text-teal-400 font-semibold">Clinical Workflow Intelligence</span>.
                </p>
                <p>
                  Instead of treating the note as the end of the workflow, MedAlly connects documentation with encounter context, reviewable clinical information, coding context, and the work that surrounds the visit.
                </p>
              </div>
            </MotionReveal>

            {/* 3 Pillar Comparison */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">

              <MotionReveal delay={0.1} className="h-full">
                <div className="h-full p-8 rounded-[2rem] border border-border bg-background/50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 block">
                      Single-Task AI
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      AI Medical Scribe
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Primarily captures and structures documentation.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Note-focused capture</span>
                    <Link
                      to="/ai-medical-scribe"
                      className="font-bold text-teal-600 dark:text-teal-400 hover:text-foreground inline-flex items-center group"
                    >
                      Explore Scribe
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.2} className="h-full">
                <div className="h-full p-8 rounded-[2rem] border border-border bg-background/50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 block">
                      Process Automation
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Workflow Automation
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Moves predefined tasks through a process.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border text-xs text-muted-foreground">
                    Rule-based task progression
                  </div>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.3} className="h-full">
                <div className="h-full p-8 rounded-[2rem] border-2 border-teal-500/50 bg-teal-950/10 dark:bg-teal-950/20 flex flex-col justify-between shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 bg-teal-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest rounded-bl-xl">
                    The MedAlly Approach
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-4 block">
                      Connected Intelligence
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Clinical Workflow Intelligence
                    </h3>
                    <p className="text-sm text-foreground/90 leading-relaxed font-light">
                      Uses clinical context to help organize and prepare work across the encounter while keeping clinicians responsible for review and decisions.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-teal-500/20 text-xs font-semibold text-teal-600 dark:text-teal-400">
                    Comprehensive Encounter Intelligence
                  </div>
                </div>
              </MotionReveal>

            </div>

            <MotionReveal delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/ai-medical-scribe"
                className="inline-flex h-14 items-center justify-center px-8 rounded-full bg-gradient-to-r from-[#36b7b5] to-[#2da19f] text-slate-950 hover:text-slate-950 dark:text-white dark:hover:text-white font-bold shadow-xl hover:scale-[1.02] transition-all duration-300 text-center group" 
                >
                Explore AI Medical Scribe
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-muted/60 border border-border text-foreground hover:bg-muted font-bold text-sm transition-all group"
              >
                What is Clinical Workflow Intelligence?
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MotionReveal>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4.6: HOW MEDALLY FITS INTO THE ENCOUNTER
            Purpose: Explain 6 encounter stages clearly with accessible ordered list
            ========================================================================= */}
        <section className="py-24 lg:py-36 relative border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-6 relative z-10">

            <MotionReveal className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <Activity className="w-3.5 h-3.5" />
                Step-by-Step Flow
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                How MedAlly Fits Into the Clinical Encounter
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                A seamless progression designed around clinician workflow and patient interaction.
              </p>
            </MotionReveal>

            {/* Semantic Ordered List */}
            <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 list-none p-0">
              {processWorkflowSteps.map((item, index) => (
                <MotionReveal key={item.step} delay={index * 0.08} className="h-full">
                  <li className={`h-full p-8 rounded-[2rem] border transition-all duration-300 flex flex-col justify-between ${item.highlight
                      ? 'border-teal-500/50 bg-teal-500/5 shadow-md'
                      : 'border-border bg-muted/20 hover:border-border/80'
                    }`}>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold font-mono text-teal-600 dark:text-teal-400">
                          {item.step}
                        </span>
                        {item.highlight && (
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-300">
                            Final Authority
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                </MotionReveal>
              ))}
            </ol>

            <MotionReveal delay={0.3} className="text-center">
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background dark:bg-white dark:text-[#030712] dark:hover:text-[#030712] hover:text-background font-bold text-sm shadow-xl hover:opacity-90 transition-all group"
                >
                See How MedAlly Works
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MotionReveal>

          </div>
        </section>

        {/* Live Encounter Simulation Component */}
        <LiveEncounterDemo />

        {/* =========================================================================
            SECTION 4.7: WORKFLOW SEO SECTION
            Purpose: Connected vs Fragmented Workflows
            ========================================================================= */}
        <section className="py-24 lg:py-36 relative border-b border-border bg-muted/20">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-7">
                <MotionReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                    <GitMerge className="w-3.5 h-3.5" />
                    Unified Review Path
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                    Clinical Workflows Should Feel Connected, Not Fragmented
                  </h2>
                </MotionReveal>

                <MotionReveal delay={0.1}>
                  <div className="space-y-4 text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-8">
                    <p>
                      Clinical workflows often span documentation, EHR tasks, patient information, decision support, coding, and follow-up. When those activities are fragmented across different tools, clinicians spend more time switching between systems and less time working within one coherent flow.
                    </p>
                    <p className="text-foreground font-normal">
                      MedAlly’s approach to clinical workflow intelligence is designed to help organize the work surrounding the patient encounter into a more connected review path. MedAlly supports the physician encounter as part of a broader{' '}
                      <Link
                        to="/clinical-workflow-software"
                        className="text-teal-600 dark:text-teal-400 font-bold underline underline-offset-4 hover:text-foreground transition-colors"
                      >
                        clinical workflow software
                      </Link>{' '}
                      approach that connects documentation, review, coding, follow-up, and downstream workflow steps.
                    </p>
                  </div>
                </MotionReveal>

                <MotionReveal delay={0.2}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/clinical-workflow-software"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background dark:bg-white dark:text-[#030712] dark:hover:text-[#030712] hover:text-background font-bold text-sm shadow-xl hover:opacity-90 transition-all group"
                    >
                      Clinical Workflow Software
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/features"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-sm transition-all group"
                    >
                      Explore Features
                    </Link>
                    <a
                      href="https://app.medally.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-sm transition-all text-center"
                    >
                      Launch App
                    </a>
                  </div>
                </MotionReveal>
              </div>

              <div className="lg:col-span-5">
                <div className="glass-obsidian rounded-[2.5rem] border border-border p-8 relative overflow-hidden space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-background/80 border border-border">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Continuous Clinical Flow</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Encounter dialogue directly informs note structure and context</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-background/80 border border-border">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Integrated Decision & Coding Support</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Contextual preparation without leaving the encounter workspace</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-background/80 border border-border">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Single Clinician Review Gate</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">All outputs validated and approved by the practicing clinician</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Real-Time EHR Handoff Engine Showcase */}
        <ClinicalEMRSuite />

        {/* =========================================================================
            SECTION 4.8: AUDIENCE SECTION
            Purpose: Built for the People Delivering Care
            ========================================================================= */}
        <section className="py-24 lg:py-36 relative border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-6 relative z-10">

            <MotionReveal className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <UserCheck className="w-3.5 h-3.5" />
                Tailored Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Built for the People Delivering Care
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Designed to support clinicians across varied practice models and clinical environments.
              </p>
            </MotionReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {audienceGroups.map((group, index) => {
                const IconComponent = group.icon;
                return (
                  <MotionReveal key={group.title} delay={index * 0.08} className="h-full">
                    <div className="h-full p-8 rounded-[2rem] border border-border bg-muted/20 hover:border-teal-500/40 hover:bg-muted/30 transition-all duration-300 flex flex-col justify-between group">
                      <div>
                        <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 mb-6 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-2 block">
                          {group.badge}
                        </span>
                        <h3 className="text-xl font-bold text-foreground mb-3">
                          {group.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          {group.desc}
                        </p>
                      </div>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4.9: PHYSICIAN CONTROL / TRUST
            Purpose: Make clinician oversight a consistent MedAlly trust principle
            ========================================================================= */}
        <section className="py-24 lg:py-36 relative border-b border-border bg-muted/10">
          <div className="max-w-6xl mx-auto px-6 relative z-10">

            <MotionReveal className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                Trust & Accountability
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Clinical AI Should Support Judgment, Not Replace It
              </h2>
            </MotionReveal>

            {/* 3 Pillars */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <MotionReveal delay={0.1}>
                <div className="p-8 rounded-[2rem] border border-border bg-background flex flex-col justify-between h-full">
                  <div>
                    <div className="h-10 w-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 mb-6">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      AI Prepares
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      MedAlly organizes and drafts information that can support the clinical workflow.
                    </p>
                  </div>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <div className="p-8 rounded-[2rem] border border-border bg-background flex flex-col justify-between h-full">
                  <div>
                    <div className="h-10 w-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 mb-6">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Clinicians Review
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      Physicians review, edit, validate, and interpret the information.
                    </p>
                  </div>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.3}>
                <div className="p-8 rounded-[2rem] border border-teal-500/40 bg-teal-950/10 flex flex-col justify-between h-full">
                  <div>
                    <div className="h-10 w-10 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-500 mb-6">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Clinicians Decide
                    </h3>
                    <p className="text-sm text-foreground/90 font-light leading-relaxed">
                      Clinical judgment and final responsibility remain with the clinician.
                    </p>
                  </div>
                </div>
              </MotionReveal>
            </div>

            <MotionReveal delay={0.4}>
              <div className="glass-obsidian rounded-3xl border border-border p-8 text-center max-w-3xl mx-auto">
                <p className="text-base sm:text-lg text-foreground/90 font-light leading-relaxed">
                  Healthcare AI becomes more useful when it reduces repetitive work without removing professional accountability. That principle sits at the center of how MedAlly approaches clinical AI.
                </p>
              </div>
            </MotionReveal>

          </div>
        </section>

        {/* Security Vault Component */}
        <SecurityVault />

        {/* =========================================================================
            SECTION 4.10: CLINICAL DOCUMENTATION ACQUISITION
            Purpose: Commercial paths for documentation and scribe queries
            ========================================================================= */}
        <section className="py-24 lg:py-32 relative border-b border-border bg-background">
          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">

            <MotionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <FileText className="w-3.5 h-3.5" />
                Documentation Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                From Conversation to Reviewable Clinical Documentation
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto mb-10">
                Clinical documentation is one of the most visible areas where AI can assist physicians. MedAlly helps structure encounter information into clinical documentation that remains subject to clinician review.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/clinical-documentation-ai"
                onClick={() => {
                  window.scrollTo(0, 0);
                  document.documentElement.scrollTop = 0;
                }}
                className="inline-flex h-14 items-center justify-center px-8 rounded-full bg-gradient-to-r from-[#36b7b5] to-[#2da19f] text-slate-950 hover:text-slate-950 dark:text-white dark:hover:text-white font-bold shadow-xl hover:scale-[1.02] transition-all duration-300 text-center group"
              >
                Explore AI Clinical Documentation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ai-medical-scribe"
                onClick={() => {
                  window.scrollTo(0, 0);
                  document.documentElement.scrollTop = 0;
                }}
                className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/40 backdrop-blur-md text-foreground hover:bg-muted font-bold text-base transition-all text-center group"
              >
                Explore AI Medical Scribe
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MotionReveal>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4.11: HOMEPAGE FAQ / AEO BLOCK
            Purpose: High-value crawlable Q&A accordions
            ========================================================================= */}
        <section className="py-24 lg:py-36 relative border-b border-border bg-muted/20">
          <div className="max-w-4xl mx-auto px-6 relative z-10">

            <MotionReveal className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <HelpCircle className="w-3.5 h-3.5" />
                Answers & Insights
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-editorial leading-tight mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Clear answers about MedAlly, clinical AI platforms, and clinical workflow intelligence.
              </p>
            </MotionReveal>

            <div className="space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <MotionReveal key={index} delay={index * 0.05}>
                    <div className="rounded-2xl border border-border bg-background/80 overflow-hidden transition-all duration-300">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-semibold text-foreground text-base sm:text-lg hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="font-editorial">{item.q}</span>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-teal-500' : ''}`} />
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out px-6 ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden'
                          }`}
                      >
                        <div className="border-t border-border/50 pt-4 space-y-3">
                          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                            {item.a}
                          </p>
                          {item.link && (
                            <div>
                              <Link
                                to={item.link}
                                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:text-foreground transition-colors group"
                              >
                                {item.linkText}
                                <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>

            <MotionReveal delay={0.3} className="text-center mt-12">
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
            SECTION 4.12: FINAL CONVERSION SECTION
            ========================================================================= */}
        <section className="py-32 lg:py-44 relative overflow-hidden bg-background text-foreground">
          {/* Back Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,#36b7b515_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(90deg, hsla(var(--foreground) / 0.2) 1px, transparent 1px), linear-gradient(hsla(var(--foreground) / 0.2) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <MotionReveal>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground text-editorial mb-8 leading-[1.15]">
                Bring More of the Clinical Workflow <br className="hidden md:inline" />
                Into One <span className="text-gradient-teal font-light">Reviewable Experience</span>
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed mb-6">
                Start with clinical documentation and discover how MedAlly can support the broader workflow surrounding every patient encounter.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-muted/40 text-xs sm:text-sm font-medium text-foreground mb-10">
                <Sparkles className="w-4 h-4 text-teal-500 shrink-0" />
                <span><strong>AI prepares.</strong> Clinicians review. Clinicians decide.</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-md mx-auto">
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
                className="inline-flex h-14 items-center justify-center px-8 rounded-full border border-border bg-muted/50 backdrop-blur-md text-foreground hover:bg-muted transition-all duration-300 text-center font-bold"
              >
                Book a Demo
              </a>
            </MotionReveal>
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default LandingPage;

