const ProductsService = require("../services/products/productsServices");
const service = new ProductsService();

//OK control de error Try Catch
async function getAll(req, res) {
  try {
    const products = await service.find();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

//OK control de error Try Catch
async function getItem(req, res) {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(product.status).json(product);
  } catch (err) {
    res.status(err.cause).json({
      status: err.cause,
      message: err.message,
    });
  }
}

//OK control de error Try Catch
async function createProduct(req, res) {
  try {
    const body = req.body;
    //Se captura la respuesta del método creado en el servicio
    const result = await service.create(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err.cause).json({
      status: err.cause,
      message: err.message,
    });
  }
}

//OK control de error Try Catch
async function updatePartial(req, res) {
    try{
        const { id } = req.params;
        const body = req.body;
        const updateResult = await service.updatePartial(id, body);
        res.status(updateResult.status).json(updateResult);
    } catch(err){
        res.status(err.cause).json({
            status:err.cause,
            message: err.message
        })
    }

}

async function updateAll(req, res) {
  const { id } = req.params;
  const body = req.body;
  const updateResult = await service.updateAll(id, body);
  res.status(updateResult.status).json(updateResult);
}

//OK control de error Try Catch
async function deleteItem(req, res) {
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
}

module.exports = {
  getAll,
  getItem,
  createProduct,
  updatePartial,
  updateAll,
  deleteItem,
};
