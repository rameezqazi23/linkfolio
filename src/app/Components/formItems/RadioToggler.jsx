import React from "react";
import { FaImage } from "react-icons/fa";
import { IoColorPalette } from "react-icons/io5";

const RadioToggler = ({ options, defaultValue }) => {
  return (
    <div className="radio-togglers">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="bgType"
            value={option.value}
            defaultChecked={defaultValue === option.value}
          />
          <div className="flex justify-center items-center">
            {option.value === "color" ? (
              <IoColorPalette size={18} />
            ) : (
              <FaImage size={18} />
            )}
            <span>{option.label}</span>
          </div>
        </label>
      ))}
      {/* <label>
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
      </label> */}
    </div>
  );
};

export default RadioToggler;
