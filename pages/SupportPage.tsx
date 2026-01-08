
import React from 'react';
import { DOCTORS } from '../constants';
import { Heart, Users, Calendar, ShieldCheck, Star, Phone, MessageCircle } from 'lucide-react';

const SupportPage: React.FC = () => {
  const handleBook = (name: string) => {
    alert(`VIRTUAL SESSION INITIATED: Connecting with ${name}. Doctors are available for virtual calls on alternating days (Mon-Wed-Fri for Dr. Tiyasa, Tue-Thu-Sat for Dr. Urjita).`);
    window.location.href = "tel:+91XXXXXXXXXX";
  };

  const handleJoinCircle = (group: string) => {
    alert(`JOINED CIRCLE: You are now a member of the "${group}". Your privacy is protected. Check Penny (Assistant) for group updates.`);
  };

  return (
    <div className="space-y-10 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">Psychologist Center</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Expert lead recovery & virtual healing</p>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 px-6 py-3 rounded-[2rem] flex items-center gap-3">
          <ShieldCheck size={20} className="text-indigo-500" />
          <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Confidential Connection</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {DOCTORS.map((doc, idx) => (
          <div key={idx} className="bg-white dark:bg-[#12141c]/80 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-[3.5rem] p-8 md:p-10 shadow-2xl flex flex-col h-full group hover:shadow-indigo-500/10 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
              <Star size={140} className="text-indigo-500" />
            </div>
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:space-y-0 md:flex-row md:gap-8 mb-8">
              <div className="relative shrink-0">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-36 h-36 rounded-[3rem] object-cover border-4 border-indigo-500/20 shadow-2xl transition-transform group-hover:scale-105" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=4f46e5&color=fff&size=200`;
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-[#12141c]"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">{doc.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4">{doc.specialty}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="bg-gray-100 dark:bg-white/5 px-4 py-1.5 rounded-full text-[9px] font-black text-gray-500 dark:text-gray-400 uppercase border border-black/5">{doc.experience}</span>
                  <span className="bg-indigo-500/5 dark:bg-indigo-500/10 px-4 py-1.5 rounded-full text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase border border-indigo-500/10">Available</span>
                </div>
              </div>
            </div>

            <p className="flex-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic mb-8 p-6 bg-gray-50 dark:bg-black/20 rounded-[2.5rem] border border-black/5">
              "{doc.bio}"
            </p>

            <button 
              onClick={() => handleBook(doc.name)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-[2rem] flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-2xl shadow-indigo-900/40 uppercase tracking-[0.2em] text-[10px]"
            >
              <Phone size={18} />
              Start Virtual Call Now
            </button>
          </div>
        ))}
      </div>

      <section className="bg-white dark:bg-[#1a1c23] border border-black/5 dark:border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Users size={200} className="text-indigo-500" />
        </div>
        <div className="relative z-10">
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter uppercase">Peer Support Circles</h3>
          <p className="text-gray-500 font-medium text-sm mb-10 max-w-xl">Safe spaces for collective healing. Join a circle of warriors who understand your journey.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Art Therapy Network', 'Daily Empowerment', 'Legal & Justice Circle', 'Warrior Self Defense'].map((group, i) => (
              <button 
                key={i} 
                onClick={() => handleJoinCircle(group)}
                className="bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-indigo-600 hover:text-indigo-600 dark:hover:text-white border border-black/5 dark:border-white/10 px-8 py-6 rounded-[2rem] transition-all flex items-center justify-between group/item"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500 group-hover/item:bg-white/20 group-hover/item:text-white">
                    <Users size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">{group}</span>
                </div>
                <MessageCircle size={20} className="opacity-0 group-hover/item:opacity-100 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
