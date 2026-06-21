import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function ResetPassword() {
  const [password, setPassword] = useState('');

  const token = new URLSearchParams(window.location.search).get('token');
  console.log("TOKEN:", token);

  const handleSubmit = async () => {
    const response = await fetch(
      `${API_URL}/api/users/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          newPassword: password
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert('Password berhasil diubah!');
      window.location.href = '/';
    } else {
      alert(data.error);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-slate-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Reset Password KasCuan
      </h1>

      <input
        type="password"
        placeholder="Masukkan Password Baru"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white p-3 rounded-lg"
      >
        Simpan Password
      </button>
    </div>
  </div>
);
}