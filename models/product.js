const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'debe introducir el nombre del producto']
    },
    productDescription: {
        type: String,
        required: [true, 'debe introducir el tipo de producto que esta insertando']
    },
    productPrice: {
        type: Number,
        required: [true, 'debe introducir el precio de producto que esta insertando']
    },
    productCategory: {
        type: String,
        required: [true, 'debe introducir la categoria del producto que esta insertando']
    },
    productPlatform: {
        type: String,
        required: [true, 'debe introducir la plataforma del producto que esta insertando']
    },
    productStock: {
        type: Number,
        required: [true, 'debe introducir la cantidad del producto que esta insertando']
    },
    image: {
        type: String,
        required: [true, 'error al comunicarse con cloudinary']
    },
    imageID:{
        type: String,
        required: [true, 'error al comunicarse con cloudinary']
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Product", ProductSchema)