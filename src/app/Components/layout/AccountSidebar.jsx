"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdAccountCircle, MdAnalytics } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import LogoutButton from "../buttons/LogoutButton";
import { usePathname } from "next/navigation";
import { FaLink } from "react-icons/fa";

const AccountSidebar = ({ session, userPage }) => {
  const path = usePathname();
  console.log("Path name==>", path);
  console.log(userPage);
  return (
    <div className="mt-4">
      <Link href={"/account"} className="w-24 mx-auto">
        <Image
          className="rounded-full cursor-pointer hover:w-24 mx-auto duration-200"
          src={session?.user?.image}
          width={80}
          height={80}
          alt="avatar"
        />
      </Link>
      {userPage && (
        <Link
          target={"_blank"}
          href={`/${userPage?.uri}`}
          className="flex justify-center items-center cursor-pointer underline"
        >
          <FaLink className="text-green-400" size={16} />
          <span className="hover:text-white duration-200">
            /{userPage?.uri}
          </span>
        </Link>
      )}
      <nav className="flex flex-col items-center mt-8 gap-4">
        <Link
          className={
            path === "/account"
              ? "flex items-center gap-2 text-green-500"
              : "flex items-center gap-2"
          }
          href={"/account"}
        >
          <MdAccountCircle size={22} />
          My account
        </Link>
        <Link
          className={
            path === "/analytics"
              ? "flex items-center gap-2 text-green-500"
              : "flex items-center gap-2"
          }
          href={"/analytics"}
        >
          <MdAnalytics size={22} />
          Analytics
        </Link>
        <LogoutButton iconSize={22} iconLeft={true} />
        <Link
          className="flex justify-center text-sm hover:text-green-500 duration-200 items-center gap-2 border-gray-600 border-t pt-4"
          href={"/"}
        >
          <IoMdArrowRoundBack size={18} />
          Back to home
        </Link>
        <footer className="relative flex top-[250px] justify-center text-xs gap-1">
          Powered by linkFolio
          <FaLink className="text-green-400" size={13} />
        </footer>
      </nav>
    </div>
  );
};

export default AccountSidebar;
