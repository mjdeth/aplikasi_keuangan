import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;

        // Cek apakah email sudah terdaftar
        const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExist.rows.length > 0) {
            return res.status(400).json({ error: 'Email sudah terdaftar!' });
        }

        // Enkripsi (Hash) Password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Simpan ke database
        const newUser = await pool.query(
            `INSERT INTO users (full_name, email, password_hash, role) 
             VALUES ($1, $2, $3, $4) 
             RETURNING id, full_name, email, role`,
            [full_name, email, password_hash, role || 'Admin Bisnis']
        );

        // Buat Token JWT
        const token = jwt.sign(
            { id: newUser.rows[0].id, role: newUser.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            message: 'Registrasi berhasil!',
            token,
            user: newUser.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error saat registrasi' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari user berdasarkan email
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Email atau password salah!' });
        }

        // Cocokkan password yang dikirim dengan password hash di database
        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Email atau password salah!' });
        }

        // Jika cocok, buat Token JWT
        const token = jwt.sign(
            { id: user.rows[0].id, role: user.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login berhasil!',
            token,
            user: {
                id: user.rows[0].id,
                full_name: user.rows[0].full_name,
                email: user.rows[0].email,
                role: user.rows[0].role
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error saat login' });
    }
});

export default router;