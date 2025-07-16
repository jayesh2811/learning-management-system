import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaGraduationCap,
  FaUsers,
  FaChalkboardTeacher,
  FaAward,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50 text-black min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About EduTech Institute
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Empowering minds through innovative education and personalized
              learning experiences
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To provide exceptional educational experiences that foster growth,
              innovation, and success in our students through dedicated
              instruction and cutting-edge technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Education
              </h3>
              <p className="text-gray-600">
                Delivering high-quality educational content tailored to
                individual learning needs
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChalkboardTeacher className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Instructors
              </h3>
              <p className="text-gray-600">
                Learn from experienced professionals dedicated to your success
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community Focus
              </h3>
              <p className="text-gray-600">
                Building a supportive learning community for collaborative
                growth
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Excellence
              </h3>
              <p className="text-gray-600">
                Committed to maintaining the highest standards in education
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  EduTech Institute was founded with a vision to revolutionize
                  education through technology and personalized learning. We
                  believe that every student deserves access to quality
                  education that adapts to their unique learning style and pace.
                </p>
                <p>
                  Our platform brings together experienced instructors and eager
                  learners in a collaborative environment where knowledge flows
                  freely and growth is continuous. We've created a space where
                  traditional teaching methods meet modern technology to deliver
                  exceptional educational experiences.
                </p>
                <p>
                  Today, we continue to evolve and expand our offerings, always
                  keeping our students' success at the heart of everything we
                  do. Our commitment to excellence drives us to constantly
                  improve and innovate in the field of education.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Personalized learning paths for every student</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Interactive video lectures and materials</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Direct access to expert instructors</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Progress tracking and performance analytics</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Flexible learning schedule</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Innovation
              </h3>
              <p className="text-gray-600">
                We continuously embrace new technologies and methodologies to
                enhance the learning experience and stay ahead of educational
                trends.
              </p>
            </div>

            <div className="text-center p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Integrity
              </h3>
              <p className="text-gray-600">
                We maintain the highest ethical standards in all our
                interactions, fostering trust and transparency in our
                educational community.
              </p>
            </div>

            <div className="text-center p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Inclusivity
              </h3>
              <p className="text-gray-600">
                We create an inclusive environment where every learner feels
                valued, supported, and empowered to achieve their full
                potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
