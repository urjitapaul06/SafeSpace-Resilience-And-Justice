
import React from 'react';
import { AlertCircle, Shield, Scissors, Trash2, ShowerHead, FileText, Info } from 'lucide-react';

const AwarenessPage: React.FC = () => {
  const EVIDENCE_TIPS = [
    {
      icon: <ShowerHead size={32} className="text-red-500" />,
      title: "DO NOT SHOWER",
      description: "Avoid bathing, douching, or washing any part of your body. This preserves DNA and trace evidence for forensic examination."
    },
    {
      icon: <Scissors size={32} className="text-blue-500" />,
      title: "HAIR & NAILS",
      description: "Do not comb your hair or clip your nails. If the perpetrator left DNA under your nails or on your hair, forensic kits can collect it."
    },
    {
      icon: <Trash2 size={32} className="text-orange-500" />,
      title: "CLOTHES IN PAPER",
      description: "If you change clothes, place everything worn during the incident in a clean paper bag. Never use plastic bags as moisture destroys DNA."
    },
    {
      icon: <FileText size={32} className="text-indigo-500" />,
      title: "DOCUMENT EVERYTHING",
      description: "Write down details of the incident while fresh—time, location, physical descriptions, or unique marks on the perpetrator."
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Survivor Awareness</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">Crucial steps for justice and evidence preservation</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EVIDENCE_TIPS.map((tip, i) => (
          <div key={i} className="bg-white dark:bg-[#12141c]/80 backdrop-blur-xl p-8 rounded-[3rem] border border-black/5 dark:border-white/5 shadow-xl hover:scale-[1.02] transition-transform">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-6 shadow-inner border border-black/5 dark:border-white/5">
              {tip.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-tighter">{tip.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{tip.description}</p>
          </div>
        ))}
      </div>

      <section className="bg-indigo-600 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
          <Shield size={240} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">Your Legal Rights</h3>
          <ul className="space-y-4">
            {[
              "Zero FIR: File a complaint at any police station regardless of where the incident happened.",
              "Female Officer: You have the right to have your statement recorded by a female police officer.",
              "Free Medical Aid: Government hospitals are legally bound to provide immediate free first aid or medical treatment.",
              "Privacy: Your identity and the details of the case must be kept confidential by law."
            ].map((right, i) => (
              <li key={i} className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">{i+1}</div>
                <p className="text-sm font-bold opacity-90 leading-relaxed">{right}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="p-8 bg-white dark:bg-[#1a1c23] border border-black/5 dark:border-white/5 rounded-[3rem] flex items-center gap-6">
        <div className="w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 rounded-3xl flex items-center justify-center text-blue-500 border border-blue-500/20">
          <Info size={32} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 uppercase tracking-tighter">Seek Professional Advice</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium italic">"Justice is a journey. We are here to provide the tools, but please consult with our verified legal and medical team for personalized assistance."</p>
        </div>
      </div>
    </div>
  );
};

export default AwarenessPage;
