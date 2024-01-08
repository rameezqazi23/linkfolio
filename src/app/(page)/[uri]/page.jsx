import PAGE from "@/models/Page";
import USER from "@/models/User";
import EVENT from "@/models/Event";
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
  FaLink,
  FaLinkedin,
  FaPhoneAlt,
  FaTelegramPlane,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram, AiOutlineLike } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
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

const buttonRedirectLink = (key, val) => {
  if (key === "phone") {
    return `tel:${val}`;
  }
  if (key === "email") {
    return `mailto:${val}`;
  }
  return val;
};

const UserPage = async ({ params }) => {
  mongoose.connect(process.env.CONNECT_MONGO_URI);

  const uri = params.uri;
  const userPage = await PAGE.findOne({ uri });
  console.log(userPage);
  const user = await USER.findOne({ email: userPage?.owner });
  console.log(user);

  await EVENT.create({
    uri: uri,
    page: uri,
    type: "view",
  });

  return (
    <>
      <div className="text-[#eeeded] bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 min-h-screen">
        <div
          className="h-40 bg-cover bg-center"
          style={
            userPage?.bgType === "color"
              ? { backgroundColor: userPage?.bgColor }
              : { backgroundImage: `url(${userPage?.bgImage})` }
          }
        ></div>

        <div className="w-[130px] h-[130px] relative bottom-16 mx-auto -mb-12">
          <Image
            className="w-full h-full object-cover rounded-full cursor-pointer shadow-xl bg-gray-100 backdrop-filter backdrop-blur-sm bg-opacity-20"
            src={user?.image}
            alt="avatar"
            width={130}
            height={130}
          />{" "}
        </div>

        <h2 className="text-center text-xl font-semibold">
          {userPage?.displayName}
        </h2>
        <h3 className="flex justify-center items-center text-center text-sm text-[#d4d4d4] gap-2 mt-1">
          <FaLocationDot />

          {userPage?.location}
        </h3>
        <div className="max-w-md text-center text-sm mx-auto mt-2 px-8">
          <p>{userPage?.bio}</p>
        </div>

        <div className="flex justify-center items-center mt-3 pb-8 gap-3">
          {userPage?.socialLinks &&
            Object.keys(userPage?.socialLinks).map((buttonKey) => (
              <Link
                className="flex justify-center items-center p-2 bg-gray-200 backdrop-filter backdrop-blur-xs bg-opacity-20 text-white hover:text-black duration-300 rounded-full"
                key={buttonKey}
                target={"_blank"}
                href={buttonRedirectLink(
                  buttonKey,
                  userPage?.socialLinks[buttonKey]
                )}
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
        <div className="max-w-3xl mx-auto text-sm text-white grid md:grid-cols-2 gap-6 p-4 px-8">
          {userPage?.userSocialLinks &&
            userPage?.userSocialLinks.map((link) => (
              <Link
                ping={`${process.env.URL}/api/click?url=${btoa(
                  link.url
                )}&page=${userPage.uri}`}
                className="p-2 bg-indigo-950 flex"
                target={"_blank"}
                key={link.key}
                href={`${link.url}`}
              >
                <div className="rounded-full justify-center relative -left-6 my-auto">
                  {link.icon ? (
                    <Image
                      className="aspect-square object-cover rounded-full cursor-pointer"
                      alt="logo"
                      width={70}
                      height={70}
                      src={link.icon}
                    />
                  ) : (
                    <div className="bg-gray-200 backdrop-filter backdrop-blur-md bg-opacity-20 rounded-full p-3">
                      <FaLink className="text-gray-200" size={32} />
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h4>{link.title}</h4>
                    <div className="flex gap-2">
                      <AiOutlineLike />
                      <FiShare />
                    </div>
                  </div>
                  <p className="text-gray-400 overflow-hidden h-10">
                    {link.subTitle}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default UserPage;
