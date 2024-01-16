import React from "react";
import { FaImage } from "react-icons/fa";
import { IoColorPalette } from "react-icons/io5";

const RadioToggler = ({ options, defaultValue, onChange }) => {
  return (
    <div className="radio-togglers">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="bgType"
            value={option.value}
            defaultChecked={defaultValue === option.value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
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
    </div>
  );
};

export default RadioToggler;
