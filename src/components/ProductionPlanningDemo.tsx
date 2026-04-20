import React, { useState, useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell, Area, ComposedChart, Line, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

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
        { name: 'Planned Production', units: plannedProduction, fill: '#3b82f6' }, // blue-500
        { name: 'Total Demand', units: demand, fill: '#ef4444' } // red-500
    ];

    // --- Material Inventory Simulation ---
    const [dailyDemand, setDailyDemand] = useState<number>(100);
    const [dailyProduction, setDailyProduction] = useState<number>(120);
    const [minInventory, setMinInventory] = useState<number>(200);
    const [maxInventory, setMaxInventory] = useState<number>(800);
    const [startingStock] = useState<number>(500);

    const timeSeriesData = useMemo(() => {
        let currentStock = startingStock;
        const series = [];
        for (let day = 1; day <= 14; day++) {
            // Add realistic variability based on the day (pseudo-random but stable pattern)
            const demandVariation = Math.round(dailyDemand * 0.25 * Math.sin(day * 2) + (day % 3 === 0 ? dailyDemand * 0.15 : -dailyDemand * 0.05));
            const prodVariation = Math.round(dailyProduction * 0.15 * Math.cos(day * 1.5) - (day % 5 === 0 ? dailyProduction * 0.2 : 0));
            
            const actualDemand = Math.max(0, dailyDemand + demandVariation);
            const actualProduction = Math.max(0, dailyProduction + prodVariation);

            // Apply production (receipts)
            currentStock += actualProduction;
            // Apply demand (issues)
            currentStock -= actualDemand;

            let status = 'Optimal';
            if (currentStock < minInventory) status = 'Warning: Stockout Risk';
            if (currentStock > maxInventory) status = 'Warning: Excess Inventory';

            series.push({
                day: `Day ${day}`,
                inventory: currentStock,
                min: minInventory,
                max: maxInventory,
                demand: actualDemand,
                production: actualProduction,
                status
            });
        }
        return series;
    }, [startingStock, dailyDemand, dailyProduction, minInventory, maxInventory]);

    // --- DEMO 3: Multi-Level BOM Demand Netting ---
    const [bomDemand, setBomDemand] = useState<number>(100);
    const [safetyStockPct, setSafetyStockPct] = useState<number>(10);
    const [onHandSA001, setOnHandSA001] = useState<number>(20);
    const [onHandSA002, setOnHandSA002] = useState<number>(10);
    const [onHandCX001, setOnHandCX001] = useState<number>(50);
    const [onHandCZ001, setOnHandCZ001] = useState<number>(30);
    const [onHandRM001, setOnHandRM001] = useState<number>(200);
    const [onHandRM002, setOnHandRM002] = useState<number>(100);

    const bomCalculations = useMemo(() => {
        const grFG = bomDemand;
        const grSA001 = grFG * 2;
        const grSA002 = grFG * 1;
        const grCX001 = grSA001 * 3;
        const grCZ001 = grSA002 * 4;
        const grRM001 = grCX001 * 5;
        const grRM002 = grCZ001 * 2;

        const ssFactor = safetyStockPct / 100;

        const items = [
            { level: 0, indent: 0, item: 'FG-001', qtyPer: '-', gr: grFG, oh: 0 },
            { level: 1, indent: 1, item: 'SA-001', qtyPer: '2', gr: grSA001, oh: onHandSA001 },
            { level: 2, indent: 2, item: 'CX-001', qtyPer: '3', gr: grCX001, oh: onHandCX001 },
            { level: 3, indent: 3, item: 'RM-001', qtyPer: '5', gr: grRM001, oh: onHandRM001 },
            { level: 1, indent: 1, item: 'SA-002', qtyPer: '1', gr: grSA002, oh: onHandSA002 },
            { level: 2, indent: 2, item: 'CZ-001', qtyPer: '4', gr: grCZ001, oh: onHandCZ001 },
            { level: 3, indent: 3, item: 'RM-002', qtyPer: '2', gr: grRM002, oh: onHandRM002 },
        ];

        return items.map(i => {
            const ss = Math.round(i.gr * ssFactor);
            const netReq = Math.max(0, i.gr - i.oh + ss);
            return { ...i, ss, netReq, name: i.item };
        });
    }, [bomDemand, safetyStockPct, onHandSA001, onHandSA002, onHandCX001, onHandCZ001, onHandRM001, onHandRM002]);

    const totalNetReq = bomCalculations.reduce((sum, item) => sum + item.netReq, 0);
    const maxNetReq = Math.max(...bomCalculations.map(i => i.netReq));
    let bomStatus = "All Covered";
    if (maxNetReq >= 500) {
        bomStatus = "Critical Shortage";
    } else if (totalNetReq > 0) {
        bomStatus = "Partial Shortage";
    }

    // ── Demo 4: Digital Twin state ──────────────────────────────────────────
    const [capacityUsed, setCapacityUsed] = useState<number>(75);
    const [defectRate, setDefectRate] = useState<number>(5);
    const [onTimeDelivery, setOnTimeDelivery] = useState<number>(88);
    const [laborEfficiency, setLaborEfficiency] = useState<number>(80);
    const [materialCostRatio, setMaterialCostRatio] = useState<number>(45);
    const [supplierOTD, setSupplierOTD] = useState<number>(82);
    const [headcount, setHeadcount] = useState<number>(85);

    const digitalTwinMetrics = useMemo(() => {
        const oee = Math.round(capacityUsed * (laborEfficiency / 100) * ((100 - defectRate) / 100));
        const throughput = Math.round(capacityUsed * ((100 - defectRate) / 100));
        const costEfficiency = 100 - materialCostRatio;
        const customerScore = onTimeDelivery;
        const supplierScore = supplierOTD;
        // workforce score: how well current headcount covers required staffing for active capacity
        const requiredWorkers = Math.max(1, Math.round(capacityUsed * 1.5));
        const workforceScore = Math.min(100, Math.round((headcount / requiredWorkers) * 100));
        const overallHealth = Math.round((oee + throughput + costEfficiency + customerScore + supplierScore + workforceScore) / 6);
        const radarData = [
            { metric: 'OEE', value: oee },
            { metric: 'Throughput', value: throughput },
            { metric: 'Cost Efficiency', value: costEfficiency },
            { metric: 'Customer OTD', value: customerScore },
            { metric: 'Labor Efficiency', value: laborEfficiency },
            { metric: 'Supplier OTD', value: supplierScore },
            { metric: 'Workforce', value: workforceScore },
        ];
        return { oee, throughput, costEfficiency, customerScore, supplierScore, workforceScore, overallHealth, radarData };
    }, [capacityUsed, defectRate, onTimeDelivery, laborEfficiency, materialCostRatio, supplierOTD, headcount]);

    const twinHealthColor = digitalTwinMetrics.overallHealth >= 80 ? 'text-emerald-400' : digitalTwinMetrics.overallHealth >= 60 ? 'text-amber-400' : 'text-red-400';
    const twinStatusLabel = digitalTwinMetrics.overallHealth >= 80 ? 'Healthy' : digitalTwinMetrics.overallHealth >= 60 ? 'Needs Attention' : 'Critical';
    const twinStatusBg = digitalTwinMetrics.overallHealth >= 80 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : digitalTwinMetrics.overallHealth >= 60 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-red-500/10 border-red-500/30 text-red-400';

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="mb-12 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-mono font-bold text-blue-400">Production Planning 101</h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Production planning is the process of aligning <span className="text-red-400 font-semibold">Demand</span> with available <span className="text-blue-400 font-semibold">Capacity</span> and <span className="text-slate-300 font-semibold">Inventory</span>. Use the interactive controls below to see how changes affect your production strategy.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls Area */}
                {/* DEMO 1: Supply vs Demand Overview */}
                <div className="lg:col-span-1 border border-slate-800 bg-slate-900 rounded-xl p-6 space-y-8">
                    <h2 className="text-xl font-mono font-bold text-white border-b border-slate-800 pb-4">1. Weekly Balance</h2>
                    
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
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDemand(Number(e.target.value))}
                                className="w-full accent-red-500"
                            />
                            <p className="text-xs text-slate-500 mt-1">Expected customer orders.</p>
                        </label>
                    </div>

                    <div className="space-y-4">
                        <label className="block">
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-300 font-medium">Production Capacity</span>
                                <span className="text-blue-400 font-mono">{capacity} units</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" max="2000" step="50"
                                value={capacity} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCapacity(Number(e.target.value))}
                                className="w-full accent-blue-500"
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
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInventory(Number(e.target.value))}
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
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <p className="text-slate-400 text-sm mb-1">Planned Production</p>
                            <p className="text-3xl font-mono font-bold text-blue-400">{plannedProduction}</p>
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
                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
                         <h3 className="text-xl font-mono font-bold text-white mb-3">How it works</h3>
                         <div className="space-y-3 text-slate-300 text-sm leading-relaxed relative z-10">
                            <p>
                                When you plan production, you look at your <strong>Demand</strong> ({demand} units) and subtract what you already have in <strong>Inventory</strong> ({inventory} units) to find your total required units ({totalRequired} units).
                            </p>
                            <p>
                                Then, you compare this requirement to your <strong>Production Capacity</strong> ({capacity} units). {
                                    plannedProduction === capacity && capacity < totalRequired 
                                    ? <span className="text-red-400">Since capacity is lower than requirements, you max out capacity at {plannedProduction} units, causing a shortfall.</span>
                                    : <span className="text-blue-400">Since capacity is sufficient, you only produce what you need: {plannedProduction} units.</span>
                                }
                            </p>
                            <p>
                                The goal is to perfectly balance these three elements to avoid stockouts (running out of product) and minimize excess inventory (tying up cash).
                            </p>
                         </div>
                    </div>
                </div>
            </div>

            {/* --- DEMO 2: Inventory Projection --- */}
            <div className="mt-16 border-t border-slate-800 pt-16">
                <div className="mb-12 text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-mono font-bold text-blue-400">2. Material Inventory Projection</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Track a specific part number over time. Keep stock levels between the <span className="text-red-400 font-semibold">Min (Safety Stock)</span> and <span className="text-emerald-400 font-semibold">Max (Storage Limit)</span> thresholds.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="border border-slate-800 bg-slate-900 rounded-xl p-6 space-y-6">
                            <h3 className="text-xl font-mono font-bold text-white border-b border-slate-800 pb-4">Daily Rates</h3>
                            
                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium">Avg Daily Demand</span>
                                    <span className="text-red-400 font-mono">{dailyDemand}</span>
                                </div>
                                <input 
                                    type="range" min="50" max="300" step="10"
                                    value={dailyDemand} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDailyDemand(Number(e.target.value))}
                                    className="w-full accent-red-500"
                                />
                                <p className="text-xs text-slate-500 mt-1">Baseline consumed per day (± variability applied)</p>
                            </label>

                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium">Avg Daily Production</span>
                                    <span className="text-blue-400 font-mono">{dailyProduction}</span>
                                </div>
                                <input 
                                    type="range" min="50" max="300" step="10"
                                    value={dailyProduction} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDailyProduction(Number(e.target.value))}
                                    className="w-full accent-blue-500"
                                />
                                <p className="text-xs text-slate-500 mt-1">Baseline built per day (± variability applied)</p>
                            </label>
                        </div>

                        <div className="border border-slate-800 bg-slate-900 rounded-xl p-6 space-y-6">
                            <h3 className="text-xl font-mono font-bold text-white border-b border-slate-800 pb-4">Policy Limits</h3>
                            
                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium">Min Inventory</span>
                                    <span className="text-red-400 font-mono">{minInventory}</span>
                                </div>
                                <input 
                                    type="range" min="50" max="500" step="50"
                                    value={minInventory} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinInventory(Number(e.target.value))}
                                    className="w-full accent-red-500"
                                />
                                <p className="text-xs text-slate-500 mt-1">Safety stock threshold</p>
                            </label>

                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium">Max Inventory</span>
                                    <span className="text-emerald-400 font-mono">{maxInventory}</span>
                                </div>
                                <input 
                                    type="range" min="300" max="1500" step="50"
                                    value={maxInventory} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxInventory(Number(e.target.value))}
                                    className="w-full accent-emerald-500"
                                />
                                <p className="text-xs text-slate-500 mt-1">Max storage capacity</p>
                            </label>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="lg:col-span-3 border border-slate-800 bg-slate-900 rounded-xl p-6 h-[500px] flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-lg font-mono text-white">14-Day Forward Projection</h3>
                            <p className="text-sm text-slate-400">Starting Stock: {startingStock} units</p>
                        </div>
                        <div className="flex-grow">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                    <XAxis dataKey="day" stroke="#64748b" tick={{fill: '#94a3b8', fontSize: 12}} />
                                    <YAxis stroke="#64748b" tick={{fill: '#94a3b8'}} />
                                    <RechartsTooltip 
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                        labelStyle={{ color: '#cbd5e1' }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                    
                                    {/* Min/Max Bands */}
                                    <Area type="step" dataKey="max" fill="none" stroke="#10b981" strokeDasharray="5 5" fillOpacity={0} name="Max Limit" />
                                    <Area type="step" dataKey="min" fill="none" stroke="#ef4444" strokeDasharray="5 5" fillOpacity={0} name="Min Limit (Safety Stock)" />
                                    
                                    {/* Demand Bars */}
                                    <Bar dataKey="demand" barSize={20} fill="#3b82f6" opacity={0.3} name="Daily Demand" radius={[2, 2, 0, 0]} />
                                    
                                    {/* Actual Inventory Line */}
                                    <Line 
                                        type="monotone" 
                                        dataKey="inventory" 
                                        stroke="#3b82f6" 
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: '#0f172a', stroke: '#3b82f6', strokeWidth: 2 }} 
                                        activeDot={{ r: 6, fill: '#3b82f6' }}
                                        name="Projected Inventory" 
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- DEMO 3: Multi-Level BOM Demand Netting --- */}
            <div className="mt-16 border-t border-slate-800 pt-16 mb-12">
                <div className="mb-12 text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-mono font-bold text-blue-400">3. Multi-Level BOM Demand Netting</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Simulate MRP-style demand netting across BOM levels. Explode <span className="text-red-400 font-semibold">Gross Requirements</span> down to components and calculate <span className="text-blue-400 font-semibold">Net Requirements</span> based on inventory.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
                            <h3 className="text-xl font-mono font-bold text-white border-b border-slate-700 pb-4">Demand & Buffer</h3>
                            
                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium text-sm">FG-001 Demand</span>
                                    <span className="text-red-400 font-mono text-sm">{bomDemand}</span>
                                </div>
                                <input 
                                    type="range" min="0" max="500" step="10"
                                    value={bomDemand} 
                                    onChange={(e) => setBomDemand(Number(e.target.value))}
                                    className="w-full accent-red-500"
                                />
                            </label>

                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium text-sm">Safety Stock %</span>
                                    <span className="text-blue-400 font-mono text-sm">{safetyStockPct}%</span>
                                </div>
                                <input 
                                    type="range" min="0" max="50" step="5"
                                    value={safetyStockPct} 
                                    onChange={(e) => setSafetyStockPct(Number(e.target.value))}
                                    className="w-full accent-blue-500"
                                />
                            </label>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
                            <h3 className="text-xl font-mono font-bold text-white border-b border-slate-700 pb-4">On-Hand Inventory</h3>
                            
                            {[
                                { label: 'SA-001', val: onHandSA001, set: setOnHandSA001 },
                                { label: 'SA-002', val: onHandSA002, set: setOnHandSA002 },
                                { label: 'CX-001', val: onHandCX001, set: setOnHandCX001 },
                                { label: 'CZ-001', val: onHandCZ001, set: setOnHandCZ001 },
                                { label: 'RM-001', val: onHandRM001, set: setOnHandRM001 },
                                { label: 'RM-002', val: onHandRM002, set: setOnHandRM002 }
                            ].map((ctrl) => (
                                <label key={ctrl.label} className="block">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-slate-300 text-sm">{ctrl.label}</span>
                                        <span className="text-slate-400 font-mono text-sm">{ctrl.val}</span>
                                    </div>
                                    <input 
                                        type="range" min="0" max="500" step="10"
                                        value={ctrl.val} 
                                        onChange={(e) => ctrl.set(Number(e.target.value))}
                                        className="w-full h-1 accent-slate-500"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Output */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* BOM Table */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-mono text-white mb-4">BOM Explosion & Netting</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-slate-700/50 text-slate-300 text-sm">
                                            <th className="p-3 border-b border-slate-700">Level</th>
                                            <th className="p-3 border-b border-slate-700">Item</th>
                                            <th className="p-3 border-b border-slate-700 text-center">Qty / Parent</th>
                                            <th className="p-3 border-b border-slate-700 text-right">Gross Req</th>
                                            <th className="p-3 border-b border-slate-700 text-right">On-Hand</th>
                                            <th className="p-3 border-b border-slate-700 text-right">Safety Stock</th>
                                            <th className="p-3 border-b border-slate-700 text-right">Net Req</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bomCalculations.map((row, idx) => (
                                            <tr key={idx} className={`${idx % 2 === 0 ? 'bg-slate-800/30' : 'bg-transparent'} hover:bg-slate-700/30 transition-colors`}>
                                                <td className="p-3 border-b border-slate-800 text-slate-400">{row.level}</td>
                                                <td className="p-3 border-b border-slate-800 text-slate-200">
                                                    <span style={{ marginLeft: `${row.indent * 1.5}rem` }}>
                                                        {row.indent > 0 && <span className="text-slate-600 mr-2">└─</span>}
                                                        {row.item}
                                                    </span>
                                                </td>
                                                <td className="p-3 border-b border-slate-800 text-center text-slate-400 font-mono">{row.qtyPer}</td>
                                                <td className="p-3 border-b border-slate-800 text-right font-mono text-slate-300">{row.gr}</td>
                                                <td className="p-3 border-b border-slate-800 text-right font-mono text-slate-400">{row.oh}</td>
                                                <td className="p-3 border-b border-slate-800 text-right font-mono text-slate-400">{row.ss}</td>
                                                <td className={`p-3 border-b border-slate-800 text-right font-mono font-bold ${
                                                    row.netReq === 0 ? 'text-emerald-400' :
                                                    row.netReq < 50 ? 'text-amber-400' : 'text-red-400'
                                                }`}>
                                                    {row.netReq}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
                                <span className="text-slate-400 text-sm">Overall Status</span>
                                <div className="flex items-center space-x-4">
                                    <span className="text-slate-300 text-sm">Total Net Requirements: <span className="font-mono text-base">{totalNetReq}</span></span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                                        bomStatus === "All Covered" ? "bg-emerald-900/50 text-emerald-400 border border-emerald-800" :
                                        bomStatus === "Partial Shortage" ? "bg-amber-900/50 text-amber-400 border border-amber-800" :
                                        "bg-red-900/50 text-red-400 border border-red-800"
                                    }`}>
                                        {bomStatus}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 h-80 flex flex-col">
                            <h3 className="text-lg font-mono text-white mb-4">Requirements Chart</h3>
                            <div className="flex-grow">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={bomCalculations} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                        <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#94a3b8', fontSize: 12}} />
                                        <YAxis stroke="#64748b" tick={{fill: '#94a3b8'}} />
                                        <RechartsTooltip 
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                            itemStyle={{ color: '#f8fafc' }}
                                            cursor={{fill: '#1e293b'}}
                                        />
                                        <Legend />
                                        <Bar dataKey="gr" name="Gross Req" fill="#64748b" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="netReq" name="Net Req" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── DEMO 4: Digital Twin Simulator ─────────────────────────────────── */}
            <div className="mt-16 border-t border-slate-800 pt-16">
                <div className="mb-12 text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-mono font-bold text-blue-400">4. Digital Twin Simulator</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Set your operational parameters. Equations calculate your company's{' '}
                        <span className="text-blue-400 font-semibold">performance profile</span> in real time —
                        making it easier for management to see the full picture and make decisions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left: Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Operations box */}
                        <div className="border border-slate-800 bg-slate-900 rounded-xl p-6 space-y-6">
                            <h3 className="text-xl font-mono font-bold text-white border-b border-slate-800 pb-4">Operations</h3>

                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium text-sm">Capacity Utilization</span>
                                    <span className="text-blue-400 font-mono text-sm">{capacityUsed}%</span>
                                </div>
                                <input type="range" min="0" max="100" step="1" value={capacityUsed}
                                    onChange={e => setCapacityUsed(Number(e.target.value))}
                                    className="w-full accent-blue-500" />
                                <p className="text-xs text-slate-500 mt-1">% of total plant capacity in use</p>
                            </label>

                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium text-sm">Labor Efficiency</span>
                                    <span className="text-blue-400 font-mono text-sm">{laborEfficiency}%</span>
                                </div>
                                <input type="range" min="0" max="100" step="1" value={laborEfficiency}
                                    onChange={e => setLaborEfficiency(Number(e.target.value))}
                                    className="w-full accent-blue-500" />
                                <p className="text-xs text-slate-500 mt-1">Actual vs standard labor hours</p>
                            </label>

                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium text-sm">Defect / Scrap Rate</span>
                                    <span className="text-red-400 font-mono text-sm">{defectRate}%</span>
                                </div>
                                <input type="range" min="0" max="20" step="1" value={defectRate}
                                    onChange={e => setDefectRate(Number(e.target.value))}
                                    className="w-full accent-red-500" />
                                <p className="text-xs text-slate-500 mt-1">% of output rejected or scrapped</p>
                            </label>

                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium text-sm">Production Floor Headcount</span>
                                    <span className="text-blue-400 font-mono text-sm">{headcount} workers</span>
                                </div>
                                <input type="range" min="10" max="200" step="5" value={headcount}
                                    onChange={e => setHeadcount(Number(e.target.value))}
                                    className="w-full accent-blue-500" />
                                <p className="text-xs text-slate-500 mt-1">Active workers on the production floor</p>
                            </label>
                        </div>

                        {/* Commercial box */}
                        <div className="border border-slate-800 bg-slate-900 rounded-xl p-6 space-y-6">
                            <h3 className="text-xl font-mono font-bold text-white border-b border-slate-800 pb-4">Commercial</h3>

                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium text-sm">Customer On-Time Delivery</span>
                                    <span className="text-emerald-400 font-mono text-sm">{onTimeDelivery}%</span>
                                </div>
                                <input type="range" min="0" max="100" step="1" value={onTimeDelivery}
                                    onChange={e => setOnTimeDelivery(Number(e.target.value))}
                                    className="w-full accent-emerald-500" />
                                <p className="text-xs text-slate-500 mt-1">Orders delivered on or before due date</p>
                            </label>

                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium text-sm">Supplier On-Time Delivery</span>
                                    <span className="text-amber-400 font-mono text-sm">{supplierOTD}%</span>
                                </div>
                                <input type="range" min="0" max="100" step="1" value={supplierOTD}
                                    onChange={e => setSupplierOTD(Number(e.target.value))}
                                    className="w-full accent-amber-500" />
                                <p className="text-xs text-slate-500 mt-1">Inbound materials received on schedule</p>
                            </label>

                            <label className="block">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium text-sm">Material Cost Ratio</span>
                                    <span className="text-amber-400 font-mono text-sm">{materialCostRatio}%</span>
                                </div>
                                <input type="range" min="10" max="70" step="1" value={materialCostRatio}
                                    onChange={e => setMaterialCostRatio(Number(e.target.value))}
                                    className="w-full accent-amber-500" />
                                <p className="text-xs text-slate-500 mt-1">Material cost as % of revenue</p>
                            </label>
                        </div>
                    </div>

                    {/* Right: KPIs + RadarChart */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* KPI cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="border border-slate-800 bg-slate-900 rounded-xl p-5 text-center">
                                <p className="text-xs text-slate-500 font-mono mb-2">OEE</p>
                                <p className="text-3xl font-mono font-bold text-blue-400">{digitalTwinMetrics.oee}%</p>
                                <p className="text-xs text-slate-600 mt-1">Availability × Performance × Quality</p>
                            </div>
                            <div className="border border-slate-800 bg-slate-900 rounded-xl p-5 text-center">
                                <p className="text-xs text-slate-500 font-mono mb-2">Supplier OTD</p>
                                <p className="text-3xl font-mono font-bold text-amber-400">{digitalTwinMetrics.supplierScore}%</p>
                                <p className="text-xs text-slate-600 mt-1">Inbound materials on schedule</p>
                            </div>
                            <div className="border border-slate-800 bg-slate-900 rounded-xl p-5 text-center">
                                <p className="text-xs text-slate-500 font-mono mb-2">Overall Health</p>
                                <p className={`text-3xl font-mono font-bold ${twinHealthColor}`}>{digitalTwinMetrics.overallHealth}%</p>
                                <p className="text-xs text-slate-600 mt-1">Composite of all 7 metrics</p>
                            </div>
                            <div className="border border-slate-800 bg-slate-900 rounded-xl p-5 text-center flex flex-col items-center justify-center">
                                <p className="text-xs text-slate-500 font-mono mb-3">Status</p>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${twinStatusBg}`}>
                                    {twinStatusLabel}
                                </span>
                            </div>
                        </div>

                        {/* Radar chart */}
                        <div className="border border-slate-800 bg-slate-900 rounded-xl p-6 h-[400px] flex flex-col">
                            <div className="mb-2">
                                <h3 className="text-lg font-mono text-white">Company Performance Profile</h3>
                                <p className="text-sm text-slate-500">Each axis is 0–100. A larger shape means a healthier operation.</p>
                            </div>
                            <div className="flex-grow">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={digitalTwinMetrics.radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                                        <PolarGrid stroke="#1e293b" />
                                        <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                        <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} tickCount={5} />
                                        <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
                                        <RechartsTooltip
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                            labelStyle={{ color: '#cbd5e1' }}
                                            formatter={(value) => [`${value}%`, 'Score']}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductionPlanningDemo;
