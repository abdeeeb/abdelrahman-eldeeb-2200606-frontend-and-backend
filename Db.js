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

// Sample data for Users (Admin + Regular Users)
const insertUsers = `INSERT INTO USER (NAME, EMAIL, PASSWORD, ISADMIN) VALUES
    ('Admin User', 'admin@carrental.com', 'admin123', 1),
    ('John Doe', 'john.doe@example.com', 'password123', 0),
    ('Jane Smith', 'jane.smith@example.com', 'securepass', 0)
`;

// Sample data for Cars
const insertCars = `INSERT INTO CARS (MODEL, BRAND, YEAR, PRICE_PER_DAY, AVAILABLE) VALUES
    ('Corolla', 'Toyota', 2020, 40.00, 1),
    ('Civic', 'Honda', 2021, 50.00, 1),
    ('Mustang', 'Ford', 2019, 100.00, 1),
    ('X5', 'BMW', 2022, 150.00, 1),
    ('A4', 'Audi', 2021, 120.00, 1)
`;

// Initialize the database
db.serialize(() => {
    db.run(createUserTable, (err) => {
        if (err) console.log('Error creating USER table:', err);
        else console.log('USER table created.');
    });

    db.run(createCarTable, (err) => {
        if (err) console.log('Error creating CARS table:', err);
        else console.log('CARS table created.');
    });

    db.run(createRentalTable, (err) => {
        if (err) console.log('Error creating RENTALS table:', err);
        else console.log('RENTALS table created.');
    });

    db.run(insertUsers, (err) => {
        if (err) console.log('Users already exist or insertion error:', err);
        else console.log('Sample users added.');
    });

    db.run(insertCars, (err) => {
        if (err) console.log('Cars already exist or insertion error:', err);
        else console.log('Sample cars added.');
    });
});

module.exports = { db, createUserTable, createCarTable, createRentalTable };
