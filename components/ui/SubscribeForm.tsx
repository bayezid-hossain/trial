"use client";
import React, { useActionState, useState } from "react";
import { Label } from "./label";
import { SubmitButton } from "./submit-button";
import Image from "next/image";
import { Input } from "./input";
import { InputRecord } from "@/_types";
import { useFormState } from "react-dom";
import { subscribe } from "@/actions/subscribe";
import { CheckCheck } from "lucide-react";

const SubscribeForm = () => {
  // initial thoughts:
  // 1: i got to have some state to store the phone and validate it
  // 2: the validation can easily be done by server action and zod
  // 3: initial formatting can be done by basic handle input change (eg + at start, supports only number)
  // 4: some global padding
  // 5: button properties changed based on server action response (eg success will have check mark and text changed)
  const [state, formAction] = useActionState(
    subscribe,
    null
  );
  const initialInputObj: InputRecord = {
    phone: "",
  };

  //state for phone number input change
  const [inputObj, setInputObj] =
    useState<InputRecord>(initialInputObj);

  // handle input changed based on input record,
  // here it only has the record of phone, for further development this form could have many more properties
  // to handle it based on individual properties type input record was implemented
  const handleInputChange = (
    field: keyof InputRecord,
    value: string,
    index?: number
  ) => {
    let formattedValue = value;

    if (field === "phone") {
      // Allow only numbers and an optional '+' at the beginning
      formattedValue = formattedValue.replace(
        /[^0-9+]/g,
        ""
      );

      // Ensure only one '+' at the start
      if (formattedValue.includes("+")) {
        formattedValue =
          "+" + formattedValue.replace(/\+/g, "");
      }
    }

    //update and set the input data
    const updatedData = {
      ...inputObj,
      [field]: formattedValue,
    };

    setInputObj(updatedData);
  };

  return (
    //form
    <form
      action={formAction}
      className="max-w-xs  @xs:max-w-sm sm:max-w-md bg-white w-full h-auto p-4 rounded-md"
    >
      {/* form is divided in 4 parts
      1. label
      2. input and validation text
      3. qr code
      4. subscribe button */}
      <Label className="font-bold text-xl pb-12">
        Subscribe to Updates
      </Label>
      <div
        className={` ${
          state?.fieldError?.phone
            ? "text-red-700"
            : "text-foreground"
        } text-sm gap-y-2 flex flex-col`}
      >
        <Label className="font-semibold">
          Phone Number
        </Label>
        <Input
          className={`px-2 border border-solid ${
            state?.fieldError?.phone
              ? "border-red-500"
              : "border-black"
          } text-black text-sm @xs:text-xs`}
          placeholder="Enter phone number (eg +1 555 123 4567)"
          autoComplete="mobile tel"
          name="phone"
          type="text"
          inputMode="numeric"
          value={inputObj.phone}
          onChange={(e) => {
            handleInputChange("phone", e.target.value);
          }}
        />
        {state?.fieldError?.phone && (
          <p className="">{state.fieldError.phone}</p>
        )}
      </div>
      <div className="p-2 flex flex-col gap-y-2 items-center justify-center">
        <p className="text-xs sm:text-sm text-gray-500">
          Scan this QR code to confirm your subscription
        </p>
        <Image
          alt="qr_code"
          height={200}
          width={200}
          src={"/qr.svg"}
        />
      </div>
      <SubmitButton
        className={`w-full disabled:opacity-100`}
        disabled={state?.success ? true : false}
      >
        <div className="flex flex-row gap-x-2">
          {state?.success ? "Subscribed" : "Subscribe"}
          {state?.success && (
            <CheckCheck
              color="green"
              height={20}
              width={20}
            />
          )}
        </div>
      </SubmitButton>
    </form>
  );
};

export default SubscribeForm;
