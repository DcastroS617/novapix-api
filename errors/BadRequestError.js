const {StatusCodes} = require('http-status-codes')

class BadRequestError extends Error{
    constructor(message){
        super(message)
        this.statuscode = StatusCodes.BAD_REQUEST || 400
    }
}

module.exports = BadRequestError;