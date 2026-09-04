// src/components/Experience.tsx
'use client';

import { experiences } from '@/data/experience';

const Experience = () => {
  // Check if experiences exists and is an array
  if (!experiences || !Array.isArray(experiences)) {
    return (
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50" id="experience">
        <div className="container mx-auto text-center">
          <p className="text-red-500">Experience data not available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50" id="experience">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            💼 Experience
          </span>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 pb-12 border-l-2 border-blue-500 last:border-l-0 last:pb-0"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-blue-500 rounded-full" />
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-wrap items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {exp.position}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {exp.period}
                  </span>
                </div>
                <h4 className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  {exp.company}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;