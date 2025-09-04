"use client";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ContactSection({
  contactEmail = "your.email@example.com",
  location = "Your City",
  userName = "Your Name",
  socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com/in/yourprofile", ariaLabel: "LinkedIn Profile" },
    { name: "GitHub", url: "https://github.com/yourusername", ariaLabel: "GitHub Profile" },
    { name: "Twitter", url: "https://twitter.com/yourusername", ariaLabel: "Twitter Profile" }
  ],
  formspreeId = "yourFormspreeId"
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const contactRef = useRef(null);
  const { theme } = useTheme(); // keep or remove if unused

  // Intersection observer (snapshot ref + proper disconnect)
  useEffect(() => {
    const node = contactRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Please enter a valid email";
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(false);

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(formData.subject || "Inquiry");
    const body = encodeURIComponent(`Hello, my name is ${formData.name || "[Your Name]"}.\n\n${formData.message || "[Your message]"}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="Contact"
      ref={contactRef}
      tabIndex={-1} /* allows focus when navigating to #Contact */
      aria-labelledby="contact-heading"
      className={`min-h-[60vh] z-10 flex items-center py-12 px-4 md:px-6 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 id="contact-heading" className="text-2xl md:text-3xl font-bold text-center mb-8 text-[var(--text-primary)]">
          Let&apos;s Work <span className="text-[var(--primary-color)]">Together</span>
        </h2>

        <div className="bg-[var(--card-bg)] rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* form column */}
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">Get in touch</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Got a project, a job offer, or want to say hi? Drop a message and I&apos;ll get back within 48 hours.
            </p>

            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md border border-green-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-xs text-[var(--text-secondary)] mb-1 block">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border ${formErrors.name ? "border-red-300" : "border-[var(--card-border)]"} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--card-bg)] text-[var(--text-primary)]`}
                    placeholder="Your name"
                    aria-required="true"
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                  />
                  {formErrors.name && <p id="name-error" className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="text-xs text-[var(--text-secondary)] mb-1 block">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${formErrors.email ? "border-red-300" : "border-[var(--card-border)]"} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--card-bg)] text-[var(--text-primary)]`}
                    placeholder="you@example.com"
                    aria-required="true"
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                  />
                  {formErrors.email && <p id="email-error" className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="text-xs text-[var(--text-secondary)] mb-1 block">Subject (Optional)</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-[var(--card-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--card-bg)] text-[var(--text-primary)]"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-xs text-[var(--text-secondary)] mb-1 block">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full border ${formErrors.message ? "border-red-300" : "border-[var(--card-border)]"} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--card-bg)] text-[var(--text-primary)]`}
                  placeholder="Tell me about your project..."
                  aria-required="true"
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? "message-error" : undefined}
                />
                {formErrors.message && <p id="message-error" className="text-xs text-red-500 mt-1">{formErrors.message}</p>}
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-sm text-white bg-[var(--primary-color)] hover:bg-opacity-90 hover:scale-105 transition-all flex items-center disabled:opacity-60"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleEmailClick}
                  className="px-4 py-2 rounded-full text-sm border border-[var(--card-border)] hover:bg-[var(--card-bg)] hover:border-[var(--primary-color)] transition-colors text-[var(--text-primary)]"
                >
                  Open Email
                </button>
              </div>
            </form>
          </div>

          {/* contact details column */}
          <div className="p-6 md:p-8 bg-[var(--primary-color)] bg-opacity-5 flex flex-col justify-center gap-4">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">Contact details</h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[var(--primary-color)]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Email</p>
                  <a href={`mailto:${contactEmail}`} className="text-sm text-[var(--primary-color)] hover:underline">{contactEmail}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[var(--primary-color)]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Location</p>
                  <p className="text-sm text-[var(--text-secondary)]">{location}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm text-[var(--text-secondary)] mb-3">Or reach out on:</p>
              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    className="px-3 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] shadow-sm text-xs hover:bg-[var(--primary-color)] hover:text-white hover:border-transparent transition-colors"
                    href={link.url}
                    aria-label={link.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-[var(--text-secondary)]">Prefer resume?</p>
              <a
                href="/resume.pdf"
                className="inline-block mt-2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-full text-sm shadow-sm hover:bg-opacity-90 transition-colors"
                download
              >
                Download CV
              </a>
            </div>

            <p className="mt-4 text-xs text-[var(--text-secondary)]">I usually reply within 48 hours.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[var(--text-secondary)]">
            &copy; {new Date().getFullYear()} {userName}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
