import React from "react";
import RadioToggler from "../formItems/RadioToggler";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";

const UserProfileForm = async ({ user }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-white">
      <form>
        <div className="flex justify-center items-center bg-gray-300 py-16">
          <RadioToggler
            options={[
              { value: "color", icon: "IoColorPalette", label: "Color" },
              { value: "image", icon: "FaImage", label: "Image" },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex justify-center -mb-8">
          <Image
            className="rounded-full cursor-pointer border-4 border-white shadow-sm relative bottom-10"
            src={session?.user?.image}
            width={128}
            height={128}
            alt="avatar"
          />{" "}
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameInput">Name</label>
          <input type="text" placeholder="John Doe" />
          <label className="input-label" htmlFor="locationInput">Location</label>
          <input type="text" placeholder="SanFancisco" />
          <label className="input-label" htmlFor="bioInput">Bio</label>
          <textarea
          
            placeholder="Add your bio..."
            name=""
            id=""
            cols="30"
            rows="2"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
