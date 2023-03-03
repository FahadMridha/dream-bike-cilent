// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

// import React, { useEffect, useState } from "react";

// const CheckoutForm = ({ booking }) => {
//   const [cardError, setCardError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [process, setProcess] = useState(false);
//   const [transationid, setTransationid] = useState("");
//   const [clientSecret, setClientSecret] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();
//   const { resalePrice, name, email, _id } = booking;
//   console.log(booking);

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch("https://dream-bike-alpha-green.vercel.app/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         resalePrice,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, [resalePrice]);

//   const handlerSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }
//     const card = elements.getElement(CardElement);
//     if (card === null) {
//       return;
//     }
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });
//     if (error) {
//       // console.log(error);
//       setCardError(error.message);
//     } else {
//       setCardError("");
//     }
//     console.log(clientSecret);
//     setSuccess("");
//     setProcess(true);
//     const { paymentIntent, error: confirmError } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             name: name,
//             email: email,
//           },
//         },
//       });
//     if (confirmError) {
//       setCardError(confirmError.message);
//       return;
//     }
//     if (paymentIntent.status === "succeeded") {
//       const payment = {
//         resalePrice,
//         transitionId: paymentIntent.id,
//         bookingId: _id,
//         email,
//       };
//       fetch("https://dream-bike-alpha-green.vercel.app/payments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payment),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.insertedId) {
//             setSuccess("Congrats! your payment is complete");
//             setTransationid(paymentIntent.id);
//           }
//         });
//     }
//     setProcess(false);
//   };

//   return (
//     <>
//       <form onSubmit={handlerSubmit}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                 },
//               },
//               invalid: {
//                 color: "#9e2146",
//               },
//             },
//           }}
//         />
//         <button
//           className="btn btn-sm btn-primary my-4"
//           type="submit"
//           disabled={!stripe || !clientSecret || process}
//         >
//           Pay
//         </button>
//       </form>
//       <p className="text-red-400">{cardError}</p>
//       {success && (
//         <div>
//           <p className="text-green-500">{success}</p>
//           <p className="">
//             your Transaction Id{" "}
//             <span className="font-bold">{transationid}</span>
//           </p>
//         </div>
//       )}
//     </>
//   );
// };

// export default CheckoutForm;
