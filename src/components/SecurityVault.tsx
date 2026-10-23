import { type FC, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, UserCheck, BadgeAlert, Server, Cpu, FileCheck } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';

const securityPillars = [
  {
    icon: <EyeOff className="w-6 h-6" />,
    title: 'Zero Voice Retention',
    copy: 'Raw clinical encounter audio undergoes volatile in-memory transcription and is immediately discarded once note drafting is completed. No audio recordings are permanently stored on disk.',
    stat: 'Ephemeral Audio Stream',
    color: 'teal'
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Enterprise Encryption',
    copy: 'Encrypted using AES-256 at rest and TLS 1.3 in transit. Designed for HIPAA compliance with Business Associate Agreements (BAA) available upon signup.',
    stat: 'AES-256 & TLS 1.3',
    color: 'purple'
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: 'Physician Sovereignty',
    copy: 'MedAlly is an assistant, not an autonomous actor. Clinical documentation never commits to your EHR without deliberate clinician review, editing, and formal approval.',
    stat: '100% Clinician Oversight',
    color: 'coral'
  }
];

export const SecurityVault: FC = () => {
  return (
    <section className="py-24 lg:py-40 relative overflow-hidden border-t border-border">
      {/* Dark Geometric Canvas Base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#36b7b503_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Security Badge Wall & Header */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20 lg:mb-32">
          
          <div className="lg:col-span-6">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-6 backdrop-blur-sm">
                <Shield className="w-3.5 h-3.5" />
                Sovereign Trust Protocol
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-editorial leading-[1.1] mb-8">
                Clinical Integrity, <span className="text-gradient-teal font-light italic">Non-Negotiable.</span>
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl">
                Healthcare requires trust, not trust-me. MedAlly aligns with healthcare security protocols from day one, supporting patient confidentiality and physician peace of mind.
              </p>
            </MotionReveal>
          </div>

          <div className="lg:col-span-6 flex flex-wrap gap-4 justify-start lg:justify-end">
            {/* Glowing Visual Badges */}
            {[
              { icon: <Lock className="w-5 h-5" />, label: 'HIPAA-Ready Architecture' },
              { icon: <FileCheck className="w-5 h-5" />, label: 'BAA on Sign-up' },
              { icon: <Server className="w-5 h-5" />, label: 'SOC2 Security Alignment' },
              { icon: <Cpu className="w-5 h-5" />, label: 'Zero-Training on Patient Data' },
            ].map((badge, idx) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-border bg-card/40 backdrop-blur-sm hover:bg-card hover:border-teal-500/20 transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-black/[0.02]"
              >
                <div className="text-teal-500 dark:text-teal-400">
                  {badge.icon}
                </div>
                <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Three Pillars Architecture Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {securityPillars.map((pillar, idx) => (
            <MotionReveal
              key={pillar.title}
              delay={idx * 0.1}
              direction="up"
              className="group h-full"
            >
              <div className="relative h-full flex flex-col justify-between p-8 lg:p-10 rounded-[2.5rem] border border-border/60 bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-foreground/20 hover:bg-card shadow-xl shadow-black/[0.01] hover:shadow-black/[0.03]">
                {/* Hover Glow Layer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-transparent to-transparent"
                     style={
                       {
                         '--tw-gradient-from': pillar.color === 'teal' ? 'rgba(54,183,181,0.05)' : pillar.color === 'purple' ? 'rgba(168,85,247,0.05)' : 'rgba(239,68,68,0.05)'
                       } as CSSProperties
                     } />

                <div>
                  {/* Floating Tech Icon Wrapper */}
                  <div className="h-14 w-14 rounded-2xl border border-border/80 flex items-center justify-center bg-muted/30 text-foreground mb-8 shadow-sm relative group-hover:scale-110 transition-all duration-300">
                    {pillar.icon}
                    {/* Behind pulsing aura */}
                    <div className="absolute inset-0 rounded-2xl bg-foreground/5 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground tracking-tight mb-4">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-12">
                    {pillar.copy}
                  </p>
                </div>

                {/* Bottom Decorative Code Stat */}
                <div className="flex items-center justify-between border-t border-border/60 pt-6 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      pillar.color === 'teal' ? 'bg-teal-500' : pillar.color === 'purple' ? 'bg-purple-500' : 'bg-coral-alert'
                    }`} />
                    <span className="text-[10px] font-mono text-muted-foreground font-bold uppercase tracking-widest">
                      System Protocol
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-foreground/70 bg-muted/50 px-2.5 py-1 rounded border border-border/40">
                    {pillar.stat}
                  </span>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Bottom Lockout Banner */}
        <MotionReveal delay={0.3} className="mt-16 lg:mt-24 flex justify-center">
          <div className="inline-flex items-center gap-4 border border-dashed border-border bg-muted/20 rounded-3xl px-6 py-4 max-w-2xl relative overflow-hidden backdrop-blur-md text-center md:text-left flex-col md:flex-row">
            <BadgeAlert className="w-6 h-6 text-amber-500 shrink-0 animate-pulse" />
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              <strong className="text-foreground font-semibold mr-1 uppercase tracking-wider text-[10px]">Zero Training Notice:</strong>
              Patient encounter data is never used to train aggregate foundational LLMs. Your practice data belongs exclusively to your medical corp.
            </p>
          </div>
        </MotionReveal>

      </div>
    </section>
  );
};

export default SecurityVault;
