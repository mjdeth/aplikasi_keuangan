import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function ResetPassword() {
  const [password, setPassword] = useState('');

  const token = new URLSearchParams(window.location.search).get('token');

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
    <div>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="Password Baru"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Simpan Password
      </button>
    </div>
  );
}