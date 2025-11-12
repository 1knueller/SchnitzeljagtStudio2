
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { CopyIcon, CheckIcon } from './icons';
import LoadingSpinner from './LoadingSpinner';

interface OutputDisplayProps {
  markdownContent: string;
  isLoading: boolean;
  error: string | null;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ markdownContent, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (markdownContent) {
      setCopied(false);
    }
  }, [markdownContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-red-400">
          <h3 className="text-lg font-semibold">An Error Occurred</h3>
          <p className="mt-2 text-sm text-red-300">{error}</p>
        </div>
      );
    }

    if (!markdownContent) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
          <h3 className="text-lg font-semibold">Your Adventure Awaits</h3>
          <p className="mt-2 text-sm">Fill out the form to generate your custom Schnitzeljagt.</p>
        </div>
      );
    }

    return (
        <article className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-cyan-300 prose-a:text-cyan-400 prose-strong:text-slate-100 prose-code:text-amber-300">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </article>
    );
  };


  return (
    <div className="relative bg-slate-800/50 p-6 rounded-lg border border-slate-700 h-[calc(100vh-15rem)] min-h-[500px] flex flex-col">
      {markdownContent && !isLoading && (
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-1 px-3 rounded-md text-sm flex items-center transition-colors"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4 mr-1.5 text-green-400" /> Copied!
            </>
          ) : (
            <>
              <CopyIcon className="h-4 w-4 mr-1.5" /> Copy Markdown
            </>
          )}
        </button>
      )}
      <div className="overflow-y-auto flex-grow pr-4 -mr-4 custom-scrollbar">
        {renderContent()}
      </div>
       <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569;
          border-radius: 20px;
          border: 3px solid #475569;
        }
        .prose hr {
            border-color: #475569;
        }
       `}</style>
    </div>
  );
};

export default OutputDisplay;
