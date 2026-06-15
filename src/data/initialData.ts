import { Transaction, BusinessProfile, UserProfile, Preferences } from '../types';

const currentYear = new Date().getFullYear();

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    date: `${currentYear}-01-24`,
    type: 'expense',
    category: 'OPERASIONAL',
    note: 'Tagihan Listrik & Air - Kantor Pusat',
    amount: 2450000,
    status: 'completed'
  },
  {
    id: 'tx-2',
    date: `${currentYear}-02-23`,
    type: 'income',
    category: 'PENDAPATAN JASA',
    note: 'Proyek Web Development Tahap 1 - PT Global',
    amount: 15000000,
    status: 'completed'
  },
  {
    id: 'tx-3',
    date: `${currentYear}-03-22`,
    type: 'expense',
    category: 'GAJI',
    note: 'Gaji Bulanan - Tim Pemasaran & Desain',
    amount: 42000000,
    status: 'pending'
  },
  {
    id: 'tx-4',
    date: `${currentYear}-04-21`,
    type: 'income',
    category: 'PENDAPATAN JASA',
    note: 'Biaya Konsultasi Manajemen - PT Sentosa',
    amount: 5500000,
    status: 'completed'
  },
  {
    id: 'tx-5',
    date: `${currentYear}-05-20`,
    type: 'expense',
    category: 'PEMASARAN',
    note: 'Iklan Digital - Meta Ads & Google Search',
    amount: 8000000,
    status: 'completed'
  },
  {
    id: 'tx-6',
    date: `${currentYear}-06-18`,
    type: 'expense',
    category: 'OPERASIONAL',
    note: 'Pembelian Stok Bahan Baku Tambahan',
    amount: 2500000,
    status: 'completed'
  },
  {
    id: 'tx-7',
    date: `${currentYear}-07-15`,
    type: 'income',
    category: 'PENJUALAN PRODUK',
    note: 'Kontrak Penjualan Produk Retail - Batch 1',
    amount: 48500000,
    status: 'completed'
  },
  {
    id: 'tx-8',
    date: `${currentYear}-08-10`,
    type: 'income',
    category: 'PENJUALAN PRODUK',
    note: 'Penjualan Grosir - Reseller Surabaya',
    amount: 60000000,
    status: 'completed'
  },
  {
    id: 'tx-9',
    date: `${currentYear}-09-28`,
    type: 'expense',
    category: 'BEBAN POKOK (HPP)',
    note: 'Kulakan bahan baku utama produksi',
    amount: 32000000,
    status: 'completed'
  },
  {
    id: 'tx-10',
    date: `${currentYear}-10-05`,
    type: 'expense',
    category: 'PRIVE',
    note: 'Penarikan Dana Pemilik (Prive)',
    amount: 5000000,
    status: 'completed'
  }
];

export const SEED_YEAR_DATA = {
  pendapatanOperasional_ProdukA: 2400000000,
  pendapatanOperasional_JasaKonsultasi: 800000000,
  bebanPokokPenjualan: 1100000000,
  bebanOperasional: 500000000,
  priveDividen: 250000000,
  modalAwal: 5000000000,
};

export const INITIAL_BUSINESS_PROFILE: BusinessProfile = {
  name: 'Toko Maju Jaya',
  type: 'Ritel & Perdagangan',
  address: 'Jl. Sudirman No. 45, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12110',
  phone: '+62 21 555 1234',
  logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPSKzaCU9jTVgdCbZveiTcL8bjo3tnWEIT7dg1C8COUkiQ3Bc490mFvUNanEv3cqValOdQal_ueDkYAb0Ik_LVqIogg6B7TfeUQ8wIbt28yHfNY8eodfHxFZdKc7lV9GqCZ-5ZRqwps9Awg5eB1gur2-vdqjd7v7aeDBJchTmTKs3gF3agTVjjUwx3yjI3vQSJpkFrxBMATzF1X6Dl3TpHNVY19sUrQR3IY8moQpHTfOkQGOR44-n8PuQKlegHhCT0U7sT2tfaJ-_L'
};

export const INITIAL_USER_PROFILE: UserProfile = {
  fullName: 'Budi Santoso',
  email: 'budi.santoso@majujaya.com',
  role: 'Admin Bisnis',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd6pRN3jnPuz6h0mwwyuNny1yRd1jz-Hxy9QWzMnyO91MDkBwrV7g6T5WzOaveaRS_dxv_RoliGhLlsbozUa87SXSq7a5nvJPwuMGYoHG-BIkK_gm-MWf7iNFGTVBixp_FDvSaQvPGbV9PMGJKe6a5EzlV7Hx4_DMVZlRzQtYMt86P2J9xJDdMO_IjRiYqqcNofjaXd1wfqsJs7AuJEEmvCVAlMbenCvJiff7iCeaBd-uZWKPib6qISk_X28ZFBxHxxImcKHtlIWcI'
};

export const INITIAL_PREFERENCES: Preferences = {
  emailNotification: true,
  weeklyReport: true,
  twoFactorAuth: false
};

export const CATEGORIES = [
  'OPERASIONAL',
  'PENJUALAN PRODUK',
  'PENDAPATAN JASA',
  'GAJI',
  'PEMASARAN',
  'BEBAN POKOK (HPP)',
  'LAIN-LAIN'
];
