"use client";
import React from "react";
import RadioToggler from "../formItems/RadioToggler";
import Image from "next/image";
import userPageAction from "@/actions/userPageAction";
import toast from "react-hot-toast";
import SubmitButton from "../buttons/SubmitButton";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { BiColor } from "react-icons/bi";

const UserProfileForm = ({ userPage, session }) => {
  const saveUserProfile = async (formData) => {
    console.log("save user profile==>", formData.get("displayName"));

    const promise = new Promise(async (resolve, reject) => {
      const result = await userPageAction(formData);
      if (result) resolve();
      else reject();
    });
    toast.promise(promise, {
      loading: "Saving...",
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  };

  return (
    <div className="bg-white">
      <form action={saveUserProfile}>
        <div
          className="flex justify-center items-center py-16"
          style={{ backgroundColor: userPage.bgColor }}
        >
          <div>
            <RadioToggler
              defaultValue={userPage.bgType}
              options={[
                { value: "color", icon: "IoColorPalette", label: "Color" },
                { value: "image", icon: "FaImage", label: "Image" },
              ]}
            />
            <div className="flex justify-center mt-4 bg-white px-1 py-2">
              {userPage.bgType === "color" && (
                <div className="flex justify-center items-center gap-2 background-color">
                  <span className="text-sm">Background color:</span>
                  <input
                    className="cursor-pointer outline-none border-none"
                    type="color"
                    name="bgColor"
                    defaultValue={userPage.bgColor}
                  />
                  {/* <BiColor size={26} className="cursor-pointer" /> */}
                </div>
              )}
              {userPage.bgType === "image" && <RiUploadCloud2Fill size={30} />}
            </div>
          </div>
        </div>
        <div className="flex justify-center -mb-12">
          <Image
            className="rounded-full cursor-pointer border-4 border-white shadow-sm relative bottom-10"
            src={session?.user?.image}
            width={128}
            height={128}
            alt="avatar"
          />{" "}
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameInput">
            Name
          </label>
          <input
            className="input-displayName"
            name="displayName"
            defaultValue={userPage?.displayName}
            type="text"
            placeholder="John Doe"
          />
          <label className="input-label" htmlFor="locationInput">
            Location
          </label>
          <input
            className="input-location"
            name="location"
            defaultValue={userPage?.location}
            type="text"
            placeholder="SanFancisco"
          />
          <label className="input-label" htmlFor="bioInput">
            Bio
          </label>
          <textarea
            placeholder="Add your bio..."
            name="bio"
            defaultValue={userPage?.bio}
            cols="30"
            rows="2"
          ></textarea>
          <SubmitButton
            className={
              "bg-green-500 w-full text-white text-sm mt-4 py-2 flex justify-center items-center hover:gap-4 duration-200"
            }
          >
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
