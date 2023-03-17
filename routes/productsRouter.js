const { faker } = require('@faker-js/faker');
const express = require('express');
const router = express.Router();

//Se crea un router específico para todo lo relacionado con los productos
router.get('/', (req, res) => {
  let { size } = req.query;

  const limit = size || 2;
  const products = [];
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Soy filter en endpoint específico');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 2',
    price: 5000,
  });
});

module.exports = router;
