import React, { useState } from 'react';

interface CodeBlockProps {
  command: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[var(--code-bg)] rounded-lg my-2 relative group border border-[var(--color-border-primary)] shadow-md">
      <pre className="p-4 text-[var(--code-text)] text-base overflow-x-auto font-mono" dir="ltr">
        <code>{command}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="copy-button-pulse absolute top-2 start-2 p-2 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-md text-xs opacity-70 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] hover:bg-[var(--color-border-primary)]"
        aria-label="Copy command"
      >
        {copied ? 
        (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        )
        }
      </button>
    </div>
  );
};

export default CodeBlock;