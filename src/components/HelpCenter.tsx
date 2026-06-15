/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Phone, MapPin } from 'lucide-react';

export default function HelpCenter() {
    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Hubungi Kami
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Tim KasCuan siap membantu Anda terkait penggunaan aplikasi,
                        kendala teknis, maupun masukan untuk pengembangan layanan.
                    </p>
                </div>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                            <Mail className="w-6 h-6 text-emerald-600" />
                        </div>

                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            Email
                        </h2>

                        <p className="text-sm text-slate-500 mb-3">
                            Kirim pertanyaan atau laporan kendala melalui email.
                        </p>

                        <p className="font-medium text-slate-700">
                            support@kascuan.id
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                            <Phone className="w-6 h-6 text-blue-600" />
                        </div>

                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            WhatsApp
                        </h2>

                        <p className="text-sm text-slate-500 mb-3">
                            Hubungi tim dukungan pada jam operasional.
                        </p>

                        <p className="font-medium text-slate-700">
                            +62 812-3456-7890
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                            <MapPin className="w-6 h-6 text-purple-600" />
                        </div>

                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            Alamat
                        </h2>

                        <p className="text-sm text-slate-500 mb-3">
                            Kantor operasional KasCuan.
                        </p>

                        <p className="font-medium text-slate-700">
                            Surakarta, Jawa Tengah, Indonesia
                        </p>
                    </div>

                </section>

                <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                        Jam Operasional
                    </h2>

                    <div className="space-y-2 text-slate-600">
                        <p>Senin - Jumat : 08.00 - 17.00 WIB</p>
                        <p>Sabtu : 08.00 - 12.00 WIB</p>
                        <p>Minggu & Hari Libur Nasional : Tutup</p>
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                        Kritik & Saran
                    </h2>

                    <p className="text-slate-600 leading-relaxed">
                        Kami sangat menghargai setiap masukan dari pengguna untuk
                        membantu meningkatkan kualitas layanan KasCuan. Silakan
                        kirimkan kritik, saran, atau laporan kendala melalui email
                        maupun WhatsApp yang tersedia.
                    </p>
                </div>
            </div>
        </div>
    );
}