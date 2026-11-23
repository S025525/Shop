const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const productRouter = require('./routes/products');

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productRouter);

app.get('/api/health', (req,res) => {
    res.json({ status: 'ok'});
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Shop server running at http://localhost:${PORT}`);
})