import express from 'express';
import { payment, webhook } from '../controllers/stripePaymentController';

const app = express.Router();

app.post('/create-payment-intent', payment);
app.post('/webhook', express.raw({ type: 'application/json' }), webhook);

export default app;