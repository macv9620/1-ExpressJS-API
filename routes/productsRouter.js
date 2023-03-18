const express = require('express');
//Importar el servicio de productos
const ProductsService = require('../services/productsServices');

const router = express.Router();
const service = new ProductsService();

//Obtener productos
router.get('/', (req, res) => {
  console.log('ingrese');
  const products = service.find();
  res.json(products);
});


//Obtener 1 producto con base en 1 id
router.get('/:id', (req, res) => {
console.log('ingrese 2');
  const { id } = req.params;
  console.log(id);
  const product = service.findOne(Number(id));
  console.log(product);
  if(product){
    res.status(200).json(product);
  }else{
    res.status(404).json({
      status: 404,
      message: "Not found"
    })
  }
});


//Crear un producto
router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    status: 201,
    message: 'Created',
    data: body,
  });
});

//PATCH-update
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.status(200).json({
    status: 200,
    message: 'Updated',
    id: id,
    data: body
  });
});

//DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    status: 200,
    message: 'Deleted',
    id: id,
  });
});

module.exports = router;
