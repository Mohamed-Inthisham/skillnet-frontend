import React from "react";
import Button from "../Button";
import "../../customCss/styles.css"
const Partner = ({ logo, name }) => {
  return (
    <div className="flex flex-col items-center space-x-24">
      <img src={logo} alt={name} className="w-20 h-20" />
      <div className="mt-2">
        <Button text={name} className="-ml-20 mt-2 h-7 text-sm w-32 text-center custom-button" />
      </div>
    </div>
  );
};

export default Partner;
