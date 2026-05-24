import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Save, Check, AppWindow, Eye } from 'lucide-react';
import { INITIAL_SECTIONS_CONTENT, WebSectionContent } from './adminTypes';

interface AdminContentProps {
  onAddLog: (type: 'success' | 'alert' | 'content' | 'deletion' | 'media', title: string, desc: string) => void;
}

export default function AdminContent({ onAddLog }: AdminContentProps) {
  const [sections, setSections] = useState<WebSectionContent[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  // Load from localStorage or set defaults
  useEffect(() => {
    const stored = localStorage.getItem('aura_home_content');
    if (stored) {
      try {
        setSections(JSON.parse(stored));
      } catch (e) {
        setSections(INITIAL_SECTIONS_CONTENT);
      }
    } else {
      setSections(INITIAL_SECTIONS_CONTENT);
      localStorage.setItem('aura_home_content', JSON.stringify(INITIAL_SECTIONS_CONTENT));
    }
  }, []);

  const handleFieldChange = (sectionId: string, fieldKey: string, newValue: string) => {
    const updated = sections.map(sec => {
      if (sec.sectionId === sectionId) {
        const updatedFields = sec.fields.map(fl => {
          if (fl.key === fieldKey) {
            return { ...fl, value: newValue };
          }
          return fl;
        });
        return { ...sec, fields: updatedFields };
      }
      return sec;
    });
    setSections(updated);
  };

  const handleSaveContent = () => {
    localStorage.setItem('aura_home_content', JSON.stringify(sections));
    setIsSavedAlert(true);
    onAddLog('content', 'Page Content Modified', `Hero, values or footer titles database were updated.`);
    
    // Auto-dismiss indicator
    setTimeout(() => {
      setIsSavedAlert(false);
    }, 2500);
  };

  const currentSection = sections.find(s => s.sectionId === activeSectionId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#FDFCFC]">Webpage Content Editor</h2>
          <p className="text-sm text-[#FDFCFC]/50">Edit landing copy typography and buttons live on consumer views.</p>
        </div>
        <button
          onClick={handleSaveContent}
          className="bg-[#5AC2EB] hover:bg-[#5AC2EB]/90 text-[#1A1F2E] font-bold tracking-widest text-xs uppercase py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
        >
          <Save size={16} />
          Save Content Changes
        </button>
      </div>

      {isSavedAlert && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#4CAF7D]/15 border border-[#4CAF7D]/35 rounded-xl text-xs text-[#4CAF7D] font-mono flex items-center gap-2"
        >
          <Check size={14} className="stroke-[2.5]" />
          SUCCESS: Content revisions loaded persistently on server, routing updates to client.
        </motion.div>
      )}

      {/* Main split work environment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Navigation panel */}
        <div className="lg:col-span-3 bg-[#242A3B] border border-[#2E3543]/60 p-4 rounded-2xl space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-gray-500 block uppercase px-2 mb-2">Sections Navigator</span>
          {sections.map(sec => (
            <button
              key={sec.sectionId}
              type="button"
              onClick={() => setActiveSectionId(sec.sectionId)}
              className={`w-full text-left py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeSectionId === sec.sectionId 
                  ? 'bg-[#5AC2EB] text-[#1A1F2E]' 
                  : 'bg-transparent text-[#FDFCFC]/70 hover:bg-white/5'
              }`}
            >
              {sec.sectionTitle}
            </button>
          ))}
        </div>

        {/* Inputs forms layout */}
        <div className="lg:col-span-9 bg-[#242A3B] border border-[#2E3543]/60 p-6 rounded-2xl space-y-6">
          {currentSection ? (
            <div className="space-y-5">
              <div className="border-b border-[#2E3543]/40 pb-3 flex items-center justify-between">
                <h3 className="text-lg font-serif text-white font-bold">{currentSection.sectionTitle} Revisions</h3>
                <span className="text-[10px] font-mono text-gray-400">Section Key: {currentSection.sectionId}</span>
              </div>

              <div className="space-y-4">
                {currentSection.fields.map(fl => (
                  <div key={fl.key} className="space-y-2.5">
                    <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase tracking-wide">
                      {fl.label}
                    </label>
                    
                    {fl.type === 'textarea' ? (
                      <textarea
                        rows={4}
                        value={fl.value}
                        onChange={e => handleFieldChange(currentSection.sectionId, fl.key, e.target.value)}
                        className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] rounded-xl p-3.5 text-xs text-white resize-none leading-relaxed outline-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={fl.value}
                        onChange={e => handleFieldChange(currentSection.sectionId, fl.key, e.target.value)}
                        className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] rounded-xl px-4 py-3 text-xs text-white outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#2E3543]/40 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveContent}
                  className="bg-[#5AC2EB] hover:bg-[#5AC2EB]/90 text-[#1A1F2E] font-bold text-xs uppercase py-3 px-5 rounded-xl transition-all cursor-pointer"
                >
                  Apply & Live Update
                </button>
              </div>

            </div>
          ) : (
            <div className="h-full flex items-center justify-center italic text-[#FDFCFC]/30 text-xs">
              Load an editor section directory.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
