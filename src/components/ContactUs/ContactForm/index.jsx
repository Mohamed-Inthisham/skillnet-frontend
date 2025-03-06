import Button from "../../Button";
import InputField from "../../InputField";

const ContactForm = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-tr-lg rounded-br-lg font-[Poppins]">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Feel Free to Write
      </h2>
      <form className="flex flex-col gap-3 ml-10 mr-10">
        <div>
          <p className="text-[15px] mb-2">Name</p>
          <InputField type="text" />
        </div>
        <div>
          <p className="text-[15px] mb-2">Email</p>
          <InputField type="text" />
        </div>
        <div>
          <p className="text-[15px] mb-2" >Phone</p>
          <InputField type="text" />
        </div>
        <div>
          <p className="text-[15px] 200 mb-2">Message</p>
          <textarea
          className="p-2 border rounded-lg w-full bg-white text-gray-400 opacity-90"
        ></textarea>
        </div>
        
        <Button text="Send" className="w-[100px] ml-28" />
      </form>
    </div>
  );
};

export default ContactForm;
