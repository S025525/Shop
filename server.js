const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const products = [
    {  id: 1, name: 'Corn', price: 19.99, category: 'food', stock: 25, img: '/corn.webp'},
    {  id: 2, name: 'Apples', price: 39.99, category: 'food', stock: 8, img: '/apple.webp'},
    {  id: 3, name: 'Broccoli', price: 29.99, category: 'food', stock: 0, img: '/broccoli.webp'},
    {  id: 4, name: 'Tomatoes', price: 45.99, category: 'food', stock: 5, img: '/tomato.webp'},
    {  id: 5, name: 'Bananas', price: 19.99, category: 'food', stock: 14, img: '/banana.webp'},
    {  id: 6, name: 'Fertilizer', price: 39.99, category: 'farm', stock: 0, img: '/fertilizer.webp'}
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