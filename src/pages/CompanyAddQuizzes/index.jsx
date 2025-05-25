import React from 'react'
import CompanyHeader from "../../layout/CommonHeader";
import CompanySidebar from "../../components/CompanySidebar";
import CompanyAddQuizzesComponent from "../../components/CompanyAddQuizzes";

const CompanyAddQuizzes = () => {
    return (
      <>
        <CompanyHeader />
          <div className="flex h-screen">
            <CompanySidebar />
                
            <div className="flex-1 p-2">
              <CompanyAddQuizzesComponent />
            </div>
          </div>
      </>
    );
  };
  
  export default CompanyAddQuizzes;