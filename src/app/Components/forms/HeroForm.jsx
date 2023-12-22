"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const HeroForm = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if ("localStorage" in window && window.localStorage.getItem("username")) {
      // setUserName(window.localStorage.getItem("username"));
      const username = window.localStorage.getItem("username");
      window.localStorage.removeItem("username");
      redirect("/account?username=" + username);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`linkfolio.to/${userName}`);
    if (userName.length > 0) {
      window.localStorage.setItem("username", userName);
      await signIn("google");
      console.log("Successfully logged In");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="inline-flex items-center mt-4 shadow-lg"
      >
        <span className="bg-white py-4 pl-3 text-black">linkfolio.to/</span>
        <input
          onChange={(e) => setUserName(e.target.value)}
          className="py-4 outline-none text-slate-500"
          type="text"
          value={userName}
          placeholder="username"
        />
        <button type="submit" className="bg-blue-700 text-white w-32 py-4">
          Join for free
        </button>
      </form>
    </div>
  );
};

export default HeroForm;
