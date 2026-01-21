import React, { useState, useEffect } from 'react';
import { useQuizStore } from './store/useQuizStore';
import { QuizContainer } from './features/quiz/QuizContainer';
import { ReportSummary } from './features/report/ReportSummary';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  "“Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity.”",
  "“Self-care is how you take your power back.”",
  "“You don’t have to see the whole staircase, just take the first step.”",
  "“Mental health is not a destination, but a process.”",
  "“It’s okay not to be okay as long as you are not giving up.”"
];

const QuoteSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-12 bg-lavender rounded-3xl">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-3xl font-serif italic text-deep-purple text-center leading-relaxed"
        >
          {quotes[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

function App() {
  const { step, setStep } = useQuizStore();

  return (
    <main className="min-h-screen bg-silver">
      <nav className="p-8 absolute top-0 left-0">
        <h1 className="text-2xl font-black text-deep-purple tracking-tighter">
          Mr. Physic<span className="text-slate-400">.ai</span>
        </h1>
      </nav>

      <div className="container mx-auto px-6 min-h-screen flex items-center">
        {step === 'welcome' && (
          <div className="grid lg:grid-cols-2 gap-12 w-full items-center">
            {/* Left Side: Content */}
            <div className="text-left space-y-6 max-w-xl">
              <h2 className="text-6xl font-black text-slate-900 leading-tight">
                Understand your <span className="text-deep-purple">mindset.</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Take the Big Five personality assessment designed specifically for 
                students to uncover your learning style and social strengths.
              </p>
              <button 
                onClick={() => setStep('quiz')}
                className="bg-deep-purple text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-purple-200 transition-all hover:-translate-y-1 active:scale-95"
              >
                Start Evaluation
              </button>
            </div>

            {/* Right Side: Quotes */}
            <div className="hidden lg:block h-[500px]">
              <QuoteSection />
            </div>
          </div>
        )}

        {step === 'quiz' && <QuizContainer />}
        {step === 'report' && <ReportSummary />}
      </div>
    </main>
  );
}

export default App;