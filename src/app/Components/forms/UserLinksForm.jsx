"use client";
import React, { useState } from "react";
import { FaGripLines, FaLink, FaPlus, FaSave } from "react-icons/fa";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { ReactSortable } from "react-sortablejs";
import { FaRegTrashCan } from "react-icons/fa6";
import { handleUpload } from "@/app/libs/fileUpload";
import { savePageLinks } from "@/actions/userPageAction";
import SubmitButton from "../buttons/SubmitButton";
import Image from "next/image";
import toast from "react-hot-toast";

const UserLinksForm = ({ userPage, session }) => {
  const [links, setLinks] = useState(userPage.userSocialLinks || []);
  console.log("User social links==>", userPage.socialLinks);

  const addNewLink = () => {
    setLinks((prev) => [
      ...prev,
      {
        key: Date.now().toString(),
        title: "",
        subTitle: "",
        url: "",
        icon: "",
      },
    ]);
  };

  console.log("social links==>", links);

  //delete selected input
  const handleDeleteSelectedFields = (selectedField) => {
    setLinks([...links.filter((val) => val.key !== selectedField)]);
  };

  //upload files
  const handleFileUpload = (e, uploadLinkFileKey) => {
    // const file = e.target.files?.[0];
    // console.log("file ===>", file.name);
    // console.log("file key==>", uploadLinkFileKey);

    handleUpload(e, (uploadedImageUrl) => {
      setLinks((prev) => {
        const newLinks = [...prev];
        newLinks.forEach((val, index) => {
          if (val.key === uploadLinkFileKey) {
            val.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  };

  const handleInputChange = (e, prop, keyLinkToChange) => {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((val) => {
        if (val.key === keyLinkToChange) {
          val[prop] = e.target.value;
        }
      });
      return newLinks;
    });
  };

  const saveUserProfile = async () => {
    // const promise = new Promise(async (resolve, reject) => {
    //   const result = await savePageLinks(links);
    //   if (result) resolve();
    //   else reject();
    // });
    // toast.promise(promise, {
    //   loading: "Saving...",
    //   success: <b>Settings saved!</b>,
    //   error: <b>Could not save.</b>,
    // });
    await savePageLinks(links);
    toast.success("Successfully saved!");

    // console.log("result==>", result);
  };

  return (
    <div className="bg-white mt-8 p-4">
      <form action={saveUserProfile}>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Social Links
        </h2>
        <div className="w-full border-b pb-8">
          <button
            onClick={addNewLink}
            type="button"
            className="flex items-center gap-2"
          >
            <div className="bg-[#2c2f32] rounded-full text-gray-200 hover:text-white p-1">
              <FaPlus size={20} />
            </div>
            Add new
          </button>
        </div>
        <div>
          <ReactSortable list={links} setList={setLinks} animation={200}>
            {links.map((link) => (
              <div key={link.key} className="my-8 flex gap-4">
                <div className="flex justify-center items-center my-auto w-96">
                  <div>
                    <FaGripLines
                      className="cursor-move text-gray-400 mr-4"
                      size={18}
                    />
                  </div>
                  <div className="text-center">
                    <div className="rounded-full p-3 inline-block justify-center">
                      {link.icon ? (
                        <Image
                          className="w-full h-full object-cover rounded-full cursor-pointer aspect-square"
                          alt="logo"
                          width={52}
                          height={52}
                          src={link.icon}
                        />
                      ) : (
                        <div className="bg-[#2c2f32] rounded-full p-3">
                          <FaLink className="text-gray-200" size={28} />
                        </div>
                      )}
                    </div>

                    <div className="border px-3 py-1 mt-1 rounded-lg border-gray-300 shadow-sm">
                      <input
                        onChange={(e) => {
                          handleFileUpload(e, link.key);
                        }}
                        id={`icon${link.key}`}
                        className="hidden"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                      />
                      <label
                        htmlFor={`icon${link.key}`}
                        className="flex justify-center items-center gap-2 cursor-pointer"
                      >
                        <HiOutlineArrowPathRoundedSquare
                          className="hover:rotate-180 duration-300"
                          size={18}
                        />
                        <span>Change icon</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  {/* {JSON.stringify(link.icon)} */}
                  <input
                    className="w-full  py-2 px-2 mb-2 outline-none border border-gray-200"
                    type="text"
                    placeholder="title"
                    value={link.title}
                    onChange={(e) => handleInputChange(e, "title", link.key)}
                  />
                  <input
                    className="w-full  py-2 px-2 mb-2 outline-none border border-gray-200"
                    type="text"
                    placeholder="subtitle (optional)"
                    value={link.subTitle}
                    onChange={(e) => handleInputChange(e, "subTitle", link.key)}
                  />

                  <input
                    className="w-full  py-2 px-2 mb-2 outline-none border border-gray-200"
                    type="text"
                    placeholder="url"
                    value={link.url}
                    onChange={(e) => handleInputChange(e, "url", link.key)}
                  />
                </div>
                <div
                  onClick={() => handleDeleteSelectedFields(link.key)}
                  className="flex justify-center items-center my-auto cursor-pointer hover:text-red-600 duration-200"
                >
                  <FaRegTrashCan size={20} />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <SubmitButton
          className={
            "bg-green-500 w-full text-white text-sm mt-8 py-2 flex justify-center items-center"
          }
        >
          <div className="flex gap-2 hover:gap-4 duration-200">
            <FaSave size={18} />
            <span>Save</span>
          </div>
        </SubmitButton>
      </form>
    </div>
  );
};

export default UserLinksForm;
