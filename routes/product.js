const express = require('express')
const { getAllProducts, createProduct, deleteProduct, updateProduct } = require('../controllers/product')
const {AuthenticateUser, AuthorizePermissions} = require('../middleware/Authentication')
const UploadImage = require('../middleware/UploadImage')
const router = express.Router()

router.route('/product').get(getAllProducts)
    .post([AuthenticateUser, AuthorizePermissions('admin', 'moderator'), UploadImage], createProduct)
    
router.route('/product/:id').patch([AuthenticateUser, AuthorizePermissions('admin', 'moderator')], updateProduct)
    .delete([AuthenticateUser, AuthorizePermissions('admin')], deleteProduct)


module.exports = router;