import Button from "../../Button";
import CourseCard from "../CourseCard";

const CourseSection = () => (
  <section className="py-10 px-20 bg-gray-100">
    <h2 className="text-xl font-semibold mb-6">Courses and Professional Certificates</h2>
    <div className="grid grid-cols-3 gap-4">
      {[
        { title: 'Artificial Intelligence', provider: 'Sysco Labs', date: 'Jan 8, 2025', image: '/ai.webp' },
        { title: 'Cybersecurity Fundamentals', provider: 'Industrial Systems', date: 'Jan 3, 2025', image: '/cybersecurity.webp' },
        { title: 'Kubernetes Fundamentals', provider: 'Epic SL', date: 'Jan 4, 2025', image: '/kubernetes.webp' }
      ].map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
    </div>
    <div className="text-center mt-6">
      <Button text="View All" variant="outline" />
    </div>
  </section>
);

export default CourseSection;