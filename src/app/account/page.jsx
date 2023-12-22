import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Account = async ({ searchParams }) => {
  const sessionData = await getServerSession(authOptions);
  console.log("Session data from account page==>", sessionData);
  if(!sessionData){
    redirect('/')
  }
  return (
    <div>
      This is account page {sessionData?.user?.name} <br />
      username: {searchParams?.username}
    </div>
  );
};

export default Account;
