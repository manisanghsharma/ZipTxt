import { useState, useEffect } from 'react';
import { Sun, Moon, Github } from 'lucide-react';
import Heading from './Heading';

// Apply theme from localStorage immediately before component renders
const getInitialTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    return true;
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    return false;
  }
};

const Layout = ({ children }) => {
  // Initialize state with the result of getInitialTheme
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());

  useEffect(() => {
    // This ensures the UI state matches the applied theme
    // It runs after the initial theme has already been applied
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' && !isDarkMode) {
      setIsDarkMode(true);
    } else if (storedTheme !== 'dark' && isDarkMode) {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-[var(--border-color)] py-4 w-full sticky top-0 bg-[var(--bg-primary)] z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <Heading />
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/manisanghsharma/ZipTxt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={22} />
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[var(--secondary-color)] text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors hover:shadow-md"
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex justify-center w-full py-10 px-6">
        <div className="w-full max-w-5xl">
          {children}
        </div>
      </main>
      
      <footer className="py-5 w-full bg-[var(--secondary-color)]">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-[var(--text-primary)] opacity-70">
          <p>ZipTxt &copy; {new Date().getFullYear()} - Share your text snippets quickly and easily</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 