// src/components/Education.tsx
'use client';

const Education = () => {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900" id="education">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🎓 Education
          </span>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            My Academic Journey
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* University */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500 transition duration-300">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-3xl mb-6">
              🎓
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              BS Software Engineering
            </h3>
            <h4 className="text-lg text-purple-600 dark:text-purple-400 mt-2">
              Minhaj University Lahore
            </h4>
            <p className="text-gray-500 dark:text-gray-400 mt-2">2021 – 2025</p>
            <div className="mt-6 space-y-2 text-gray-600 dark:text-gray-300">
              <p>• CGPA: 3.14 / 4.00</p>
              <p>• Final Year Project: Personalized Fact-Based News Aggregator</p>
              <p>• Specialized in Web Development &amp; MERN Stack</p>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500 transition duration-300">
            <div className="w-16 h-16 rounded-full bg-pink-600 flex items-center justify-center text-3xl mb-6">
              📜
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Professional Skills
            </h3>
            <h4 className="text-lg text-purple-600 dark:text-purple-400 mt-2">
              Self Learning &amp; Online Courses
            </h4>
            <p className="text-gray-500 dark:text-gray-400 mt-2">2023 – Present</p>
            <div className="mt-6 space-y-2 text-gray-600 dark:text-gray-300">
              <p>• React.js Development</p>
              <p>• Next.js Development</p>
              <p>• TypeScript</p>
              <p>• Tailwind CSS</p>
              <p>• REST API Integration</p>
              <p>• Zustand State Management</p>
              <p>• Git &amp; GitHub</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;