const express = require('express');
//Importar el servicio de productos
const ProductsService = require('../services/productsServices');

const router = express.Router();
const service = new ProductsService();

//Obtener productos
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//Obtener 1 producto con base en 1 id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(Number(id));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      status: 404,
      message: 'Not found',
    });
  }
});

//Crear un producto
router.post('/', async (req, res) => {
  const body = req.body;
  //Se captura la respuesta del método creado en el servicio
  const returnedNewProduct = await service.create(body);
  //Si es string es porque fue capturado el error que se lanzó desde .create(body), si no es string es porque se capturó el objeto retornado, en ese caso la información estaba correcta
  if (typeof returnedNewProduct === 'string') {
    res.status(400).json({
      status: 400,
      message: returnedNewProduct,
    });
  } else {
    res.status(201).json({
      status: 201,
      message: 'Created',
      data: returnedNewProduct,
    });
  }
});

//PATCH-updatePartial
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updateResult = await service.updatePartial(id, body);
  res.status(updateResult.status).json(updateResult);
});

//PUT updateAll
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updateResult = await service.updateAll(id, body);
  res.status(updateResult.status).json(updateResult);
});

//DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResult = await service.delete(id);
    res.status(deleteResult.status).json(deleteResult);
  } catch (err) {
    res.status(err.cause).json({
      status: err.cause,
      message: err.message,
    });
  }
});

module.exports = router;
