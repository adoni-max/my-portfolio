"use client";
import { useRef, useEffect, useState } from "react";
// removed: import { useTheme } from "../context/ThemeContext";

export default function AboutSection({
  content = "Clean, modern portfolio template built with Next.js & Tailwind CSS. Replace the content to personalize.",
  skills = ["HTML", "CSS", "Tailwind", "JavaScript", "React", "Next.js", "Node.js", "Git"],
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSkills, setVisibleSkills] = useState([]);
  const aboutRef = useRef(null);

  useEffect(() => {
    const node = aboutRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);

          const timers = [];
          // reveal skills with stagger
          skills.forEach((_, index) => {
            const t = setTimeout(() => {
              setVisibleSkills((prev) => [...prev, index]);
            }, index * 100 + 500);
            timers.push(t);
          });

          observer.unobserve(node);

          // clear timers if unmount before finish
          return () => timers.forEach(clearTimeout);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [skills]); // include skills so linter's happy

  const isSkillVisible = (index) => visibleSkills.includes(index);

  return (
    <section
      id="About"
      ref={aboutRef}
      className={`w-full bg-[var(--card-bg)] rounded-3xl shadow-lg p-6 mt-8 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      aria-labelledby="about-heading"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 id="about-heading" className="text-xl font-semibold mb-4 text-[var(--text-primary)]">About Me</h2>
          <div className="prose prose-sm text-[var(--text-secondary)]">
            <p className="mb-4">{content}</p>
            <p>
              I specialize in creating responsive, user-friendly interfaces that deliver exceptional user experiences.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3 text-[var(--text-primary)]">Experience</h3>
            <div className="space-y-4">
              <div className="relative pl-6 border-l border-[var(--primary-color)]">
                <div className="absolute -left-[5px] top-1 w-[10px] h-[10px] rounded-full bg-[var(--primary-color)]"></div>
                <h4 className="text-sm font-medium text-[var(--text-primary)]">UI Engineer @ Acme</h4>
                <p className="text-xs text-[var(--text-secondary)]">2023 - Present</p>
                <p className="text-xs mt-1 text-[var(--text-secondary)]">
                  Leading frontend development for web applications with React and Next.js
                </p>
              </div>

              <div className="relative pl-6 border-l border-[var(--primary-color)]">
                <div className="absolute -left-[5px] top-1 w-[10px] h-[10px] rounded-full bg-[var(--primary-color)]"></div>
                <h4 className="text-sm font-medium text-[var(--text-primary)]">Frontend @ Widgets</h4>
                <p className="text-xs text-[var(--text-secondary)]">2021 - 2023</p>
                <p className="text-xs mt-1 text-[var(--text-secondary)]">
                  Developed responsive interfaces and implemented design systems
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-[var(--text-primary)]">Skills & Technologies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {skills.map((skill, i) => (
              <div
                key={i}
                className={`flex flex-col items-center p-3 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--primary-color)] transition-all duration-500 ${
                  isSkillVisible(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] bg-opacity-10 flex items-center justify-center mb-2">
                  <span className="text-[var(--primary-color)] text-lg font-bold">{skill.charAt(0)}</span>
                </div>
                <span className="text-xs font-medium text-[var(--text-primary)]">{skill}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3 text-[var(--text-primary)]">Education</h3>
            <div className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h4 className="text-sm font-medium text-[var(--text-primary)]">Bachelor of Computer Science</h4>
              <p className="text-xs text-[var(--text-secondary)]">University of Technology</p>
              <p className="text-xs text-[var(--text-secondary)]">2017 - 2021</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
