import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import { Copy, Check } from 'lucide-react';

export interface CodePreviewProps {
  code: string;
  language?: string;
}

export const CodePreview: React.FC<CodePreviewProps> = ({ code, language = 'tsx' }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-white/5 bg-[#080808] text-sm group">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-2 bg-[#141414] hover:bg-[#1A1A1A] border border-white/10 rounded-md text-[#A8A9AD] hover:text-white transition-all duration-200 cursor-pointer z-10"
      >
        {copied ? (
          <span className="flex items-center gap-1.5 text-xs text-[#F0B90B] font-bold">
            <Check className="w-3.5 h-3.5" />
            Copied!
          </span>
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Pre code wrapper */}
      <pre className="p-5 overflow-auto max-h-[500px] !bg-[#050505] !m-0 scrollbar">
        <code ref={codeRef} className={`language-${language} font-mono text-xs leading-relaxed`}>
          {code}
        </code>
      </pre>
    </div>
  );
};
export default CodePreview;
