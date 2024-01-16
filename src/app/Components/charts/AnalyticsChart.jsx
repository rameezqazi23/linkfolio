"use client";
import { addDays, differenceInDays, formatISO9075, parseISO } from "date-fns";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// const { differenceInDays } = require("date-fns");

const AnalyticsChart = ({ data }) => {
  const xLabelKey = Object.keys(data[0]).find((key) => key !== "date");
  console.log("xLabelKey==>", xLabelKey);

  const fillViewsGap = [];

  data.forEach((value, index) => {
    const date = value.date;
    console.log(date);
    fillViewsGap.push({
      date,
      [xLabelKey]: value?.[xLabelKey] || 0,
    });
    const nextDate = data?.[index + 1]?.date;
    console.log(nextDate);
    if (date && nextDate) {
      const daysBetween = differenceInDays(parseISO(nextDate), parseISO(date));
      console.log(daysBetween);

      if (daysBetween > 0) {
        for (let i = 0; i < daysBetween; i++) {
          const dateBetween = formatISO9075(addDays(parseISO(date), i)).split(
            " "
          )[0];
          fillViewsGap.push({
            date: dateBetween,
            [xLabelKey]: 0,
          });
        }
      }
    }
  });
  console.log(fillViewsGap);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={730}
        height={250}
        data={fillViewsGap}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid horizontal={false} strokeWidth="5" stroke="#f5f5f5" />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fill: "#2c2f32" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fill: "#2c2f32" }}
        />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey={xLabelKey}
          stroke="#22c55e"
          strokeWidth="4"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsChart;
