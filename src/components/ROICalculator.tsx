// @ts-nocheck
import { type FC, useState, useEffect, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Label } from "@/components/ui/label";
import {
  Clock, Users, DollarSign, TrendingUp,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  ArrowUpDown,
  Sparkles
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { type ROIFormData, type ROIMetrics } from '@/types';
import {
  formatCurrency, formatTime, formatPatients,
  ROI_CONSTANTS, calculateROI
} from '@/lib/roi-calculator';


const ROICalculator: FC = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(calculatorRef, { once: false, amount: 0.1 });
  const [activeMetric, setActiveMetric] = useState<number | null>(null);
  const [, setHoveredChart] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Centralized theme observer to feed SVG chart context
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);

  const chartTheme = {
    text: isDark ? '#94a3b8' : '#64748b',
    tooltipStyle: {
      fontSize: '11px',
      padding: '12px 16px',
      background: isDark ? '#030712' : '#ffffff',
      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
      borderRadius: '12px',
      color: isDark ? '#ffffff' : '#0f172a',
      boxShadow: 'var(--glass-shadow)'
    },
    axisColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    legacyBar: isDark ? '#1e293b' : '#e2e8f0',
  };

  const [formData, setFormData] = useState<ROIFormData>(ROI_CONSTANTS.DEFAULT_VALUES);

  const [metrics, setMetrics] = useState<ROIMetrics>({
    hoursSaved: 0,
    moneySaved: 0,
    patientsPerYear: 0,
    additionalPatientsCapacity: 0
  });

  const computeROI = useCallback(() => {
    setMetrics(calculateROI(formData));
  }, [formData]);

  useEffect(() => {
    computeROI();
  }, [computeROI]);

  const metricCards = [
    { 
      title: 'Hours Saved / Year', 
      value: metrics.hoursSaved, 
      icon: <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />, 
      bg: 'bg-teal-500/10 border-teal-500/20', 
      description: 'Time returned for patients.' 
    },
    { 
      title: 'Economic Value / Year', 
      value: formatCurrency(metrics.moneySaved), 
      icon: <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />, 
      bg: 'bg-emerald-500/10 border-emerald-500/20', 
      description: 'Direct clinic bottom-line impact.' 
    },
    { 
      title: 'Added Encounter Capacity', 
      value: metrics.additionalPatientsCapacity, 
      icon: <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />, 
      bg: 'bg-purple-500/10 border-purple-500/20', 
      description: 'Capacity for practice growth.' 
    },
    { 
      title: 'Efficiency Multiplier', 
      value: `${ROI_CONSTANTS.EFFICIENCY_INCREASE_PERCENTAGE * 100}%`, 
      icon: <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />, 
      bg: 'bg-amber-500/10 border-amber-500/20', 
      description: 'Velocity scale of automation.' 
    }
  ];

  const yearlyMetrics = Array.from({ length: 5 }, (_, i) => ({
    year: `Year ${i + 1}`,
    savings: metrics.moneySaved * (i + 1)
  }));

  const pieData = [
    { name: 'Core Documentation', value: formData.minutesPerNote * (1 - ROI_CONSTANTS.TIME_SAVED_PERCENTAGE) },
    { name: 'Recovered Capacity', value: formData.minutesPerNote * ROI_CONSTANTS.TIME_SAVED_PERCENTAGE }
  ];

  const patientGrowthData = Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    patients: Math.round(metrics.patientsPerYear / 12 * (1 + i * ROI_CONSTANTS.MONTHLY_GROWTH_RATE))
  }));

  const efficiencyData = [
    { name: 'Docs', before: formData.minutesPerNote, after: formData.minutesPerNote * (1 - ROI_CONSTANTS.TIME_SAVED_PERCENTAGE) },
    { name: 'Care', before: ROI_CONSTANTS.PATIENT_CARE.BEFORE, after: ROI_CONSTANTS.PATIENT_CARE.AFTER },
    { name: 'Followup', before: ROI_CONSTANTS.FOLLOW_UPS.BEFORE, after: ROI_CONSTANTS.FOLLOW_UPS.AFTER }
  ];

  function handleInputChange(id: keyof ROIFormData, value: string): void {
    const nextValue = Number(value);
    if (!Number.isFinite(nextValue)) return;
    setFormData(prev => ({ ...prev, [id]: nextValue }));
  }

  return (
    <section
      data-testid="roi-calculator"
      className="relative py-16 lg:py-24 overflow-hidden bg-card text-foreground rounded-[3rem] border border-border shadow-2xl transition-colors duration-300"
      ref={calculatorRef}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#36b7b5]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-4 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3 h-3" /> Practice Economics
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-editorial">The Fiscal <span className="text-teal-600 dark:text-teal-400 font-light">Projection Matrix</span></h3>
          <p className="text-muted-foreground text-sm mt-4 max-w-lg mx-auto font-light">Manipulate the variables below to calculate the precise operational dividends unlocked by MedAlly across your network.</p>
        </div>

        <div className="space-y-8">
          
          {/* 4 Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricCards.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, borderColor: 'hsla(var(--teal-primary) / 0.3)' }}
                onMouseEnter={() => setActiveMetric(index)}
                onMouseLeave={() => setActiveMetric(null)}
                className={`glass-medally p-6 rounded-2xl border border-border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-10 w-10 rounded-xl border flex items-center justify-center ${metric.bg}`}>
                    {metric.icon}
                  </div>
                  {activeMetric === index && (
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
                      <Sparkles className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  )}
                </div>
                <div className="mt-auto">
                  <h4 className="text-3xl font-bold text-foreground tracking-tight mb-1 font-serif text-editorial">{metric.value}</h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{metric.title}</p>
                  <p className="text-[10px] text-muted-foreground/80 font-light">{metric.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Side: Adjustable Inputs */}
            <div className="lg:col-span-5 glass-medally p-8 rounded-3xl border border-border flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-foreground mb-6 font-editorial flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Parameters
                </h4>
                <div className="space-y-8">
                  {[
                    { id: 'patientsPerDay', label: 'Average Daily Patient Count', min: 5, max: 60, step: 1, format: (v) => `${v} / day` },
                    { id: 'minutesPerNote', label: 'Baseline Minutes / SOAP Note', min: 5, max: 45, step: 1, format: (v) => `${v} min` },
                    { id: 'daysPerWeek', label: 'Clinic Days / Week', min: 3, max: 7, step: 1, format: (v) => `${v} days` },
                    { id: 'hourlyRate', label: 'Target Clinician Hourly Rate', min: 80, max: 400, step: 5, format: (v) => `$${v} / hr` }
                  ].map((field) => (
                    <div key={field.id} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label htmlFor={field.id} className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {field.label}
                        </Label>
                        <span className="text-sm font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-md font-mono">
                          {field.format(formData[field.id])}
                        </span>
                      </div>
                      <input
                        id={field.id}
                        name={field.id}
                        aria-valuetext={field.format(formData[field.id])}
                        type="range"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={formData[field.id]}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full accent-teal-500 h-1 bg-muted border border-border rounded-lg appearance-none cursor-pointer transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-border flex items-center gap-4 text-xs text-muted-foreground leading-relaxed">
                <Clock className="w-5 h-5 text-purple-500 dark:text-purple-400 shrink-0" />
                <p>Models reflect weighted savings metrics based on real-world physician practice datasets (2025).</p>
              </div>
            </div>

            {/* Right Side: The Charts Data Matrix */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              
              {/* Pie Chart - Time Distribution */}
              <div 
                className="glass-medally p-5 rounded-2xl border border-border flex flex-col overflow-hidden"
                onMouseEnter={() => setHoveredChart('time')}
                onMouseLeave={() => setHoveredChart(null)}
              >
                <div className="flex items-center gap-2 mb-4">
                  <PieChartIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Encounter Time Span</h5>
                </div>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={38}
                        outerRadius={55}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        <Cell fill={chartTheme.legacyBar} stroke={chartTheme.axisColor} />
                        <Cell fill="#36b7b5" stroke={chartTheme.axisColor} />
                      </Pie>
                      <Tooltip 
                        formatter={(v) => formatTime(Number(v))} 
                        contentStyle={chartTheme.tooltipStyle}
                        itemStyle={{ color: chartTheme.tooltipStyle.color }}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        iconSize={6} 
                        formatter={(value) => <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold ml-1">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Line Chart - Cumulative Savings */}
              <div 
                className="glass-medally p-5 rounded-2xl border border-border flex flex-col overflow-hidden"
                onMouseEnter={() => setHoveredChart('savings')}
                onMouseLeave={() => setHoveredChart(null)}
              >
                <div className="flex items-center gap-2 mb-4">
                  <LineChartIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">5-Year Projection</h5>
                </div>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={yearlyMetrics} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                      <XAxis dataKey="year" tick={{ fontSize: '10px', fill: chartTheme.text, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: '10px', fill: chartTheme.text, fontFamily: 'monospace' }} tickFormatter={(v) => `$${v/1000}k`} axisLine={false} tickLine={false} />
                      <Tooltip 
                        formatter={(v) => formatCurrency(Number(v))} 
                        contentStyle={chartTheme.tooltipStyle}
                        itemStyle={{ color: chartTheme.tooltipStyle.color }}
                      />
                      <Line
                        type="monotone"
                        dataKey="savings"
                        stroke="#36b7b5"
                        strokeWidth={3}
                        dot={{ r: 3, fill: isDark ? '#030712' : '#ffffff', stroke: '#36b7b5', strokeWidth: 2 }}
                        activeDot={{ r: 5, stroke: isDark ? '#ffffff' : '#030712', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart - Patient Growth */}
              <div 
                className="glass-medally p-5 rounded-2xl border border-border flex flex-col overflow-hidden"
                onMouseEnter={() => setHoveredChart('patients')}
                onMouseLeave={() => setHoveredChart(null)}
              >
                <div className="flex items-center gap-2 mb-4">
                  <BarChartIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Compound Flow Growth</h5>
                </div>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={patientGrowthData} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                      <XAxis dataKey="month" tick={{ fontSize: '10px', fill: chartTheme.text, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: '10px', fill: chartTheme.text, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        formatter={(v) => formatPatients(Number(v))} 
                        contentStyle={chartTheme.tooltipStyle}
                        itemStyle={{ color: chartTheme.tooltipStyle.color }}
                      />
                      <Bar dataKey="patients" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Vertical Bar Chart - Efficiency */}
              <div 
                className="glass-medally p-5 rounded-2xl border border-border flex flex-col overflow-hidden"
                onMouseEnter={() => setHoveredChart('efficiency')}
                onMouseLeave={() => setHoveredChart(null)}
              >
                <div className="flex items-center gap-2 mb-4">
                  <ArrowUpDown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Operational Velocity</h5>
                </div>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={efficiencyData} layout="vertical" margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                      <XAxis type="number" tick={{ fontSize: '10px', fill: chartTheme.text, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: '10px', fill: chartTheme.text, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        formatter={(v) => formatTime(Number(v))} 
                        contentStyle={chartTheme.tooltipStyle}
                        itemStyle={{ color: chartTheme.tooltipStyle.color }}
                      />
                      <Bar dataKey="before" name="Legacy" fill={chartTheme.legacyBar} radius={[0, 4, 4, 0]} />
                      <Bar dataKey="after" name="MedAlly" fill="#36b7b5" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ROICalculator;
