
'use client'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  StripeCardElementChangeEvent,
  StripeCardElementOptions,
} from "@stripe/stripe-js";
import { useState } from "react";
import { Button } from "../Button/page";
import PaymentSuccsess from "../Card/PaymentSuccess";
import { ErrorMessage } from "../ErrorMessage/page";
import { Field } from "../Field/page";
import Heading from "../Heading/page";

const CARD_OPTIONS: StripeCardElementOptions = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const CardField = ({
  onChange,
}: {
  onChange: StripeCardElementChangeEvent;
}) => (
  <div className="flex items-center border-b-2 border-gray-200">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<null | any>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    if (error) {
      card.focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload: any = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: billingDetails,
    });

    setProcessing(false);

    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      phone: "",
      name: "",
    });
  };

  return paymentMethod ? (
    <PaymentSuccsess paymentMethod={paymentMethod} reset={reset} />
  ) : (
    <>
      <div>
        <Heading heading="Detail Card" />
        <form className="w-96 bg-white p-5 rounded-xl" onSubmit={handleSubmit}>
          <fieldset className="p-0 m-0 border-none">
            <Field
              label="Name"
              id="name"
              type="text"
              placeholder="Name"
              required
              autoComplete="name"
              value={billingDetails.name}
              onChange={(e: any) => {
                setBillingDetails({ ...billingDetails, name: e.target.value });
              }}
            />
            <Field
              label="Email"
              id="email"
              type="email"
              placeholder="email"
              required
              autoComplete="email"
              value={billingDetails.email}
              onChange={(e: any) => {
                setBillingDetails({ ...billingDetails, email: e.target.value });
              }}
            />
            <Field
              label="Phone"
              id="phone"
              type="tel"
              placeholder="(941) 555-0123"
              required
              autoComplete="tel"
              value={billingDetails.phone}
              onChange={(e: any) => {
                setBillingDetails({ ...billingDetails, phone: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className="mt-3 mb-3">
            <CardField
              onChange={(e: any) => {
                setError(e.error);
                setCardComplete(e.complete);
              }}
            />
          </fieldset>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <Button processing={processing} error={error} disabled={!stripe}>
            Pay $25
          </Button>
        </form>

      </div>
    </>
  );
};
export default CheckoutForm;
