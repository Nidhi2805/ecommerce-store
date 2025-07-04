const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('your_secret_key_here');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd'
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/orders', async (req, res) => {
  console.log('Order received:', req.body);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));