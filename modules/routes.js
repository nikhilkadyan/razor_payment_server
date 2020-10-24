module.exports = function (app) {
    const Razorpay = require('razorpay');

    var instance = new Razorpay({
        key_id: process.env.RAZOR_KEY,
        key_secret: process.env.RAZOR_SECRET
    })

    app.get('/products', (req, res) => {
        const allProducts = require('./products.js')();
        let products = allProducts.map((p) => {
            delete p.secret
            return p
        })
        res.send(products);
    });

    app.post('/checkout', async (req, res) => {
        const payment_id = req.body.payment_id;
        let payment = await instance.payments.fetch(payment_id);
        if (payment) {
            let charge = await instance.payments.capture(payment_id, payment.amount, payment.currency)
            if (charge) {
                const allProducts = require('./products.js')();
                const userProduct = allProducts.filter(p => p.id === req.body.product_id)[0];
                res.send(userProduct);
            }
        }
    });
}