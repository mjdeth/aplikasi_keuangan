/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Sparkles,
  CheckCircle2 // Tambahan icon baru
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

// Tambahkan interface untuk struktur Notifikasi
interface AppNotification {
  id: number;
  text: string;
  isNew: boolean;
  timestamp: string;
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

  // 1. Ubah Mock Data menjadi State agar dinamis
  const [notifications, setNotifications] = useState<AppNotification[]>([
    { id: 1, text: "Laporan bulanan Mei telah siap diekspor.", isNew: true, timestamp: "10 menit yang lalu" },
    { id: 2, text: "Gaji Bulanan Pemasaran diset menjadi 'Pending'.", isNew: true, timestamp: "1 jam yang lalu" },
    { id: 3, text: "Selamat bergabung di KasCuan", isNew: false, timestamp: "2 hari yang lalu" }
  ]);

  // Simulasi fetch dari database (Opsional: Aktifkan jika API Backend sudah siap)
  /*
  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/notifications')
        .then(res => res.json())
        .then(data => setNotifications(data))
        .catch(err => console.error(err));
    }
  }, [isAuthenticated]);
  */

  // 2. Kalkulasi notifikasi yang belum dibaca
  const unreadCount = notifications.filter(n => n.isNew).length;

  const getPageTitle = (tab: ActiveTab) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard Finansial';
      case 'income': return 'Arus Kas Masuk (Pemasukan)';
      case 'expenses': return 'Arus Kas Keluar (Pengeluaran)';
      case 'reports': return 'Laporan Keuangan & Laba Rugi';
      case 'settings': return 'Pengaturan Profil & Bisnis';
      case 'help': return "Pusat Bantuan";
      case 'auth': return 'Autentikasi Akun';
      default: return 'KasCuan';
    }
  };

  const handleDropdownItem = (tab: ActiveTab) => {
    setActiveTab(tab);
    setProfileDropdownOpen(false);
  };

  // 3. Fungsi untuk menandai semua notifikasi sudah dibaca
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isNew: false })));
    // TODO: Kirim request ke backend: fetch('/api/notifications/read-all', { method: 'PUT' })
  };

  // 4. Fungsi untuk menandai satu notifikasi saat diklik
  const handleNotificationClick = (id: number) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, isNew: false } : notif))
    );
    // TODO: Kirim request ke backend: fetch(`/api/notifications/${id}/read`, { method: 'PUT' })
  };

  return (
    <header
      className="sticky top-0 right-0 w-full h-[46px] bg-white border-b border-[#c5c6cd] flex items-center justify-between px-6 z-40 select-none shadow-xs"
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
            {/* <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#6cf8bb]/15 border border-[#6cf8bb]/30 rounded-full text-[11px] font-bold text-[#006c49]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premium Admin</span>
            </div> */}

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

                {/* Indikator Merah Dinamis Berdasarkan unreadCount */}
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[14px] h-[14px] bg-[#ba1a1a] rounded-full border-2 border-white flex items-center justify-center text-[8px] font-black text-white px-0.5">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#c5c6cd] rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-[#c5c6cd] flex justify-between items-center bg-slate-50">
                    <span className="font-semibold text-xs text-[#0b1c30]">Notifikasi ({unreadCount})</span>

                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-[10px] text-[#006c49] font-bold cursor-pointer hover:underline flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Tandai Semua Dibaca
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif.id)}
                          className={`p-3 text-xs leading-relaxed transition-colors cursor-pointer relative
                            ${notif.isNew ? 'bg-[#eff4ff]/50 hover:bg-[#eff4ff]' : 'hover:bg-slate-50'}
                          `}
                        >
                          {/* Titik indikator pesan baru */}
                          {notif.isNew && (
                            <span className="absolute left-1.5 top-4 w-1.5 h-1.5 bg-[#006c49] rounded-full"></span>
                          )}

                          <p className={`pl-2 ${notif.isNew ? 'font-semibold text-[#091426]' : 'text-slate-600'}`}>
                            {notif.text}
                          </p>
                          <span className="pl-2 text-[9px] text-slate-400 mt-1 block font-mono">
                            {notif.timestamp}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-400">
                        Tidak ada notifikasi saat ini.
                      </div>
                    )}
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