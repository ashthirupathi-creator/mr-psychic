import React from 'react';
import { motion } from 'framer-motion';

const LikertScale = ({ onSelect }) => {
  const options = [
    { label: 'Strongly Disagree', value: 1, color: 'bg-gray-100 hover:bg-gray-200 text-gray-700' },
    { label: 'Disagree', value: 2, color: 'bg-gray-100 hover:bg-gray-200 text-gray-700' },
    { label: 'Neutral', value: 3, color: 'bg-gray-100 hover:bg-gray-200 text-gray-700' },
    { label: 'Agree', value: 4, color: 'bg-gray-100 hover:bg-gray-200 text-gray-700' },
    { label: 'Strongly Agree', value: 5, color: 'bg-gray-100 hover:bg-gray-200 text-gray-700' },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`flex-1 py-4 px-2 rounded-xl transition-all font-medium text-sm ${opt.color} border border-transparent active:scale-95`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export const QuestionCard = ({ question, onAnswer }) => {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-2xl w-full mx-auto"
    >
      <span className="text-physicBlue font-bold tracking-widest uppercase text-xs">
        Question {question.id}
      </span>
      <h2 className="text-2xl font-semibold mt-4 leading-snug text-slate-800">
        {question.text}
      </h2>
      <LikertScale onSelect={(val) => onAnswer(question.category, val)} />
    </motion.div>
  );
};