import ContactInfo from "../../components/ContactInfo";
import ContactSection from "../../components/ContactUs/ContactSection";
import Button from "../../components/Button";
import logo from "../../assets/Logo.webp";

const ContactPage = () => {
  return (
    <>
      <div className="flex justify-between items-center p-4 bg-white border-b-2 border-gray-200 px-10 mr-[100px] ml-[100px] mb-3 font-[Poppins]">
        <h1 className="text-xl font-bold">
          <img src={logo} alt="SkillNet Logo" className="h-8" />
        </h1>
      </div>
      <div className="p-6">
        <div className="max-w-4xl mx-auto mb-6">
          <ContactInfo />
        </div>
        <ContactSection />
      </div>
    </>
  );
};

export default ContactPage;
