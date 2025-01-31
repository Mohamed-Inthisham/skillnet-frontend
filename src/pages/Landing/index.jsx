import React from "react";
import Partner from "../../components/Partners";
import CommonHeader from "../../layout/CommonHeader";
import image from "../../../src/assets/image.webp";
import Button from "../../components/Button";
import Footer from "../../layout/Footer";
const Landing = () => {
  const partners = [
    { logo: "/src/assets/Ellipse 1.webp", name: "IFS" },
    { logo: "/src/assets/Ellipse 2.webp", name: "Epic" },
    { logo: "/src/assets/99x.webp", name: "99X" },
    { logo: "/src/assets/sysco.webp", name: "Sysco Labs" },
    { logo: "/src/assets/wso2.webp", name: "WSO2" },
  ];

  return (
    <>
      <CommonHeader />
      <section className="bg-neutral-200  rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 mr-[100px] ml-[100px]">
        <div className="max-w-lg md:ml-28 font-[Poppins] tracking-wider">
          <h2 className="text-4xl font-bold leading-normal mt-16 [word-spacing:6px]">
            Are You <span className="text-blue-500">Ready</span> For{" "}
            <span className="text-blue-500">Industry</span>
          </h2>
          <p className="mt-4 text-lg">Your Partner in Career Transformation</p>
          <p className="text-gray-700 mt-4 w-[540px] [word-spacing:8px] text-justify ">
            Learn smarter with Skill Net. Our innovative platform offers
            industry-aligned courses, anti-cheating tech, and English fluency
            assessments to make your certifications truly impactful.
          </p>
          <div className="mt-5">
            <Button text="Join With Us" variant="outline" />
          </div>
        </div>

        <img
          src={image}
          alt="SkillNet"
          className="w-[480px] h-[450px]  self-end md:self-center "
        />
      </section>

      <section className="bg-neutral-200 p-8 rounded-2xl mt-4 px-20 ml-[100px] mr-[100px]">
        <h3 className="text-xl font-semibold text-center font-[Poppins] -ml-28">
          Our Top Partners
        </h3>
        <div className="flex justify-center gap-6 mt-4">
          {partners.map((partner, index) => (
            <Partner key={index} {...partner} />
          ))}
        </div>
      </section>
      <Footer bgColor="bg-white" textColor="text-black" />
    </>
  );
};

export default Landing;
