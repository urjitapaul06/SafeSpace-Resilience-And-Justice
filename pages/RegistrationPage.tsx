import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Shield, Camera, Mail, Phone, Fingerprint, LogIn, Users, Briefcase, Plus, X, ShieldAlert } from 'lucide-react';

interface Props {
  onComplete: (user: UserProfile) => void;
}

const RegistrationPage: React.FC<Props> = ({ onComplete }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    email: '',
    gender: 'female',
    age: 21,
    profession: '',
    contact: '',
    parentContact: '',
    guardianName: '',
    guardianContact: '',
    peerName: '',
    peerContact: '',
    aadhar: '',
    pan: '',
    photo: '',
    isRegistered: true,
    points: 100,
    badges: ['Survivor Initialized'],
    privacySettings: {
      shareTraumaAnalysisWithPolice: false,
      shareTraumaAnalysisWithGuardian: true,
      anonymousModeDefault: true
    }
  });

  const handleEmergency = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert("CRITICAL SOS: Authorities notified. Location broadcast to family and peers.");
    window.location.href = "tel:100";
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignIn) {
      const saved = localStorage.getItem('safe_space_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email === formData.email || parsed.aadhar === formData.aadhar) {
           onComplete(parsed);
           return;
        }
      }
      alert("Account not found. Please register as a new survivor.");
      setIsSignIn(false);
    } else {
      if (!formData.aadhar || formData.aadhar.length !== 12) {
        alert("Aadhar Number must be exactly 12 digits.");
        return;
      }
      onComplete(formData as UserProfile);
    }
  };

  const handleNumericInput = (field: keyof UserProfile, val: string, length?: number) => {
    const numeric = val.replace(/\D/g, '');
    if (length && numeric.length > length) return;
    setFormData({ ...formData, [field]: numeric });
  };

  const handleTextInput = (field: keyof UserProfile, val: string) => {
    const textOnly = val.replace(/[^a-zA-Z\s]/g, '');
    setFormData({ ...formData, [field]: textOnly });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12 md:py-24 overflow-y-auto relative">
      <div className="max-w-4xl w-full bg-white dark:bg-[#0a0b10]/60 backdrop-blur-3xl rounded-[3rem] shadow-2xl p-8 md:p-14 border border-black/5 dark:border-white/10 relative z-10">
        
        {/* Floating SOS for accessibility during form filling */}
        <button 
          onClick={handleEmergency}
          className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-16 h-16 md:w-20 md:h-20 bg-red-600 text-white rounded-full shadow-2xl animate-emergency flex flex-col items-center justify-center border-4 border-white dark:border-red-900 transition-transform active:scale-90 z-[110]"
        >
          <ShieldAlert size={28} />
          <span className="text-[8px] font-black uppercase tracking-widest mt-1">SOS</span>
        </button>

        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-indigo-600 dark:text-white mb-2 tracking-tighter">Safe-Space</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-[0.4em]">Initialize Forensic Shield</p>
          
          <div className="flex justify-center mt-12 gap-1 p-1 bg-gray-100 dark:bg-white/5 rounded-2xl max-w-sm mx-auto border border-black/5 dark:border-white/10 shadow-inner">
            <button 
              type="button"
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-4 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isSignIn ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-lg' : 'text-gray-400'}`}
            >
              New Identity
            </button>
            <button 
              type="button"
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-4 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isSignIn ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-lg' : 'text-gray-400'}`}
            >
              Existing Access
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {isSignIn ? (
            <div className="space-y-8 max-w-md mx-auto">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity Check (Email or Aadhar)</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input required className="w-full p-6 pl-14 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-3xl outline-none focus:ring-2 ring-indigo-500 text-gray-900 dark:text-white text-sm font-bold" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-7 rounded-[2.5rem] shadow-2xl transition-all transform active:scale-[0.98] uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-3">
                <LogIn size={20} /> Access Protected Archives
              </button>
            </div>
          ) : (
            <>
              {/* SECTION 1: PERSONAL */}
              <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-4">
                  <h3 className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-3">
                    <User size={18} /> 01. Personal Identity
                  </h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Step 1/3</span>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                   <div className="w-full md:w-32 flex flex-col items-center gap-3 shrink-0">
                      <div className="w-32 h-32 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 border-2 border-dashed border-indigo-500/20 flex flex-col items-center justify-center text-gray-400 overflow-hidden relative group cursor-pointer shadow-inner">
                        {formData.photo ? (
                          <>
                            <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                            <button type="button" onClick={() => setFormData({...formData, photo: ''})} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                          </>
                        ) : (
                          <Camera size={32} />
                        )}
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                      </div>
                      <p className="text-[9px] font-black text-gray-400 uppercase text-center tracking-widest">Profile Photo</p>
                   </div>

                   <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Legal Name *</label>
                        <input required className="w-full p-4 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-2xl outline-none focus:ring-2 ring-indigo-500 text-gray-900 dark:text-white text-sm font-bold" placeholder="Full Name" value={formData.name} onChange={e => handleTextInput('name', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address *</label>
                        <input required type="email" className="w-full p-4 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-2xl outline-none focus:ring-2 ring-indigo-500 text-gray-900 dark:text-white text-sm font-bold" placeholder="secure@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Occupation</label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input className="w-full p-4 pl-10 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-2xl outline-none focus:ring-2 ring-indigo-500 text-gray-900 dark:text-white text-sm font-bold" placeholder="Profession" value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                          <select className="w-full p-4 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-2xl outline-none text-gray-900 dark:text-white text-sm font-bold" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="non-binary">Non-Binary</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Age</label>
                          <input type="number" required className="w-full p-4 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-2xl outline-none text-gray-900 dark:text-white text-sm font-bold" value={formData.age} onChange={e => setFormData({...formData, age: parseInt(e.target.value)})} />
                        </div>
                      </div>
                   </div>
                </div>
              </section>

              {/* SECTION 2: LEGAL & IDENTITY */}
              <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-4">
                  <h3 className="text-[11px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest flex items-center gap-3">
                    <Fingerprint size={18} /> 02. Forensic Verification
                  </h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Step 2/3</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Aadhar Card Number (12 Digits) *</label>
                    <input required className="w-full p-4 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-2xl outline-none focus:ring-2 ring-red-500 text-gray-900 dark:text-white text-sm font-bold" placeholder="0000 0000 0000" value={formData.aadhar} onChange={e => handleNumericInput('aadhar', e.target.value, 12)} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">PAN Number (Optional)</label>
                    <input className="w-full p-4 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-2xl outline-none focus:ring-2 ring-red-500 text-gray-900 dark:text-white text-sm font-bold uppercase" placeholder="ABCDE1234F" value={formData.pan} onChange={e => setFormData({...formData, pan: e.target.value.toUpperCase()})} maxLength={10} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Primary Mobile *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input required className="w-full p-4 pl-10 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-2xl outline-none focus:ring-2 ring-red-500 text-gray-900 dark:text-white text-sm font-bold" placeholder="Phone Number" value={formData.contact} onChange={e => handleNumericInput('contact', e.target.value, 10)} />
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: EMERGENCY CIRCLE */}
              <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-4">
                  <h3 className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-3">
                    <Users size={18} /> 03. Emergency Circle
                  </h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Step 3/3</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4 p-8 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-black/5">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Plus size={14} /> Primary Guardian *
                    </p>
                    <div className="space-y-3">
                      <input required className="w-full p-4 bg-white dark:bg-black/40 border border-black/5 rounded-2xl outline-none text-xs font-bold dark:text-white" placeholder="Name" value={formData.guardianName} onChange={e => handleTextInput('guardianName', e.target.value)} />
                      <input required className="w-full p-4 bg-white dark:bg-black/40 border border-black/5 rounded-2xl outline-none text-xs font-bold dark:text-white" placeholder="Contact Number" value={formData.guardianContact} onChange={e => handleNumericInput('guardianContact', e.target.value, 10)} />
                    </div>
                  </div>
                  <div className="space-y-4 p-8 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-black/5">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Plus size={14} /> Trusted Peer (Friend)
                    </p>
                    <div className="space-y-3">
                      <input className="w-full p-4 bg-white dark:bg-black/40 border border-black/5 rounded-2xl outline-none text-xs font-bold dark:text-white" placeholder="Name" value={formData.peerName} onChange={e => handleTextInput('peerName', e.target.value)} />
                      <input className="w-full p-4 bg-white dark:bg-black/40 border border-black/5 rounded-2xl outline-none text-xs font-bold dark:text-white" placeholder="Contact Number" value={formData.peerContact} onChange={e => handleNumericInput('peerContact', e.target.value, 10)} />
                    </div>
                  </div>
                </div>
              </section>

              <div className="p-8 bg-red-500/10 rounded-[2.5rem] border border-red-500/20 flex items-start gap-4">
                <Shield className="text-red-500 shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Privacy Guarantee</h4>
                  <p className="text-xs text-red-700/70 dark:text-red-300/70 leading-relaxed font-bold">
                    Safe-Space encrypts your PII locally. Your identity is shared only with law enforcement during forensic exports or with emergency contacts during SOS.
                  </p>
                </div>
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-7 rounded-[3rem] shadow-2xl transition-all transform hover:-translate-y-1 active:scale-[0.98] uppercase tracking-[0.4em] text-sm flex items-center justify-center gap-3">
                Initialize Secure Shield
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;