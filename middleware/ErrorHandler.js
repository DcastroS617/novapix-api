const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = async(err, req, res, next) => {
    console.log(err.message);
    return res.status(err.statuscode).json({error: err.message})
}

module.exports = errorHandlerMiddleware