// src/components/Contact.tsx
'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setIsLoading(false);
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50" id="contact">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            📬 Contact
          </span>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-md mx-auto">
            Have a project in mind? Let's collaborate and bring your ideas to life.
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 bg-green-100 dark:bg-green-900/30 rounded-2xl border border-green-300 dark:border-green-700"
          >
            <div className="text-6xl mb-4 animate-float">✅</div>
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">
              Thank You!
            </h3>
            <p className="text-green-700 dark:text-green-300 mt-2">
              Your message has been sent successfully. I'll get back to you soon!
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
          >
            <motion.div >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
            </motion.div>

            <motion.div >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </motion.div>

            <motion.div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>
            </motion.div>

            <motion.button
         
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default Contact;