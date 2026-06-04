/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  Building2, 
  CheckSquare, 
  ArrowRight,
  LogIn
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthViewProps {
  onLoginSuccess: (user: UserProfile, businessName?: string) => void;
  onToast: (msg: string, status?: 'success' | 'error') => void;
}

export default function AuthView({ onLoginSuccess, onToast }: AuthViewProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('budi.santoso@majujaya.com');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Register Form States
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regBusiness, setRegBusiness] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      onToast('Email dan Password wajib dilengkapi!', 'error');
      return;
    }

    // Success Authentication Simulator
    onToast('Sesi Berhasil! Memuat Keuangan UMKM...', 'success');
    
    // Pass back defaults or custom email biography
    onLoginSuccess({
      fullName: loginEmail === 'budi.santoso@majujaya.com' ? 'Budi Santoso' : loginEmail.split('@')[0],
      email: loginEmail,
      role: 'Admin Bisnis',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd6pRN3jnPuz6h0mwwyuNny1yRd1jz-Hxy9QWzMnyO91MDkBwrV7g6T5WzOaveaRS_dxv_RoliGhLlsbozUa87SXSq7a5nvJPwuMGYoHG-BIkK_gm-MWf7iNFGTVBixp_FDvSaQvPGbV9PMGJKe6a5EzlV7Hx4_DMVZlRzQtYMt86P2J9xJDdMO_IjRiYqqcNofjaXd1wfqsJs7AuJEEmvCVAlMbenCvJiff7iCeaBd-uZWKPib6qISk_X28ZFBxHxxImcKHtlIWcI'
    });
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!regFirstName.trim() || !regBusiness.trim() || !regEmail.trim() || !regPassword.trim()) {
      onToast('Lengkapi parameter yang wajib diisi!', 'error');
      return;
    }
    if (!agreeTerms) {
      onToast('Setujui Kebijakan Syarat & Ketentuan hukum kami.', 'error');
      return;
    }

    onToast('Pendaftaran Berhasil! Membuka Dashboard Baru...', 'success');
    
    const fullName = `${regFirstName} ${regLastName}`.trim();
    onLoginSuccess({
      fullName: fullName || 'Humble Owner',
      email: regEmail,
      role: 'Admin Bisnis',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd6pRN3jnPuz6h0mwwyuNny1yRd1jz-Hxy9QWzMnyO91MDkBwrV7g6T5WzOaveaRS_dxv_RoliGhLlsbozUa87SXSq7a5nvJPwuMGYoHG-BIkK_gm-MWf7iNFGTVBixp_FDvSaQvPGbV9PMGJKe6a5EzlV7Hx4_DMVZlRzQtYMt86P2J9xJDdMO_IjRiYqqcNofjaXd1wfqsJs7AuJEEmvCVAlMbenCvJiff7iCeaBd-uZWKPib6qISk_X28ZFBxHxxImcKHtlIWcI'
    }, regBusiness);
  };

  const handleSocialAuth = (provider: string) => {
    onToast(`Menghubungkan dengan kredensial ${provider} aman...`, 'success');
    setTimeout(() => {
      onLoginSuccess({
        fullName: 'Budi Santoso',
        email: 'budi.santoso@majujaya.com',
        role: 'Admin Bisnis',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd6pRN3jnPuz6h0mwwyuNny1yRd1jz-Hxy9QWzMnyO91MDkBwrV7g6T5WzOaveaRS_dxv_RoliGhLlsbozUa87SXSq7a5nvJPwuMGYoHG-BIkK_gm-MWf7iNFGTVBixp_FDvSaQvPGbV9PMGJKe6a5EzlV7Hx4_DMVZlRzQtYMt86P2J9xJDdMO_IjRiYqqcNofjaXd1wfqsJs7AuJEEmvCVAlMbenCvJiff7iCeaBd-uZWKPib6qISk_X28ZFBxHxxImcKHtlIWcI'
      });
    }, 1000);
  };

  return (
    <div className="max-w-[460px] w-full mx-auto space-y-6 select-none animate-in fade-in zoom-in-95 duration-200">
      
      {/* Primary login panel card */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#c5c6cd] shadow-xl space-y-6">
        
        {/* Tab Switching controls */}
        <div className="flex border-b border-[#c5c6cd]">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer text-center ${
              tab === 'login'
                ? 'text-[#091426] border-[#091426]'
                : 'text-slate-400 border-transparent hover:text-slate-600'
            }`}
            id="tab-login-btn"
          >
            Masuk Akun
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer text-center ${
              tab === 'register'
                ? 'text-[#091426] border-[#091426]'
                : 'text-slate-400 border-transparent hover:text-slate-600'
            }`}
            id="tab-register-btn"
          >
            Mulai Daftar Baru
          </button>
        </div>

        {tab === 'login' ? (
          /* Login block form */
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">EMAIL BISNIS</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="nama@perusahaan.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 focus:bg-white border border-[#c5c6cd] focus:border-[#091426] rounded-xl focus:outline-none"
                  id="login-email-input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">KATA SANDI</label>
                <a href="#" onClick={(e) => { e.preventDefault(); onToast('Simulasi reset link terkirim!', 'success'); }} className="text-[10px] text-[#00714d] hover:underline font-semibold font-sans">
                  Lupa Sandi?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 focus:bg-white border border-[#c5c6cd] focus:border-[#091426] rounded-xl focus:outline-none"
                  id="login-password-input"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-xs font-bold py-3 bg-[#091426] hover:bg-slate-800 text-[#6cf8bb] rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md cursor-pointer pt-3.5"
              id="confirm-login-btn"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk ke Dashboard Ledger</span>
            </button>

          </form>
        ) : (
          /* Register block form */
          <form onSubmit={handleRegister} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">NAMA DEPAN</label>
                <input
                  type="text"
                  placeholder="John"
                  value={regFirstName}
                  onChange={(e) => setRegFirstName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 focus:bg-white border border-[#c5c6cd] rounded-xl focus:outline-none"
                  id="reg-first-name-input"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">NAMA BELAKANG</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={regLastName}
                  onChange={(e) => setRegLastName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 focus:bg-white border border-[#c5c6cd] rounded-xl focus:outline-none"
                  id="reg-last-name-input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">NAMA BADAN BISNIS / UMKM</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="PT Maju Bersama Jaya"
                  value={regBusiness}
                  onChange={(e) => setRegBusiness(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 focus:bg-white border border-[#c5c6cd] rounded-xl focus:outline-none"
                  id="reg-business-input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">EMAIL AKTIF</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="admin@perusahaan.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 focus:bg-white border border-[#c5c6cd] rounded-xl focus:outline-none"
                  id="reg-email-input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">BUAT SANDI KEAMANAN</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Minimal 8 Karakter"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 focus:bg-white border border-[#c5c6cd] rounded-xl focus:outline-none"
                  id="reg-password-input"
                />
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="agree-checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 rounded text-[#091426] focus:ring-[#091426] cursor-pointer"
              />
              <label htmlFor="agree-checkbox" className="text-[10px] sm:text-xs text-slate-500 leading-relaxed cursor-pointer select-none">
                Saya menyetujui <span className="text-[#00714d] font-semibold hover:underline">Syarat &amp; Ketentuan</span> serta <span className="text-[#00714d] font-semibold hover:underline">Kebijakan Privasi</span> data EquiCount SME.
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-xs font-bold py-3 bg-[#006c49] hover:bg-emerald-800 text-white rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md cursor-pointer pt-3.5"
              id="confirm-register-btn"
            >
              <span>Mulai Simulator Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

        {/* Third Party Social Auth Section */}
        <div className="space-y-4 pt-1 border-t border-slate-100">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full border-t border-[#c5c6cd]"></div>
            <span className="relative bg-white px-3 text-[10px] text-slate-400 font-bold font-mono uppercase tracking-widest">
              ATAU LANJUTKAN DENGAN
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialAuth('Google')}
              className="flex items-center justify-center gap-2 py-2 px-4 border border-[#c5c6cd] hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              id="social-login-google-btn"
            >
              <img 
                alt="Google" 
                className="w-4 h-4 shrink-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk0ce0-zhDkfKmmqRljYQuBP94JKIZr9rXJnUzYgQ7quRh0ldU_RPULesS1HdPYJoJuwaNtD6kiT28H8rVhn3ymSSNLZkks8sTUJU7ZxvI6KhUUrjPJA9e2TX4R_8DRBDRohQ4VsUKYnx2gdDvX-etxTlhjc4FxX8-H0l5a6zFncSXoVcxIN9hoqE4AC7hi7dOnirV4lkN4ZtlENzKryg_RCTRH07lRgjW15rI7ah0VJ_iIuiCUGwj0C3j6AOIAtc4Xo9sCRhdaGdw" 
              />
              <span className="font-sans text-[11px] font-bold">GOOGLE</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialAuth('Microsoft Office')}
              className="flex items-center justify-center gap-2 py-2 px-4 border border-[#c5c6cd] hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              id="social-login-microsoft-btn"
            >
              <div className="w-4 h-4 bg-[#091426] flex items-center justify-center text-white text-[9px] font-black rounded-xs">
                M
              </div>
              <span className="font-sans text-[11px] font-bold">MICROSOFT</span>
            </button>
          </div>
        </div>

      </div>

      {/* Trust shield indicators badge */}
      <div className="flex items-center justify-center gap-2 text-slate-500">
        <ShieldCheck className="w-4.5 h-4.5 text-[#006c49]" />
        <span className="text-xs font-semibold">Enkripsi Kredensial &amp; Data Standar Perbankan</span>
      </div>

    </div>
  );
}
