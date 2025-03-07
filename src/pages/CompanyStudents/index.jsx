import React from "react";
import CompanySidebar from "../../components/CompanySidebar";
import CompanyDashboard from "../../components/CompanyDashboard";
import CompanyHeader from "../../layout/CompanyHeader";
import CompanyStudents from "../..//components/CompanyStudents";

const CompanyStudentsPage = () => {
  return (
    <>
      <CompanyHeader />
        <div className="flex h-screen">
          <CompanySidebar />
              
          <div className="flex-1 p-2">
          <CompanyStudents />
          </div>
        </div>
    </>
  );
};

export default CompanyStudentsPage;
