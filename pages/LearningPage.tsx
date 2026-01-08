
import React from 'react';
import { MOTIVATIONAL_STORIES } from '../constants';
import { BookOpen, Quote, Shield } from 'lucide-react';

const LearningPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">Resilience Library</h2>
        <p className="text-gray-500">Draw strength from those who fought before you.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {MOTIVATIONAL_STORIES.map(story => (
          <article key={story.id} className="bg-white dark:bg-indigo-900/50 p-8 rounded-[2.5rem] shadow-xl border dark:border-indigo-800 relative">
            <Quote className="absolute top-6 right-8 text-indigo-100 dark:text-indigo-800" size={60} />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300 mb-2">{story.title}</h3>
              <p className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest">A Story of Perseverance</p>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
                  "{story.content}"
                </p>
              </div>
            </div>
          </article>
        ))}

        <section className="bg-pink-600 p-8 rounded-[2.5rem] text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield size={24} /> Survivor's Voice
          </h3>
          <p className="text-sm opacity-90 mb-6 italic">
            "The journey of a thousand miles begins with a single step. Today, I am not just a survivor, I am a warrior. I chose to speak up, to seek justice, and to heal. My pain did not break me, it forged me."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">A</div>
            <div>
              <p className="font-bold text-sm">Anjali M.</p>
              <p className="text-[10px] opacity-75">Warrior since 2019</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-950 rounded-3xl border border-indigo-100 dark:border-indigo-800 text-center">
        <BookOpen className="mx-auto text-indigo-500 mb-2" size={32} />
        <h4 className="font-bold mb-1">Knowledge is Power</h4>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">Continue learning about legal rights, mental health techniques, and self-defense strategies in our weekly workshops.</p>
      </div>
    </div>
  );
};

export default LearningPage;
