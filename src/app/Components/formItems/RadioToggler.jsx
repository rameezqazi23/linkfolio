import React from "react";
import { FaImage } from "react-icons/fa";
import { IoColorPalette } from "react-icons/io5";

const RadioToggler = ({ options }) => {
  return (
    <div className="radio-togglers">
      <label>
        <input type="radio" name="bgType" value="color" />
        <span>
          <IoColorPalette size={18} />
          Color
        </span>
      </label>
      <label>
        <input type="radio" name="bgType" value="image" />
        <span>
          <FaImage size={18} />
          Image
        </span>
      </label>
    </div>
  );
};

export default RadioToggler;
