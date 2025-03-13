import FeatureCard from "../FeatureCard";
import faceImage from "../../../assets/faceIcon.webp";
import jobsIcon from "../../../assets/jobsIcon.webp";
import englishIcon from "../../../assets/englishIcon.webp";
import answerIcon from "../../../assets/answerIcon.webp";

const FeatureSection = () => (
  <section className="py-10 px-20 bg-gray-100 text-center mt-10 ml-[100px] mr-[140px] font-[Poppins]">
    <h2 className="text-sm mb-2">New on Skill Net</h2>
    <h2 className="text-2xl font-medium mb-6">Courses and Professional Certificates</h2>
    <div className="grid grid-cols-4 gap-4 ">
      {[
        { image: faceImage, title: "Face Recognition", description: "Verify user identity with secure face authentication." },
        { image: jobsIcon, title: "Language Fluency", description: "Get detailed feedback on your spoken English proficiency." },
        { image: englishIcon, title: "Answer Evaluation", description: "Get instant feedback with smart answer analysis." },
        { image: answerIcon, title: "Apply Jobs", description: "Boost your career by applying for jobs with verified skills." },
      ].map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  </section>
);

export default FeatureSection;