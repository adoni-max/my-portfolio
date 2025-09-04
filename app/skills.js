"use client";
import { useRef, useEffect } from "react";

export default function Skills({ skills = ["HTML", "CSS", "Tailwind", "JavaScript"] }) {
  const skillsRef = useRef(null);

  useEffect(() => {
    const node = skillsRef.current; // snapshot the ref once

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillElements = entry.target.querySelectorAll(".skill-badge");
            skillElements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("show");
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return (
    <section ref={skillsRef} className="mt-6">
      <h4 className="text-lg font-semibold mb-3">Skills</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <div
            key={i}
            className="skill-badge flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-250 cursor-default text-xs opacity-0 translate-y-2"
            role="listitem"
          >
            <span
              className="w-2 h-2 bg-[#0f9a7a] rounded-full inline-block"
              aria-hidden="true"
            />
            <span>{skill}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .skill-badge {
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .skill-badge.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
