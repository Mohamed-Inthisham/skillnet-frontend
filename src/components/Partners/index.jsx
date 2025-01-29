import React from "react";
const Partner = ({ logo, name }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={logo} alt={name} className="w-16 h-16" />
      <p className="mt-2 font-semibold">{name}</p>
    </div>
  );
};
export default Partner;
