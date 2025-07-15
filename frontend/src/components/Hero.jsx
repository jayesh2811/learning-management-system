import heroImg from "../assets/hero.avif";

const Hero = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-center">
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
