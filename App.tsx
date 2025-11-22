import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

export type Theme = 'theme-dark' | 'theme-light' | 'theme-cyberpunk' | 'theme-dracula' | 'theme-solarized-light';

const App: React.FC = () => {
  const [selectedToolName, setSelectedToolName] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>('theme-dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('anaconda-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const themes: Theme[] = ['theme-dark', 'theme-light', 'theme-cyberpunk', 'theme-dracula', 'theme-solarized-light'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem('anaconda-theme', nextTheme);
  };

  const handleSelectTool = (name: string) => {
    if (name === selectedToolName) return;

    setSelectedToolName(name);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedToolName(null); // Deselect tool when filtering by category
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
    setSelectedToolName(null);
  };

  const handleClearToolSelection = () => {
    setSelectedToolName(null);
  };
  
  return (
    <div className={`flex h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] ${theme}`}>
      {/* Mobile Sidebar Toggle */}
      <button 
        className="md:hidden fixed top-4 end-4 z-30 p-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-md transition-transform hover:scale-110 active:scale-95"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-text-heading)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
         <MainContent 
            toolName={selectedToolName}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            onSelectTool={handleSelectTool}
            onClearCategory={handleClearCategory}
            onClearToolSelection={handleClearToolSelection}
          />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen">
          <Sidebar 
            selectedToolName={selectedToolName} 
            onSelectTool={handleSelectTool}
            selectedCategory={selectedCategory}
            onClearCategory={handleClearCategory}
            currentTheme={theme}
            onToggleTheme={toggleTheme}
          />
      </div>

      {/* Mobile Sidebar (Overlay) */}
      <div 
        className={`md:hidden fixed inset-0 z-20 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'opacity-60' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-[var(--color-bg-primary)] shadow-lg">
             <Sidebar 
                selectedToolName={selectedToolName} 
                onSelectTool={handleSelectTool}
                selectedCategory={selectedCategory}
                onClearCategory={handleClearCategory}
                currentTheme={theme}
                onToggleTheme={toggleTheme}
             />
          </div>
      </div>
    </div>
  );
};

export default App;