
import React from 'react';
import { CompassIcon } from './icons';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
      <CompassIcon className="h-12 w-12 text-cyan-500 animate-spin mb-4" />
      <h3 className="text-lg font-semibold">Generating Your Adventure...</h3>
      <p className="mt-2 text-sm">The AI author is crafting your story, puzzles, and clues.</p>
    </div>
  );
};

export default LoadingSpinner;
