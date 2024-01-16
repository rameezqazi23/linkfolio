import React from "react";
import { FaSave } from "react-icons/fa";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children, className }) => {
  const { pending } = useFormStatus();
  // console.log("Form status==>", pending);
  return (
    <button type="submit" className={className}>
      {pending && <p>Saving...</p>}
      {!pending && (
        <span className="flex gap-2">
          {/* <FaSave size={18} /> */}
          {children}
        </span>
      )}
    </button>
  );
};

export default SubmitButton;
