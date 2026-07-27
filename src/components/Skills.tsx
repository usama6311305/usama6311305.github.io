// src/components/Skills.tsx
'use client';

import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap'; // Comment this out
import { useInView } from 'react-intersection-observer';
import { skills } from '@/data/skills';

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Comment out GSAP effect
  // useEffect(() => {
  //   if (inView) {
  //     gsap.from('.skill-item', {
  //       opacity: 0,
  //       y: 30,
  //       duration: 0.8,
  //       stagger: 0.1,
  //       ease: 'power3.out',
  //     });
  //   }
  // }, [inView]);

  // Debug: Log all skills
  useEffect(() => {
    console.log('Total skills:', skills.length);
    console.log('Skills:', skills);
  }, []);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        ref(el);
      }}
      className="py-20 px-4 min-h-screen"
      id="skills"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-12" />

        {/* Debug counter */}
        <div className="text-center text-sm text-gray-500 mb-4">
          Total Skills: {skills.length}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
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