// src/components/Skills.tsx
'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { skills } from '@/data/skills';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900" id="skills">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            💡 Skills
          </span>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Skills &amp; Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
            
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {skill.name}
              </h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.3 + index * 0.05 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full h-2"
                />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 inline-block">
                {skill.level}%
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;