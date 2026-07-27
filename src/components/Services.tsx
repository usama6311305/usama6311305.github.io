// src/components/Services.tsx
'use client';

import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { services } from '@/data/services';

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // useEffect(() => {
  //   if (inView) {
  //     gsap.from('.service-card', {
  //       opacity: 0,
  //       y: 40,
  //       duration: 0.8,
  //       stagger: 0.15,
  //       ease: 'power3.out',
  //     });
  //   }
  // }, [inView]);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        ref(el);
      }}
      className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50"
      id="services"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
          Services
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-12" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;