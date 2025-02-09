const bcrypt = require('bcrypt'); // Import bcrypt
const sqlite = require('sqlite3');
const db = new sqlite.Database('car_rental.db');

const createUserTable = `CREATE TABLE IF NOT EXISTS USER (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT NOT NULL,
    EMAIL TEXT UNIQUE NOT NULL,
    PASSWORD TEXT NOT NULL,
    ISADMIN INT
)`;

const insertUserIfNotExists = (name, email, password, isAdmin) => {
    db.get(`SELECT * FROM USER WHERE EMAIL = ?`, [email], async (err, row) => {
        if (!row) {
            // Hash password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);
            db.run(`INSERT INTO USER (NAME, EMAIL, PASSWORD, ISADMIN) VALUES (?, ?, ?, ?)`,
                [name, email, hashedPassword, isAdmin], 
                (err) => {
                    if (err) console.log(`Error inserting user ${email}:`, err);
                    else console.log(`User ${email} added.`);
                });
        } else {
            console.log(`User ${email} already exists, skipping insertion.`);
        }
    });
};

// Run table creation
db.serialize(() => {
    db.run(createUserTable);

    // Insert sample users with hashed passwords
    insertUserIfNotExists('Admin User', 'admin@carrental.com', 'admin123', 1);
    insertUserIfNotExists('John Doe', 'john.doe@example.com', 'password123', 0);
    insertUserIfNotExists('Jane Smith', 'jane.smith@example.com', 'securepass', 0);
});

module.exports = { db, createUserTable };
