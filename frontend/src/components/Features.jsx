import React from "react";
import {
  FaVideo,
  FaChartLine,
  FaUsers,
  FaLaptop,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaVideo className="text-3xl text-white" />,
      title: "Interactive Video Lectures",
      description:
        "High-quality video content with interactive elements to enhance your learning experience",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaChartLine className="text-3xl text-white" />,
      title: "Progress Tracking",
      description:
        "Monitor your learning progress with detailed analytics and performance insights",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: <FaUsers className="text-3xl text-white" />,
      title: "Expert Instructors",
      description:
        "Learn from experienced professionals who are passionate about teaching",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: <FaLaptop className="text-3xl text-white" />,
      title: "Multi-Device Access",
      description:
        "Access your courses from any device, anywhere, anytime with seamless synchronization",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      icon: <FaClock className="text-3xl text-white" />,
      title: "Flexible Learning",
      description:
        "Study at your own pace with 24/7 access to course materials and resources",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: <FaShieldAlt className="text-3xl text-white" />,
      title: "Secure Platform",
      description:
        "Your data and progress are protected with enterprise-grade security measures",
      gradient: "from-red-500 to-red-600",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          🚀 Platform Features
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the powerful features that make learning engaging, effective,
          and enjoyable
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div
              className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Learning?
          </h3>
          <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
            Join our community of learners and unlock your potential with our
            comprehensive learning platform
          </p>
          <a
            href="/login"
            className="inline-flex items-center px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
