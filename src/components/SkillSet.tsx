import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Database, Code2, ShieldCheck, FileText, GitBranch,
  AlertTriangle, Package, BarChart2, Repeat,
  Factory, Layers, CalendarClock, MonitorSmartphone, Server,
  ArrowLeftRight, Settings, DollarSign, BarChart, Cog,
  Brain, Map, Globe, Languages, Truck, Cpu,
  Zap, Eye, TrendingUp, Users, Lightbulb, Wrench,
  Target, LineChart, UserCheck, Rocket, PlaneTakeoff,
  BrainCircuit, Network, Shuffle
} from 'lucide-react';

/* ─────────────────────────── Data ───────────────────────────── */
const sections = [
  {
    id: 'data',
    label: '01',
    title: 'Data Engineering & Python',
    subtitle: 'Building robust ETL pipelines, automating data workflows, and transforming raw files into business-ready intelligence.',
    color: 'from-teal-600 to-cyan-500',
    borderColor: 'border-teal-500/30',
    glowColor: 'shadow-teal-500/10',
    skills: [
      { icon: Database, title: 'Data Engineering & ETL', desc: 'Full Extract → Transform → Load pipelines — reading raw messy CSVs, cleaning them, and delivering structured, consumption-ready files.' },
      { icon: Code2, title: 'Python Programming', desc: 'Working with csv, pandas, re, os — writing multi-phase scripts with control flow, string manipulation, and file I/O.' },
      { icon: BarChart, title: 'MATLAB Computer Vision', desc: 'Used the MATLAB Image Processing Toolbox to model automated industrial defect finders for serial production lines.' },
      { icon: ShieldCheck, title: 'Data Quality & Validation', desc: 'Count distributions, inspect anomalies, and verify after fixing. A disciplined QA mindset that analyses first and fixes second.' },
      { icon: FileText, title: 'CSV / Flat File Parsing', desc: 'Expert in encoding issues (latin-1 vs utf-8-sig), field delimiters, quoted fields with embedded commas, and malformed row structures.' },
      { icon: GitBranch, title: 'Business Data Transformation', desc: 'Extracting MfgCode from ItemBarCode by pattern-matching against ManufacturerPartNumber — translating business logic into code.' },
      { icon: AlertTriangle, title: 'Error Handling & Edge Cases', desc: 'Footer lines, manufacturer names with commas, extra price-break columns — handling multiple failure modes inside a single pipeline.' },
      { icon: Package, title: 'Supply Chain / Parts Data', desc: 'Manufacturer part numbers, barcodes, price breaks, quantity tiers — inventory and catalog data for online parts distribution.' },
      { icon: BarChart2, title: 'Excel & Reporting Integration', desc: 'UTF-8 BOM encoding, column ordering, clean output — preparing data specifically for end-user consumption in Excel.' },
      { icon: Repeat, title: 'Process Automation', desc: 'Configuration blocks (INPUT_FILE, OUTPUT_FILE) signal reusable tools built for recurring file processing, not one-time cleanups.' },
    ],
  },
  {
    id: 'erp',
    label: '02',
    title: 'Manufacturing ERP & Operations',
    subtitle: 'Designing and operating enterprise manufacturing systems across Business Central, Dynamics AX, MRP, and MIL-SPEC production environments.',
    color: 'from-violet-600 to-indigo-500',
    borderColor: 'border-violet-500/30',
    glowColor: 'shadow-violet-500/10',
    skills: [
      { icon: Factory, title: 'Manufacturing ERP Architecture', desc: 'Designing end-to-end ERP systems, including architecture development, data transition, and data validation for Business Central v27+.' },
      { icon: MonitorSmartphone, title: 'Microsoft Dynamics 365 BC', desc: 'Deep functional expertise in BC v27+: production orders, planning worksheets, subcontracting, standard costing, and item variants.' },
      { icon: Server, title: 'Microsoft Dynamics AX & ERPNext', desc: 'Scale production planning in AX, plus hands-on deployment and testing of open-source ERPNext in local environments.' },
      { icon: Layers, title: 'Multi-Level Bill of Materials', desc: 'BOMs up to 7 levels deep with phantom assemblies, routing link codes, scrap factors, variant-level component selection, and subcontracting.' },
      { icon: ArrowLeftRight, title: 'ERP Data Migration', desc: 'Leading migration strategy from legacy ERP to BC: 750,000-item activity analysis, classification frameworks, cross-reference consolidation, go-live planning.' },
      { icon: Settings, title: 'MRP & Supply Chain Config', desc: 'Reordering policies, safety stock, reorder points, lead time management — demand-driven replenishment for items with 2-day to 4-month lead times.' },
      { icon: DollarSign, title: 'Standard Cost Accounting', desc: 'Multi-level standard costing: material, direct labor from routing, setup amortization, overhead, subcontracting cost, scrap allowances, and variance analysis.' },
      { icon: BarChart, title: 'Data Architecture & Analytics', desc: 'Custom table design for BOM simulation and exception tracking, plus analytics on vendor quality, scrap trends, quote conversion, and planning parameters.' },
      { icon: Cog, title: 'MIL-SPEC Connector Manufacturing', desc: 'Shell machining, outsourced plating with QC, contact hooding, insert assembly, epoxy potting, and electrical testing per MIL-DTL-38999.' },
      { icon: Map, title: 'AutoCAD & Technical Drawing', desc: 'Proficiency with technical drawings and reading/creating schematics for manufacturing production planning and component design.' },
    ],
  },
  {
    id: 'leadership',
    label: '03',
    title: 'Systems Thinking & Leadership',
    subtitle: 'Bridging engineering, operations, and AI — with international experience, bilingual communication, and an ownership mindset.',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/30',
    glowColor: 'shadow-amber-500/10',
    skills: [
      { icon: Brain, title: 'Systems Thinker', desc: 'Management Engineering education trains the eye to see processes, constraints, optimization logic, and resource flows across the entire value chain.' },
      { icon: CalendarClock, title: 'Production Planning Specialist', desc: 'Managing 2,400+ order lines/month, inventory levels, material reservations, order forecasting, and work center demand balancing.' },
      { icon: Users, title: 'Automotive Tier 1 Experience', desc: 'Tier 1 supplier environment for Audi, VW, Mercedes-Benz, BMW — just-in-time pressure, strict quality expectations, and zero tolerance for delays.' },
      { icon: Globe, title: 'Global Manufacturing Operations', desc: 'Worked across Turkey, Bulgaria, Mexico, and the United States — demonstrating international adaptability and high cross-cultural competence.' },
      { icon: Languages, title: 'Bilingual Operational Communicator', desc: 'Professional Spanish in production and logistics environments — rare and extremely valuable in North American manufacturing.' },
      { icon: Truck, title: 'Logistics + Production Bridge', desc: 'Logistics controller background means understanding customer demand visibility, delivery schedules, inventory positioning, and transportation impact.' },
      { icon: Cpu, title: 'Local AI Infrastructure Builder', desc: 'Pulled and ran models like LLaMA 3.1 and FARA 7B locally — not just using AI tools, but deploying them, signaling real technical depth.' },
      { icon: Zap, title: 'Automation Engineer (Non-traditional)', desc: 'Desktop automation agents using PyAutoGUI, OCR, and AI-generated text — combining Software + Vision + AI + ERP in rare ways.' },
      { icon: Eye, title: 'Process Signal Architect', desc: 'Designing AI-triggered signals inside workflows — automation triggers, intelligent alerts, and proactive systems built for operational response.' },
      { icon: TrendingUp, title: 'Data-Driven Planner', desc: 'Relying on demand patterns, historical data, lead times, and capacity assumptions — structured logic, not intuition.' },
      { icon: Lightbulb, title: 'AI-Augmented Operations Visionary', desc: 'Building the future of production planning: AI to predict shortages, calculate smarter ATP, and reduce manual review — Human + AI collaboration.' },
      { icon: Wrench, title: 'ERP Customization Strategist', desc: 'Never accepting out-of-the-box limits — questioning fields, Copilot prompts, and ship-sooner logic to design systems that improve decision-making.' },
      { icon: Target, title: 'Process Optimization Mindset', desc: 'Constantly asking: Where is delay created? What can be automated? What is the bottleneck? — Theory of Constraints thinking in daily practice.' },
      { icon: LineChart, title: 'Production Risk Analyst', desc: 'Sensitive to under-planning, overproduction, supply chain delay, and inventory cost — balancing risk on all sides of the planning horizon.' },
      { icon: UserCheck, title: 'Change Visibility Awareness', desc: 'Asking who changed what, where session logs are, how accountability is tracked — governance maturity built into daily ERP operations.' },
      { icon: Rocket, title: 'Entrepreneurial Curiosity', desc: 'Thinking about LLC formation, self-sponsorship, and inventing AI tools — an ownership mindset that goes beyond the job description.' },
      { icon: PlaneTakeoff, title: 'International Mobility', desc: 'Worked abroad, considers relocation, travels strategically — the flexibility that global manufacturing roles demand.' },
      { icon: BrainCircuit, title: 'AI + ERP Integration Thinker', desc: 'Designing AI that understands user requests, modifies ERP data, analyzes production data, and provides intelligent feedback — advanced enterprise thinking.' },
      { icon: Network, title: 'Technical + Business Hybrid', desc: 'Sitting between Engineering, Operations, IT, and Business — a hybrid positioning that is extremely powerful in modern manufacturing.' },
      { icon: Shuffle, title: 'Builder of the Future Manufacturing Stack', desc: '"AI-Augmented Production Planning Engineer" — designing the convergence of ERP + AI + Automation that defines next-generation manufacturing.' },
    ],
  },
];

/* ─────────────────────────── Sub-components ───────────────────────────── */

const SectionHeader: React.FC<{
  label: string; title: string; subtitle: string; color: string;
}> = ({ label, title, subtitle, color }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className="mb-12">
      <motion.span
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={`inline-block text-xs font-mono font-bold tracking-widest bg-gradient-to-r ${color} bg-clip-text text-transparent mb-3`}
      >
        SECTION {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold text-white mb-4"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-slate-400 text-base md:text-lg max-w-3xl leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

const SkillCard: React.FC<{
  icon: React.ElementType; title: string; desc: string;
  index: number; borderColor: string; glowColor: string; color: string;
}> = ({ icon: Icon, title, desc, index, borderColor, glowColor, color }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: 'easeOut' }}
      className={`group relative rounded-xl border ${borderColor} bg-slate-900/60 backdrop-blur-sm p-6
                  hover:border-opacity-80 hover:shadow-lg ${glowColor} hover:shadow-xl
                  transition-all duration-300 cursor-default`}
    >
      {/* Subtle gradient overlay on hover */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />

      <div className="flex items-start gap-4">
        <div className={`shrink-0 p-2.5 rounded-lg bg-gradient-to-br ${color} bg-opacity-10`}>
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-1.5 leading-snug">{title}</h3>
          <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────── Scroll Progress Bar ───────────────────────── */
const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-slate-800">
      <motion.div
        className="h-full bg-gradient-to-r from-teal-500 via-violet-500 to-amber-500"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.05 }}
      />
    </div>
  );
};

/* ─────────────────────────── Hero Banner ───────────────────────────────── */
const HeroBanner: React.FC = () => (
  <div className="relative overflow-hidden py-24 md:py-32 px-4 text-center">
    {/* Background grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.04)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
    {/* Glow orbs */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-4xl mx-auto"
    >
      <span className="inline-block text-xs font-mono tracking-widest text-teal-400 mb-4 border border-teal-500/30 rounded-full px-4 py-1.5 bg-teal-500/5">
        FULL SKILL PROFILE
      </span>
      <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
        What I Bring to{' '}
        <span className="bg-gradient-to-r from-teal-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
          Every Role
        </span>
      </h1>
      <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
        30+ skills across data engineering, ERP systems design, and operational leadership —
        built from real factories, real pipelines, and real production chaos.
      </p>

      {/* Stat pills */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {[
          { label: 'Skills Documented', value: '30+', color: 'text-teal-400' },
          { label: 'ERP Systems', value: '4+', color: 'text-violet-400' },
          { label: 'Countries Worked', value: '4', color: 'text-amber-400' },
          { label: 'Order Lines / Month', value: '2,400+', color: 'text-teal-400' },
        ].map((s) => (
          <div key={s.label} className="px-5 py-3 bg-slate-900 border border-slate-700 rounded-xl text-center">
            <p className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="mt-12 flex flex-col items-center gap-2 text-slate-600"
      >
        <span className="text-xs tracking-widest font-mono">SCROLL TO EXPLORE</span>
        <svg width="16" height="20" viewBox="0 0 16 24" fill="none" className="text-teal-500">
          <path d="M8 0v16M1 10l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  </div>
);

/* ─────────────────────────── Main Page ───────────────────────────────── */
const SkillSet: React.FC = () => (
  <div className="min-h-screen bg-slate-950 text-slate-200">
    <ScrollProgress />
    <HeroBanner />

    <div className="container mx-auto px-4 pb-24 space-y-28">
      {sections.map((section) => (
        <section key={section.id}>
          <SectionHeader
            label={section.label}
            title={section.title}
            subtitle={section.subtitle}
            color={section.color}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {section.skills.map((skill, i) => (
              <SkillCard
                key={skill.title}
                icon={skill.icon}
                title={skill.title}
                desc={skill.desc}
                index={i}
                borderColor={section.borderColor}
                glowColor={section.glowColor}
                color={section.color}
              />
            ))}
          </div>
        </section>
      ))}

      {/* CTA footer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center py-12 border-t border-slate-800"
      >
        <p className="text-slate-500 text-sm font-mono mb-4">READY TO COLLABORATE?</p>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Let's build something that{' '}
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            actually works.
          </span>
        </h3>
        <a
          href="#/contact"
          className="inline-block px-8 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold rounded-lg transition-colors duration-200"
        >
          Get in Touch
        </a>
      </motion.div>
    </div>
  </div>
);

export default SkillSet;
