const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'debe iniciar sesion para poder dejar una reseña']
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: [true, 'error del sistema'] //se debe seleccionar un producto para comentar
    },
    review: {
        type: String,
        required: [true, 'el comentario se encuentra vacio'],
        maxLength: 500
    },
    //opcional
    likes:{ type: Number, default: 0 }
}, {timestamps: true})

module.exports = mongoose.model('Review', ReviewSchema)