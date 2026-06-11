import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <h1 className="text-2xl font-bold text-slate-800 mb-6">Syarat & Ketentuan EquiCount SME</h1>
                <p className="text-sm text-slate-500 mb-8">Pembaruan Terakhir: 11 Juni 2026</p>

                <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
                    <section>
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">1. Definisi Layanan</h2>
                        <p>
                            EquiCount SME adalah platform perangkat lunak sebagai layanan (SaaS) yang dirancang untuk membantu Usaha Mikro, Kecil, dan Menengah (UMKM) dalam mengelola data operasional dan profil bisnis mereka.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">2. Kewajiban Pengguna</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Pengguna wajib memberikan informasi yang akurat saat pendaftaran.</li>
                            <li>Pengguna bertanggung jawab penuh atas keamanan kata sandi dan kredensial akun.</li>
                            <li>Segala aktivitas yang terjadi di bawah akun pengguna adalah tanggung jawab pengguna sepenuhnya.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">3. Batasan Tanggung Jawab</h2>
                        <p>
                            Platform ini disediakan "sebagaimana adanya". Kami tidak bertanggung jawab atas kerugian finansial, kehilangan data, atau kesalahan input yang dilakukan oleh pengguna selama menggunakan aplikasi EquiCount SME.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;