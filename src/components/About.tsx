// src/components/About.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      gsap.from('.about-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, [inView]);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        ref(el);
      }}
      className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50"
      id="about"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
          About Me
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-12" />

        <div className="about-content max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          I'm a Software Engineering graduate with experience building modern web applications using React.js, Next.js, TypeScript, Tailwind CSS, Zustand, and REST APIs.

I'm passionate about creating beautiful, responsive, and high-performance user interfaces.


          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            My journey in tech started with a curiosity for how things work on
            the web, and it's grown into a career where I get to solve complex
            problems and bring ideas to life through code.
          </p>
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: 'Experience', value: '5+ Years' },
              { label: 'Projects', value: '50+' },
              { label: 'Clients', value: '30+' },
              { label: 'Countries', value: '10+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;