const Stripe = require("stripe");
// require("dotenv").config();

const createCheckout = async (req, res) => {
  // console.log(req.body);
  //   console.log(req.user);
  try {
    // console.log(process.env.STRIPE_SECRET_KEY);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const params = {
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "INR",
            product_data: {
              name: item.name,
              // images : [item.image]
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),

      success_url: `${process.env.FRONTEND_URL"}/success`,
      cancel_url: `${process.env.FRONTEND_URL"}/cancelled`,
    };

    const session = await stripe.checkout.sessions.create(params);
    return res.status(200).json(session.id);
    // res.json("hii");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { createCheckout };
