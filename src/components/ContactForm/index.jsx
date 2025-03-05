import Button from "../Button";

const ContactForm = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Feel Free to Write</h2>
      <form className="flex flex-col gap-3">
        <input type="text" placeholder="Name" className="p-2 border rounded-lg w-full" disabled value="Michelle Rivera" />
        <input type="email" placeholder="Email" className="p-2 border rounded-lg w-full" disabled value="michelle.rivera@example.com" />
        <input type="tel" placeholder="Phone" className="p-2 border rounded-lg w-full" disabled value="(319) 555-0115" />
        <textarea placeholder="Your Message" className="p-2 border rounded-lg w-full"></textarea>
        <Button text="Send" className="w-full" />
      </form>
    </div>
  );
};

export default ContactForm;