import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
  const booking = useLoaderData();
  // console.log(booking);
  const { resalePrice, productName } = booking;

  return (
    <div>
      <h2 className="text-3xl">Payment for {productName}</h2>
      <h3 className="tetx-xl">
        Please pay <strong>${resalePrice}</strong> for your booking products.
      </h3>

      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
