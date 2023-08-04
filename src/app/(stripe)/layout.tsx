'use client'
// import type { Metadata } from "next";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// export const metadata: Metadata = {
//   title: "Stripe",
//   description: "Stripe-Demos",
// };
const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="AppWrapper bg-bodyBg flex items-center justify-center h-screen w-full">
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
          {children}
        </Elements>
      </div>
    </>
  );
}
