
import React from 'react';
import { HELPLINES } from '../constants';
import { Phone, Shield, ArrowRight, Info, AlertOctagon, Heart, LifeBuoy } from 'lucide-react';

const HelplinesPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <header className="text-center md:text-left">
        <h2 className="text-5xl font-black text-gray-950 dark:text-white tracking-tighter">Emergency Lifelines</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Immediate government assistance and medical support</p>
      </header>

      {/* SIGNIFICANT HELPLINE PANEL */}
      <section className="bg-red-600 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <AlertOctagon size={300} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-24 h-24 bg-white/20 rounded-[2.5rem] flex items-center justify-center text-white shrink-0 border border-white/30 backdrop-blur-xl">
            <Shield size={48} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Primary Police Response</h3>
            <p className="text-lg opacity-90 font-bold mb-6 italic">Dial 100 for immediate physical protection and crime reporting.</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="tel:100" className="px-10 py-5 bg-white text-red-600 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center gap-2">
                <Phone size={18} /> Call 100 Now
              </a>
              <div className="px-8 py-5 bg-red-700/50 rounded-[2rem] border border-white/20 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">Priority Dispatch Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HELPLINES.map((h, i) => (
          <div key={i} className="bg-white dark:bg-[#12141c]/80 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-[3rem] p-8 group hover:bg-gray-50 dark:hover:bg-[#1a1c23] transition-all flex flex-col items-center text-center shadow-xl">
            <div className="w-20 h-20 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-inner">
              {h.icon}
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1 uppercase tracking-tighter">{h.name}</h3>
            <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-8 tracking-tighter">{h.number}</p>
            <a 
              href={`tel:${h.number}`}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-2xl shadow-indigo-900/30 text-xs uppercase tracking-widest"
            >
              <Phone size={20} /> Call {h.number}
            </a>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-10 bg-indigo-500/10 border border-indigo-500/20 rounded-[3.5rem] flex flex-col items-center text-center group">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-3xl flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform">
            <LifeBuoy size={32} />
          </div>
          <h4 className="text-2xl font-black text-gray-950 dark:text-white mb-4 uppercase tracking-tighter">Victim Support Network</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium mb-8">
            Access anonymous counseling and legal aid from certified NGOs. We connect you with verified partners who specialize in survivor rehabilitation.
          </p>
          <button className="px-10 py-4 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl">
            Find Local Partners
          </button>
        </div>

        <div className="p-10 bg-white dark:bg-[#1a1c23] border border-black/5 dark:border-white/10 rounded-[3.5rem] flex flex-col items-center text-center group">
          <div className="w-16 h-16 bg-pink-500/10 rounded-3xl flex items-center justify-center text-pink-500 mb-6 border border-pink-500/20 group-hover:rotate-12 transition-transform">
            <Heart size={32} />
          </div>
          <h4 className="text-2xl font-black text-gray-950 dark:text-white mb-4 uppercase tracking-tighter">Your Legal Shield</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium mb-8">
            You are entitled to a Zero FIR, Free Medical Aid, and Privacy. Our legal awareness section helps you understand how to navigate the justice system safely.
          </p>
          <button className="px-10 py-4 border border-black/10 dark:border-white/10 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-black/5 transition-all dark:text-white">
            View Legal Rights
          </button>
        </div>
      </div>

      <div className="p-8 bg-gray-950 text-white rounded-[3rem] flex flex-col md:flex-row gap-8 items-center border border-white/5">
        <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-indigo-400 shrink-0">
          <Info size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-black uppercase tracking-tighter mb-1">Confidentiality Guarantee</h4>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">All helpline interactions initiated through Safe-Space are logged only on your device. We do not store your call history or location data on our servers unless you explicitly share it with emergency contacts.</p>
        </div>
      </div>
    </div>
  );
};

export default HelplinesPage;
