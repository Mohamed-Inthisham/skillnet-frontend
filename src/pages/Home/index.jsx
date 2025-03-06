import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import HeroSection from "../../components/Home/HeroSection";
import FeatureSection from "../../components/Home/FeatureSection";
import StatsSection from "../../components/Home/StatsSection";
import CourseSection from "../../components/Home/CourseSection";
import PartnersSection from "../../components/Home/PartnersSection";

const HomePage = () => {
  return (
    <div className="font-sans">
      <UserHeader />
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <CourseSection />
      <PartnersSection />
      <Footer bgColor="bg-black" textColor="text-white" />
    </div>
  );
};

export default HomePage;