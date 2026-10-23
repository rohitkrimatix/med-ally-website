// @ts-nocheck
import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Clipboard,
  Beaker,
  Activity,
  Stethoscope,
  BarChart2,
  BookOpen,
  Briefcase,
  Pill,
  Heart,
  Shield,
  Brain,
  Zap,
  Users,
  MessageCircle,
  DollarSign,
  CheckCircle2,
  Cpu,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MotionReveal } from './MotionReveal';

interface AIAgent {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  sizzle: string;
  benefits: string[];
  color: string;
  category: string;
  statistic?: string;
  impact?: string;
  integration?: string;
}

const categories = [
  { id: 'doc', label: 'Documentation & Records', icon: <FileText className="w-4 h-4" />, color: '#36b7b5' },
  { id: 'diag', label: 'Diagnostics & Labs', icon: <Activity className="w-4 h-4" />, color: '#e41e3a' },
  { id: 'treat', label: 'Treatment & Monitoring', icon: <Heart className="w-4 h-4" />, color: '#fccc03' },
  { id: 'ops', label: 'Intelligent Ops & Billing', icon: <DollarSign className="w-4 h-4" />, color: '#4b2683' },
];

const AIAgents: FC = () => {
  const [activeCategory, setActiveCategory] = useState('doc');
  const [selectedAgent, setSelectedAgent] = useState<string>('scribe');

  const agents: AIAgent[] = [
    // Documentation
    {
      id: 'scribe',
      name: 'MedAlly ScribeAI',
      icon: <FileText />,
      category: 'doc',
      description: 'Multilingual AI Scribe',
      sizzle: 'Instantly converts ambient clinical conversations into perfectly structured SOAP notes in 50+ languages.',
      benefits: [
        'Autonomous clinical documentation in real-time',
        'Reduces physician note burden by 80%',
        'Understands complex medical jargon & regional accents'
      ],
      color: 'teal',
      statistic: '2 hrs saved per day',
      impact: 'Documentation time down 80%'
    },
    {
      id: 'docflow',
      name: 'MedAlly DocFlow',
      icon: <Clipboard />,
      category: 'doc',
      description: 'AI-Optimized Workflows',
      sizzle: 'Pre-fills and structures H&P, discharge summaries, and consult notes via intelligent templates.',
      benefits: [
        'Real-time regulatory alignment',
        'Instant narrative structuring',
        'Cross-template consistency engine'
      ],
      color: 'teal',
      statistic: '99.8% compliance rate',
      integration: 'Syncs to EPIC, Cerner'
    },
    {
      id: 'commsai',
      name: 'MedAlly CommsAI',
      icon: <MessageCircle />,
      category: 'doc',
      description: 'Adaptive Clinical Communication',
      sizzle: 'Fine-tunes document tone & complexity tailored to physicians, insurance claims, or patients.',
      benefits: [
        'Simplifies jargon into patient-friendly briefs',
        'Optimizes phrasing for billing approval',
        'Maintains absolute legal consistency'
      ],
      color: 'teal',
      statistic: '64% better patient retention',
      impact: 'Claims denials dropped by 42%'
    },
    // Diagnostics
    {
      id: 'labintel',
      name: 'MedAlly LabIntel',
      icon: <Beaker />,
      category: 'diag',
      description: 'Predictive Results Analysis',
      sizzle: 'Auto-flags abnormal laboratory values and projects downstream patient risk categories immediately.',
      benefits: [
        'Continuous background lab screening',
        'Autonomous alerting of impending crisis',
        'Contextual value ranking system'
      ],
      color: 'coral-alert',
      statistic: '98.7% critical value detection',
      impact: 'Alerts processed 3x faster'
    },
    {
      id: 'diagnostix',
      name: 'MedAlly Diagnostix',
      icon: <Activity />,
      category: 'diag',
      description: 'Differential Diagnosis Engine',
      sizzle: 'A clinical-grade, self-improving disease ranking engine that identifies frequently overlooked conditions.',
      benefits: [
        'AI-driven predictive differential trees',
        'Highlights subtle outlier symptoms',
        'Cross-references global medical databases'
      ],
      color: 'coral-alert',
      statistic: '93% accuracy index',
      impact: 'Reduced misdiagnoses by 47%'
    },
    {
      id: 'testguide',
      name: 'MedAlly TestGuide',
      icon: <Stethoscope />,
      category: 'diag',
      description: 'Diagnostic Priority Orchestrator',
      sizzle: 'Recommends high-yield diagnostic testing while actively eliminating unnecessary or redundant protocols.',
      benefits: [
        'Algorithmic test cost/benefit scoring',
        'Reduces redundant procedures instantly',
        'Improves insurance approval velocity'
      ],
      color: 'coral-alert',
      statistic: '32% fewer redundant tests',
      impact: 'Saves $1,240 per patient avg'
    },
    {
      id: 'insight',
      name: 'MedAlly Insight',
      icon: <BarChart2 />,
      category: 'diag',
      description: 'Predictive Trend Synthesis',
      sizzle: 'Analyzes historically disparate health graphs to establish longitudinal predictive health vectors.',
      benefits: [
        'Multimodal data pattern detection',
        'Brings dark lab trends to light',
        'Translates raw digits into semantic insights'
      ],
      color: 'coral-alert',
      statistic: '87% faster correlation time',
      integration: 'Bi-directional HL7 integrations'
    },
    // Treatment
    {
      id: 'carepath',
      name: 'MedAlly CarePath',
      icon: <BookOpen />,
      category: 'treat',
      description: 'Evidence-Based AI Pathways',
      sizzle: 'Generates real-time, patient-tailored clinical implementation plans directly aligned to modern consensus.',
      benefits: [
        'Personalized guideline translation',
        'Dynamically updates to new medical literature',
        'Minimizes practice variance across networks'
      ],
      color: 'yellow-mint',
      statistic: '200+ global guidelines mapped',
      impact: 'Clinical outcomes boosted 28%'
    },
    {
      id: 'treatwise',
      name: 'MedAlly TreatWise',
      icon: <Briefcase />,
      category: 'treat',
      description: 'Care Plan Realization',
      sizzle: 'Guides the clinical staff step-by-step during the deployment of critical clinical protocols.',
      benefits: [
        'Dynamic next-step prompt vectors',
        'Tracks clinical team checklist hygiene',
        'Flags treatment protocol deviation'
      ],
      color: 'yellow-mint',
      statistic: '41% increase in protocol safety',
      impact: 'Readmission risk dropped 36%'
    },
    {
      id: 'rxgen',
      name: 'MedAlly RxGen',
      icon: <Pill />,
      category: 'treat',
      description: 'AI Dosage Optimizer',
      sizzle: 'Mitigates critical adverse polypharmacy dynamics while adjusting dosages tailored to specific patient profiles.',
      benefits: [
        'Comprehensive drug-interaction scanning',
        'Considers renal clearance & weight curves',
        'Predicts patient medication non-adherence'
      ],
      color: 'yellow-mint',
      statistic: '94% reduction in adverse events',
      impact: 'Scans 1,200+ markers instantly'
    },
    {
      id: 'pulse',
      name: 'MedAlly Pulse',
      icon: <Heart />,
      category: 'treat',
      description: 'Deterioration Trend Monitor',
      sizzle: 'Early-warning tracking network that flags physiologic decompensation hours before vitals collapse.',
      benefits: [
        'Continuous algorithmic vitals checking',
        'Identifies sub-clinical decline arcs',
        'Direct routing to nurse response nodes'
      ],
      color: 'yellow-mint',
      statistic: '72-hour advance warning scope',
      impact: '38% fewer emergent ICU transfers'
    },
    {
      id: 'shield',
      name: 'MedAlly Shield',
      icon: <Shield />,
      category: 'treat',
      description: 'High-Risk Contingency Planner',
      sizzle: 'Pre-generates specific algorithmic backup plans for high-complexity patients during high-risk intervals.',
      benefits: [
        'Crisis escalation preparedness',
        'Autonomous contingency generation',
        'Standardizes emergency rescue efforts'
      ],
      color: 'yellow-mint',
      statistic: '4.2m faster crisis reaction',
      impact: '26% boost in survival matrices'
    },
    // Ops
    {
      id: 'intellicare',
      name: 'MedAlly IntelliCare',
      icon: <Brain />,
      category: 'ops',
      description: 'Command Layer Intelligence',
      sizzle: 'Aggregate brain linking physical workflows to centralized real-world clinical intelligence arrays.',
      benefits: [
        'Synthesizes data from 16-agent ecosystem',
        'Self-optimizing execution architecture',
        'Delivers macro practice management insights'
      ],
      color: 'purple',
      statistic: '1M+ aggregated learnings daily',
      integration: 'Core API architecture'
    },
    {
      id: 'neurolearn',
      name: 'MedAlly NeuroLearn',
      icon: <Zap />,
      category: 'ops',
      description: 'Pattern Learning Canvas',
      sizzle: 'Neural learning matrix that refines differential accuracy based on internal outcome telemetry.',
      benefits: [
        'Localized clinic pattern adaptation',
        'Continuously trains on anonymous files',
        'Helps build specialized private databases'
      ],
      color: 'purple',
      statistic: '22% accuracy scaling per mo',
      impact: 'Identifies 340+ niche conditions'
    },
    {
      id: 'specialtysync',
      name: 'MedAlly SpecialtySync',
      icon: <Users />,
      category: 'ops',
      description: 'Smart Clinical Personalization',
      sizzle: 'Calibrates all downstream MedAlly functions specifically for 20+ custom niche clinical fields.',
      benefits: [
        'Tailors language for Dermatology, Oncology, etc.',
        'Prioritizes specialty-relevant diagnostics',
        'Fits unique anatomical chart layouts'
      ],
      color: 'purple',
      statistic: 'Supports 24+ clinical divisions',
      integration: 'Specialty EHR integration core'
    },
    {
      id: 'codex',
      name: 'MedAlly Codex',
      icon: <DollarSign />,
      category: 'ops',
      description: 'AI Medical Billing & Coding',
      sizzle: 'Seamlessly maps narrative charts into highly accurate ICD-10, CPT, and HCPCS reimbursement datasets.',
      benefits: [
        'Auto-generates accurate coding justifications',
        'Accelerates medical billing throughput',
        'Actively reduces provider undercoding loss'
      ],
      color: 'purple',
      statistic: '99.7% medical coding precision',
      impact: '14% direct top-line revenue boost'
    }
  ];

  const filteredAgents = agents.filter(agent => agent.category === activeCategory);
  const selectedAgentData = agents.find(a => a.id === selectedAgent) || agents[0];

  // Auto select the first agent of category when category changes
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const firstOfCat = agents.find(a => a.category === catId);
    if (firstOfCat) setSelectedAgent(firstOfCat.id);
  };

  const getBorderColor = (catId: string) => {
    switch (catId) {
      case 'doc': return 'border-teal-500/30 bg-teal-500/5';
      case 'diag': return 'border-red-500/30 bg-red-500/5';
      case 'treat': return 'border-[#fccc03]/30 bg-[#fccc03]/5';
      case 'ops': return 'border-purple-500/30 bg-purple-500/5';
      default: return 'border-slate-800';
    }
  };


  const currentAccentColor = categories.find(c => c.id === activeCategory)?.color || '#36b7b5';

  return (
    <section className="py-24 lg:py-40 relative overflow-hidden border-b border-border">
      {/* Background Radial Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${currentAccentColor}15 0%, transparent 70%)`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <MotionReveal className="text-center mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            The Clinical Core
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-editorial leading-tight">
            Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">Orchestration Layer</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            MedAlly interlinks 16 purpose-built clinical AI agents acting as a unified command nervous system, eliminating administrative decay while putting the physician at the center of control.
          </p>
        </MotionReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-start min-h-[600px]">
          
          {/* Left Sidebar - Category Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 ml-2">Capabilities</h3>
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`relative w-full text-left p-5 rounded-3xl transition-all duration-300 border group overflow-hidden ${
                    isActive 
                      ? 'border-border bg-muted/40 shadow-md' 
                      : 'border-transparent bg-transparent hover:bg-muted/20'
                  }`}
                >
                  {/* Active highlight left border line */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeCategoryLine"
                      className="absolute left-0 top-0 bottom-0 w-1.5 rounded-r-full"
                      style={{ backgroundColor: category.color }}
                    />
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                      isActive 
                        ? 'border-border bg-muted/80 scale-105' 
                        : 'border-border/40 bg-transparent group-hover:border-border'
                    }`}
                    style={{ color: isActive ? category.color : '#94a3b8' }}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h4 className={`font-semibold tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-foreground text-lg' : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                        {category.label}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">
                        {agents.filter(a => a.category === category.id).length} Agents Integrated
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Summary Stat Box */}
            <div className="mt-10 p-6 rounded-3xl border border-border/60 bg-muted/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-xl bg-[#36b7b5]/10 border border-[#36b7b5]/20 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-[#36b7b5]" />
                </div>
                <h5 className="text-sm font-bold text-foreground tracking-tight">Unified AI Architecture</h5>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Unlike disconnected tools, our 16 agents share a secure underlying patient context, allowing documentation to automatically spark diagnostics and billing triggers instantaneously.
              </p>
            </div>
          </div>

          {/* Center & Right - The Dynamic Canvas */}
          <div className="lg:col-span-8 flex flex-col lg:flex-row gap-6">
            
            {/* Agent Cluster Selection */}
            <div className="flex-1 grid gap-3 self-start">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 ml-2">Active Sub-Agents</h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3 w-full"
                >
                  {filteredAgents.map((agent) => {
                    const isSelected = selectedAgent === agent.id;
                    return (
                      <motion.button
                        key={agent.id}
                        layoutId={`agent-${agent.id}`}
                        onClick={() => setSelectedAgent(agent.id)}
                        className={`relative w-full text-left p-4 rounded-2xl transition-all duration-300 border flex items-center justify-between group ${
                          isSelected
                            ? getBorderColor(activeCategory) + ' scale-[1.02]'
                            : 'border-border/40 bg-muted/20 hover:border-border hover:bg-muted/40'
                        }`}
                      >
                        <div className="flex items-center gap-4 z-10">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                            isSelected 
                              ? 'bg-white/5' 
                              : 'bg-background border-border'
                          }`}
                          style={{
                            borderColor: isSelected ? currentAccentColor + '40' : 'rgba(255,255,255,0.05)',
                            color: isSelected ? currentAccentColor : '#64748b'
                          }}
                          >
                            {agent.icon}
                          </div>
                          <div>
                            <h5 className={`font-bold text-sm transition-colors ${
                              isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                            }`}>{agent.name}</h5>
                            <p className="text-xs text-muted-foreground">{agent.description}</p>
                          </div>
                        </div>

                        {/* Pulsing indicator if selected */}
                        {isSelected ? (
                          <motion.div 
                            layoutId="selectedAgentBubble"
                            className="h-2 w-2 rounded-full mr-2"
                            style={{ backgroundColor: currentAccentColor }}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Detailed Info Panel */}
            <div className="flex-1 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedAgent}
                  initial={{ opacity: 0, scale: 0.98, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full glass-obsidian rounded-[2rem] p-8 relative flex flex-col overflow-hidden border border-border"
                >
                  {/* Absolute abstract corner accent */}
                  <div 
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ backgroundColor: currentAccentColor }}
                  />

                  <div className="flex items-start justify-between mb-6 z-10">
                    <div 
                      className="p-4 rounded-2xl border bg-muted/50 shadow-lg"
                      style={{ 
                        borderColor: currentAccentColor + '30',
                        color: currentAccentColor
                      }}
                    >
                      {selectedAgentData.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-80">Clinical Node</div>
                      <div className="text-xs font-bold font-mono text-muted-foreground/70 mt-0.5">ID: {selectedAgentData.id.toUpperCase()}</div>
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold text-foreground text-editorial mb-3 z-10">{selectedAgentData.name}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed bg-muted/30 border border-border/50 px-4 py-3.5 rounded-2xl mb-6 italic">
                    "{selectedAgentData.sizzle}"
                  </p>

                  <div className="space-y-4 mb-8 flex-grow z-10">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Key Clinical Benefits</h5>
                    <ul className="space-y-3">
                      {selectedAgentData.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground text-xs leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: currentAccentColor }} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metric Banner at Bottom */}
                  <div className="border-t border-border pt-6 mt-auto z-10">
                    <div className="grid grid-cols-2 gap-4">
                      {selectedAgentData.statistic && (
                        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60">
                          <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-wider">Benchmark Metric</div>
                          <div className="text-sm font-bold text-foreground tracking-tight">{selectedAgentData.statistic}</div>
                        </div>
                      )}
                      {(selectedAgentData.impact || selectedAgentData.integration) && (
                        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60">
                          <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-wider">
                            {selectedAgentData.impact ? 'Physician Impact' : 'System Interop'}
                          </div>
                          <div className="text-sm font-bold text-foreground tracking-tight truncate">
                            {selectedAgentData.impact || selectedAgentData.integration}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* Quick Actions Callout Banner */}
        <MotionReveal delay={0.2} className="mt-20 p-8 sm:p-10 rounded-[2.5rem] border border-[#36b7b5]/20 bg-gradient-to-r from-muted/50 to-muted/30 relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Custom accent circle */}
          <div className="absolute -bottom-32 -left-20 w-64 h-64 bg-[#36b7b5]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <h4 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-2 font-serif">Ready to experience high-fidelity clinical AI?</h4>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">
              Deploy the MedAlly ecosystem within your clinic under a strict, HIPAA-compliant pilot program today. Focus on care, let the agents orchestrate the rest.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <a
              href="https://app.medally.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center px-8 rounded-full bg-gradient-to-r from-[#36b7b5] to-[#2da19f] text-slate-950 dark:text-white font-bold shadow-lg shadow-teal-900/50 hover:shadow-teal-400/20 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              Start Platform Tour
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </MotionReveal>

      </div>
    </section>
  );
};

export default AIAgents;
