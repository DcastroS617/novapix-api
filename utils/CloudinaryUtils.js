const cloudinary = require('cloudinary')
const fs = require('fs')

const Upload = async (req) => {
    //console.log(req.files.productImage)
    const{
        files: {
            image
        }
    } = req
    //console.log(image);
    if (req.files) {
        if (image.tempFilePath) {
            const uploaded = await cloudinary.uploader.upload(image.tempFilePath, {
                use_filename: true,
                folder: 'file-upload'
            })
            //console.log(uploaded);
            req.body.image = uploaded.secure_url
            req.body.imageID = uploaded.public_id
            fs.unlinkSync(image.tempFilePath)
        }
    }
}

const Delete = async (imageId) => {
    const result = await cloudinary.v2.api.delete_resources([imageId], {
        type: 'upload', resource_type: 'image'
    })
    return result;
}

module.exports = {
    Upload,
    Delete
}