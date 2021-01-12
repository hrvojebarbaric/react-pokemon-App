import React from "react";

const CustomButton = ({ onClick, buttonText, disabled }) => {
  return (
    <button
      className="fs-2 fw-bold btn btn-warning"
      disabled={disabled}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};
export default CustomButton;
