/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, MouseEvent } from 'react';
import * as XLSX from 'xlsx';
import {
  Wallet,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  Filter,
  FileSpreadsheet,
  MoreVertical,
  CheckCircle,
  Clock,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Plus,
  AlertCircle,
  Info
} from 'lucide-react';
import { Transaction } from '../types';
import { CATEGORIES } from '../data/initialData';

interface DashboardViewProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (tx: Transaction) => void;
  onOpenAddTransaction: () => void;
  searchQuery: string;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  activeFilterType?: 'all' | 'income' | 'expense';
  onToast: (msg: string, status?: 'success' | 'error') => void;
}

export default function DashboardView({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
  onOpenAddTransaction,
  searchQuery,
  categoryFilter,
  setCategoryFilter,
  activeFilterType = 'all',
  onToast
}: DashboardViewProps) {

  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuTxId, setActiveMenuTxId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const itemsPerPage = 5;

  // Filter Logic: Category + Types + Search Queries
  const filteredTransactions = transactions.filter(tx => {
    // 1. Filter by category
    if (categoryFilter !== 'Semua Kategori' && tx.category !== categoryFilter) {
      return false;
    }
    // 2. Filter by tab type (income vs expense tabs)
    if (activeFilterType === 'income' && tx.type !== 'income') return false;
    if (activeFilterType === 'expense' && tx.type !== 'expense') return false;

    // 3. Search text match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchNote = tx.note.toLowerCase().includes(q);
      const matchCategory = tx.category.toLowerCase().includes(q);
      const matchAmount = String(tx.amount).includes(q);
      const matchDate = tx.date.includes(q);
      return matchNote || matchCategory || matchAmount || matchDate;
    }

    return true;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Format currency helpers: IDR Rupiah
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const handleExportExcel = () => {
    setIsExporting(true);
    onToast('Menyiapkan berkas excel spreadsheet finansial...', 'success');

    try {
      const dataToExport = filteredTransactions.map((tx) => ({
        'Tanggal': tx.date,
        'ID Transaksi': tx.id,
        'Tipe': tx.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
        'Kategori': tx.category,
        'Nominal (Rp)': tx.amount,
        'Keterangan': tx.note || '-',
        'Status': tx.status === 'completed' ? 'Selesai' : 'Pending'
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Buku Besar");

      const today = new Date().toISOString().split('T')[0]; // Hasil: YYYY-MM-DD
      const fileName = `Laporan_Keuangan_EquiCount_${today}.xlsx`;

      XLSX.writeFile(workbook, fileName);

      onToast('Unduhan Berhasil! Laporan Ledger diekspor ke Excel.', 'success');
    } catch (error) {
      console.error("Gagal mengekspor data:", error);
      onToast('Terjadi kesalahan saat mengekspor data.', 'error');
    } finally {
      // Matikan status loading terlepas dari berhasil atau gagal
      setIsExporting(false);
    }
  };

  const handleActionMenuToggle = (e: MouseEvent, txId: string) => {
    e.stopPropagation();
    if (activeMenuTxId === txId) {
      setActiveMenuTxId(null);
    } else {
      setActiveMenuTxId(txId);
    }
  };
  const computedIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const computedExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const finalBalance = computedIncome - computedExpense;

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">

      {/* Metric Cards Grid Panel */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Metric 1: Current Balance (Saldo Saat Ini) */}
        <div className="bg-white p-6 rounded-2xl border border-[#c5c6cd] shadow-sm flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">SALDO SAAT INI</p>
              <h3 className="text-xl sm:text-1xl font-black text-[#0b1c30] mt-1 font-mono">{formatIDR(finalBalance)}
              </h3>
            </div>
            <div className="p-3 bg-[#eff4ff] text-[#091426] rounded-xl shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <Info className="w-4 h-4" />
            <span>Akumulasi dari seluruh transaksi valid</span>
          </div>
        </div>

        {/* Metric 2: Total Income (Pemasukan) */}
        <div className="bg-white p-6 rounded-2xl border border-[#c5c6cd] shadow-sm flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">TOTAL PEMASUKAN</p>
              <h3 className="text-xl sm:text-1xl font-black text-[#006c49] mt-1 font-mono">
                {formatIDR(computedIncome)}
              </h3>
            </div>
            <div className="p-3 bg-emerald-55 bg-[#6cf8bb]/20 text-[#006c49] rounded-xl shrink-0">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500 font-medium">
            <span>Total pendapatan tercatat di database</span>
          </div>
        </div>

        {/* Metric 3: Total Expenses (Pengeluaran) */}
        <div className="bg-white p-6 rounded-2xl border border-[#c5c6cd] shadow-sm flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">TOTAL PENGELUARAN</p>
              <h3 className="text-xl sm:text-1xl font-black text-[#ba1a1a] mt-1 font-mono">
                {formatIDR(computedExpense)}
              </h3>
            </div>
            <div className="p-3 bg-red-50 text-[#ba1a1a] rounded-xl shrink-0">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500 font-medium">
            <span>Total pengeluaran tercatat di database</span>
          </div>
        </div>

      </section>

      {/* Transactions Data Table Grid Section */}
      <section className="bg-white rounded-2xl border border-[#c5c6cd] shadow-xs overflow-hidden">

        {/* Table actions bar header */}
        <div className="px-6 py-4 border-b border-[#c5c6cd] bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h4 className="font-bold text-sm text-[#091426] tracking-tight">Daftar Log Transaksi Terkini</h4>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Category Dropdown categoryFilter Selector */}
            <div className="relative flex-grow sm:flex-grow-0">
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-3 pr-8 py-1.5 text-xs bg-white border border-[#c5c6cd] rounded-xl focus:border-[#091426] focus:outline-none cursor-pointer font-sans"
              >
                <option value="Semua Kategori">Semua Kategori</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Quick Export Spreadsheet Action Button */}
            <button
              onClick={handleExportExcel}
              disabled={isExporting}
              className="flex items-center justify-center gap-1.5 py-1.5 px-4 bg-[#006c49] text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer w-full sm:w-auto shadow-sm"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
              <span>{isExporting ? 'Mengekspor...' : 'Ekspor Excel'}</span>
            </button>
          </div>
        </div>

        {/* Database table view */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse select-text">
            <thead className="bg-[#eff4ff] border-b border-[#c5c6cd]">
              <tr>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">TANGGAL</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">KATEGORI</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">CATATAN LOG</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono text-right">JUMLAH</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono text-center">STATUS</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c6cd] text-xs">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-[#eff4ff]/40 transition-colors group relative"
                  >
                    {/* Timestamp */}
                    <td className="px-6 py-4 font-mono text-[#0b1c30]">
                      {tx.date}
                    </td>

                    {/* Badge Category */}
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase ${tx.type === 'income'
                        ? 'bg-[#6cf8bb]/20 text-[#00714d]'
                        : 'bg-slate-100 text-[#45474c]'
                        }`}>
                        {tx.category}
                      </span>
                    </td>

                    {/* Note memo */}
                    <td className="px-6 py-4 font-medium text-slate-700 max-w-[200px] truncate" title={tx.note}>
                      {tx.note}
                    </td>

                    {/* Value colored accordingly */}
                    <td className={`px-6 py-4 font-mono font-bold text-right text-xs ${tx.type === 'income' ? 'text-[#006c49]' : 'text-[#ba1a1a]'
                      }`}>
                      {tx.type === 'income' ? '+' : '-'} {formatIDR(tx.amount)}
                    </td>

                    {/* Verified Status Checklist */}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center">
                        {tx.status === 'completed' ? (
                          <div className="flex items-center gap-1 text-[#006c49]" title="Diverifikasi">
                            <CheckCircle className="w-4 h-4" />
                            <span className="hidden lg:inline text-[9px] font-bold uppercase">Selesai</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-orange-400" title="Verifikasi Tertunda">
                            <Clock className="w-4 h-4 animate-pulse" />
                            <span className="hidden lg:inline text-[9px] font-bold uppercase">Pending</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Quick action modifiers */}
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={(e) => handleActionMenuToggle(e, tx.id)}
                        className="p-1 text-slate-400 hover:text-[#0b1c30] rounded-lg hover:bg-[#eff4ff] transition-colors cursor-pointer"
                        title="Modify entry"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Action Modals */}
                      {activeMenuTxId === tx.id && (
                        <div className="absolute right-6 mt-1 w-32 bg-white border border-[#c5c6cd] rounded-xl shadow-lg py-1.5 z-40 animate-in fade-in slide-in-from-top-2 duration-100">
                          <button
                            onClick={() => {
                              onEditTransaction(tx);
                              setActiveMenuTxId(null);
                            }}
                            className="w-full px-3 py-1.5 text-left hover:bg-slate-100 flex items-center gap-2 cursor-pointer text-[#0b1c30]"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              onDeleteTransaction(tx.id);
                              setActiveMenuTxId(null);
                            }}
                            className="w-full px-3 py-1.5 text-left hover:bg-red-50 text-[#ba1a1a] flex items-center gap-2 cursor-pointer font-semibold"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-[#ba1a1a]" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-12 text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-8 h-8 text-slate-300" />
                      <p className="font-semibold text-xs text-slate-500">Tidak ada data transaksi ditemukan.</p>
                      <p className="text-[10px] text-slate-400">Silakan tambahkan data melalui tombol Tambah Transaksi.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Real-time pagination section feet */}
        <div className="px-6 py-4 border-t border-[#c5c6cd] bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">
            Menampilkan {filteredTransactions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} dari {filteredTransactions.length} transaksi
          </p>

          <div className="flex gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-[#c5c6cd] hover:bg-slate-100 rounded-lg text-slate-600 font-bold transition-all disabled:opacity-40 cursor-pointer"
              title="Page Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${currentPage === idx + 1
                  ? 'bg-[#091426] text-white'
                  : 'border border-[#c5c6cd] text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-[#c5c6cd] hover:bg-slate-100 rounded-lg text-slate-600 font-bold transition-all disabled:opacity-40 cursor-pointer"
              title="Page Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </section>

    </div>
  );
}
