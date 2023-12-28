"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";

const LogoutButton = ({
  className = "hover:text-red-500 duration-200 flex items-center gap-2",
  iconSize = 18,
  iconLeft = false,
}) => {
  return (
    <div>
      {iconLeft && (
        <button
          onClick={() => {
            signOut();
          }}
          className={className}
        >
          <TbLogout size={iconSize} />
          Logout
        </button>
      )}
      {!iconLeft && (
        <button
          onClick={() => {
            signOut();
          }}
          className={className}
        >
          Logout
          <TbLogout size={iconSize} />
        </button>
      )}
    </div>
  );
};

export default LogoutButton;
