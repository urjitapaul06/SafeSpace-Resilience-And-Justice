
import React, { useState, useRef } from 'react';
import { analyzeVideoInsights } from '../services/geminiService';
import { PlayCircle, Video, FileText, Sparkles, Upload, Loader2, Info, ChevronRight, CheckCircle2, ShieldAlert, Camera } from 'lucide-react';

const VideoInsightPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ summary: string, flashcards: { title: string, description: string }[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert("File too large. Please select a video under 50MB.");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = (reader.result as string).split(',')[1];
      const analysis = await analyzeVideoInsights(base64Data, file.type);
      
      if (analysis) {
        setResult(analysis);
      } else {
        alert("Failed to analyze video. Please check your API key.");
      }
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-10 pb-12">
      <header>
        <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">Video Insight</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">AI-Driven evidence preservation & healing analysis</p>
      </header>

      {/* SURVIVOR GUIDE SECTION */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-900 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-10">
          <Camera size={300} />
        </div>
        <div className="relative z-10">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
            <ShieldAlert size={32} className="text-yellow-400" /> Survivor Video Protocol
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">Why record a video?</h4>
              <p className="text-sm font-medium leading-relaxed opacity-90">
                Videos serve as two powerful tools: 
                <br/><strong className="text-white">1. Forensic Documentation:</strong> A visual/vocal record of injuries and timeline details that can be summarized by AI for legal aid.
                <br/><strong className="text-white">2. Emotional Release:</strong> A private "witness" that listens when you aren't ready to talk to a person.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">What should you do in the video?</h4>
              <ul className="text-xs font-bold space-y-3">
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">1</div>
                  <span>Recount the timeline of events clearly and slowly.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">2</div>
                  <span>Describe the perpetrator's physical traits, unique marks, or speech.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">3</div>
                  <span>(If safe) Show visible bruises or marks to provide visual context for the AI analysis.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">4</div>
                  <span>Speak about your feelings—anger, grief, or fear. Release it.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-[#12141c] p-10 rounded-[3.5rem] shadow-2xl border border-black/5 dark:border-white/10 h-full flex flex-col justify-center text-center">
            <div className="w-20 h-20 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-[2rem] flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto mb-8">
              <Video size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">Analyze Recovery Media</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-10 px-4">
              Gemini will pinpoint key moments, emotional shifts, and generate actionable recovery flashcards.
            </p>
            
            <input type="file" accept="video/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />

            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className={`w-full py-6 rounded-[2.2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 ${
                isProcessing ? 'bg-gray-100 text-gray-400 dark:bg-white/5 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]'
              }`}
            >
              {isProcessing ? <Loader2 size={24} className="animate-spin" /> : <Upload size={24} />}
              {isProcessing ? "Analyzing..." : "Analyze Private Video"}
            </button>
            <p className="mt-4 text-[9px] font-black uppercase tracking-widest text-gray-400 italic">No video data leaves your control. We only send encrypted snippets for analysis.</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          {!result && !isProcessing && (
            <div className="h-full min-h-[400px] border-4 border-dashed border-black/5 dark:border-white/5 rounded-[4rem] flex flex-col items-center justify-center text-center p-12 opacity-40">
              <Sparkles size={64} className="mb-4" />
              <p className="text-sm font-black uppercase tracking-widest">Awaiting Video Analysis</p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><FileText size={120} /></div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Sparkles size={16}/> Extracted Insights
                </h4>
                <p className="text-sm font-semibold leading-relaxed opacity-90">{result.summary}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Healing Flashcards</h4>
                {result.flashcards.map((card, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#12141c] p-6 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-xl flex items-center justify-between group">
                    <div className="flex-1">
                      <p className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-1">{card.title}</p>
                      <p className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{card.description}</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
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

export default VideoInsightPage;
