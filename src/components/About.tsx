// src/components/About.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, GraduationCap, Briefcase, Languages, User } from 'lucide-react';

const About = () => {
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const quickInfo = [
    { label: 'Location', value: 'Lahore, Pakistan', icon: MapPin },
    { label: 'Education', value: 'BS Software Engineering', icon: GraduationCap },
    { label: 'Experience', value: '4+ Years', icon: Briefcase },
    { label: 'Languages', value: 'English, Urdu', icon: Languages },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50" id="about">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.span
         
            className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
          >
            👨‍💻 About Me
          </motion.span>
          <motion.h2
          
            className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
          >
            Passionate Developer &amp; Problem Solver
          </motion.h2>
          <motion.div
          
            className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div>
            <div className="text-6xl mb-6">
              <User size={64} className="text-purple-500" />
            </div>
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
          </motion.div>

          <motion.div
          
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
          >
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Quick Info
            </h4>
            <div className="space-y-4">
              {quickInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0"
                  >
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-3">
                      <Icon size={18} className="text-purple-500" />
                      {info.label}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">{info.value}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Social/Contact Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Connect with me:</p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all hover:scale-110"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="mailto:yourgmail@gmail.com"
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all hover:scale-110"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;