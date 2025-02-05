import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Landing,Login } from "../pages";

const Routers = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
