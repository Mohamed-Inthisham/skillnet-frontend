import React from 'react'
import CompanyHeader from "../../layout/CompanyHeader";
import CompanySidebar from "../../components/CompanySidebar";
import CertificationPreviewComponent from "../../components/CertificationPreview";

const CertificationPreview = () => {
    return (
      <>
        <CompanyHeader />
          <div className="flex h-screen">
            <CompanySidebar />
                
            <div className="flex-1 p-2">
              <CertificationPreviewComponent />
            </div>
          </div>
      </>
    );
  };
  
  export default CertificationPreview;
