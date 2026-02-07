
import React from 'react';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onSelect: (txn: Transaction) => void;
  selectedId?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onSelect, selectedId }) => {
  return (
    <div className="flex flex-col gap-3">
      {transactions.map((txn) => (
        <button
          key={txn.id}
          onClick={() => onSelect(txn)}
          className={`w-full text-left p-5 rounded-3xl border transition-all duration-500 group relative overflow-hidden ${
            selectedId === txn.id 
              ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg shadow-emerald-500/5' 
              : 'bg-slate-900/40 border-slate-800/50 hover:border-slate-700 hover:bg-slate-900/60'
          }`}
        >
          {selectedId === txn.id && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
          )}
          
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <span className={`px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest uppercase border ${
                   txn.domain === 'TRADING' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                   txn.domain === 'MARKETPLACE' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                   txn.domain === 'FINANCE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                   'bg-slate-500/10 text-slate-400 border-slate-500/20'
                 }`}>
                   {txn.domain || 'SYSTEM'}
                 </span>
                 {!txn.scenarioType && (
                   <span className="px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest uppercase bg-emerald-500 text-slate-950 animate-pulse">
                     LIVE_INGEST
                   </span>
                 )}
                 <span className="text-[9px] font-mono text-slate-600 font-bold uppercase tracking-tighter">{txn.id}</span>
              </div>
              <h3 className="font-bold text-slate-100 group-hover:text-white transition-colors truncate max-w-[150px]">
                {txn.merchant.replace(/_/g, ' ')}
              </h3>
            </div>
            <div className={`px-3 py-1 rounded-xl text-[10px] font-black tracking-tighter border ${
              txn.riskScore > 0.7 ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
              txn.riskScore > 0.3 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
              'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
            }`}>
              {(txn.riskScore * 100).toFixed(0)}%
            </div>
          </div>
          
          <div className="flex items-end justify-between mt-6">
            <span className="text-xl font-mono font-black text-white tracking-tighter italic">
              {txn.amount.toLocaleString(undefined, { style: 'currency', currency: txn.currency })}
            </span>
            <div className="text-right">
               <span className="block text-[8px] font-mono text-slate-600 uppercase mb-0.5">Telemetry_Timestamp</span>
               <span className="text-[9px] font-mono text-slate-500 font-bold">
                {new Date(txn.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
               </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TransactionList;
