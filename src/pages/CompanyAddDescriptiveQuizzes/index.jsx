import React from 'react'
import CompanyHeader from "../../layout/CompanyHeader";
import CompanySidebar from "../../components/CompanySidebar";
import CompanyAddDescriptiveQuizzesComponent from "../../components/CompanyAddDescriptiveQuizzes";

const CompanyAddDescriptiveQuizzes = () => {
    return (
      <>
        <CompanyHeader />
          <div className="flex h-screen">
            <CompanySidebar />
                
            <div className="flex-1 p-2">
              <CompanyAddDescriptiveQuizzesComponent />
            </div>
          </div>
      </>
    );
  };
  
  export default CompanyAddDescriptiveQuizzes;