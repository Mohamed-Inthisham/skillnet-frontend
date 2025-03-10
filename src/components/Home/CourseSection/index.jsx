import Button from "../../Button";
import CourseCard from "../CourseCard";
import ai from "../../../assets/ai.webp";
import cs from "../../../assets/cs.webp";
import kubernet from "../../../assets/kuber.webp";

const CourseSection = () => (
  <section className="py-10 px-20 bg-gray-100 font-[Poppins] ml-[100px] mr-[140px]">
    <h2 className="text-sm mb-6 text-center">New on Skill Net</h2>
    <h2 className="text-xl font-medium mb-6 text-center">Courses and Professional Certificates</h2>
    <div className="grid grid-cols-3 gap-4 bg-gray-100 ">
      {[
        { title: 'Artificial Intelligence', provider: 'Sysco Labs', date: 'Jan 8, 2025', image: ai },
        { title: 'Cybersecurity Fundamentals', provider: 'Industrial Systems', date: 'Jan 3, 2025', image: cs },
        { title: 'Kubernetes Fundamentals', provider: 'Epic SL', date: 'Jan 4, 2025', image: kubernet }
      ].map((course, index) => (
        <CourseCard key={index} {...course} status="hidden" />
      ))}
    </div>
    <div className="text-end mt-6">
      <Button text="View All" variant="outline" />
    </div>
  </section>
);

export default CourseSection;