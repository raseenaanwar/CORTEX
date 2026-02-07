
import React from 'react';

interface HeaderProps {
  view: 'OVERVIEW' | 'INVESTIGATION';
  setView: (v: 'OVERVIEW' | 'INVESTIGATION') => void;
  onDeploy: () => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView, onDeploy }) => {
  return (
    <header className="border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setView('OVERVIEW')}>
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-950" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white">CORTEX</h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em]">Neural Fraud Defense</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center bg-slate-900/40 p-1.5 rounded-2xl border border-slate-800/50">
          <button 
            onClick={() => setView('OVERVIEW')}
            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              view === 'OVERVIEW' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Network Overview
          </button>
          <button 
            onClick={() => setView('INVESTIGATION')}
            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              view === 'INVESTIGATION' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Investigation Lab
          </button>
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3 bg-slate-900/60 px-4 py-2 rounded-2xl border border-slate-800/50 group">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">Sentinel_Online</span>
          </div>
          <button 
            onClick={onDeploy}
            className="bg-white text-slate-950 px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-400 hover:scale-105 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            Inject Event
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
