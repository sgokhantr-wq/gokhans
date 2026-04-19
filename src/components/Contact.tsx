import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Send, CheckCircle2, Linkedin, MapPin } from 'lucide-react';

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' as const }
});

const Contact: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-teal-500/18 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/12 rounded-full blur-3xl pointer-events-none" />

            <section className="container mx-auto px-4 py-16 max-w-5xl relative z-10">

                {/* Page header */}
                <motion.div {...fadeUp(0)} className="mb-14">
                    <span className="inline-block text-xs font-mono tracking-widest text-teal-300 mb-5 border border-teal-500/50 rounded-full px-4 py-1.5 bg-teal-500/10">
                        GET IN TOUCH
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                        Ready to{' '}
                        <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                            Contribute
                        </span>
                        {' '}from Day One
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        Whether it's production planning, ERP implementation, or building AI tools for operations, reach out and let's talk.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* Left Column */}
                    <motion.div {...fadeUp(0.15)} className="space-y-6">

                        {/* Contact links */}
                        <div className="space-y-3">
                            <a
                                href="mailto:gokusahin@gmail.com"
                                className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 hover:bg-slate-800/60 transition-all duration-300 group"
                            >
                                <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 group-hover:bg-teal-500/20 transition-colors flex-shrink-0">
                                    <Mail size={16} className="text-teal-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-0.5">Email</p>
                                    <p className="text-sm text-slate-200 group-hover:text-teal-400 transition-colors font-medium">gokusahin@gmail.com</p>
                                </div>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/gokhan-sahin-417b8a171/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-[#0077b5]/40 hover:bg-slate-800/60 transition-all duration-300 group"
                            >
                                <div className="p-2 rounded-lg bg-[#0077b5]/10 border border-[#0077b5]/20 group-hover:bg-[#0077b5]/20 transition-colors flex-shrink-0">
                                    <Linkedin size={16} className="text-[#0077b5]" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-0.5">LinkedIn</p>
                                    <p className="text-sm text-slate-200 group-hover:text-[#0095d9] transition-colors font-medium">gokhan-sahin-417b8a171</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 flex-shrink-0">
                                    <MapPin size={16} className="text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-0.5">Availability</p>
                                    <p className="text-sm text-slate-400 font-medium">Open to remote and on-site roles</p>
                                </div>
                            </div>
                        </div>

                        {/* Resume download */}
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
                                <FileText className="text-teal-500" size={18} />
                                Resume
                            </h3>
                            <a
                                href="/resume.pdf"
                                download="Gokhan_Sahin_Resume.pdf"
                                className="flex items-center justify-between p-4 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-teal-500/50 hover:bg-slate-900 transition-all duration-300 group"
                            >
                                <div>
                                    <div className="text-slate-200 font-medium text-sm group-hover:text-teal-400 transition-colors">Download Full CV</div>
                                    <div className="text-xs text-slate-500 mt-0.5">PDF · Certifications and project timeline included</div>
                                </div>
                                <FileText className="text-slate-600 group-hover:text-teal-400 transition-colors flex-shrink-0" size={16} />
                            </a>
                        </div>

                        {/* What I bring */}
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="text-base font-semibold text-white mb-4">What I Bring</h3>
                            <div className="space-y-3">
                                {[
                                    'Production planning and MRP configuration',
                                    'ERP implementation and data migration (D365 BC)',
                                    'Python automation and data pipelines',
                                    'AI tools deployed for operational workflows',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-400 leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div {...fadeUp(0.25)}>
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm h-full">
                            {submitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[420px]">
                                    <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center border border-teal-500/20">
                                        <CheckCircle2 className="w-8 h-8 text-teal-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Message Sent</h3>
                                    <p className="text-slate-400 max-w-xs text-sm leading-relaxed">I'll review and get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-teal-400 hover:text-teal-300 text-sm font-medium mt-4 transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-white">Let's Connect</h3>
                                        <p className="text-slate-500 text-sm mt-1">Tell me about the role or opportunity.</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/20 transition-all"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company</label>
                                            <input
                                                type="text"
                                                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/20 transition-all"
                                                placeholder="Company name"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/20 transition-all"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Topic</label>
                                        <select className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/20 transition-all appearance-none">
                                            <option>Job Opportunity</option>
                                            <option>ERP Implementation Project</option>
                                            <option>Automation Consultation</option>
                                            <option>General Inquiry</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</label>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/20 transition-all resize-none"
                                            placeholder="Tell me about the role, project, or what you need..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold py-3.5 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.01]"
                                    >
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Message
                                    </button>

                                    <p className="text-xs text-slate-600 text-center">No spam. I respond to every message personally.</p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
