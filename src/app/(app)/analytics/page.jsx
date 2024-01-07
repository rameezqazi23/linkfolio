import React from "react";
import mongoose from "mongoose";
import EVENT from "@/models/Event";

const AnalyticsPage = () => {
  mongoose.connect(process.env.CONNECT_MONGO_URI);

  // const analytics = await EVENT.findOne({uri})

  return <div>This is analytics page here</div>;
};

export default AnalyticsPage;
