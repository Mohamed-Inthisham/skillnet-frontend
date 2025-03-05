import ContactInfo from "../../components/ContactInfo";
import ContactSection from "../../components/ContactSection";

const ContactPage = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto mb-6">
        <ContactInfo />
      </div>
      <ContactSection />
    </div>
  );
};

export default ContactPage;