const express = require('express')
const { PurchaseOrder, GetPurchases, GenerateToken } = require('../controllers/order')
const { AuthenticateUser } = require('../middleware/Authentication')
const CalculateSubtotal = require('../middleware/CalcSubtotal')
const router = express.Router()

router.route('/order/:id').post([AuthenticateUser, CalculateSubtotal], PurchaseOrder)
    .get([AuthenticateUser,], GetPurchases)

router.route('/token').get([AuthenticateUser], GenerateToken)

router.route('/checkout').post([AuthenticateUser, CalculateSubtotal], PurchaseOrder)

module.exports = router