import React from 'react';
import type { Project } from '../types';
import { Database, Layout, Cog, ArrowUpRight } from 'lucide-react';

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

const Portfolio: React.FC = () => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'erp': return <Database className="w-6 h-6 text-purple-400" />;
            case 'auto': return <Cog className="w-6 h-6 text-teal-400" />;
            case 'bi': return <Layout className="w-6 h-6 text-blue-400" />;
            default: return <Database />;
        }
    };

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Selected Projects</h2>
                <p className="text-slate-400">
                    A collection of automation scripts, data pipelines, and dashboard interfaces designed to solve specific production bottlenecks.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="group bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-teal-500/30 hover:bg-slate-850 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                                {getIcon(project.iconType)}
                            </div>
                            <button className="text-slate-500 hover:text-teal-400 transition-colors">
                                <ArrowUpRight size={20} />
                            </button>
                        </div>

                        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-teal-400 transition-colors">
                            {project.title}
                        </h3>

                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            {project.summary}
                        </p>

                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex gap-4">
                                {project.metrics.map((metric, i) => (
                                    <span key={i} className="text-xs font-mono text-teal-500/80">
                                        • {metric}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
