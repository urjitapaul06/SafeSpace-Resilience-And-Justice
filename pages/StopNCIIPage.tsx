
import React from 'react';
import { Shield, Globe, Lock, ExternalLink, Info } from 'lucide-react';

const StopNCIIPage: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      <header>
        <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">StopNCII Integration</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Prevent the spread of non-consensual intimate images</p>
      </header>

      <section className="bg-gradient-to-br from-indigo-700 to-blue-900 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Globe size={240} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Protect Your Privacy</h3>
          <p className="text-lg font-medium opacity-90 leading-relaxed mb-8">
            StopNCII.org is a free service provided by the UK Revenge Porn Helpline and Meta to help survivors stop the non-consensual sharing of intimate images (NCII) online.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4 p-5 bg-white/10 rounded-3xl border border-white/20">
              <Lock className="text-blue-300 shrink-0" size={24} />
              <div>
                <p className="font-bold text-sm mb-1 uppercase tracking-wider">Hashes, Not Images</p>
                <p className="text-[10px] opacity-80 leading-relaxed font-medium">Your images never leave your device. The tool creates a digital fingerprint (hash) to identify and block your content across major social platforms.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-white/10 rounded-3xl border border-white/20">
              <Shield className="text-green-300 shrink-0" size={24} />
              <div>
                <p className="font-bold text-sm mb-1 uppercase tracking-wider">Global Protection</p>
                <p className="text-[10px] opacity-80 leading-relaxed font-medium">Participating platforms include Facebook, Instagram, TikTok, OnlyFans, and Reddit.</p>
              </div>
            </div>
          </div>
          <a 
            href="https://stopncii.org.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-900 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all"
          >
            Go to StopNCII.org.in <ExternalLink size={18} />
          </a>
        </div>
      </section>

      <div className="p-8 bg-white dark:bg-[#12141c] border border-black/5 dark:border-white/10 rounded-[3rem] flex items-center gap-6">
        <div className="w-16 h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-500 shrink-0">
          <Info size={32} />
        </div>
        <div>
          <h4 className="text-xl font-black text-gray-900 dark:text-white mb-1 uppercase tracking-tighter">Why use this?</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic">
            "If you are worried that intimate images of you might be shared without your consent, this tool acts as a proactive shield. It is the most effective way to protect your digital identity across the global internet."
          </p>
        </div>
      </div>
    </div>
  );
};

export default StopNCIIPage;
