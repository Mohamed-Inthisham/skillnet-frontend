import sys from "../../../assets/sys.webp";

const CourseCard = ({ title, provider, date, image, showEnroll = true }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden p-4">
    <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
    
    <div className="mt-3 flex items-center space-x-2">
      <img src={sys} alt="Provider Logo" className="w-5 h-5 rounded-full" />
      <span className="text-xs text-gray-600 font-medium">{provider}</span>
    </div>
    
    <h3 className="mt-2 text-lg font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-400 text-xs mt-1">Beginner • {date}</p>
    
    {showEnroll && (
      <div className="mt-4 flex justify-center">
        <button className="text-blue-500 font-medium text-sm ">Enroll</button>
      </div>
    )}
  </div>
);

export default CourseCard;
