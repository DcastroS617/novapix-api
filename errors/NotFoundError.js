const {StatusCodes} = require('http-status-codes')

class NotFoundError extends Error{
    constructor(message){
        super(message)
        this.statuscode = StatusCodes.NOT_FOUND || 404
    }
}

module.exports = NotFoundError;

