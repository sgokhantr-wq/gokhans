import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, Bot, BarChart3, Download } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text */}
                    <div className="space-y-8 animate-fade-in">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-900/30 border border-teal-800/50 text-teal-400 text-xs font-mono font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                            </span>
                            <span>Available for projects</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
                            I turn data
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
                                <br />into decisions
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
                            Production planning, Power BI dashboards, and Python automation. I streamline material flows, reduce errors, and build systems that work for people.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/live-demo"
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-slate-900 bg-teal-500 hover:bg-teal-400 transition-colors"
                            >
                                Try Live Dashboard
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <a
                                href="/resume.pdf"
                                download="Gokhan_Sahin_Resume.pdf"
                                className="inline-flex items-center justify-center px-6 py-3 border border-slate-700 text-base font-semibold rounded-lg text-white hover:bg-slate-800 transition-colors"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Resume
                            </a>
                        </div>

                        <div className="pt-8 border-t border-slate-800 grid grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Database className="h-6 w-6 text-slate-500" />
                                <h3 className="font-semibold text-white">ERP Integration</h3>
                                <p className="text-xs text-slate-500">Business Central, APIs, SQL Sync</p>
                            </div>
                            <div className="space-y-2">
                                <Bot className="h-6 w-6 text-slate-500" />
                                <h3 className="font-semibold text-white">Automation</h3>
                                <p className="text-xs text-slate-500">Python, Vision Agents, PyAutoGUI</p>
                            </div>
                            <div className="space-y-2">
                                <BarChart3 className="h-6 w-6 text-slate-500" />
                                <h3 className="font-semibold text-white">Analytics</h3>
                                <p className="text-xs text-slate-500">Power BI, Forecasting, Modeling</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual */}
                    <div className="relative lg:block">
                        {/* Abstract Dashboard SVG Representation */}
                        <div className="relative rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-6 transform hover:scale-[1.02] transition-transform duration-500">
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl"></div>

                            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                                <div className="space-y-1">
                                    <div className="h-3 w-32 bg-slate-700 rounded animate-pulse"></div>
                                    <div className="h-2 w-20 bg-slate-800 rounded"></div>
                                </div>
                                <div className="h-8 w-8 bg-slate-800 rounded-full"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                    <div className="text-xs text-slate-500 mb-1">On-Time Shipments</div>
                                    <div className="text-2xl font-mono text-teal-400">98.4%</div>
                                    <div className="h-1 w-full bg-slate-800 mt-2 rounded overflow-hidden">
                                        <div className="h-full bg-teal-500 w-[98%]"></div>
                                    </div>
                                </div>
                                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                    <div className="text-xs text-slate-500 mb-1">Open Orders</div>
                                    <div className="text-2xl font-mono text-white">1,240</div>
                                    <div className="h-1 w-full bg-slate-800 mt-2 rounded overflow-hidden">
                                        <div className="h-full bg-purple-500 w-[65%]"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-950 rounded-lg border border-slate-800 p-4 h-48 flex items-end justify-between space-x-2">
                                {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                    <div key={i} className="w-full bg-slate-800 rounded-t hover:bg-teal-500/50 transition-colors relative group" style={{ height: `${h}%` }}>
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded border border-slate-700 whitespace-nowrap z-10">
                                            Vol: {h * 10}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Floating Element */}
                            <div className="absolute -bottom-6 -left-6 bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-xl flex items-center space-x-3">
                                <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                                <div>
                                    <div className="text-xs font-mono text-slate-300">Stock Alert</div>
                                    <div className="text-xs text-slate-500">Item 1024 below safety</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
