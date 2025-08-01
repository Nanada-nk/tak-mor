
import prisma from "../config/prisma.config.js";
import omiseClient from "../config/omise.js"

export const creditCardPayment = async (req, res) => {
  const { token, amount, patientId, method } = req.body;

  try {
    const charge = await omiseClient.charges.create({
      amount,
      currency: "thb",
      card: token,
      description: "Doctor Appointment"
    });

    if (charge.status === "successful") {
      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          patientId,
          amount: amount / 100, // satang to baht
          transactionId: charge.id,
          method,
          status: "COMPLETED"
        }
      });

      res.json({ success: true, charge, paymentId: payment.id });
    } else {
      res.status(400).json({ error: charge.failure_message });
    }
  } catch (err) {
    console.error("Server error during credit card payment:", err);
    res.status(500).json({ error: err.message });
  }
};


export const qrPayment = async (req, res) => {
  const { amount, patientId } = req.body;

  try {
    const charge = await omiseClient.charges.create({
      amount,
      currency: "thb",
      source: { type: "promptpay" },
      return_uri: "http://localhost:5173/qr-callback"
    });

    if (charge.authorize_uri) {
      // Log pending payment first
      const payment = await prisma.payment.create({
        data: {
          patientId,
          amount: amount / 100,
          transactionId: charge.id,
          method: 'promptpay',
          status: 'PENDING'
        }
      });

      res.json({
        authorizeUri: charge.authorize_uri,
        chargeId: charge.id,
        paymentId: payment.id
      });
    } else {
      res.status(400).json({ error: "QR payment failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const handleOmiseWebhook = async (req, res) => {
  const event = req.body;

  // Best practice: Log the event data before any other logic
  console.log('Received Omise webhook event:', JSON.stringify(event));

  // A basic check to make sure this is a charge event
  if (event.key !== 'charge.complete') {
    return res.status(200).send("Event not relevant.");
  }

  try {
    const charge = event.data.object;

    // Find the payment in your database using the Omise charge ID
    const existingPayment = await prisma.payment.findFirst({
      where: { transactionId: charge.id }
    });

    if (existingPayment) {
      // It's important to only update if the charge was successful
      if (charge.status === 'successful') {
        // Update the payment status to COMPLETED
        await prisma.payment.update({
          where: { id: existingPayment.id },
          data: { status: 'COMPLETED' }
        });
        console.log(`Payment ID ${existingPayment.id} successfully updated to COMPLETED.`);
      } else {
        // Handle other statuses like 'failed', 'expired', etc.
        console.log(`Payment ID ${existingPayment.id} has status: ${charge.status}. No action taken.`);
      }

      // Log the webhook for auditing/debugging
      await prisma.webhookLog.create({
        data: {
          paymentId: existingPayment.id, // Use the ID of the found payment
          rawData: event
        }
      });
    } else {
      console.warn(`Webhook received for unknown transactionId: ${charge.id}`);
      await prisma.webhookLog.create({
        data: {
          rawData: event // Log it even if no payment was found
        }
      });
    }

    // Always send a 200 OK response to Omise to confirm receipt.
    res.sendStatus(200);
  } catch (err) {
    console.error('Webhook error:', err);
    // Send a 500 status code to tell Omise to retry the webhook
    res.sendStatus(500);
  }
};

export const getPaymentStatus = async (req, res) => {
  const { chargeId } = req.params;

  try {
    const payment = await prisma.payment.findUnique({
      where: { transactionId: chargeId }
    });

    if (payment) {
      return res.json({ status: payment.status });
    } else {
      return res.status(404).json({ error: "Payment not found" });
    }
  } catch (err) {
    console.error("Failed to fetch payment status:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};