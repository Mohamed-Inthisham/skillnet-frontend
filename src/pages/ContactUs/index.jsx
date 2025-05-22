import ContactInfo from "../../components/ContactUs/ContactInfo";
import ContactSection from "../../components/ContactUs/ContactSection";
import Button from "../../components/Button";
import logo from "../../assets/Logo.webp";
import { Link } from "react-router-dom";
import UserHeader from "../../layout/UserHeader"

const ContactPage = () => {
  return (
    <>
     <UserHeader />
      <div className="flex justify-between items-center p-4 bg-white px-10 mr-[100px] ml-[100px] mb-3 font-[Poppins]">
     
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
