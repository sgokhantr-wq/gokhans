import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Line, AreaChart, Area, ScatterChart, Scatter,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    ZAxis
} from 'recharts';
import { Activity, AlertCircle, CheckCircle2, Factory, Zap, ShieldAlert, Cpu } from 'lucide-react';

/* ─────────────────────────────────────────────────────────
   Mock Data Generators
───────────────────────────────────────────────────────── */

// 1. Live Production Output
const generateProductionData = (startIdx: number, count: number, isShock: boolean) => {
    return Array.from({ length: count }).map((_, i) => ({
        time: `T-${count - i}`,
        target: 100,
        actual: isShock ? 40 + Math.random() * 20 : 85 + Math.random() * 15,
        timestamp: startIdx + i
    }));
};

// 2. Supply Risk Matrix (Lead Time vs Demand Impact)
const generateRiskData = (isShock: boolean) => {
    return Array.from({ length: 40 }).map((_, i) => {
        // Base distribution
        let leadTime = Math.random() * 12; // 0-12 weeks
        let demandImpact = Math.random() * 100; // 0-100 impact score
        let isCritical = false;

        if (isShock && i < 15) {
            // Push 15 components into the high-risk "shock" zone (top right)
            leadTime = 8 + Math.random() * 6; // 8-14 weeks
            demandImpact = 70 + Math.random() * 30; // 70-100 impact
            isCritical = true;
        } else if (leadTime > 8 && demandImpact > 70) {
            isCritical = true;
        }

        return {
            id: `PRT-${1000 + i}`,
            x: leadTime,
            y: demandImpact,
            z: Math.random() * 400 + 100, // Bubble size represents MOQ/Quantity
            isCritical
        };
    });
};

/* ─────────────────────────────────────────────────────────
   Live Dashboard Component
───────────────────────────────────────────────────────── */

const Dashboard: React.FC = () => {
    // ─── State ───
    const [isShockMode, setIsShockMode] = useState(false);

    // Data states
    const [prodData, setProdData] = useState(() => generateProductionData(0, 20, false));
    const [riskData, setRiskData] = useState(() => generateRiskData(false));

    // KPI states
    const [oee, setOee] = useState(87.4);
    const [health, setHealth] = useState(98);
    const [actions, setActions] = useState(452);

    // Event Log
    const [events, setEvents] = useState([
        { id: 1, time: '08:00:12', type: 'info', msg: 'System initialized. MRP sync complete.' },
        { id: 2, time: '08:05:44', type: 'success', msg: 'CentaurusAI cleared 14 pricing errors.' },
        { id: 3, time: '08:12:05', type: 'info', msg: 'BOM validation passed for 420 items.' }
    ]);

    // ─── Simulation Engine (The "Live" feel) ───
    useEffect(() => {
        const interval = setInterval(() => {
            const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });

            // 1. Update Production Chart
            setProdData(prev => {
                const newData = [...prev.slice(1)];
                const lastTimestamp = prev[prev.length - 1].timestamp;
                const newValue = isShockMode
                    ? 35 + Math.random() * 25  // Shock: 35-60
                    : 82 + Math.random() * 16;   // Normal: 82-98

                newData.push({
                    time: nowTime.substring(0, 5), // HH:MM
                    target: 100,
                    actual: newValue,
                    timestamp: lastTimestamp + 1
                });
                return newData;
            });

            // 2. Update KPIs
            setOee(prev => {
                const target = isShockMode ? 42.5 : 86.8;
                return prev + (target - prev) * 0.1 + (Math.random() - 0.5) * 2;
            });

            setHealth(prev => {
                const target = isShockMode ? 65 : 98;
                return prev + (target - prev) * 0.1;
            });

            // Randomly trigger events based on mode
            if (isShockMode && Math.random() > 0.7) {
                setEvents(prev => [{
                    id: Date.now(),
                    time: nowTime,
                    type: 'error',
                    msg: `Alert: Vendor delay detected. Lead time +4wks.`
                }, ...prev].slice(0, 8));
            } else if (!isShockMode && Math.random() > 0.85) {
                setActions(a => a + 1);
                setEvents(prev => [{
                    id: Date.now(),
                    time: nowTime,
                    type: 'success',
                    msg: `Autopilot: Reallocated 2 work orders to relieve constraint.`
                }, ...prev].slice(0, 8));
            }

        }, 3000); // Tick every 3 seconds

        return () => clearInterval(interval);
    }, [isShockMode]);

    // ─── Handlers ───
    const triggerShock = () => {
        setIsShockMode(true);
        setRiskData(generateRiskData(true));
        const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
        setEvents(prev => [{
            id: Date.now(),
            time: nowTime,
            type: 'error',
            msg: `CRITICAL: Global supply shock simulated.`
        }, ...prev].slice(0, 8));
    };

    const triggerOptimized = () => {
        setIsShockMode(false);
        setRiskData(generateRiskData(false));
        const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
        setEvents(prev => [{
            id: Date.now(),
            time: nowTime,
            type: 'success',
            msg: `AI Optimizer deployed. Replanning complete.`
        }, ...prev].slice(0, 8));
    };

    // ─── Render Helpers ───
    const getHealthColor = (val: number) => val > 90 ? 'text-teal-400' : val > 75 ? 'text-amber-400' : 'text-red-400';

    return (
        <div className="w-full bg-slate-950/50 rounded-2xl border border-slate-800 p-4 md:p-8 backdrop-blur-xl mb-12 shadow-2xl">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-white">
                        <Activity className="text-teal-400" />
                        Manufacturing Control Tower
                    </h2>
                    <p className="text-slate-400 mt-1">
                        Real-time visualization of production telemetry and AI orchestration.
                    </p>
                </div>

                <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                    <button
                        onClick={triggerShock}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isShockMode ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-red-400'}`}
                    >
                        Simulate Supply Shock
                    </button>
                    <button
                        onClick={triggerOptimized}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${!isShockMode ? 'bg-teal-500/20 text-teal-400' : 'text-slate-400 hover:text-teal-400'}`}
                    >
                        Run AI Optimizer
                    </button>
                </div>
            </div>

            {/* Top KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Plant OEE', value: `${oee.toFixed(1)}%`, icon: Factory, color: getHealthColor(oee) },
                    { label: 'Supply Health', value: `${health.toFixed(0)}%`, icon: ShieldAlert, color: getHealthColor(health) },
                    { label: 'AI Actions Today', value: actions.toString(), icon: Cpu, color: 'text-violet-400' },
                    { label: 'Active Lines', value: '1,240', icon: Zap, color: 'text-amber-400' },
                ].map((kpi, i) => (
                    <motion.div
                        key={i}
                        layout
                        className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-4"
                    >
                        <div className={`p-3 rounded-lg bg-slate-800/50 ${kpi.color}`}>
                            <kpi.icon size={20} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-mono mb-1">{kpi.label}</p>
                            <p className={`text-xl md:text-2xl font-bold font-mono ${kpi.color}`}>
                                {kpi.value}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left/Middle: Charts */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Production Output Area Chart */}
                    <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                        <h3 className="text-slate-300 font-semibold mb-6 flex items-center justify-between">
                            Real-Time Production Output
                            <span className="flex items-center gap-2 text-xs font-mono text-teal-500 bg-teal-500/10 px-2 py-1 rounded">
                                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" /> LIVE SYNC
                            </span>
                        </h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={prodData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={isShockMode ? '#ef4444' : '#14b8a6'} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={isShockMode ? '#ef4444' : '#14b8a6'} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="time" stroke="#475569" fontSize={12} tickMargin={10} />
                                    <YAxis stroke="#475569" fontSize={12} domain={[0, 120]} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                        itemStyle={{ color: '#14b8a6' }}
                                    />
                                    <Line type="monotone" dataKey="target" stroke="#64748b" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                                    <Area
                                        type="monotone"
                                        dataKey="actual"
                                        stroke={isShockMode ? '#ef4444' : '#14b8a6'}
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorActual)"
                                        isAnimationActive={false} // Disable recharts animation to use raw state updates
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Supply Risk Scatter Chart */}
                    <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                        <h3 className="text-slate-300 font-semibold mb-6">Supply Chain Risk Matrix</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                    <XAxis type="number" dataKey="x" name="Lead Time (Wks)" unit="w" stroke="#475569" fontSize={12} domain={[0, 16]} />
                                    <YAxis type="number" dataKey="y" name="Impact" stroke="#475569" fontSize={12} domain={[0, 100]} />
                                    <ZAxis type="number" dataKey="z" range={[50, 400]} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                                    <Scatter name="Low Risk" data={riskData.filter(d => !d.isCritical)} fill="#14b8a6" fillOpacity={0.6} />
                                    <Scatter name="High Risk" data={riskData.filter(d => d.isCritical)} fill="#ef4444" fillOpacity={0.8} />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>

                {/* Right: Event Log */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col h-[650px]">
                    <h3 className="text-slate-300 font-semibold mb-4 border-b border-slate-800 pb-4">
                        Autonomous Event Stream
                    </h3>
                    <div className="flex-grow overflow-hidden relative">
                        {/* Fade overlay for top */}
                        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-900/80 to-transparent z-10" />

                        <div className="space-y-3 pt-2">
                            <AnimatePresence initial={false}>
                                {events.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, x: 20, height: 0 }}
                                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5">
                                                {event.type === 'success' && <CheckCircle2 size={14} className="text-teal-500" />}
                                                {event.type === 'error' && <AlertCircle size={14} className="text-red-500" />}
                                                {event.type === 'info' && <Activity size={14} className="text-blue-500" />}
                                            </div>
                                            <div>
                                                <span className="text-slate-500 font-mono text-xs block mb-0.5">[{event.time}]</span>
                                                <span className={event.type === 'error' ? 'text-slate-300' : 'text-slate-400'}>
                                                    {event.msg}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
