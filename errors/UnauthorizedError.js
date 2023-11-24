const {StatusCodes} = require('http-status-codes')

class UnauthorizedError extends Error{
    constructor(message){
        super(message)
        this.statuscode = StatusCodes.UNAUTHORIZED || 401
    }
}

module.exports = UnauthorizedError;