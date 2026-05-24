import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ShieldAlert, Key, ClipboardList, RefreshCw, Download, FileSpreadsheet } from 'lucide-react';
import { AuditLog } from './adminTypes';

interface AdminSettingsProps {
  logs: AuditLog[];
  onAddLog: (type: 'success' | 'alert' | 'content' | 'deletion' | 'media', title: string, desc: string) => void;
  onClearLogs: () => void;
}

export default function AdminSettings({ logs, onAddLog, onClearLogs }: AdminSettingsProps) {
  const [username, setUsername] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('aura_admin_creds') || '{"username":"auraowner"}');
    return stored.username;
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Password Rules Checker
  const checkPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-transparent' };
    let score = 0;
    
    // Rule 1: Length >= 16
    if (pass.length >= 16) score += 1;
    // Rule 2: Upper and Lower case
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 1;
    // Rule 3: Numbers
    if (/[0-9]/.test(pass)) score += 1;
    // Rule 4: Special characters
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pass)) score += 1;

    // If score is high but length is less than 16, restrict score from top
    if (pass.length < 16 && score > 2) {
      score = 2; // Fair/Orange max
    }

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak (Length < 16)', color: 'bg-[#E85454]' };
      case 2:
        return { score: 2, label: 'Fair (Add upper/lower mix)', color: 'bg-orange-400' };
      case 3:
        return { score: 3, label: 'Strong (Highly secured)', color: 'bg-[#4CAF7D]' };
      case 4:
        return { score: 4, label: 'Very Strong (Aura Elite)', color: 'bg-[#5AC2EB]' };
      default:
        return { score: 0, label: 'Too Weak', color: 'bg-gray-700' };
    }
  };

  const strength = checkPasswordStrength(password);

  const handleUpdateCreds = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (password) {
      if (password.length < 16) {
        setErrorMsg('Security mandate: Passwords MUST be at least 16 characters in length.');
        return;
      }
      if (strength.score < 3) {
        setErrorMsg('Security mandate: Password must fulfill algorithmic complexity (mixed case, digits, symbols).');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Verification error: Passwords do not match.');
        return;
      }
    }

    // Save
    const stored = JSON.parse(localStorage.getItem('aura_admin_creds') || '{"username":"auraowner","password":"AuraSecurePass2026!"}');
    const updated = {
      username: username.trim(),
      password: password ? password : stored.password
    };
    localStorage.setItem('aura_admin_creds', JSON.stringify(updated));
    setSuccessMsg('Administrative login credentials updated successfully!');
    setPassword('');
    setConfirmPassword('');
    onAddLog('success', 'Credentials Modified', `Primary administrator profile settings were successfully updated.`);
  };

  const handleDownloadLogsMock = () => {
    // Transform logs into simulated downloadable CSV format
    const header = "Timestamp,Type,Event,Description\n";
    const body = logs.map(l => `"${l.timestamp}","${l.type}","${l.title}","${l.description}"`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(header + body);
    
    // Create temporary link element
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `aura-admin-security-logs-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    onAddLog('success', 'Security Log Exported', 'CSV spreadsheet dataset downloaded by Administrator.');
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Two sections: Security configs on left, logs on right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Profile and Credentials Editor form box */}
        <div className="xl:col-span-5 bg-[#242A3B] border border-[#2E3543]/60 p-6 rounded-2xl shadow-md space-y-6">
          <div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#5AC2EB]">
              Control Gate Configuration
            </span>
            <h3 className="text-xl font-serif text-white font-bold mt-1">Credentials & Profile Settings</h3>
          </div>

          <form onSubmit={handleUpdateCreds} className="space-y-4">
            {successMsg && (
              <div className="p-4 bg-[#4CAF7D]/12 border border-[#4CAF7D]/30 text-[#4CAF7D] text-xs rounded-xl">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="p-4 bg-[#E85454]/12 border border-[#E85454]/30 text-[#E85454] text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Administrative Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-xs text-white p-3 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">New Security Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Leave blank to keep existing password"
                className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-xs text-white p-3 rounded-xl outline-none"
              />
            </div>

            {/* PASSWORD STRENGTH BAR LAYOUT SPECIFICATION */}
            {password && (
              <div className="space-y-2 py-1 bg-[#1A1F2E]/40 border border-[#2E3543]/50 p-4 rounded-xl">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Security Strength Index:</span>
                  <span className="font-bold underline tracking-wider font-mono text-white text-[10px] uppercase">
                    {strength.label}
                  </span>
                </div>
                
                {/* 4 segments progress bar grid based on specification */}
                <div className="grid grid-cols-4 gap-1.5 h-1.5">
                  <div className={`h-full rounded-full transition-colors ${strength.score >= 1 ? strength.color : 'bg-gray-800'}`} />
                  <div className={`h-full rounded-full transition-colors ${strength.score >= 2 ? strength.color : 'bg-gray-800'}`} />
                  <div className={`h-full rounded-full transition-colors ${strength.score >= 3 ? strength.color : 'bg-gray-800'}`} />
                  <div className={`h-full rounded-full transition-colors ${strength.score >= 4 ? strength.color : 'bg-gray-800'}`} />
                </div>

                <div className="text-[10px] text-gray-500 font-mono tracking-wide leading-relaxed space-y-1">
                  <div className={password.length >= 16 ? 'text-[#4CAF7D]' : 'text-[#E85454]'}>
                    {password.length >= 16 ? '✓ length is at least 16 characters' : '✗ Password requires minimum 16 characters'}
                  </div>
                  <div>* Incorporate a combination of upper/lower, numbers, and symbols.</div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">Verify New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password to verify"
                className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] text-xs text-white p-3 rounded-xl outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#5AC2EB] text-[#1A1F2E] font-bold text-xs uppercase tracking-widest rounded-xl cursor-pointer hover:bg-[#5AC2EB]/90 transition-all text-center"
            >
              Update Security Console
            </button>
          </form>

          {/* Backup verification emergency tokens */}
          <div className="pt-4 border-t border-[#2E3543]/60 space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#FDFCFC]/65 tracking-widest">Emergency Bypass Tokens</h4>
            <p className="text-[10px] text-gray-500 leading-relaxed">If 2FA access is completely broken, you may leverage static single-use bypass sheets:</p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono font-bold text-[#5AC2EB]">
              <div className="bg-[#1A1F2E] py-2 border border-[#2E3543] rounded-xl tracking-widest">8841-AURA</div>
              <div className="bg-[#1A1F2E] py-2 border border-[#2E3543] rounded-xl tracking-widest">9921-AURA</div>
            </div>
          </div>
        </div>

        {/* SECURITY AUDIT TIMELINE TABLE */}
        <div className="xl:col-span-7 bg-[#242A3B] border border-[#2E3543]/60 p-6 rounded-2xl shadow-md space-y-5">
          <div className="flex items-center justify-between border-b border-[#2E3543]/40 pb-4 flex-wrap gap-2">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-orange-400">
                Authorized Logs
              </span>
              <h3 className="text-xl font-serif text-white font-bold mt-1">Audit Trail & Security Registry</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClearLogs}
                className="py-2.5 px-4 bg-transparent border border-[#2E3543] hover:bg-white/5 text-xs font-semibold text-white/70 hover:text-white rounded-xl cursor-pointer flex items-center gap-1"
              >
                Clear Registers
              </button>
              <button
                onClick={handleDownloadLogsMock}
                className="py-2.5 px-4 bg-[#5AC2EB] hover:bg-[#5AC2EB]/90 text-[#1A1F2E] text-xs font-bold uppercase rounded-xl cursor-pointer flex items-center gap-1.5"
              >
                <Download size={13} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Table display registers */}
          <div className="max-h-[380px] overflow-y-auto pr-1">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#2E3543]/40 bg-[#1A1F2E]/30 text-[#FDFCFC]/40 text-[10px] uppercase font-bold tracking-wider">
                  <th className="py-2 px-3">Registry Timestamp</th>
                  <th className="py-2 px-3">Event Action</th>
                  <th className="py-2 px-3">Description Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2E3543]/30">
                {logs.map(lg => (
                  <tr key={lg.id} className="hover:bg-white/2 transition-colors">
                    <td className="py-3 px-3 text-gray-500 whitespace-nowrap">{lg.timestamp}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 font-bold ${
                        lg.type === 'alert' ? 'text-[#E85454]' :
                        lg.type === 'success' ? 'text-[#4CAF7D]' :
                        'text-[#5AC2EB]'
                      }`}>
                        {lg.type === 'alert' && '⚠ '}
                        {lg.title}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#FDFCFC]/70 max-w-[240px] truncate" title={lg.description}>
                      {lg.description}
                    </td>
                  </tr>
                ))}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-600 italic">
                      No logs registered.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
