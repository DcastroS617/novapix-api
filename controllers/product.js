const {StatusCodes} = require('http-status-codes')
const ProductModel = require("../models/product")
const NotFoundError = require('../errors/NotFoundError')
const BadRequestError = require('../errors/BadRequestError')
const { Delete, Upload } = require('../utils/CloudinaryUtils')

const createProduct = async (req, res) => {
    const product = await ProductModel.create(req.body)
    return res.status(StatusCodes.CREATED).json({product})
}

const getAllProducts = async (req, res) => {
    const {query: {productName, productPlatform, productCategory}} = req
    const queryObject = {}

    if(productName)
        queryObject.productName = {$regex: productName, $options: 'i'}

    if(productPlatform)
        queryObject.productPlatform = {$regex: productPlatform, $options: 'i'}

    if(productCategory)
        queryObject.productCategory = {$regex: productCategory, $options: 'i'}

    //let result = ProductModel.find(queryObject).select('-__v')

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;

    //console.log(queryObject)
    const products = await ProductModel.find(queryObject)
    .skip(skip).limit(limit)

    if(!products)
        throw new NotFoundError('no existen registros de productos')
    
    //console.log(products)
    return res.status(StatusCodes.OK).json({products})
}

const updateProduct = async (req, res) => {
    const {params: {id}} = req
    const product = await ProductModel.findById(id)

    if(!product)
        throw new NotFoundError('El producto no se encuentra registrado')

    const imageResult = await Delete(product.imageID)

    if(!imageResult)
        throw new BadRequestError('No se pudo eliminar el producto')

    await Upload(req);
    const newProduct = await ProductModel.findByIdAndUpdate({_id: product._id}, req.body, 
        {new: true, runValidators:true})

    return res.status(StatusCodes.OK).json({newProduct})
}


const deleteProduct = async (req, res) => {
    const {params: {id}} = req
    const product = await ProductModel.findById(id)

    if(!product)
        throw new NotFoundError('El producto no se encuentra registrado')

    const imageResult = await Delete(product.imageID)
    const productResult = await ProductModel.findByIdAndDelete(product._id)

    if(!imageResult || !productResult)
        throw new BadRequestError('No se pudo eliminar el producto')

    return res.status(StatusCodes.OK).json({id, imageId: product.imageID})
}

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}