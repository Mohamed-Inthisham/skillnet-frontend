import React from "react";
import Button from "../../Button";

const HeroSection = () => (
  <section className="flex justify-between items-center px-20 py-10 bg-gray-100">
    <div>
      <h1 className="text-3xl font-bold">
        Elevate your expertise. Learn from top companies.
      </h1>
      <p className="text-gray-600 mt-2">
        Level up your skills and supercharge your career with our transformative programs.
      </p>
      <Button text="Explore Programs" className="mt-4" />
    </div>
    <img src="/hero-image.webp" alt="Hero" className="w-1/3 rounded-lg" />
  </section>
);

export default HeroSection;
