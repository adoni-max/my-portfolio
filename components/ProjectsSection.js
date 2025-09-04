"use client";
import { useRef, useEffect, useState } from "react";
// removed unused: import { useTheme } from "../context/ThemeContext";

export default function ProjectsSection({
  projects = [
    { title: "Project A", description: "A responsive web app built with React & Tailwind", tags: ["React", "Tailwind"], url: "#" },
    { title: "Project B", description: "E-commerce platform with payment integration", tags: ["Next.js", "Stripe"], url: "#" },
    { title: "Project C", description: "Mobile-first dashboard with data visualization", tags: ["Vue", "D3.js"], url: "#" }
  ]
}) {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const projectsRef = useRef(null);

  useEffect(() => {
    const node = projectsRef.current;
    if (!node) return;

    let timers = [];
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          projects.forEach((_, index) => {
            const t = setTimeout(() => {
              setVisibleProjects((prev) => {
                // avoid duplicates
                if (prev.includes(index)) return prev;
                return [...prev, index];
              });
            }, index * 150);
            timers.push(t);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [projects]); // include projects so lint is happy and logic consistent

  const isProjectVisible = (index) => visibleProjects.includes(index);

  return (
    <section id="Projects" ref={projectsRef} className="w-full bg-[var(--card-bg)] rounded-3xl shadow-lg p-6 mt-8" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="text-xl font-semibold mb-6 text-[var(--text-primary)]">Featured Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <a
            key={i}
            href={project.url}
            className={`group relative overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] transition-all duration-500 hover:shadow-lg ${isProjectVisible(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: `${i * 80}ms` }}
            aria-label={`View project: ${project.title}`}
          >
            {/* gradient placeholder using theme vars */}
            <div className="h-40 w-full rounded-t-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))" }}>
              <div className="text-center p-4">
                <span className="text-white font-semibold text-lg">{project.title}</span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--primary-color)] transition-colors">{project.title}</h3>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">{project.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[var(--primary-color)] bg-opacity-10 text-[var(--primary-color)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 bg-[var(--primary-color)] bg-opacity-0 flex items-center justify-center opacity-0 group-hover:bg-opacity-80 group-hover:opacity-100 transition-all duration-300">
              <span className="text-white font-medium px-4 py-2 rounded-full border border-white">View Project</span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a href="#" className="inline-flex items-center px-5 py-2 rounded-full border border-[var(--card-border)] text-sm text-[var(--text-primary)] hover:bg-[var(--primary-color)] hover:text-white hover:border-transparent transition-colors">View All Projects</a>
      </div>
    </section>
  );
}
