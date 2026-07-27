// src/components/Footer.tsx

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080812] border-t border-purple-500/20 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Usama <span className="text-purple-500">Sultan</span>
            </h2>

            <p className="text-gray-400 mt-3 max-w-md">
              Frontend Developer specializing in React.js, Next.js,
              TypeScript, Tailwind CSS, REST APIs, and modern web
              applications.
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6 text-2xl">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/usama-sultan-930b9a2b5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:yourgmail@gmail.com"
              className="text-gray-400 hover:text-red-500 transition"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Usama Sultan. All Rights Reserved.
          </p>

          <p className="text-gray-500 text-sm flex items-center gap-2">
            Made with <FaHeart className="text-red-500" /> using Next.js &
            Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;