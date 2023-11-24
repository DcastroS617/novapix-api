
const braintree = require("braintree");

const configBraintree = (merchantId, publicKey, privateKey) => {
    return new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: merchantId,
        publicKey: publicKey,
        privateKey: privateKey
    })
};

module.exports = configBraintree