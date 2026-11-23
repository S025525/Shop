
const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.join(__dirname, 'shop.db'));

// Create products table
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    image TEXT
  )
`);

// Check if products already exist
const { total } = db
  .prepare('SELECT COUNT(*) AS total FROM products')
  .get();

// Insert sample products if database is empty
if (total === 0) {
  const insert = db.prepare(`
    INSERT INTO products (name, price, category, stock, image)
    VALUES (?, ?, ?, ?, ?)
  `);

  const products = [
    ['Corn', 19.99, 'food', 25, '/images/corn.webp'],
    ['Apples', 39.99, 'food', 8, '/images/apples.webp'],
    ['Broccoli', 29.99, 'food', 0, '/images/broccoli.webp'],
    ['Tomatoes', 45.99, 'food', 5, '/images/tomatoes.webp'],
    ['Bananas', 19.99, 'food', 14, '/images/bananas.webp'],
    ['Fertilizer', 45.99, 'farm', 0, '/images/fertilizer.webp']
  ];

  const insertMany = db.transaction((items) => {
    for (const item of items) {
      insert.run(...item);
    }
  });

  insertMany(products);
}

const products = db.prepare(
  'SELECT * FROM products'
).all();

console.table(products);

module.exports = db;