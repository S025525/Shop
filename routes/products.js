const express =require('express');
const router= express.Router();
let products = [
    {  id: 1, name: 'Corn', price: 19.99, category: 'food', stock: 25, img: '/images/corn.webp'},
    {  id: 2, name: 'Apples', price: 39.99, category: 'food', stock: 8, img: '/images/apples.webp'},
    {  id: 3, name: 'Broccoli', price: 29.99, category: 'food', stock: 0, img: '/images/broccoli.webp'},
    {  id: 4, name: 'Tomatoes', price: 45.99, category: 'food', stock: 5, img: '/images/tomatoes.webp'},
    {  id: 5, name: 'Bananas', price: 19.99, category: 'food', stock: 14, img: '/images/bananas.webp'},
    {  id: 6, name: 'Fertilizer', price: 39.99, category: 'farm', stock: 0, img: '/images/fertilizer.webp'}
];
let nextId=7;

router.get('/', (req, res) => {

    const { category, maxPrice, sort } = req.query;

    let result = [...products];

    if (category) {
        result = result.filter(p => p.category === category);
    }

    if (maxPrice !== undefined) {

        const price = Number(maxPrice);

        if (!Number.isFinite(price)) {
            return res.status(400).json({
                message: 'Invalid maxPrice'
            });
        }

        result = result.filter(p => p.price <= price);
    }

        if (sort === 'price') {
        result.sort((a, b) => a.price - b.price);
    }

    if (sort === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    res.json(result);
});

router.get('/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
        return res.status(400).json({
            message: '400 Should be a whole number'
        })
    }

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: '404 Product not found'
        });
    }

    res.json(product);
});

function parseId(value){
    const id = Number(value);
    return Number.isInteger(id) ? id :null;
}

module.exports=router;