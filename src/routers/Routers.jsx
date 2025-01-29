import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Landing } from "../pages";

const Routers = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
