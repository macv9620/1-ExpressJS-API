const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes/index');

app.get('/', (req, res) => {
  res.send('Consultaste el server!!');
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
    name: 'Car',
    price: 50200,
  });
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay parámetros');
  }
});

app.listen(port, () => {
  console.log('Escuchando en puerto: ' + port);
});

routerApi(app);
