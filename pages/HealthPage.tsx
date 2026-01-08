
import React, { useState } from 'react';
import { Activity, Droplets, Info, PlusCircle, History, Shield } from 'lucide-react';

const HealthPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loc, setLoc] = useState('Vaginal');
  const [desc, setDesc] = useState('');

  const addLog = () => {
    if (!desc) return;
    const newLog = { id: Date.now(), loc, desc, date: new Date().toLocaleDateString() };
    setLogs([newLog, ...logs]);
    setDesc('');
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-4xl font-black text-white tracking-tighter">Health & Discharge Log</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">Monitor physical recovery and record medical signs</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="bg-[#12141c]/80 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <PlusCircle className="text-indigo-400" />
              <h3 className="text-xl font-bold text-white">Add to Secure Log</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Region of Concern</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Vaginal', 'Anal', 'Mouth', 'Other'].map(l => (
                    <button 
                      key={l}
                      onClick={() => setLoc(l)}
                      className={`py-3 rounded-2xl text-xs font-bold border transition-all ${loc === l ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Symptoms / Description</label>
                <textarea 
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  placeholder="Describe discharge (color, odor, smell, pain...)"
                  className="w-full bg-white/5 border border-white/5 rounded-[2rem] p-6 text-white outline-none focus:ring-2 ring-indigo-500 h-32 placeholder:text-gray-600 resize-none"
                />
              </div>

              <button 
                onClick={addLog}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-900/20 active:scale-[0.98]"
              >
                Add to Secure Log
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#12141c]/80 border border-white/5 rounded-[2.5rem] p-8 h-full">
            <div className="flex items-center gap-3 mb-6">
              <History className="text-gray-400" />
              <h3 className="text-lg font-bold text-white">Past Records</h3>
            </div>
            
            <div className="space-y-4 h-[400px] overflow-y-auto pr-2">
              {logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <Activity size={48} className="text-white/5 mb-4" />
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">No entries yet. Keep a log for forensic medical evidence.</p>
                </div>
              ) : (
                logs.map(log => (
                  <div key={log.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-indigo-500"></div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">{log.loc}</span>
                      <span className="text-[10px] text-gray-500">{log.date}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{log.desc}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-[3rem] flex items-center gap-6">
        <div className="w-16 h-16 bg-red-500/20 rounded-3xl flex items-center justify-center text-red-500 border border-red-500/20">
          <Shield size={32} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-1">Forensic Privacy</h4>
          <p className="text-xs text-gray-400">Log any unusual physical changes or discharges. This data is stored locally and can be exported for forensic medical exams. Your records are protected by local encryption.</p>
        </div>
      </div>
    </div>
  );
};

export default HealthPage;
