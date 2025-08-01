import express from 'express'
import { creditCardPayment, getPaymentStatus, handleOmiseWebhook, qrPayment } from '../controllers/payment.controller.js';



const paymentRouter = express.Router();




paymentRouter.post("/credit", creditCardPayment);
paymentRouter.post("/qr", qrPayment);
paymentRouter.post("/webhook", handleOmiseWebhook);
paymentRouter.get("/status/:chargeId", getPaymentStatus);


export default paymentRouter