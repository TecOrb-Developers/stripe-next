"use client";
import React, { useState } from "react";
import PaymentSuccsess from "../Card/PaymentSuccess";
import { Field } from "../Field/page";
import Heading from "../Heading/page";
const FormSection = ({ elements, stripe }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [responseSuccess, setResponseSuccess] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    ibanNumber: ""
  })
  const [userDataError, setUserDataError] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    ibanNumber: ""
  })
  // ****************** handle add bank accoount function**************
  const handleAddAccount = async (res: any) => {
    if (res?.error) {
      setResponseError(res?.error?.code);
      setIsLoading(false);
    } else {
      // console.log(">>>>>>>>>>>>..", res); // res?.error?.code
      let bodyData = {
        bank_token: res?.token?.id,
      };
      setPaymentMethod(res?.token)
      console.log("bodyData", bodyData);
      setIsLoading(false)
      setResponseSuccess("Your account added successfully")
    }
  };
  //******************* function to get token from strip ****************** */
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!userData?.firstName) {
      setUserDataError({ ...userDataError, firstName: "Please enter first name" })
    } else if (!userData?.lastName) {
      setUserDataError({ ...userDataError, firstName: "Please enter last name" })
    } else if (!userData?.accountNumber) {
      setUserDataError({ ...userDataError, firstName: "Please enter account number" })
    } else if (!userData?.ibanNumber) {
      setUserDataError({ ...userDataError, firstName: "Please enter IBAN number" })
    } else {
      let fullName = userData?.firstName + userData?.lastName;
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
      setIsLoading(true);
      const token = await stripe.createToken("bank_account", {
        country: "DK",
        currency: "dkk",
        account_holder_name: fullName,
        account_holder_type: "individual",
        account_number: userData?.ibanNumber, // we have to send IBAN in the place of account number
      });
      if (token) {
        handleAddAccount(token);
      }
    }
  };
  const handleOnChange = (e: any) => {
    let { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    setUserDataError({ ...userDataError, firstName: "", lastName: "", accountNumber: "", ibanNumber: "" })
    setResponseSuccess("")
  }
  const reset = () => {
    setUserData({ ...userData, firstName: "", lastName: "", accountNumber: "", ibanNumber: "" })
    setPaymentMethod(null)
  }
  return paymentMethod ? <PaymentSuccsess paymentMethod={paymentMethod} reset={reset} /> :
    
  <div>
  <Heading heading="Add Account" />
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
      className="w-full max-w-lg bg-white p-5 rounded-xl"
    >
      <p className="text-red-500">{responseError}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Field
            name="firstName"
            value={userData?.firstName}
            onChange={(e) => { handleOnChange(e); }}
            // className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="first name"
            label={""}
            required={false}
            autoComplete={""} />
          <p className="text-red-500 text-xs italic">{userDataError?.firstName}</p>
        </div>
        <div>
          <Field
            name="lastName"
            value={userData?.lastName}
            onChange={(e) => {
              handleOnChange(e)
            }}
            // className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="last name"
            label={""}
            required={false}
            autoComplete={""} />
          <p className="text-red-500 text-xs italic">{userDataError?.lastName}</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6 mt-5">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-cyan-200 text-xs font-bold"
            htmlFor="grid-password"
          >
            Account number
          </label>
          <Field
            name="accountNumber"
            value={userData?.accountNumber}
            onChange={(e) => {
              handleOnChange(e)
            }}
            // className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            placeholder="Account number"
            label={""}
            required={false}
            autoComplete={""}
          />
          <p className="text-red-500 text-xs italic">{userDataError?.accountNumber}</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-cyan-200 text-xs font-bold"
            htmlFor="grid-password"
          >
            IBAN number
          </label>
          <Field
            name="ibanNumber"
            value={userData?.ibanNumber}
            onChange={(e) => {
              handleOnChange(e)
            }}
            // className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            placeholder="IBAN number"
            label={""}
            required={false}
            autoComplete={""}
          />
          <p className="text-red-500 text-xs italic">{userDataError?.ibanNumber}</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <button disabled={isLoading}
            type="submit"
            className="w-full text-center bg-payBtn text-white font-bold w-full text-base block h-10 rounded-md cursor-pointer mt-5"
          >
            {isLoading ? "Wait.." : "Add account"}
          </button>
        </div>
      </div>
    </form>
    </div>
};
export default FormSection;