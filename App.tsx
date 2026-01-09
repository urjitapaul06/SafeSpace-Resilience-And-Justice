import React, { useState, useEffect } from 'react';
import { Theme, UserProfile } from './types';
import { NAV_ITEMS } from './constants';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import WellnessPage from './pages/WellnessPage';
import AssistantPage from './pages/AssistantPage';
import LearningPage from './pages/LearningPage';
import TrackerPage from './pages/TrackerPage';
import HelplinesPage from './pages/HelplinesPage';
import SupportPage from './pages/SupportPage';
import AwarenessPage from './pages/AwarenessPage';
import DefensePage from './pages/DefensePage';
import SettingsPage from './pages/SettingsPage';
import VideoInsightPage from './pages/VideoInsightPage';
import ImageInsightPage from './pages/ImageInsightPage';
import StopNCIIPage from './pages/StopNCIIPage';
import JusticePage from './pages/JusticePage';
import FloatingParticles from './components/FloatingParticles';
import { Sun, Moon, ShieldAlert, Menu, X, Heart, MapPin, LogOut, ChevronDown, User } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('safe_space_user');
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      return parsed.isRegistered ? parsed : null;
    } catch (e) {
      return null;
    }
  });
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, user?.isRegistered]);

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleRegister = (profile: UserProfile) => {
    const fullProfile = { ...profile, isRegistered: true };
    setUser(fullProfile);
    localStorage.setItem('safe_space_user', JSON.stringify(fullProfile));
    setActiveTab('home');
  };

  const handleUpdateProfile = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('safe_space_user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    if (confirm("For your security, logging out will clear all session data and return you to the secure entry screen. Confirm?")) {
      // 1. Clear All Storage to ensure complete wipe
      localStorage.clear();
      sessionStorage.clear();
      // 2. Reset local state
      setUser(null);
      // 3. Force reload to ensure all memory states are wiped and router/state resets to default
      window.location.reload();
    }
  };

  const toggleTheme = () => setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);

  const handleEmergency = () => {
    alert("CRITICAL SOS: Authorities notified. Location broadcast to family and peers.");
    window.location.href = "tel:100";
  };

  const handleLocationShare = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        alert(`LOCATION SHARED: [${latitude.toFixed(4)}, ${longitude.toFixed(4)}] broadcasted to your emergency circle.`);
      });
    }
  };

  const switchTab = (tabId: string) => {
    setActiveTab(tabId);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    if (!user) return null;
    switch (activeTab) {
      case 'home': return <HomePage user={user} onShareLocation={handleLocationShare} />;
      case 'justice': return <JusticePage />;
      case 'stopncii': return <StopNCIIPage />;
      case 'helplines': return <HelplinesPage />;
      case 'assistant': return <AssistantPage user={user} />;
      case 'wellness': return <WellnessPage user={user} onUpdatePoints={handleUpdateProfile} />;
      case 'learning': return <LearningPage />;
      case 'image-insight': return <ImageInsightPage />;
      case 'video': return <VideoInsightPage />;
      case 'defense': return <DefensePage />;
      case 'awareness': return <AwarenessPage />;
      case 'tracker': return <TrackerPage />;
      case 'support': return <SupportPage />;
      case 'settings': return <SettingsPage user={user} onUpdate={handleUpdateProfile} />;
      default: return <HomePage user={user} onShareLocation={handleLocationShare} />;
    }
  };

  if (!user || !user.isRegistered) {
    return (
      <div className={`min-h-screen bg-gradient-safe relative flex flex-col ${theme === Theme.DARK ? 'dark' : ''}`}>
        <FloatingParticles />
        <div className="flex-1 overflow-y-auto">
          <RegistrationPage onComplete={handleRegister} />
        </div>
        
        {/* Persistent SOS Trigger on Registration Screen (Desktop & Tablet) */}
        <div className="fixed bottom-10 right-10 z-[100] hidden md:block">
          <button 
            onClick={handleEmergency}
            className="w-20 h-20 bg-red-600 text-white rounded-full shadow-2xl animate-emergency flex items-center justify-center border-4 border-white dark:border-red-900 transition-transform hover:scale-110 active:scale-90"
          >
            <ShieldAlert size={40} />
          </button>
        </div>

        {/* SOS BAR (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-white/10 backdrop-blur-md border-t border-white/10 md:hidden">
          <button onClick={handleEmergency} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-2xl animate-emergency flex items-center justify-center gap-3">
            <ShieldAlert size={24} /><span className="uppercase tracking-[0.2em] text-xs">SOS (Call Police)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-safe flex flex-col md:flex-row transition-colors duration-500 ${theme === Theme.DARK ? 'dark text-gray-100' : 'text-gray-900'}`}>
      <FloatingParticles />
      
      <header className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-[#0a0b10]/80 backdrop-blur-lg border-b border-black/5 dark:border-white/5 sticky top-0 z-[60]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gray-100 dark:bg-white/5 rounded-xl text-indigo-600 dark:text-indigo-400"
          >
            <Menu size={24} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold dark:text-white tracking-tight text-indigo-600">Safe-Space</h1>
            <span className="text-[8px] uppercase tracking-widest text-red-600 font-black">Forensic Shield</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-white/5">
              {theme === Theme.LIGHT ? <Moon size={18}/> : <Sun size={18}/>}
           </button>
           <button onClick={handleLogout} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
              <LogOut size={18} />
           </button>
        </div>
      </header>

      <div className="fixed bottom-6 right-6 z-[100]">
        <button 
          onClick={handleEmergency}
          className="w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl animate-emergency flex items-center justify-center border-4 border-white dark:border-red-900 transition-transform active:scale-90"
        >
          <ShieldAlert size={32} />
        </button>
      </div>

      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 bg-white dark:bg-[#0a0b10] border-r border-black/5 dark:border-white/5 flex flex-col transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0 shadow-[20px_0_60px_rgba(0,0,0,0.5)]' : '-translate-x-full'}
        md:relative md:translate-x-0 md:flex md:h-screen md:sticky md:top-0
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-950 dark:text-white tracking-tight">Safe-Space</h1>
            <p className="text-[10px] uppercase tracking-widest text-red-600 font-bold">Your safety, Our priority</p>
          </div>
          <button className="md:hidden text-gray-400" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 mt-2 overflow-y-auto custom-scrollbar">
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.id} 
              onClick={() => switchTab(item.id)} 
              className={`w-full flex items-center gap-3 px-6 py-3.5 transition-all ${
                activeTab === item.id 
                  ? 'bg-red-500/10 text-red-600 border-l-4 border-red-500 font-black' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 font-bold'
              }`}
            >
              <span className={activeTab === item.id ? 'text-red-600' : 'text-gray-400'}>
                {item.icon}
              </span>
              <span className="text-xs uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-black/5 dark:border-white/5 space-y-2">
          <div className="relative">
            <div 
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-2xl cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0 border-2 border-white/20 overflow-hidden shadow-lg">
                {user.photo ? (
                  <img src={user.photo} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  user.name[0]
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[11px] font-black text-gray-900 dark:text-white truncate uppercase tracking-tighter">{user.name}</p>
                <p className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter">Resilience: {user.points || 0}</p>
              </div>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </div>

            {showProfileMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-[#1a1c23] border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-bottom-2 duration-200">
                <button 
                  onClick={() => switchTab('settings')}
                  className="w-full flex items-center gap-3 px-5 py-4 text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-black text-[9px] uppercase tracking-widest border-b border-black/5 dark:border-white/5"
                >
                  <User size={16} /> Profile Settings
                </button>
                <button 
                  onClick={handleLogout} 
                  className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-500/5 transition-colors font-black text-[9px] uppercase tracking-widest"
                >
                  <LogOut size={16} /> Logout Securely
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={toggleTheme} 
              className="py-2.5 px-2 bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400"
            >
              {theme === Theme.LIGHT ? <Moon size={14}/> : <Sun size={14}/>}
              Mode
            </button>
            <button 
              onClick={handleLogout}
              className="py-2.5 px-2 bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest shadow-lg"
            >
              <LogOut size={14}/>
              Exit
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;