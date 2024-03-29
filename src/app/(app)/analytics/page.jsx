import React from "react";
import mongoose from "mongoose";
import EVENT from "@/models/Event";
import PAGE from "@/models/Page";
import USER from "@/models/User";
import AnalyticsChart from "@/app/Components/charts/AnalyticsChart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { FaLink } from "react-icons/fa";
import { format, isToday } from "date-fns";
import { IoAnalyticsSharp } from "react-icons/io5";

const AnalyticsPage = async () => {
  mongoose.connect(process.env.CONNECT_MONGO_URI);
  const session = await getServerSession(authOptions);

  //check if there is a session if not they will redirect to home page
  if (!session) {
    redirect("/");
  }

  const user = await PAGE.findOne({ owner: session?.user.email });

  console.log(user.userSocialLinks.map((link) => link.url));
  console.log(user);

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

  const groupedViews = await EVENT.aggregate([
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
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  const totalLinkClicks = await EVENT.find({
    type: "click",
    page: user?.uri,
  });

  console.log(totalLinkClicks);

  console.log("Filtered Data==>", groupedViews);

  return (
    <div className="bg-white p-8">
      <h2 className="text-2xl font-semibold text-center text-gray-700 py-2">
        Views
      </h2>
      <AnalyticsChart
        data={groupedViews.map((objectKey) => ({
          date: objectKey._id,
          views: objectKey.count,
        }))}
      />
      <div className="mt-6 border-t-4 border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-700 py-4">
          Clicks
        </h2>
        {user?.userSocialLinks.map((link) => (
          <div
            key={link.key}
            className="flex flex-wrap gap-6 items-center justify-between border-t border-gray-200 py-4"
          >
            <div className="flex gap-6 items-center">
              <div>
                <FaLink className="text-green-400" size={22} />
              </div>
              <div className="grow">
                <h2 className="text-lg">{link.title || "No title"}</h2>
                <p className="text-gray-500 text-sm">
                  {link.subTitle || "No subtitle"}
                </p>
                <a
                  target="_blank"
                  className="text-blue-500 text-xs hover:text-green-500 duration-200"
                  href={link.url}
                >
                  {link.url}
                </a>
              </div>
            </div>

            <div className="flex md:flex-col gap-10 md:gap-0 text-sm md:text-base justify-between">
              <div className="flex items-center justify-between md:border-b mb-2 text-gray-500">
                <p className="text-sm font-bold uppercase">Clicks</p>
                <IoAnalyticsSharp />
              </div>

              <div className="flex justify-between gap-4">
                <p>Today: </p>
                <p className="text-base md:text-xl text-black">
                  {
                    totalLinkClicks.filter(
                      (click) =>
                        click.uri === link.url && isToday(click.createdAt)
                    ).length
                  }
                </p>
              </div>

              <div className="flex justify-between gap-4">
                <p>All time: </p>
                <p className="text-base md:text-xl text-black">
                  {
                    totalLinkClicks.filter((click) => click.uri === link.url)
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;
