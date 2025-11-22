import React, { useState, useMemo, useEffect, useRef } from 'react';
import { categoriesData } from '../data/tools';
import { Tool, Category } from '../types';
import { Theme } from '../App';

interface SidebarProps {
  selectedToolName: string | null;
  onSelectTool: (name: string) => void;
  selectedCategory: string | null;
  onClearCategory: () => void;
  currentTheme: Theme;
  onToggleTheme: () => void;
}

const AnacondaLogo = () => {
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const offsetX = (x - centerX) / -5; 
    const offsetY = (y - centerY) / -5;

    setGlowPosition({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setGlowPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className="h-12 w-12 text-[var(--color-accent)] flex-shrink-0" 
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-110"
        style={{
          filter: `drop-shadow(${glowPosition.x}px ${glowPosition.y}px 6px var(--color-accent))`,
          transition: 'filter 0.2s ease-out, transform 0.3s ease-in-out'
        }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 15" 
        />
      </svg>
    </div>
  );
};


const getToolIcon = (icon?: Tool['icon']) => {
    const iconClass = "h-5 w-5 me-3 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-all duration-200 flex-shrink-0 group-hover:scale-110";
    const strokeWidth = 1.5;
    switch (icon) {
        case 'web': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 15" /></svg>;
        case 'network': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.65H7.923a3.375 3.375 0 0 0-3.285 2.65l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" /></svg>;
        case 'exploit': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
        case 'password': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
        case 'wifi': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" /></svg>;
        case 'ad': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
        case 'cloud': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-5.05-2.224 5.25 5.25 0 0 0-9.632-1.532 4.5 4.5 0 0 0-2.848 6.532Z" /></svg>;
        case 'evasion': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243-4.243-4.243" /></svg>;
        case 'social': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>;
        case 'forensics': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>;
        case 're': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-4.991-2.691v4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183" /></svg>;
        case 'android': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>;
        default: return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" /></svg>;
    }
}

const Sidebar: React.FC<SidebarProps> = ({ selectedToolName, onSelectTool, onClearCategory, currentTheme, onToggleTheme }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);
  
    const filteredCategories = useMemo(() => {
        if (!searchTerm) {
            return categoriesData;
        }
        const lowercasedFilter = searchTerm.toLowerCase().trim();
        if (!lowercasedFilter) return categoriesData;

        return categoriesData.map(category => ({
            ...category,
            tools: category.tools.filter(tool =>
                tool.name.toLowerCase().includes(lowercasedFilter) ||
                tool.definition.toLowerCase().includes(lowercasedFilter)
            )
        })).filter(category => category.tools.length > 0);
    }, [searchTerm]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const renderThemeIcon = () => {
        const iconClass = "h-6 w-6 transition-transform duration-300 group-hover:scale-110";
        switch (currentTheme) {
            case 'theme-dark': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
            case 'theme-light': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
            case 'theme-cyberpunk': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1.5a4.5 4.5 0 016-4.43V14.5a3 3 0 106 0v-1.07a4.5 4.5 0 016 4.43V21H15z" /></svg>;
            case 'theme-dracula': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" /></svg>;
            case 'theme-solarized-light': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
            default: return null;
        }
    };

    return (
        <aside className="h-full w-full bg-[var(--color-bg-secondary)] border-s border-[var(--color-border-primary)] flex flex-col">
            <header className="p-4 border-b border-[var(--color-border-primary)] flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2 cursor-pointer" onClick={onClearCategory}>
                    <AnacondaLogo />
                    <h1 className="text-xl font-bold text-[var(--color-text-heading)]">أناكوندا</h1>
                </div>
            </header>
            
            <div className="p-4 flex-shrink-0">
                <div className="relative">
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="ابحث عن أداة... (Ctrl+K)"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md py-2 ps-4 pe-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
                    />
                    <svg className="absolute end-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-text-secondary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-4">
                {filteredCategories.length > 0 ? (
                    <ul>
                        {filteredCategories.map(category => (
                            <li key={category.name} className="my-4">
                                <h2 className="text-[var(--color-accent)] font-semibold text-sm mb-2 px-2">{category.name}</h2>
                                <ul>
                                    {category.tools.map(tool => (
                                        <li key={tool.id}>
                                            <button
                                                onClick={() => onSelectTool(tool.name)}
                                                className={`w-full text-start flex items-center p-2 rounded-md transition-colors duration-200 group ${selectedToolName === tool.name ? 'bg-[var(--color-accent-subtle-bg)] text-[var(--color-accent-hover)]' : 'hover:bg-[var(--color-accent-subtle-hover-bg)] text-[var(--color-text-primary)] hover:text-[var(--color-text-heading)]'}`}
                                            >
                                                {getToolIcon(tool.icon)}
                                                <span className="truncate">{tool.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-10 px-4 text-[var(--color-text-secondary)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="mt-4 font-semibold text-[var(--color-text-primary)]">لا توجد نتائج</p>
                        <p className="mt-1 text-sm">لم يتم العثور على أداة تطابق بحثك. جرب مصطلحًا آخر.</p>
                    </div>
                )}
            </nav>
            
            <footer className="p-4 border-t border-[var(--color-border-primary)] flex-shrink-0">
                <button
                    onClick={onToggleTheme}
                    className="w-full flex items-center justify-center gap-2 p-2 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md hover:bg-[var(--color-border-primary)] transition-colors group"
                    aria-label="Toggle theme"
                >
                    {renderThemeIcon()}
                    <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] text-sm">تغيير السمة</span>
                </button>
                 <div className="mt-4 pt-4 border-t border-[var(--color-border-primary)] text-center text-xs text-[var(--color-text-secondary)]">
                    <p className="mb-2">حقوق المطور : a r s i n e k &lt;3</p>
                    <div className="flex justify-center items-center space-x-3 rtl:space-x-reverse">
                        <a href="tel:+201141345223" aria-label="Phone" className="hover:text-[var(--color-accent)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                        </a>
                        <a href="https://wa.me/201141345223" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-[var(--color-accent)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.976 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.975-8.976a8.92 8.92 0 0 0-2.625-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.44 0 0 1-1.141-3.971c0-4.102 3.337-7.44 7.44-7.44a7.424 7.424 0 0 1 5.262 2.183 7.42 7.42 0 0 1 2.183 5.263c0 4.102-3.337 7.44-7.44 7.44m4.39-5.312c-.244-.124-1.442-.712-1.666-.792-.224-.08-.387-.123-.549.124-.162.246-.629.791-.772.953-.143.162-.285.185-.53.061-.244-.124-1.034-.383-1.968-.967-.729-.53-1.217-1.183-1.359-1.385-.143-.202-.015-.311.11-.411.111-.09.244-.246.368-.37.124-.123.162-.204.246-.346.083-.143.042-.266-.02-.37-.063-.104-.55-.1.32-.752-.162-.161-.324-.152-.448-.152h-.447c-.162 0-.426.062-.649.308-.224.245-.863.84-.863 2.049 0 1.209.884 2.379 1.006 2.541.122.162 1.717 2.626 4.159 3.692.589.261 1.053.415 1.414.528.596.184 1.139.159 1.575.096.48-.07 1.442-.589 1.644-1.157.202-.568.202-1.057.143-1.157-.061-.104-.224-.162-.468-.286" clipRule="evenodd" /></svg>
                        </a>
                        <a href="mailto:ayrn194@gmail.com" aria-label="Email" className="hover:text-[var(--color-accent)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                        </a>
                        <a href="https://github.com/kl0l69" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[var(--color-accent)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                        </a>
                        <a href="https://facebook.com/nq703" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[var(--color-accent)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" /></svg>
                        </a>
                        <a href="https://instagram.com/kl0l69" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[var(--color-accent)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.013 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06s-3.056-.013-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.013-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 3.678c.637-.248 1.363-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" /></svg>
                        </a>
                        <a href="https://t.me/nq703" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:text-[var(--color-accent)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.61c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.208.921-.46l2.227-2.15 4.585 3.397c.849.498 1.452.228 1.663-.78l3.27-15.53c.244-1.065-.46-1.559-1.268-1.202z" /></svg>
                        </a>
                    </div>
                </div>
            </footer>
        </aside>
    );
};

export default Sidebar;