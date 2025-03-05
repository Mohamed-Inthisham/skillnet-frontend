import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ContactUs, Landing,Login,StudentRegister } from "../pages";

const Routers = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/StudentRegister" element={<StudentRegister />} />
          <Route path="/ContactUs" element={<ContactUs />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
