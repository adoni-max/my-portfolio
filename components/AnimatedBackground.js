
"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create particles
    function initParticles() {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 20), 50); // Responsive particle count
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
        // Set color based on theme
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        ctx.fillStyle = `${primaryColor}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });
      
      // Draw connections between particles
      drawConnections();
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw connections for particles within a certain distance
          const maxDistance = canvas.width * 0.1;
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Set line color and opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
            ctx.strokeStyle = `${primaryColor}${Math.floor(opacity * 40).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-initialize when theme changes
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-[var(--bg-gradient-from)] to-[var(--bg-gradient-to)]"
      aria-hidden="true"
    />
  );
}
