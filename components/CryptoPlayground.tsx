import React, { useState } from 'react';

const base64 = (text: string, encode: boolean = true): string => {
  try {
    // Handles UTF-8 characters correctly
    return encode ? btoa(unescape(encodeURIComponent(text))) : decodeURIComponent(escape(atob(text)));
  } catch (e) {
    return 'إدخال Base64 غير صالح.';
  }
};

const caesar = (text: string, shift: number, encode: boolean = true): string => {
    return text.replace(/[a-zA-Z]/g, (char) => {
        const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        const offset = char.charCodeAt(0) - base;
        // Ensure the modulo result is always positive for decryption
        const shifted = encode ? (offset + shift) % 26 : (offset - shift + 26) % 26;
        return String.fromCharCode(base + shifted);
    });
};

const vigenere = (text: string, key: string, encode: boolean = true): string => {
    if (!key) return text;
    let keyIndex = 0;
    const keyUpper = key.toUpperCase();
    return text.replace(/[a-zA-Z]/g, (char) => {
        const keyChar = keyUpper[keyIndex % keyUpper.length];
        const shift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);
        keyIndex++;
        const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        const offset = char.charCodeAt(0) - base;
        const shifted = encode ? (offset + shift) % 26 : (offset - shift + 26) % 26;
        return String.fromCharCode(base + shifted);
    });
};


const CryptoPlayground: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [algorithm, setAlgorithm] = useState('base64');
    const [key, setKey] = useState('3');
    const [copied, setCopied] = useState(false);

    const needsKey = algorithm === 'caesar' || algorithm === 'vigenere';
    
    const handleAction = (encrypt: boolean) => {
        let result = '';
        switch (algorithm) {
            case 'base64':
                result = base64(inputText, encrypt);
                break;
            case 'caesar':
                const shift = parseInt(key, 10);
                if (!isNaN(shift)) {
                    result = caesar(inputText, shift, encrypt);
                } else {
                    result = 'المفتاح يجب أن يكون رقمًا.';
                }
                break;
            case 'vigenere':
                 if (key.match(/^[a-zA-Z]+$/)) {
                    result = vigenere(inputText, key, encrypt);
                } else {
                    result = 'المفتاح يجب أن يحتوي على أحرف إنجليزية فقط.';
                }
                break;
        }
        setOutputText(result);
    };
    
    const handleClear = () => {
        setInputText('');
        setOutputText('');
    };

    const handleCopy = () => {
        if (!outputText) return;
        navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
    <div className="p-6 md:p-10 lg:p-12 h-full">
      <header className="mb-6 text-center animate-stagger-item">
        <h1 className="text-4xl font-bold text-[var(--color-text-heading)] mb-2">مختبر التشفير</h1>
        <p className="text-lg text-[var(--color-text-secondary)]">جرب خوارزميات التشفير المختلفة مباشرة في متصفحك.</p>
      </header>
      
      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-lg p-4 mb-6 flex flex-wrap items-center justify-center gap-4 animate-stagger-item" style={{ animationDelay: '100ms' }}>
          <div className="flex-grow min-w-[150px]">
            <label htmlFor="algo-select" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">الخوارزمية</label>
            <select
              id="algo-select"
              value={algorithm}
              onChange={e => {
                  setAlgorithm(e.target.value);
                  if (e.target.value === 'caesar') setKey('3');
                  if (e.target.value === 'vigenere') setKey('KEY');
              }}
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
            >
              <option value="base64">Base64</option>
              <option value="caesar">Caesar Cipher</option>
              <option value="vigenere">Vigenère Cipher</option>
            </select>
          </div>
          {needsKey && (
             <div className="flex-grow min-w-[150px]">
                 <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                     {algorithm === 'caesar' ? 'مقدار الإزاحة (رقم)' : 'الكلمة المفتاحية'}
                 </label>
                 <input
                     type={algorithm === 'caesar' ? 'number' : 'text'}
                     value={key}
                     onChange={e => setKey(e.target.value)}
                     className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
                 />
             </div>
          )}
           <button onClick={handleClear} className="h-10 px-4 bg-[var(--color-danger-subtle-bg)] text-[var(--color-danger-text)] rounded-md hover:opacity-80 transition self-end">
             مسح الكل
           </button>
        </div>

        {/* IO Areas */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 animate-stagger-item" style={{ animationDelay: '200ms' }}>
            {/* Input Area */}
            <div className="flex flex-col">
                 <label htmlFor="input-text" className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">النص الأصلي</label>
                 <textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="اكتب أو الصق النص هنا..."
                    className="w-full h-64 p-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition font-mono"
                 />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 my-4 md:my-0">
                <button onClick={() => handleAction(true)} className="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-bold rounded-lg hover:opacity-90 transition transform hover:scale-105 active:scale-95" aria-label="Encrypt">
                    <span>تشفير</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
                <button onClick={() => handleAction(false)} className="px-6 py-2 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] font-bold rounded-lg border border-[var(--color-border-primary)] hover:bg-[var(--color-border-primary)] transition transform hover:scale-105 active:scale-95" aria-label="Decrypt">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    <span>فك التشفير</span>
                </button>
            </div>


            {/* Output Area */}
             <div className="flex flex-col">
                 <label className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">النتيجة</label>
                 <div className="relative w-full h-64 p-4 bg-[var(--code-bg)] border border-[var(--color-border-primary)] rounded-lg font-mono overflow-auto">
                    <pre className="whitespace-pre-wrap break-words">{outputText || '...'}</pre>
                     <button
                        onClick={handleCopy}
                        className="absolute top-2 end-2 p-2 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-md text-xs opacity-70 hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] hover:bg-[var(--color-border-primary)]"
                        aria-label="Copy output"
                      >
                         {copied ? 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                         }
                      </button>
                 </div>
            </div>
        </div>
      </div>
    </div>
    );
}

export default CryptoPlayground;