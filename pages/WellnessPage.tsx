
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Activity, Wind, Heart, Star, PlayCircle, Trophy, CheckCircle, Smile, Frown, Meh, Sparkles, Brain, Quote as QuoteIcon } from 'lucide-react';

interface Props { 
  user: UserProfile; 
  onUpdatePoints: (user: UserProfile) => void; 
}

const QUOTES = [
  "Healing is not linear; give yourself grace.",
  "Your resilience is your greatest strength.",
  "In the middle of every difficulty lies opportunity.",
  "Softness is not weakness. It takes courage to stay delicate."
];

const WellnessPage: React.FC<Props> = ({ user, onUpdatePoints }) => {
  const [breathePhase, setBreathePhase] = useState<'In' | 'Hold' | 'Out' | 'Pause'>('In');
  const [breatheProgress, setBreatheProgress] = useState(0);
  const [mood, setMood] = useState<string | null>(null);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBreatheProgress(prev => {
        if (prev >= 100) {
          setBreathePhase(curr => {
            if (curr === 'In') return 'Hold';
            if (curr === 'Hold') return 'Out';
            if (curr === 'Out') return 'Pause';
            return 'In';
          });
          return 0;
        }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIdx(prev => (prev + 1) % QUOTES.length);
    }, 5000);
    return () => clearInterval(quoteInterval);
  }, []);

  const completeSession = (title: string, pointAward: number) => {
    alert(`RECOVERY BOOST: "${title}". +${pointAward} Resilience Points earned! ✨`);
    const updatedUser = {
      ...user,
      points: (user.points || 0) + pointAward,
      badges: [...(user.badges || [])]
    };
    if (updatedUser.points >= 500 && !updatedUser.badges.includes('Wellness Warrior')) {
      updatedUser.badges.push('Wellness Warrior');
    }
    onUpdatePoints(updatedUser);
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Wellness Sanctuary</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2 flex items-center gap-2">
            <Sparkles size={14} className="text-yellow-500"/> Nervous system regulation & healing
          </p>
        </div>
        <div className="flex items-center gap-6 bg-white/80 dark:bg-[#12141c]/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-2xl">
          <div className="bg-yellow-400/20 p-3 rounded-2xl">
            <Trophy className="text-yellow-500" size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Resilience Score</p>
            <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{user.points || 0}</p>
          </div>
        </div>
      </header>

      {/* BREATHING & QUOTES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <section className="lg:col-span-8 bg-gradient-to-br from-indigo-600 to-indigo-800 p-12 rounded-[4rem] shadow-[0_30px_60px_-15px_rgba(79,70,229,0.4)] text-center relative overflow-hidden flex flex-col justify-center border border-white/10">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none rotate-12">
            <Brain size={300} className="text-white" />
          </div>
          <div className="relative z-10">
            <Wind className="mx-auto text-white/90 mb-8" size={64} />
            <h3 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">Box Breathing</h3>
            <p className="text-sm font-bold text-white/70 mb-12 uppercase tracking-widest">Release tension. Reclaim focus.</p>
            
            <div className="relative w-72 h-72 mx-auto mb-12">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="144" cy="144" r="130" stroke="rgba(255,255,255,0.1)" strokeWidth="16" fill="transparent" />
                <circle cx="144" cy="144" r="130" stroke="white" strokeWidth="16" fill="transparent" strokeDasharray="816" strokeDashoffset={816 - (816 * breatheProgress / 100)} className="transition-all duration-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white tracking-[0.2em] uppercase animate-pulse">{breathePhase}</span>
              </div>
            </div>
            
            <button 
              onClick={() => completeSession("Breathing Practice", 10)}
              className="px-12 py-5 bg-white text-indigo-700 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Session Complete (+10 pts)
            </button>
          </div>
        </section>

        <section className="lg:col-span-4 space-y-8 flex flex-col">
          <div className="bg-white dark:bg-[#12141c] p-10 rounded-[3.5rem] border border-black/5 dark:border-white/10 shadow-2xl flex-1 flex flex-col justify-center relative overflow-hidden group">
            <QuoteIcon size={80} className="absolute -top-4 -left-4 text-indigo-500/5 rotate-12" />
            <div className="relative z-10 text-center">
              <p className="text-xl font-black italic text-gray-900 dark:text-white mb-4 leading-relaxed tracking-tight transition-opacity duration-500">
                "{QUOTES[quoteIdx]}"
              </p>
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Resilience Guide</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#12141c] p-10 rounded-[3.5rem] border border-black/5 dark:border-white/10 shadow-2xl">
            <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-6 flex items-center gap-2">
              <Smile size={16} className="text-indigo-500" /> Daily Mood Check
            </h4>
            <div className="flex justify-between items-center px-2">
              {[
                { label: 'Low', icon: <Frown className="w-10 h-10" />, color: 'text-red-500' },
                { label: 'Okay', icon: <Meh className="w-10 h-10" />, color: 'text-yellow-500' },
                { label: 'Better', icon: <Smile className="w-10 h-10" />, color: 'text-green-500' }
              ].map(m => (
                <button 
                  key={m.label}
                  onClick={() => { setMood(m.label); completeSession(`Mood Check: ${m.label}`, 5); }}
                  className={`flex flex-col items-center gap-3 transition-all transform hover:scale-110 ${mood === m.label ? m.color + ' scale-110 drop-shadow-lg' : 'text-gray-300 dark:text-gray-700'}`}
                >
                  {m.icon}
                  <span className="text-[8px] font-black uppercase tracking-widest">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* PROGRESS & BADGES */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white dark:bg-[#12141c] p-12 rounded-[4rem] border border-black/5 dark:border-white/10 shadow-2xl">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-10 flex items-center gap-3">
            <Activity size={24} className="text-pink-500"/> Healing Milestones
          </h3>
          <div className="space-y-10">
            {[
              { label: 'Consistency', val: '75%', color: 'bg-indigo-500', shadow: 'shadow-indigo-500/40' },
              { label: 'Trauma Integration', val: '40%', color: 'bg-pink-500', shadow: 'shadow-pink-500/40' },
              { label: 'Self Compassion', val: '90%', color: 'bg-green-500', shadow: 'shadow-green-500/40' }
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-3">
                  <span className="text-gray-500">{m.label}</span>
                  <span className="text-gray-900 dark:text-white">{m.val}</span>
                </div>
                <div className="w-full h-4 bg-gray-50 dark:bg-white/5 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                  <div className={`h-full ${m.color} ${m.shadow} rounded-full transition-all duration-1000 shadow-xl`} style={{ width: m.val }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white dark:bg-[#12141c] p-12 rounded-[4rem] border border-black/5 dark:border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <Trophy size={180} />
          </div>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-10 flex items-center gap-3 relative z-10">
            <Star size={24} className="text-yellow-500"/> Achievements
          </h3>
          <div className="flex flex-wrap gap-4 relative z-10">
            {user.badges?.map(badge => (
              <div key={badge} className="flex items-center gap-3 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 px-6 py-4 rounded-3xl border border-yellow-400/20 text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
                <Trophy size={18} /> {badge}
              </div>
            ))}
            {(!user.badges || user.badges.length === 0) && (
              <div className="w-full p-10 text-center border-2 border-dashed border-gray-100 dark:border-white/5 rounded-[2.5rem] opacity-40">
                <p className="text-xs font-black uppercase tracking-widest">Complete sessions to earn badges</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EXERCISES */}
      <section>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-widest flex items-center gap-4">
          <Brain size={32} className="text-indigo-500" /> Reflection & Mindfulness
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { title: "Trauma-Sensitive Yoga Flow", points: 50, dur: "15 MIN", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" },
            { title: "Vagal Nerve Regulation", points: 30, dur: "10 MIN", img: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800" }
          ].map((ex, i) => (
            <div key={i} className="bg-white dark:bg-[#12141c] rounded-[4rem] overflow-hidden border border-black/5 dark:border-white/10 group shadow-2xl hover:shadow-indigo-500/20 transition-all">
              <div className="relative h-64 overflow-hidden">
                <img src={ex.img} alt={ex.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-xl px-5 py-2 rounded-full border border-white/20 text-[10px] font-black text-white uppercase tracking-[0.2em]">{ex.dur}</div>
              </div>
              <div className="p-10">
                <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">{ex.title}</h4>
                <button 
                  onClick={() => completeSession(ex.title, ex.points)}
                  className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-indigo-900/40 transform active:scale-95 transition-all"
                >
                  <PlayCircle size={24} /> Begin Session (+{ex.points} pts)
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WellnessPage;
