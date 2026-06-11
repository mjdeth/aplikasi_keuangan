/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
  FileSpreadsheet,
  FileText,
  Clock,
  Wallet,
  CheckCircle,
  Activity
} from 'lucide-react';
import { ActiveTab } from '../types';

interface LandingPageProps {
  onJoinDemo: () => void;
  onGoToAuth: () => void;
  onOpenLegal: (tab: 'terms' | 'privacy') => void;
}

export default function LandingPage({ onJoinDemo, onGoToAuth, onOpenLegal }: LandingPageProps) {
  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0b1c30] select-none font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-6 md:px-12 xl:px-24 bg-gradient-to-b from-[#e5eeff] via-[#f8f9ff] to-[#f8f9ff] overflow-hidden">
        {/* Subtle decorative mesh blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6cf8bb]/10 blur-3xl rounded-full -z-10 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#dce9ff]/40 blur-3xl rounded-full -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-3 bg-[#6cf8bb]/25 border border-[#6cf8bb] rounded-full">
              <span className="w-1.5 h-1.5 bg-[#006c49] rounded-full animate-ping" />
              <span className="text-[10px] font-bold text-[#005236] uppercase tracking-wider font-mono">SOLUSI KEUANGAN UMKM TERKINI</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#091426] tracking-tight leading-[1.1]">
              Kelola Keuangan UMKM Lebih <span className="text-[#006c49]">Mudah &amp; Profesional</span>
            </h1>

            <p className="text-sm sm:text-base text-[#45474c] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Tinggalkan pencatatan manual di kertas atau Excel rumit. EquiCount membantu pemilik usaha mengelola arus kas, laporan laba rugi otomatis, hingga ekspor data secara presisi dan aman.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onJoinDemo}
                className="w-full sm:w-auto bg-[#091426] hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                id="landing-hero-join-demo-btn"
              >
                <span>Lihat Panduan Demo</span>
                <ArrowRight className="w-4 h-4 text-[#6cf8bb]" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onGoToAuth}
                className="w-full sm:w-auto bg-white border border-[#c5c6cd] hover:border-slate-500 text-slate-800 font-bold py-4 px-8 rounded-xl text-sm transition-all cursor-pointer"
                id="landing-hero-go-auth-btn"
              >
                Mulai Daftar Gratis
              </motion.button>
            </div>
          </motion.div>

          {/* Right Showcase Mockup Screen Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex-1 relative w-full"
          >
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#6cf8bb]/15 blur-2xl rounded-full pointer-events-none" />

            {/* The beautiful template mockup card */}
            <div className="relative p-3 bg-white/70 backdrop-blur-md rounded-[24px] border border-slate-200 shadow-2xl overflow-hidden transition-all duration-500 hover:rotate-1">
              <img
                className="rounded-2xl shadow-inner w-full h-auto object-cover border border-slate-100"
                alt="EquiCount Dashboard Interface on High-end Laptop Screen"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlgOveufStjWsQ0R6CfCrtya9uGvmJ0Ab6WeqveRF98tsT3BgQMW11jJA2XHqU1MokoX94lFmy0_Qaz7ZcOrbN7fhaMg2uU9OzF32aBTH7VM6dpPZMXqFaZg_bHRbmirFxFjN7d3TqmKiwnJGYdwBlSmN665oiKvqi-N7P3aApG0WYFD_cM6cT4fwKxnAkjANTXCc1dQQl0Lyn11SZFUZ_zBBURT2cKmPiub1WnStBxFWP1M8tsADd0Zy9q9Xnv9B3KT21Bt0t3zJ8"
              />

              {/* Overlapping badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#091426]/95 backdrop-blur-md p-4 rounded-xl text-white border border-slate-700/50 hidden sm:flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#6cf8bb] uppercase font-bold">Laporan Real-time</span>
                  <h4 className="text-xs font-bold text-slate-100 mt-0.5">Saldo Terkonsolidasi Aman &amp; Akurat</h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#6cf8bb] font-bold">
                  <span className="w-1.5 h-1.5 bg-[#6cf8bb] rounded-full animate-pulse" />
                  <span>Sistem Enkripsi Perbankan</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Bento Grid Section */}
      <section className="py-20 px-6 sm:px-12 xl:px-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#091426] tracking-tight">
              Fitur Unggulan Untuk Kendali Finansial Penuh
            </h2>
            <p className="text-sm sm:text-base text-[#45474c] max-w-2xl mx-auto leading-relaxed">
              Semua amunisi pembukuan bisnis yang Anda butuhkan tanpa keribetan akuntansi tradisional, disesuaikan penuh dengan standar UMKM Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]" id="landing-bento-grid">

            {/* Bento Card 1: Pemasukan & Pengeluaran (Span 8) */}
            <motion.div
              whileHover={{ border: '1px solid #091426' }}
              className="md:col-span-8 p-6 sm:p-8 bg-[#f8f9ff] border border-slate-200 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group"
              // onClick={onJoinDemo}
              id="landing-bento-card-1"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-[#e5eeff] text-[#091426] rounded-xl group-hover:bg-[#006c49] group-hover:text-white transition-colors">
                  <Wallet className="w-6 h-6 shrink-0" />
                </div>
                <span className="text-[10px] font-bold bg-[#6cf8bb]/30 text-[#005236] px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                  TERPOPULER
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[#091426]">Pencatatan Pemasukan &amp; Pengeluaran Instan</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
                  Catat setiap transaksi masuk dan keluar secara seketika. Kategorisasi otomatis memandu Anda memantau ke mana perginya setiap rupiah operasional bisnis.
                </p>
              </div>
            </motion.div>

            {/* Bento Card 2: Laporan Otomatis (Span 4) */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="md:col-span-4 p-6 sm:p-8 bg-[#091426] text-white rounded-2xl flex flex-col justify-between hover:bg-slate-950 transition-colors cursor-pointer group"
              // onClick={onJoinDemo}
              id="landing-bento-card-2"
            >
              <div className="p-3 bg-[#1e293b] text-[#6cf8bb] rounded-xl w-fit group-hover:text-white transition-colors">
                <TrendingUp className="w-5 h-5 shrink-0" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Laporan Keuangan Otomatis</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Laba Rugi, Perubahan Modal, dan ringkasan Neraca tersaji instan dalam satu klik. Akurat dan siap cetak.
                </p>
              </div>
            </motion.div>

            {/* Bento Card 3: Excel CSV Export (Span 4) */}
            <motion.div
              whileHover={{ border: '2px dashed #006c49', backgroundColor: '#f0fff4' }}
              className="md:col-span-4 p-6 sm:p-8 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col justify-between transition-all cursor-pointer group"
              // onClick={onJoinDemo}
              id="landing-bento-card-3"
            >
              <div className="p-3 bg-slate-50 text-[#006c49] border border-[#6cf8bb]/30 rounded-xl w-fit group-hover:bg-[#6cf8bb]/15 transition-colors">
                <Download className="w-5 h-5 shrink-0" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#091426]">Ekspor Excel &amp; CSV</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Butuh pengolahan data lebih mendalam atau audit kantor pajak? Ekspor daftar transaksi Anda langsung ke format Excel secara terstruktur dan rapi.
                </p>
              </div>
            </motion.div>

            {/* Bento Card 4: High density table with preview (Span 8) */}
            <div
              className="md:col-span-8 p-6 sm:p-8 bg-[#eff4ff] border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-6 items-center overflow-hidden"
              id="landing-bento-card-4"
            >
              <div className="flex-1 space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-[#091426]">Tabel Arus Kas Berpresisi Tinggi</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Didesain untuk menangani ribuan baris data transaksi keuangan UMKM Anda dengan performa super ringan dan keterbacaan yang sangat jernih.
                </p>
                <div className="flex gap-1.5 pt-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]" title="Selesai" />
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400" title="Proses" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]" title="Gagal" />
                </div>
              </div>

              {/* Styled Mock table */}
              <div className="flex-1 w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200 transform scale-102 translate-y-3 sm:translate-x-4">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400">
                      <th className="pb-1.5 font-semibold">TGL</th>
                      <th className="pb-1.5 font-semibold">KETERANGAN</th>
                      <th className="pb-1.5 font-semibold text-right">NOMINAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 font-medium text-slate-500">12/10</td>
                      <td className="py-2 font-semibold text-slate-700">Stok Bahan Baku</td>
                      <td className="py-2 text-right text-[#ba1a1a] font-bold">- Rp 2,5 jt</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-slate-500">12/10</td>
                      <td className="py-2 font-semibold text-slate-700">Penjualan Retail</td>
                      <td className="py-2 text-right text-[#006c49] font-bold">+ Rp 8,2 jt</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-slate-500">11/10</td>
                      <td className="py-2 font-semibold text-slate-700">Biaya Listrik</td>
                      <td className="py-2 text-right text-[#ba1a1a] font-bold">- Rp 450 rb</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 sm:px-12 xl:px-24 bg-white select-none">
        <div className="max-w-5xl mx-auto bg-[#091426] rounded-3xl p-8 sm:p-16 relative overflow-hidden text-center flex flex-col items-center shadow-2xl">
          {/* Gradients decorations */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6cf8bb]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00275b]/30 blur-[100px] rounded-full pointer-events-none" />

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 relative z-10 tracking-tight leading-snug">
            Siap Mengontrol Pertumbuhan Bisnis Anda?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mb-8 relative z-10 leading-relaxed mx-auto">
            Daftar sekarang dan nikmati simulasi pembukuan profesional gratis dengan performa tinggi. Tanpa komitmen keuangan apa pun.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              onClick={onJoinDemo}
              className="w-full sm:w-auto bg-[#6cf8bb] hover:bg-emerald-300 text-slate-900 font-bold px-8 py-4 rounded-xl text-sm shadow-md transition-colors cursor-pointer"
            >
              Mulai Simulator Akun Gratis
            </motion.button>
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              onClick={onGoToAuth}
              className="w-full sm:w-auto bg-[#1e293b] border border-slate-700 hover:bg-[#2c3e50] text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors cursor-pointer"
            >
              Registrasi Bisnis Baru
            </motion.button>
          </div>
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="bg-[#eff4ff] border-t border-slate-200 py-12 px-6 sm:px-12 xl:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#45474c]">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-extrabold text-[#091426] tracking-tight text-sm">EquiCount SME</span>
            <p className="text-center md:text-left leading-relaxed">
              © 2026 EquiCount SME. Menghadirkan Pembukuan Presisi Tinggi untuk Pelaku Usaha Indonesia.
            </p>
          </div>
          <div className="flex gap-6 font-semibold cursor-pointer">
            <span onClick={() => onOpenLegal('terms')} className="hover:text-[#0b1c30] transition-colors">Syarat &amp; Ketentuan</span>
            <span onClick={() => onOpenLegal('privacy')} className="hover:text-[#0b1c30] transition-colors">Kebijakan Privasi</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0b1c30] transition-colors">Hubungi Kami</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
