import React from 'react'
import CompanyHeader from "../../layout/CompanyHeader";
import CompanySidebar from "../../components/CompanySidebar";
import CompanyAddFluencyTestsComponent from "../../components/CompanyAddFluenctTests";

const CompanyAddFluencyTests = () => {
    return (
      <>
        <CompanyHeader />
          <div className="flex h-screen">
            <CompanySidebar />
                
            <div className="flex-1 p-2">
              <CompanyAddFluencyTestsComponent />
            </div>
          </div>
      </>
    );
  };
  
  export default CompanyAddFluencyTests;