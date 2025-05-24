import React from "react";
import CompanySidebar from "../../components/CompanySidebar";
import CompanyDashboard from "../../components/CompanyDashboard";
import CommonHeader from "../../layout/CommonHeader";
import CompanyStudents from "../..//components/CompanyStudents";

const CompanyStudentsPage = () => {
  return (
    <>
      <CommonHeader />
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
