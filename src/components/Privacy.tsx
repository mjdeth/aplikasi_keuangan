import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <h1 className="text-2xl font-bold text-slate-800 mb-6">
                    Kebijakan Privasi KasCuan
                </h1>

                <p className="text-sm text-slate-500 mb-8">
                    Terakhir diperbarui: Juni 2026
                </p>

                <div className="space-y-6 text-slate-600 text-sm leading-relaxed">

                    <section>
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            Pendahuluan
                        </h2>
                        <p>
                            KasCuan berkomitmen untuk melindungi privasi dan keamanan data
                            pengguna. Kebijakan Privasi ini menjelaskan bagaimana kami
                            mengumpulkan, menggunakan, dan melindungi informasi yang Anda
                            berikan saat menggunakan layanan KasCuan.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            1. Informasi yang Kami Kumpulkan
                        </h2>
                        <p className="mb-2">
                            Kami dapat mengumpulkan informasi berikut:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Nama pengguna</li>
                            <li>Alamat email</li>
                            <li>Data transaksi keuangan</li>
                            <li>Informasi bisnis yang dimasukkan pengguna</li>
                            <li>
                                Data penggunaan aplikasi untuk tujuan analisis dan
                                peningkatan layanan
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            2. Penggunaan Informasi
                        </h2>
                        <p className="mb-2">
                            Informasi yang dikumpulkan digunakan untuk:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Menyediakan layanan pencatatan keuangan</li>
                            <li>Menampilkan laporan dan analisis keuangan</li>
                            <li>Meningkatkan pengalaman pengguna</li>
                            <li>Mengirimkan notifikasi penting terkait akun</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            3. Keamanan Data
                        </h2>
                        <p>
                            Kami menerapkan langkah-langkah keamanan yang wajar untuk
                            melindungi data pengguna dari akses, penggunaan, atau
                            pengungkapan yang tidak sah.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            4. Kerahasiaan Informasi
                        </h2>
                        <p>
                            Kami tidak menjual, menyewakan, atau membagikan informasi
                            pribadi pengguna kepada pihak ketiga tanpa persetujuan
                            pengguna, kecuali diwajibkan oleh hukum yang berlaku.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            5. Hak Pengguna
                        </h2>
                        <p className="mb-2">
                            Pengguna berhak untuk:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Mengakses data pribadi yang tersimpan</li>
                            <li>Memperbarui informasi akun</li>
                            <li>
                                Menghapus akun dan data terkait sesuai ketentuan yang
                                berlaku
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            6. Perubahan Kebijakan
                        </h2>
                        <p>
                            Kebijakan Privasi ini dapat diperbarui sewaktu-waktu.
                            Perubahan akan diinformasikan melalui aplikasi atau situs
                            resmi KasCuan.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;