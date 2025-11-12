
import React from 'react';
import { CompassIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center text-center">
        <CompassIcon className="h-8 w-8 text-cyan-400 mr-4" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Schnitzeljagt Author Studio
          </h1>
          <p className="text-sm md:text-base text-slate-400">
            Crafting Your Next Great Adventure
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
