import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

const Account = async ({ searchParams }) => {
  const sessionData = await getServerSession(authOptions);
  console.log("Session data from account page==>", sessionData);
  if (!sessionData) {
    redirect("/");
  }
  return (
    <div className="mt-8">
      <h1 className="text-4xl text-center font-bold">Grab your username</h1>
      <p className="text-sm text-center text-gray-600 mt-4">
        Choose your username
      </p>
      <form className="flex-inline justify-center mx-auto mt-6">
        <div className="max-w-xs mx-auto">
          <input
            // onChange={(e) => setUserName(e.target.value)}
            defaultValue={searchParams?.username}
            className="block w-full px-4 py-2 outline-none text-slate-500 mx-auto mb-4 border border-gray-300"
            type="text"
            // value={userName}
            placeholder="username"
          />
          <button
            type="submit"
            className="flex justify-center items-center hover:gap-8 duration-300 gap-4 mx-auto w-full bg-blue-700 text-white py-2 hover:bg-green-600"
          >
            Create your username
            <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
