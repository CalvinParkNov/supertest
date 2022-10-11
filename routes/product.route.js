const express = require("express");
const productControllers = require("../controllers/product.controller");

const router = express.Router();

router.get("/products", productControllers.getProducts);

router.get("/products/:id", productControllers.getProduct);

router.post("/products", productControllers.createProduct);

router.patch("/products/:id", productControllers.updateProduct);

router.delete("/products/:id", productControllers.deleteProduct);

module.exports = router;
