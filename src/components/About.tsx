// src/components/About.tsx
'use client';

const About = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50" id="about">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-200 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            👨‍💻 About Me
          </span>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Passionate Developer &amp; Problem Solver
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-8xl mb-6">👋</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Who Am I?
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              I'm a Software Engineering graduate with experience building modern web applications using React.js, Next.js, TypeScript, Tailwind CSS, Zustand, and REST APIs.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              I'm passionate about creating beautiful, responsive, and high-performance user interfaces that deliver exceptional user experiences.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              My journey in tech started with a curiosity for how things work on the web, and it's grown into a career where I get to solve complex problems and bring ideas to life through code.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Quick Info
            </h4>
            <div className="space-y-4">
              {[
                { label: '📍 Location', value: 'Lahore, Pakistan' },
                { label: '🎓 Education', value: 'BS Software Engineering' },
                { label: '💼 Experience', value: '4+ Years' },
                { label: '🌐 Languages', value: 'English, Urdu' },
              ].map((info) => (
                <div key={info.label} className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                  <span className="text-gray-600 dark:text-gray-400">{info.label}</span>
                  <span className="font-medium text-gray-800 dark:text-white">{info.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;