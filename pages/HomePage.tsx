
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { ShieldAlert, Mic, User, MessageSquare, Send, StopCircle, UserCheck, UserX } from 'lucide-react';

interface Props { 
  user: UserProfile; 
  onShareLocation?: () => void;
}

const HomePage: React.FC<Props> = ({ user, onShareLocation }) => {
  const [complaint, setComplaint] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

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
        setComplaint(prev => prev + ' ' + transcript);
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

  const handleSOS = () => {
    alert("CRITICAL SOS: Authorities notified. Location broadcast to family and peers.");
    window.location.href = "tel:100";
  };

  const handleSubmitComplaint = () => {
    if (!complaint.trim()) return alert("Please describe the incident.");
    alert(`COMPLAINT SUBMITTED: ${isAnonymous ? "Anonymously" : "As " + user.name}. Logged for forensic use.`);
    setComplaint('');
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SOS BUTTON */}
        <div className="lg:col-span-8">
          <div 
            onClick={handleSOS}
            className="bg-gradient-to-br from-red-600 to-orange-600 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 h-full relative overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl animate-emergency cursor-pointer group hover:scale-[1.01] transition-transform min-h-[300px]"
          >
            <div className="absolute top-0 right-0 p-6 md:p-12 opacity-10 pointer-events-none">
              <ShieldAlert size={180} className="md:w-[280px] md:h-[280px]" />
            </div>
            <div className="p-6 md:p-8 rounded-full bg-white/20 backdrop-blur-xl mb-4 md:mb-6 group-hover:bg-white/30 transition-colors">
              <ShieldAlert size={48} className="md:w-20 md:h-20 text-white" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter">SOS</h2>
            <p className="text-sm md:text-xl font-bold text-white/90 uppercase tracking-[0.2em] md:tracking-[0.3em]">Trigger Lifeline</p>
          </div>
        </div>

        {/* STATUS PANEL */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-[#12141c]/80 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-8 h-full shadow-lg dark:shadow-none">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.5rem] bg-indigo-500/10 flex items-center justify-center text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
                <User size={28} className="md:w-8 md:h-8" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white tracking-tighter">Identity Status</h3>
                <p className="text-[9px] md:text-[10px] text-green-600 dark:text-green-500 font-black uppercase tracking-widest">Secured Connection</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Registered User', value: user.name },
                { label: 'Assigned Guardian', value: user.guardianName || 'Not Set' },
                { label: 'Assigned Peer', value: user.peerName || 'Not Set' }
              ].map(field => (
                <div key={field.label} className="p-3 md:p-4 bg-gray-50 dark:bg-white/5 rounded-xl md:rounded-2xl border border-black/5 dark:border-white/5">
                  <p className="text-[8px] md:text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">{field.label}</p>
                  <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-white truncate">{field.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* COMPLAINT SECTION */}
      <section className="bg-white dark:bg-[#12141c]/90 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 border border-black/5 dark:border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 md:p-4 bg-red-500/10 rounded-xl md:rounded-2xl text-red-600">
              <MessageSquare size={24} className="md:w-7 md:h-7" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Forensic Reporting</h3>
              <p className="text-[10px] md:text-xs text-gray-500 font-medium">Securely record incidents for legal and protection use.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`flex items-center gap-2 px-5 md:px-6 py-2 md:py-3 rounded-full border transition-all font-black text-[9px] md:text-[10px] uppercase tracking-widest w-full md:w-auto justify-center ${
              isAnonymous 
                ? 'bg-red-500 border-red-500 text-white shadow-lg' 
                : 'bg-white dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-400'
            }`}
          >
            {isAnonymous ? <UserX size={14}/> : <UserCheck size={14}/>}
            {isAnonymous ? "Anonymous Mode" : "Public Reporting"}
          </button>
        </div>

        <div className="relative group">
          <textarea 
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Type your experience here or use the mic to speak..."
            className="w-full h-40 md:h-48 bg-gray-50 dark:bg-black/40 border-2 border-transparent focus:border-indigo-500/30 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 text-sm font-medium outline-none transition-all dark:text-white placeholder:text-gray-400 resize-none shadow-inner"
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              onClick={toggleRecording}
              className={`p-3 md:p-4 rounded-full shadow-xl transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white dark:bg-[#1a1c23] text-indigo-600 hover:scale-110'}`}
            >
              {isRecording ? <StopCircle size={20} className="md:w-6 md:h-6" /> : <Mic size={20} className="md:w-6 md:h-6" />}
            </button>
          </div>
        </div>

        <button 
          onClick={handleSubmitComplaint}
          className="w-full mt-4 md:mt-6 py-4 md:py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <Send size={18} className="md:w-5 md:h-5" /> Submit Secured Report
        </button>
      </section>
    </div>
  );
};

export default HomePage;
