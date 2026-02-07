
import React, { useState } from 'react';
import { Transaction } from '../types';

interface EventIngestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIngest: (txn: Transaction) => void;
}

const EventIngestModal: React.FC<EventIngestModalProps> = ({ isOpen, onClose, onIngest }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    amount: 1500,
    merchant: 'GLOBAL_TRANSFER_X',
    location: 'Unknown, Cloud',
    userId: 'USR-' + Math.floor(Math.random() * 9000 + 1000),
    domain: 'FINANCE' as Transaction['domain']
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      const newTxn: Transaction = {
        id: `TXN-${Math.floor(Math.random() * 10000)}-SIM`,
        timestamp: new Date().toISOString().replace('2025', '2026'),
        amount: formData.amount,
        currency: 'USD',
        merchant: formData.merchant,
        location: formData.location,
        userId: formData.userId,
        ipAddress: '45.112.92.' + Math.floor(Math.random() * 255),
        deviceFingerprint: 'dfp_simulated_' + Math.floor(Math.random() * 10000),
        status: 'PENDING',
        riskScore: 0.5,
        domain: formData.domain
      };
      onIngest(newTxn);
      setIsProcessing(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="bg-[#0f172a] w-full max-w-lg rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-black italic tracking-tighter text-white mb-2">Simulate Threat</h2>
            <p className="text-slate-500 text-sm">Inject a custom event into the CORTEX neural pipeline</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-[10px] font-mono text-slate-500 uppercase mb-2">Amount (USD)</label>
                 <input 
                   type="number" 
                   value={formData.amount}
                   disabled={isProcessing}
                   onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})}
                   className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-white disabled:opacity-50"
                 />
               </div>
               <div>
                 <label className="block text-[10px] font-mono text-slate-500 uppercase mb-2">Domain Context</label>
                 <select 
                   value={formData.domain}
                   disabled={isProcessing}
                   onChange={e => setFormData({...formData, domain: e.target.value as Transaction['domain']})}
                   className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-white appearance-none disabled:opacity-50"
                 >
                   <option value="FINANCE">Finance</option>
                   <option value="TRADING">Trading</option>
                   <option value="MARKETPLACE">Marketplace</option>
                   <option value="COMPLIANCE">Compliance</option>
                 </select>
               </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase mb-2">Merchant Endpoint</label>
              <input 
                type="text" 
                value={formData.merchant}
                disabled={isProcessing}
                onChange={e => setFormData({...formData, merchant: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-white disabled:opacity-50"
                placeholder="e.g. CRYPTO_EXCHANGE_ALPHA"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase mb-2">Actor Identifier</label>
              <input 
                type="text" 
                value={formData.userId}
                disabled={isProcessing}
                onChange={e => setFormData({...formData, userId: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-white disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              disabled={isProcessing}
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors disabled:opacity-0"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isProcessing}
              className={`flex-1 ${isProcessing ? 'bg-slate-700' : 'bg-emerald-500'} text-slate-950 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-400 hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin"></div>
                  SYST_INIT...
                </>
              ) : (
                'INITIALIZE ANALYSIS'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventIngestModal;
