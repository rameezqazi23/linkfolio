"use server";
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AccountForm from "../../Components/forms/AccountForm";
import PAGE from "@/models/Page";
import mongoose from "mongoose";
import UserProfileForm from "@/app/Components/forms/UserProfileForm";
import UserButtonsForm from "@/app/Components/forms/UserButtonsForm";
import UserLinksForm from "@/app/Components/forms/UserLinksForm";

const Account = async () => {
  mongoose.connect(process.env.CONNECT_MONGO_URI);

  const sessionData = await getServerSession(authOptions);

  console.log("Session data from account page==>", sessionData);

  if (!sessionData) {
    return redirect("/");
  }
  const userPage = await PAGE.findOne({ owner: sessionData?.user?.email });

  //Convert it to JSON manually before parsing it to the props
  const leanPage = JSON.parse(JSON.stringify(userPage));

  return (
    <>
      {userPage ? (
        <div>
          <UserProfileForm userPage={leanPage} session={sessionData} />
          <UserButtonsForm userPage={leanPage} session={sessionData} />
          <UserLinksForm userPage={leanPage} session={sessionData} />
        </div>
      ) : (
        <AccountForm />
      )}
    </>
  );
};

export default Account;
