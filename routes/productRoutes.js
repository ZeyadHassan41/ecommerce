const express = require('express');
const Verification = require('../middlewares/Verification');
const Authorized = require('../middlewares/Authorization');
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');


//Public customer or admin can access it 3ady
router.get('/', getProducts);
router.get('/:id', getProductById);

//only admin can create or update or delete a product
router.post('/', Verification, Authorized(['admin']), createProduct);
router.put('/:id', Verification, Authorized(['admin']), updateProduct);
router.delete('/:id', Verification, Authorized(['admin']), deleteProduct);

module.exports = router;