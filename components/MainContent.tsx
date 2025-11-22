import React, { useState, useEffect } from 'react';
import { Tool, Category } from '../types';
import ToolDetail from './ToolDetail';
import { categoriesData } from '../data/tools';
import CryptoPlayground from './CryptoPlayground';

interface MainContentProps {
  toolName: string | null;
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string) => void;
  onSelectTool: (toolName: string) => void;
  onClearCategory: () => void;
  onClearToolSelection: () => void;
}

const getToolIcon = (icon?: Tool['icon']) => {
    const iconClass = "h-5 w-5 me-3 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors duration-200 flex-shrink-0";
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

const CategoryCard: React.FC<{ category: Category; onClick: () => void; className?: string; style?: React.CSSProperties }> = ({ category, onClick, className, style }) => (
    <button 
        onClick={onClick}
        className={`text-start bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-lg p-6 flex flex-col justify-between transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-2xl hover:shadow-[var(--shadow-accent)] hover:-translate-y-2 hover:scale-[1.03] w-full ${className || ''}`}
        style={style}
    >
        <div>
            <h3 className="text-xl font-bold text-[var(--color-text-heading)]">{category.name}</h3>
            <p className="text-[var(--color-text-secondary)] mt-2 text-sm leading-relaxed">{category.description}</p>
        </div>
        <div className="text-start mt-4">
            <span className="text-xs font-semibold bg-[var(--color-accent-subtle-bg)] text-[var(--color-accent)] py-1 px-3 rounded-full">
                {category.tools.length} أدوات
            </span>
        </div>
    </button>
);

const ToolCard: React.FC<{ tool: Tool; onClick: () => void; className?: string; style?: React.CSSProperties }> = ({ tool, onClick, className, style }) => (
    <button
        onClick={onClick}
        className={`group text-start bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-lg p-6 flex flex-col justify-between transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-2xl hover:shadow-[var(--shadow-accent)] hover:-translate-y-2 hover:scale-[1.03] w-full ${className || ''}`}
        style={style}
    >
        <div>
            <div className="flex items-center mb-2">
                {React.cloneElement(getToolIcon(tool.icon), { className: "h-6 w-6 ms-3 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors duration-200 flex-shrink-0" })}
                <h3 className="text-xl font-bold text-[var(--color-text-heading)] group-hover:text-[var(--color-accent)] transition-colors">{tool.name}</h3>
            </div>
            <p className="text-[var(--color-text-secondary)] mt-2 text-sm leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {tool.definition}
            </p>
        </div>
    </button>
);


const MainContent: React.FC<MainContentProps> = ({ toolName, selectedCategory, onSelectCategory, onSelectTool, onClearCategory, onClearToolSelection }) => {
  // State for what is currently displayed. This lags behind props to allow for exit animations.
  const [activeToolName, setActiveToolName] = useState(toolName);
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  
  // State to control the animation class.
  const [animationClass, setAnimationClass] = useState('animate-view-enter');

  // This effect manages the transition between views.
  useEffect(() => {
    const isChangingView = toolName !== activeToolName || selectedCategory !== activeCategory;

    if (isChangingView) {
      setAnimationClass('animate-view-exit'); // Start exit animation.

      const timer = setTimeout(() => {
        // After animation, update the content and start the enter animation.
        window.scrollTo(0, 0); // Scroll to top on view change
        setActiveToolName(toolName);
        setActiveCategory(selectedCategory);
        setAnimationClass('animate-view-enter');
      }, 300); // Must match exit animation duration in CSS.

      return () => clearTimeout(timer);
    }
  }, [toolName, selectedCategory, activeToolName, activeCategory]);

  const renderContent = () => {
    if (activeToolName) {
      const allTools = categoriesData.flatMap(category => category.tools);
      const foundTool = allTools.find(t => t.name === activeToolName);
      if (foundTool) {
        if (foundTool.id === 'crypto-playground') {
           return <CryptoPlayground />;
        }
        return <ToolDetail tool={foundTool} onBack={onClearToolSelection} />;
      }
    }

    if (activeCategory) {
        const category = categoriesData.find(c => c.name === activeCategory);
        if (!category) {
            onClearCategory();
            return null;
        }
        return (
             <div className="p-6 md:p-10 lg:p-12 h-full">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 md:mb-12">
                        <button
                            onClick={onClearCategory}
                            className="group flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 mb-4 font-medium hover:bg-[var(--color-accent-subtle-bg)] rounded-md px-3 py-1 w-fit"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            <span>العودة إلى كل الفئات</span>
                        </button>
                        <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-heading)]">{category.name}</h1>
                        {category.description && <p className="text-[var(--color-text-secondary)] mt-3 text-lg">{category.description}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.tools.map((tool, index) => (
                            <ToolCard
                                key={tool.id}
                                tool={tool}
                                onClick={() => onSelectTool(tool.name)}
                                className="animate-stagger-item"
                                style={{ animationDelay: `${index * 100}ms` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
      <div className="p-6 md:p-10 lg:p-12 h-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-heading)]">دليل أناكوندا للأمن السيبراني</h1>
            <p className="text-[var(--color-text-secondary)] mt-4 text-lg max-w-3xl mx-auto">
                مرجعك الشامل لأدوات الأمن السيبراني. انقر على فئة أدناه أو اختر أداة من القائمة الجانبية لبدء استكشاف شروحات مفصلة وأوامر تطبيقية.
            </p>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoriesData.map((category, index) => (
                    <CategoryCard 
                        key={category.name} 
                        category={category} 
                        onClick={() => onSelectCategory(category.name)}
                        className="animate-stagger-item"
                        style={{ animationDelay: `${index * 100}ms` }}
                    />
                ))}
            </div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto">
        <div className={animationClass}>
            {renderContent()}
        </div>
    </main>
  );
};

export default MainContent;