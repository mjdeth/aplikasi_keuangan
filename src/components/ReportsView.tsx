/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import {
  TrendingUp,
  Download,
  HelpCircle,
  FileSpreadsheet,
  ChevronRight,
  Award,
  Receipt,
  Scale,
  Calendar,
  Filter,
  CheckCircle,
  RefreshCw,
  Info
} from 'lucide-react';
import { Transaction } from '../types';

interface ReportsViewProps {
  transactions: Transaction[];
  onToast: (msg: string, status?: 'success' | 'error') => void;
}

export default function ReportsView({ transactions, onToast }: ReportsViewProps) {
  // Set default ke tahun berjalan agar otomatis relevan
  const currentYear = new Date().getFullYear();
  const [fromDate, setFromDate] = useState(`${currentYear}-01-01`);
  const [toDate, setToDate] = useState(`${currentYear}-12-31`);

  const [isExportingLabaRugi, setIsExportingLabaRugi] = useState(false);
  const [isExportingModal, setIsExportingModal] = useState(false);

  // State baru untuk menyimpan informasi bulan yang sedang diklik pada grafik
  const [selectedMonthInfo, setSelectedMonthInfo] = useState<{ month: string, laba: number } | null>(null);

  // 1. FILTER DINAMIS: Hanya memproses transaksi yang masuk rentang tanggal
  const filteredTx = useMemo(() => {
    return transactions.filter(tx => {
      return tx.date >= fromDate && tx.date <= toDate;
    });
  }, [transactions, fromDate, toDate]);

  // Kalkulasi Pendapatan murni dari database
  const incomeSales = filteredTx
    .filter(tx => tx.type === 'income' && tx.category.includes('PRODUK'))
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const incomeJasa = filteredTx
    .filter(tx => tx.type === 'income' && tx.category.includes('JASA'))
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const incomeLainnya = filteredTx
    .filter(tx => tx.type === 'income' && !tx.category.includes('PRODUK') && !tx.category.includes('JASA'))
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalPendapatan = incomeSales + incomeJasa + incomeLainnya;

  const costOfGoodsSold = filteredTx
    .filter(tx => tx.type === 'expense' && tx.category.includes('HPP'))
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const labaKotor = totalPendapatan - costOfGoodsSold;

  // Kalkulasi Beban Operasional murni
  const bebanOperasional = filteredTx
    .filter(tx => tx.type === 'expense' && !tx.category.includes('HPP') && !tx.category.includes('PRIVE'))
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const labaBersihTotal = labaKotor - bebanOperasional;

  // Kalkulasi Modal
  const modalAwal = 0;
  const priveDividenVal = filteredTx
    .filter(tx => tx.type === 'expense' && tx.category.includes('PRIVE'))
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const modalAkhir = modalAwal + labaBersihTotal - priveDividenVal;

  const formatIDRLabs = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const safePercent = (value: number) => {
    if (totalPendapatan === 0) return '0.0%';
    return `${((value / totalPendapatan) * 100).toFixed(1)}%`;
  };

  // 2. PEMETAAN GRAFIK 12 BULAN DINAMIS
  const monthlyData = useMemo(() => {
    // Array 12 Bulan Lengkap
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    const data = months.map(m => ({ month: m, labaBersih: 0 }));

    // Looping semua transaksi dari database yang sudah difilter
    filteredTx.forEach(tx => {
      // Pastikan format tanggal dimengerti oleh Javascript
      const dateObj = new Date(tx.date);
      const monthIndex = dateObj.getMonth(); // Menghasilkan angka 0 (Jan) s/d 11 (Des)

      if (monthIndex >= 0 && monthIndex <= 11) {
        const amount = Number(tx.amount);
        if (tx.type === 'income') {
          data[monthIndex].labaBersih += amount;
        } else if (tx.type === 'expense' && !tx.category.includes('PRIVE')) {
          data[monthIndex].labaBersih -= amount;
        }
      }
    });

    return data;
  }, [filteredTx]);

  // Kalkulasi titik tertinggi untuk tinggi grafik responsif
  const maxLaba = Math.max(...monthlyData.map(d => Math.abs(d.labaBersih)), 1);

  const handleBarClick = (month: string, laba: number) => {
    setSelectedMonthInfo({ month, laba });
  };

  const handleExportLabaRugi = () => {
    setIsExportingLabaRugi(true);
    onToast('Sedang membuat layout spreadsheet laporan laba rugi...', 'success');

    try {
      const dataLabaRugi = [
        { 'Deskripsi Akun Jurnal': 'Pendapatan Operasional (Kotor)', 'Saldo (IDR)': totalPendapatan, '% Pendapatan': '100%' },
        { 'Deskripsi Akun Jurnal': '  - Penjualan Produk', 'Saldo (IDR)': incomeSales, '% Pendapatan': safePercent(incomeSales) },
        { 'Deskripsi Akun Jurnal': '  - Pendapatan Jasa', 'Saldo (IDR)': incomeJasa, '% Pendapatan': safePercent(incomeJasa) },
        { 'Deskripsi Akun Jurnal': '  - Pendapatan Lainnya', 'Saldo (IDR)': incomeLainnya, '% Pendapatan': safePercent(incomeLainnya) },
        { 'Deskripsi Akun Jurnal': 'Beban Pokok Penjualan (HPP)', 'Saldo (IDR)': costOfGoodsSold, '% Pendapatan': safePercent(costOfGoodsSold) },
        { 'Deskripsi Akun Jurnal': 'LABA KOTOR (GROSS PROFIT)', 'Saldo (IDR)': labaKotor, '% Pendapatan': safePercent(labaKotor) },
        { 'Deskripsi Akun Jurnal': 'Total Beban Operasional Umum & Administrasi', 'Saldo (IDR)': bebanOperasional, '% Pendapatan': safePercent(bebanOperasional) },
        { 'Deskripsi Akun Jurnal': 'LABA BERSIH OPERASIONAL (NET INCOME)', 'Saldo (IDR)': labaBersihTotal, '% Pendapatan': safePercent(labaBersihTotal) },
      ];

      const worksheet = XLSX.utils.json_to_sheet(dataLabaRugi);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Laba Rugi");

      const today = new Date().toISOString().split('T')[0];
      XLSX.writeFile(workbook, `Laporan_Laba_Rugi_${today}.xlsx`);

      onToast('Unduhan Berhasil! Laporan Laba Rugi diekspor.', 'success');
    } catch (error) {
      console.error("Gagal ekspor Laba Rugi:", error);
      onToast('Terjadi kesalahan saat mengekspor laporan.', 'error');
    } finally {
      setIsExportingLabaRugi(false);
    }
  };

  const handleExportChangesModal = () => {
    setIsExportingModal(true);
    onToast('Sedang memproses neraca modal dan laporan laba bersih...', 'success');

    try {
      const dataPerubahanModal = [
        { 'Keterangan': 'Modal Awal', 'Nilai (IDR)': modalAwal },
        { 'Keterangan': 'Penambahan Usaha (Laba Bersih)', 'Nilai (IDR)': labaBersihTotal },
        { 'Keterangan': 'Pengurangan Usaha (Prive / Dividen)', 'Nilai (IDR)': -priveDividenVal },
        { 'Keterangan': 'Modal Akhir Perusahaan', 'Nilai (IDR)': modalAkhir },
      ];

      const worksheet = XLSX.utils.json_to_sheet(dataPerubahanModal);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Perubahan Modal");

      const today = new Date().toISOString().split('T')[0];
      XLSX.writeFile(workbook, `Laporan_Perubahan_Modal_${today}.xlsx`);

      onToast('Unduhan Berhasil! Laba Bersih & Perubahan Modal terekspor.', 'success');
    } catch (error) {
      console.error("Gagal ekspor Perubahan Modal:", error);
      onToast('Terjadi kesalahan saat mengekspor laporan.', 'error');
    } finally {
      setIsExportingModal(false);
    }
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">

      {/* 3. MENGEMBALIKAN DATE FILTER BAR YANG HILANG */}
      <div className="bg-white p-4 rounded-2xl border border-[#c5c6cd] shadow-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="text-xs font-bold text-[#091426]">Rentang Periode Laporan</h4>
          <p className="text-[10px] text-slate-400">Pilih rentang tanggal untuk menganalisis data transaksi</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 border border-[#c5c6cd] rounded-xl px-3 py-1.5 bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex flex-col text-left">
              <span className="text-[8px] font-mono font-bold text-slate-400">DARI</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="p-0 border-none bg-transparent text-[11px] font-bold focus:ring-0 leading-none h-[14px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 border border-[#c5c6cd] rounded-xl px-3 py-1.5 bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex flex-col text-left">
              <span className="text-[8px] font-mono font-bold text-slate-400">SAMPAI</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="p-0 border-none bg-transparent text-[11px] font-bold focus:ring-0 leading-none h-[14px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">

        {/* Chart Section: Laba Bersih Trend (Span 8) */}
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl border border-[#c5c6cd] flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-sm font-bold text-[#091426]">Tren Laba Bersih Bulanan</h3>
              <p className="text-[10px] text-slate-400">Klik pada grafik batang untuk melihat detail laba per bulan</p>
            </div>

            {selectedMonthInfo ? (
              <div className="text-right animate-in fade-in slide-in-from-top-2">
                <p className="text-[10px] font-bold text-[#006c49] font-mono uppercase">Info {selectedMonthInfo.month}</p>
                <p className={`text-sm font-black font-mono ${selectedMonthInfo.laba < 0 ? 'text-[#ba1a1a]' : 'text-[#091426]'}`}>
                  {formatIDRLabs(selectedMonthInfo.laba)}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#6cf8bb]/15 border border-[#6cf8bb]/30 rounded-full text-[10px] font-bold text-[#006c49]">
                <span className="w-1.5 h-1.5 bg-[#006c49] rounded-full animate-pulse" />
                <span>Sync Database AKTIF</span>
              </div>
            )}
          </div>

          <div className="h-[210px] w-full flex items-end gap-2 px-1">
            {monthlyData.map((data, index) => {
              // Jika laba negatif atau 0, berikan tinggi minimal agar batang tetap bisa di-klik
              const barHeightPercentage = Math.max((Math.abs(data.labaBersih) / maxLaba) * 100, 5);
              const isActive = selectedMonthInfo?.month === data.month;
              const isMinus = data.labaBersih < 0;

              return (
                <div
                  key={index}
                  onClick={() => handleBarClick(data.month, data.labaBersih)}
                  className={`flex-1 rounded-t-lg transition-all cursor-pointer group relative flex flex-col justify-end
                    ${isActive
                      ? (isMinus ? 'bg-[#ba1a1a] opacity-100 scale-y-105' : 'bg-[#006c49] opacity-100 scale-y-105')
                      : (isMinus ? 'bg-red-100 hover:bg-red-300' : 'bg-slate-100 hover:bg-[#6cf8bb]/40')}
                  `}
                  style={{ height: `${barHeightPercentage}%` }}
                >
                  <div className={`absolute -top-9 left-1/2 -translate-x-1/2 bg-[#091426] text-white text-[9px] py-1 px-1.5 rounded-lg transition-all shadow-md pointer-events-none whitespace-nowrap z-10
                      ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                  `}>
                    {data.month}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Label 12 Bulan Di Bawah Grafik */}
          <div className="flex justify-between mt-3 px-1 text-[9px] font-bold font-mono text-center">
            {monthlyData.map((data, index) => (
              <span
                key={index}
                className={`flex-1 ${selectedMonthInfo?.month === data.month ? 'text-[#006c49] font-extrabold' : 'text-slate-400'}`}
              >
                {data.month.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 grid grid-rows-2 gap-6">
          {/* Card: Laba Bersih Dynamic */}
          <div className={`text-white p-6 rounded-2xl border flex flex-col justify-center transition-colors ${labaBersihTotal < 0 ? 'bg-[#ba1a1a] border-red-900' : 'bg-[#091426] border-[#091426]'}`}>
            <span className="text-[10px] font-mono font-bold text-white/70 uppercase tracking-widest">LABA BERSIH TOTAL</span>
            <div className="text-lg sm:text-xl font-black text-white mt-1.5 font-mono">
              {formatIDRLabs(labaBersihTotal)}
            </div>
            <div className={`flex items-center gap-1 mt-2.5 text-xs font-bold ${labaBersihTotal < 0 ? 'text-red-200' : 'text-[#6cf8bb]'}`}>
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>Berdasarkan rentang tanggal</span>
            </div>
          </div>

          {/* Card: Equity Health Ratio */}
          <div className="bg-white p-6 rounded-2xl border border-[#c5c6cd] flex flex-col justify-center relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-slate-50 rounded-full -mr-8 -mt-8 -z-10 pointer-events-none" />
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">MARGIN LABA BERSIH</span>
            <div className="text-lg sm:text-xl font-black text-[#0b1c30] mt-1.5 font-mono">
              {safePercent(labaBersihTotal)}
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-2.5">
              Rasio efisiensi perolehan laba dari total pendapatan
            </div>
          </div>
        </div>

      </div>

      {/* SISA TABEL DI BAWAHNYA TETAP SAMA SEPERTI KODE ANDA SEBELUMNYA */}
      <section className="bg-white rounded-2xl border border-[#c5c6cd] shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 flex flex-col sm:flex-row justify-between items-center border-b border-[#c5c6cd] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#e5eeff] text-[#091426] rounded-xl">
              <Receipt className="w-5 h-5 shrink-0" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#091426] tracking-tight">Laporan Laba Rugi Perusahaan</h3>
              <p className="text-[10px] text-slate-400">Laporan operasional komprehensif dikalkulasi real-time dari Database</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleExportLabaRugi}
            disabled={isExportingLabaRugi}
            className="px-4 py-2 bg-[#006c49] hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer w-full sm:w-auto"
          >
            {isExportingLabaRugi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
            <span>Export Laba Rugi</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse select-text py-2">
            <thead>
              <tr className="bg-slate-50 border-b border-[#c5c6cd] text-[10px] font-bold text-slate-400 font-mono tracking-wider">
                <th className="px-6 py-3">DESKRIPSI AKUN JURNAL</th>
                <th className="px-6 py-3 text-right">SALDO (IDR)</th>
                <th className="px-6 py-3 text-right">% PENDAPATAN</th>
              </tr>
            </thead>
            <tbody className="text-xs">

              <tr className="bg-slate-50/50 font-bold border-b border-[#c5c6cd] text-[#091426]">
                <td className="px-6 py-3">Pendapatan Operasional (Kotor)</td>
                <td className="px-6 py-3 text-right font-mono">{formatIDRLabs(totalPendapatan)}</td>
                <td className="px-6 py-3 text-right font-mono">100%</td>
              </tr>
              <tr className="border-b border-slate-150 hover:bg-slate-50/20 transition-colors">
                <td className="px-6 py-2.5 pl-12 text-slate-500 italic">Penjualan Produk</td>
                <td className="px-6 py-2.5 text-right font-mono text-slate-600">{formatIDRLabs(incomeSales)}</td>
                <td className="px-6 py-2.5 text-right font-mono text-slate-400">{safePercent(incomeSales)}</td>
              </tr>
              <tr className="border-b border-slate-150 hover:bg-slate-50/20 transition-colors">
                <td className="px-6 py-2.5 pl-12 text-slate-500 italic">Pendapatan Jasa</td>
                <td className="px-6 py-2.5 text-right font-mono text-slate-600">{formatIDRLabs(incomeJasa)}</td>
                <td className="px-6 py-2.5 text-right font-mono text-slate-400">{safePercent(incomeJasa)}</td>
              </tr>
              <tr className="border-b border-slate-150 hover:bg-slate-50/20 transition-colors">
                <td className="px-6 py-2.5 pl-12 text-slate-500 italic">Pendapatan Lainnya</td>
                <td className="px-6 py-2.5 text-right font-mono text-slate-600">{formatIDRLabs(incomeLainnya)}</td>
                <td className="px-6 py-2.5 text-right font-mono text-slate-400">{safePercent(incomeLainnya)}</td>
              </tr>

              <tr className="bg-slate-50/50 font-bold border-b border-[#c5c6cd] text-[#091426]">
                <td className="px-6 py-3">Beban Pokok Penjualan (HPP)</td>
                <td className="px-6 py-3 text-right font-mono text-[#ba1a1a]">{formatIDRLabs(costOfGoodsSold)}</td>
                <td className="px-6 py-3 text-right font-mono">{safePercent(costOfGoodsSold)}</td>
              </tr>

              <tr className="bg-[#6cf8bb]/10 text-[#006c49] font-bold border-b border-[#c5c6cd]">
                <td className="px-6 py-3.5 text-sm uppercase tracking-tight">LABA KOTOR (GROSS PROFIT)</td>
                <td className="px-6 py-3.5 text-right font-mono text-sm">{formatIDRLabs(labaKotor)}</td>
                <td className="px-6 py-3.5 text-right font-mono font-black">{safePercent(labaKotor)}</td>
              </tr>

              <tr className="border-b border-[#c5c6cd] hover:bg-slate-50/30 transition-colors font-medium">
                <td className="px-6 py-3 pl-8 text-[#091426]">Total Beban Operasional Umum &amp; Administrasi</td>
                <td className="px-6 py-3 text-right font-mono text-[#ba1a1a]">{formatIDRLabs(bebanOperasional)}</td>
                <td className="px-6 py-3 text-right font-mono text-slate-400">{safePercent(bebanOperasional)}</td>
              </tr>

              <tr className="bg-[#091426] text-white border-b-2 border-slate-900 font-extrabold">
                <td className="px-6 py-4 text-xs sm:text-sm uppercase tracking-widest font-sans">LABA BERSIH OPERASIONAL (NET INCOME)</td>
                <td className="px-6 py-4 text-right font-mono text-xs sm:text-sm text-[#6cf8bb]">{formatIDRLabs(labaBersihTotal)}</td>
                <td className="px-6 py-4 text-right font-mono text-[#6cf8bb]">{safePercent(labaBersihTotal)}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-[#c5c6cd] shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 flex flex-col sm:flex-row justify-between items-center border-b border-[#c5c6cd] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#e5eeff] text-[#091426] rounded-xl">
              <Scale className="w-5 h-5 shrink-0" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#091426] tracking-tight">Laporan Perubahan Modal</h3>
              <p className="text-[10px] text-slate-400">Analisis ekuitas akhir pemilik bisnis berstandar SAK EMKM</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleExportChangesModal}
            disabled={isExportingModal}
            className="px-4 py-2 bg-[#006c49] hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer w-full sm:w-auto"
          >
            {isExportingModal ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
            <span>Export Perubahan Modal</span>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-[#c5c6cd] bg-white">
          <div className="p-4 bg-slate-50 border border-[#c5c6cd] rounded-xl">
            <span className="text-[9px] font-bold text-slate-400 font-mono uppercase tracking-wider block">Modal Awal</span>
            <span className="text-sm font-black font-mono text-[#091426] block mt-1.5">{formatIDRLabs(modalAwal)}</span>
          </div>
          <div className={`p-4 rounded-xl ${labaBersihTotal >= 0 ? 'bg-emerald-50/40 border border-[#6cf8bb]/30' : 'bg-red-50/40 border border-red-200'}`}>
            <span className={`text-[9px] font-bold font-mono uppercase tracking-wider block ${labaBersihTotal >= 0 ? 'text-[#00714d]' : 'text-red-700'}`}>Penambahan Usaha (Laba Bersih)</span>
            <span className={`text-sm font-black font-mono block mt-1.5 ${labaBersihTotal >= 0 ? 'text-[#006c49]' : 'text-red-700'}`}>
              {labaBersihTotal >= 0 ? '+' : ''} {formatIDRLabs(labaBersihTotal)}
            </span>
          </div>
          <div className="p-4 bg-red-50/40 border border-red-100 rounded-xl">
            <span className="text-[9px] font-bold text-[#ba1a1a] font-mono uppercase tracking-wider block">Pengurangan Usaha (Prive / Dividen)</span>
            <span className="text-sm font-black font-mono text-[#ba1a1a] block mt-1.5">- {formatIDRLabs(priveDividenVal)}</span>
          </div>
        </div>

        <div className="p-6 bg-white">
          <div className="bg-[#091426] text-white p-6 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="text-sm font-bold tracking-tight">Modal Akhir Perusahaan</h4>
              <p className="text-[10px] text-slate-400 italic mt-0.5">Representasi neraca ekuitas akhir periode ini</p>
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-[#6cf8bb]">
              {formatIDRLabs(modalAkhir)}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}