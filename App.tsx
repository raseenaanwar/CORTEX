
import React, { useState } from 'react';
import Header from './components/Header.tsx';
import TransactionList from './components/TransactionList.tsx';
import AgentWorkbench from './components/AgentWorkbench.tsx';
import NetworkGraph from './components/NetworkGraph.tsx';
import TemporalTimeline from './components/TemporalTimeline.tsx';
import OverviewDashboard from './components/OverviewDashboard.tsx';
import EventIngestModal from './components/EventIngestModal.tsx';
import { MOCK_TRANSACTIONS } from './constants.tsx';
import { Transaction, AnalysisReport, SystemStats, DemoScenario } from './types.ts';
import { analyzeTransaction } from './services/geminiService.ts';

type ViewState = 'OVERVIEW' | 'INVESTIGATION';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('OVERVIEW');
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [isIngestOpen, setIsIngestOpen] = useState(false);
  const [stats, setStats] = useState<SystemStats>({
    totalAnalyzed: 14209,
    threatsPrevented: 842,
    avgConfidence: 0.96,
    activeAgents: 6
  });

  const resetSession = () => {
    setView('OVERVIEW');
    setSelectedTxn(null);
    setReport(null);
    setLoading(false);
  };

  const handleSelectTransaction = async (txn: Transaction) => {
    setSelectedTxn(txn);
    setView('INVESTIGATION');
    setLoading(true);
    setReport(null);
    try {
      const result = await analyzeTransaction(txn);
      setReport(result);
    } catch (err) {
      console.error("Analysis Pipeline Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleScenarioSelect = (scenario: DemoScenario) => {
    const injectedTxn: Transaction = {
      id: `SIM-${scenario.id}-${Math.floor(Math.random()*1000)}`,
      timestamp: new Date().toISOString().replace('2025', '2026'),
      currency: 'USD',
      status: 'PENDING',
      amount: 0,
      merchant: '',
      location: '',
      userId: 'DEMO_USER',
      ipAddress: '0.0.0.0',
      deviceFingerprint: 'demo_device',
      riskScore: scenario.expectedOutcome === 'REJECT' ? 0.9 : 0.1,
      scenarioType: scenario.id,
      ...scenario.triggerEvent as any
    };
    setTransactions(prev => [injectedTxn, ...prev]);
    handleSelectTransaction(injectedTxn);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-emerald-500">
      <Header 
        view={view} 
        setView={setView} 
        onDeploy={() => setIsIngestOpen(true)} 
      />
      
      <main className="max-w-[1600px] mx-auto p-4 lg:p-8">
        {view === 'OVERVIEW' ? (
          <OverviewDashboard 
            stats={stats} 
            transactions={transactions} 
            onSelect={handleSelectTransaction} 
            onScenarioSelect={handleScenarioSelect}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in">
            <aside className="lg:col-span-3">
              <div className="bg-[#0f172a]/80 p-6 rounded-3xl border border-slate-800 h-full">
                <h2 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">Live Feed</h2>
                <div className="max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                  <TransactionList 
                    transactions={transactions} 
                    onSelect={handleSelectTransaction} 
                    selectedId={selectedTxn?.id} 
                  />
                </div>
              </div>
            </aside>

            <section className="lg:col-span-6 space-y-6">
              <div className="bg-[#0f172a]/40 p-2 sm:p-10 rounded-[2.5rem] border border-slate-800 relative min-h-[600px]">
                <AgentWorkbench 
                  report={report} 
                  loading={loading} 
                  onReset={resetSession} 
                  isManual={!selectedTxn?.scenarioType}
                />
              </div>
            </section>

            <aside className="lg:col-span-3 space-y-6">
              <div className="bg-[#0f172a]/80 p-6 rounded-3xl border border-slate-800">
                 <h3 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">Scenario Topology</h3>
                 <NetworkGraph scenarioId={selectedTxn?.scenarioType} />
              </div>
              <div className="bg-[#0f172a]/80 p-6 rounded-3xl border border-slate-800">
                 <h3 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">Causal Kill-Chain</h3>
                 {report?.temporalTimeline && report.temporalTimeline.length > 0 ? (
                    <TemporalTimeline markers={report.temporalTimeline} />
                 ) : (
                    <div className="py-20 text-center opacity-20">
                      <p className="text-[10px] font-mono animate-pulse uppercase tracking-widest">Awaiting_Chain_Reconstruction...</p>
                    </div>
                 )}
              </div>
            </aside>
          </div>
        )}
      </main>

      <EventIngestModal 
        isOpen={isIngestOpen} 
        onClose={() => setIsIngestOpen(false)} 
        onIngest={(t) => {
          setTransactions(prev => [t, ...prev]);
          setIsIngestOpen(false);
          handleSelectTransaction(t);
        }} 
      />
    </div>
  );
};

export default App;
