const courses = [
  {
    title: "Full Stack Development",
    desc: "Learn MERN stack",
    level: "Beginner",
  },
  {
    title: "React for Beginners",
    desc: "Start your frontend journey",
    level: "Beginner",
  },
  {
    title: "Advanced Node.js",
    desc: "Deep dive into backend",
    level: "Advanced",
  },
];

const Courses = () => {
  return (
    <section className="py-14 px-4 max-w-6xl mx-auto bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        🌟 Featured Courses
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-tr from-purple-100 to-indigo-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-indigo-800">
              {course.title}
            </h3>
            <p className="text-sm text-gray-700 mt-2">{course.desc}</p>
            <p className="text-xs text-pink-600 mt-1 italic">
              Level: {course.level}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
