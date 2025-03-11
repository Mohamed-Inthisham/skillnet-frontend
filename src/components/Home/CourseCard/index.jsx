import sys from "../../../assets/sys.webp";

const CourseCard = ({ title, provider, date, image, status = "hidden", onEnroll }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden p-4 font-[Poppins]">
    <img
      src={image}
      alt={title}
      className="w-full h-40 object-cover rounded-md"
    />
    
    <div className="mt-3 flex items-center space-x-2">
      <img src={sys} alt="Provider Logo" className="w-5 h-5 rounded-full" />
      <span className="text-xs text-gray-600">{provider}</span>
    </div>
    
    <h3 className="mt-2 text-lg text-gray-900">{title}</h3>
    <p className="text-gray-400 text-xs mt-1">Beginner - {date}</p>
    
    {/* Keep "Enrolled" button unchanged */}
    {status !== "hidden" && (
      <div className="mt-4 flex justify-center">
        {status === "enroll" ? (
          <span className="text-blue-500 font-medium text-sm">Enroll</span>
        ) : (
          <span className="text-blue-500 font-medium text-sm">Enrolled</span>
        )}
      </div>
    )}

    {/* Show "Enroll" button only for available courses */}
    {onEnroll && status === "hidden" && (
      <div className="mt-4 flex justify-center">
        <span 
          className="text-blue-500 font-medium text-sm cursor-pointer hover:underline" 
          onClick={onEnroll}
        >
          Enroll
        </span>
      </div>
    )}
  </div>
);

export default CourseCard;
