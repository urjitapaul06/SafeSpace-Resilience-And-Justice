
import React from 'react';
import { Zap, Shield, Target, AlertTriangle, Info } from 'lucide-react';

const DefensePage: React.FC = () => {
  const HACKS = [
    {
      title: "Vulnerable Points",
      description: "If attacked, aim for eyes, nose, throat, or groin. Use your palm to strike upward at the nose or fingers to poke eyes.",
      icon: <Target className="text-red-500" />
    },
    {
      title: "The Escape Rule",
      description: "If grabbed by the wrist, rotate your hand toward the attacker's thumb—the weakest part of their grip—and pull out.",
      icon: <Shield className="text-blue-500" />
    },
    {
      title: "Voice as a Weapon",
      description: "Do not shout 'Help'—it can sometimes be ignored. Shout 'FIRE' or 'CALL THE POLICE' loudly and firmly.",
      icon: <Zap className="text-yellow-500" />
    },
    {
      title: "Everyday Items",
      description: "Keys, pens, or even a hard-covered book can be used to strike if your safety is threatened.",
      icon: <Info className="text-green-500" />
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h2 className="text-5xl font-black text-gray-950 dark:text-white tracking-tighter">Self Defense Hacks</h2>
        <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest text-xs mt-2">Empowering you with physical safety knowledge</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {HACKS.map((hack, i) => (
          <div key={i} className="bg-white dark:bg-[#12141c]/80 backdrop-blur-xl p-8 rounded-[3rem] border border-black/5 dark:border-white/10 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6 border border-black/5 dark:border-white/5">
              {hack.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-950 dark:text-white mb-2 uppercase tracking-tight">{hack.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-400 font-medium leading-relaxed">{hack.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-red-600 p-10 rounded-[3.5rem] text-white shadow-2xl flex flex-col md:flex-row items-center gap-8">
        <AlertTriangle size={64} className="shrink-0" />
        <div>
          <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Situational Awareness</h3>
          <p className="text-sm opacity-90 leading-relaxed font-semibold">
            The best self-defense is avoiding a confrontation altogether. Always be aware of your surroundings, avoid distractions like phones in isolated areas, and trust your gut instinct. If a situation feels wrong, leave immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DefensePage;
