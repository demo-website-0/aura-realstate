import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Calendar, Clock, ClipboardList, Check, Trash2, X, Eye, FileText } from 'lucide-react';

interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate?: string;
  preferredTime?: string;
  message: string;
  audienceType: 'buyer' | 'landowner' | 'general';
  timestamp?: string;
  status?: 'New' | 'Read' | 'Responded';
  internalNotes?: string;
}

interface AdminInquiriesProps {
  onAddLog: (type: 'success' | 'alert' | 'content' | 'deletion' | 'media', title: string, desc: string) => void;
  onUpdateUnreadCount: (count: number) => void;
}

export default function AdminInquiries({ onAddLog, onUpdateUnreadCount }: AdminInquiriesProps) {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Filtering criteria
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');

  // On mount, load both default mock inquiries AND any user submissions stored under `aura_bookings`
  useEffect(() => {
    const rawBookings = JSON.parse(localStorage.getItem('aura_bookings') || '[]');
    
    // Seed initial mock items if nothing exists to make it immediately majestic
    const initialMocks: InquiryItem[] = [
      {
        id: 'mock-inq-1',
        name: 'Kamrul Hasan',
        email: 'kamrul.hasan@gmail.com',
        phone: '+880-1711-223344',
        preferredDate: '2026-06-02',
        preferredTime: '15:30',
        message: 'I am interested in Type B penthouse apartment in Aura Skyline One. Please organize a private visit during weekdays.',
        audienceType: 'buyer',
        timestamp: '2026-05-24T04:15:00.000Z',
        status: 'New',
        internalNotes: 'Wants high floor specifically.'
      },
      {
        id: 'mock-inq-2',
        name: 'Sharmin Ara',
        email: 'sara.dhaka@jcl.com',
        phone: '+880-1819-556677',
        message: 'I own a 12 Katha rectangular corner plot in Gulshan Road 4. Looking for an premium developer partner for structural joint venture.',
        audienceType: 'landowner',
        timestamp: '2026-05-23T18:30:00.000Z',
        status: 'Read',
        internalNotes: 'Contacted her secretary. Arranging formal pitch documents.'
      },
      {
        id: 'mock-inq-3',
        name: 'Sadnan Ahmed',
        email: 'sadnan_cse@yahoo.com',
        phone: '+880-1552-889900',
        message: 'Could you share brochure catalogs for ongoing projects in Dhanmondi area? Looking forward to details.',
        audienceType: 'general',
        timestamp: '2026-05-22T10:45:00.000Z',
        status: 'Responded',
        internalNotes: 'Brochure dispatched via email.'
      }
    ];

    // Combine user bookings (mapping fields correctly)
    const formattedBookings = rawBookings.map((b: any) => ({
      id: b.id || `inq-${Date.now()}-${Math.random()}`,
      name: b.name || 'Anonymous Consumee',
      email: b.email || '',
      phone: b.phone || '',
      preferredDate: b.preferredDate || '',
      preferredTime: b.preferredTime || '11:00',
      message: b.message || 'No commentary entered',
      audienceType: b.audienceType || 'general',
      timestamp: b.timestamp || new Date().toISOString(),
      status: b.status || 'New',
      internalNotes: b.internalNotes || ''
    }));

    // Put everything together
    const compositeInquiries = [...formattedBookings, ...initialMocks];
    
    // Sort Newest first
    compositeInquiries.sort((a, b) => new Date(b.timestamp || '').getTime() - new Date(a.timestamp || '').getTime());
    setInquiries(compositeInquiries);
  }, []);

  // Recalculate and notify core panel about unread inquiries
  useEffect(() => {
    const unread = inquiries.filter(i => i.status === 'New').length;
    onUpdateUnreadCount(unread);
  }, [inquiries]);

  // Handle updates to lists
  const updateInquiryState = (id: string, updates: Partial<InquiryItem>) => {
    const modified = inquiries.map(i => {
      if (i.id === id) {
        return { ...i, ...updates };
      }
      return i;
    });
    setInquiries(modified);
    
    // Also save back user bookings modifications into localStorage
    const rawBookings = JSON.parse(localStorage.getItem('aura_bookings') || '[]');
    const updatedBookings = rawBookings.map((b: any) => {
      if (b.id === id) {
        return { ...b, ...updates };
      }
      return b;
    });
    localStorage.setItem('aura_bookings', JSON.stringify(updatedBookings));
  };

  const handleOpenDetail = (inq: InquiryItem) => {
    setSelectedInquiry(inq);
    setAdminNoteInput(inq.internalNotes || '');
    if (inq.status === 'New') {
      updateInquiryState(inq.id, { status: 'Read' });
    }
  };

  const handleSaveNotes = () => {
    if (!selectedInquiry) return;
    updateInquiryState(selectedInquiry.id, { internalNotes: adminNoteInput });
    setSelectedInquiry(prev => prev ? { ...prev, internalNotes: adminNoteInput } : null);
    onAddLog('content', 'Inquiry Annotated', `Admin notes updated for inquiry candidate "${selectedInquiry.name}"`);
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('Delete this inquiry permanently?')) {
      const remaining = inquiries.filter(i => i.id !== id);
      setInquiries(remaining);
      
      // Sync localStorage
      const rawBookings = JSON.parse(localStorage.getItem('aura_bookings') || '[]');
      const updatedBookings = rawBookings.filter((b: any) => b.id !== id);
      localStorage.setItem('aura_bookings', JSON.stringify(updatedBookings));

      onAddLog('deletion', 'Inquiry Purged', `Contact log entry was cleanly omitted from server logs.`);
      setSelectedInquiry(null);
    }
  };

  // Filter inquiry compilation
  const filteredInquiries = inquiries.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || 
                        i.message.toLowerCase().includes(search.toLowerCase()) ||
                        i.email.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'All' ? true : i.audienceType === filterType;
    const matchStatus = filterStatus === 'All' ? true : i.status === filterStatus;
    
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-6 relative">
      <div>
        <h2 className="text-2xl font-serif text-[#FDFCFC]">Leads & Inquiries Inbox</h2>
        <p className="text-sm text-[#FDFCFC]/50">Monitor, reply, and index customer requests dynamically across landing areas.</p>
      </div>

      {/* Inbox filtration HUD */}
      <div className="bg-[#242A3B] border border-[#2E3543]/60 p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search inquiries by name, contact, content..."
            className="w-full bg-[#1A1F2E] border border-[#2E3543] rounded-xl py-3 pl-4 pr-10 text-sm placeholder:text-[#FDFCFC]/30 outline-none text-white focus:border-[#5AC2EB]"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="bg-[#1A1F2E] border border-[#2E3543] text-sm text-[#FDFCFC] px-4 py-3 rounded-xl outline-none w-full md:w-auto focus:border-[#5AC2EB]"
          >
            <option value="All">All Types</option>
            <option value="buyer">Buyers (Visits)</option>
            <option value="landowner">Landowners (JVs)</option>
            <option value="general">General Leads</option>
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-[#1A1F2E] border border-[#2E3543] text-sm text-[#FDFCFC] px-4 py-3 rounded-xl outline-none w-full md:w-auto focus:border-[#5AC2EB]"
          >
            <option value="All">All Status</option>
            <option value="New">Unread Only</option>
            <option value="Read">Read Leads</option>
            <option value="Responded">Responded Leads</option>
          </select>
        </div>
      </div>

      {/* Table grid layout */}
      <div className="bg-[#242A3B] border border-[#2E3543]/60 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto font-sans">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#2E3543]/60 bg-[#1A1F2E]/40 text-[#FDFCFC]/50 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-5 w-10">Indicator</th>
                <th className="py-4 px-4">Contact Sender</th>
                <th className="py-4 px-4">Inquiry Category</th>
                <th className="py-4 px-4">Message Summary</th>
                <th className="py-4 px-4 font-mono text-center">Calendar Block</th>
                <th className="py-4 px-4 text-center">Timestamps</th>
                <th className="py-4 px-4 text-right pr-6">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2E3543]/40 text-sm">
              {filteredInquiries.map(inq => (
                <tr key={inq.id} className="hover:bg-[#5AC2EB]/5 transition-colors">
                  <td className="py-4 px-5 text-center">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                      inq.status === 'New' ? 'bg-[#5AC2EB]' :
                      inq.status === 'Read' ? 'bg-orange-400' :
                      'bg-gray-600'
                    }`} />
                  </td>
                  <td className="py-4 px-4 font-serif text-base font-semibold text-[#FDFCFC]">{inq.name}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block py-1 px-2 text-[9px] uppercase font-bold tracking-widest rounded-full ${
                      inq.audienceType === 'buyer' ? 'bg-[#5AC2EB]/15 text-[#5AC2EB]' :
                      inq.audienceType === 'landowner' ? 'bg-green-500/15 text-green-400' :
                      'bg-gray-400/15 text-gray-400'
                    }`}>
                      {inq.audienceType}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#FDFCFC]/75 truncate max-w-[200px]">{inq.message}</td>
                  <td className="py-4 px-4 text-center font-mono text-xs">
                    {inq.preferredDate ? (
                      <span className="text-[#5AC2EB]">
                        {inq.preferredDate} @ {inq.preferredTime}
                      </span>
                    ) : (
                      <span className="text-[#FDFCFC]/30">Open Conversation</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-[#FDFCFC]/40 text-xs text-center">
                    {new Date(inq.timestamp || '').toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-4 px-4 text-right pr-6">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleOpenDetail(inq)}
                        className="py-1.5 px-3 bg-[#1A1F2E] hover:bg-[#5AC2EB] text-xs font-semibold hover:text-[#1A1F2E] rounded-lg transition-all"
                      >
                        Open Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInquiries.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-[#FDFCFC]/40 font-mono italic">
                    All clear! Inquiries inbox is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLIDE OVER DETAIL PANEL MODAL */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-[1000] overflow-hidden font-sans">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedInquiry(null)} />
            
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="w-screen max-w-lg bg-[#242A3B] border-l border-[#2E3543] text-white flex flex-col justify-between"
              >
                
                {/* Header detail */}
                <div className="p-6 border-b border-[#2E3543] flex items-center justify-between bg-[#1A1F2E]/40">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#5AC2EB]">
                      Inquiry Candidate Dossier
                    </span>
                    <h3 className="text-xl font-serif text-white font-bold mt-0.5">{selectedInquiry.name}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedInquiry(null)}
                    className="p-1.5 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content log section */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* Status pills section */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="bg-[#1A1F2E] py-2 px-4 rounded-xl border border-[#2E3543] text-xs">
                      <span className="block text-[8px] uppercase tracking-wider text-gray-500 mb-0.5">Inbox Status Indicator:</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`inline-block w-2 h-2 rounded-full ${
                          selectedInquiry.status === 'New' ? 'bg-[#5AC2EB]' :
                          selectedInquiry.status === 'Read' ? 'bg-orange-400' :
                          'bg-green-400'
                        }`} />
                        <span className="font-semibold text-[#FDFCFC]">{selectedInquiry.status}</span>
                      </div>
                    </div>

                    <div className="bg-[#1A1F2E] py-2 px-4 rounded-xl border border-[#2E3543] text-xs flex-1">
                      <span className="block text-[8px] uppercase tracking-wider text-gray-500 mb-0.5">Submission category:</span>
                      <span className="font-bold uppercase tracking-widest text-[#5AC2EB] text-[10px]">{selectedInquiry.audienceType}</span>
                    </div>
                  </div>

                  {/* Core Content elements */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-[#2E3543] pb-1.5">Sender details</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm text-[#FDFCFC]/85 font-mono">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-[#5AC2EB]" />
                        <a href={`mailto:${selectedInquiry.email}`} className="hover:text-[#5AC2EB] transition-colors">{selectedInquiry.email}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-[#5AC2EB]" />
                        <a href={`tel:${selectedInquiry.phone}`} className="hover:text-[#5AC2EB] transition-colors">{selectedInquiry.phone}</a>
                      </div>
                    </div>
                  </div>

                  {selectedInquiry.preferredDate && (
                    <div className="space-y-4 p-4.5 bg-[#1A1F2E]/40 border border-[#2E3543] rounded-2xl">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#5AC2EB] flex items-center gap-1.5">
                        <Calendar size={13} />
                        Preferred Visitation Block Window
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-[#1A1F2E] p-2.5 rounded-xl text-center">
                          <span className="block text-[8px] uppercase text-gray-500 mb-0.5">Date</span>
                          <span className="font-mono text-xs">{selectedInquiry.preferredDate}</span>
                        </div>
                        <div className="bg-[#1A1F2E] p-2.5 rounded-xl text-center">
                          <span className="block text-[8px] uppercase text-gray-500 mb-0.5">Time Slot</span>
                          <span className="font-mono text-xs">{selectedInquiry.preferredTime}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Verbal commentary */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Verbal message</h4>
                    <div className="bg-[#1A1F2E] p-4.5 rounded-2xl border border-[#2E3543]/40 text-sm text-[#FDFCFC]/90 italic leading-relaxed">
                      "{selectedInquiry.message}"
                    </div>
                  </div>

                  {/* Admin notes panel */}
                  <div className="space-y-3 pt-4 border-t border-[#2E3543]/40">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
                      <FileText size={14} className="text-[#5AC2EB]" />
                      Internal admin annotation
                    </h4>
                    <textarea
                      rows={4}
                      value={adminNoteInput}
                      onChange={e => setAdminNoteInput(e.target.value)}
                      placeholder="Add specific follow-up annotation details here..."
                      className="w-full p-3.5 bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] rounded-2xl outline-none text-xs text-white resize-none leading-relaxed"
                    />
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      className="px-4.5 py-2.5 bg-[#2E3543] hover:bg-[#5AC2EB] text-[#FDFCFC] hover:text-[#1A1F2E] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      Save Admin Note
                    </button>
                  </div>

                </div>

                {/* Footer Controls */}
                <div className="p-6 border-t border-[#2E3543] bg-[#1A1F2E]/40 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      updateInquiryState(selectedInquiry.id, { status: 'Responded' });
                      onAddLog('success', 'Inquiry Contacted', `Logged callback response triggers for ${selectedInquiry.name}`);
                      setSelectedInquiry(null);
                    }}
                    className="flex-1 bg-[#5AC2EB] hover:bg-[#5AC2EB]/90 text-[#1A1F2E] font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl cursor-pointer"
                  >
                    Mark Responded
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                    className="p-3 bg-[#E85454]/10 hover:bg-[#E85454]/25 text-[#E85454] rounded-xl cursor-pointer transition-colors"
                    title="Omit entry"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
