const braintree = require('../db/ConnectBraintree')

const GenerateClientToken = async () => {
    try {
        const gateway = braintree(process.env.MERCHANT_ID_BT, process.env.PUBLIC_KEY_BT, process.env.PRIVATE_KEY_BT)
        const clientToken = await gateway.clientToken.generate({})
        console.log(clientToken.clientToken)
        return clientToken.clientToken
    } catch (error) {
        throw new Error(error.message);
    }
}

const CreateSale = async (amount, nonce, deviceData) => {
    try {
        const gateway = braintree(process.env.MERCHANT_ID_BT, process.env.PUBLIC_KEY_BT, process.env.PRIVATE_KEY_BT)
        const result = await gateway.transaction.sale({
            amount: amount,
            paymentMethodNonce: nonce,
            deviceData: deviceData,
            options: {
                submitForSettlement: true
            }
        })
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    GenerateClientToken, CreateSale
}