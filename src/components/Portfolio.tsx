import React from 'react';
import type { Project } from '../types';
import { motion } from 'framer-motion';
import { Database, Layout, Cog, CheckCircle2 } from 'lucide-react';

const projects: Project[] = [
    {
        id: '1',
        title: 'Automated PO Issuance System',
        summary: 'A Python service that monitors inventory levels in Business Central, calculates reorder points based on lead-time variability, and drafts Purchase Orders automatically.',
        tags: ['Python', 'Business Central API', 'SQL'],
        metrics: ['Reduced stockouts by 24%', 'Saved 12 hrs/week'],
        iconType: 'auto',
    },
    {
        id: '2',
        title: 'Production Schedule Dashboard',
        summary: 'Real-time Power BI dashboard displayed on the shop floor. Combines machine sensor data with ERP job lists to show actual vs. planned throughput.',
        tags: ['Power BI', 'DAX', 'IoT'],
        metrics: ['Improved OEE by 8%', 'Real-time visibility'],
        iconType: 'bi',
    },
    {
        id: '3',
        title: 'Legacy App Data Scraper',
        summary: 'Desktop vision agent using PyAutoGUI and OpenCV to extract shipping data from a 15-year-old AS/400 terminal emulator without API access.',
        tags: ['OpenCV', 'PyAutoGUI', 'OCR'],
        metrics: ['100% data accuracy', 'Eliminated manual entry'],
        iconType: 'auto',
    },
    {
        id: '4',
        title: 'Inventory Aging Analysis',
        summary: 'Complex SQL model transforming transaction ledgers into specific aging buckets (0-30, 31-60, etc.) to identify slow-moving capital.',
        tags: ['SQL Server', 'Data Modeling', 'Finance'],
        metrics: ['$200k inventory released', 'Monthly auto-report'],
        iconType: 'erp',
    },
];

type IconConfig = {
    icon: React.ReactNode;
    borderHover: string;
    iconBg: string;
    tagBg: string;
    tagText: string;
    metricColor: string;
    barColor: string;
};

const iconConfig: Record<string, IconConfig> = {
    erp: {
        icon: <Database className="w-5 h-5 text-blue-400" />,
        borderHover: 'hover:border-blue-700/50',
        iconBg: 'bg-blue-950/60 border-blue-800/30',
        tagBg: 'bg-blue-950/50 border-blue-800/30',
        tagText: 'text-blue-300',
        metricColor: 'text-blue-400',
        barColor: 'bg-blue-700',
    },
    auto: {
        icon: <Cog className="w-5 h-5 text-slate-300" />,
        borderHover: 'hover:border-slate-600',
        iconBg: 'bg-slate-800/60 border-slate-700/30',
        tagBg: 'bg-slate-800/60 border-slate-700/30',
        tagText: 'text-slate-300',
        metricColor: 'text-amber-400',
        barColor: 'bg-slate-600',
    },
    bi: {
        icon: <Layout className="w-5 h-5 text-blue-300" />,
        borderHover: 'hover:border-blue-800/50',
        iconBg: 'bg-blue-950/60 border-blue-900/30',
        tagBg: 'bg-blue-950/50 border-blue-900/30',
        tagText: 'text-blue-300',
        metricColor: 'text-blue-400',
        barColor: 'bg-blue-800',
    },
};

const Portfolio: React.FC = () => {
    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-900/6 rounded-full blur-3xl pointer-events-none" />

            <section className="container mx-auto px-4 py-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mb-16"
                >
                    <span className="inline-block text-xs font-mono tracking-widest text-blue-400 mb-5 border border-blue-800/40 rounded-full px-4 py-1.5 bg-blue-950/40">
                        SELECTED WORK
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
                        Built to Solve{' '}
                        <span className="text-blue-400">
                            Real Problems
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Automation tools, data pipelines, and intelligence systems designed for specific production bottlenecks. Each project delivered measurable results.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-5">
                    {projects.map((project, idx) => {
                        const cfg = iconConfig[project.iconType] ?? iconConfig.auto;
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: idx * 0.1, ease: 'easeOut' }}
                                className={`group relative bg-[#111116] border border-slate-800 rounded-2xl overflow-hidden ${cfg.borderHover} hover:bg-[#13131a] transition-all duration-300`}
                            >
                                <div className="p-7">
                                    <div className={`inline-flex p-2.5 rounded-xl ${cfg.iconBg} mb-5 border`}>
                                        {cfg.icon}
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-100 mb-3 leading-snug group-hover:text-white transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                        {project.summary}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className={`px-3 py-1 ${cfg.tagBg} ${cfg.tagText} text-xs rounded-lg font-mono border`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-5 border-t border-slate-800/60 space-y-2.5">
                                        {project.metrics.map((metric, i) => (
                                            <div key={i} className="flex items-center gap-2.5">
                                                <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${cfg.metricColor}`} />
                                                <span className={`text-xs font-mono ${cfg.metricColor}`}>{metric}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
