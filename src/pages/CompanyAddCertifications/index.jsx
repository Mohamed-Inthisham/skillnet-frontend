import React from 'react'
import CompanyHeader from "../../layout/CompanyHeader";
import CompanySidebar from "../../components/CompanySidebar";
import CompanyAddCertificationsComponent from "../../components/CompanyAddCertifications";

const CompanyAddCertifications = () => {
    return (
      <>
        <CompanyHeader />
          <div className="flex h-screen">
            <CompanySidebar />
                
            <div className="flex-1 p-2">
              <CompanyAddCertificationsComponent />
            </div>
          </div>
      </>
    );
  };
  
  export default CompanyAddCertifications;
