import LoginWithGoogleBtn from "@/app/Components/buttons/LoginWithGoogleBtn";
import React from "react";

const SignIn = () => {
  return (
    <div>
      <div className="border p-4 max-w-sm mx-auto">
        <h1 className="text-4xl text-center font-bold">Sign In</h1>
        <p className="text-sm text-gray-500 text-center mt-4">
          Sign in your account with one of these methods
        </p>
        <LoginWithGoogleBtn />
      </div>
    </div>
  );
};

export default SignIn;
