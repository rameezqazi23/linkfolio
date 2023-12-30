"use client";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { redirect } from "next/navigation";
import getUsername from "@/actions/getUsername";

const AccountForm = ({ searchParams }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);

    const result = await getUsername(formData);
    console.log("check result==>", result);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    setError(result === false);
    if (result) {
      redirect(`/account?created=${formData.get("username")}`);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-4xl text-center font-bold">Grab your username</h1>
      <p className="text-sm text-center text-gray-600 mt-4">
        Choose your username
      </p>
      <form
        action={handleSubmit}
        className="flex-inline justify-center mx-auto mt-6"
      >
        <div className="max-w-xs mx-auto">
          <input
            defaultValue={searchParams?.username}
            name="username"
            className="block w-full px-4 py-2 outline-none text-slate-500 mx-auto mb-4 border border-gray-300"
            type="text"
            placeholder="username"
          />
          {error && (
            <p className="text-xs text-center text-red-600 py-2">
              This username is already taken
            </p>
          )}

          <button
            type="submit"
            className="flex justify-center items-center hover:gap-8 duration-300 gap-4 mx-auto w-full bg-blue-700 text-white py-2 hover:bg-green-600"
          >
            Create your username
            {isLoading ? (
              <ThreeDots
                visible={true}
                height="20"
                width="20"
                color="white"
                radius="2"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <FaArrowRight />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
