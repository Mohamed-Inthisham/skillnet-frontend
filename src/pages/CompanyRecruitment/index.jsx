import React from "react";
import CompanySidebar from "../../components/CompanySidebar";
import CompanyDashboard from "../../components/CompanyDashboard";
import CommonHeader from "../../layout/CommonHeader";
import CompanyRecruitment from "../../components/CompanyRecruitment";

const CompanyRecruitmnetPage = () => {
  return (
    <>
      <CommonHeader />
        <div className="flex h-screen">
          <CompanySidebar />
              
          <div className="flex-1 p-2">
            <CompanyRecruitment />
          </div>
        </div>
    </>
  );
};

export default CompanyRecruitmnetPage;
