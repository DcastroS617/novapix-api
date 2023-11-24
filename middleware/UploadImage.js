const {Upload} = require('../utils/CloudinaryUtils')

const UploadImage = async (req, res, next) => {
    await Upload(req)
    next()
}

module.exports = UploadImage