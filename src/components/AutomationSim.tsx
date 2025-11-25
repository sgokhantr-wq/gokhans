import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Monitor, MousePointer, Check, FileText, Mail, Terminal } from 'lucide-react';
import type { SimulationStep } from '../types';

const stepsData: SimulationStep[] = [
    { id: 1, action: 'Launch', target: 'Business Central', durationMs: 800, status: 'pending', details: 'Opening ERP via customized shortcut...' },
    { id: 2, action: 'Detect', target: 'Sales Order List', durationMs: 1200, status: 'pending', details: 'Waiting for pixel match at (240, 150)...' },
    { id: 3, action: 'Filter', target: 'Release Status: Open', durationMs: 1000, status: 'pending', details: 'Applying filter grid via keyboard simulation...' },
    { id: 4, action: 'Extract', target: 'Order Data', durationMs: 1500, status: 'pending', details: 'Scraping visible rows to DataFrame...' },
    { id: 5, action: 'Generate', target: 'PDF Report', durationMs: 2000, status: 'pending', details: 'Rendering ReportLab PDF in background...' },
    { id: 6, action: 'Email', target: 'Warehouse Manager', durationMs: 1000, status: 'pending', details: 'Attaching file and sending via SMTP...' },
];

const AutomationSim: React.FC = () => {
    const [steps, setSteps] = useState<SimulationStep[]>(stepsData);

    const [isPlaying, setIsPlaying] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const reset = () => {
        setSteps(stepsData.map(s => ({ ...s, status: 'pending' })));

        setIsPlaying(false);
        setLogs(['> System Ready.']);
    };

    const runSimulation = async () => {
        if (isPlaying) return;
        setIsPlaying(true);
        setLogs(['> Initializing Automation Agent...']);

        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];


            // Update step to active
            setSteps(prev => prev.map(s => s.id === step.id ? { ...s, status: 'active' } : s));
            setLogs(prev => [...prev, `> [${new Date().toLocaleTimeString()}] ${step.action}: ${step.details}`]);

            // Wait for duration
            await new Promise(resolve => setTimeout(resolve, step.durationMs));

            // Update step to success
            setSteps(prev => prev.map(s => s.id === step.id ? { ...s, status: 'success' } : s));
        }

        setLogs(prev => [...prev, '> Process Completed Successfully.']);
        setIsPlaying(false);

    };

    // Auto-scroll logs
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-white">Automation Simulator</h2>
                    <p className="text-slate-400 mt-2">
                        See how I orchestrate desktop vision agents to handle legacy ERP tasks without APIs.
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={runSimulation}
                        disabled={isPlaying}
                        className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${isPlaying
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-teal-500 text-slate-900 hover:bg-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.3)]'
                            }`}
                    >
                        <Play className="w-4 h-4 mr-2" fill="currentColor" />
                        {isPlaying ? 'Running...' : 'Run Sequence'}
                    </button>

                    <button
                        onClick={reset}
                        className="flex items-center px-6 py-3 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm h-[300px] overflow-y-auto custom-scrollbar" ref={scrollRef}>
                    {logs.map((log, i) => (
                        <div key={i} className="text-teal-400/80 mb-1">{log}</div>
                    ))}
                    {logs.length === 0 && <div className="text-slate-600 italic">Ready to start...</div>}
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Terminal size={120} />
                </div>

                <h3 className="text-lg font-semibold mb-6">Workflow Visualization</h3>

                <div className="relative space-y-4">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-800"></div>

                    {steps.map((step) => (
                        <div key={step.id} className="relative pl-14 group">
                            {/* Status Indicator Bubble */}
                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-colors duration-300 z-10 ${step.status === 'success' ? 'bg-teal-500 border-teal-500' :
                                step.status === 'active' ? 'bg-slate-900 border-teal-400 animate-pulse' :
                                    'bg-slate-900 border-slate-700'
                                }`}>
                                {step.status === 'success' && <Check size={10} className="text-slate-900 absolute top-0.5 left-0.5" />}
                            </div>

                            {/* Card */}
                            <div className={`p-4 rounded-lg border transition-all duration-300 flex items-center justify-between ${step.status === 'active'
                                ? 'bg-slate-800 border-teal-500/50 shadow-lg translate-x-2'
                                : 'bg-slate-950/50 border-slate-800'
                                }`}>
                                <div className="flex items-center gap-3">
                                    {step.id === 1 && <Monitor className="text-slate-500" size={18} />}
                                    {step.id === 2 && <MousePointer className="text-slate-500" size={18} />}
                                    {step.id === 5 && <FileText className="text-slate-500" size={18} />}
                                    {step.id === 6 && <Mail className="text-slate-500" size={18} />}
                                    {![1, 2, 5, 6].includes(step.id) && <Terminal className="text-slate-500" size={18} />}

                                    <div>
                                        <div className={`font-medium ${step.status === 'active' ? 'text-teal-400' : 'text-slate-300'}`}>
                                            {step.action}
                                        </div>
                                        <div className="text-xs text-slate-500">{step.target}</div>
                                    </div>
                                </div>

                                {step.status === 'active' && (
                                    <div className="text-xs text-teal-500 font-mono animate-pulse">Processing...</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AutomationSim;
