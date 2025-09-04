"use client";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar({
  skills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Tailwind CSS", level: 95 }
  ],
  currentActivities = [
    { title: "Reading", description: "Design Systems", icon: "📚" },
    { title: "Learning", description: "New Technology", icon: "🧠" },
    { title: "Building", description: "New Project", icon: "🛠️" }
  ],
  colorThemes = [
    { name: "Teal", primary: "#0f9a7a", secondary: "#1fe1c3" },
    { name: "Purple", primary: "#7c3aed", secondary: "#a78bfa" },
    { name: "Blue", primary: "#2563eb", secondary: "#60a5fa" },
    { name: "Rose", primary: "#e11d48", secondary: "#fb7185" }
  ]
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sidebarRef = useRef(null);
  const { theme, toggleTheme, primaryColor, changeColors } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sidebarRef.current) observer.observe(sidebarRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="space-y-4" aria-label="Sidebar with skills and theme customization">
      {/* Skills */}
      <div
        ref={sidebarRef}
        className={`w-full bg-[var(--card-bg)] rounded-2xl shadow-md p-5 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h4 className="font-semibold text-sm mb-3 text-[var(--text-primary)]">Technical Skills</h4>
        <div className="space-y-3">
          {skills.map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[var(--text-primary)]">{skill.name}</span>
                <span className="text-[var(--text-secondary)]">{skill.level}%</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--card-border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--primary-color)] rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                  aria-label={`${skill.name} skill level: ${skill.level}%`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Activities */}
      <div
        className={`w-full bg-[var(--primary-color)] bg-opacity-90 text-white rounded-2xl shadow-lg p-5 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h4 className="font-semibold text-sm mb-3">Currently</h4>
        <div className="space-y-3">
          {currentActivities.map((activity, i) => (
            <div key={i} className="flex items-start">
              <span className="text-lg mr-3" aria-hidden="true">{activity.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.title}</p>
                <p className="text-xs opacity-90 truncate">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Customization */}
      <div
        className={`w-full bg-[var(--card-bg)] rounded-2xl shadow-md p-5 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h4 className="font-semibold text-sm mb-3 text-[var(--text-primary)]">Customize Theme</h4>

        {/* Dark mode toggle */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-[var(--text-secondary)]">Dark Mode</span>
          <button
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${theme === 'dark' ? 'bg-[var(--primary-color)]' : 'bg-gray-300'}`}
            aria-pressed={theme === 'dark'}
            aria-label="Toggle dark mode"
          >
            <span
              className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Color themes */}
        <p className="text-xs text-[var(--text-secondary)] mb-2">Color Theme</p>
        <div className="flex flex-wrap gap-2">
          {colorThemes.map((color, i) => (
            <button
              key={i}
              onClick={() => changeColors(color.primary, color.secondary)}
              className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
                primaryColor === color.primary ? 'ring-2 ring-offset-2 ring-[var(--text-primary)]' : ''
              }`}
              style={{ background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})` }}
              aria-label={`Set color theme to ${color.name}`}
              title={color.name}
            ></button>
          ))}
        </div>
      </div>
    </aside>
  );
}
