import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../utils/db";
import stripe from "../utils/stripe";
import { Stripe } from 'stripe'; // Import Stripe types

export async function payment(req: Request, res: Response) {
  const { therapistId, clientId } = req.body;

  try {
    const therapist = await prisma.therapist.findUnique({
      where: { id: therapistId },
    });

    if (!therapist) {
      return res.status(404).json({ error: 'Therapist not found' });
    }

    // Calculate the total price (therapist's rate + $1 service fee)
    const totalAmount = therapist.hourlyRate + 1;

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // convert dollars to cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        therapistId: therapistId.toString(),
        clientId: clientId.toString(),
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: 'Payment failed' });
  }
}

export async function webhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'];

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    return res.status(400).send("Unknown error occurred.");
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { therapistId, clientId } = paymentIntent.metadata;

    try {
      // Update the therapist's account by creating a session record
      await prisma.therapist.update({
        where: { id: parseInt(therapistId, 10) },
        data: {
          earnings: {
            increment: paymentIntent.amount / 100, // Convert cents to dollars
          },
        },
      });

      await prisma.session.create({
        data: {
          therapistId: parseInt(therapistId, 10),
          date: new Date(), // set current date/time for simplicity
          duration: 60, // assume a default session length, this can be dynamic
          type: "VIDEO", // can also make this dynamic or customizable
          status: "COMPLETED", // session is completed after payment success
        },
      });

      // Log payment success
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful! Session created for therapist ${therapistId}`);
    } catch (error) {
      console.error("Error updating therapist's account:", error);
      return res.status(500).send("Error updating therapist's account");
    }
  }

  res.json({ received: true });
}
