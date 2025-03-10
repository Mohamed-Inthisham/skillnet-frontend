import React from 'react'
import CompanyHeader from "../../layout/CompanyHeader";
import CompanySidebar from "../../components/CompanySidebar";
import CompanyAddCoursesComponent from "../../components/CompanyAddCourses";

const CompanyAddCourses = () => {
    return (
      <>
        <CompanyHeader />
          <div className="flex h-screen">
            <CompanySidebar />
                
            <div className="flex-1 p-2">
              <CompanyAddCoursesComponent />
            </div>
          </div>
      </>
    );
  };
  
  export default CompanyAddCourses;
