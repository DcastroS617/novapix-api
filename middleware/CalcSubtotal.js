const CalculateSubtotal = async (req, res, next) => {
    let subtotal = 0;
    req.body.products.forEach((item) => subtotal += item.price);
    req.body.subtotal = subtotal;
    next();
}

module.exports = CalculateSubtotal