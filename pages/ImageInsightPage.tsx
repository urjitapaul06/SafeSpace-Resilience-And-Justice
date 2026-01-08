
import React, { useState, useRef } from 'react';
import { analyzeTraumaDump } from '../services/geminiService';
import { Image as ImageIcon, Upload, Loader2, Info, CheckCircle2, ShieldAlert, Sparkles, FileText, ChevronRight } from 'lucide-react';

const ImageInsightPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    // Simulating forensic image analysis (would use Gemini multimodal in prod)
    setTimeout(() => {
      setResult({
        findings: "Visual documentation of epidermal trauma detected. Pattern consistent with localized pressure.",
        recommendations: [
          "Preserve this image for forensic medical review.",
          "Do not wash the area until a medical kit is used.",
          "Note the exact time this photo was taken."
        ]
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="space-y-10 pb-12">
      <header>
        <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">Image Insight</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Forensic evidence capture and AI-assisted documentation</p>
      </header>

      <section className="bg-red-600 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10"><ShieldAlert size={200} /></div>
        <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
          <ImageIcon size={32} /> Evidence Collection Protocol
        </h3>
        <p className="text-sm font-bold opacity-90 leading-relaxed mb-6">
          Taking photos of injuries, torn clothing, or a suspect's unique features is vital for prosecution. 
          Use this tool to securely document findings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-red-200">What to Capture</p>
            <ul className="text-xs space-y-2 font-medium">
              <li>• Bruises, scratches, or bite marks.</li>
              <li>• Torn clothing or physical damage.</li>
              <li>• Suspect sketches or distinguishing marks.</li>
            </ul>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-red-200">Photography Tips</p>
            <ul className="text-xs space-y-2 font-medium">
              <li>• Take photos in natural lighting.</li>
              <li>• Include a scale (e.g., a coin) if possible.</li>
              <li>• Take multiple angles (close-up and wide).</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-[#12141c] p-10 rounded-[3.5rem] shadow-2xl border border-black/5 dark:border-white/10 h-full flex flex-col justify-center text-center">
            <div className="w-24 h-24 bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center text-indigo-500 mx-auto mb-8">
              <ImageIcon size={48} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter uppercase">Upload Evidence</h3>
            <p className="text-xs text-gray-500 mb-10 px-4 leading-relaxed font-medium">
              Securely analyze photos of injuries or evidence. AI identifies forensic markers to assist your medical report.
            </p>
            
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className={`w-full py-6 rounded-[2.2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 ${
                isProcessing ? 'bg-gray-100 text-gray-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isProcessing ? <Loader2 size={24} className="animate-spin" /> : <Upload size={24} />}
              {isProcessing ? "Analyzing..." : "Analyze Image"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {!result && !isProcessing && (
            <div className="h-full min-h-[300px] border-4 border-dashed border-black/5 rounded-[4rem] flex flex-col items-center justify-center text-center p-12 opacity-40">
              <Sparkles size={64} className="mb-4" />
              <p className="text-sm font-black uppercase tracking-widest">Awaiting Evidence</p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><FileText size={100} /></div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><Sparkles size={16}/> Forensic Insight</h4>
                <p className="text-sm font-semibold leading-relaxed opacity-90">{result.findings}</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Next Steps</h4>
                {result.recommendations.map((rec: string, i: number) => (
                  <div key={i} className="bg-white dark:bg-[#12141c] p-5 rounded-3xl border border-black/5 dark:border-white/10 flex items-center justify-between group">
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-bold">{rec}</p>
                    <CheckCircle2 size={18} className="text-green-500" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageInsightPage;
