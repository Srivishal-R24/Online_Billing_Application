const express = require('express');
const cors = require('cors');
const db = require('./db'); //
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 🏠 This makes the Register form open first
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// 🔐 REGISTER
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Registration failed" });
        res.json({ success: true, message: "User registered successfully" });
    });
});

// 🔑 LOGIN
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username=? AND password=?", [username, password], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Keep your existing product and bill routes below...
app.get('/product/:barcode', (req, res) => {
    db.query("SELECT * FROM products WHERE barcode=?", [req.params.barcode], (err, result) => {
        if (err) return res.send(err);
        res.json(result[0] || null);
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});