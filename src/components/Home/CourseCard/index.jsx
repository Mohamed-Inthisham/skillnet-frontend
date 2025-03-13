import React from 'react';


const CourseCard = ({
    course_name,
    company_name,
    course_image,
    company_image,
    level,
    uploaded_date,
    status = "hidden",
    onEnroll
}) => {
    // Function to format the uploaded_date to show only date part
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            console.error("Error formatting date:", error);
            return 'Invalid Date';
        }
    };

    const formattedDate = formatDate(uploaded_date);

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden p-4 font-[Poppins]">
            {/* Conditionally render course image */}
            {course_image && (
                <img
                    src={course_image}
                    alt={course_name}
                    className="w-full h-40 object-cover rounded-md"
                />
            )}

            <div className="mt-3 flex items-center space-x-2">
                {/* Conditionally render company image */}
                {company_image && (
                    <img
                        src={company_image}
                        alt="Provider Logo"
                        className="w-5 h-5 rounded-full"
                    />
                )}
                <span className="text-xs text-gray-600">{company_name || "Provider Name Missing"}</span>
            </div>

            <h3 className="mt-2 text-lg text-gray-900 h-14 overflow-hidden">{course_name || "Course Title Missing"}</h3>
            <p className="text-gray-400 text-xs mt-1 h-6">{level ? `Level: ${level} - ${formattedDate}` : `Beginner - ${formattedDate}`}</p>

            {status !== "hidden" && (
                <div className="mt-4 flex justify-center">
                    {status === "enroll" ? (
                        <span className="text-blue-500 font-medium text-sm">Enroll</span>
                    ) : (
                        <span className="text-blue-500 font-medium text-sm">View Course</span>
                    )}
                </div>
            )}

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
};

export default CourseCard;