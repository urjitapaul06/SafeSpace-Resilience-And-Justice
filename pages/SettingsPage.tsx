import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Settings, Shield, Lock, Key, Github, Save, Trash2, Eye, EyeOff, User, Mail, Info } from 'lucide-react';

interface Props {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
}

const SettingsPage: React.FC<Props> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState<UserProfile>({...user});
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    onUpdate(formData);
    alert("SETTINGS SECURED: Your profile and privacy settings have been updated.");
  };

  const handleExportGitHub = () => {
    alert("GITHUB EXPORT: Preparing code for deployment. API configurations mapped.");
  };

  const toggleSetting = (key: keyof UserProfile['privacySettings']) => {
    if (!formData.privacySettings) {
       formData.privacySettings = {
         shareTraumaAnalysisWithPolice: false,
         shareTraumaAnalysisWithGuardian: true,
         anonymousModeDefault: true
       };
    }
    setFormData({
      ...formData,
      privacySettings: {
        ...formData.privacySettings,
        [key]: !formData.privacySettings[key]
      }
    });
  };

  return (
    <div className="space-y-10 pb-12">
      <header>
        <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">Account Settings</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Manage your identity and digital shield</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white dark:bg-[#12141c] p-10 rounded-[3.5rem] shadow-2xl border border-black/5 dark:border-white/10">
            <h3 className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <User size={18} /> Identity Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  className="w-full p-4 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-2xl outline-none text-gray-900 dark:text-white text-sm font-bold" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  className="w-full p-4 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-2xl outline-none text-gray-900 dark:text-white text-sm font-bold" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <button 
              onClick={handleSave}
              className="mt-8 px-10 py-4 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2"
            >
              <Save size={18} /> Update Profile
            </button>
          </section>

          <section className="bg-white dark:bg-[#12141c] p-10 rounded-[3.5rem] shadow-2xl border border-black/5 dark:border-white/10">
            <h3 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Lock size={18} /> Privacy Shields
            </h3>
            <div className="space-y-6">
              {[
                { label: "Anonymous Mode Default", key: "anonymousModeDefault" as const, desc: "Mask identity automatically in AI chats." },
                { label: "Share Analysis with Police", key: "shareTraumaAnalysisWithPolice" as const, desc: "Enable forensic data sharing with authorities." },
                { label: "Guardian Insights", key: "shareTraumaAnalysisWithGuardian" as const, desc: "Allow emergency contacts to view wellness summaries." }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-5 bg-gray-50 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => toggleSetting(item.key)}
                    className={`w-14 h-8 rounded-full relative transition-all ${formData.privacySettings?.[item.key] ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${formData.privacySettings?.[item.key] ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <section className="bg-indigo-600 p-10 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Key size={18} /> API Configuration
            </h3>
            <div className="relative mb-6">
              <input 
                type={showKey ? "text" : "password"}
                placeholder="Private Gemini Key"
                value={formData.customApiKey || ''}
                onChange={e => setFormData({...formData, customApiKey: e.target.value})}
                className="w-full p-4 pr-12 bg-white/10 border border-white/20 rounded-2xl outline-none text-sm font-bold"
              />
              <button 
                onClick={() => setShowKey(!showKey)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
              >
                {showKey ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
            <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest italic">Personal API keys override the global project limits.</p>
          </section>

          <section className="bg-white dark:bg-[#12141c] p-10 rounded-[3.5rem] shadow-2xl border border-black/5 dark:border-white/10">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">System Health</h3>
            <button 
              onClick={handleExportGitHub}
              className="w-full py-5 bg-black dark:bg-white dark:text-black text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
            >
              <Github size={20} /> Dev Export
            </button>
          </section>

          <button 
            onClick={() => {
              if(confirm("Wipe all locally stored logs and archives? This cannot be undone.")) {
                localStorage.removeItem('safe_space_health_logs');
                localStorage.removeItem('safe_space_periods');
                alert("Archives wiped.");
                window.location.reload();
              }
            }}
            className="w-full py-5 border-2 border-dashed border-red-500/20 text-red-500 rounded-[2.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-red-500/5 transition-all"
          >
            Wipe Local Archives
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;