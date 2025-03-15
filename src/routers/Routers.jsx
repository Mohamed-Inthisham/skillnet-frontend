import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ContactUs, Landing,Login,StudentRegister, CompanyDashboard, CompanyStudents, CompanyCourses, Home, Programs, MyLearnings, CompanyAddCourses, CompanyRecruitment, CompanyAddQuizzes, CompanyAddFluencyTests, CompanyAddCertifications, ExamRules, EnglishFluency, EnglishFluencyTest, ModuleContent, Module, CompanyAddDescriptiveQuizzes, CompanyModule, EssayQuestions, ExamResult} from "../pages";

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
          <Route path="/MyLearnings" element={<MyLearnings/>}/>
          <Route path="/ExamRules" element={<ExamRules/>}/>
          <Route path="/EnglishFluency" element={<EnglishFluency/>}/>
          <Route path="/EnglishFluencyTest" element={<EnglishFluencyTest/>}/>
          <Route path="/EssayQuestions" element={<EssayQuestions/>}/>
          <Route path="/CompanyDashboard" element={<CompanyDashboard />} />
          <Route path="/CompanyStudents" element={<CompanyStudents />} />
          <Route path="/CompanyCourses" element={<CompanyCourses />} />
          <Route path="/CompanyAddCourses" element={<CompanyAddCourses />} />
          <Route path="/CompanyAddQuizzes" element={<CompanyAddQuizzes />} />
          <Route path="/CompanyAddFluencyTests" element={<CompanyAddFluencyTests />} />
          <Route path="/CompanyAddCertifications" element={<CompanyAddCertifications />} />
          <Route path="/ModuleContent" element={<ModuleContent />} />
          <Route path="/module/:courseId" element={<Module />} /> {/* Add this line */}
          <Route path="/CompanyRecruitment" element={<CompanyRecruitment />} />
          <Route path="/CompanyModule" element={<CompanyModule />} />
          <Route path="/CompanyAddDescriptiveQuizzes" element={<CompanyAddDescriptiveQuizzes />} />
          <Route path="/ExamResult" element={<ExamResult />} />
          <Route path="/module-content/:contentId" element={<ModuleContent />} />

        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
