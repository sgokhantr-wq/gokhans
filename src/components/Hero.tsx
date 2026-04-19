import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Bot, BarChart3, Download } from 'lucide-react';

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' as const }
});

const Hero: React.FC = () => {
    return (
        <section className="relative overflow-hidden pt-12 pb-32 lg:pt-20 lg:pb-40">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.04)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
            {/* Glow orbs */}
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column */}
                    <div className="space-y-8">
                        <motion.div {...fadeUp(0)}>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/40 text-teal-300 text-xs font-mono font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                                </span>
                                Open to Roles · Manufacturing · Planning · Ops &amp; Tech
                            </div>
                        </motion.div>

                        <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-6xl font-extrabold leading-tight text-white tracking-tight">
                            I turn data
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">
                                into decisions
                            </span>
                        </motion.h1>

                        <motion.p {...fadeUp(0.2)} className="text-lg text-slate-400 max-w-lg leading-relaxed">
                            I sit at the cross of production excellence and technology. I plan, automate, and optimize, from the shop floor to the ERP layer, and I'm looking to own the whole operation, not just one piece of it.
                        </motion.p>

                        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/live-demo"
                                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.02]"
                            >
                                Try Live Dashboard
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <a
                                href="/resume.pdf"
                                download="Gokhan_Sahin_Resume.pdf"
                                className="inline-flex items-center justify-center px-6 py-3.5 border border-slate-700 text-base font-semibold rounded-xl text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
                            >
                                <Download className="mr-2 h-4 w-4 text-teal-500" />
                                Download Resume
                            </a>
                        </motion.div>

                        <motion.div {...fadeUp(0.4)} className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4">
                            {[
                                { icon: Database, title: 'ERP Integration', sub: 'Production Planning, Manufacturing Engineering' },
                                { icon: Bot, title: 'Automation', sub: 'Operations & Technology, Process Efficiency' },
                                { icon: BarChart3, title: 'Analytics', sub: 'Data Driven Decisions, End to End Visibility' },
                            ].map(({ icon: Icon, title, sub }) => (
                                <div
                                    key={title}
                                    className="group p-4 rounded-xl border border-slate-800 hover:border-teal-500/40 bg-slate-900/40 hover:bg-slate-800/60 transition-all duration-300 space-y-2 cursor-default"
                                >
                                    <div className="p-2 rounded-lg bg-teal-500/10 inline-flex">
                                        <Icon className="h-4 w-4 text-teal-400" />
                                    </div>
                                    <h3 className="font-semibold text-white text-sm">{title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">{sub}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column: Mock Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl shadow-black/50 p-6 backdrop-blur-sm hover:border-slate-600 transition-all duration-500">
                            {/* Card glow */}
                            <div className="absolute -top-8 -right-8 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

                            {/* Dashboard header */}
                            <div className="flex justify-between items-center mb-5 pb-4 border-b border-slate-800">
                                <div>
                                    <p className="text-xs font-mono font-bold text-teal-400 tracking-widest">PRODUCTION CONTROL</p>
                                    <p className="text-xs text-slate-500 mt-0.5">Week 16 · Real-time</p>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-xs text-emerald-400 font-mono font-semibold">LIVE</span>
                                </div>
                            </div>

                            {/* KPI cards */}
                            <div className="grid grid-cols-2 gap-3 mb-5">
                                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                                    <div className="text-xs text-slate-500 mb-2">On Time Shipments</div>
                                    <div className="text-2xl font-mono font-bold text-teal-400">98.4%</div>
                                    <div className="h-1 w-full bg-slate-800 mt-3 rounded-full overflow-hidden">
                                        <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-teal-600 to-teal-400" />
                                    </div>
                                </div>
                                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                                    <div className="text-xs text-slate-500 mb-2">Open Orders</div>
                                    <div className="text-2xl font-mono font-bold text-slate-100">1,240</div>
                                    <div className="h-1 w-full bg-slate-800 mt-3 rounded-full overflow-hidden">
                                        <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-violet-600 to-violet-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Bar chart */}
                            <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-xs text-slate-500 font-medium">Production Output · 8 weeks</p>
                                    <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">↑ 12%</span>
                                </div>
                                <div className="h-32 flex items-end gap-1.5">
                                    {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-t-sm transition-all duration-300 hover:opacity-90 hover:scale-y-105 origin-bottom"
                                            style={{
                                                height: `${h}%`,
                                                background: h >= 80
                                                    ? 'linear-gradient(to top, #0d9488, #2dd4bf)'
                                                    : h >= 60
                                                    ? 'linear-gradient(to top, #1e40af, #60a5fa)'
                                                    : 'linear-gradient(to top, #1e293b, #334155)'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Floating alert badge */}
                            <div className="absolute -bottom-5 -left-5 bg-slate-800/95 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-700 shadow-xl flex items-center gap-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
                                <div>
                                    <div className="text-xs font-semibold text-slate-200">MRP Alert</div>
                                    <div className="text-xs text-slate-400">Item 1024 below safety stock</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
