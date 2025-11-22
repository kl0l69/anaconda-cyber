import React, { useState, useEffect } from 'react';
import { Tool, Example } from '../types';
import CodeBlock from './CodeBlock';
import CryptoPlayground from './CryptoPlayground';

interface ToolDetailProps {
  tool: Tool;
  onBack: () => void;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold text-[var(--color-accent-hover)] mt-8 mb-4 border-b-2 border-[var(--color-accent)]/30 pb-2">{children}</h2>
);

const ExampleDisplay: React.FC<{ example: Example }> = ({ example }) => {
  const borderColor = example.is_offensive ? 'border-[var(--color-danger-border)]' : 'border-[var(--color-accent)]/30';
  const titleColor = example.is_offensive ? 'text-[var(--color-danger-text)]' : 'text-[var(--color-accent-hover)]';
  const titleLabel = example.is_offensive ? 'مثال هجومي' : 'مثال';

  return (
    <div className={`mb-6 p-4 rounded-lg bg-[var(--color-bg-secondary)]/70 border-s-4 ${borderColor} transition-shadow hover:shadow-lg hover:shadow-[var(--shadow-accent)]`}>
      <h3 className={`font-bold text-lg ${titleColor} flex items-center gap-2`}>
        {example.is_offensive && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
        <span>
          <span className="font-normal text-[var(--color-text-secondary)]">{titleLabel}:</span> {example.title}
        </span>
      </h3>
      <p className="text-[var(--color-text-secondary)] text-base my-2 leading-relaxed">{example.description}</p>
      <CodeBlock command={example.command} />
    </div>
  );
};


const ToolDetail: React.FC<ToolDetailProps> = ({ tool, onBack }) => {
  const [allCopied, setAllCopied] = useState(false);
  const [notes, setNotes] = useState('');

  const safeExamples = tool.examples.filter(ex => !ex.is_offensive);
  const offensiveExamples = tool.examples.filter(ex => ex.is_offensive);
  
  useEffect(() => {
    if (tool) {
      try {
        const savedNotes = localStorage.getItem(`notes_${tool.id}`);
        if (savedNotes) {
          setNotes(savedNotes);
        } else {
          setNotes('');
        }
      } catch (error) {
        console.error("Failed to read from localStorage", error);
        setNotes('');
      }
    }
  }, [tool]);

  const handleSaveNotes = () => {
    try {
      localStorage.setItem(`notes_${tool.id}`, notes);
      // You could add a saved confirmation message here
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  };
  
  const handleCopyAllOffensive = () => {
    if (offensiveExamples.length === 0) return;
    const allCommands = offensiveExamples.map(ex => ex.command).join('\n');
    navigator.clipboard.writeText(allCommands);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  if (tool.id === 'crypto-playground') {
      return <CryptoPlayground />;
  }

  return (
    <div className="p-6 md:p-10 lg:p-12 overflow-y-auto h-full">
       <button
            onClick={onBack}
            className="group flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 mb-6 font-medium hover:bg-[var(--color-accent-subtle-bg)] rounded-md px-3 py-1 w-fit"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span>العودة للخلف</span>
        </button>
      <header className="mb-6 animate-stagger-item">
        <h1 className="text-5xl font-bold text-[var(--color-text-heading)] mb-2">{tool.name}</h1>
        <p className="text-lg text-[var(--color-text-secondary)]">{tool.definition}</p>
      </header>
      
      <div className="animate-stagger-item" style={{ animationDelay: '100ms' }}>
        <SectionTitle>الوظيفة</SectionTitle>
        <p className="text-[var(--color-text-primary)] leading-relaxed text-base">{tool.function}</p>
      </div>
      
      <div className="animate-stagger-item" style={{ animationDelay: '150ms' }}>
        <SectionTitle>المتطلبات</SectionTitle>
        <ul className="list-none text-[var(--color-text-primary)] space-y-2">
          {tool.requirements.map((req, index) => (
            <li key={index} className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-accent)] ms-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {tool.installation && tool.installation !== "غير قابل للتطبيق" && (
        <div className="animate-stagger-item" style={{ animationDelay: '200ms' }}>
          <SectionTitle>التثبيت</SectionTitle>
          <CodeBlock command={tool.installation} />
        </div>
      )}
      
      {tool.run_command && tool.run_command !== "غير قابل للتطبيق" && (
        <div className="animate-stagger-item" style={{ animationDelay: '250ms' }}>
          <SectionTitle>التشغيل الأساسي</SectionTitle>
          <CodeBlock command={tool.run_command} />
        </div>
      )}

      {tool.mitre_attack_mappings && tool.mitre_attack_mappings.length > 0 && (
          <div className="animate-stagger-item" style={{ animationDelay: '300ms' }}>
            <SectionTitle>MITRE ATT&CK® Mappings</SectionTitle>
            <div className="flex flex-wrap gap-3">
              {tool.mitre_attack_mappings.map(id => (
                <a 
                  key={id}
                  href={`https://attack.mitre.org/techniques/${id.replace('.', '/')}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[var(--color-accent-subtle-bg)] text-[var(--color-accent)] text-sm font-mono py-1.5 px-3 rounded-full hover:bg-[var(--color-accent-subtle-hover-bg)] transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-[var(--color-accent)]/20"
                >
                  <span>{id}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
      )}
      
      {safeExamples.length > 0 && (
          <div className="animate-stagger-item" style={{ animationDelay: '350ms' }}>
            <SectionTitle>أمثلة على الاستخدام</SectionTitle>
            {safeExamples.map((example, index) => (
                <ExampleDisplay key={index} example={example} />
            ))}
          </div>
      )}

      {offensiveExamples.length > 0 && (
        <div className="animate-stagger-item" style={{ animationDelay: '400ms' }}>
          <SectionTitle>أوامر هجومية (Offensive Commands)</SectionTitle>
           <div className="flex justify-end mb-4 -mt-12">
              <button
                  onClick={handleCopyAllOffensive}
                  className="flex items-center gap-2 py-2 px-4 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-primary)] rounded-md text-sm font-medium hover:bg-[var(--color-border-primary)] hover:text-[var(--color-text-primary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  aria-label="نسخ كل الأوامر الهجومية"
              >
                  {allCopied ? (
                      <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--green-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>تم النسخ!</span>
                      </>
                  ) : (
                      <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>نسخ كل الأوامر</span>
                      </>
                  )}
              </button>
          </div>
          <div className="bg-[var(--color-danger-subtle-bg)] border border-[var(--color-danger-border)] text-[var(--color-danger-text)] p-4 rounded-lg mb-6 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ms-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-bold">⚠️ تحذير: استخدام بمسؤولية</p>
              <p className="text-sm mt-1">الأوامر التالية مخصصة للأغراض التعليمية وفي بيئات اختبار مرخصة فقط. قد يكون استخدامها على أنظمة لا تملك الصلاحية للوصول إليها غير قانوني ويعرضك للمساءلة.</p>
            </div>
          </div>
          {offensiveExamples.map((example, index) => (
            <ExampleDisplay key={index} example={example} />
          ))}
        </div>
      )}

      {tool.post_exploitation_guidance && tool.post_exploitation_guidance.length > 0 && (
        <div className="animate-stagger-item" style={{ animationDelay: '450ms' }}>
            <SectionTitle>التعامل بعد الاختراق (Post-Exploitation)</SectionTitle>
            <div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg border border-[var(--color-border-primary)]">
                <ul className="space-y-3">
                    {tool.post_exploitation_guidance.map((tip, index) => (
                        <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-green-accent)] ms-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-[var(--color-text-primary)] leading-relaxed">{tip}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      )}

      <div className="animate-stagger-item" style={{ animationDelay: '500ms' }}>
        <SectionTitle>ملاحظاتي</SectionTitle>
        <div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg border border-[var(--color-border-primary)]">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="اكتب ملاحظاتك الشخصية، أوامر مخصصة، أو أي شيء آخر هنا..."
            className="w-full h-40 p-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition font-mono text-sm"
          />
          <div className="text-start mt-3">
            <button
              onClick={handleSaveNotes}
              className="px-5 py-2 bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-bold rounded-md hover:opacity-90 transition-transform hover:scale-105"
            >
              حفظ الملاحظات
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ToolDetail;