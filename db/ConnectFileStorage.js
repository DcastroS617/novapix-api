const cloudinary = require('cloudinary').v2

const configCloudinary = (cloud_name, api_key, api_secret) => {
    return cloudinary.config({
        cloud_name: cloud_name,
        api_key: api_key,
        api_secret: api_secret
    });
}

module.exports = configCloudinary

