"use client";
import { useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Sidebar from "../components/Sidebar";
import AnimatedBackground from "../components/AnimatedBackground";
import DemoMode from "../components/DemoMode";
import { ThemeProvider } from "../context/ThemeContext";
import { templateConfig } from "../config/Templateconfig";
export default function HomeClient() {
  // Setup smooth scroll and reveal on scroll
  useEffect(() => {
    // Smooth scroll for anchor links
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));
    
    function handleClick(e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      
      // Skip if href is missing or just "#"
      if (!href || href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }
      
      // Get the target element by ID
      const targetId = href.substring(1);
      if (!targetId) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }
      
      const target = document.getElementById(targetId);
      if (target) {
        // Calculate offset position accounting for fixed header
        const headerHeight = 60; // Approximate header height
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    }
    
    // Only add event listeners to valid links
    const validLinks = links.filter(link => {
      const href = link.getAttribute("href");
      return href && (href === "#" || href.startsWith("#"));
    });
    
    validLinks.forEach((link) => link.addEventListener("click", handleClick));
    
    // Cleanup
    return () => {
      validLinks.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, []);
  
  return (
    <ThemeProvider>
      <DemoMode>
        <div className="min-h-screen font-sans relative">
          {/* Animated Background - conditionally rendered based on config */}
          {templateConfig.performance.animatedBackground && (
            <AnimatedBackground />
          )}
          
          <Header />
          
          {/* Add spacer div to account for fixed header */}
          <div className="h-16"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Main content */}
              <main className="lg:col-span-9 flex flex-col space-y-12 z-10">
                {templateConfig.sections.showHero && (
                  <HeroSection 
                    fullName={templateConfig.user.name}
                    title={templateConfig.user.title}
                    stats={[
                      { label: "Projects", value: templateConfig.user.projects },
                      { label: "Location", value: templateConfig.user.location },
                      { label: "Rate", value: templateConfig.user.rate }
                    ]}
                    socialLinks={[
                      { name: "LinkedIn", icon: "LI", url: templateConfig.social.linkedin, ariaLabel: "LinkedIn Profile" },
                      { name: "GitHub", icon: "GH", url: templateConfig.social.github, ariaLabel: "GitHub Profile" },
                      { name: "Twitter", icon: "TW", url: templateConfig.social.twitter, ariaLabel: "Twitter Profile" }
                    ]}
                  />
                )}
                
                {templateConfig.sections.showProjects && (
                  <ProjectsSection />
                )}
                
                {templateConfig.sections.showAbout && (
                  <AboutSection />
                )}
              </main>
              
              {/* Sidebar */}
              <aside className="lg:col-span-3 flex flex-col gap-6 z-10">
                <Sidebar />
              </aside>
            </div>
          </div>
          
          {templateConfig.sections.showContact && (
            <ContactSection 
              contactEmail={templateConfig.user.email}
              location={templateConfig.user.location}
              userName={templateConfig.user.name}
              formspreeId={templateConfig.formspreeId}
              socialLinks={[
                { name: "LinkedIn", url: templateConfig.social.linkedin, ariaLabel: "LinkedIn Profile" },
                { name: "GitHub", url: templateConfig.social.github, ariaLabel: "GitHub Profile" },
                { name: "Twitter", url: templateConfig.social.twitter, ariaLabel: "Twitter Profile" }
              ]}
            />
          )}
          
          {/* Global styles */}
          <style jsx global>{`
            html {
              scroll-behavior: smooth;
            }
            
            /* Add scroll margin to all sections to account for fixed header */
            section[id] {
              scroll-margin-top: 4rem;
            }
            
            /* Custom Scrollbar Styles */
            ::-webkit-scrollbar {
              width: 8px;
            }
            
            ::-webkit-scrollbar-track {
              background: transparent;
            }
            
            ::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.2);
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.3);
            }
            
            /* Dark mode scrollbar adjustments */
            html.dark ::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.3);
            }
            
            html.dark ::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 0, 0, 0.5);
            }
            
            /* Hide scrollbar for specific elements if needed */
            .hide-scrollbar {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
            
            .hide-scrollbar::-webkit-scrollbar {
              display: none;  /* Chrome, Safari and Opera */
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
            .animate-float { animation: float 3s ease-in-out infinite; }
            
            @keyframes caret {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
            .animate-caret { animation: caret 1s steps(1) infinite; }
            
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animated-gradient {
              background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--primary-color));
              background-size: 200% 200%;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: gradientShift 3s ease infinite;
            }
            
            .reveal {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .reveal.active {
              opacity: 1;
              transform: translateY(0);
            }
            
            /* Accessibility focus styles */
            :focus-visible {
              outline: 2px solid var(--primary-color);
              outline-offset: 2px;
            }
            
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
              * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
              }
            }
          `}</style>
        </div>
      </DemoMode>
    </ThemeProvider>
  );
}