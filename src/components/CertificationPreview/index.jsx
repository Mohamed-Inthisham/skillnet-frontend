import React from "react";

const CertificationPreview = ({ isOpen, onClose, certificateData }) => {
  if (!isOpen) return null;
  
  const { certificateName, issuingOrganization, certificateDescription } = certificateData;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Preview</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="border rounded-lg p-4 mb-4">
          <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Certificate design with diagonal stripes */}
            <div className="absolute top-0 left-0 w-64 h-64">
              <svg width="100%" height="100%" viewBox="0 0 200 200">
                <path d="M0 0 L200 200" stroke="#0066cc" strokeWidth="20" strokeOpacity="0.2" />
                <path d="M-40 0 L160 200" stroke="#0066cc" strokeWidth="20" strokeOpacity="0.2"/>
                <path d="M-80 0 L120 200" stroke="#0066cc" strokeWidth="20" strokeOpacity="0.2"/>
                <path d="M-20 0 L180 200" stroke="#000066" strokeWidth="20" strokeOpacity="0.2"/>
                <path d="M-60 0 L140 200" stroke="#000066" strokeWidth="20" strokeOpacity="0.2"/>
              </svg>
            </div>
            
            <div className="absolute bottom-0 right-0 w-64 h-64 transform rotate-180">
              <svg width="100%" height="100%" viewBox="0 0 200 200">
                <path d="M0 0 L200 200" stroke="#0066cc" strokeWidth="20" strokeOpacity="0.2"/>
                <path d="M-40 0 L160 200" stroke="#0066cc" strokeWidth="20" strokeOpacity="0.2"/>
                <path d="M-80 0 L120 200" stroke="#0066cc" strokeWidth="20" strokeOpacity="0.2"/>
                <path d="M-20 0 L180 200" stroke="#000066" strokeWidth="20" strokeOpacity="0.2"/>
                <path d="M-60 0 L140 200" stroke="#000066" strokeWidth="20" strokeOpacity="0.2"/>
              </svg>
            </div>

            <div className="relative z-10 p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Certification of Completion</h2>
              
              <p className="my-4">This certificate is awarded to</p>
              
              <p className="text-2xl font-mono my-6">Mohmmed Inthisham</p>
              
              <p className="mb-4">
                for successfully completing the <strong>{certificateName}</strong>
                <br />course conducted by <strong>{issuingOrganization}</strong>, and for demonstrating
                <br />dedication and achievement in the learning process.
              </p>
              
              <div className="flex justify-between items-end mt-8 pt-4">
                <div className="text-center">
                  <div className="border-t border-black w-32 mx-auto mb-1"></div>
                  <p className="text-sm">Galy Wilson</p>
                  <p className="text-xs">Founder</p>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" width="100%" height="100%">
                      <circle cx="50" cy="50" r="40" fill="#FFCC00" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#CC9900" strokeWidth="2" />
                      <path d="M50 25 L55 40 L70 40 L60 50 L65 65 L50 55 L35 65 L40 50 L30 40 L45 40 Z" fill="#CC9900" />
                      <circle cx="50" cy="50" r="25" fill="none" stroke="#CC9900" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationPreview;