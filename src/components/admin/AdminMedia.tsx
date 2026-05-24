import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Search, Grid, List, Copy, Trash2, Check, Sparkles, X } from 'lucide-react';

interface MediaItem {
  id: string;
  src: string;
  name: string;
  dimensions: string;
  size: string;
  projectAssigned: string;
}

interface AdminMediaProps {
  onAddLog: (type: 'success' | 'alert' | 'content' | 'deletion' | 'media', title: string, desc: string) => void;
}

const STATIC_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media-1',
    src: 'https://cms.shantaholdings.com/media/images/Pinnacle_Completed_Temp_7.2e16d0ba.fill-2560x1440-c0.jpg',
    name: 'pinnacle-skyline-day.jpg',
    dimensions: '2560 × 1440',
    size: '422 KB',
    projectAssigned: 'Aura Skyline One'
  },
  {
    id: 'media-2',
    src: 'https://jcxbd.com/wp-content/uploads/2024/08/Flat-Sale-in-Dhaka.jpg',
    name: 'apartments-dhaka-suburb.jpg',
    dimensions: '1200 × 750',
    size: '185 KB',
    projectAssigned: 'Aura Glass Residences'
  },
  {
    id: 'media-3',
    src: 'https://www.swadeshproperties.com/images/3-to-5-katha-plot.jpg',
    name: 'swadesh-plot-aerial.jpg',
    dimensions: '1920 × 1280',
    size: '512 KB',
    projectAssigned: 'Aura Prestige Heights'
  }
];

export default function AdminMedia({ onAddLog }: AdminMediaProps) {
  const [items, setItems] = useState<MediaItem[]>(STATIC_MEDIA_ITEMS);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handleCopyLink = (item: MediaItem) => {
    navigator.clipboard.writeText(item.src);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (window.confirm(`Permanently remove ${name} from cloud storage?`)) {
      setItems(prev => prev.filter(it => it.id !== id));
      onAddLog('media', 'Media Purged', `File "${name}" was unlinked and shredded.`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const [uploadIndicator, setUploadIndicator] = useState<number | null>(null);
  const handleDropUpload = (e: React.DragEvent) => {
    e.preventDefault();
    setUploadIndicator(10);
    const interval = setInterval(() => {
      setUploadIndicator(cv => {
        if (cv === null) return null;
        if (cv >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadIndicator(null);
            const rId = Math.floor(Math.random() * 100);
            const newItem: MediaItem = {
              id: `media-user-${Date.now()}`,
              src: `https://picsum.photos/1080/720?random=${rId}`,
              name: `uploaded-architectural-dft-${rId}.jpg`,
              dimensions: '1920 × 1080',
              size: '228 KB',
              projectAssigned: 'Unassigned Drafts'
            };
            setItems(prev => [newItem, ...prev]);
            onAddLog('media', 'New Media Asset Uploaded', `Resource "${newItem.name}" is persistent.`);
          }, 300);
          return 100;
        }
        return cv + 20;
      });
    }, 100);
  };

  const filteredItems = items.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.projectAssigned.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#FDFCFC]">Central Media Library</h2>
          <p className="text-sm text-[#FDFCFC]/50">Centralised repository holding assets, brochures, vectors, and visuals.</p>
        </div>
      </div>

      {/* Grid containing upload zone on left, list on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Upload controller and storage logs */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDropUpload}
            onClick={() => handleDropUpload({ preventDefault: () => {} } as any)}
            className="border-2 border-dashed border-[#5AC2EB]/20 bg-[#5AC2EB]/4 rounded-2xl p-6 py-12 text-center flex-grow flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-[#5AC2EB]/8"
          >
            <Sparkles size={36} className="text-[#5AC2EB] mb-2" />
            <h4 className="text-sm font-serif font-bold text-[#FDFCFC]">Upload Visual Attachments</h4>
            <p className="text-xs text-gray-400 mt-1 max-w-[200px]">Drop files or click to simulate upload processes.</p>
            
            {uploadIndicator !== null && (
              <div className="w-full max-w-[150px] mt-4 space-y-1">
                <span className="text-[9px] font-mono block text-gray-500">Injecting asset {uploadIndicator}%</span>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#5AC2EB]" style={{ width: `${uploadIndicator}%` }} />
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#242A3B] border border-[#2E3543]/60 p-5 rounded-2xl space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FDFCFC]/65">Secure Storage Allowance</h4>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs text-[#FDFCFC]/50">
                <span>Space Used</span>
                <span>{items.length * 0.4} MB / 10.0 GB</span>
              </div>
              <div className="h-2 bg-[#1A1F2E] rounded-full overflow-hidden">
                <div className="h-full bg-[#5AC2EB]" style={{ width: `${(items.length * 0.4 / 1024) * 100 + 1}%` }} />
              </div>
              <span className="block text-[10px] text-gray-500 leading-relaxed">Compressed, eye-safe high-resolution imagery optimizes site speeds.</span>
            </div>
          </div>
        </div>

        {/* Media Files Table Grid */}
        <div className="lg:col-span-8 bg-[#242A3B] border border-[#2E3543]/60 p-6 rounded-2xl space-y-5 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search assets inside archive..."
              className="flex-1 bg-[#1A1F2E] border border-[#2E3543] text-sm text-[#FDFCFC] p-2.5 px-4 outline-none rounded-xl focus:border-[#5AC2EB] placeholder:text-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-grow max-h-[460px] overflow-y-auto pr-1">
            {filteredItems.map(it => (
              <div key={it.id} className="bg-[#1A1F2E]/40 border border-[#2E3543]/60 p-3 rounded-xl relative group flex flex-col justify-between">
                <div 
                  className="aspect-video w-full rounded-lg overflow-hidden border border-[#2E3543]/40 cursor-zoom-in relative bg-black"
                  onClick={() => setLightboxImage(it.src)}
                >
                  <img src={it.src} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
                </div>
                <div className="pt-3 space-y-1">
                  <span className="block text-[10px] truncate max-w-full text-white font-semibold font-mono">{it.name}</span>
                  <div className="flex justify-between items-center text-[9px] text-gray-500">
                    <span>{it.dimensions}</span>
                    <span>{it.size}</span>
                  </div>
                </div>

                {/* Overlaid management button togglers */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={() => handleCopyLink(it)}
                    className="p-1.5 bg-black/80 hover:bg-[#5AC2EB] text-white hover:text-[#1A1F2E] rounded-md transition-colors cursor-pointer"
                    title="Copy Image URL Asset"
                  >
                    {copiedId === it.id ? <Check size={11} className="stroke-[3]" /> : <Copy size={11} />}
                  </button>
                  <button
                    onClick={() => handleDeleteItem(it.id, it.name)}
                    className="p-1.5 bg-black/80 hover:bg-red-500 text-white hover:text-white rounded-md transition-colors cursor-pointer"
                    title="Delete permanently"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Lightbox photo view */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setLightboxImage(null)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] bg-transparent rounded-3xl overflow-hidden z-10"
            >
              <img src={lightboxImage} alt="media gallery" className="object-contain max-h-[80vh] rounded-2xl border border-white/10" />
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/85 text-white rounded-full cursor-pointer hover:bg-black"
              >
                <X size={18} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
