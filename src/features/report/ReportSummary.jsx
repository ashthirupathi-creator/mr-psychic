import React, { useEffect } from 'react';
import { useQuizStore } from '../../store/useQuizStore';
import { useCalculateScore } from '../../hooks/useCalculateScore';
import { generateStudentReport } from '../../services/geminiService';
import { TraitChart } from './TraitChart';
import { RefreshCcw, Sparkles } from 'lucide-react';

export const ReportSummary = () => {
  const { answers, aiReport, setAIReport, isGenerating, setIsGenerating, resetQuiz } = useQuizStore();
  const results = useCalculateScore(answers);

  useEffect(() => {
    const getAIResult = async () => {
      // Only trigger if we don't have a report yet and aren't already loading
      if (!aiReport && !isGenerating) {
        setIsGenerating(true);
        try {
          const report = await generateStudentReport(results);
          setAIReport(report);
        } catch (error) {
          setAIReport("Mr. Physic is having trouble connecting. Please check your internet and try again.");
          setIsGenerating(false);
        }
      }
    };
    getAIResult();
  }, [results, aiReport, isGenerating, setAIReport, setIsGenerating]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left: Visualization Card */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl border border-lavender h-fit">
          <h3 className="font-bold text-slate-800 text-center mb-6 text-lg">Your Personality Profile</h3>
          <TraitChart data={results} />
          
          <div className="mt-8 space-y-4">
             {Object.entries(results).map(([trait, data]) => (
               <div key={trait} className="space-y-1">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                   <span className="text-slate-400">{trait}</span>
                   <span className="text-deep-purple">{data.score} / 5.0</span>
                 </div>
                 <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-deep-purple h-full transition-all duration-1000" 
                      style={{ width: `${(data.score / 5) * 100}%` }} 
                    />
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Right: AI Analysis Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-lavender min-h-[500px] relative overflow-hidden">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-full py-32 space-y-6">
                <div className="relative">
                  <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-20"></div>
                  <div className="relative rounded-full h-16 w-16 border-4 border-t-deep-purple border-slate-100 animate-spin"></div>
                </div>
                <div className="text-center">
                  <p className="text-slate-600 font-bold text-lg animate-pulse">Analyzing your mindset...</p>
                  <p className="text-slate-400 text-sm mt-1">Gemini AI is crafting your personalized report</p>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-1000">
                <div className="flex items-center gap-3 text-deep-purple mb-8">
                  <div className="p-2 bg-lavender rounded-lg">
                    <Sparkles size={24} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black m-0 leading-none">The Verdict</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Powered by Gemini 1.5 Flash</p>
                  </div>
                </div>
                
                {/* AI Text Body */}
                <div className="text-slate-700 leading-relaxed text-lg space-y-4 whitespace-pre-wrap">
                  {aiReport}
                </div>

                {/* Footer Action */}
                <div className="mt-12 pt-8 border-t border-slate-50">
                   <button 
                    onClick={resetQuiz} 
                    className="flex items-center gap-2 text-slate-400 hover:text-deep-purple font-bold transition-colors group"
                   >
                    <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                    Start a New Evaluation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};