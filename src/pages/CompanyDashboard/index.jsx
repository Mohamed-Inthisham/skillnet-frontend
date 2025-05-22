// import React from "react";
// import CompanySidebar from "../../components/CompanySidebar";
// import CompanyDashboard from "../../components/CompanyDashboard";
// import CompanyHeader from "../../layout/CompanyHeader";

// const CompanyDashboardPage = () => {
//   return (
//     <>
//       <CompanyHeader />
//         <div className="flex h-screen">
//           <CompanySidebar />
              
//           <div className="flex-1 p-2">
//             <CompanyDashboard />
//           </div>
//         </div>
//     </>
//   );
// };

// export default CompanyDashboardPage;


import React from "react";
import CompanySidebar from "../../components/CompanySidebar"; // Corrected path if needed
import CompanyDashboard from "../../components/CompanyDashboard"; // Corrected path if needed
import CompanyHeader from "../../layout/CompanyHeader"; // Corrected path if needed

const CompanyDashboardPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden"> {/* (A) Outermost container: full height, flex column */}
      <CompanyHeader /> {/* (B) Header takes its natural height */}
      
      <div className="flex flex-1 overflow-hidden"> {/* (C) Main area: flex row, takes remaining height, hides its overflow */}
        <CompanySidebar /> {/* (D) Sidebar takes its natural width */}
        
        {/* (E) Content Area: takes remaining width, handles its own internal scrolling */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100"> 
          {/* p-2 from your original code is applied here, or within CompanyDashboard */}
          <div className="p-2"> {/* Or apply padding directly in CompanyDashboard's root div */}
            <CompanyDashboard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanyDashboardPage;