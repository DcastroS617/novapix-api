const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'debe iniciar sesion para poder hacer una orden']
    },
    products: [new mongoose.Schema({
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: [true, 'el producto debe existir en la base de datos']
        },
        quantity: {
            type: Number,
            required: [true, 'debe ingresar la cantidad de productos']
        },
        price: {
            type: Number,
            required: [true, 'debe introducir el precio del producto']
        }
    }, 
    {_id: false})],
    receiptId: {type: String},
    total: {type: Number},
    state: {type: Boolean}

}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)