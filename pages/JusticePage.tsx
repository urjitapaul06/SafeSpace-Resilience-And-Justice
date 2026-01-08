
import React, { useState, useEffect } from 'react';
import { Scale, FileText, Shield, Gavel, FileCheck, Info, MessageSquare, ChevronRight, Loader2, Download, AlertCircle, Bookmark } from 'lucide-react';
import { generateJusticeReport } from '../services/geminiService';

const CASE_TEMPLATES = [
  { id: 'physical', label: 'Physical Assault', prompt: 'Context: Severe physical altercation, visible injuries, immediate danger reported.' },
  { id: 'digital', label: 'Digital Harassment', prompt: 'Context: Non-consensual image sharing (NCII), cyber-stalking, digital evidence across platforms.' },
  { id: 'workplace', label: 'Workplace Incident', prompt: 'Context: Harassment within a professional environment, power dynamics, witness accounts mentioned.' },
  { id: 'domestic', label: 'Domestic Abuse', prompt: 'Context: Pattern of control/abuse at home, financial dependence, child safety concerns.' }
];

const JusticePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [traumaLogs, setTraumaLogs] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  useEffect(() => {
    const logs = localStorage.getItem('safe_space_trauma_dump'); 
    if (logs) setTraumaLogs(logs);
  }, []);

  const handleApplyTemplate = (id: string, prompt: string) => {
    setSelectedTemplate(id);
    const contextStr = `\n[CASE CATEGORY: ${prompt}]\n`;
    if (!traumaLogs.includes(contextStr)) {
      setTraumaLogs(prev => prev + contextStr);
    }
  };

  const handleGenerateReport = async () => {
    if (!traumaLogs.trim()) {
      alert("Please provide some testimony or logs in the Dashboard or speak with Penny (Assistant) first.");
      return;
    }
    setLoading(true);
    const result = await generateJusticeReport(traumaLogs);
    if (result) {
      setReport(result);
    } else {
      alert("Failed to generate justice report. Please try again.");
    }
    setLoading(false);
  };

  const handleDownloadReport = () => {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Forensic_Justice_Report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10 pb-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Justice Center</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Legal aid & forensic bridge for prosecution</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-[2rem] flex items-center gap-3">
          <Scale size={20} className="text-red-600" />
          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Punish & Protect</span>
        </div>
      </header>

      <div className="p-6 bg-indigo-600 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-6 shadow-2xl">
        <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center shrink-0 border border-white/20">
          <Info size={32} />
        </div>
        <div>
          <h4 className="text-xl font-black uppercase tracking-tighter mb-1">What is a Police Liaison Report?</h4>
          <p className="text-xs font-bold opacity-90 leading-relaxed">
            Survivors often struggle to recount trauma accurately under stress. This tool uses <strong className="text-indigo-200">Gemini AI</strong> to analyze your private logs and construct a structured legal summary to help police press the strongest charges.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-[#12141c] p-8 md:p-10 rounded-[3.5rem] shadow-2xl border border-black/5 dark:border-white/10 h-full flex flex-col">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter uppercase">Report Builder</h3>
            
            <div className="mb-8">
              <label className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 block">1. Select Case Template (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {CASE_TEMPLATES.map(tmp => (
                  <button 
                    key={tmp.id}
                    onClick={() => handleApplyTemplate(tmp.id, tmp.prompt)}
                    className={`px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                      selectedTemplate === tmp.id 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                      : 'bg-gray-50 dark:bg-white/5 border-black/5 dark:border-white/10 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {tmp.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-8 flex-1 flex flex-col">
              <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 ml-1">2. Testimony Data / Logs</label>
              <textarea 
                value={traumaLogs}
                onChange={(e) => setTraumaLogs(e.target.value)}
                placeholder="Talk to Penny or type details here..."
                className="w-full flex-1 min-h-[200px] p-5 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-3xl text-xs font-medium outline-none focus:ring-2 ring-red-500 shadow-inner resize-none"
              />
            </div>

            <button 
              onClick={handleGenerateReport}
              disabled={loading}
              className="w-full py-6 bg-red-600 hover:bg-red-700 text-white rounded-[2.2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 active:scale-95"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <Scale size={24} />}
              {loading ? "Analyzing Context..." : "Construct Forensic Report"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {!report && !loading && (
            <div className="h-full min-h-[500px] border-4 border-dashed border-black/5 dark:border-white/5 rounded-[4rem] flex flex-col items-center justify-center text-center p-12 opacity-40">
              <AlertCircle size={64} className="mb-4 text-gray-300" />
              <p className="text-sm font-black uppercase tracking-widest text-gray-400">Awaiting Analysis</p>
            </div>
          )}

          {report && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              <div className="bg-white dark:bg-[#12141c] p-10 rounded-[3rem] border border-black/5 dark:border-white/10 shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                  <h4 className="text-xs font-black text-red-600 uppercase tracking-[0.3em] flex items-center gap-2">
                    <FileCheck size={18} /> Structured Case Summary
                  </h4>
                  <button onClick={handleDownloadReport} className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl text-gray-500 hover:text-red-500 transition-colors border border-black/5">
                    <Download size={20} />
                  </button>
                </div>
                
                <div className="prose dark:prose-invert max-w-none text-sm font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                  <p className="mb-8 p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-black/5 italic">"{report.caseSummary}"</p>
                  
                  <div className="space-y-8">
                    <div>
                      <h5 className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-4 flex items-center gap-2">
                        <ChevronRight size={14}/> Forensic Evidence Markers
                      </h5>
                      <div className="grid grid-cols-1 gap-3">
                        {report.forensicHighlights.map((h: string, i: number) => (
                          <div key={i} className="flex gap-4 items-start p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl text-xs border border-indigo-100 dark:border-indigo-900/30">
                            <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">{i+1}</div>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-[10px] font-black uppercase text-red-500 tracking-widest mb-4 flex items-center gap-2">
                         <MessageSquare size={14}/> Recommended Questions for Police
                      </h5>
                      <div className="grid grid-cols-1 gap-3">
                        {report.policeQuestions.map((q: string, i: number) => (
                          <div key={i} className="flex gap-4 items-start p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl text-xs border border-red-100 dark:border-red-900/30">
                            <Info size={16} className="text-red-500 shrink-0 mt-0.5" />
                            <span className="font-bold">{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 bg-gray-950 text-white rounded-[2.5rem] border border-white/10 shadow-2xl">
                       <h5 className="text-[10px] font-black uppercase text-yellow-500 tracking-widest mb-4">Legal Provisions (IPC/BNS Sections)</h5>
                       <div className="flex flex-wrap gap-2">
                          {report.legalProvisions.map((l: string, i: number) => (
                            <span key={i} className="text-[9px] bg-white/10 px-4 py-2 rounded-xl font-black uppercase border border-white/20">{l}</span>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JusticePage;
