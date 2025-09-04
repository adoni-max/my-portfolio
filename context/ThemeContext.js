"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#0f9a7a');
  const [secondaryColor, setSecondaryColor] = useState('#1fe1c3');
  
  // Initialize theme from localStorage if available
  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    
    // Check for saved color preferences
    const savedPrimary = localStorage.getItem('portfolio-primary-color');
    if (savedPrimary) setPrimaryColor(savedPrimary);
    
    const savedSecondary = localStorage.getItem('portfolio-secondary-color');
    if (savedSecondary) setSecondaryColor(savedSecondary);
  }, []);
  
  // Update CSS variables when theme or colors change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    // Set additional theme variables
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg-gradient-from', '#1a1a2e');
      document.documentElement.style.setProperty('--bg-gradient-to', '#16213e');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#b3b3b3');
      document.documentElement.style.setProperty('--card-bg', '#242424');
      document.documentElement.style.setProperty('--card-border', '#333333');
    } else {
      document.documentElement.style.setProperty('--bg-gradient-from', '#bfece0');
      document.documentElement.style.setProperty('--bg-gradient-to', '#d0f4ef');
      document.documentElement.style.setProperty('--text-primary', '#333333');
      document.documentElement.style.setProperty('--text-secondary', '#666666');
      document.documentElement.style.setProperty('--card-bg', '#ffffff');
      document.documentElement.style.setProperty('--card-border', '#e5e5e5');
    }
    
    // Save preferences
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-primary-color', primaryColor);
    localStorage.setItem('portfolio-secondary-color', secondaryColor);
  }, [theme, primaryColor, secondaryColor]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const changeColors = (primary, secondary) => {
    if (primary) setPrimaryColor(primary);
    if (secondary) setSecondaryColor(secondary);
  };
  
  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      primaryColor, 
      secondaryColor, 
      changeColors 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  // Provide a fallback context value if the context is not available
  if (!context) {
    return {
      theme: 'light',
      toggleTheme: () => {},
      primaryColor: '#0f9a7a',
      secondaryColor: '#1fe1c3',
      changeColors: () => {}
    };
  }
  
  return context;
}