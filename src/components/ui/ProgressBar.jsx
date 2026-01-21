import React from 'react';

export const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner">
      <div 
        className="bg-physic-blue h-full transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};