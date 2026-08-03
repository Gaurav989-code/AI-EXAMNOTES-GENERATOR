import Stripe from "stripe";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
  99: 100,
  199: 240,
  500: 750,
};

// --- CREATE CHECKOUT SESSION ORDER ---
export const createCreditsOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;

    if (!CREDIT_MAP[amount]) {
      return res.status(400).json({ message: "Invalid amount selection tier" });
    }

    const creditAmount = CREDIT_MAP[amount];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `.ExamNotes AI - ${creditAmount} Credits Pack`,
              description: `Top up account with ${creditAmount} study tokens for revision tools.`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        userId: userId.toString(),
        amountPaid: amount.toString(),
        creditsToReward: creditAmount.toString(),
      },
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
    });

    return res.status(200).json({
      success: true,
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error(
      "Critical error building Stripe gateway pipeline session:",
      error
    );
    return res.status(500).json({ message: "Internal server error blueprint" });
  }
};

// --- STRIPE ASYNCHRONOUS WEBHOOK ---
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(
      `⚠️ Webhook signature cryptographic verification failed:`,
      err.message
    );
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, creditsToReward } = session.metadata;

    if (!userId || !creditsToReward) {
      console.error(
        "❌ Webhook Error: Missing userId or creditsToReward in session metadata."
      );
      return res.status(400).json({ message: "Invalid webhook data" });
    }

    try {
      const creditIncrement = parseInt(creditsToReward, 10);

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          $inc: { credits: creditIncrement },
          $set: { isCreditsAvailable: true },
        },
        { new: true }
      );

      if (!updatedUser) {
        console.error(
          `❌ Webhook Error: Target user ID ${userId} not located in records.`
        );
        return res
          .status(404)
          .json({ message: "User reference dropped from pipeline" });
      }

      console.log(
        `✅ Success: Added ${creditIncrement} credits to User ID ${userId}`
      );
    } catch (dbError) {
      console.error(
        "❌ Database updates collapsed during webhook deposit execution:",
        dbError
      );
      return res
        .status(500)
        .json({ message: "Database update failure pipeline" });
    }
  }

  return res.status(200).json({ received: true });
};
