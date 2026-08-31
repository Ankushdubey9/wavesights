const { setGlobalOptions } = require("firebase-functions");
const {
  onCall,
  HttpsError,
} = require("firebase-functions/https");

const { defineSecret } = require("firebase-functions/params");

const {
  initializeApp,
} = require("firebase-admin/app");

const {
  getFirestore,
} = require("firebase-admin/firestore");

const crypto = require("crypto");

initializeApp();

const db = getFirestore();

setGlobalOptions({
  maxInstances: 10,
});

const razorpayKeyId =
  defineSecret("RAZORPAY_KEY_ID");

const razorpayKeySecret =
  defineSecret("RAZORPAY_KEY_SECRET");


// =====================================================
// CREATE ONE-TIME ₹99 ORDER
// =====================================================

exports.createRazorpayOrder = onCall(
  {
    secrets: [
      razorpayKeyId,
      razorpayKeySecret,
    ],
  },

  async (request) => {
    try {

      // ------------------------------------------
      // LOGIN CHECK
      // ------------------------------------------

      if (!request.auth) {
        throw new Error(
          "Please login first."
        );
      }

      // ------------------------------------------
      // LOAD RAZORPAY
      // ------------------------------------------

      const Razorpay =
        require("razorpay");

      const razorpay =
        new Razorpay({
          key_id:
            razorpayKeyId.value(),

          key_secret:
            razorpayKeySecret.value(),
        });

      // ------------------------------------------
      // CREATE ₹99 ORDER
      // ------------------------------------------

      const order =
        await razorpay.orders.create({

          amount: 9900,

          currency: "INR",

          receipt:
            `ws_${Date.now()}_${request.auth.uid.slice(
              0,
              8
            )}`,

          notes: {
            userId:
              request.auth.uid,

            plan:
              "pro_30_days",
          },

        });

      console.log(
        "Razorpay order created:",
        order.id
      );

      // ------------------------------------------
      // SAVE ORDER TO FIRESTORE
      // ------------------------------------------

      await db
        .collection("razorpayOrders")
        .doc(order.id)
        .set({

          orderId:
            order.id,

          userId:
            request.auth.uid,

          amount:
            9900,

          currency:
            "INR",

          plan:
            "pro_30_days",

          status:
            "created",

          createdAt:
            new Date(),

        });

      console.log(
        "Order saved to Firestore:",
        order.id
      );

      // ------------------------------------------
      // RETURN ORDER TO FRONTEND
      // ------------------------------------------

      return {

        success: true,

        orderId:
          order.id,

        amount:
          order.amount,

        currency:
          order.currency,

      };

    } catch (error) {

      console.error(
        "Razorpay order error:",
        error
      );

      throw new Error(
        error?.error?.description ||
          error?.message ||
          "Unable to create Razorpay order."
      );
    }
  }
);


// =====================================================
// VERIFY RAZORPAY PAYMENT
// =====================================================

exports.verifyRazorpayPayment = onCall(
  {
    secrets: [
      razorpayKeyId,
      razorpayKeySecret,
    ],
  },

  async (request) => {

    try {

      // ------------------------------------------
      // LOGIN CHECK
      // ------------------------------------------

      if (!request.auth) {
        throw new Error(
          "Please login first."
        );
      }

      // ------------------------------------------
      // GET PAYMENT DATA
      // ------------------------------------------

      const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      } = request.data || {};

      if (
        !razorpay_payment_id ||
        !razorpay_order_id ||
        !razorpay_signature
      ) {
        throw new Error(
          "Missing Razorpay payment details."
        );
      }

      // ------------------------------------------
      // GET ORDER FROM FIRESTORE
      // ------------------------------------------

      const orderRef =
        db
          .collection("razorpayOrders")
          .doc(
            razorpay_order_id
          );

      const orderSnapshot =
        await orderRef.get();

      if (!orderSnapshot.exists) {
        throw new Error(
          "Order not found."
        );
      }

      const orderData =
        orderSnapshot.data();

      // ------------------------------------------
      // CHECK USER
      // ------------------------------------------

      if (
        orderData.userId !==
        request.auth.uid
      ) {
        throw new Error(
          "You are not authorized for this order."
        );
      }

      // ------------------------------------------
      // PREVENT DOUBLE PAYMENT PROCESSING
      // ------------------------------------------

      if (
        orderData.status ===
        "paid"
      ) {

        return {

          success: true,

          alreadyVerified:
            true,

          message:
            "Payment already verified.",

        };
      }

      // ------------------------------------------
      // VERIFY RAZORPAY SIGNATURE
      // ------------------------------------------

      const signatureBody =
        `${orderData.orderId}|${razorpay_payment_id}`;

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            razorpayKeySecret.value()
          )
          .update(signatureBody)
          .digest("hex");

      const receivedBuffer =
        Buffer.from(
          razorpay_signature,
          "utf8"
        );

      const generatedBuffer =
        Buffer.from(
          generatedSignature,
          "utf8"
        );

      if (
        receivedBuffer.length !==
        generatedBuffer.length
      ) {
        throw new Error(
          "Payment signature verification failed."
        );
      }

      const signatureValid =
        crypto.timingSafeEqual(
          receivedBuffer,
          generatedBuffer
        );

      if (!signatureValid) {
        throw new Error(
          "Payment signature verification failed."
        );
      }

      console.log(
        "Razorpay signature verified."
      );

      // ------------------------------------------
      // LOAD RAZORPAY
      // ------------------------------------------

      const Razorpay =
        require("razorpay");

      const razorpay =
        new Razorpay({
          key_id:
            razorpayKeyId.value(),

          key_secret:
            razorpayKeySecret.value(),
        });

      // ------------------------------------------
      // FETCH PAYMENT
      // ------------------------------------------

      const payment =
        await razorpay.payments.fetch(
          razorpay_payment_id
        );

      // ------------------------------------------
      // CHECK PAYMENT ORDER
      // ------------------------------------------

      if (
        payment.order_id !==
        orderData.orderId
      ) {
        throw new Error(
          "Payment does not belong to this order."
        );
      }

      // ------------------------------------------
      // CHECK AMOUNT
      // ------------------------------------------

      if (
        payment.amount !==
        9900
      ) {
        throw new Error(
          "Invalid payment amount."
        );
      }

      // ------------------------------------------
      // CHECK CURRENCY
      // ------------------------------------------

      if (
        payment.currency !==
        "INR"
      ) {
        throw new Error(
          "Invalid payment currency."
        );
      }

      // ------------------------------------------
      // CHECK CAPTURED
      // ------------------------------------------

      if (
        payment.status !==
        "captured"
      ) {
        throw new Error(
          `Payment is not captured. Current status: ${payment.status}`
        );
      }

      // ------------------------------------------
      // CALCULATE 30 DAYS
      // ------------------------------------------

      const activatedAt =
        new Date();

      const expiresAt =
        new Date(
          activatedAt.getTime() +
            30 *
              24 *
              60 *
              60 *
              1000
        );

      // ------------------------------------------
      // USER DOCUMENT
      // ------------------------------------------

      const userRef =
        db
          .collection("users")
          .doc(
            request.auth.uid
          );

      // ------------------------------------------
      // PAYMENT HISTORY
      // ------------------------------------------

      const paymentRef =
        db
          .collection("payments")
          .doc(
            razorpay_payment_id
          );

      // ------------------------------------------
      // FIRESTORE TRANSACTION
      // ------------------------------------------

      await db.runTransaction(
        async (transaction) => {

          const freshOrder =
            await transaction.get(
              orderRef
            );

          if (!freshOrder.exists) {
            throw new Error(
              "Order no longer exists."
            );
          }

          const freshOrderData =
            freshOrder.data();

          if (
            freshOrderData.status ===
            "paid"
          ) {
            return;
          }

          // --------------------------------------
          // UPDATE ORDER
          // --------------------------------------

          transaction.update(
            orderRef,
            {

              status:
                "paid",

              paymentId:
                razorpay_payment_id,

              verifiedAt:
                activatedAt,

              expiresAt:
                expiresAt,

            }
          );

          // --------------------------------------
          // ACTIVATE PRO
          // --------------------------------------

          transaction.set(
            userRef,
            {

              plan:
                "pro",

              proExpiresAt:
                expiresAt,

              proActivatedAt:
                activatedAt,

              lastPaymentId:
                razorpay_payment_id,

              lastOrderId:
                razorpay_order_id,

              updatedAt:
                activatedAt,

            },

            {
              merge: true,
            }
          );

          // --------------------------------------
          // SAVE PAYMENT
          // --------------------------------------

          transaction.set(
            paymentRef,
            {

              paymentId:
                razorpay_payment_id,

              orderId:
                razorpay_order_id,

              userId:
                request.auth.uid,

              amount:
                9900,

              currency:
                "INR",

              status:
                "captured",

              plan:
                "pro_30_days",

              activatedAt:
                activatedAt,

              expiresAt:
                expiresAt,

            }
          );

        }
      );

      console.log(
        "PRO ACTIVATED:",
        request.auth.uid
      );

      // ------------------------------------------
      // SUCCESS RESPONSE
      // ------------------------------------------

      return {

        success: true,

        message:
          "Payment verified successfully. Pro activated for 30 days.",

        plan:
          "pro",

        expiresAt:
          expiresAt.toISOString(),

        paymentId:
          razorpay_payment_id,

        orderId:
          razorpay_order_id,

      };

    } catch (error) {
  console.error(
    "Payment verification error:",
    error
  );

  throw new HttpsError(
    "internal",
    error?.message ||
      "Payment verification failed."
  );
}
  }
);