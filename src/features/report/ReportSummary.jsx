import React from 'react';
import { useQuizStore } from '../../store/useQuizStore';
import { useCalculateScore } from '../../hooks/useCalculateScore';
import { traitResponses } from '../../data/responses';
import { TraitChart } from './TraitChart';
import { RefreshCcw, Download } from 'lucide-react';

export const ReportSummary = () => {
  const { answers, resetQuiz } = useQuizStore();
  const results = useCalculateScore(answers);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-700">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Your Student Mindset Profile</h2>
        <p className="text-slate-500 mt-2">Based on the Big Five Inventory</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <TraitChart data={results} />
        
        <div className="space-y-6">
          {Object.entries(results).map(([trait, data]) => (
            <div key={trait} className="group">
              <div className="flex justify-between items-end mb-1">
                <h4 className="capitalize font-bold text-slate-700">{trait}</h4>
                <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                  SCORE: {data.score}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "{traitResponses[trait][data.level]}"
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={resetQuiz}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
        >
          <RefreshCcw size={18} /> Retake Quiz
        </button>
        <button 
          className="flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all"
          onClick={() => window.print()}
        >
          <Download size={18} /> Save as PDF
        </button>
      </div>
    </div>
  );
};