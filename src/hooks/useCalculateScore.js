export const useCalculateScore = (answers) => {
  const categories = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
  
  const results = categories.reduce((acc, cat) => {
    const catAnswers = answers.filter(a => a.category === cat);
    const avg = catAnswers.reduce((sum, a) => sum + a.score, 0) / catAnswers.length;
    
    let level = 'medium';
    if (avg < 2.5) level = 'low';
    if (avg >= 2.5 && avg < 4.0) level = 'medium';
    if (avg >= 4.0) level = 'high';

    acc[cat] = { score: avg.toFixed(1), level };
    return acc;
  }, {});

  return results;
};