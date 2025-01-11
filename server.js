import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
//import bcrypt from 'bcrypt';
import path from 'path';
import session from 'express-session';

//express = require('express');
const app = express();
const port = 3000;
//cors = require('cors');
//mysql = require('mysql');

// Middleware
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Replace with the specific origin of your frontend
    credentials: true, // Allow cookies and credentials to be sent
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve all static files
app.use(session({
    secret: 'Koushik@4', // Replace with a strong secret key
    resave: false,            // Prevent session resaving if not modified
    saveUninitialized: false,  // Save uninitialized sessions
    cookie: {                  // Optional: configure the cookie
        maxAge: 3600000,       // 1 hour
        httpOnly: true, 
        secure: false, 
        sameSite: 'Lax',      // For security
    },
}));


// MySQL Connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Koushik@4',
    database: 'kshirts',
    //port: 3306,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Handle signup form data
app.post('/signup', (req, res) => {
    const { name, email, phone, password } = req.body;
    //const query = 'INSERT INTO users (f_name, email, phone_no, password) VALUES (name, email,phone,password)';
    const query = 'INSERT INTO users (f_name, email, phone_no, password) VALUES(?,?,?,?)';
    db.query(query, [name, email, phone, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(502).send('Error saving data');
        } else {
            res.status(200).send('Signup successful');
        }
    });
});

app.post('/signin', (req, res) => {
    const { phone, password } = req.body;

    const query = `
        SELECT * FROM users 
        WHERE phone_no = ?
    `;

    db.query(query, [phone], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(501).json({ success: false, message: 'Database error' });
        }

        if (result.length === 0) {
            return res.status(400).json({ success: false, message: 'Phone number not found' });
        }

        const user = result[0];

        if (password !== user.password) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        req.session.userName = user.phone;

        res.json({ success: true });
    });
});

/*app.get('/get-user', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.session && req.session.userName) {
        res.json({ success: true, userName: req.session.userName });
    } else {
        res.status(401).json({ success: false, message: 'Not authenticated' });
    }
});*/
app.get('/get-user', (req, res) => {
    console.log('Session Data:', req.session); // Debugging line
    if (req.session && req.session.userName) {
        res.json({ success: true, userName: req.session.userName });
    } else {
        res.status(401).json({ success: false, message: 'Not authenticated' });
    }
});

app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({ success: true, products: results });
    });
});

app.get('/products', (req, res) => {
    const productQuery = 'SELECT * FROM products WHERE category = "product"';
    const comboQuery = 'SELECT * FROM products WHERE category = "combo"';

    db.query(productQuery, (err, productResults) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        db.query(comboQuery, (err, comboResults) => {
            if (err) {
                console.error('Error fetching combos:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            res.json({ success: true, products: productResults, combos: comboResults });
        });
    });
});


app.get('/index', (req, res) => {
    res.sendFile(path.resolve('./index.html')); // Adjust to serve from the current folder
});
/*app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});*/

app.listen(port, () => {
    console.log(`Server running at http://localhost:${3000}`);
});
