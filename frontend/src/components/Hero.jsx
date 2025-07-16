import React from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaUsers, FaGraduationCap, FaTrophy } from "react-icons/fa";
import heroImg from "../assets/hero.avif";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700">
      <div className="max-w-5xl mx-auto">
        <img
          src={heroImg}
          alt="Learning"
          className="w-full h-64 object-cover rounded-xl shadow-lg border-4 border-white"
        />
        <h2 className="text-4xl md:text-5xl font-bold mt-8">
          “Empower Your Career with IT Skills”
        </h2>
        <p className="mt-4 text-lg">
          Access high-quality video courses from expert instructors.
        </p>
      </div>
    </section>
  );
};

export default Hero;
