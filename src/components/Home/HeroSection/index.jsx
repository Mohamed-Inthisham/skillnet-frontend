import React from "react";
import Button from "../../Button";
import HeroImage from "../../../assets/HeroImage.webp";

const HeroSection = () => (
  <section className="flex justify-between items-center pl-10 mt-10 bg-white border-2 border-gray-200 rounded-lg w-[1000px] ml-[200px] font-[Poppins]">
    <div>
      <h1 className="text-3xl font-semibold -mt-12">
        Elevate your <br/> expertise. Learn from <br /> top companies.
      </h1>
      <p className="text-gray-500 mt-5">
        Level up your skills and supercharge your career with our transformative programs.
      </p>
      <Button text="Explore Programs" variant="outline" className="mt-4" />
    </div>
    <img src={HeroImage} alt="Hero" className="w-2/3 rounded-rt-lg rounded-rb-lg h-[350px]" />
  </section>
);

export default HeroSection;
