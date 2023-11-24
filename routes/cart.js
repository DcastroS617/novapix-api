const { CreateCart, GetUserCart } = require('../controllers/cart')
const { AuthenticateUser } = require('../middleware/Authentication')
const CalculateSubtotal = require('../middleware/CalcSubtotal')
const express = require('express')
const router = express.Router()

router.route('/cart/:id').post([AuthenticateUser, CalculateSubtotal], CreateCart).get(AuthenticateUser, GetUserCart)


module.exports = router