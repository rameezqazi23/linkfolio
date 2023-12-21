"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const LoginWithGoogleBtn = () => {
  return (
    <div>
      <button
        onClick={() => {
          signIn("google");
        }}
        className="border w-full py-4 mt-6 flex justify-center items-center gap-5"
      >
        {" "}
        <FcGoogle size={30} />
        Sign in with google
      </button>
    </div>
  );
};

export default LoginWithGoogleBtn;
