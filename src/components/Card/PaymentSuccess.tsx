import React from "react";
import { ResetButton } from "../Button/page";

export const PaymentSuccsess = ({
  paymentMethod,
  reset,
}: {
  paymentMethod: any;
  reset: any;
}) => {
  return (
    <div className="Result text-center mt-12">
      <div className="text-white font-medium mb-2 text-base text-center" role="alert">
        Payment successful
      </div>
      <div className="text-white text-sm font-normal mb-6 leading-6 text-center">
        Thanks for trying Stripe Elements. No money was charged, but we
        generated a PaymentMethod: {paymentMethod?.id}
      </div>
      <ResetButton onClick={reset} />
    </div>
  );
};
export default PaymentSuccsess;
