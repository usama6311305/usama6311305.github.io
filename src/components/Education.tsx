// src/components/Education.tsx
'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900" id="education">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🎓 Education
          </span>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            My Academic Journey
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* University */}
          <motion.div
       
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-gray-50 dark:bg-gray-800 border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500 transition duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-3xl mb-6 animate-float">
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
              <p className="flex items-center gap-2">• <span>CGPA: 3.08 / 4.00</span></p>
              <p className="flex items-center gap-2">• <span>Final Year Project: Personalized Fact-Based News Aggregator</span></p>
              <p className="flex items-center gap-2">• <span>Specialized in Web Development &amp; MERN Stack</span></p>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
           
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-gray-50 dark:bg-gray-800 border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500 transition duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-pink-600 flex items-center justify-center text-3xl mb-6 animate-float animation-delay-2000">
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;