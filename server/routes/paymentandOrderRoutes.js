const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const{deleteOrderWithPayment,makePaymentOrder,getAllPaymentAndOrder} = require('../controller/paymentControlller')


const router = express.Router()


//require auth for all workout routes
router.use(requireAuth)

//get all payment and order list
router.get('/getorderlist',getAllPaymentAndOrder)

// DELETE a order
router.delete('/delete/:id', deleteOrderWithPayment)

// POST a new workout
router.post('/make', makePaymentOrder)

module.exports = router