/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  LayoutDashboard,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Settings,
  PlusCircle,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Lock,
  Compass,
  HelpCircleIcon
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAddTransaction: () => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  onOpenAddTransaction,
  isOpenMobile,
  setIsOpenMobile,
  onLogout,
  isAuthenticated
}: SidebarProps) {

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'income', label: 'Pemasukan', icon: ArrowDownLeft },
    { id: 'expenses', label: 'Pengeluaran', icon: ArrowUpRight },
    { id: 'reports', label: 'Laporan Keuangan', icon: TrendingUp },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ] as const;

  const handleTabClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsOpenMobile(false);
  };

  const currentTabStyles = (id: string) => {
    return activeTab === id
      ? 'bg-[#6cf8bb]/15 text-[#006c49] border-l-4 border-[#006c49] font-bold'
      : 'text-[#45474c] hover:bg-[#eff4ff] hover:text-[#0b1c30]';
  };

  const renderContent = () => (
    <div className="flex flex-col h-full p-6 text-[#0b1c30] select-none">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => handleTabClick('landing')}>
        <div className="w-10 h-10 bg-[#091426] flex items-center justify-center rounded-xl text-white shadow-md">
          <span className="font-bold text-lg">Eq</span>
        </div>
        <div>
          <h1 className="font-sans text-lg font-black text-[#091426] leading-none tracking-tight">EquiCount</h1>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#45474c] mt-0.5">Precision Ledger</p>
        </div>
      </div>

      {isAuthenticated ? (
        <>
          {/* Quick Transaction Action Button */}
          <button
            onClick={() => {
              onOpenAddTransaction();
              setIsOpenMobile(false);
            }}
            className="w-full bg-[#091426] hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 mb-6 active:scale-95 transition-all shadow-md"
            id="sidebar-add-transaction-btn-desktop"
          >
            <PlusCircle className="w-4 h-4 text-[#6cf8bb]" />
            Tambah Transaksi
          </button>

          {/* Navigation Links */}
          <nav className="flex-grow space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-150 ease-in-out cursor-pointer text-left ${currentTabStyles(item.id)}`}
                  id={`nav-link-${item.id}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="mt-auto pt-6 border-t border-[#c5c6cd] space-y-1">
            <button
              onClick={() => handleTabClick('help')}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#45474c] hover:text-[#0b1c30] hover:bg-[#eff4ff] rounded-lg transition-all text-left"
              id="sidebar-help-btn"
            >
              <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Pusat Bantuan</span>
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#ba1a1a] hover:bg-red-50 rounded-lg transition-all text-left"
              id="sidebar-logout-btn"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Keluar</span>
            </button>
          </div>
        </>
      ) : (
        <div className="flex-grow flex flex-col justify-between">
          <div className="space-y-4">
            <p className="text-xs text-[#45474c] font-medium leading-relaxed">
              Masuk untuk mengelola keuangan bisnis Anda dengan kendali penuh dan berstandar profesional.
            </p>
            <button
              onClick={() => handleTabClick('auth')}
              className="w-full bg-[#006c49] hover:bg-emerald-800 text-white py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
              id="sidebar-login-prompt-btn"
            >
              <Lock className="w-3.5 h-3.5" />
              Masuk ke Ledger
            </button>
          </div>
          <div className="pt-6 border-t border-[#c5c6cd]">
            <button
              onClick={() => handleTabClick('landing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all text-left ${currentTabStyles('landing')}`}
              id="sidebar-landing-btn"
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>Explore EquiCount</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar: hidden on mobile, fixed width on desktop */}
      <aside
        className="hidden md:flex flex-col h-screen overflow-y-auto w-[280px] shrink-0 bg-white border-r border-[#c5c6cd]"
      >
        {renderContent()}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[60] transition-opacity"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Mobile Sidebar Slide-out */}
      <aside
        className={`md:hidden fixed top-0 bottom-0 left-0 w-[280px] overflow-y-auto bg-white border-r border-[#c5c6cd] z-[70] transform transition-transform duration-300 ease-in-out ${isOpenMobile ? 'translate-x-0' : '-translate-x-full'
          }`}
        id="mobile-sidebar-shell"
      >
        {/* Close Button Inside Slide-out */}
        <button
          onClick={() => setIsOpenMobile(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-[#45474c] hover:text-[#0b1c30]"
        >
          <X className="w-5 h-5" />
        </button>
        {renderContent()}
      </aside>
    </>
  );
}
