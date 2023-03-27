const express = require("express");
const {
  getAll,
  getItem,
  createProduct,
  updatePartial,
  updateAll,
  deleteItem,
} = require("../../controllers/index");

const router = express.Router();

//Obtener productos
router.get("/", getAll);

//Obtener 1 producto con base en 1 id
router.get("/:id", getItem);

//Crear un producto
router.post("/", createProduct);

//PATCH-updatePartial
router.patch("/:id", updatePartial);

//PUT updateAll
router.put("/:id", updateAll);

//DELETE
router.delete("/:id", deleteItem);

module.exports = router;
