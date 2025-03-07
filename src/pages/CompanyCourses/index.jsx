import React from "react";
import CompanySidebar from "../../components/CompanySidebar";
import CompanyCourses from "../../components/CompanyCourses";
import CompanyHeader from "../../layout/CompanyHeader";

const CompanyCoursesPage = () => {
  return (
    <>
      <CompanyHeader />
        <div className="flex h-screen">
          <CompanySidebar />
              
          <div className="flex-1 p-2">
            <CompanyCourses />
          </div>
        </div>
    </>
  );
};

export default CompanyCoursesPage;
