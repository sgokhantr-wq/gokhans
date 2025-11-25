import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Line, AreaChart, Area
} from 'recharts';
import { Upload, Sliders, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import type { InventoryItem } from '../types';

// Mock Data Generator
const generateMockData = (): InventoryItem[] => {
    return Array.from({ length: 8 }).map((_, i) => ({
        id: `ITM-${1000 + i}`,
        itemCode: `PROD-${String.fromCharCode(65 + i)}-${100 + i}`,
        description: `Industrial Component ${String.fromCharCode(65 + i)}`,
        onHand: Math.floor(Math.random() * 500) + 50,
        onOrder: Math.floor(Math.random() * 200),
        leadTimeDays: Math.floor(Math.random() * 30) + 14,
        avgWeeklyDemand: Math.floor(Math.random() * 50) + 10,
        lastMovement: '2023-10-25',
    }));
};

const Dashboard: React.FC = () => {
    const [data, setData] = useState<InventoryItem[]>(generateMockData());
    const [demandFactor, setDemandFactor] = useState(1);
    const [leadTimeOffset, setLeadTimeOffset] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Recalculate Logic
    const analyzedData = useMemo(() => {
        return data.map(item => {
            const adjustedDemand = item.avgWeeklyDemand * demandFactor;
            const adjustedLeadTimeWeeks = (item.leadTimeDays + leadTimeOffset) / 7;

            // Simple formula: Safety Stock = Demand * LeadTime (Simplified)
            const safetyStock = Math.ceil(adjustedDemand * adjustedLeadTimeWeeks * 1.5);
            const projectedStock = item.onHand - (adjustedDemand * 4) + item.onOrder; // 4 weeks out

            const risk = projectedStock < safetyStock
                ? (projectedStock < 0 ? 'Critical' : 'Warning')
                : 'Healthy';

            return {
                ...item,
                adjustedDemand,
                safetyStock,
                projectedStock,
                risk
            };
        });
    }, [data, demandFactor, leadTimeOffset]);

    const stats = {
        totalItems: data.length,
        criticalItems: analyzedData.filter(i => i.risk === 'Critical').length,
        warningItems: analyzedData.filter(i => i.risk === 'Warning').length,
        healthyItems: analyzedData.filter(i => i.risk === 'Healthy').length,
    };

    const handleFileUpload = (_: React.ChangeEvent<HTMLInputElement>) => {
        // Simulation of parsing
        setIsAnimating(true);
        setTimeout(() => {
            setData(generateMockData()); // Just reshuffle for demo
            setIsAnimating(false);
        }, 800);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Interactive Planning Dashboard</h2>
                    <p className="text-slate-400 mt-1">Simulate demand spikes and supply chain delays.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <label className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer transition-colors group">
                        <Upload className="w-4 h-4 mr-2 text-teal-400 group-hover:text-white" />
                        <span className="text-sm font-medium">Upload CSV</span>
                        <input type="file" className="hidden" onChange={handleFileUpload} accept=".csv" />
                    </label>
                </div>
            </div>

            {/* Control Panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                    <Sliders className="w-5 h-5 text-teal-500" />
                    <h3 className="text-lg font-semibold">Scenario Parameters</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <label className="text-sm text-slate-400">Demand Growth</label>
                            <span className="text-sm font-mono text-teal-400">{Math.round((demandFactor - 1) * 100)}%</span>
                        </div>
                        <input
                            type="range" min="0.5" max="2.0" step="0.1"
                            value={demandFactor}
                            onChange={(e) => setDemandFactor(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>-50%</span>
                            <span>Normal</span>
                            <span>+100%</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <label className="text-sm text-slate-400">Lead Time Impact</label>
                            <span className="text-sm font-mono text-teal-400">{leadTimeOffset > 0 ? '+' : ''}{leadTimeOffset} Days</span>
                        </div>
                        <input
                            type="range" min="-14" max="28" step="1"
                            value={leadTimeOffset}
                            onChange={(e) => setLeadTimeOffset(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>Faster</span>
                            <span>Normal</span>
                            <span>Delay</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                        <div className="text-slate-500 text-sm">Critical Stockouts</div>
                        <div className={`text-3xl font-bold font-mono mt-1 ${stats.criticalItems > 0 ? 'text-red-500' : 'text-slate-200'}`}>
                            {stats.criticalItems}
                        </div>
                    </div>
                    <AlertTriangle className={`w-8 h-8 ${stats.criticalItems > 0 ? 'text-red-500/20' : 'text-slate-800'}`} />
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                        <div className="text-slate-500 text-sm">At Risk</div>
                        <div className="text-3xl font-bold font-mono mt-1 text-yellow-500">{stats.warningItems}</div>
                    </div>
                    <RefreshCw className="w-8 h-8 text-yellow-500/20" />
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                        <div className="text-slate-500 text-sm">Healthy Status</div>
                        <div className="text-3xl font-bold font-mono mt-1 text-teal-500">{stats.healthyItems}</div>
                    </div>
                    <CheckCircle className="w-8 h-8 text-teal-500/20" />
                </div>
            </div>

            {/* Charts Area */}
            <div className={`grid lg:grid-cols-2 gap-6 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                {/* Inventory Levels */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <h4 className="text-lg font-semibold mb-6">Projected Availability (4 Weeks)</h4>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyzedData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="itemCode" tick={{ fill: '#94a3b8', fontSize: 10 }} interval={0} />
                                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                                    itemStyle={{ color: '#f1f5f9' }}
                                />
                                <Bar dataKey="projectedStock" name="Proj. Stock" fill="#0d9488" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="safetyStock" name="Safety Level" fill="#334155" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Demand vs Forecast */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <h4 className="text-lg font-semibold mb-6">Lead Time vs Demand Impact</h4>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyzedData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="itemCode" tick={{ fill: '#94a3b8', fontSize: 10 }} interval={0} />
                                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                                />
                                <Area type="monotone" dataKey="adjustedDemand" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.2} name="Adj. Demand" />
                                <Line type="step" dataKey="onOrder" stroke="#6366f1" strokeWidth={2} name="Incoming POs" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
