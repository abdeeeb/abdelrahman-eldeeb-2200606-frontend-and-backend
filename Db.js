const sqlite = require('sqlite3');
const db = new sqlite.Database('car_rental.db');

const createUserTable = `CREATE TABLE IF NOT EXISTS USER (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT NOT NULL,
    EMAIL TEXT UNIQUE NOT NULL,
    PASSWORD TEXT NOT NULL,
    ISADMIN INT
)`;

const createCarTable = `CREATE TABLE IF NOT EXISTS CARS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    MODEL TEXT NOT NULL,
    BRAND TEXT NOT NULL,
    YEAR INT NOT NULL,
    PRICE_PER_DAY REAL NOT NULL,
    AVAILABLE INT DEFAULT 1
)`;

const createRentalTable = `CREATE TABLE IF NOT EXISTS RENTALS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    USER_ID INT,
    CAR_ID INT,
    RENT_DATE TEXT NOT NULL,
    RETURN_DATE TEXT,
    FOREIGN KEY (USER_ID) REFERENCES USER(ID),
    FOREIGN KEY (CAR_ID) REFERENCES CARS(ID)
)`;

// Function to insert data only if it doesn't exist
const insertIfNotExists = (table, column, value, insertQuery) => {
    db.get(`SELECT * FROM ${table} WHERE ${column} = ?`, [value], (err, row) => {
        if (!row) {
            db.run(insertQuery, (err) => {
                if (err) console.log(`Error inserting into ${table}:`, err);
                else console.log(`Inserted into ${table}`);
            });
        } else {
            console.log(`${table} entry already exists, skipping insertion.`);
        }
    });
};

// Insert default admin user
insertIfNotExists('USER', 'EMAIL', 'admin@carrental.com', 
    `INSERT INTO USER (NAME, EMAIL, PASSWORD, ISADMIN) VALUES ('Admin User', 'admin@carrental.com', 'admin123', 1)`
);

// Insert sample users
insertIfNotExists('USER', 'EMAIL', 'john.doe@example.com', 
    `INSERT INTO USER (NAME, EMAIL, PASSWORD, ISADMIN) VALUES ('John Doe', 'john.doe@example.com', 'password123', 0)`
);

insertIfNotExists('USER', 'EMAIL', 'jane.smith@example.com', 
    `INSERT INTO USER (NAME, EMAIL, PASSWORD, ISADMIN) VALUES ('Jane Smith', 'jane.smith@example.com', 'securepass', 0)`
);

// Insert sample cars
db.run(createUserTable);
db.run(createCarTable);
db.run(createRentalTable);

console.log("Database setup complete!");

module.exports = { db, createUserTable, createCarTable, createRentalTable };
