import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";

const functions = getFunctions(app);

// ==========================================
// ONE-TIME ₹99 / 30 DAYS
// ==========================================

export const createRazorpayOrder = async () => {
  const createOrder = httpsCallable(
    functions,
    "createRazorpayOrder"
  );

  const result = await createOrder();

  return result.data;
};

// ==========================================
// VERIFY PAYMENT + ACTIVATE PRO
// ==========================================

export const verifyRazorpayPayment = async ({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
}) => {
  const verifyPayment = httpsCallable(
    functions,
    "verifyRazorpayPayment"
  );

  const result = await verifyPayment({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  });

  return result.data;
};