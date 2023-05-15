import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

let stripePriceIDs = {
    adultTouristTax: 'price_1MoqCcC82Wy83nu4jWsRJ6hI',
    childrenTouristTax: 'price_1MoqDCC82Wy83nu492oiEQF8'
}


export default async function handler(req: NextApiRequest, res: NextApiResponse){
      const data = req.body

      const checkoutProducts = [
        {
          price: stripePriceIDs.adultTouristTax,
          quantity: parseInt(data.numberOfAdults) * parseInt(data.numberOfNights)
        }
      ]
  
      if (parseInt(data.numberOfChildren) > 0) {
        checkoutProducts.push({
          price: stripePriceIDs.childrenTouristTax,
          quantity: parseInt(data.numberOfChildren) * parseInt(data.numberOfNights)
        })
      }
      
      try {
          const session =  await stripe.checkout.sessions.create({
              line_items: checkoutProducts,
              customer_email: data.customerEmail || '',
              mode: 'payment',
              success_url: `${req.headers.origin}/success`,
              cancel_url: `${req.headers.origin}/payment?canceled=true`,
              automatic_tax: { enabled: true }
            })
            res.redirect(303, session.url)
      } catch (err: any) {
          res.status(err.statusCode || 500).json(err.message)
      }
}
