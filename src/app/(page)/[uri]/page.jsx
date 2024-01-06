import PAGE from "@/models/Page";
import USER from "@/models/User";
import mongoose from "mongoose";
import React from "react";
import Image from "next/image";
import Link from "next/link";

//react icons
import {
  FaDiscord,
  FaExternalLinkSquareAlt,
  FaFacebook,
  FaGithub,
  FaGripLines,
  FaLink,
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

import { FaLocationDot } from "react-icons/fa6";

const buttonIcons = {
  email: "Email",
  phone: "Phone",
  instagram: "Instagram",
  github: "Github",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  discord: "Discord",
  tiktok: "Tiktok",
  youtube: "Youtube",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  twitter: "Twitter",
  other: "Other",
};

const UserPage = async ({ params }) => {
  mongoose.connect(process.env.CONNECT_MONGO_URI);
  const uri = params.uri;
  const userPage = await PAGE.findOne({ uri });
  console.log(userPage);
  const user = await USER.findOne({ email: userPage?.owner });
  console.log(user);

  //   const link = userPage.socialLinks.map((link)=>link)
  return (
    <>
      <div className="text-[#eeeded] bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 min-h-screen">
        {/* <Image
        src={`${userPage?.bgImage}`}
        width={200}
        height={200}
        alt="profile"
      /> */}
        <div
          className="h-40 bg-cover bg-center"
          style={
            userPage?.bgType === "color"
              ? { backgroundColor: userPage.bgColor }
              : { backgroundImage: `url(${userPage?.bgImage})` }
          }
        ></div>

        <div className="w-[130px] h-[130px] relative bottom-16 mx-auto -mb-12">
          <Image
            className="w-full h-full object-cover rounded-full cursor-pointer shadow-xl bg-gray-100 backdrop-filter backdrop-blur-sm bg-opacity-20"
            src={user.image}
            alt="avatar"
            width={130}
            height={130}
          />{" "}
        </div>

        <h2 className="text-center text-xl font-semibold">
          {userPage.displayName}
        </h2>
        <h3 className="flex justify-center items-center text-center text-sm text-[#d4d4d4] gap-2 mt-1">
          <FaLocationDot />

          {userPage.location}
        </h3>
        <div className="max-w-md text-center text-sm mx-auto mt-2">
          <p>{userPage.bio}</p>
        </div>
        <div className="flex justify-center items-center mt-3 pb-8 gap-3">
          {userPage?.socialLinks &&
            Object.keys(userPage.socialLinks).map((buttonKey) => (
              <Link
                className="flex justify-center items-center p-2 bg-gray-200 backdrop-filter backdrop-blur-xs bg-opacity-20 text-white hover:text-black duration-300 rounded-full"
                key={buttonKey}
                href={"/"}
              >
                {buttonIcons[buttonKey] === "Email" && <MdEmail size={26} />}
                {buttonIcons[buttonKey] === "Phone" && <FaPhoneAlt size={26} />}
                {buttonIcons[buttonKey] === "Instagram" && (
                  <AiFillInstagram size={26} />
                )}
                {buttonIcons[buttonKey] === "Github" && <FaGithub size={26} />}
                {buttonIcons[buttonKey] === "LinkedIn" && (
                  <FaLinkedin size={26} />
                )}
                {buttonIcons[buttonKey] === "Facebook" && (
                  <FaFacebook size={26} />
                )}
                {buttonIcons[buttonKey] === "Discord" && (
                  <FaDiscord size={26} />
                )}
                {buttonIcons[buttonKey] === "Tiktok" && <FaTiktok size={26} />}
                {buttonIcons[buttonKey] === "Youtube" && (
                  <FaYoutube size={26} />
                )}
                {buttonIcons[buttonKey] === "WhatsApp" && (
                  <FaWhatsapp size={26} />
                )}
                {buttonIcons[buttonKey] === "Telegram" && (
                  <FaTelegramPlane size={26} />
                )}
                {buttonIcons[buttonKey] === "Twitter" && (
                  <FaSquareXTwitter size={26} />
                )}
                {buttonIcons[buttonKey] === "Other" && (
                  <FaExternalLinkSquareAlt size={32} />
                )}
                {/* {userPage.socialLinks[buttonKey]} */}
              </Link>
            ))}
        </div>
        <div className="max-w-2xl mx-auto text-sm text-white grid md:grid-cols-2 gap-6 p-4 px-8">
          {userPage.userSocialLinks &&
            userPage.userSocialLinks.map((link) => (
              <Link
                className="p-2 bg-indigo-950 flex rounded-xl"
                key={link.key}
                href={`${link.url}`}
              >
                <div className="relative w-14 h-14 aspect-square -left-6">
                  {link.icon ? (
                    <Image
                      className="rounded-full"
                      src={`${link.icon}`}
                      width={42}
                      height={42}
                      alt="icon"
                    />
                  ) : (
                    <div className="bg-[#2c2f32] rounded-full p-3">
                      <FaLink className="text-gray-200" size={28} />
                    </div>
                  )}
                </div>
                <div>
                  <h1>{link.title}</h1>
                  <p className="text-gray-400">{link.subTitle}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default UserPage;
