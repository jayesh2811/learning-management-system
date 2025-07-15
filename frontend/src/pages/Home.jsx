import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Courses from "../components/Courses";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-gray-50 text-black">
      <Navbar />
      <Hero />
      <Courses />
      <Footer />
    </div>
  );
};

export default Home;
