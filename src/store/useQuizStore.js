import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  step: 'welcome', // 'welcome' | 'quiz' | 'report'
  currentIndex: 0,
  answers: [], // Stores { category, score }

  setStep: (step) => set({ step }),

  addAnswer: (category, score) => set((state) => ({
    answers: [...state.answers, { category, score }],
    currentIndex: state.currentIndex + 1,
  })),

  resetQuiz: () => set({ 
    step: 'welcome', 
    currentIndex: 0, 
    answers: [] 
  }),
}));