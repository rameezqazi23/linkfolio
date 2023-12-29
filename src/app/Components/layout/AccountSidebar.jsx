"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FcSettings } from "react-icons/fc";
import { MdAccountCircle, MdAnalytics } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import LogoutButton from "../buttons/LogoutButton";
import { usePathname } from "next/navigation";
// import LogoutButton from "../Components/buttons/LogoutButton";

const AccountSidebar = ({ session }) => {
  const path = usePathname();
  console.log("Path name==>", path);

  return (
    <div>
      <Link href={"/account"} className="w-24 mx-auto pt-8">
        <Image
          className="rounded-full cursor-pointer hover:w-24 mx-auto duration-200"
          src={session?.user?.image}
          width={80}
          height={80}
          alt="avatar"
        />
      </Link>
      <nav className="flex flex-col justify-center items-center mt-8 gap-4">
        <Link
          className={
            path === "/account"
              ? "flex justify-center items-center gap-2 text-green-500 font-semibold"
              : "flex justify-center items-center gap-2"
          }
          href={"/account"}
        >
          <MdAccountCircle size={22} />
          My account
        </Link>
        <Link
          className={
            path === "/analytics"
              ? "flex justify-center items-center gap-2 text-green-500 font-semibold"
              : "flex justify-center items-center gap-2"
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
      </nav>
    </div>
  );
};

export default AccountSidebar;
