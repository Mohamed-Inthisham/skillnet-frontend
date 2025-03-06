import FeatureCard from "../FeatureCard";
import faceImage from "../../../assets/faceIcon.webp";
import jobsIcon from "../../../assets/jobsIcon.webp";
import englishIcon from "../../../assets/englishIcon.webp";
import answerIcon from "../../../assets/answerIcon.webp";

const FeatureSection = () => (
  <section className="py-10 px-20 bg-gray-100 text-center mt-10 ml-[100px] mr-[140px] font-[Poppins]">
    <h2 className="text-sm mb-2">New on Skill Net</h2>
    <h2 className="text-2xl font-semibold mb-6">Courses and Professional Certificates</h2>
    <div className="grid grid-cols-4 gap-4 ">
      {[
        { image: faceImage, title: "Face Recognition", description: "Lorem ipsum dolor sit amet." },
        { image: englishIcon, title: "Answer Evaluation", description: "Lorem ipsum dolor sit amet." },
        { image: answerIcon, title: "Apply Jobs", description: "Lorem ipsum dolor sit amet." },
        { image: jobsIcon, title: "Language Fluency", description: "Lorem ipsum dolor sit amet." },
      ].map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  </section>
);

export default FeatureSection;