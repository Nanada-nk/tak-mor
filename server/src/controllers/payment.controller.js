
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
 
      const payment = await prisma.payment.create({
        data: {
          patientId,
          amount: amount / 100, 
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

  
  console.log('Received Omise webhook event:', JSON.stringify(event));


  if (event.key !== 'charge.complete') {
    return res.status(200).send("Event not relevant.");
  }

  try {
    const charge = event.data.object;

  
    const existingPayment = await prisma.payment.findFirst({
      where: { transactionId: charge.id }
    });

    if (existingPayment) {
  
      if (charge.status === 'successful') {
 
        await prisma.payment.update({
          where: { id: existingPayment.id },
          data: { status: 'COMPLETED' }
        });
        console.log(`Payment ID ${existingPayment.id} successfully updated to COMPLETED.`);
      } else {
        console.log(`Payment ID ${existingPayment.id} has status: ${charge.status}. No action taken.`);
      }


      await prisma.webhookLog.create({
        data: {
          paymentId: existingPayment.id, 
          rawData: event
        }
      });
    } else {
      console.warn(`Webhook received for unknown transactionId: ${charge.id}`);
      await prisma.webhookLog.create({
        data: {
          rawData: event 
        }
      });
    }

  
    res.sendStatus(200);
  } catch (err) {
    console.error('Webhook error:', err);
    
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