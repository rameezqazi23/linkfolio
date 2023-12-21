"use client";
import React from "react";

const HeroForm = () => {
  return (
    <div>
      <form className="inline-flex items-center mt-4 shadow-lg">
        <span className="bg-white py-4 pl-3 text-black">linkfolio.to/</span>
        <input
          className="py-4 outline-none text-slate-500"
          type="text"
          placeholder="username"
        />
        <button className="bg-blue-700 text-white w-32 py-4" type="submit">
          Join for free
        </button>
      </form>
    </div>
  );
};

export default HeroForm;
