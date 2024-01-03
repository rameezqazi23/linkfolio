"use client";
import React, { useState } from "react";
import { FaGripLines, FaLink, FaPlus, FaSave } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { ReactSortable } from "react-sortablejs";
import SubmitButton from "../buttons/SubmitButton";

const UserLinksForm = ({ userPage, session }) => {
  const [links, setLinks] = useState([]);
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

  return (
    <div className="bg-white mt-8 p-4">
      <form>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Social Links
        </h2>
        <button
          onClick={addNewLink}
          type="button"
          className="flex items-center gap-2 border-b pb-8 w-full"
        >
          <div className="bg-[#2c2f32] rounded-full text-gray-200 hover:text-white p-1">
            <FaPlus size={20} />
          </div>
          Add new
        </button>
        <div>
          <ReactSortable list={links} setList={setLinks} animation={200}>
            {links.map((link) => (
              <div key={link.key} className="my-8 flex">
                <div className="flex justify-center items-center my-auto w-96">
                  <div>
                    <FaGripLines
                      className="cursor-move text-gray-400 mr-4"
                      size={18}
                    />
                  </div>
                  <div className="text-center">
                    <div className="bg-[#2c2f32] rounded-full text-gray-200 p-3 inline-block justify-center">
                      <FaLink className="" size={28} />
                    </div>

                    <div className="border px-3 py-1 mt-4 rounded-lg cursor-pointer border-gray-300 shadow-sm">
                      <button
                        type="button"
                        className="flex justify-center items-center gap-2"
                      >
                        <HiOutlineArrowPathRoundedSquare
                          className="hover:rotate-180 duration-300"
                          size={18}
                        />
                        <span>Change icon</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <input
                    className="w-full  py-2 px-2 mb-2 outline-none border border-gray-200"
                    type="text"
                    placeholder="title"
                  />
                  <input
                    className="w-full  py-2 px-2 mb-2 outline-none border border-gray-200"
                    type="text"
                    placeholder="subtitle (optional)"
                  />
                  <input
                    className="w-full  py-2 px-2 mb-2 outline-none border border-gray-200"
                    type="text"
                    placeholder="url"
                  />
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
