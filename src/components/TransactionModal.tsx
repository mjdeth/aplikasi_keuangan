/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from 'react';
import { X, ArrowDownLeft, ArrowUpRight, CheckCircle } from 'lucide-react';
import { Transaction, BusinessProfile } from '../types';
import { CATEGORIES } from '../data/initialData';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id'> & { id?: string }) => void;
  editingTransaction?: Transaction | null;
}

export default function TransactionModal({
  isOpen,
  onClose,
  onSave,
  editingTransaction
}: TransactionModalProps) {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('OPERASIONAL');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'completed' | 'pending'>('completed');
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize when editing transaction changes
  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
      setAmount(String(editingTransaction.amount));
      setNote(editingTransaction.note);
      setStatus(editingTransaction.status);
    } else {
      // Set default values for new transactions
      setType('income');
      setCategory('OPERASIONAL');
      // Set current systems date
      const today = new Date().toISOString().split('T')[0];
      setDate(today);
      setAmount('');
      setNote('');
      setStatus('completed');
    }
    setErrorMessage('');
  }, [editingTransaction, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Field validation
    if (!category) {
      setErrorMessage('Pilih kategori transaksi yang sesuai.');
      return;
    }
    if (!date) {
      setErrorMessage('Tanggal transaksi wajib diisi.');
      return;
    }
    const valAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ''));
    if (isNaN(valAmount) || valAmount <= 0) {
      setErrorMessage('Masukkan jumlah nominal valid (lebih tinggi dari 0).');
      return;
    }
    if (!note.trim()) {
      setErrorMessage('Catatan kecil transaksi wajib diberikan.');
      return;
    }

    onSave({
      id: editingTransaction?.id, // Optional parameter for update
      type,
      category,
      date,
      amount: valAmount,
      note: note.trim(),
      status
    });

    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none"
      id="transaction-entry-modal-overlay"
    >
      <div 
        className="w-full max-w-lg bg-white rounded-2xl border border-[#c5c6cd] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        id="transaction-entry-modal-container"
      >
        {/* Header container */}
        <div className="px-6 py-4 border-b border-[#c5c6cd] flex justify-between items-center bg-slate-50">
          <h3 className="font-sans text-sm font-bold text-[#0b1c30]">
            {editingTransaction ? 'Edit Log Transaksi' : 'Tambah Transaksi Baru'}
          </h3>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:bg-slate-200 hover:text-[#0b1c30] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Validation Alert */}
          {errorMessage && (
            <div className="p-3 text-xs bg-red-50 text-[#ba1a1a] rounded-xl border border-red-200">
              {errorMessage}
            </div>
          )}

          {/* Type Toggle Selection Box */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">TIPE TRANSAKSI</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('income')}
                className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                  type === 'income'
                    ? 'bg-[#6cf8bb]/15 border-[#006c49] text-[#006c49]'
                    : 'bg-white border-[#c5c6cd] text-[#45474c] hover:bg-slate-50'
                }`}
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>Pemasukan</span>
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                  type === 'expense'
                    ? 'bg-red-50 border-[#ba1a1a] text-[#ba1a1a]'
                    : 'bg-white border-[#c5c6cd] text-[#45474c] hover:bg-slate-50'
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Pengeluaran</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Dropdown Selection */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">KATEGORI</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#c5c6cd] rounded-xl focus:border-[#091426] focus:ring-1 focus:ring-[#091426] focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Date Picker Input */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">TANGGAL TRANSAKSI</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#c5c6cd] rounded-xl focus:border-[#091426] focus:ring-1 focus:ring-[#091426] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Amount Input */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">NOMINAL (RP)</label>
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono font-bold bg-white border border-[#c5c6cd] rounded-xl focus:border-[#091426] focus:ring-1 focus:ring-[#091426] focus:outline-none"
              />
            </div>

            {/* Status Select */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">STATUS VERIFIKASI</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'completed' | 'pending')}
                className="w-full px-3 py-2 text-xs bg-white border border-[#c5c6cd] rounded-xl focus:border-[#091426] focus:ring-1 focus:ring-[#091426] focus:outline-none"
              >
                <option value="completed">Selesai (Completed)</option>
                <option value="pending">Tertunda (Pending)</option>
              </select>
            </div>
          </div>

          {/* Description Textarea Note */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">CATATAN / KETERANGAN</label>
            <textarea
              placeholder="Deskripsikan pengeluaran atau pemasukan secara ringkas..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-xs bg-white border border-[#c5c6cd] rounded-xl focus:border-[#091426] focus:ring-1 focus:ring-[#091426] focus:outline-none leading-relaxed"
            />
          </div>

          {/* Form Actions Footer */}
          <div className="flex gap-3 justify-end pt-4 border-t border-[#c5c6cd] bg-slate-50 -mx-6 -mb-6 p-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#c5c6cd] rounded-xl text-xs font-bold text-[#45474c] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#091426] hover:bg-slate-800 text-[#6cf8bb] font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{editingTransaction ? 'Simpan Perubahan' : 'Masukkan Transaksi'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
