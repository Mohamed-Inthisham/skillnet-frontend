import ContactForm from "../ContactForm";
import contactImage1 from "../../../assets/contactImage.webp";

const ContactSection = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 flex justify-center">
        <img src={contactImage1} alt="Contact Support" className="max-w-xs md:max-w-sm h-[500px]" />
      </div>
      <div className="w-full ">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactSection;