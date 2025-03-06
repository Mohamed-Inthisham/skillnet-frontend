import React from "react";

const FeatureCard = ({ image, title, description }) => (
  <div className="p-4 border rounded-lg shadow-sm flex flex-col items-center">
    <img src={image} alt={title} className="h-12 mb-2" />
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-gray-500 text-sm text-center">{description}</p>
  </div>
);

export default FeatureCard;