
import React from 'react';
import { TemporalMarker } from '../types';

interface TemporalTimelineProps {
  markers: TemporalMarker[];
}

const TemporalTimeline: React.FC<TemporalTimelineProps> = ({ markers }) => {
  return (
    <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
      {markers.map((marker, i) => (
        <div key={i} className="relative pl-8 group">
          <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-slate-950 flex items-center justify-center transition-transform group-hover:scale-110 z-10 ${
            marker.type === 'ANOMALY' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' :
            marker.type === 'CURRENT' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' :
            'bg-slate-700'
          }`}>
            {marker.type === 'ANOMALY' && <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>}
          </div>
          
          <div className="bg-slate-950/40 border border-slate-800/50 p-3 rounded-xl hover:border-slate-700/50 transition-all">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-[11px] font-bold text-slate-100 uppercase tracking-wider">{marker.event}</h4>
              <span className="text-[10px] font-mono text-slate-500">{marker.timestamp}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {marker.description}
            </p>
            {marker.severity === 'HIGH' && (
              <div className="mt-2 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-rose-500"></span>
                <span className="text-[9px] font-black text-rose-500 uppercase italic">Temporal Violation Detected</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemporalTimeline;
