const path = require('path');
const Database = require('better-sqlite3');
const db = new Database(path.join(__dirname, 'shop.db'));

db.exec(`

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
)
`);

const { total } = db
  .prepare('SELECT COUNT(*) AS total FROM products')
  .get();

if (total === 0) {
  const insert = db.prepare(
    'INSERT INTO products (name, price, category, stock) ' +
    'VALUES (?, ?, ?, ?)'
  );
  insert.run('Webcam HD', 24.99, 'video', 10);
  insert.run('USB Cable', 4.99, 'accessories', 50);
  insert.run('Wireless Mouse', 14.5, 'accessories', 0);
  insert.run('Monitor 24"', 129, 'screens', 5);
}

module.exports = db;