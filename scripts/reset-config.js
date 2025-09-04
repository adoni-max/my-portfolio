const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../config/templateConfig.js');

// Default placeholder configuration
const defaultConfig = `export const templateConfig = {
  // User Information
  user: {
    name: "Your Name",
    title: "Frontend Developer & Designer",
    email: "your.email@example.com",
    location: "Your City",
    rate: "Contact Me",
    projects: "12"
  },
  
  // Social Media Links
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername"
  },
  
  // Formspree ID
  formspreeId: "yourFormspreeId",
  
  // Theme Configuration
  theme: {
    primary: "#3B82F6",
    secondary: "#1E293B",
    darkMode: true
  },
  
  // Sections Configuration
  sections: {
    showHero: true,
    showProjects: true,
    showAbout: true,
    showContact: true
  },
  
  // Performance Configuration
  performance: {
    animatedBackground: true,
    reducedMotion: false
  }
};`;

try {
  fs.writeFileSync(configPath, defaultConfig);
  console.log('✅ Configuration reset to placeholder values successfully!');
  console.log('Run "npm run setup" to configure with your personal information.');
} catch (error) {
  console.error('Error resetting configuration:', error);
}