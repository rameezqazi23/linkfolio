import React from "react";
import mongoose from "mongoose";
import EVENT from "@/models/Event";
import PAGE from "@/models/Page";
import USER from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const AnalyticsPage = async () => {
  mongoose.connect(process.env.CONNECT_MONGO_URI);
  const session = await getServerSession(authOptions);

  //check if there is a session if not they will redirect to home page
  if (!session) {
    redirect("/");
  }

  const user = await PAGE.findOne({ owner: session?.user.email });

  console.log(user.userSocialLinks.map((link) => link.url));

  //check views count
  const viewsCount = await EVENT.countDocuments({
    type: "view",
    uri: user?.uri,
  });

  //check clicks count
  const clicksCount = await EVENT.countDocuments({
    type: "click",
    uri: user?.userSocialLinks.map((link) => link.url),
  });

  const filteredData = await EVENT.aggregate([
    {
      $match: {
        type: "view",
        uri: user?.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
  ]);

  console.log("Filtered Data==>", filteredData);

  return (
    <div>
      This is analytics page here
      {JSON.stringify(filteredData)}
      <h1>Views: {viewsCount}</h1>
      <h1>Clicks: {clicksCount}</h1>
    </div>
  );
};

export default AnalyticsPage;
