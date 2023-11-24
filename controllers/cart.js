const { StatusCodes } = require("http-status-codes")
const CartSchema = require("../models/cart")
const BadRequestError = require("../errors/BadRequestError")
const NotFoundError = require("../errors/NotFoundError")

const CreateCart = async (req, res) => {
    const {params: {id}} = req   
    const orderFound = await CartSchema.findOne({userId: id})

    if(!orderFound){
        const newOrder = await CartSchema.create(req.body)
        return res.status(StatusCodes.OK).json({newOrder})
    }

    const orderUpdate = await CartSchema.findByIdAndUpdate(orderFound._id, req.body, {
        new: true,
        runValidators: true
    })

    if(!orderUpdate)
        throw new BadRequestError('Error del servidor')

    return res.status(StatusCodes.OK).json({orderUpdate})
}

const GetUserCart = async (req, res) => {
    const {params: {id}} = req
    const order = await CartSchema.findOne({userId: id})

    if(!order)
        throw new NotFoundError('no has seleccionado productos')

    return res.status(StatusCodes.OK).json({order})
}



module.exports = {
    CreateCart,
    GetUserCart
}