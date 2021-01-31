const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51IFHykDwPpnoI9tJu2fB8xfAl6pXdJzkr8VQ7RyeEHhSeIqIvcO1f3zrI8JMiSPqW5Ct7bjwWpRMFVN3IYl3pX8y00r2ohFUXn");


const app = express();
app.use(cors({origin: true}));
app.use(express.json());

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
