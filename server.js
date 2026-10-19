const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const products = [
    {  id: 1, name: 'Wireless Mouse', price: 14.99, category: 'accessories', stock: 25},
    {  id: 1, name: 'Mechanical Keyboard', price: 50.5, category: 'accessories', stock: 8},
    {  id: 1, name: 'USB-C Hub', price: 24, category: 'accessories', stock: 0},
    {  id: 1, name: '24-Inch Monitor', price: 119.99, category: 'displays', stock: 5},
    {  id: 1, name: 'Laptop Stand', price: 22.5, category: 'accessories', stock: 14},
    {  id: 1, name: 'Webcam HD', price: 39.99, category: 'video', stock: 0}
]

app.get('/api/health', (req,res) => {
    res.json({ status: 'ok'});
})

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.get('/', (req, res) => {
    res.send('Hello from my shop!');
})

app.listen(PORT, () => {
    console.log(`Shop server running at http://localhost:${PORT}`);
})