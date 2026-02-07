
import React from 'react';
import { AnalysisReport } from '../types.ts';

interface CompliancePanelProps {
  report: AnalysisReport;
}

const CompliancePanel: React.FC<CompliancePanelProps> = ({ report }) => {
  const comp = report.compliance;
  const forensics = report.forensics;

  if (!comp) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex justify-between">
          Regulatory Justification
          <span className="text-emerald-500 lowercase font-mono">legal_review_ready</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed italic mb-6">
          "{comp.regulatoryJustification}"
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/50">
            <span className="block text-[8px] font-mono text-slate-600 uppercase mb-1">GDPR Status</span>
            <span className="text-[10px] font-bold text-emerald-400">{comp.gdprStatus}</span>
          </div>
          <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/50">
            <span className="block text-[8px] font-mono text-slate-600 uppercase mb-1">Jurisdiction</span>
            <span className="text-[10px] font-bold text-slate-300">{comp.jurisdiction}</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-950/40 rounded-2xl border border-slate-800 border-dashed">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Forensic Integrity</h3>
        <div className="space-y-3 font-mono text-[9px]">
          <div className="flex justify-between">
            <span className="text-slate-600">AUDIT_HASH:</span>
            <span className="text-slate-400 truncate ml-4">{forensics?.checksum}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">TIMESTAMP:</span>
            <span className="text-slate-400">{forensics?.generatedAt}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">RETENTION:</span>
            <span className="text-slate-400">{comp.dataRetentionPeriod}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl">
        <div className="flex gap-2 mb-2">
          <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">Uncertainty Disclosure</span>
        </div>
        <p className="text-[10px] text-amber-500/80 leading-snug">
          Decision confidence influenced by {(report.uncertaintyFactor * 100).toFixed(0)}% inferential probability. Manual review recommended for edge-case justification.
        </p>
      </div>
    </div>
  );
};

export default CompliancePanel;
