// src/components/Navbar.tsx
'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { Menu, X, Home, User, Brain, Wrench, FolderGit2, Briefcase, GraduationCap, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

// Create context for sidebar state
interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isCollapsed, toggleSidebar } = useSidebar();

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'services', 'projects', 'experience', 'education', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Update main content margin when sidebar collapses
  useEffect(() => {
    const mainElement = document.querySelector('main');
    const footerElement = document.querySelector('footer');
    if (mainElement) {
      if (isCollapsed) {
        mainElement.style.marginLeft = '72px';
        if (footerElement) footerElement.style.marginLeft = '72px';
      } else {
        mainElement.style.marginLeft = '280px';
        if (footerElement) footerElement.style.marginLeft = '280px';
      }
    }
  }, [isCollapsed]);

  const navLinks = [
    { href: 'home', label: 'Home', icon: Home },
    { href: 'about', label: 'About', icon: User },
    { href: 'skills', label: 'Skills', icon: Brain },
    { href: 'services', label: 'Services', icon: Wrench },
    { href: 'projects', label: 'Projects', icon: FolderGit2 },
    { href: 'experience', label: 'Experience', icon: Briefcase },
    { href: 'education', label: 'Education', icon: GraduationCap },
    { href: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <>
      {/* Mobile Menu Button - Fixed Top Left */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-4 left-4 z-50 p-3 rounded-xl transition-all duration-300 ${
          isScrolled
            ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
            : 'bg-purple-600/90 backdrop-blur-sm text-white hover:bg-purple-700'
        } lg:hidden hover:scale-105 active:scale-95`}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-all duration-300 ease-in-out flex flex-col border-r border-gray-200 dark:border-gray-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isCollapsed ? 'lg:w-[72px]' : 'lg:w-[280px]'
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className={`p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 ${
          isCollapsed ? 'lg:justify-center' : ''
        }`}>
          {!isCollapsed && (
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
              onClick={() => scrollToSection('home')}
            >
              US
            </Link>
          )}
          {isCollapsed && (
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              onClick={() => scrollToSection('home')}
            >
              U
            </Link>
          )}
          <div className="flex items-center gap-2">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition text-gray-600 dark:text-gray-300"
              aria-label="Toggle sidebar"
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition lg:hidden text-gray-600 dark:text-gray-300"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href;
            
            return (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
                } ${isCollapsed ? 'lg:justify-center' : ''}`}
                title={isCollapsed ? link.label : ''}
              >
                <Icon size={20} className={`${isActive ? 'text-white' : 'group-hover:text-purple-500'} flex-shrink-0`} />
                {!isCollapsed && (
                  <span className={`font-medium ${isActive ? 'text-white' : ''} truncate`}>
                    {link.label}
                  </span>
                )}
                {isActive && !isCollapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
                {isActive && isCollapsed && (
                  <span className="absolute right-0 w-1 h-6 bg-white rounded-l-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t border-gray-200 dark:border-gray-800 space-y-3 ${
          isCollapsed ? 'lg:flex lg:flex-col lg:items-center' : ''
        }`}>
          {/* Theme Toggle */}
          <div className={`flex items-center justify-between px-2 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 ${
            isCollapsed ? 'lg:justify-center' : ''
          }`}>
            {!isCollapsed && (
              <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
            )}
            <ThemeToggle />
          </div>
          
          {/* Profile Info */}
          {!isCollapsed && (
            <div className="px-2">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                © {new Date().getFullYear()} Usama Sultan
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Built with Next.js & Tailwind
              </p>
            </div>
          )}
          {isCollapsed && (
            <div className="text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                ©
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;