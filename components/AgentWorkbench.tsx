
import React, { useState, useEffect } from 'react';
import { AnalysisReport, AgentFindings, CausalNode } from '../types.ts';
import CompliancePanel from './CompliancePanel.tsx';

interface AgentWorkbenchProps {
  report: AnalysisReport | null;
  loading: boolean;
  onReset: () => void;
  isManual?: boolean;
}

const LoadingBrain: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "INITIALIZING_ORCHESTRATOR",
    "POLLING_CHRONOS_TEMPORAL_LOGS",
    "EIDOLON_BEHAVIORAL_SYNCING",
    "MAPPING_NEXUS_RELATIONSHIPS",
    "LEX_COMPLIANCE_JUSTIFICATION_GEN",
    "FUSING_AEGIS_LEDGER_DATA",
    "VANGUARD_MARKET_SCAN_COMPLETE",
    "GENERATING_CAUSAL_FINAL_REPORT"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => (s + 1) % steps.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[500px] flex flex-col items-center justify-center space-y-12">
      <div className="relative">
        <div className="w-32 h-32 rounded-full border border-emerald-500/20 flex items-center justify-center animate-pulse">
          <div className="w-24 h-24 rounded-full border border-emerald-500/40 flex items-center justify-center animate-spin duration-[4s]">
             <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)]"></div>
             </div>
          </div>
        </div>
        <div className="absolute -inset-4 border border-dashed border-slate-800 rounded-full animate-spin duration-[10s]"></div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-emerald-500 font-mono text-xs font-bold tracking-[0.4em] uppercase">Swarm Synthesis</h3>
        <p className="text-slate-500 font-mono text-[10px] animate-pulse uppercase tracking-widest">{steps[step]}</p>
        <div className="flex gap-1 justify-center pt-4">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 w-4 rounded-full transition-colors duration-300 ${i <= step ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CausalStep: React.FC<{ node: CausalNode; index: number }> = ({ node, index }) => {
  return (
    <div className="flex gap-4 group">
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-6 h-6 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold ${
          node.logicType === 'CAUSAL' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
        }`}>
          {index + 1}
        </div>
        <div className="w-[1px] h-full bg-slate-800 my-1 group-last:hidden"></div>
      </div>
      <div className="pb-6">
        <div className="flex items-center gap-2 mb-1">
          <h5 className="text-[11px] font-bold text-slate-200 uppercase tracking-tight">{node.step}</h5>
          <span className={`px-1 rounded-[2px] text-[8px] font-black tracking-widest ${
            node.logicType === 'CAUSAL' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
          }`}>
            {node.logicType}
          </span>
        </div>
        <p className="text-[10px] text-slate-400 leading-snug max-w-sm mb-2">
          {node.description}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-slate-600 uppercase">via {node.evidenceSource}</span>
          {node.confidenceImpact !== 0 && (
            <span className={`text-[9px] font-mono font-bold ${node.confidenceImpact > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
              {node.confidenceImpact > 0 ? '+' : ''}{node.confidenceImpact} RISK
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const AgentCard: React.FC<{ report: AgentFindings }> = ({ report }) => {
  const statusColors = {
    SAFE: 'text-emerald-400',
    SUSPICIOUS: 'text-amber-400',
    FRAUD: 'text-rose-400'
  };

  return (
    <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-500 transition-all group">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-slate-200 flex items-center gap-2 text-xs">
          <div className={`w-2 h-2 rounded-full bg-current ${statusColors[report.status as keyof typeof statusColors] || 'text-slate-400'}`}></div>
          {report.agentName}
        </h4>
        <div className="text-[10px] font-mono text-slate-500">
          CONF: {(report.confidence * 100).toFixed(0)}%
        </div>
      </div>
      <p className="text-[11px] text-slate-400 leading-relaxed mb-3 h-[44px] line-clamp-3 overflow-hidden">
        {report.reasoning}
      </p>
      <div className="flex flex-wrap gap-1">
        {report.evidenceTags.map((tag, i) => (
          <span key={i} className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 text-[8px] font-mono border border-slate-800">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const AgentWorkbench: React.FC<AgentWorkbenchProps> = ({ report, loading, onReset, isManual }) => {
  const [activeTab, setActiveTab] = useState<'LOGIC' | 'COMPLIANCE'>('LOGIC');
  const [isExporting, setIsExporting] = useState(false);

  const handleExportForensics = () => {
    if (!report) return;
    setIsExporting(true);

    const forensicPacket = {
      header: {
        system: "CORTEX_INTEL_ENGINE_V3",
        transactionId: report.transactionId,
        exportTimestamp: new Date().toISOString(),
        classification: report.riskLevel,
      },
      audit: report.forensics,
      compliance: report.compliance,
      reasoningChain: report.causalChain,
      agentSwarmData: report.agentReports,
      summary: report.summary,
      verdict: report.verdict,
      score: report.overallScore
    };

    const blob = new Blob([JSON.stringify(forensicPacket, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CORTEX_AUDIT_${report.transactionId}_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsExporting(false), 1000);
  };

  if (loading) return <LoadingBrain />;

  if (!report) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center text-center p-10 opacity-50 border-2 border-dashed border-slate-800 rounded-3xl">
        <div className="w-12 h-12 bg-slate-800 rounded-full mb-4 flex items-center justify-center">
           <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
           </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-400">Awaiting Ingest Telemetry</h3>
        <p className="text-xs text-slate-600 mt-2">Select a transaction or scenario to initiate swarm analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in">
      <div className={`p-8 rounded-[3rem] border shadow-2xl ${
        report.verdict === 'REJECT' ? 'bg-rose-500/[0.03] border-rose-500/20 shadow-rose-500/5' : 
        report.verdict === 'APPROVE' ? 'bg-emerald-500/[0.03] border-emerald-500/20 shadow-emerald-500/5' : 'bg-amber-500/5 border-amber-500/20'
      }`}>
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${report.verdict === 'REJECT' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">
                {isManual ? 'Live_Pipeline_Decision' : 'Autonomous Decision'}
              </span>
            </div>
            <h2 className={`text-4xl font-black italic tracking-tighter uppercase ${report.verdict === 'REJECT' ? 'text-rose-500' : 'text-emerald-500'}`}>
              {report.verdict}
            </h2>
          </div>
          <div className="text-right">
             <div className="flex items-baseline justify-end gap-1">
               <span className={`text-5xl font-mono font-black tracking-tighter ${report.verdict === 'REJECT' ? 'text-rose-500' : 'text-white'}`}>{report.overallScore.toFixed(0)}</span>
               <span className="text-slate-500 text-sm font-bold">/100</span>
             </div>
             <span className="text-slate-600 block text-[10px] font-mono uppercase tracking-widest mt-1">Global_Risk_Index</span>
          </div>
        </div>
        
        <div className="flex border-b border-slate-800/50 mb-8 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('LOGIC')}
            className={`px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative shrink-0 ${activeTab === 'LOGIC' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Synthesis & Logic
            {activeTab === 'LOGIC' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('COMPLIANCE')}
            className={`px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative shrink-0 ${activeTab === 'COMPLIANCE' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Compliance & Forensic Audit
            {activeTab === 'COMPLIANCE' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full"></div>}
          </button>
        </div>

        {activeTab === 'LOGIC' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Neural Narrative</h3>
              <p className="text-slate-300 leading-relaxed text-sm antialiased mb-6 font-medium">{report.summary}</p>
              <div className="flex items-center gap-6 py-4 border-y border-slate-800/30">
                <div className="flex-1">
                    <span className="block text-[10px] text-slate-500 uppercase font-mono mb-2">Inference Uncertainty</span>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${report.uncertaintyFactor * 100}%` }}></div>
                    </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-black/30 p-6 rounded-3xl border border-slate-800/50 max-h-[400px] overflow-y-auto custom-scrollbar shadow-inner">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Execution Chain</h3>
              {report.causalChain?.map((node, i) => (
                <CausalStep key={i} node={node} index={i} />
              ))}
            </div>
          </div>
        ) : (
          <CompliancePanel report={report} />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {report.agentReports.map((agent, idx) => (
          <AgentCard key={idx} report={agent} />
        ))}
      </div>

      <div className="flex gap-4 pt-8">
        <button 
          onClick={onReset}
          className="flex-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 border border-rose-500/50"
        >
           <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
           Terminate Session
        </button>
        <button 
          onClick={handleExportForensics}
          disabled={isExporting}
          className="px-10 bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 text-xs font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3 shadow-2xl"
        >
          {isExporting ? (
             <div className="w-4 h-4 border-2 border-slate-600 border-t-white rounded-full animate-spin"></div>
          ) : (
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
             </svg>
          )}
          {isExporting ? 'GEN_PACKET...' : 'Download Forensics'}
        </button>
      </div>
    </div>
  );
};

export default AgentWorkbench;
