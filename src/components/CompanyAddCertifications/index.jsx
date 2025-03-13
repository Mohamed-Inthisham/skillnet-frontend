import React, { useState } from "react";
import CertificationPreview from "../CertificationPreview";

const CompanyAddCertifications = () => {
  const [certificateData, setCertificateData] = useState({
    certificateName: "",
    issuingOrganization: "",
    certificateDescription: ""
  });

  const [selectedCertificate, setSelectedCertificate] = useState("Introduction to JAVA");
  const [previewData, setPreviewData] = useState({
    certificateName: "Introduction to Python",
    issuingOrganization: "Virtusa",
    certificateDescription: "For successfully completed the SKILLNET online course and examination on the topic of"
  });
  
  // Add state for preview modal
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCertificateData({
      ...certificateData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Save certificate logic would go here
    console.log("Saving certificate:", certificateData);
  };

  const handleDiscard = () => {
    // Reset form
    setCertificateData({
      certificateName: "",
      issuingOrganization: "",
      certificateDescription: ""
    });
  };

  const handlePreview = () => {
    // Set preview data to current form data
    setPreviewData(certificateData);
    // Open the preview modal
    setIsPreviewOpen(true);
  };

  const handlePublish = () => {
    // Logic for publishing certificate
    console.log("Publishing certificate:", certificateData);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Add Certification</h1>

        {/* Description Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow">
          <h2 className="text-lg font-bold mb-4">Description</h2>
          
          <div className="mb-4">
            <label className="block mb-2">
              Certificate Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="certificateName"
              value={certificateData.certificateName}
              onChange={handleInputChange}
              placeholder="Type your course name"
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              Issuing Organization<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="issuingOrganization"
              value={certificateData.issuingOrganization}
              onChange={handleInputChange}
              placeholder="Type your organization name"
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              Certificate Description<span className="text-red-500">*</span>
            </label>
            <div className="border rounded-md">
                <div className="flex items-center border-b p-2">
                    <button className="mr-2 font-bold">B</button>
                    <button className="mr-2 italic">I</button>
                    <button className="mr-2 underline">U</button>
                    <button className="mr-2">🔗</button>
                    <button className="mr-2">😊</button>
                </div>
              <textarea
                name="certificateDescription"
                value={certificateData.certificateDescription}
                onChange={handleInputChange}
                placeholder="Tell us about your certificate"
                className="w-full p-2 h-24 border-none outline-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Preview / Edit Section */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-bold mb-4">Preview / Edit</h2>
          
          <div className="mb-4">
            <select 
              className="w-full p-2 border rounded-md"
              value={selectedCertificate}
              onChange={(e) => setSelectedCertificate(e.target.value)}
            >
              <option>Introduction to JAVA</option>
              <option>Introduction to C++</option>
              <option>React Intermediate</option>
              <option>Python Intermediate</option>
            </select>
          </div>
          
          <div className="border rounded-lg p-6 mb-4">
            <div className="mb-2">
              <span className="font-semibold">Certificate Name : </span>
              {previewData.certificateName}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Issuing organization : </span>
              {previewData.issuingOrganization}
            </div>
            <div className="mb-6">
              <span className="font-semibold">Certificate Description : </span>
              {previewData.certificateDescription}
            </div>
            
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button 
                  onClick={handlePreview}
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200"
                >
                  Preview
                </button>
                <button 
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-500">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="text-red-500">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleDiscard}
              className="bg-white text-gray-600 border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-100"
            >
              Discard
            </button>
            <button 
              onClick={handlePublish}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Public
            </button>
          </div>
        </div>
      </div>

      {/* Certification Preview Modal */}
      <CertificationPreview 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        certificateData={previewData} 
      />
    </>
  );
};

export default CompanyAddCertifications;