"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";

const LogoutButton = () => {
  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
        className="hover:text-red-500 duration-200 flex items-center gap-2"
      >
        <TbLogout size={22} />
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
