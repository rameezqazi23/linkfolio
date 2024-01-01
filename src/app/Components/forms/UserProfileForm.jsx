"use client";
import React, { useState } from "react";
import RadioToggler from "../formItems/RadioToggler";
import Image from "next/image";
import userPageAction from "@/actions/userPageAction";
import toast from "react-hot-toast";
import SubmitButton from "../buttons/SubmitButton";
import { FaSave } from "react-icons/fa";
import { IoCloudUpload } from "react-icons/io5";

const UserProfileForm = ({ userPage, session }) => {
  const [bgType, setBgType] = useState(userPage.bgType);
  const [bgColor, setBgColor] = useState(userPage.bgColor);
  const [bgImage, setBgImage] = useState(userPage.bgImage);

  const saveUserProfile = async (formData) => {
    // console.log("save user profile==>", formData.get("coverImage"));

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

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    console.log(`image${Date.now()}-${file.name}`);
    if (file) {
      const promise = new Promise((resolve, reject) => {
        const data = new FormData();
        data.set("file", file);
        fetch("/api/upload", {
          method: "POST",
          body: data,
        }).then((response) => {
          if (response.ok) {
            response.json().then((link) => {
              console.log("uploaded file link", link);
              setBgImage(link);
              resolve();
            });
          } else {
            reject();
          }
        });
      });

      toast.promise(promise, {
        loading: "Uploading...",
        success: <b>Cover image set!</b>,
        error: <b>Could not save.</b>,
      });
    }
  };

  return (
    <div className="bg-white">
      <form action={saveUserProfile}>
        <div
          className="flex justify-center items-center py-4 min-h-[300px] bg-cover bg-center"
          style={
            bgType === "color"
              ? { backgroundColor: bgColor }
              : { backgroundImage: `url(${bgImage})` }
          }
        >
          <div>
            <RadioToggler
              defaultValue={userPage.bgType}
              options={[
                { value: "color", icon: "IoColorPalette", label: "Color" },
                { value: "image", icon: "FaImage", label: "Image" },
              ]}
              onChange={(val) => {
                setBgType(val);
              }}
            />
            <div className="flex justify-center mt-4">
              <input
                className="hidden"
                type="text"
                name="bgImage"
                defaultValue={bgImage}
              />
              {bgType === "color" && (
                <div className="flex justify-center items-center gap-1 background-color bg-[#eeeded] px-2 py-1 rounded-lg shadow-lg">
                  <span className="text-xs text-[#2c2f32] font-semibold">
                    Background color:
                  </span>
                  <input
                    className="cursor-pointer outline-none border-none"
                    type="color"
                    name="bgColor"
                    defaultValue={userPage.bgColor}
                    onChange={(e) => {
                      setBgColor(e.target.value);
                    }}
                  />
                  {/* <BiColor size={26} className="cursor-pointer" /> */}
                </div>
              )}
              {bgType === "image" && (
                <div className="cursor-pointer">
                  <label className="outline-none cursor-pointer bg-white px-2 py-2 text-xs text-[#2c2f32] hover:text-black duration-200 hover:z-10 hover:text-sm font-semibold shadow-lg rounded-lg">
                    <input
                      className="hidden"
                      type="file"
                      onChange={handleImageUpload}
                    />
                    Change Image
                  </label>
                </div>
              )}
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
              "bg-green-500 w-full text-white text-sm mt-4 py-2 flex justify-center items-center"
            }
          >
            <div className="flex gap-2 hover:gap-4 duration-200">
              <FaSave size={18} />
              <span>Save</span>
            </div>
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
