import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, LayoutDashboard, Sliders, Image, FileText, Mail, Settings, 
  LogOut, ShieldCheck, HelpCircle, ArrowUpRight, Clock, MapPin, Sparkles, Check, ChevronDown 
} from 'lucide-react';
import { DetailedProject } from '../data/projectsDetailData';
import { getDynamicProjects } from '../utils/projectsHelper';

// Modular Imports
import AdminLogin from './admin/AdminLogin';
import AdminProjects from './admin/AdminProjects';
import AdminInquiries from './admin/AdminInquiries';
import AdminContent from './admin/AdminContent';
import AdminMedia from './admin/AdminMedia';
import AdminSettings from './admin/AdminSettings';
import { AuditLog, INITIAL_AUDIT_LOGS } from './admin/adminTypes';

interface AdminPanelProps {
  onNavigateHome: () => void;
  onSelectProjectOnSite: (slug: string) => void;
}

type AdminTab = 'dashboard' | 'projects' | 'media' | 'content' | 'inquiries' | 'settings';

export default function AdminPanel({ onNavigateHome, onSelectProjectOnSite }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('aura_authenticated') === 'true';
  });

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [unreadInquiries, setUnreadInquiries] = useState(0);

  // Security activity log state
  const [logs, setLogs] = useState<AuditLog[]>(() => {
    const stored = localStorage.getItem('aura_security_logs');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return INITIAL_AUDIT_LOGS;
      }
    }
    localStorage.setItem('aura_security_logs', JSON.stringify(INITIAL_AUDIT_LOGS));
    return INITIAL_AUDIT_LOGS;
  });

  // Projects list state for dashboard stats
  const [projects, setProjects] = useState<DetailedProject[]>([]);
  useEffect(() => {
    if (isAuthenticated) {
      setProjects(getDynamicProjects());
    }
  }, [isAuthenticated, activeTab]);

  const handleAddLog = (type: AuditLog['type'], title: string, desc: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleString(),
      type,
      title,
      description: desc,
      ip: '102.32.48.xx',
      location: 'Dhaka, Bangladesh',
      browser: 'Chrome / macOS'
    };
    
    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('aura_security_logs', JSON.stringify(updated));
  };

  const handleClearLogs = () => {
    if (window.confirm('Wipe complete security activity registry logs permanently?')) {
      setLogs([]);
      localStorage.setItem('aura_security_logs', JSON.stringify([]));
      handleAddLog('alert', 'Activity Log Purged', 'Administrative security trails were intentionally cleared.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('aura_authenticated');
    setIsAuthenticated(false);
  };

  // Authenticate completely
  const handleLoginSuccess = () => {
    sessionStorage.setItem('aura_authenticated', 'true');
    setIsAuthenticated(true);
    handleAddLog('success', 'Console Secured', 'Multi-factor login challenges complete.');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Derived stats counters
  const totalProjectsCount = projects.length;
  const completedProjectsCount = projects.filter(p => p.status === 'Completed').length;
  const ongoingProjectsCount = projects.filter(p => p.status === 'Ongoing').length;

  return (
    <div className="min-h-screen bg-[#1A1F2E] text-white font-sans flex text-sm selection:bg-[#5AC2EB] selection:text-[#1A1F2E]">
      
      {/* 1. SIDEBAR NAVIGATION PANELS */}
      <aside className="w-[260px] bg-[#1d2333] border-r border-[#2E3543]/40 flex flex-col justify-between hidden md:flex sticky top-0 h-screen z-20">
        <div className="p-6 space-y-8">
          
          {/* Brand header panel */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5AC2EB] rounded-2xl flex items-center justify-center text-[#1A1F2E] font-bold text-lg select-none">
              A
            </div>
            <div>
              <span className="font-serif tracking-widest text-[#FDFCFC]/90 text-sm font-bold block uppercase">
                AURA
              </span>
              <span className="text-[10px] uppercase font-bold text-[#5AC2EB] tracking-wider block">
                DEVELOPMENTS
              </span>
            </div>
          </div>

          {/* Nav links indexes */}
          <nav className="space-y-1.5 flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block px-3 mb-2">Systems modules</span>
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-xs font-bold uppercase tracking-wider text-left outline-none ${
                activeTab === 'dashboard' ? 'bg-[#5AC2EB] text-[#1A1F2E]' : 'text-gray-400 hover:text-white hover:bg-white/4'
              }`}
            >
              <LayoutDashboard size={16} />
              Console Dashboard
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-xs font-bold uppercase tracking-wider text-left outline-none ${
                activeTab === 'projects' ? 'bg-[#5AC2EB] text-[#1A1F2E]' : 'text-gray-400 hover:text-white hover:bg-white/4'
              }`}
            >
              <Building2 size={16} />
              Property Projects
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-xs font-bold uppercase tracking-wider text-left outline-none ${
                activeTab === 'media' ? 'bg-[#5AC2EB] text-[#1A1F2E]' : 'text-gray-400 hover:text-white hover:bg-white/4'
              }`}
            >
              <Image size={16} />
              Media Library
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-xs font-bold uppercase tracking-wider text-left outline-none ${
                activeTab === 'content' ? 'bg-[#5AC2EB] text-[#1A1F2E]' : 'text-gray-400 hover:text-white hover:bg-white/4'
              }`}
            >
              <FileText size={16} />
              Landing Editor
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer text-xs font-bold uppercase tracking-wider text-left outline-none ${
                activeTab === 'inquiries' ? 'bg-[#5AC2EB] text-[#1A1F2E]' : 'text-gray-400 hover:text-white hover:bg-white/4'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail size={16} />
                Leads Inbox
              </div>
              {unreadInquiries > 0 && (
                <span className={`inline-flex items-center justify-center p-1.5 px-2 bg-red-500 font-bold rounded-full text-[9px] ${
                  activeTab === 'inquiries' ? 'text-white' : 'text-white'
                }`}>
                  {unreadInquiries}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-xs font-bold uppercase tracking-wider text-left outline-none ${
                activeTab === 'settings' ? 'bg-[#5AC2EB] text-[#1A1F2E]' : 'text-gray-400 hover:text-white hover:bg-white/4'
              }`}
            >
              <Settings size={16} />
              Security Settings
            </button>
          </nav>
        </div>

        {/* Footer actions profile info */}
        <div className="p-6 border-t border-[#2E3543]/40 space-y-4 bg-[#141824]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1A1F2E] border border-[#2E3543] rounded-full flex items-center justify-center font-bold text-xs text-[#5AC2EB]">
              AD
            </div>
            <div>
              <span className="text-white text-xs font-bold block">Developer Concierge</span>
              <span className="text-[10px] text-gray-500 block uppercase">Super Admin</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer outline-none border border-red-500/20"
          >
            <LogOut size={13} />
            Logout Engine
          </button>
        </div>
      </aside>

      {/* 2. MAIN HUB VISUAL AREA */}
      <div className="flex-1 flex flex-col sticky top-0 h-screen overflow-y-auto z-10">
        
        {/* Navigation Top bar header indicators */}
        <header className="px-6 md:px-10 py-5 bg-[#1d2333]/80 backdrop-blur-md border-b border-[#2E3543]/40 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Dossier Manager</span>
            <span className="text-xs text-gray-600">/</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">{activeTab}</span>
          </div>

          {/* Quick exit and links indicators */}
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="text-[#5AC2EB] hover:text-[#5AC2EB]/80 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer underline"
            >
              Go to Landing Site
              <ArrowUpRight size={14} />
            </button>

            <span className="w-[1px] h-4 bg-gray-700 hidden sm:block" />

            <div className="flex items-center gap-2 text-[11px] font-mono text-[#4CAF7D] bg-[#4CAF7D]/8 border border-[#4CAF7D]/25 py-1 px-3.5 rounded-full hidden sm:flex select-none">
              <span className="w-2 h-2 rounded-full bg-[#4CAF7D] animate-ping" />
              SYSTEM SECURE
            </div>
          </div>
        </header>

        {/* Dynamic content tab canvas mapping */}
        <main className="flex-1 p-6 md:p-10 bg-[#1A1F2E]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="min-h-[70vh]"
            >
              
              {/* Tab 1: DASHBOARD WORKSPACE */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  
                  {/* Row 1: Greetings banner informational */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-[#242A3B] to-[#1d2333] border border-[#5AC2EB]/20 p-8 rounded-3xl gap-6 relative overflow-hidden">
                    <div className="space-y-3 z-10 relative">
                      <div className="inline-flex items-center gap-1.5 text-xs text-[#5AC2EB] font-bold tracking-widest uppercase">
                        <Sparkles size={14} />
                        Welcome back to the Command Center
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold leading-tight">
                        Secured Portfolio Environment
                      </h2>
                      <p className="text-sm text-[#FDFCFC]/75 max-w-xl">
                        Monitor architectural parameters, coordinate ongoing joint construction timelines, and moderate luxury inquiries real-time.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 z-10 relative md:self-end">
                      <button
                        onClick={() => setActiveTab('projects')}
                        className="bg-[#5AC2EB] hover:bg-[#5AC2EB]/90 text-[#1A1F2E] font-bold tracking-widest text-xs uppercase py-3.5 px-6 rounded-xl cursor-pointer transition-colors"
                      >
                        Adjust specifications
                      </button>
                      <button
                        onClick={() => setActiveTab('inquiries')}
                        className="bg-transparent hover:bg-white/5 border border-gray-600 hover:border-white text-white font-bold tracking-widest text-xs uppercase py-3.5 px-6 rounded-xl cursor-pointer transition-colors"
                      >
                        Check leads Inbox
                      </button>
                    </div>

                    <div className="absolute w-60 h-60 bg-[#5AC2EB]/5 rounded-full blur-[70px] -right-10 -bottom-10 pointer-events-none" />
                  </div>

                  {/* Row 2: Status Numeric Widgets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div className="bg-[#242A3B] border border-[#2E3543]/60 p-6 rounded-2xl relative overflow-hidden group hover:border-[#5AC2EB]/40 transition-colors">
                      <span className="text-[11px] font-bold text-[#FDFCFC]/40 uppercase tracking-widest block">Total Real Estate</span>
                      <span className="font-serif text-4xl font-bold block text-white mt-1.5">{totalProjectsCount} projects</span>
                      <div className="absolute right-4 bottom-4 w-9 h-9 bg-white/2 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-[#5AC2EB] transition-colors">
                        <Building2 size={18} />
                      </div>
                    </div>

                    <div className="bg-[#242A3B] border border-[#2E3543]/60 p-6 rounded-2xl relative overflow-hidden group hover:border-[#5AC2EB]/40 transition-colors">
                      <span className="text-[11px] font-bold text-[#FDFCFC]/40 uppercase tracking-widest block">Completed Portfolio</span>
                      <span className="font-serif text-4xl font-bold block text-[#5AC2EB] mt-1.5">{completedProjectsCount} entries</span>
                      <div className="absolute right-4 bottom-4 w-9 h-9 bg-white/2 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-[#5AC2EB] transition-colors">
                        <Check size={18} />
                      </div>
                    </div>

                    <div className="bg-[#242A3B] border border-[#2E3543]/60 p-6 rounded-2xl relative overflow-hidden group hover:border-[#5AC2EB]/40 transition-colors">
                      <span className="text-[11px] font-bold text-[#FDFCFC]/40 uppercase tracking-widest block">Active Construction</span>
                      <span className="font-serif text-4xl font-bold block text-orange-400 mt-1.5">{ongoingProjectsCount} developments</span>
                      <div className="absolute right-4 bottom-4 w-9 h-9 bg-white/2 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-orange-400 transition-colors">
                        <Clock size={18} />
                      </div>
                    </div>

                    <div className="bg-[#242A3B] border border-[#2E3543]/60 p-6 rounded-2xl relative overflow-hidden group hover:border-[#5AC2EB]/40 transition-colors">
                      <span className="text-[11px] font-bold text-[#FDFCFC]/40 uppercase tracking-widest block">Unread leads</span>
                      <span className="font-serif text-4xl font-bold block text-red-500 mt-1.5">{unreadInquiries} pending</span>
                      <div className="absolute right-4 bottom-4 w-9 h-9 bg-white/2 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-red-500 transition-colors">
                        <Mail size={18} />
                      </div>
                    </div>

                  </div>

                  {/* Row 3: Live interactive feeds columns */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Column: Recent Projects list brief */}
                    <div className="xl:col-span-7 bg-[#242A3B] border border-[#2E3543]/60 p-6 rounded-3xl space-y-4 shadow-md">
                      <div className="flex justify-between items-center border-b border-[#2E3543]/40 pb-3">
                        <h3 className="font-serif text-lg font-bold text-white">Active Catalog Highlights</h3>
                        <button
                          onClick={() => setActiveTab('projects')}
                          className="text-xs text-[#5AC2EB] font-bold uppercase hover:underline cursor-pointer"
                        >
                          Show All (Full editor) →
                        </button>
                      </div>

                      <div className="space-y-4">
                        {projects.slice(0, 4).map(p => (
                          <div key={p.id} className="bg-[#1A1F2E]/40 border border-[#2E3543]/40 hover:border-[#5AC2EB]/20 p-4 rounded-xl flex items-center justify-between gap-4 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-10 bg-gray-900 rounded-lg overflow-hidden border border-[#2E3543]/40 flex-shrink-0">
                                <img src="https://cms.shantaholdings.com/media/images/Pinnacle_Completed_Temp_7.2e16d0ba.fill-2560x1440-c0.jpg" alt="Thm" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h4 className="font-serif text-base font-bold text-white leading-snug">{p.name}</h4>
                                <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 tracking-wide">
                                  <MapPin size={10} className="text-[#5AC2EB]" />
                                  {p.location} area
                                </span>
                              </div>
                            </div>

                            <span className={`inline-block py-1 px-3 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              p.status === 'Completed' ? 'bg-[#5AC2EB]/10 text-[#5AC2EB]' : 'bg-[#4CAF7D]/10 text-[#4CAF7D]'
                            }`}>
                              {p.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Mini Interactive Chronological security logs */}
                    <div className="xl:col-span-5 bg-[#242A3B] border border-[#2E3543]/60 p-6 rounded-3xl space-y-4 shadow-md">
                      <div className="flex justify-between items-center border-b border-[#2E3543]/40 pb-3">
                        <h3 className="font-serif text-lg font-bold text-white">Security & Operational Logs</h3>
                        <button
                          onClick={() => setActiveTab('settings')}
                          className="text-xs text-[#5AC2EB] font-bold uppercase hover:underline cursor-pointer"
                        >
                          Manage →
                        </button>
                      </div>

                      <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                        {logs.slice(0, 5).map(lg => (
                          <div key={lg.id} className="flex gap-3 text-xs border-b border-[#2E3543]/30 pb-2.5 last:border-0 last:pb-0">
                            <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                              lg.type === 'alert' ? 'bg-[#E85454]' :
                              lg.type === 'success' ? 'bg-[#4CAF7D]' :
                              'bg-[#5AC2EB]'
                            }`} />
                            <div className="space-y-0.5">
                              <span className="font-bold text-white block">{lg.title}</span>
                              <p className="text-gray-500 text-[10px]">{lg.description}</p>
                              <span className="text-[9px] text-[#FDFCFC]/30 block font-mono">{lg.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Tab 2: PROJECTS VIEW */}
              {activeTab === 'projects' && (
                <AdminProjects 
                  onAddLog={handleAddLog}
                  onNavigateHome={onNavigateHome}
                  onSelectProjectOnSite={onSelectProjectOnSite}
                />
              )}

              {/* Tab 3: MEDIA VIEW */}
              {activeTab === 'media' && (
                <AdminMedia onAddLog={handleAddLog} />
              )}

              {/* Tab 4: PAGES CONTENT VIEW */}
              {activeTab === 'content' && (
                <AdminContent onAddLog={handleAddLog} />
              )}

              {/* Tab 5: LEADS INBOX VIEW */}
              {activeTab === 'inquiries' && (
                <AdminInquiries 
                  onAddLog={handleAddLog}
                  onUpdateUnreadCount={setUnreadInquiries}
                />
              )}

              {/* Tab 6: SETTINGS VIEW */}
              {activeTab === 'settings' && (
                <AdminSettings 
                  logs={logs}
                  onAddLog={handleAddLog}
                  onClearLogs={handleClearLogs}
                />
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  );
}
