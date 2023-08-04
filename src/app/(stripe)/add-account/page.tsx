"use client";
import FormSection from "@/components/FormSection/page";
import { ElementsConsumer } from "@stripe/react-stripe-js";

export default function AddAccount() {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <FormSection elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer>
  );
}
