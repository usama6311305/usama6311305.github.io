// src/components/Projects.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { projects } from '@/data/projects';

const Projects = () => {
  // const sectionRef = useRef<HTMLElement>(null); // Remove this line
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Fixed: Build categories manually for better compatibility
  const categories = ['all'];
  projects.forEach((p) => {
    if (!categories.includes(p.category)) {
      categories.push(p.category);
    }
  });

  // useEffect(() => {
  //   if (inView) {
  //     gsap.from('.project-card', {
  //       opacity: 0,
  //       y: 40,
  //       duration: 0.8,
  //       stagger: 0.15,
  //       ease: 'power3.out',
  //     });
  //   }
  // }, [inView, activeFilter]);

  return (
    <section
      ref={ref}  // Just use ref directly
      className="py-20 px-4"
      id="projects"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
          Projects
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8" />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-6xl">
                {project.icon}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;