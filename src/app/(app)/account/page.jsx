"use server";
import React from "react";
import { redirect } from "next/navigation";
import AccountForm from "../../Components/forms/AccountForm";
import PAGE from "@/models/Page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import UserProfileForm from "@/app/Components/forms/UserProfileForm";

const Account = async () => {
  mongoose.connect(process.env.CONNECT_MONGO_URI);

  const sessionData = await getServerSession(authOptions);

  console.log("Session data from account page==>", sessionData);

  if (!sessionData) {
    return redirect("/");
  }
  const userPage = await PAGE.findOne({ owner: sessionData?.user?.email });
  console.log("UserPage data==>", userPage);

  return (
    <div>
      {userPage ? (
        <UserProfileForm userPage={userPage} session={sessionData} />
      ) : (
        <AccountForm />
      )}
    </div>
  );
};

export default Account;
