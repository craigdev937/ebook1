const express = require('express');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const router = express.Router();

// Index Route
router.get('/', (req, res) => {
    res.render('index', {
        stripePublishableKey: keys.stripePublishableKey
    });
});

// Success Route
router.get('/success', (req, res) => {
    res.render('success', { title: 'Success' });
});


// Charge Route
router.post('charge', (req, res) => {
    let amount = 2500;  // We say 2500 for $25.00
    console.log(req.body);  //  Get form data with body-parser
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount: amount,
        description: 'T-shirts',
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => res.render('success'));
});

module.exports = router;

