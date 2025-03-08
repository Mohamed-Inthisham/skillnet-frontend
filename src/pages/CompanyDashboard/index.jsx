import React from "react";
import CompanySidebar from "../../components/CompanySidebar";
import CompanyDashboard from "../../components/CompanyDashboard";
import CompanyHeader from "../../layout/CompanyHeader";

const CompanyDashboardPage = () => {
  return (
    <>
      <CompanyHeader />
        <div className="flex h-screen">
          <CompanySidebar />
              
          <div className="flex-1 p-2">
            <CompanyDashboard />
          </div>
        </div>
    </>
  );
};

export default CompanyDashboardPage;
