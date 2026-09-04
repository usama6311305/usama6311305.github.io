// src/components/Skills.tsx
'use client';

import { skills } from '@/data/skills';

const Skills = () => {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900" id="skills">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            💡 Skills
          </span>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Skills &amp; Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <div className="text-4xl mb-3">{skill.icon}</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                {skill.name}
              </h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-2 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;