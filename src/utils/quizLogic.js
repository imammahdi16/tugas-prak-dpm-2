// Utility untuk logging
const log = (message, data) => {
  console.log(`[QuizLogic] ${message}`, data);
};

// Utility untuk error tracking
const trackError = (errorMessage, errorDetails) => {
  console.error(`[QuizLogic Error] ${errorMessage}`, errorDetails);
  // Bisa ditambahkan error tracking service
};

export const shuffleArray = (array) => {
  try {
    log('Shuffling array', { originalLength: array.length });
    
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    
    log('Array shuffled successfully');
    return array;
  } catch (error) {
    trackError('Failed to shuffle array', error);
    return array; // Kembalikan array asli jika shuffle gagal
  }
};

export const calculateScore = (totalQuestions, correctAnswers) => {
  try {
    log('Calculating score', { 
      totalQuestions, 
      correctAnswers 
    });

    const score = correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const grade = getGrade(correctAnswers, totalQuestions);

    log('Score calculated', { score, percentage, grade });

    return { score, percentage, grade };
  } catch (error) {
    trackError('Failed to calculate score', error);
    return { score: 0, percentage: 0, grade: 'F' };
  }
};
