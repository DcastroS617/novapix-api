const { StatusCodes } = require("http-status-codes")
const CartSchema = require("../models/cart")
const OrderSchema = require('../models/order')
const NotFoundError = require("../errors/NotFoundError")
const { GenerateClientToken, CreateSale } = require('../utils/BraintreeUtils')


const GenerateToken = async (req, res) => {
    const clientToken = await GenerateClientToken()
    return res.status(StatusCodes.OK).json({ clientToken })
}

const PurchaseOrder = async (req, res) => {
    const { body: { userId, nonce, deviceData } } = req
    const orderFound = await CartSchema.findOne({ userId: userId })

    if (!orderFound)
        throw new NotFoundError('no has seleccionado productos')

    //total con IVA
    const total = orderFound.subtotal + (orderFound.subtotal * .13)

    //inserte card methods
    const paypalResponse = await CreateSale(total, nonce, deviceData)
    req.body.total = total
    req.body.state = !req.body.state
    req.body.receiptId = paypalResponse.transaction.id
    console.log(req.body)

    await CartSchema.findOneAndDelete({_id: orderFound._id})
    const createPurchase = await OrderSchema.create(req.body)

    return res.status(StatusCodes.OK).json({ msg: "purchased", receipt: paypalResponse.transaction.paymentReceipt, purchase: createPurchase})

}

const GetPurchases = async (req, res) => {
    const { params: { id } } = req
    const ordersFound = await OrderSchema.find({ userId: id })

    if (!ordersFound)
        throw new NotFoundError('no tienes ordenes compradas')

    return res.status(StatusCodes.OK).json({ ordersFound })
}

module.exports = {
    PurchaseOrder, GetPurchases, GenerateToken
}