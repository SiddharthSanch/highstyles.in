import { useCart } from "@/app/context/cart";
import { NextResponse } from "next/server";

const Razorpay = require("razorpay");
const shortid = require("shortid");

export async function POST(req, res) {
  const val = req.headers.get("cartVal");
  // const razorpay = new Razorpay({
  //   key_id: process.env.NEXT_PUBLIC_TEST_KEY_ID,
  //   key_secret: process.env.NEXT_PUBLIC_TEST_KEY_SECRET,
  // });
  let razorpay;

  if (process.env.NODE_ENV === "development") {
    razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_TEST_KEY_ID,
      key_secret: process.env.NEXT_PUBLIC_TEST_KEY_SECRET,
    });
  } else {
    razorpay = new Razorpay({
      key_id: process.env.TEST_KEY_ID,
      key_secret: process.env.TEST_KEY_SECRET,
    });
  }

  const payment_capture = 1;
  const amount = val;
  const currency = "INR";
  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    return NextResponse.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}
