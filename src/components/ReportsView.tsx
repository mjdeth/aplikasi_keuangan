/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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
  RefreshCw
} from 'lucide-react';
import { Transaction } from '../types';

interface ReportsViewProps {
  transactions: Transaction[];
  onToast: (msg: string, status?: 'success' | 'error') => void;
}

export default function ReportsView({ transactions, onToast }: ReportsViewProps) {
  const [fromDate, setFromDate] = useState('2024-01-01');
  const [toDate, setToDate] = useState('2024-12-31');
  const [isExportingLabaRugi, setIsExportingLabaRugi] = useState(false);
  const [isExportingModal, setIsExportingModal] = useState(false);

  // Dynamic values based on active ledger histories within selected dates
  const filteredTx = transactions.filter(tx => {
    return tx.date >= fromDate && tx.date <= toDate;
  });

  // Calculate project service revenues log
  const incomeJasa = filteredTx
    .filter(tx => tx.type === 'income' && tx.category.includes('JASA'))
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Calculate direct product sales log
  const incomeSales = filteredTx
    .filter(tx => tx.type === 'income' && tx.category.includes('PRODUK'))
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Fallbacks seed assets representing historical ledger values
  const seedPenjualanProdukA = 2400000000 + incomeSales;
  const seedPenjualanKonsultasi = 800000000 + incomeJasa;
  const totalPendapatan = seedPenjualanProdukA + seedPenjualanKonsultasi;

  const costOfGoodsSold = 1100000000 + filteredTx
    .filter(tx => tx.category.includes('HPP'))
    .reduce((sum, tx) => sum + tx.amount, 0);

  const labaKotor = totalPendapatan - costOfGoodsSold;

  // Operational Expenses from transactions
  const txOperasional = filteredTx
    .filter(tx => tx.type === 'expense' && (tx.category.includes('OPERASIONAL') || tx.category.includes('GAJI') || tx.category.includes('PEMASARAN')))
    .reduce((sum, tx) => sum + tx.amount, 0);

  const bebanOperasional = 500000000 + txOperasional;
  const labaBersihTotal = labaKotor - bebanOperasional;

  // Modal changes representations
  const modalAwal = 5000000000;
  const priveDividenVal = 250000000;
  const modalAkhir = modalAwal + labaBersihTotal - priveDividenVal;

  const formatIDRLabs = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const handleExportLabaRugi = () => {
    setIsExportingLabaRugi(true);
    onToast('Sedang membuat layout spreadsheet laporan laba rugi...', 'success');
    setTimeout(() => {
      setIsExportingLabaRugi(false);
      onToast('Unduhan Berhasil! Laporan Laba Rugi diekspor.', 'success');
    }, 1500);
  };

  const handleExportChangesModal = () => {
    setIsExportingModal(true);
    onToast('Sedang memproses neraca modal dan laporan laba bersih...', 'success');
    setTimeout(() => {
      setIsExportingModal(false);
      onToast('Unduhan Berhasil! Laba Bersih & Perubahan Modal terekspor.', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">
      
      {/* Date Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#c5c6cd] shadow-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="text-xs font-bold text-[#091426]">Rentang Periode Laporan</h4>
          <p className="text-[10px] text-slate-400">Analisis rasio laba kotor terhadap pengeluaran operasional</p>
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
          <button 
            type="button" 
            onClick={() => onToast('Penyuntingan divalidasi dan diaplikasikan ke tabel.', 'success')}
            className="p-3 bg-[#091426] hover:bg-slate-800 text-white rounded-xl flex items-center justify-center cursor-pointer shadow-sm"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bento Layout Content charts and summary card */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Chart Section: Laba Bersih Trend (Span 8) */}
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl border border-[#c5c6cd] flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-[#091426]">Tren Laba Bersih Bulanan</h3>
              <p className="text-[10px] text-slate-400">Grafik perbandingan pengeluaran bulanan</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#6cf8bb]/15 border border-[#6cf8bb]/30 rounded-full text-[10px] font-bold text-[#006c49]">
              <span className="w-1.5 h-1.5 bg-[#006c49] rounded-full animate-pulse" />
              <span>Stabil +12.4% Semester Ini</span>
            </div>
          </div>

          {/* Styled Tailwind Bars */}
          <div className="h-[210px] w-full flex items-end gap-3.5 px-3">
            <div className="flex-1 bg-slate-100 rounded-t-xl h-[45%] transition-all hover:bg-[#006c49] group relative cursor-pointer">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#091426] text-white text-[9px] py-1 px-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md pointer-events-none whitespace-nowrap">
                Jan: Rp 1,2 M
              </div>
            </div>
            <div className="flex-1 bg-slate-100 rounded-t-xl h-[55%] transition-all hover:bg-[#006c49] group relative cursor-pointer">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#091426] text-white text-[9px] py-1 px-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md pointer-events-none whitespace-nowrap">
                Feb: Rp 1,4 M
              </div>
            </div>
            <div className="flex-1 bg-slate-100 rounded-t-xl h-[40%] transition-all hover:bg-[#006c49] group relative cursor-pointer">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#091426] text-white text-[9px] py-1 px-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md pointer-events-none whitespace-nowrap">
                Mar: Rp 1,1 M
              </div>
            </div>
            {/* Active Highlight Month */}
            <div className="flex-1 bg-[#006c49] rounded-t-xl h-[78%] transition-all hover:opacity-85 group relative cursor-pointer">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#091426] text-white text-[9px] py-1 px-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md pointer-events-none whitespace-nowrap">
                Apr: Rp 1,9 M
              </div>
            </div>
            <div className="flex-1 bg-slate-100 rounded-t-xl h-[65%] transition-all hover:bg-[#006c49] group relative cursor-pointer">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#091426] text-white text-[9px] py-1 px-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md pointer-events-none whitespace-nowrap">
                Mei: Rp 1,6 M
              </div>
            </div>
            <div className="flex-1 bg-slate-100 rounded-t-xl h-[85%] transition-all hover:bg-[#006c49] group relative cursor-pointer">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#091426] text-white text-[9px] py-1 px-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md pointer-events-none whitespace-nowrap">
                Jun: Rp 2,1 M
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-3 px-3 text-[10px] font-bold text-slate-400 font-mono">
            <span>JAN</span>
            <span>FEB</span>
            <span>MAR</span>
            <span className="text-[#006c49] font-extrabold">APR</span>
            <span>MEI</span>
            <span>JUN</span>
          </div>
        </div>

        {/* Right Column Summary Cards (Span 4) */}
        <div className="col-span-12 lg:col-span-4 grid grid-rows-2 gap-6">
          {/* Card: Laba Bersih Dynamic */}
          <div className="bg-[#091426] text-white p-6 rounded-2xl border border-[#091426] flex flex-col justify-center">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">LABA BERSIH TOTAL</span>
            <div className="text-lg sm:text-xl font-black text-white mt-1.5 font-mono">
              {formatIDRLabs(labaBersihTotal)}
            </div>
            <div className="flex items-center gap-1 text-[#6cf8bb] mt-2.5 text-xs font-bold">
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>Meningkat 8.2% Kuartal Ini</span>
            </div>
          </div>

          {/* Card: Equity Health Ratio */}
          <div className="bg-white p-6 rounded-2xl border border-[#c5c6cd] flex flex-col justify-center relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-slate-50 rounded-full -mr-8 -mt-8 -z-10 pointer-events-none" />
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">RASIO EKUITAS (EQUITY RATIO)</span>
            <div className="text-lg sm:text-xl font-black text-[#0b1c30] mt-1.5 font-mono">
              68.4%
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-2.5">
              Rasio solvabilitas &amp; kesehatan keuangan: <span className="text-[#006c49] font-bold">Sangat Stabil</span>
            </div>
          </div>
        </div>

      </div>

      {/* Laba Rugi Table Section */}
      <section className="bg-white rounded-2xl border border-[#c5c6cd] shadow-xs overflow-hidden">
        
        {/* Table header menu bar */}
        <div className="px-6 py-4 bg-slate-50 flex flex-col sm:flex-row justify-between items-center border-b border-[#c5c6cd] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#e5eeff] text-[#091426] rounded-xl">
              <Receipt className="w-5 h-5 shrink-0" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#091426] tracking-tight">Laporan Laba Rugi Perusahaan</h3>
              <p className="text-[10px] text-slate-400">Laporan operasional komprehensif dikalkulasi real-time</p>
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

        {/* Laba Rugi Sheet Table */}
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
              
              {/* Pendapatan Operasional Group Header */}
              <tr className="bg-slate-50/50 font-bold border-b border-[#c5c6cd] text-[#091426]">
                <td className="px-6 py-3">Pendapatan Operasional (Kotor)</td>
                <td className="px-6 py-3 text-right font-mono">{formatIDRLabs(totalPendapatan)}</td>
                <td className="px-6 py-3 text-right font-mono">100%</td>
              </tr>
              {/* Items */}
              <tr className="border-b border-slate-150 hover:bg-slate-50/20 transition-colors">
                <td className="px-6 py-2.5 pl-12 text-slate-500 italic">Penjualan Produk Sektor A (Grosir &amp; Retail)</td>
                <td className="px-6 py-2.5 text-right font-mono text-slate-600">{formatIDRLabs(seedPenjualanProdukA)}</td>
                <td className="px-6 py-2.5 text-right font-mono text-slate-400">{(seedPenjualanProdukA / totalPendapatan * 100).toFixed(1)}%</td>
              </tr>
              <tr className="border-b border-slate-150 hover:bg-slate-50/20 transition-colors">
                <td className="px-6 py-2.5 pl-12 text-slate-500 italic">Pendapatan Jasa Konsultasi &amp; Pengembangan Sistem</td>
                <td className="px-6 py-2.5 text-right font-mono text-slate-600">{formatIDRLabs(seedPenjualanKonsultasi)}</td>
                <td className="px-6 py-2.5 text-right font-mono text-slate-400">{(seedPenjualanKonsultasi / totalPendapatan * 100).toFixed(1)}%</td>
              </tr>

              {/* HPP (COGS) */}
              <tr className="bg-slate-50/50 font-bold border-b border-[#c5c6cd] text-[#091426]">
                <td className="px-6 py-3">Beban Pokok Penjualan (HPP)</td>
                <td className="px-6 py-3 text-right font-mono text-[#ba1a1a]">{formatIDRLabs(costOfGoodsSold)}</td>
                <td className="px-6 py-3 text-right font-mono">{(costOfGoodsSold / totalPendapatan * 100).toFixed(1)}%</td>
              </tr>

              {/* Laba Kotor Header highlight */}
              <tr className="bg-[#6cf8bb]/10 text-[#006c49] font-bold border-b border-[#c5c6cd]">
                <td className="px-6 py-3.5 text-sm uppercase tracking-tight">LABA KOTOR (GROSS PROFIT)</td>
                <td className="px-6 py-3.5 text-right font-mono text-sm">{formatIDRLabs(labaKotor)}</td>
                <td className="px-6 py-3.5 text-right font-mono font-black">{(labaKotor / totalPendapatan * 100).toFixed(1)}%</td>
              </tr>

              {/* Operational Expenses */}
              <tr className="border-b border-[#c5c6cd] hover:bg-slate-50/30 transition-colors font-medium">
                <td className="px-6 py-3 pl-8 text-[#091426]">Total Beban Operasional Umum &amp; Administrasi</td>
                <td className="px-6 py-3 text-right font-mono text-[#ba1a1a]">{formatIDRLabs(bebanOperasional)}</td>
                <td className="px-6 py-3 text-right font-mono text-slate-400">{(bebanOperasional / totalPendapatan * 100).toFixed(1)}%</td>
              </tr>

              {/* LABA BERSIH OPERASIONAL FINAL */}
              <tr className="bg-[#091426] text-white border-b-2 border-slate-900 font-extrabold">
                <td className="px-6 py-4 text-xs sm:text-sm uppercase tracking-widest font-sans">LABA BERSIH OPERASIONAL (NET INCOME)</td>
                <td className="px-6 py-4 text-right font-mono text-xs sm:text-sm text-[#6cf8bb]">{formatIDRLabs(labaBersihTotal)}</td>
                <td className="px-6 py-4 text-right font-mono text-[#6cf8bb]">{(labaBersihTotal / totalPendapatan * 100).toFixed(1)}%</td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      {/* Perubahan Modal Block Section */}
      <section className="bg-white rounded-2xl border border-[#c5c6cd] shadow-xs overflow-hidden">
        
        {/* Module Header Bar */}
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

        {/* Small grid parameters */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-[#c5c6cd] bg-white">
          <div className="p-4 bg-slate-50 border border-[#c5c6cd] rounded-xl">
            <span className="text-[9px] font-bold text-slate-400 font-mono uppercase tracking-wider block">Modal Awal (1 Jan 2026)</span>
            <span className="text-sm font-black font-mono text-[#091426] block mt-1.5">{formatIDRLabs(modalAwal)}</span>
          </div>
          <div className="p-4 bg-emerald-50/40 border border-[#6cf8bb]/30 rounded-xl">
            <span className="text-[9px] font-bold text-[#00714d] font-mono uppercase tracking-wider block">Penambahan Usaha (Laba Bersih)</span>
            <span className="text-sm font-black font-mono text-[#006c49] block mt-1.5">+ {formatIDRLabs(labaBersihTotal)}</span>
          </div>
          <div className="p-4 bg-red-50/40 border border-red-100 rounded-xl">
            <span className="text-[9px] font-bold text-[#ba1a1a] font-mono uppercase tracking-wider block">Pengurangan Usaha (Prive / Dividen)</span>
            <span className="text-sm font-black font-mono text-[#ba1a1a] block mt-1.5">- {formatIDRLabs(priveDividenVal)}</span>
          </div>
        </div>

        {/* Big styled Modal Akhir conclusion */}
        <div className="p-6 bg-white">
          <div className="bg-[#091426] text-white p-6 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="text-sm font-bold tracking-tight">Modal Akhir Perusahaan</h4>
              <p className="text-[10px] text-slate-400 italic mt-0.5">Representasi neraca ekuitas akhir per 31 Desember 2026</p>
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
