/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';
import { UserProfile, ActiveTab } from '../types';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  user: UserProfile;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onLogout: () => void;
  isAuthenticated: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  onToggleMobileSidebar,
  user,
  activeTab,
  setActiveTab,
  onLogout,
  isAuthenticated,
  searchQuery,
  setSearchQuery
}: HeaderProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Notifications Mock
  const mockNotifications = [
    { id: 1, text: "Laporan bulanan Mei telah siap diekspor.", isNew: true },
    { id: 2, text: "Gaji Bulanan Pemasaran diset menjadi 'Pending'.", isNew: false },
    { id: 3, text: "Selamat bergabung di EquiCount SME!", isNew: false }
  ];

  const getPageTitle = (tab: ActiveTab) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard Finansial';
      case 'income': return 'Arus Kas Masuk (Pemasukan)';
      case 'expenses': return 'Arus Kas Keluar (Pengeluaran)';
      case 'reports': return 'Laporan Keuangan & Laba Rugi';
      case 'settings': return 'Pengaturan Profil & Bisnis';
      case 'auth': return 'Autentikasi Akun';
      case 'help': return "Pusat Bantuan"
      default: return 'EquiCount SME';
    }
  };

  const handleDropdownItem = (tab: ActiveTab) => {
    setActiveTab(tab);
    setProfileDropdownOpen(false);
  };

  return (
    <header
      className="sticky top-0 right-0 w-full h-16 bg-white border-b border-[#c5c6cd] flex items-center justify-between px-6 z-40 select-none shadow-xs"
      id="application-header-container"
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-xl text-[#0b1c30] hover:bg-slate-100 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page Title */}
        <h2 className="hidden sm:block text-lg font-bold text-[#091426] font-sans truncate mr-4">
          {getPageTitle(activeTab)}
        </h2>

        {/* Smart Live Filter Search Input */}
        {isAuthenticated && (activeTab === 'dashboard' || activeTab === 'income' || activeTab === 'expenses') && (
          <div className="max-w-xs md:max-w-md w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 text-xs bg-[#eff4ff] hover:bg-slate-100 focus:bg-white border border-[#c5c6cd] focus:border-[#091426] rounded-full focus:outline-none focus:ring-1 focus:ring-[#091426] transition-all font-sans text-[#0b1c30]"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-[#45474c]">
        {isAuthenticated ? (
          <>
            {/* Quick stats on screen */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#6cf8bb]/15 border border-[#6cf8bb]/30 rounded-full text-[11px] font-bold text-[#006c49]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premium Admin</span>
            </div>

            {/* Notification button dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileDropdownOpen(false);
                }}
                className={`p-2 hover:bg-[#eff4ff] hover:text-[#0b1c30] rounded-full relative transition-all ${notificationsOpen ? 'bg-[#eff4ff] text-[#0b1c30]' : ''}`}
                title="Notifications"
              >
                <Bell className="w-5 h-5 shrink-0" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#c5c6cd] rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-[#c5c6cd] flex justify-between items-center bg-slate-50">
                    <span className="font-semibold text-xs text-[#0b1c30]">Notifikasi Terbaru</span>
                    <span className="text-[10px] text-[#006c49] font-bold cursor-pointer hover:underline">Tandai Baca</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                    {mockNotifications.map((notif) => (
                      <div key={notif.id} className="p-3 text-xs leading-relaxed hover:bg-[#eff4ff] transition-colors cursor-pointer">
                        <p className={notif.isNew ? 'font-semibold text-slate-800' : 'text-slate-600'}>
                          {notif.text}
                        </p>
                        <span className="text-[9px] text-slate-400 mt-1 block">1 jam yang lalu</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Help Button */}
            <button
              onClick={() => setActiveTab('help')}
              className="p-2 hover:bg-[#eff4ff] hover:text-[#0b1c30] rounded-full hidden sm:block transition-all"
              title="Help Center"
            >
              <HelpCircle className="w-5 h-5 shrink-0" />
            </button>

            {/* Divider */}
            <div className="h-6 w-[1px] bg-slate-300 hidden sm:block" />

            {/* User Profile Avatar with dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-full md:rounded-xl transition-all border border-transparent hover:border-[#c5c6cd] cursor-pointer"
                id="header-user-profile-dropdown-trigger"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-8 h-8 rounded-full border border-slate-300 shrink-0 object-cover"
                />
                <div className="hidden md:block text-left pr-1 select-none">
                  <p className="text-xs font-bold text-[#0b1c30] leading-tight truncate max-w-[110px]">{user.fullName}</p>
                  <p className="text-[10px] text-slate-500 font-mono tracking-tighter leading-none">{user.role}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 invisible md:visible" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#c5c6cd] rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-[#c5c6cd]">
                    <p className="font-bold text-xs text-[#0b1c30]">{user.fullName}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => handleDropdownItem('settings')}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-[#eff4ff] hover:text-[#0b1c30] text-slate-700 flex items-center gap-2.5 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Profil Saya</span>
                    </button>
                    <button
                      onClick={() => handleDropdownItem('settings')}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-[#eff4ff] hover:text-[#0b1c30] text-slate-700 flex items-center gap-2.5 transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Pengaturan Bisnis</span>
                    </button>
                  </div>
                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        onLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-red-50 text-[#ba1a1a] flex items-center gap-2.5 transition-colors font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5 text-[#ba1a1a]" />
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('auth')}
              className="text-xs font-semibold text-[#091426] px-4 py-2 rounded-xl border border-[#c5c6cd] hover:bg-slate-50 transition-colors"
            >
              Masuk
            </button>
            <button
              onClick={() => {
                setActiveTab('auth');
                // Auto switch register triggers can be stimulated.
              }}
              className="text-xs font-semibold bg-[#091426] hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              Mulai Gratis
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
