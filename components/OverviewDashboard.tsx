
import React, { useState, useEffect } from 'react';
import RiskChart from './RiskChart';
import TransactionList from './TransactionList';
import { Transaction, SystemStats, DemoScenario } from '../types';
import { DEMO_SCENARIOS } from '../constants';

interface OverviewDashboardProps {
  stats: SystemStats;
  transactions: Transaction[];
  onSelect: (txn: Transaction) => void;
  onScenarioSelect: (scenario: DemoScenario) => void;
}

const TerminalLog: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const messages = [
    "SYNCING_CHRONOS_PIPELINE...",
    "DETECTED_ANOMALY_IP_45.22.1",
    "NEXUS_CLUSTER_IDENTIFIED_0x992",
    "VANGUARD_SCANNING_AFFILIATES",
    "CLEARED_LEGAL_BUFFER_LEX_V3",
    "AEGIS_LEDGER_INTEGRITY_100%",
    "NEW_TELEMETRY_INGESTED_FINANCE",
    "HEARTBEAT_SENTINEL_ACTIVE",
    "MAPPING_2026_TEMPORAL_MARKERS",
    "GDPR_PII_MASK_V4_ENABLED"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [messages[Math.floor(Math.random() * messages.length)], ...prev].slice(0, 12));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/40 rounded-2xl p-4 font-mono text-[9px] h-full overflow-hidden border border-slate-800/50">
      <div className="flex items-center gap-2 mb-3 text-slate-600">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        SYSTEM_REALTIME_STREAM
      </div>
      {logs.map((log, i) => (
        <div key={i} className={`mb-1 transition-opacity ${i === 0 ? 'text-emerald-400 opacity-100' : 'text-slate-500 opacity-40'}`}>
          <span className="text-slate-700">[{new Date().toLocaleTimeString()}]</span> {log}
        </div>
      ))}
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string | number, color?: string }> = ({ label, value, color = "text-white" }) => (
  <div className="bg-[#0f172a]/60 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-xl group hover:border-slate-600 transition-colors">
    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] block mb-1 group-hover:text-emerald-500 transition-colors">{label}</span>
    <div className={`text-4xl font-black tracking-tighter ${color} tabular-nums`}>{value}</div>
  </div>
);

const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ stats, transactions, onSelect, onScenarioSelect }) => {
  
  const handleDownloadProposal = () => {
    const proposal = `
============================================================
CORTEX: UNIVERSAL FRAUD INTELLIGENCE ENGINE
Project Proposal & System Specification (Internal)
Timeframe: 2026 Deployment Phase
============================================================

1. EXECUTIVE SUMMARY
CORTEX represents a paradigm shift from traditional risk scoring to
Deterministic Causal Reasoning. By deploying a swarm of six 
specialized AI agents, the system provides transparent, legal-grade 
audits for every transaction decision.

2. CORE CAPABILITIES
- Swarm Intelligence: 6 agents (Chronos, Nexus, Eidolon, etc.)
- Causal Reasoning: Decision-tree logic for regulatory audit.
- Cross-Domain Visibility: Unified intelligence across Trading, 
  Finance, and Marketplaces.
- GDPR Compliance: Automated PII masking and forensic hashing.

3. ARCHITECTURAL SWARM (Agents)
- CHRONOS: Temporal velocity and sequence analysis.
- EIDOLON: Behavioral fingerprinting and session integrity.
- NEXUS: Massive-scale graph relationship mapping.
- LEX: Regulatory alignment and legal justification.
- AEGIS: Financial ledger and liquidity verification.
- VANGUARD: Merchant/Affiliate fraud vector monitoring.

4. ROADMAP (2026)
- Q1: Neural ingest pipeline optimization.
- Q2: Causal Kill-Chain visualization 2.0.
- Q3: Automated SAR (Suspicious Activity Report) generation.
- Q4: Autonomous agent-led adversarial training.

5. SECURITY PROTOCOLS
- Real-time Sentinel monitoring.
- SHA-256 Forensic logic hashing for every decision.
- Zero-Trust telemetry ingestion.

(c) 2026 Cortex Neural Defense. All Rights Reserved.
============================================================
    `.trim();

    const blob = new Blob([proposal], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CORTEX_Project_Proposal_2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in">
      {/* Header with Proposal Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">System_Metrics_2026</h2>
        <button 
          onClick={handleDownloadProposal}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-all active:scale-95"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Project Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Analyzed" value={stats.totalAnalyzed.toLocaleString()} />
        <StatCard label="Prevented" value={stats.threatsPrevented} color="text-emerald-400" />
        <StatCard label="Confidence" value="96.2%" color="text-blue-400" />
        <StatCard label="Active Swarms" value={6} color="text-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-8 bg-[#0f172a]/40 p-10 rounded-[3rem] border border-slate-800 relative overflow-hidden">
          <div className="absolute top-8 right-10 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Risk_Baseline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Live_Attack_Vectors</span>
            </div>
          </div>
          <h3 className="text-xl font-black italic tracking-tighter text-white mb-8 uppercase">Global Risk Topology</h3>
          <RiskChart />
        </div>

        {/* Real-time System Logs */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex-1 min-h-[300px]">
            <TerminalLog />
          </div>
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Heuristic Engine</h4>
               <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 rounded text-[9px] font-bold">OPTIMAL</span>
            </div>
            <p className="text-[11px] text-emerald-500/70 font-medium leading-relaxed">
              Neural processing latency at <span className="text-emerald-400 font-bold">24ms</span>. Agents currently monitoring <span className="text-emerald-400 font-bold">14,209</span> global identities.
            </p>
          </div>
        </div>
      </div>

      {/* Scenarios Deck */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Simulation Deck</h3>
          <span className="text-[10px] font-mono text-slate-700">SELECT_SCENARIO_FOR_DEEP_DIVE</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_SCENARIOS.map(s => (
            <button 
              key={s.id}
              onClick={() => onScenarioSelect(s)}
              className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] text-left hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all group relative overflow-hidden active:scale-95"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="text-4xl">{s.icon}</span>
              </div>
              <div className="text-2xl mb-4 group-hover:scale-110 transition-transform inline-block">{s.icon}</div>
              <h4 className="text-white font-bold mb-1 tracking-tight">{s.name}</h4>
              <p className="text-[11px] text-slate-500 mb-4 leading-relaxed line-clamp-2">{s.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded uppercase font-bold">FOCUS: {s.intelligenceFocus}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Live Telemetry Footer */}
      <div className="bg-[#0f172a]/60 p-8 rounded-[3rem] border border-slate-800 flex flex-col h-[400px]">
        <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6">Neural Ingest stream</h3>
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
           <TransactionList transactions={transactions} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
