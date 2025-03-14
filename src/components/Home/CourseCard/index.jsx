// CourseCard.js
import React from 'react';

const CourseCard = ({
    _id,
    course_name,
    company_name,
    course_image,
    company_image,
    level,
    uploaded_date,
    isEnrolled,
    onEnroll,
    onViewCourse,
    isMyLearningsPage
}) => {
    const [enrollButtonState, setEnrollButtonState] = React.useState(isEnrolled ? 'Enrolled' : 'Enroll');
    const [isEnrollButtonDisabled, setIsEnrollButtonDisabled] = React.useState(isEnrolled);

    React.useEffect(() => {
        setEnrollButtonState(isEnrolled ? 'Enrolled' : 'Enroll');
        setIsEnrollButtonDisabled(isEnrolled);
    }, [isEnrolled]);


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

    const handleEnrollClick = () => {
        if (!isEnrollButtonDisabled) {
            onEnroll();
            setEnrollButtonState('Enrolled');
            setIsEnrollButtonDisabled(true);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden p-4 font-[Poppins]">
            {course_image && (
                <img
                    src={course_image}
                    alt={course_name}
                    className="w-full h-40 object-cover rounded-md"
                />
            )}

            <div className="mt-3 flex items-center space-x-2">
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

            <div className="mt-4 flex justify-center">
                {isMyLearningsPage ? (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={onViewCourse}
                    >
                        View Course
                    </button>
                ) : (
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-medium text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isEnrollButtonDisabled ? 'opacity-50 cursor-default' : ''}`}
                        type="button"
                        onClick={handleEnrollClick}
                        disabled={isEnrollButtonDisabled}
                    >
                        {enrollButtonState}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CourseCard;