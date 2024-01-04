"use client";
import React, { useState } from "react";
import {
  FaDiscord,
  FaExternalLinkSquareAlt,
  FaFacebook,
  FaGithub,
  FaGripLines,
  FaLinkedin,
  FaPhone,
  FaPhoneAlt,
  FaPlus,
  FaSave,
  FaSort,
  FaTelegramPlane,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaRegTrashCan, FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { savePageButtons } from "@/actions/userPageAction";
import { ReactSortable } from "react-sortablejs";
import SubmitButton from "../buttons/SubmitButton";
import toast from "react-hot-toast";

const allButtons = [
  {
    key: "email",
    icon: "Email",
    label: "Email",
    placeHolder: "john@gmail.com",
    type: "email",
  },
  {
    key: "phone",
    icon: "Phone",
    label: "Phone",
    placeHolder: "+92322-2582823",
    type: "tel",
  },
  {
    key: "instagram",
    icon: "Instagram",
    label: "Instagram",
    placeHolder: "https://instagram.com",
    type: "text",
  },
  {
    key: "github",
    icon: "Github",
    label: "Github",
    placeHolder: "https://github.com",
    type: "text",
  },
  {
    key: "linkedIn",
    icon: "LinkedIn",
    label: "LinkedIn",
    placeHolder: "https://linkedin.com",
    type: "text",
  },
  {
    key: "facebook",
    icon: "Facebook",
    label: "Facebook",
    placeHolder: "https://facebook.com",
    type: "text",
  },
  {
    key: "discord",
    icon: "Discord",
    label: "Discord",
    placeHolder: "https://discord.com/channels/@me",
    type: "text",
  },
  {
    key: "tiktok",
    icon: "Tiktok",
    label: "Tiktok",
    placeHolder: "https://tiktok.com",
    type: "text",
  },
  {
    key: "youtube",
    icon: "Youtube",
    label: "Youtube",
    placeHolder: "https://youtube.com",
    type: "text",
  },
  {
    key: "whatsapp",
    icon: "WhatsApp",
    label: "WhatsApp",
    placeHolder: "+92322-2582823",
    type: "tel",
  },
  {
    key: "telegram",
    icon: "Telegram",
    label: "Telegram",
    placeHolder: "+92322-2582823",
    type: "tel",
  },
  {
    key: "twitter",
    icon: "Twitter",
    label: "Twitter",
    placeHolder: "https://x.com",
    type: "text",
  },
  {
    key: "other",
    icon: "Other",
    label: "Other",
    placeHolder: "Add your link...",
    type: "text",
  },
];

const UserButtonsForm = ({ userPage, session }) => {
  const pageSavedButtonKeys = Object.keys(userPage?.socialLinks); //['key1',key2]
  const pageSavedButtonsInfo = pageSavedButtonKeys.map((val) =>
    allButtons.find((val2) => val2.key === val)
  );

  // console.log("Button keys", pageSavedButtonKeys);
  // console.log("Button info", pageSavedButtonsInfo);
  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

  const addSocialButton = (button) => {
    console.log(`${button.key} button is selected`);
    setActiveButtons((prev) => [...prev, button]);
  };

  // console.log(activeButtons);

  const availableButtons = allButtons.filter(
    (button1) => !activeButtons.find((button2) => button1.key === button2.key)
  );

  const saveUserProfile = async (formData) => {
    const promise = new Promise(async (resolve, reject) => {
      const result = await savePageButtons(formData);
      if (result) resolve();
      else reject();
    });

    toast.promise(promise, {
      loading: "Saving...",
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  };

  //handle delete selected fields
  const handleDeleteSelectedFields = (button) => {
    setActiveButtons([...activeButtons.filter((val) => val.key !== button)]);
  };
  // console.log("Active buttons==>", activeButtons);

  return (
    <div className="bg-white mt-8 p-4">
      <form action={saveUserProfile}>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Add Social Accounts
        </h2>
        <ReactSortable
          list={activeButtons}
          setList={setActiveButtons}
          animation={200}
          // delayOnTouchStart={true}
          // delay={2}
        >
          {activeButtons.map((activeButton) => (
            <div
              key={activeButton.key}
              className="flex items-center gap-2 mb-6 text-sm text-gray-700"
            >
              <label className="flex w-48 gap-2 items-center">
                <FaGripLines className="cursor-move text-gray-400" size={18} />

                {activeButton.icon === "Email" && <MdEmail size={20} />}
                {activeButton.icon === "Phone" && <FaPhoneAlt size={20} />}
                {activeButton.icon === "Instagram" && (
                  <AiFillInstagram size={20} />
                )}
                {activeButton.icon === "Github" && <FaGithub size={20} />}
                {activeButton.icon === "LinkedIn" && <FaLinkedin size={20} />}
                {activeButton.icon === "Facebook" && <FaFacebook size={20} />}
                {activeButton.icon === "Discord" && <FaDiscord size={20} />}
                {activeButton.icon === "Tiktok" && <FaTiktok size={20} />}
                {activeButton.icon === "Youtube" && <FaYoutube size={20} />}
                {activeButton.icon === "WhatsApp" && <FaWhatsapp size={20} />}
                {activeButton.icon === "Telegram" && (
                  <FaTelegramPlane size={20} />
                )}
                {activeButton.icon === "Twitter" && (
                  <FaSquareXTwitter size={20} />
                )}
                {activeButton.icon === "Other" && (
                  <FaExternalLinkSquareAlt size={20} />
                )}

                <span>{activeButton.label}</span>
              </label>
              <input
                className="w-full  py-2 px-2 mb-2 outline-none border border-gray-200"
                type={activeButton.type}
                name={activeButton.key}
                defaultValue={userPage.socialLinks[activeButton.key]}
                placeholder={activeButton.placeHolder}
              />
              <div
                className="cursor-pointer hover:text-red-600 duration-200"
                onClick={() => handleDeleteSelectedFields(activeButton.key)}
              >
                <FaRegTrashCan size={20} />
              </div>
            </div>
          ))}
        </ReactSortable>

        <div className="flex flex-wrap gap-2 mt-4 mb-8 border-t pt-4 border-b pb-8">
          {availableButtons.map((button) => (
            <button
              onClick={() => addSocialButton(button)}
              key={button.key}
              className="flex bg-[#2c2f32] text-gray-200 hover:text-white text-xs items-center p-2 rounded-lg gap-1 mt-2"
            >
              {button.icon === "Email" && <MdEmail />}
              {button.icon === "Phone" && <FaPhoneAlt />}
              {button.icon === "Instagram" && <AiFillInstagram />}
              {button.icon === "Github" && <FaGithub />}
              {button.icon === "LinkedIn" && <FaLinkedin />}
              {button.icon === "Facebook" && <FaFacebook />}
              {button.icon === "Discord" && <FaDiscord />}
              {button.icon === "Tiktok" && <FaTiktok />}
              {button.icon === "Youtube" && <FaYoutube />}
              {button.icon === "WhatsApp" && <FaWhatsapp />}
              {button.icon === "Telegram" && <FaTelegramPlane />}
              {button.icon === "Twitter" && <FaSquareXTwitter />}
              {button.icon === "Other" && <FaExternalLinkSquareAlt />}

              <span>{button.label}</span>
              <FaPlus />
            </button>
          ))}
        </div>
        {activeButtons.length > 0 && (
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
        )}
      </form>
    </div>
  );
};

export default UserButtonsForm;
