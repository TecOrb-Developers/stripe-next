import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { logEvent, Result, ErrorResult } from "@/utils/page";
import { useState } from "react";
import Heading from "../Heading/page";
import PaymentSuccsess from "../Card/PaymentSuccess";
const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const SplitCardCheckout = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [name, setName] = useState("");
  const [postal, setPostal] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState<null | any>(null);
  const reset = () => {
    setPostal("");
    setName("");
    setPaymentMethod(null);
    setErrorMessage(null);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardNumberElement);

    if (card == null) {
      return;
    }

    const payload: any = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name,
        address: {
          postal_code: postal,
        },
      },
    });

    if (payload.error) {
      console.log("[error]", payload.error);
      setErrorMessage(payload.error.message);
      setPaymentMethod(null);
    } else {
      console.log("[PaymentMethod]", payload.paymentMethod);
      setPaymentMethod(payload.paymentMethod);
      setErrorMessage(null);
    }
  };
  if (paymentMethod)
    return <PaymentSuccsess paymentMethod={paymentMethod} reset={reset} />;
  return (
    <div>
      <Heading heading="Split Card" />
      <form className="w-96 bg-white p-5 rounded-xl xss:w-full " onSubmit={handleSubmit}>
        <fieldset className="p-0 m-0 border-none">
          <div className="flex items-center pb-3 mt-3 border-b-2 border-gray-200">
            <label htmlFor="name" className="text-cyan-200 pr-3 w-24">Full Name</label>
            <input
              id="name"
              className="focus:outline-none placeholder-[#87bbfd]"
              required
              placeholder="Jenny Rosen"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center pb-3 mt-3 border-b-2 border-gray-200">
            <label htmlFor="cardNumber" className="text-cyan-200 pr-3">Card Number</label>
            <CardNumberElement
              id="cardNumber"
              onBlur={logEvent("blur")}
              onChange={logEvent("change")}
              onFocus={logEvent("focus")}
              onReady={logEvent("ready")}
              options={ELEMENT_OPTIONS}
            />
          </div>

          <div className="flex items-center pb-3 mt-3 border-b-2 border-gray-200">
            <label htmlFor="expiry" className="text-cyan-200 pr-3 ">Card Expiration</label>
            <CardExpiryElement
              id="expiry"
              onBlur={logEvent("blur")}
              onChange={logEvent("change")}
              onFocus={logEvent("focus")}
              onReady={logEvent("ready")}
              options={ELEMENT_OPTIONS}
            />
          </div>
          <div className="flex items-center pb-3 mt-3 border-b-2 border-gray-200">
            <label htmlFor="cvc" className="text-cyan-200 pr-3 ">CVC</label>
            <CardCvcElement
              id="cvc"
              onBlur={logEvent("blur")}
              onChange={logEvent("change")}
              onFocus={logEvent("focus")}
              onReady={logEvent("ready")}
              options={ELEMENT_OPTIONS}
            />
          </div>
          <div className="flex items-center pb-3 mt-3 border-b-2 border-gray-200">
            <label htmlFor="postal" className="text-cyan-200 pr-3 ">Postal Code</label>
            <input
              id="postal"
              required
              placeholder="12345"
              value={postal}
              onChange={(e) => {
                setPostal(e.target.value);
              }}
            />
          </div>
          {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
          {paymentMethod && <Result>Got PaymentMethod: {paymentMethod?.id}</Result>}
        </fieldset>
        <button type="submit" disabled={!stripe} className="w-full text-center bg-payBtn text-white font-bold w-full text-base block h-10 rounded-md cursor-pointer mt-5">
          Pay
        </button>
      </form>
    </div>
  );
};
export default SplitCardCheckout;
