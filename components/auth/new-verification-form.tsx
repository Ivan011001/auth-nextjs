"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";

import CardWrapper from "./card-wraper";
import ErrorMessage from "../error-message";
import SuccessMessage from "../success-message";

import { Oval } from "react-loader-spinner";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) return;

    newVerification(token)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      })
      .catch(() => {
        setError("Something went wrong"!);
      });
  }, []);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Email verification process"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      {!error && !success && (
        <div className="flex justify-center items-center">
          <Oval width={50} height={50} />
        </div>
      )}

      <SuccessMessage text={success} />
      <ErrorMessage text={error} />
    </CardWrapper>
  );
};

export default NewVerificationForm;
