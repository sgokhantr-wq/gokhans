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
    accent: string;
    tagBg: string;
    tagText: string;
    glow: string;
    borderHover: string;
    iconBg: string;
};

const iconConfig: Record<string, IconConfig> = {
    erp: {
        icon: <Database className="w-5 h-5 text-violet-300" />,
        accent: 'from-violet-600 to-indigo-500',
        tagBg: 'bg-violet-500/10 border-violet-500/20',
        tagText: 'text-violet-300',
        glow: 'hover:shadow-violet-500/10',
        borderHover: 'hover:border-violet-500/40',
        iconBg: 'bg-violet-500/10',
    },
    auto: {
        icon: <Cog className="w-5 h-5 text-teal-300" />,
        accent: 'from-teal-600 to-cyan-500',
        tagBg: 'bg-teal-500/10 border-teal-500/20',
        tagText: 'text-teal-300',
        glow: 'hover:shadow-teal-500/10',
        borderHover: 'hover:border-teal-500/40',
        iconBg: 'bg-teal-500/10',
    },
    bi: {
        icon: <Layout className="w-5 h-5 text-blue-300" />,
        accent: 'from-blue-600 to-cyan-500',
        tagBg: 'bg-blue-500/10 border-blue-500/20',
        tagText: 'text-blue-300',
        glow: 'hover:shadow-blue-500/10',
        borderHover: 'hover:border-blue-500/40',
        iconBg: 'bg-blue-500/10',
    },
};

const Portfolio: React.FC = () => {
    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-teal-600/5 rounded-full blur-3xl pointer-events-none" />

            <section className="container mx-auto px-4 py-16 relative z-10">

                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mb-16"
                >
                    <span className="inline-block text-xs font-mono tracking-widest text-teal-400 mb-5 border border-teal-500/30 rounded-full px-4 py-1.5 bg-teal-500/5">
                        SELECTED WORK
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
                        Built to Solve{' '}
                        <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                            Real Problems
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Automation tools, data pipelines, and intelligence systems designed for specific production bottlenecks. Each project delivered measurable results.
                    </p>
                </motion.div>

                {/* Project cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, idx) => {
                        const cfg = iconConfig[project.iconType] ?? iconConfig.auto;
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: idx * 0.1, ease: 'easeOut' }}
                                className={`group relative bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl ${cfg.glow} ${cfg.borderHover} transition-all duration-300 backdrop-blur-sm`}
                            >
                                {/* Top accent line */}
                                <div className={`h-[2px] w-full bg-gradient-to-r ${cfg.accent} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />

                                {/* Hover gradient overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cfg.accent} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`} />

                                <div className="p-7">
                                    {/* Icon */}
                                    <div className={`inline-flex p-3 rounded-xl ${cfg.iconBg} mb-5 border border-white/5`}>
                                        {cfg.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-100 mb-3 leading-snug group-hover:text-white transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                        {project.summary}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className={`px-3 py-1 ${cfg.tagBg} ${cfg.tagText} text-xs rounded-lg font-medium border`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Metrics */}
                                    <div className="pt-5 border-t border-slate-800 space-y-2.5">
                                        {project.metrics.map((metric, i) => (
                                            <div key={i} className="flex items-center gap-2.5">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                                                <span className="text-xs font-mono text-teal-400">{metric}</span>
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
