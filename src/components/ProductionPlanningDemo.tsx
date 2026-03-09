import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const ProductionPlanningDemo: React.FC = () => {
    const [demand, setDemand] = useState<number>(1000);
    const [capacity, setCapacity] = useState<number>(1200);
    const [inventory, setInventory] = useState<number>(200);

    // Calculations
    const totalRequired = Math.max(0, demand - inventory);
    const plannedProduction = Math.min(totalRequired, capacity);
    const finalInventory = inventory + plannedProduction - demand;
    const capacityUtilization = (plannedProduction / capacity) * 100;
    const isShortfall = finalInventory < 0;

    const data = [
        { name: 'Initial Inventory', units: inventory, fill: '#64748b' }, // slate-500
        { name: 'Planned Production', units: plannedProduction, fill: '#14b8a6' }, // teal-500
        { name: 'Total Demand', units: demand, fill: '#ef4444' } // red-500
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="mb-12 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-mono font-bold text-teal-400">Production Planning 101</h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Production planning is the process of aligning <span className="text-red-400 font-semibold">Demand</span> with available <span className="text-teal-400 font-semibold">Capacity</span> and <span className="text-slate-300 font-semibold">Inventory</span>. Use the interactive controls below to see how changes affect your production strategy.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls Area */}
                <div className="lg:col-span-1 border border-slate-800 bg-slate-900 rounded-xl p-6 space-y-8">
                    <h2 className="text-2xl font-mono font-bold text-white border-b border-slate-800 pb-4">Parameters</h2>
                    
                    <div className="space-y-4">
                        <label className="block">
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-300 font-medium">Weekly Demand</span>
                                <span className="text-red-400 font-mono">{demand} units</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" max="2000" step="50"
                                value={demand} 
                                onChange={(e) => setDemand(Number(e.target.value))}
                                className="w-full accent-red-500"
                            />
                            <p className="text-xs text-slate-500 mt-1">Expected customer orders.</p>
                        </label>
                    </div>

                    <div className="space-y-4">
                        <label className="block">
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-300 font-medium">Production Capacity</span>
                                <span className="text-teal-400 font-mono">{capacity} units</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" max="2000" step="50"
                                value={capacity} 
                                onChange={(e) => setCapacity(Number(e.target.value))}
                                className="w-full accent-teal-500"
                            />
                            <p className="text-xs text-slate-500 mt-1">Maximum units that can be built per week.</p>
                        </label>
                    </div>

                    <div className="space-y-4">
                        <label className="block">
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-300 font-medium">Current Inventory</span>
                                <span className="text-slate-300 font-mono">{inventory} units</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" max="1000" step="50"
                                value={inventory} 
                                onChange={(e) => setInventory(Number(e.target.value))}
                                className="w-full accent-slate-500"
                            />
                            <p className="text-xs text-slate-500 mt-1">Stock already available in the warehouse.</p>
                        </label>
                    </div>
                </div>

                {/* Dashboard & Explanations Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border border-slate-800 bg-slate-900 rounded-xl p-4 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <p className="text-slate-400 text-sm mb-1">Planned Production</p>
                            <p className="text-3xl font-mono font-bold text-teal-400">{plannedProduction}</p>
                        </div>
                        <div className="border border-slate-800 bg-slate-900 rounded-xl p-4 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <p className="text-slate-400 text-sm mb-1">Capacity Utilization</p>
                            <p className="text-3xl font-mono font-bold text-blue-400">{capacityUtilization.toFixed(1)}%</p>
                        </div>
                        <div className={`border rounded-xl p-4 text-center relative overflow-hidden group ${isShortfall ? 'border-red-900 bg-red-950/30' : 'border-slate-800 bg-slate-900'}`}>
                            <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity ${isShortfall ? 'from-red-500/10' : 'from-emerald-500/10'} to-transparent`}></div>
                            <p className={`${isShortfall ? 'text-red-400' : 'text-slate-400'} text-sm mb-1`}>End of Week Status</p>
                            <p className={`text-2xl font-mono font-bold ${isShortfall ? 'text-red-400' : 'text-emerald-400'}`}>
                                {isShortfall ? `Shortfall: ${Math.abs(finalInventory)}` : `Surplus: ${finalInventory}`}
                            </p>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="border border-slate-800 bg-slate-900 rounded-xl p-6 h-80 flex flex-col">
                        <h3 className="text-lg font-mono text-white mb-4">Supply vs. Demand Overview</h3>
                        <div className="flex-grow">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                                    <XAxis type="number" stroke="#64748b" />
                                    <YAxis dataKey="name" type="category" stroke="#94a3b8" width={120} tick={{fill: '#94a3b8'}} />
                                    <RechartsTooltip 
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                        itemStyle={{ color: '#f8fafc' }}
                                        cursor={{fill: '#1e293b'}}
                                    />
                                    <Bar dataKey="units" radius={[0, 4, 4, 0]}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Explanatory Text */}
                    <div className="border border-slate-800 bg-slate-900 rounded-xl p-6 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
                         <h3 className="text-xl font-mono font-bold text-white mb-3">How it works</h3>
                         <div className="space-y-3 text-slate-300 text-sm leading-relaxed relative z-10">
                            <p>
                                When you plan production, you look at your <strong>Demand</strong> ({demand} units) and subtract what you already have in <strong>Inventory</strong> ({inventory} units) to find your total required units ({totalRequired} units).
                            </p>
                            <p>
                                Then, you compare this requirement to your <strong>Production Capacity</strong> ({capacity} units). {
                                    plannedProduction === capacity && capacity < totalRequired 
                                    ? <span className="text-red-400">Since capacity is lower than requirements, you max out capacity at {plannedProduction} units, causing a shortfall.</span>
                                    : <span className="text-teal-400">Since capacity is sufficient, you only produce what you need: {plannedProduction} units.</span>
                                }
                            </p>
                            <p>
                                The goal is to perfectly balance these three elements to avoid stockouts (running out of product) and minimize excess inventory (tying up cash).
                            </p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductionPlanningDemo;
