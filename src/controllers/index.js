const ProductsService = require("../services/products/productsServices");
const service = new ProductsService();

//Para incorporar el middleware se agrega el parámetro next y el error debe ser capturado para enviarlo
//OK control de error Try Catch
//OK middleware
async function getAll(req, res, next) {
  try {
    const products = await service.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

//OK control de error Try Catch
//OK middleware
async function createProduct(req, res, next) {
  try {
    const body = req.body;
    //Se captura la respuesta del método creado en el servicio
    const result = await service.create(body);
    res.status(result.status).json(result);
  } catch (err) {
    console.log("control1");
    next(err);
  }
}

//OK control de error Try Catch
//OK middleware
async function getItem(req, res, next) {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(product.status).json(product);
  } catch (err) {
    next(err);
  }
}

//OK control de error Try Catch
async function updatePartial(req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateResult = await service.updatePartial(id, body);
    res.status(updateResult.status).json(updateResult);
  } catch (err) {
    next(err);
    // res.status(err.cause).json({
    //   status: err.cause,
    //   message: err.message,
    // });
  }
}

async function updateAll(req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateResult = await service.updateAll(id, body);
    res.status(updateResult.status).json(updateResult);
  } catch (err) {
    next(err);
  }
}

//OK control de error Try Catch
async function deleteItem(req, res, next) {
  try {
    const { id } = req.params;
    const deleteResult = await service.delete(id);
    res.status(deleteResult.status).json(deleteResult);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  getItem,
  createProduct,
  updatePartial,
  updateAll,
  deleteItem,
};
