const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db_access = require('./Db.js');
const db = db_access.db;
const cookieParser = require('cookie-parser');

const server = express();
const port = 5555;
const secret_key = 'CarRentalSecretKey';

server.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
server.use(express.json());
server.use(cookieParser());

const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, secret_key, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).send('Unauthorized');

    jwt.verify(token, secret_key, (err, details) => {
        if (err) return res.status(403).send('Invalid or expired token');
        req.userDetails = details;
        next();
    });
};

// User login
server.post('/user/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM USER WHERE EMAIL=?`, [email], (err, row) => {
        if (!row) return res.status(401).send('Invalid credentials');
        
        bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).send('Invalid credentials');

            const token = generateToken(row.ID, row.ISADMIN);
            res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'none' });
            res.status(200).json({ id: row.ID, admin: row.ISADMIN });
        });
    });
});

// User registration
server.post('/user/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send('Error hashing password');
        
        db.run(`INSERT INTO USER (NAME, EMAIL, PASSWORD, ISADMIN) VALUES (?, ?, ?, ?)`, 
            [name, email, hashedPassword, 0], (err) => {
                if (err) return res.status(400).send(err);
                res.status(200).send('Registration successful');
        });
    });
});

// Only admins can add cars
server.post('/cars/add', verifyToken, (req, res) => {
    if (!req.userDetails.isAdmin) return res.status(403).send('You are not an admin');

    const { model, brand, year, price_per_day } = req.body;
    db.run(`INSERT INTO CARS (MODEL, BRAND, YEAR, PRICE_PER_DAY) VALUES (?, ?, ?, ?)`,
        [model, brand, year, price_per_day], (err) => {
            if (err) return res.status(500).send(err);
            res.status(200).send('Car added successfully');
        });
});

// View available cars
server.get('/cars', verifyToken, (req, res) => {
    db.all(`SELECT * FROM CARS WHERE AVAILABLE=1`, (err, rows) => {
        if (err) return res.status(500).send(err);
        res.json(rows);
    });
});

server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
