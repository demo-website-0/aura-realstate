import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Lock, Smartphone, ShieldAlert, KeyRound, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(() => {
    return Number(localStorage.getItem('aura_failed_attempts') || '0');
  });
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(() => {
    const stored = localStorage.getItem('aura_lockout_until');
    return stored ? Number(stored) : null;
  });
  const [remainingLockTime, setRemainingLockTime] = useState(0);

  // 2FA Fields
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [otpExpiry, setOtpExpiry] = useState(30);
  const [otpCode, setOtpCode] = useState('123456');
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Periodically refresh the simulated TOTP token
  useEffect(() => {
    const timer = setInterval(() => {
      setOtpExpiry((prev) => {
        if (prev <= 1) {
          // Regenerate dynamic simulated token
          const newCode = String(Math.floor(100000 + Math.random() * 900000));
          setOtpCode(newCode);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Countdown for brute-force lockouts
  useEffect(() => {
    if (!lockoutUntil) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((lockoutUntil - Date.now()) / 1000));
      setRemainingLockTime(remaining);
      if (remaining === 0) {
        setLockoutUntil(null);
        setFailedAttempts(0);
        localStorage.removeItem('aura_lockout_until');
        localStorage.setItem('aura_failed_attempts', '0');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutUntil]);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (lockoutUntil && Date.now() < lockoutUntil) {
      return;
    }

    // Load admin credentials from localStorage or fallback to secure defaults
    const storedCreds = JSON.parse(
      localStorage.getItem('aura_admin_creds') ||
        JSON.stringify({ username: 'auraowner', password: 'AuraSecurePass2026!' })
    );

    if (username === storedCreds.username && password === storedCreds.password) {
      setStep(2);
      setFailedAttempts(0);
      localStorage.setItem('aura_failed_attempts', '0');
    } else {
      const nextFailures = failedAttempts + 1;
      setFailedAttempts(nextFailures);
      localStorage.setItem('aura_failed_attempts', String(nextFailures));

      // Append security alert logging
      const existingLogs = JSON.parse(localStorage.getItem('aura_security_logs') || '[]');
      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        type: 'alert',
        title: 'Failed Login Attempt',
        description: `IP: 103.45.2.x · Incorrect credentials offered for username "${username}"`,
        ip: '103.45.2.14',
        location: 'Dhaka, Bangladesh',
        browser: 'Chrome / Windows'
      };
      localStorage.setItem('aura_security_logs', JSON.stringify([newLog, ...existingLogs]));

      if (nextFailures >= 10) {
        const lockDuration = 24 * 60 * 60 * 1000; // 24 hours
        const until = Date.now() + lockDuration;
        setLockoutUntil(until);
        localStorage.setItem('aura_lockout_until', String(until));
        setErrorMsg('Security breach threshold triggered. IP banned.');
      } else if (nextFailures >= 5) {
        const lockDuration = 2 * 60 * 60 * 1000; // 2 hours
        const until = Date.now() + lockDuration;
        setLockoutUntil(until);
        localStorage.setItem('aura_lockout_until', String(until));
        setErrorMsg('Too many failures. Locked out for 2 hours.');
      } else if (nextFailures >= 3) {
        const lockDuration = 15 * 60 * 1000; // 15 mins
        const until = Date.now() + lockDuration;
        setLockoutUntil(until);
        localStorage.setItem('aura_lockout_until', String(until));
        setErrorMsg('Too many failures. Access restricted for 15 minutes.');
      } else {
        setErrorMsg(`Invalid credentials. ${3 - nextFailures} attempts remaining before temporary lockout.`);
      }
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return; // Only numbers
    const updatedOtp = [...otp];
    updatedOtp[index] = val.slice(-1);
    setOtp(updatedOtp);

    // Auto-advance
    if (val !== '' && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otp.join('');

    // Accept either the live rolling mock code or static correct passcode 123456
    if (enteredCode === otpCode || enteredCode === '123456') {
      // Append successful logging
      const existingLogs = JSON.parse(localStorage.getItem('aura_security_logs') || '[]');
      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        type: 'success',
        title: 'Login Successful',
        description: 'Authorized Admin console entry secured via 2FA verification',
        ip: '103.45.2.14',
        location: 'Dhaka, Bangladesh',
        browser: 'Chrome / Windows'
      };
      localStorage.setItem('aura_security_logs', JSON.stringify([newLog, ...existingLogs]));

      onLoginSuccess();
    } else {
      setErrorMsg('Invalid 2FA code verification failed.');
      setOtp(Array(6).fill(''));
      otpInputsRef.current[0]?.focus();
    }
  };

  // Render Lockout overlay state
  if (lockoutUntil && remainingLockTime > 0) {
    return (
      <div className="min-h-screen bg-[#1A1F2E] flex items-center justify-center p-6 text-[#FDFCFC] font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-[#242A3B] border border-[#E85454]/30 rounded-3xl p-8 text-center shadow-2xl space-y-6"
        >
          <div className="w-16 h-16 bg-[#E85454]/10 rounded-full flex items-center justify-center mx-auto text-[#E85454]">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-serif text-[#FDFCFC]">Access Temporarily Locked</h2>
          <p className="text-[#FDFCFC]/60 text-sm">
            Due to too many failed credential attempts, administrative gate locks are triggered. Please wait for cool-down timer.
          </p>
          <div className="bg-[#1A1F2E] py-4 rounded-2xl border border-[#2E3543]">
            <span className="text-xs text-[#FDFCFC]/40 uppercase tracking-widest block mb-1">Unlocking In</span>
            <span className="font-mono text-3xl font-semibold text-[#F5A623]">
              {Math.floor(remainingLockTime / 60)}m {remainingLockTime % 60}s
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2E] flex items-center justify-center p-6 text-[#FDFCFC] font-sans relative overflow-hidden">
      {/* Subtle bokeh slow drift gradient */}
      <div className="absolute w-[400px] h-[400px] bg-[#5AC2EB]/5 rounded-full blur-[100px] top-1/4 left-1/4 animate-pulse pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] bg-[#8BACBA]/3 rounded-full blur-[100px] bottom-1/4 right-1/4 animate-pulse pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-[480px] bg-[#242A3B] border border-[#5AC2EB]/15 rounded-3xl p-8 sm:p-10 shadow-[0_24px_85px_rgba(0,0,0,0.5)] z-10"
      >
        {step === 1 ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-[#5AC2EB]/10 rounded-full flex items-center justify-center mx-auto text-[#5AC2EB]">
                <Lock size={22} className="stroke-[1.5]" />
              </div>
              <h2 className="text-2xl font-serif tracking-wide text-[#FDFCFC]">Secure Access</h2>
              <p className="text-xs text-[#FDFCFC]/45 uppercase tracking-[0.15em]">Authorized personnel only.</p>
            </div>

            {errorMsg && (
              <div className="p-4 bg-[#E85454]/10 border border-[#E85454]/30 rounded-xl text-xs text-[#E85454] leading-relaxed">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase tracking-wider mb-2">Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] rounded-2xl py-3 px-4 text-sm text-[#FDFCFC] outline-none transition-all focus:ring-4 focus:ring-[#5AC2EB]/10"
                  placeholder="Enter unique username"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#FDFCFC]/60 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] rounded-2xl py-3 pl-4 pr-12 text-sm text-[#FDFCFC] outline-none transition-all focus:ring-4 focus:ring-[#5AC2EB]/10"
                    placeholder="Enter security password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FDFCFC]/40 hover:text-[#5AC2EB] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5AC2EB] hover:bg-[#5AC2EB]/90 text-[#1A1F2E] font-bold tracking-widest text-xs uppercase py-4 rounded-2xl shadow-lg transition-all text-center cursor-pointer hover:-translate-y-0.5"
            >
              Continue →
            </button>

            {/* Sandbox simulation guidelines for safety */}
            <div className="pt-4 border-t border-[#2E3543]/60 text-center">
              <span className="text-[11px] text-[#FDFCFC]/40 block mb-1">SIMULATED DEMO DEV CREDS:</span>
              <p className="text-[11px] font-mono text-[#5AC2EB]">
                owner: <span className="text-[#FDFCFC]">auraowner</span> | pass: <span className="text-[#FDFCFC]">AuraSecurePass2026!</span>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-[#5AC2EB]/10 rounded-full flex items-center justify-center mx-auto text-[#5AC2EB]">
                <Smartphone size={22} className="stroke-[1.5]" />
              </div>
              <h2 className="text-2xl font-serif tracking-wide text-[#FDFCFC]">One More Step</h2>
              <p className="text-sm text-[#FDFCFC]/60">Enter the 6-digit code from your authenticator app.</p>
            </div>

            {errorMsg && (
              <div className="p-4 bg-[#E85454]/10 border border-[#E85454]/30 rounded-xl text-xs text-[#E85454] leading-relaxed">
                {errorMsg}
              </div>
            )}

            {/* Six Otp Box Fields */}
            <div className="flex justify-between gap-2 py-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { otpInputsRef.current[i] = el; }}
                  type="text"
                  maxLength={1}
                  required
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 sm:w-14 h-16 bg-[#1A1F2E] border border-[#2E3543] focus:border-[#5AC2EB] rounded-2xl text-center text-xl font-bold text-[#FDFCFC] outline-none transition-all focus:ring-4 focus:ring-[#5AC2EB]/10"
                />
              ))}
            </div>

            {/* Expiry Bar Countdown */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs text-[#FDFCFC]/45">
                <span>Authenticating cycle</span>
                <span>Code cycles in {otpExpiry}s</span>
              </div>
              <div className="h-1 bg-[#1A1F2E] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#5AC2EB] transition-all duration-1000 ease-linear"
                  style={{ width: `${(otpExpiry / 30) * 100}%` }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5AC2EB] hover:bg-[#5AC2EB]/90 text-[#1A1F2E] font-bold tracking-widest text-xs uppercase py-4 rounded-2xl shadow-lg transition-all text-center cursor-pointer hover:-translate-y-0.5"
            >
              Verify & Enter →
            </button>

            <button
              type="button"
              onClick={() => { setStep(1); setOtp(Array(6).fill('')); setErrorMsg(''); }}
              className="w-full text-center text-[#5AC2EB]/60 hover:text-[#5AC2EB] text-xs transition-colors"
            >
              ← Use different credentials
            </button>

            {/* Sandbox helper simulation displaying authenticator code directly on screen */}
            <div className="pt-4 border-t border-[#2E3543]/60 text-center">
              <span className="text-[11px] text-[#FDFCFC]/40 block mb-1">MOCK SEED AUTHENTICATOR CODE:</span>
              <p className="text-sm font-mono font-semibold text-[#5AC2EB] tracking-widest">{otpCode}</p>
              <p className="text-[10px] text-[#FDFCFC]/30 mt-1">(Enter the live token above or bypass with "123456")</p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
