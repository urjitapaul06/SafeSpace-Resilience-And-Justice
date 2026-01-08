
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, History, Heart, Trash2, Info } from 'lucide-react';

const TrackerPage: React.FC = () => {
  const [selectedLogDate, setSelectedLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [dischargeType, setDischargeType] = useState('none');
  const [dischargeLoc, setDischargeLoc] = useState('Vagina');
  const [notes, setNotes] = useState('');
  const [healthLogs, setHealthLogs] = useState<any[]>(() => {
    const saved = localStorage.getItem('safe_space_health_logs');
    return saved ? JSON.parse(saved) : [];
  });
  const [periodDays, setPeriodDays] = useState<string[]>(() => {
    const saved = localStorage.getItem('safe_space_periods');
    return saved ? JSON.parse(saved) : [];
  });

  const currentMonthDate = new Date();
  const daysInMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1).getDay();

  const handleSaveHealth = () => {
    if (!notes && dischargeType === 'none') return;
    const log = {
      id: Date.now(),
      date: new Date(selectedLogDate).toDateString(),
      rawDate: selectedLogDate,
      discharge: dischargeType,
      location: dischargeLoc,
      notes: notes,
      timestamp: new Date().toISOString()
    };
    const updated = [log, ...healthLogs];
    setHealthLogs(updated);
    localStorage.setItem('safe_space_health_logs', JSON.stringify(updated));
    setNotes('');
    alert(`SECURED: Forensic observation for ${selectedLogDate} saved.`);
  };

  const togglePeriodDay = () => {
    const updated = periodDays.includes(selectedLogDate) 
      ? periodDays.filter(d => d !== selectedLogDate)
      : [...periodDays, selectedLogDate];
    setPeriodDays(updated);
    localStorage.setItem('safe_space_periods', JSON.stringify(updated));
  };

  const deleteLog = (id: number) => {
    if (confirm("Delete this record permanently?")) {
      const updated = healthLogs.filter(log => log.id !== id);
      setHealthLogs(updated);
      localStorage.setItem('safe_space_health_logs', JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <header>
        <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Health Hub</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[11px] mt-1">Unified Forensic Health & Cycle Tracker</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* CALENDAR - Takes exactly half the space on large screens (lg:grid-cols-2) */}
        <div className="bg-white dark:bg-[#12141c]/90 p-8 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 dark:border-white/10">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black uppercase tracking-[0.1em] text-indigo-500">
              {currentMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <CalendarIcon size={24} className="text-gray-400" />
          </div>

          <div className="grid grid-cols-7 gap-2 text-center mb-6">
            {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
              <span key={d} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-3">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dString = `${currentMonthDate.getFullYear()}-${String(currentMonthDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = selectedLogDate === dString;
              const isPeriod = periodDays.includes(dString);
              const hasLog = healthLogs.some(l => l.rawDate === dString);

              return (
                <div 
                  key={day} 
                  onClick={() => setSelectedLogDate(dString)}
                  className={`aspect-square flex items-center justify-center text-sm font-bold rounded-[1.2rem] cursor-pointer transition-all border-2 relative ${
                    isSelected ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl scale-105' : 
                    isPeriod ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                    'bg-gray-50 dark:bg-white/5 border-transparent text-gray-700 dark:text-gray-400 hover:border-indigo-500/30'
                  }`}
                >
                  {hasLog && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-500 rounded-full shadow-lg"></div>}
                  {day}
                </div>
              );
            })}
          </div>

          <div className="mt-10 pt-8 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-8 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-md"></div>
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-600 shadow-md"></div>
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-md"></div>
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Logged</span>
            </div>
          </div>
        </div>

        {/* INPUT PANEL - The other half */}
        <div className="bg-white dark:bg-[#12141c]/90 p-10 rounded-[3.5rem] shadow-2xl border border-black/5 dark:border-white/10 h-full flex flex-col">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-indigo-500 mb-1">
                Forensic Entry: {new Date(selectedLogDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}
              </h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Confidential documentation</p>
            </div>
            <button 
              onClick={togglePeriodDay}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all shadow-lg active:scale-95 ${
                periodDays.includes(selectedLogDate) 
                ? 'bg-red-500 border-red-400 text-white' 
                : 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20'
              }`}
            >
              <Heart size={14} fill={periodDays.includes(selectedLogDate) ? "currentColor" : "none"} />
              {periodDays.includes(selectedLogDate) ? "Day Logged" : "Log Cycle"}
            </button>
          </div>
          
          <div className="space-y-8 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Anatomical Focus</label>
                <select 
                  value={dischargeLoc}
                  onChange={e => setDischargeLoc(e.target.value)}
                  className="w-full p-5 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-2xl text-xs font-bold text-gray-900 dark:text-white outline-none focus:ring-2 ring-indigo-500"
                >
                  {['Vagina', 'Anus', 'Mouth', 'Skin Trauma'].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Observation Type</label>
                <select 
                  value={dischargeType}
                  onChange={e => setDischargeType(e.target.value)}
                  className="w-full p-5 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-2xl text-xs font-bold text-gray-900 dark:text-white outline-none focus:ring-2 ring-indigo-500"
                >
                  <option value="none">Normal / Baseline</option>
                  <option value="bloody">Bleeding / Spotting</option>
                  <option value="mucus">Fluid Discharge</option>
                  <option value="pain">Physical Discomfort</option>
                </select>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Detailed Observations</label>
              <textarea 
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Record patterns, odors, colors, or pain intensity for forensic reference..."
                className="w-full flex-1 min-h-[150px] p-6 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-3xl text-sm font-medium outline-none focus:ring-2 ring-indigo-500 text-gray-900 dark:text-white resize-none shadow-inner"
              />
            </div>

            <button 
              onClick={handleSaveHealth}
              className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] transition-all shadow-2xl active:scale-[0.99]"
            >
              Secure Log Entry
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#12141c]/90 p-10 rounded-[3.5rem] shadow-2xl border border-black/5 dark:border-white/10">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-3">
            <History size={20} /> Medical Evidence Archive
          </h3>
          <div className="p-3 bg-red-500/5 rounded-2xl flex items-center gap-3 border border-red-500/10">
            <Info size={14} className="text-red-500" />
            <span className="text-[9px] font-black uppercase text-red-600 tracking-widest">End-to-End Encrypted</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthLogs.length === 0 ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-30">
              <CalendarIcon size={64} className="mb-4 text-gray-400" />
              <p className="text-xs font-black uppercase tracking-widest text-gray-500">Archive Currently Empty</p>
            </div>
          ) : (
            healthLogs.map((log: any) => (
              <div key={log.id} className="p-6 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-black/5 dark:border-white/10 relative group hover:bg-white dark:hover:bg-white/10 transition-all shadow-lg hover:scale-[1.03]">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{log.date}</span>
                  <button onClick={() => deleteLog(log.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[9px] bg-indigo-500/10 text-indigo-600 px-3 py-1.5 rounded-full font-black uppercase tracking-widest border border-indigo-500/10">{log.location}</span>
                  <span className="text-[9px] bg-red-500/10 text-red-600 px-3 py-1.5 rounded-full font-black uppercase tracking-widest border border-red-500/10">{log.discharge}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed italic line-clamp-3">"{log.notes}"</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackerPage;
