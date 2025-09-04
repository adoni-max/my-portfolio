const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const configPath = path.join(__dirname, '../config/templateConfig.js');

console.log('\n🚀 Simple Portfolio Setup\n');

rl.question('What is your name? ', (name) => {
  rl.question('What is your title? ', (title) => {
    rl.question('What is your email? ', (email) => {
      rl.question('Where are you located? ', (location) => {
        rl.question('What is your rate? (e.g., $50/hr or Contact Me) ', (rate) => {
          rl.question('How many projects have you completed? ', (projects) => {
            rl.question('What is your LinkedIn profile URL? ', (linkedin) => {
              rl.question('What is your GitHub profile URL? ', (github) => {
                rl.question('What is your Twitter profile URL? ', (twitter) => {
                  rl.question('What is your Formspree ID? ', (formspreeId) => {
                    
                    // Update the config file
                    const configContent = `export const templateConfig = {
  // User Information
  user: {
    name: "${name}",
    title: "${title}",
    email: "${email}",
    location: "${location}",
    rate: "${rate}",
    projects: "${projects}"
  },
  
  // Social Media Links
  social: {
    linkedin: "${linkedin}",
    github: "${github}",
    twitter: "${twitter}"
  },
  
  // Formspree ID
  formspreeId: "${formspreeId}",
  
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

                    fs.writeFileSync(configPath, configContent);
                    
                    console.log('\n✅ Configuration updated successfully!');
                    console.log('\nNext steps:');
                    console.log('1. Add your CV to the public directory as resume.pdf');
                    console.log('2. Add your profile image to the public directory as placeholder-avatar.jpg');
                    console.log('3. Run npm run dev to start the development server');
                    
                    rl.close();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});