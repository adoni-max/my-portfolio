"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection({
  fullName = "Your Name",
  title = "Frontend Developer & Designer",
  stats = [
    { label: "Projects", value: "12" },
    { label: "Location", value: "Your City" },
    { label: "Rate", value: "Contact Me" }
  ],
  socialLinks = [
    { name: "LinkedIn", icon: "LI", url: "#", ariaLabel: "LinkedIn Profile" },
    { name: "GitHub", icon: "GH", url: "#", ariaLabel: "GitHub Profile" },
    { name: "Twitter", icon: "TW", url: "#", ariaLabel: "Twitter Profile" }
  ],
  cvPath = "/resume.pdf" // now actually used
}) {
  const [typedName, setTypedName] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const mountedRef = useRef(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    mountedRef.current = true;
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
    const randomDelay = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

    async function typeName() {
      let local = "";
      for (let i = 0; i < fullName.length; i++) {
        if (!mountedRef.current) return;
        local += fullName[i];
        setTypedName(local);
        await sleep(randomDelay(45, 95));
      }
      setIsTyping(false);
    }

    typeName();
    return () => { mountedRef.current = false; };
  }, [fullName]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleDownloadCV = () => {
    // If a CV path exists in public/ or remote, trigger download/open
    if (cvPath) {
      const a = document.createElement("a");
      a.href = cvPath;
      // default filename from path
      a.download = cvPath.split("/").pop() || `${fullName.replace(/\s+/g, "_")}_CV.pdf`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 150);
      return;
    }
    // fallback (shouldn't be needed if cvPath exists)
    const blob = new Blob([`${fullName}\n${title}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a2 = document.createElement("a");
    a2.href = url;
    a2.download = `${fullName.replace(/\s+/g, "_")}_CV.txt`;
    document.body.appendChild(a2);
    a2.click();
    setTimeout(() => {
      document.body.removeChild(a2);
      URL.revokeObjectURL(url);
    }, 150);
  };

  return (
    <section
      id="Home"
      ref={sectionRef}
      className={`w-full bg-[var(--card-bg)] rounded-3xl shadow-2xl p-6 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
        <div className="flex-shrink-0 flex justify-center lg:justify-start mb-6 lg:mb-0">
          <div className="relative w-32 h-32 lg:w-36 lg:h-36 rounded-full ring-4 ring-[var(--primary-color)] ring-opacity-30 overflow-hidden shadow-lg animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] opacity-20" />
            <Image
              src="/image.svg"
              alt={`Profile photo of ${fullName}`}
              width={144}
              height={144}
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-1 md:text-left text-center lg:text-left">
          <h2 id="hero-heading" className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold mb-1 inline-flex items-center text-[var(--text-primary)]">
            <span className="animated-gradient">{typedName}</span>
            <span className={`ml-2 h-6 border-r-2 border-[var(--text-primary)] ${isTyping ? "animate-caret" : "hidden"}`} aria-hidden="true" />
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] mb-3">{title}</p>

          <div className="flex justify-center lg:justify-start gap-3 mb-4">
            {socialLinks.map((social, i) => (
              <a key={i} href={social.url} className="w-9 h-9 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-xs text-[var(--text-secondary)] hover:scale-110 hover:bg-[var(--primary-color)] hover:text-white hover:border-transparent transition-all duration-300" aria-label={social.ariaLabel} rel="noopener noreferrer">
                {social.icon}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm mb-4">
            {stats.map((stat, i) => (
              <div key={i} className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--primary-color)] transition-colors duration-300">
                <p className="font-medium text-[var(--text-primary)]">{stat.label}</p>
                <p className="text-xs text-[var(--text-secondary)]">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-4 justify-center lg:justify-start">
            <a href="#Contact" className="px-5 py-2 bg-[var(--primary-color)] text-white rounded-full text-sm shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300">Hire me</a>
            <button onClick={handleDownloadCV} className="px-5 py-2 border border-[var(--card-border)] rounded-full text-sm hover:bg-[var(--primary-color)] hover:text-white hover:border-transparent transition-all duration-300 flex items-center gap-2" aria-label="Download CV">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
