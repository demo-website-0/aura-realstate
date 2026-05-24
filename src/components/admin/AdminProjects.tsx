import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, MapPin, Layers, Sparkles, Sliders, Trash2, Edit2, Plus, 
  Search, Eye, Check, Star, X, ChevronDown, ChevronRight, HelpCircle, AlertTriangle 
} from 'lucide-react';
import { DetailedProject } from '../../data/projectsDetailData';
import { getDynamicProjects, saveDynamicProjects } from '../../utils/projectsHelper';

interface AdminProjectsProps {
  onAddLog: (type: 'success' | 'alert' | 'content' | 'deletion' | 'media', title: string, desc: string) => void;
  onNavigateHome: () => void;
  onSelectProjectOnSite: (slug: string) => void;
}

export default function AdminProjects({ onAddLog, onNavigateHome, onSelectProjectOnSite }: AdminProjectsProps) {
  const [projects, setProjects] = useState<DetailedProject[]>(() => getDynamicProjects());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Filter States
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<'All' | 'residential' | 'commercial'>('All');
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Bulk operation checks
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Deletion modals state
  const [deletingProject, setDeletingProject] = useState<DetailedProject | null>(null);
  const [deleteConfirmationName, setDeleteConfirmationName] = useState('');

  // Form Section Collapsible toggles
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    basic: false,
    desc: false,
    specs: false,
    progress: true,
    flats: true,
    gallery: true,
    map: true,
    seo: true
  });

  // Dynamic state for Form Editing
  const [formProject, setFormProject] = useState<DetailedProject | null>(null);
  const [newHighlight, setNewHighlight] = useState('');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Storage mock upload file names
  const [mockFiles, setMockFiles] = useState<string[]>([]);
  const [uploadPercent, setUploadPercent] = useState<number | null>(null);

  const toggleSection = (sec: string) => {
    setCollapsedSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Filter projects list
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.tagline.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCategory === 'All' ? true : p.category === filterCategory;
      const matchLoc = filterLocation === 'All' ? true : p.location === filterLocation;
      const matchStatus = filterStatus === 'All' ? true : p.status === filterStatus;
      return matchSearch && matchCat && matchLoc && matchStatus;
    });
  }, [projects, search, filterCategory, filterLocation, filterStatus]);

  // Bulk actions handlers
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredProjects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProjects.map(p => p.id));
    }
  };

  const handleToggleSelectId = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(current => current !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Permanently delete ${selectedIds.length} projects?`)) {
      const remainingProjects = projects.filter(p => !selectedIds.includes(p.id));
      setProjects(remainingProjects);
      saveDynamicProjects(remainingProjects);
      onAddLog('deletion', 'Bulk Deletion Triggered', `${selectedIds.length} projects removed gracefully.`);
      setSelectedIds([]);
    }
  };

  // Handle opening form for Editing
  const handleStartEdit = (p: DetailedProject) => {
    setEditingId(p.id);
    setIsAddingNew(false);
    setFormProject(JSON.parse(JSON.stringify(p))); // deep clone
    setSelectedIds([]);
  };

  // Handle creation of empty default template
  const handleStartAddNew = () => {
    setIsAddingNew(true);
    setEditingId(null);
    const newId = `project-${Date.now()}`;
    const newDefault: DetailedProject = {
      id: newId,
      name: '',
      slug: '',
      category: 'residential',
      location: 'Gulshan',
      status: 'Ongoing',
      address: '',
      landSize: '',
      apartmentSize: '',
      units: 12,
      parking: '',
      floors: '',
      frontRoad: '',
      year: String(new Date().getFullYear()),
      tagline: '',
      description: '',
      overallProgress: 0,
      phases: [
        { name: 'Foundation', progress: 0 },
        { name: 'Structure', progress: 0 },
        { name: 'Brickwork', progress: 0 },
        { name: 'Plastering', progress: 0 },
        { name: 'Finishing', progress: 0 },
        { name: 'Handover', progress: 0 }
      ],
      flatTypes: [
        { name: 'Type A — 3 Bed', bedrooms: 3, bathrooms: 3, size: '2,200 sft', price: 'BDT 2.2 Cr' }
      ],
      neighbourhoodHighlights: ['Premium Location', 'Secure Environment']
    };
    setFormProject(newDefault);
  };

  // Automated draft saving simulations
  const [draftAutosavedTime, setAutosavedTime] = useState<string>('Never');
  React.useEffect(() => {
    if (!formProject) return;
    const interval = setInterval(() => {
      setAutosavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 120000); // Autosaves draft visual every 2 minutes
    return () => clearInterval(interval);
  }, [formProject]);

  const handleSlugify = (nameStr: string) => {
    return nameStr.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSaveForm = () => {
    if (!formProject || !formProject.name.trim()) {
      alert('Please enter a Project Name to continue.');
      return;
    }

    const compiledProject = { ...formProject };
    if (!compiledProject.slug) {
      compiledProject.slug = handleSlugify(compiledProject.name);
    }

    let updatedList: DetailedProject[] = [];
    if (isAddingNew) {
      updatedList = [...projects, compiledProject];
      onAddLog('content', 'Project Created', `"${compiledProject.name}" was successfully spawned was draft/publication`);
    } else {
      updatedList = projects.map(p => p.id === compiledProject.id ? compiledProject : p);
      onAddLog('content', 'Project Updated', `"${compiledProject.name}" properties were fully updated on the server.`);
    }

    setProjects(updatedList);
    saveDynamicProjects(updatedList);
    setIsAddingNew(false);
    setEditingId(null);
    setFormProject(null);
  };

  const handleOpenDeleteConfirm = (p: DetailedProject) => {
    setDeletingProject(p);
    setDeleteConfirmationName('');
  };

  const handleExecuteDelete = () => {
    if (!deletingProject) return;
    if (deleteConfirmationName === deletingProject.name) {
      const remaining = projects.filter(p => p.id !== deletingProject.id);
      setProjects(remaining);
      saveDynamicProjects(remaining);
      onAddLog('deletion', 'Project Deleted Permanently', `"${deletingProject.name}" and references were fully purged.`);
      setDeletingProject(null);
    }
  };

  // Mock Upload Progress bar triggering
  const handleMockDrop = (e: React.DragEvent) => {
    e.preventDefault();
    triggerSimulationUpload();
  };

  const triggerSimulationUpload = () => {
    setUploadPercent(10);
    const interval = setInterval(() => {
      setUploadPercent(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadPercent(null);
            // Append some beautiful mock images
            const rand = Math.floor(Math.random() * 1000);
            const imageTemplate = `https://picsum.photos/800/600?random=${rand}`;
            // Prepend directly to project gallery simulation names space
            setMockFiles(prevMock => [imageTemplate, ...prevMock]);
          }, 300);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  return (
    <div className="space-y-8">
      
      {!formProject ? (
        <>
          {/* Main Action Hub header bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-serif text-[#FDFCFC]">Infrastructure Projects</h2>
              <p className="text-sm text-[#FDFCFC]/50">Manage dynamic portfolio layout databases of property entities.</p>
            </div>
            <button
              onClick={handleStartAddNew}
              className="bg-[#5AC2EB] hover:bg-[#5AC2EB]/90 text-[#1A1F2E] font-bold tracking-widest text-xs uppercase py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <Plus size={16} />
              Add New Project
            </button>
          </div>

          {/* Filtering Controller HUD */}
          <div className="bg-[#242A3B] border border-[#2E3543]/60 p-5 rounded-2xl flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FDFCFC]/40">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, tags, description..."
                className="w-full bg-[#1A1F2E] border border-[#2E3543] rounded-xl py-3 pl-11 pr-4 text-sm text-[#FDFCFC] outline-none focus:border-[#5AC2EB] placeholder:text-[#FDFCFC]/30"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-wrap">
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value as any)}
                className="bg-[#1A1F2E] border border-[#2E3543] text-sm text-[#FDFCFC] px-4 py-3 rounded-xl outline-none focus:border-[#5AC2EB]"
              >
                <option value="All">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>

              <select
                value={filterLocation}
                onChange={e => setFilterLocation(e.target.value)}
                className="bg-[#1A1F2E] border border-[#2E3543] text-sm text-[#FDFCFC] px-4 py-3 rounded-xl outline-none focus:border-[#5AC2EB]"
              >
                <option value="All">All Locations</option>
                <option value="Gulshan">Gulshan</option>
                <option value="Banani">Banani</option>
                <option value="Dhanmondi">Dhanmondi</option>
                <option value="Bashundhara">Bashundhara</option>
              </select>

              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="bg-[#1A1F2E] border border-[#2E3543] text-sm text-[#FDFCFC] px-4 py-3 rounded-xl outline-none focus:border-[#5AC2EB] col-span-2 sm:col-span-1"
              >
                <option value="All">All Status</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Bulk Action Bar Banner */}
          {selectedIds.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#E85454]/10 border border-[#E85454]/30 py-4 px-6 rounded-2xl flex items-center justify-between"
            >
              <span className="text-sm font-semibold text-[#E85454]/90 font-mono">
                {selectedIds.length} projects selected for quick bulk operation
              </span>
              <button
                onClick={handleBulkDelete}
                className="bg-[#E85454] hover:bg-[#E85454]/90 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={14} />
                Delete Selected
              </button>
            </motion.div>
          )}

          {/* Projects Data Table Section */}
          <div className="bg-[#242A3B] border border-[#2E3543]/60 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#2E3543]/60 bg-[#1A1F2E]/40 text-[#FDFCFC]/50 text-xs font-semibold uppercase tracking-wider">
                    <th className="py-4 px-5 w-12 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.length === filteredProjects.length && filteredProjects.length > 0}
                        onChange={handleToggleSelectAll}
                        className="rounded border-[#2E3543] bg-[#1A1F2E] text-[#5AC2EB] accent-[#5AC2EB] h-4 w-4"
                      />
                    </th>
                    <th className="py-4 px-4 w-20">Thumbnail</th>
                    <th className="py-4 px-4">Project Name</th>
                    <th className="py-4 px-4">Type</th>
                    <th className="py-4 px-4">Location</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Handover Timeline</th>
                    <th className="py-4 px-4 text-right pr-6">Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2E3543]/40 text-sm">
                  {filteredProjects.map((p, index) => (
                    <tr 
                      key={p.id}
                      className="hover:bg-[#5AC2EB]/5 transition-colors group"
                    >
                      <td className="py-4 px-5 text-center">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(p.id)}
                          onChange={() => handleToggleSelectId(p.id)}
                          className="rounded border-[#2E3543] bg-[#1A1F2E] text-[#5AC2EB] accent-[#5AC2EB] h-4 w-4"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="w-14 h-11 bg-[#1A1F2E] rounded-md overflow-hidden border border-[#2E3543]/50">
                          <img 
                            src={
                              index === 0 ? "https://cms.shantaholdings.com/media/images/Pinnacle_Completed_Temp_7.2e16d0ba.fill-2560x1440-c0.jpg" :
                              p.status === 'Completed' 
                                ? "https://jcxbd.com/wp-content/uploads/2024/08/Flat-Sale-in-Dhaka.jpg" 
                                : "https://www.swadeshproperties.com/images/3-to-5-katha-plot.jpg"
                            } 
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4 font-serif text-lg font-bold text-[#FDFCFC]">
                        <button onClick={() => handleStartEdit(p)} className="hover:text-[#5AC2EB] text-left outline-none cursor-pointer">
                          {p.name}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-[#FDFCFC]/70 uppercase tracking-widest text-[10px] font-bold">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 text-xs text-[#FDFCFC]/85">
                          <MapPin size={12} className="text-[#5AC2EB]" />
                          {p.location}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block py-1 px-2.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                          p.status === 'Ongoing' 
                            ? 'bg-[#4CAF7D]/12 text-[#4CAF7D]' 
                            : 'bg-[#5AC2EB]/12 text-[#5AC2EB]'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-[#FDFCFC]/60">
                        {p.status === 'Completed' ? 'Completed' : 'Expected Dec 2027'}
                      </td>
                      <td className="py-4 px-4 text-right pr-6">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => onSelectProjectOnSite(p.slug)}
                            className="p-2 text-[#FDFCFC]/55 hover:text-[#5AC2EB] hover:bg-[#1A1F2E] rounded-lg transition-colors cursor-pointer"
                            title="Preview On Site"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="p-2 text-[#FDFCFC]/55 hover:text-[#5AC2EB] hover:bg-[#1A1F2E] rounded-lg transition-colors cursor-pointer"
                            title="Edit specifications"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteConfirm(p)}
                            className="p-2 text-[#FDFCFC]/55 hover:text-[#E85454] hover:bg-[#1A1F2E] rounded-lg transition-colors cursor-pointer"
                            title="Permanently remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProjects.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-[#FDFCFC]/40 font-mono text-xs">
                        No projects matched your filtering criteria. Enter a search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* ================= FORM EDITOR SCREEN ================= */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#2E3543]/40 pb-5 gap-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#5AC2EB] uppercase">
                {isAddingNew ? 'Dossier Drafting Session' : 'Editing: Global Master Properties'}
              </span>
              <h2 className="text-3xl font-serif text-[#FDFCFC] mt-1">
                {isAddingNew ? 'Add New Project' : `Specifications: ${formProject.name}`}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => { setFormProject(null); setIsAddingNew(false); }}
                className="bg-[#242A3B] border border-[#2E3543] hover:bg-[#2E3543] text-[#FDFCFC]/90 font-semibold px-4 py-2.5 rounded-xl cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveForm}
                className="bg-[#5AC2EB] hover:bg-[#5AC2EB]/90 text-[#1A1F2E] font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer text-sm"
              >
                <Check size={16} />
                Publish & Save
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Form Left Fields Modules column */}
            <div className="xl:col-span-9 space-y-4">
              
              {/* SECTION A: Basic Details */}
              <div className="bg-[#242A3B] border border-[#2E3543]/60 rounded-2xl overflow-hidden shadow-md">
                <button
                  onClick={() => toggleSection('basic')}
                  className="w-full px-6 py-4 bg-[#1A1F2E]/30 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[#5AC2EB] text-xs font-bold tracking-[0.15em]">BASIC DETAILS</span>
                  {collapsedSections.basic ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
                
                {!collapsedSections.basic && (
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Project Name *</label>
                        <input
                          type="text"
                          required
                          value={formProject.name}
                          onChange={e => setFormProject({ 
                            ...formProject, 
                            name: e.target.value,
                            slug: handleSlugify(e.target.value)
                          })}
                          placeholder="e.g. Aura Banani Heights"
                          className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-sm text-[#FDFCFC] px-4 py-3 rounded-xl outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Project Slug (URL)</label>
                        <input
                          type="text"
                          value={formProject.slug}
                          onChange={e => setFormProject({ ...formProject, slug: e.target.value })}
                          placeholder="auto-generated-from-name"
                          className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-sm text-[#FDFCFC] px-4 py-3 rounded-xl outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Short Tagline / Key Vision *</label>
                      <input
                        type="text"
                        required
                        value={formProject.tagline}
                        onChange={e => setFormProject({ ...formProject, tagline: e.target.value })}
                        placeholder="e.g. Elegant lightwell coridors over the lake reservoir."
                        className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-sm text-[#FDFCFC] px-4 py-3 rounded-xl outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Project Classification</label>
                        <div className="grid grid-cols-2 bg-[#1A1F2E] p-1 rounded-xl border border-[#2E3543]">
                          <button
                            type="button"
                            onClick={() => setFormProject({ ...formProject, category: 'residential' })}
                            className={`py-2 px-3 text-xs font-bold uppercase rounded-lg cursor-pointer ${
                              formProject.category === 'residential' ? 'bg-[#5AC2EB] text-[#1A1F2E]' : 'text-[#FDFCFC]/50 hover:text-white'
                            }`}
                          >
                            Residential
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormProject({ ...formProject, category: 'commercial' })}
                            className={`py-2 px-3 text-xs font-bold uppercase rounded-lg cursor-pointer ${
                              formProject.category === 'commercial' ? 'bg-[#5AC2EB] text-[#1A1F2E]' : 'text-[#FDFCFC]/50 hover:text-white'
                            }`}
                          >
                            Commercial
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">District Neighborhood</label>
                        <select
                          value={formProject.location}
                          onChange={e => setFormProject({ ...formProject, location: e.target.value as any })}
                          className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-sm text-[#FDFCFC] px-4 py-3 rounded-xl outline-none"
                        >
                          <option value="Gulshan">Gulshan Area</option>
                          <option value="Banani">Banani Central</option>
                          <option value="Dhanmondi">Dhanmondi sector</option>
                          <option value="Bashundhara">Bashundhara R/A</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Construction Status</label>
                        <div className="grid grid-cols-2 bg-[#1A1F2E] p-1 rounded-xl border border-[#2E3543]">
                          <button
                            type="button"
                            onClick={() => setFormProject({ ...formProject, status: 'Ongoing' })}
                            className={`py-2 px-3 text-xs font-bold uppercase rounded-lg cursor-pointer ${
                              formProject.status === 'Ongoing' ? 'bg-[#4CAF7D] text-[#1A1F2E]' : 'text-[#FDFCFC]/50 hover:text-white'
                            }`}
                          >
                            Ongoing
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormProject({ ...formProject, status: 'Completed', overallProgress: 100 })}
                            className={`py-2 px-3 text-xs font-bold uppercase rounded-lg cursor-pointer ${
                              formProject.status === 'Completed' ? 'bg-[#5AC2EB] text-[#1A1F2E]' : 'text-[#FDFCFC]/50 hover:text-white'
                            }`}
                          >
                            Completed
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-1">Full Postal Address *</label>
                      <input
                        type="text"
                        required
                        value={formProject.address}
                        onChange={e => setFormProject({ ...formProject, address: e.target.value })}
                        placeholder="House 32, Road 11, Banani, Dhaka"
                        className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-sm text-[#FDFCFC] px-4 py-3 rounded-xl outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION B: Detailed Narrative & Highlights */}
              <div className="bg-[#242A3B] border border-[#2E3543]/60 rounded-2xl overflow-hidden shadow-md">
                <button
                  onClick={() => toggleSection('desc')}
                  className="w-full px-6 py-4 bg-[#1A1F2E]/30 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[#5AC2EB] text-xs font-bold tracking-[0.15em]">PROJECT OVERVIEW NARRATIVE</span>
                  {collapsedSections.desc ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {!collapsedSections.desc && (
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Description Story Editor</label>
                      <div className="border border-[#2E3543] rounded-xl overflow-hidden bg-[#1A1F2E]">
                        {/* Minimal visual WYSIWYG rich text toolbar mockup */}
                        <div className="bg-[#1A1F2E]/80 border-b border-[#2E3543] px-3 py-2 flex items-center gap-2 text-xs text-[#FDFCFC]/85 flex-wrap">
                          <button type="button" className="p-1 px-2.5 bg-[#2E3543] rounded font-bold hover:text-[#5AC2EB] transition-colors">B</button>
                          <button type="button" className="p-1 px-2.5 bg-[#2E3543] rounded italic hover:text-[#5AC2EB] transition-colors">I</button>
                          <span className="text-gray-600 block">|</span>
                          <button type="button" className="p-1 px-1.5 hover:text-[#5AC2EB] transition-colors">H1</button>
                          <button type="button" className="p-1 px-1.5 hover:text-[#5AC2EB] transition-colors">H2</button>
                          <span className="text-gray-600 block">|</span>
                          <button type="button" className="p-1 px-1.5 hover:text-[#5AC2EB] transition-colors">• Bullet List</button>
                          <button type="button" className="p-1 px-1.5 hover:text-[#5AC2EB] transition-colors">1. List</button>
                          <button type="button" className="p-1 px-1.5 hover:text-[#5AC2EB] transition-colors">“ Quote</button>
                          <button type="button" className="p-1 px-1.5 hover:text-[#5AC2EB] transition-colors">🔗 Link</button>
                        </div>
                        <textarea
                          rows={6}
                          value={formProject.description}
                          onChange={e => setFormProject({ ...formProject, description: e.target.value })}
                          placeholder="Describe this project in Aura's signature warm, confident tone..."
                          className="w-full p-4 bg-transparent outline-none text-sm text-[#FDFCFC]/90 resize-none"
                        />
                      </div>
                    </div>

                    {/* Key Highlights Multi inputs panel */}
                    <div>
                      <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Neighbourhood Key Highlights (Up to 6)</label>
                      <div className="space-y-2">
                        {formProject.neighbourhoodHighlights.map((hl, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={hl}
                              onChange={e => {
                                const updated = [...formProject.neighbourhoodHighlights];
                                updated[i] = e.target.value;
                                setFormProject({ ...formProject, neighbourhoodHighlights: updated });
                              }}
                              className="flex-1 bg-[#1A1F2E] border border-[#2E3543] text-[#FDFCFC] text-xs py-2.5 px-3.5 rounded-lg outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = formProject.neighbourhoodHighlights.filter((_, idx) => idx !== i);
                                setFormProject({ ...formProject, neighbourhoodHighlights: updated });
                              }}
                              className="p-2 bg-[#E85454]/10 hover:bg-[#E85454]/20 text-[#E85454] rounded-lg transition-colors cursor-pointer"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                        {formProject.neighbourhoodHighlights.length < 6 && (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newHighlight}
                              onChange={e => setNewHighlight(e.target.value)}
                              placeholder="e.g. Near Banani Club Park"
                              className="flex-1 bg-[#1A1F2E] border border-[#2E3543] text-xs py-2 px-3 rounded-lg outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newHighlight.trim()) {
                                  setFormProject({
                                    ...formProject,
                                    neighbourhoodHighlights: [...formProject.neighbourhoodHighlights, newHighlight.trim()]
                                  });
                                  setNewHighlight('');
                                }
                              }}
                              className="px-4 bg-[#5AC2EB] text-[#1A1F2E] font-bold text-xs rounded-lg uppercase cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION C: Specifications dimensions */}
              <div className="bg-[#242A3B] border border-[#2E3543]/60 rounded-2xl overflow-hidden shadow-md">
                <button
                  onClick={() => toggleSection('specs')}
                  className="w-full px-6 py-4 bg-[#1A1F2E]/30 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[#5AC2EB] text-xs font-bold tracking-[0.15em]">TECHNICAL DIMENSIONAL SPECIFICATIONS</span>
                  {collapsedSections.specs ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {!collapsedSections.specs && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Land Size Coverage</label>
                        <input
                          type="text"
                          value={formProject.landSize}
                          onChange={e => setFormProject({ ...formProject, landSize: e.target.value })}
                          placeholder="e.g. 8.5 Katha"
                          className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-xs text-[#FDFCFC] px-4 py-3 rounded-xl outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Total Units count</label>
                        <input
                          type="number"
                          value={formProject.units}
                          onChange={e => setFormProject({ ...formProject, units: Number(e.target.value) })}
                          placeholder="e.g. 24"
                          className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-xs text-[#FDFCFC] px-4 py-3 rounded-xl outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Number of Elevations</label>
                        <input
                          type="text"
                          value={formProject.floors}
                          onChange={e => setFormProject({ ...formProject, floors: e.target.value })}
                          placeholder="e.g. G+12 Stories"
                          className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-xs text-[#FDFCFC] px-4 py-3 rounded-xl outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Apartment Sizes (Range)</label>
                        <input
                          type="text"
                          value={formProject.apartmentSize}
                          onChange={e => setFormProject({ ...formProject, apartmentSize: e.target.value })}
                          placeholder="e.g. 2,200 - 3,500 sft"
                          className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-xs text-[#FDFCFC] px-4 py-3 rounded-xl outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Dedicated Parking allotment</label>
                        <input
                          type="text"
                          value={formProject.parking}
                          onChange={e => setFormProject({ ...formProject, parking: e.target.value })}
                          placeholder="e.g. 36 Double bays"
                          className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-xs text-[#FDFCFC] px-4 py-3 rounded-xl outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase mb-2">Front Access Road Width</label>
                        <input
                          type="text"
                          value={formProject.frontRoad}
                          onChange={e => setFormProject({ ...formProject, frontRoad: e.target.value })}
                          placeholder="e.g. 40 ft"
                          className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-xs text-[#FDFCFC] px-4 py-3 rounded-xl outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION D: Project Construction Phase sliders */}
              <div className="bg-[#242A3B] border border-[#2E3543]/60 rounded-2xl overflow-hidden shadow-md">
                <button
                  onClick={() => toggleSection('progress')}
                  className="w-full px-6 py-4 bg-[#1A1F2E]/30 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[#5AC2EB] text-xs font-bold tracking-[0.15em]">CONSTRUCTION TIMELINE PROGRESS TRACKERS</span>
                  {collapsedSections.progress ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {!collapsedSections.progress && (
                  <div className="p-6 space-y-6">
                    {/* Overall Progress sliding core */}
                    <div className="bg-[#1A1F2E]/40 border border-[#2E3543] p-5 rounded-2xl space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-[#FDFCFC] tracking-wide">Overall Structural Progress</span>
                        <span className="font-mono text-xl font-bold text-[#5AC2EB]">{formProject.overallProgress}%</span>
                      </div>
                      <div className="relative pt-1">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={formProject.overallProgress}
                          onChange={e => setFormProject({ ...formProject, overallProgress: Number(e.target.value) })}
                          className="w-full h-2 bg-[#1A1F2E] rounded-lg appearance-none cursor-pointer accent-[#5AC2EB]"
                        />
                      </div>
                      <span className="block text-[10px] text-gray-500 font-mono">This value dictates the interactive visual metrics on features portfolio boards.</span>
                    </div>

                    {/* Phase by phase grids */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-[#FDFCFC]/60 uppercase tracking-widest border-b border-[#2E3543] pb-2">Phase specific progress offsets</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formProject.phases.map((ph, idx) => (
                          <div key={idx} className="bg-[#1A1F2E]/10 p-4 border border-[#2E3543]/40 rounded-xl space-y-2">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-[#FDFCFC]/85">{ph.name}</span>
                              <span className="text-[#4CAF7D] font-bold">{ph.progress}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={ph.progress}
                              onChange={e => {
                                const updatedPh = [...formProject.phases];
                                updatedPh[idx].progress = Number(e.target.value);
                                setFormProject({ ...formProject, phases: updatedPh });
                              }}
                              className="w-full h-1.5 bg-[#1A1F2E] rounded-lg appearance-none cursor-pointer accent-[#4CAF7D]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION E: Flat type unit configuration */}
              <div className="bg-[#242A3B] border border-[#2E3543]/60 rounded-2xl overflow-hidden shadow-md">
                <button
                  onClick={() => toggleSection('flats')}
                  className="w-full px-6 py-4 bg-[#1A1F2E]/30 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[#5AC2EB] text-xs font-bold tracking-[0.15em]">REPEATED APARTMENT FLAT UNIT TYPES</span>
                  {collapsedSections.flats ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {!collapsedSections.flats && (
                  <div className="p-6 space-y-4">
                    {formProject.flatTypes.map((flat, i) => (
                      <div key={i} className="bg-[#1A1F2E]/40 border border-[#2E3543]/80 p-5 rounded-2xl relative space-y-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (formProject.flatTypes.length <= 1) return;
                            const updatedFlats = formProject.flatTypes.filter((_, idx) => idx !== i);
                            setFormProject({ ...formProject, flatTypes: updatedFlats });
                          }}
                          className="absolute top-4 right-4 text-xs text-[#E85454]/60 hover:text-[#E85454] cursor-pointer"
                        >
                          [× Remove Flat Configuration]
                        </button>
                        <h4 className="text-xs uppercase font-bold text-[#5AC2EB] tracking-wider mb-2">Configure Flat Type #{i + 1}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Configuration Name</label>
                            <input
                              type="text"
                              value={flat.name}
                              onChange={e => {
                                const updatedFlats = [...formProject.flatTypes];
                                updatedFlats[i].name = e.target.value;
                                setFormProject({ ...formProject, flatTypes: updatedFlats });
                              }}
                              placeholder="e.g. Type B — Premium"
                              className="w-full bg-[#1A1F2E] border border-[#2E3543] text-xs text-white p-2.5 rounded-lg outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Total Bedrooms</label>
                            <input
                              type="number"
                              value={flat.bedrooms}
                              onChange={e => {
                                const updatedFlats = [...formProject.flatTypes];
                                updatedFlats[i].bedrooms = Number(e.target.value);
                                setFormProject({ ...formProject, flatTypes: updatedFlats });
                              }}
                              className="w-full bg-[#1A1F2E] border border-[#2E3543] text-xs text-white p-2.5 rounded-lg outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Total Bathrooms</label>
                            <input
                              type="number"
                              value={flat.bathrooms}
                              onChange={e => {
                                const updatedFlats = [...formProject.flatTypes];
                                updatedFlats[i].bathrooms = Number(e.target.value);
                                setFormProject({ ...formProject, flatTypes: updatedFlats });
                              }}
                              className="w-full bg-[#1A1F2E] border border-[#2E3543] text-xs text-white p-2.5 rounded-lg outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Floor Space Size</label>
                            <input
                              type="text"
                              value={flat.size}
                              onChange={e => {
                                const updatedFlats = [...formProject.flatTypes];
                                updatedFlats[i].size = e.target.value;
                                setFormProject({ ...formProject, flatTypes: updatedFlats });
                              }}
                              placeholder="e.g. 2,650 sft"
                              className="w-full bg-[#1A1F2E] border border-[#2E3543] text-xs text-white p-2.5 rounded-lg outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Indicative Pricing</label>
                            <input
                              type="text"
                              value={flat.price}
                              onChange={e => {
                                const updatedFlats = [...formProject.flatTypes];
                                updatedFlats[i].price = e.target.value;
                                setFormProject({ ...formProject, flatTypes: updatedFlats });
                              }}
                              placeholder="e.g. BDT 3.8 Cr"
                              className="w-full bg-[#1A1F2E] border border-[#2E3543] text-xs text-white p-2.5 rounded-lg outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        const newFlat = { name: 'New Unit Configuration', bedrooms: 3, bathrooms: 3, size: '2,400 sft', price: 'BDT 2.8 Cr' };
                        setFormProject({ ...formProject, flatTypes: [...formProject.flatTypes, newFlat] });
                      }}
                      className="w-full py-3 bg-[#1A1F2E] hover:bg-[#1A1F2E]/70 text-[#5AC2EB] border border-dashed border-[#5AC2EB]/30 rounded-xl text-xs uppercase font-bold tracking-widest cursor-pointer transition-colors"
                    >
                      + Add Another Flat Unit Type Configuration
                    </button>
                  </div>
                )}
              </div>

              {/* SECTION F: Project Image Gallery & Cover selection */}
              <div className="bg-[#242A3B] border border-[#2E3543]/60 rounded-2xl overflow-hidden shadow-md">
                <button
                  onClick={() => toggleSection('gallery')}
                  className="w-full px-6 py-4 bg-[#1A1F2E]/30 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[#5AC2EB] text-xs font-bold tracking-[0.15em]">PROJECT MEDIA PHOTO GALLERY</span>
                  {collapsedSections.gallery ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {!collapsedSections.gallery && (
                  <div className="p-6 space-y-4">
                    
                    {/* Dashed Drag/Drop Area */}
                    <div 
                      onDragOver={e => e.preventDefault()}
                      onDrop={handleMockDrop}
                      onClick={triggerSimulationUpload}
                      className="w-full border-2 border-dashed border-[#5AC2EB]/30 bg-[#5AC2EB]/4 hover:bg-[#5AC2EB]/8 rounded-2xl p-8 py-12 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-colors"
                    >
                      <Sparkles size={40} className="text-[#5AC2EB] mb-3 stroke-[1.5]" />
                      <h4 className="text-sm font-serif text-[#FDFCFC] tracking-wide font-bold">Drag & drop visual architectural views directly</h4>
                      <p className="text-xs text-[#FDFCFC]/50 max-w-[280px] mt-1">or browse secure local files. Formats supported: JPEG, PNG, WEBP.</p>
                      
                      {uploadPercent !== null && (
                        <div className="mt-4 w-full max-w-[200px] space-y-1.5 ">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span>Uploading asset...</span>
                            <span>{uploadPercent}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#1A1F2E] rounded-full overflow-hidden">
                            <div className="bg-[#5AC2EB] h-full" style={{ width: `${uploadPercent}%` }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pre-existing visual mock dataset files grid */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-gray-400 block uppercase">Active dynamic elements</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        <div className="aspect-square bg-[#1A1F2E] border border-[#5AC2EB] rounded-2xl relative overflow-hidden group">
                          <img 
                            src="https://cms.shantaholdings.com/media/images/Pinnacle_Completed_Temp_7.2e16d0ba.fill-2560x1440-c0.jpg" 
                            alt="Front Exterior View" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2.5 left-2.5 bg-[#5AC2EB] text-[#1A1F2E] font-bold text-[8px] tracking-widest uppercase py-1 px-2.5 rounded-full shadow-md">
                            Cover
                          </div>
                        </div>

                        {mockFiles.map((src, index) => (
                          <div key={index} className="aspect-square bg-[#1A1F2E] border border-[#2E3543] rounded-2xl relative overflow-hidden group">
                            <img src={src} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 transition-opacity">
                              <button
                                type="button"
                                onClick={() => setLightboxImage(src)}
                                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
                                title="Enlarge Preview Photo"
                              >
                                <Eye size={12} />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setMockFiles(prev => prev.filter((_, idx) => idx !== index));
                                }}
                                className="p-2 bg-red-500/10 hover:bg-red-500/25 text-red-500 rounded-lg transition-colors cursor-pointer"
                                title="Purge Item"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION G: Map Integration Embed Code */}
              <div className="bg-[#242A3B] border border-[#2E3543]/60 rounded-2xl overflow-hidden shadow-md">
                <button
                  onClick={() => toggleSection('map')}
                  className="w-full px-6 py-4 bg-[#1A1F2E]/30 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[#5AC2EB] text-xs font-bold tracking-[0.15em]">GOOGLE MAP LOCATIONAL ACCESS EMBED</span>
                  {collapsedSections.map ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {!collapsedSections.map && (
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase">Paste Google Maps Embed URL</label>
                      <input
                        type="text"
                        placeholder="e.g. https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14601.307374828135..."
                        className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-xs text-[#FDFCFC] p-3 rounded-xl outline-none font-mono"
                      />
                      <span className="block text-[10px] text-gray-500">Retrieves direct secure high-fidelity responsive mapping integrations on the clients screens.</span>
                    </div>

                    <div className="p-4 bg-[#1A1F2E]/30 border border-[#2E3543] rounded-2xl">
                      <span className="text-xs text-[#FDFCFC]/50 block mb-2 font-semibold">Mock Layout Preview</span>
                      <div className="w-full h-40 bg-[#1A1F2E] rounded-xl flex items-center justify-center text-gray-500 text-xs italic">
                        Dhaka Coordinates Rendered. Static fallback vector maps live on client views.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION H: Meta & SEO Options */}
              <div className="bg-[#242A3B] border border-[#2E3543]/60 rounded-2xl overflow-hidden shadow-md">
                <button
                  onClick={() => toggleSection('seo')}
                  className="w-full px-6 py-4 bg-[#1A1F2E]/30 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[#5AC2EB] text-xs font-bold tracking-[0.15em]">SEO ADVANCED OPTIMIZATIONS</span>
                  {collapsedSections.seo ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {!collapsedSections.seo && (
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase">Meta Title Tag</label>
                        <span className="text-[10px] font-mono text-gray-500">max 60 chars</span>
                      </div>
                      <input
                        type="text"
                        maxLength={60}
                        placeholder="Aura Developments | Elite Real Estate in Dhaka"
                        className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-xs text-[#FDFCFC] p-3 rounded-xl outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase">Meta Description Annotation</label>
                        <span className="text-[10px] font-mono text-gray-500">max 160 chars</span>
                      </div>
                      <textarea
                        rows={3}
                        maxLength={160}
                        placeholder="Explore ultra-premium real estate developments in Gulshan, Banani, Dhanmondi, featuring travertine, state of the art sound proof layouts."
                        className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-xs text-[#FDFCFC] p-3 rounded-xl outline-none resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Form Right Actions sticky widgets column */}
            <div className="xl:col-span-3 space-y-4 xl:sticky xl:top-[80px]">
              
              <div className="bg-[#242A3B] border border-[#2E3543]/60 p-5 rounded-2xl shadow-md space-y-4">
                <h4 className="text-xs uppercase font-bold text-[#FDFCFC]/60 tracking-wider">Session Console</h4>
                
                <div className="space-y-2 text-xs text-[#FDFCFC]/70">
                  <div className="flex justify-between">
                    <span>Active Status:</span>
                    <span className="text-[#5AC2EB] font-bold">Unsaved Draft Session</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Draft Autosave:</span>
                    <span className="font-mono text-gray-500">{draftAutosavedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Required Fields:</span>
                    <span className="text-[#4CAF7D] font-bold">Aura-Passed</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2E3543]/40 space-y-2">
                  <button
                    onClick={handleSaveForm}
                    className="w-full bg-[#5AC2EB] hover:bg-[#5AC2EB]/90 text-[#1A1F2E] font-bold text-xs uppercase py-3 rounded-xl cursor-pointer"
                  >
                    Publish Changes
                  </button>
                  <button
                    onClick={() => { setFormProject(null); setIsAddingNew(false); }}
                    className="w-full bg-transparent hover:bg-white/5 border border-[#2E3543] text-gray-400 hover:text-white font-bold text-xs uppercase py-3 rounded-xl cursor-pointer"
                  >
                    Abandon Draft
                  </button>
                </div>
              </div>

              <div className="bg-[#242A3B] border border-[#2E3543]/60 p-5 rounded-2xl text-xs text-[#FDFCFC]/50 space-y-2.5">
                <div className="flex items-center gap-1.5 text-orange-400 font-bold uppercase tracking-wider text-[10px]">
                  <AlertTriangle size={14} />
                  Aura Security Guideline Note
                </div>
                <p className="leading-relaxed">
                  Every portfolio listing modification immediately builds the client-facing cache, rendering updates real-time. Make sure coordinates maps match Google specifications perfectly.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ================= LIGHTBOX PREVIEW MODAL ================= */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setLightboxImage(null)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[80vh] bg-transparent rounded-3xl overflow-hidden z-10"
            >
              <img src={lightboxImage} alt="lightbox preview" className="object-contain max-h-[75vh] rounded-2xl border border-white/12" />
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/80 text-white rounded-full hover:bg-black cursor-pointer"
              >
                <X size={18} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= DELETION CONFIRMATION MODAL ================= */}
      <AnimatePresence>
        {deletingProject && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 font-sans">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setDeletingProject(null)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-[480px] bg-[#242A3B] border border-[#E85454]/20 rounded-3xl p-8 z-10 shadow-2xl space-y-5"
            >
              <div className="w-12 h-12 bg-[#E85454]/10 rounded-full flex items-center justify-center text-[#E85454]">
                <AlertTriangle size={24} className="stroke-[1.5]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-serif text-[#FDFCFC]">Purge project from servers?</h3>
                <p className="text-xs text-[#FDFCFC]/50 leading-relaxed">
                  You are bidding farewell to <strong className="text-white">"{deletingProject.name}"</strong>, deleting specifications database logs and referenced media files permanently from local storage.
                </p>
              </div>

              {/* Protection strict input text validation requirement */}
              <div className="space-y-2 bg-[#1A1F2E] p-4 rounded-2xl border border-[#2E3543]/40">
                <label className="block text-[10px] uppercase font-bold text-gray-400">Type exact project name to unlock verification:</label>
                <input
                  type="text"
                  value={deleteConfirmationName}
                  onChange={e => setDeleteConfirmationName(e.target.value)}
                  placeholder={deletingProject.name}
                  className="w-full bg-[#242A3B] border border-[#2E3543] focus:border-[#E85454] rounded-lg py-2.5 px-3 uppercase text-xs text-white outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setDeletingProject(null)}
                  className="w-full bg-[#1A1F2E] hover:bg-[#1A1F2E]/60 text-white font-bold text-xs uppercase py-3 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecuteDelete}
                  disabled={deleteConfirmationName !== deletingProject.name}
                  className={`w-full font-bold text-xs uppercase py-3 rounded-xl cursor-pointer ${
                    deleteConfirmationName === deletingProject.name 
                      ? 'bg-[#E85454] text-white hover:bg-[#E85454]/90' 
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-40'
                  }`}
                >
                  Yes, Purge Permanently
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
