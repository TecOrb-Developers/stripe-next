import React from "react";
import { useRouter } from "next/navigation";
const CardSection = () => {
  const route = useRouter();
  return (
    <>
      <div
        onClick={() => {
          route.push("/add-account");
        }}
        className="w-96 h-36  bg-emerald-300 flex items-center justify-center cursor-pointer rounded-lg p-6"
      >
        <h5 className="text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          Add bank account
        </h5>
      </div>
      <div
        onClick={() => {
          route.push("/card/detail-card");
        }}
        className="mt-8 w-96 h-36 bg-cyan-500 flex items-center justify-center cursor-pointer rounded-lg p-6"
      >
        <h5 className="text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          Detail Card
        </h5>
      </div>
      <div
        onClick={() => {
          route.push("/card/split-card");
        }}
        className="mt-8 w-96 h-36 bg-purple-400 flex items-center justify-center cursor-pointer rounded-lg p-6"
      >
        <h5 className="text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          Split Card
        </h5>
      </div>
    </>
  );
};

export default CardSection;
