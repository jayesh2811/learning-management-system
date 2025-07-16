import React from "react";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaUsers,
  FaGraduationCap,
  FaTrophy,
  FaArrowRight,
  FaVideo,
  FaChartLine,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white rounded-full opacity-20 animate-bounce animation-delay-1000"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-300 rounded-full opacity-30 animate-bounce animation-delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-indigo-300 rounded-full opacity-25 animate-bounce animation-delay-3000"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-yellow-300 rounded-full opacity-30 animate-ping animation-delay-1500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-pink-300 rounded-full opacity-25 animate-ping animation-delay-3500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-fade-in">
                <FaStar className="text-yellow-400 mr-2" />
                <span className="text-sm font-medium">
                  🎓 Welcome to EduTech Institute
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-slide-up">
                <span className="block">Transform Your</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  Future Today
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-purple-100 leading-relaxed max-w-2xl animate-slide-up animation-delay-500">
                Join our exclusive learning community where expert instructors
                guide you through personalized video lectures and hands-on
                learning experiences designed for your success.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-1000">
              <Link
                to="/login"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
              >
                <span>Start Learning</span>
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <button className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <FaPlay className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20 animate-slide-up animation-delay-1500">
              <div className="text-center group">
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  500+
                </div>
                <div className="text-purple-200 text-sm">Active Students</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  50+
                </div>
                <div className="text-purple-200 text-sm">
                  Expert Instructors
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  1000+
                </div>
                <div className="text-purple-200 text-sm">Video Lectures</div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Elements */}
          <div className="relative animate-slide-left">
            {/* Main Card */}
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse animation-delay-1000"></div>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaGraduationCap className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Premium Learning Experience
                  </h3>
                  <p className="text-purple-100">
                    Personalized education tailored to your pace and goals
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                    <FaVideo className="text-2xl text-purple-300 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-white font-medium text-sm">
                      HD Video Lectures
                    </div>
                    <div className="text-purple-200 text-xs mt-1">
                      Crystal clear quality
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                    <FaChartLine className="text-2xl text-indigo-300 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-white font-medium text-sm">
                      Progress Tracking
                    </div>
                    <div className="text-purple-200 text-xs mt-1">
                      Monitor your growth
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                    <FaUsers className="text-2xl text-blue-300 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-white font-medium text-sm">
                      Expert Instructors
                    </div>
                    <div className="text-purple-200 text-xs mt-1">
                      Industry professionals
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                    <FaShieldAlt className="text-2xl text-green-300 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-white font-medium text-sm">
                      Secure Platform
                    </div>
                    <div className="text-purple-200 text-xs mt-1">
                      Safe & reliable
                    </div>
                  </div>
                </div>

                {/* Progress Bar Animation */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-purple-100">
                    <span>Average Student Progress</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 h-3 rounded-full animate-pulse transition-all duration-1000"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-purple-200 text-center">
                    Join thousands of successful learners
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Achievement Badge */}
            <div className="absolute -top-8 -left-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-2xl animate-bounce animation-delay-2000 hover:scale-110 transition-transform duration-300 cursor-pointer">
              <FaTrophy className="text-2xl text-white" />
            </div>

            {/* Floating Notification */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-4 shadow-2xl animate-pulse hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                <div className="text-sm font-medium text-gray-800">
                  Live Session Starting
                </div>
              </div>
            </div>

            {/* Additional Floating Elements */}
            <div className="absolute top-1/4 -right-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full p-3 shadow-lg animate-bounce animation-delay-3000">
              <FaStar className="text-white text-lg" />
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center animate-fade-in animation-delay-2000">
          <p className="text-purple-200 text-sm mb-6">
            Trusted by students worldwide
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>
              <span className="text-white text-sm">4.9/5 Rating</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="text-white text-sm">98% Success Rate</div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="text-white text-sm">24/7 Support</div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgb(249 250 251)"
          />
        </svg>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        .animate-slide-left {
          animation: slide-left 0.8s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-3500 {
          animation-delay: 3.5s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;
