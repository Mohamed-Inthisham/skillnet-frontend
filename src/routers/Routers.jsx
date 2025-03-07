import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ContactUs, Landing,Login,StudentRegister,Home, Programs } from "../pages";

const Routers = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/StudentRegister" element={<StudentRegister />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Programs" element={<Programs/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
