import React from 'react';
import { useQuizStore } from '../../store/useQuizStore';
import { questions } from '../../data/questions';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from '../../components/ui/ProgressBar';

export const QuizContainer = () => {
  const { currentIndex, addAnswer, setStep } = useQuizStore();
  
  const currentQuestion = questions[currentIndex];

  const handleAnswer = (category, score) => {
    addAnswer(category, score);
    // If it was the last question, move to report
    if (currentIndex === questions.length - 1) {
      setStep('report');
    }
  };

  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mb-8">
        <ProgressBar progress={progress} />
        <p className="text-right text-sm text-slate-500 mt-2 font-medium">
          {currentIndex + 1} of {questions.length}
        </p>
      </div>
      
      <QuestionCard 
        key={currentQuestion.id} 
        question={currentQuestion} 
        onAnswer={handleAnswer} 
      />
    </div>
  );
};