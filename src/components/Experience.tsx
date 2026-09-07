// src/components/Experience.tsx
'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!experiences || !Array.isArray(experiences)) {
    return (
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50" id="experience">
        <div className="container mx-auto text-center">
          <p className="text-red-500">Experience data not available</p>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50" id="experience">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            💼 Experience
          </span>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
          
              whileHover={{ x: 5 }}
              className="relative pl-8 pb-12 border-l-2 border-purple-500 last:border-l-0 last:pb-0"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-purple-500 rounded-full border-4 border-white dark:border-gray-900">
                <Briefcase size={12} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-wrap items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {exp.position}
                  </h3>
                  <span className="text-sm px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                    {exp.period}
                  </span>
                </div>
                <h4 className="text-lg text-purple-600 dark:text-purple-400 mb-2">
                  {exp.company}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;