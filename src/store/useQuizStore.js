import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  step: 'welcome',
  currentIndex: 0,
  answers: [],
  aiReport: '', // Stores the final AI text
  isGenerating: false, // Loading state

  setStep: (step) => set({ step }),
  
  setAIReport: (report) => set({ aiReport: report, isGenerating: false }),
  
  setIsGenerating: (loading) => set({ isGenerating: loading }),

  addAnswer: (category, score) => set((state) => ({
    answers: [...state.answers, { category, score }],
    currentIndex: state.currentIndex + 1,
  })),

  resetQuiz: () => set({ 
    step: 'welcome', 
    currentIndex: 0, 
    answers: [],
    aiReport: '',
    isGenerating: false
  }),
}));