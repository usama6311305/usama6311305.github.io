// src/components/Education.tsx
"use client";

import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
import { useInView } from "react-intersection-observer";

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // useEffect(() => {
  //   if (inView) {
  //     gsap.from(".education-item", {
  //       opacity: 0,
  //       y: 40,
  //       duration: 0.8,
  //       stagger: 0.2,
  //       ease: "power3.out",
  //     });
  //   }
  // }, [inView]);

  return (
    <section
      id="education"
      ref={(el) => {
        sectionRef.current = el;
        ref(el);
      }}
      className="py-24 px-6 bg-[#0F172A]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-purple-400 font-semibold uppercase tracking-widest">
            Education
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            My Academic Journey
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-5 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* University */}
          <div className="education-item bg-[#1E293B] border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500 transition duration-300">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-3xl mb-6">
              🎓
            </div>

            <h3 className="text-2xl font-bold text-white">
              BS Software Engineering
            </h3>

            <h4 className="text-lg text-purple-300 mt-2">
              Minhaj University Lahore
            </h4>

            <p className="text-gray-400 mt-2">
              2021 – 2025
            </p>

            <div className="mt-6 space-y-2 text-gray-300">
              <p>• CGPA: 3.14 / 4.00</p>
              <p>• Final Year Project: Personalized Fact-Based News Aggregator</p>
              <p>• Specialized in Web Development & MERN Stack</p>
            </div>
          </div>

          {/* Certifications */}
          <div className="education-item bg-[#1E293B] border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500 transition duration-300">
            <div className="w-16 h-16 rounded-full bg-pink-600 flex items-center justify-center text-3xl mb-6">
              📜
            </div>

            <h3 className="text-2xl font-bold text-white">
              Professional Skills
            </h3>

            <h4 className="text-lg text-purple-300 mt-2">
              Self Learning & Online Courses
            </h4>

            <p className="text-gray-400 mt-2">
              2023 – Present
            </p>

            <div className="mt-6 space-y-2 text-gray-300">
              <p>• React.js Development</p>
              <p>• Next.js Development</p>
              <p>• TypeScript</p>
              <p>• Tailwind CSS</p>
              <p>• REST API Integration</p>
              <p>• Zustand State Management</p>
              <p>• Git & GitHub</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;