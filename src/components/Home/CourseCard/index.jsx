const CourseCard = ({ title, provider, date, image }) => (
  <div className="p-4 border border-gray-200 rounded-lg shadow-md bg-white">
    <img src={image} alt={title} className="w-full h-40 object-cover rounded" />
    <h3 className="mt-2 font-semibold">{title}</h3>
    <p className="text-gray-500 text-sm">{provider}</p>
    <p className="text-gray-400 text-xs mt-10">Beginner • {date}</p>
  </div>
);

export default CourseCard;