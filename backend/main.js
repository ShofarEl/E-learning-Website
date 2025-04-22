import dotenv from "dotenv";
dotenv.config();
import Stripe from 'stripe';
import cors from 'cors';
import express from "express";
import AuthRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/db.js";

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ CORS middleware setup
app.use(cors({
  origin: ["https://edumally.onrender.com", "http://localhost:5173"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Route to create a payment intent
function calculateOrderAmount(items) {
  // example: sum up item prices (convert to cents)
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return sum + price;
  }, 0);
  return Math.round(total * 100); // convert dollars to cents
}

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.use('/api/auth', AuthRoutes);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`server is listening to port ${PORT}`);
});
