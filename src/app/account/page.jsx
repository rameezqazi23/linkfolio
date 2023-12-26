"use server";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AccountForm from "../Components/forms/AccountForm";
const Account = async () => {
  const sessionData = await getServerSession(authOptions);

  console.log("Session data from account page==>", sessionData);

  if (!sessionData) {
    redirect("/");
  }
  return (
    <div>
      <AccountForm />
    </div>
  );
};

export default Account;
