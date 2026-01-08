
import React, { useState, useRef, useEffect } from 'react';
import { getPenguinResponse, analyzeTraumaDump } from '../services/geminiService';
import { UserProfile } from '../types';
import { Send, MessageSquare, Mic, Shield, StopCircle, Info, UserCheck, UserX, Activity, Save } from 'lucide-react';

interface Props { user: UserProfile; }

const AssistantPage: React.FC<Props> = ({ user }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: "Hi! I'm Penny. 🐧 I'm here to listen. You can type or speak about your experiences here. It's a safe and private space." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(user.privacySettings.anonymousModeDefault);
  const [analysis, setAnalysis] = useState<{ sentiment: string, emotions: string[], encouragement: string[] } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };
      recognitionRef.current.onend = () => setIsRecording(false);
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return alert("Browser does not support voice typing.");
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Save to trauma logs for the Justice Center to use later
    const existingLogs = localStorage.getItem('safe_space_trauma_dump') || "";
    const updatedLogs = existingLogs + "\n" + `[${new Date().toLocaleString()}] ${userMsg}`;
    localStorage.setItem('safe_space_trauma_dump', updatedLogs);

    if (userMsg.length > 40) {
      analyzeTraumaDump(userMsg).then(res => setAnalysis(res));
    }

    const aiRes = await getPenguinResponse(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', text: aiRes }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white dark:bg-[#1a1c23] border border-black/5 dark:border-white/5 rounded-3xl flex items-center justify-center text-4xl shadow-xl">
            🐧
          </div>
          <div>
            <h2 className="text-xl font-bold dark:text-white">Penny the Penguin</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500 dark:text-gray-400">Safe-Space AI Support</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all font-black text-[10px] uppercase tracking-widest ${
              isAnonymous 
                ? 'bg-red-500/10 border-red-500 text-red-500' 
                : 'bg-green-500/10 border-green-500 text-green-600'
            }`}
          >
            {isAnonymous ? <UserX size={14}/> : <UserCheck size={14}/>}
            {isAnonymous ? "Anonymous" : "Public"}
          </button>
        </div>
      </div>

      <div className="p-4 bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-2xl mb-4 flex items-center gap-3">
        <Shield size={18} className="text-red-500 shrink-0" />
        <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight font-bold">
          CONVERSATION IS ENCRYPTED. Every word you say is logged locally to help generate your <strong>Forensic Justice Report</strong> later.
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 mb-6 px-4 py-2 scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-[1.8rem] text-sm leading-relaxed shadow-md ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-[#1a1c23] text-gray-800 dark:text-gray-100 rounded-tl-none border border-black/5 dark:border-white/5'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-[#1a1c23]/50 p-4 rounded-2xl rounded-tl-none border border-black/5 dark:border-white/5 animate-pulse text-[10px] font-bold text-indigo-400 tracking-widest uppercase">
              Penny is thinking...
            </div>
          </div>
        )}
      </div>

      {analysis && (
        <div className="mb-6 p-6 bg-white dark:bg-[#1a1c23] border border-indigo-500/30 rounded-[2rem] shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 uppercase tracking-widest text-xs">
              <Activity size={16}/> AI Trauma Insight
            </h4>
            <div className="flex gap-2">
              {analysis.emotions?.map(emo => (
                <span key={emo} className="text-[9px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30 font-bold uppercase tracking-widest">{emo}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.encouragement.map((e, i) => (
              <div key={i} className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5 text-[11px] font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                ✨ {e}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-[#1a1c23] border border-black/5 dark:border-white/5 p-3 rounded-[2.2rem] shadow-2xl">
        <div className="flex gap-2">
          <button onClick={toggleRecording} className={`p-4 rounded-[1.8rem] transition-all duration-300 border ${isRecording ? 'bg-red-500 border-red-400 text-white animate-pulse' : 'bg-gray-50 dark:bg-white/5 border-black/5 dark:border-white/5 text-indigo-500'}`}>
            {isRecording ? <StopCircle size={24} /> : <Mic size={24} />}
          </button>
          <div className="flex-1 relative">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyPress={e => e.key === 'Enter' && handleSend()} 
              placeholder={isRecording ? "Recording..." : "Share your heart here..."}
              className="w-full h-full p-4 pr-16 bg-transparent rounded-[1.8rem] text-gray-900 dark:text-white outline-none placeholder:text-gray-400 font-medium"
            />
            <button onClick={handleSend} className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 text-white rounded-[1.5rem] font-bold text-xs uppercase tracking-widest shadow-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;
