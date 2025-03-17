import Button from "../../Button";
import ai from "../../../assets/ai.webp";
import cs from "../../../assets/cs.webp";
import kubernet from "../../../assets/kuber.webp";
import aws from "../../../assets/aws.webp";
import cc from "../../../assets/cc.webp";
import security from "../../../assets/security.webp";
import sys from "../../../assets/sys.webp";
import ifs from "../../../assets/Ellipse 1.webp";
import epic from "../../../assets/Ellipse 2.webp";
import axiata from "../../../assets/axiata.webp";
import wiley from "../../../assets/wiley.webp";
import xx from "../../../assets/99x.webp";
import { Link } from "react-router-dom";

const CourseSection = () => {
  const courses = [
    {
      image: ai,
      companyLogo: sys,
      companyName: "Sysco Labs",
      courseName:
        "Artificial Intelligence Industrial Control Systems Security",
      date: "January 6, 2025",
      level: "Beginner",
    },
    {
      image: cs,
      companyLogo: ifs,
      companyName: "Industrial and Financial Systems",
      courseName: "Cybersecurity Fundamentals",
      date: "January 5, 2025",
      level: "Beginner",
    },
    {
      image: kubernet,
      companyLogo: epic,
      companyName: "Epic Sri Lanka",
      courseName: "Kubernetes Fundamentals",
      date: "January 4, 2025",
      level: "Beginner",
    },
    {
      image: aws,
      companyLogo: wiley,
      companyName: "Wiley Sri Lanka",
      courseName: "AWS Cloud Support Associate Professional Certificate",
      date: "January 4, 2025",
      level: "Beginner",
    },
    {
      image: security,
      companyLogo: axiata,
      companyName: "Axiata Digital Labs",
      courseName: "GCP Security and Networking",
      date: "January 3, 2025",
      level: "Beginner",
    },
    {
      image: cc,
      companyLogo: xx,
      companyName: "Cambio",
      courseName: "Introduction to Cloud Computing",
      date: "January 2, 2025",
      level: "Beginner",
    },
  ];

  return (
    <section className="py-10 px-20 bg-gray-100 font-[Poppins] ml-[100px] mr-[140px] h-[850px]">
      <h2 className="text-sm mb-6 text-center">New on Skill Net</h2>
      <h2 className="text-xl font-medium mb-6 text-center">
        Courses and Professional Certificates
      </h2>
      <div className="grid grid-cols-3 gap-4 relative"> {/* Add relative here */}
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between"
          >
            <div>
              <img
                className="w-full h-40 object-cover"
                src={course.image}
                alt={course.courseName}
              />
              <div className="px-4 py-2">
                <div className="flex items-center mb-2">
                  <img
                    src={course.companyLogo}
                    alt={course.companyName}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <p className="text-sm text-gray-600">
                    {course.companyName}
                  </p>
                </div>
                <h3 className="text-md mb-4">{course.courseName}</h3>
              </div>
            </div>

            <div className="px-4 py-2 mt-auto">
              <p className="text-gray-400 text-sm">
                {course.level} - {course.date}
              </p>
            </div>
          </div>
        ))}

        {/* Absolutely positioned button */}
        <div className="absolute -bottom-15 right-0 mt-6"> {/* Positioning */}
          <Link to="/Programs">
            <Button
              text="View All"
              variant="outline"
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;