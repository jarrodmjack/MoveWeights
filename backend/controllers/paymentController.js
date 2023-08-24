const User = require("../models/userModel")
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

console.log("stripe key: ", process.env.STRIPE_PRIVATE_KEY)
// const createCheckoutSession = async (req, res) => {
// 	// console.log("HIT CREATE CHECKOUT SESSION")
//     try {
//         const userId = req.user.id
//         console.log('userId: ', userId)
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: "payment",
//             line_items: [{price_data: {
//                 currency: 'cad',
//                 product_data: {
//                     name: "MoveWeights +"
//                 },
//                 unit_amount: Number(process.env.MOVEWEIGHTS_PURCHASE_PRICE)
//             }, quantity: 1}],
//             success_url: `${process.env.NEXT_FRONTEND_URL}/payment/success`,
//             cancel_url: `${process.env.NEXT_FRONTEND_URL}/payment/cancel`
//         })
//         res.status(200).json({ url: session.url })
//     } catch (e) {
//         console.log('e: ', e.message)
//         res.status(500).json({error: e.message})
//     }
// }

// This is your test secret API key.

const createCheckoutSession = async (req, res) => {
	console.log("hit endpoint")

	try {
		const price = await stripe.prices.create({
			unit_amount: 599,
			currency: "cad",
			product: "prod_OVfEB9WzO5QqZn",
		})

		console.log("price: ", price)

		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: price.id, // Using price ID
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `${process.env.NEXT_FRONTEND_URL}/payment/success`,
			cancel_url: `${process.env.NEXT_FRONTEND_URL}`,
			automatic_tax: { enabled: true },
		})
        console.log('session: ', session)
		res.status(200).json({ url: session.url })
	} catch (error) {
		console.error("Error creating checkout session:", error)
		res.status(500).json({
			error: "An error occurred while creating the checkout session.",
		})
	}
}

module.exports = { createCheckoutSession }
