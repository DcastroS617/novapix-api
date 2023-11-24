const {StatusCodes} = require('http-status-codes')
const ReviewSchema = require("../models/review")
const NotFoundError = require('../errors/NotFoundError')
const BadRequestError = require('../errors/BadRequestError')

const createReview = async (req, res) => {
    const {params: {id}} = req
    const foundReviews = await ReviewSchema.find({productId: id})

    //medida para controlar el spam
    if(foundReviews.length === 3)
        throw new BadRequestError("has superado el limite de reseñas que puedes dejar en este producto")

    const review = await ReviewSchema.create(req.body)
    return res.status(StatusCodes.CREATED).json({review})
}

const getReviews = async (req, res) => {
    const {params: {id}} = req
    const reviews = await ReviewSchema.find({productId: id}).select('-__v')

    if(!reviews)
        throw new NotFoundError('El producto no existe')

    return res.status(StatusCodes.OK).json({reviews})
}

const updateReview = async (req, res) => {
    const {body: {productId, userId}} = req
    const review = await ReviewSchema.findOne({productId: productId, userId: userId})

    if(!review){
        throw new NotFoundError('Debes dejar un review')
    }

    const updateReview = await ReviewSchema.findOneAndUpdate({_id: review._id}, req.body, {
        runValidators: true,
        new: true
    })

    return res.status(StatusCodes.OK).json({updateReview})
}

//para dar like se ocupa, productId, creatorUserId, likeUserId

const deleteReview = async (req, res) => {
    const {query: {productId, userId}} = req
    const review = await ReviewSchema.findOne({productId, userId})

    if(!review)
        throw new NotFoundError('no se encuentran los reviews')

    await ReviewSchema.findByIdAndDelete(review._id)
    return res.status(StatusCodes.OK).json({msg: 'deleted'})
}

module.exports = {
    getReviews,
    createReview,
    deleteReview,
    updateReview
}