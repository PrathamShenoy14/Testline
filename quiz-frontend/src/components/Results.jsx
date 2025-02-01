import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Results = () => {
  const location = useLocation();
  const { score, questions, selectedAnswers } = location.state;
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const correctAnswers = questions.filter((question, index) => {
    return question.options.some(option => option.is_correct && option.description === selectedAnswers[index]?.description);
  });

  const incorrectAnswers = questions.filter((question, index) => {
    return !question.options.some(option => option.is_correct && option.description === selectedAnswers[index]?.description);
  });

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const question = questions[currentIndex];
  const selectedAnswer = selectedAnswers[currentIndex];
  const correctAnswer = question.options.find(option => option.is_correct);

  return (
    <div className="h-fit flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-6">
    <Navbar/>
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">Quiz Results</h2>
        <p className="text-center text-lg text-gray-600 mb-6">Your score: <span className="font-semibold text-blue-600">{score}</span></p>

        {/* Question Card */}
        <div className="p-6 bg-white rounded-xl shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Question {currentIndex + 1}: {question.description}</h3>

          {/* Options List with Highlights */}
          <div className="space-y-4">
            {question.options.map((option, idx) => {
              let optionClass = "w-full py-3 px-5 rounded-md text-lg font-medium text-gray-800 border border-gray-300 transition duration-200 ease-in-out";

              // Highlight correct or incorrect options
              if (option.is_correct) {
                optionClass += " bg-green-100 border-green-500"; // Green for correct
              } else if (selectedAnswer && selectedAnswer.description === option.description) {
                optionClass += " bg-red-100 border-red-500"; // Red for wrong selected answer
              } else {
                optionClass += " hover:bg-gray-100";
              }

              return (
                <button key={idx} className={optionClass}>
                  {option.description}
                </button>
              );
            })}
          </div>

          {/* Show Correct Answer with Styled Solution */}
          <div className="mt-6 p-4 bg-gray-50 border-l-4 border-blue-600 rounded-md text-sm text-gray-700">
            <strong className="text-lg font-semibold text-gray-900">Solution:</strong>
            <p className="mt-2 text-gray-600">{question.detailed_solution}</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={previousQuestion}
            disabled={currentIndex === 0}
            className="py-2 px-4 rounded-md text-base font-medium text-white bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 transition duration-200 ease-in-out"
          >
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={currentIndex === questions.length - 1}
            className="py-2 px-4 rounded-md text-base font-medium text-white bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 transition duration-200 ease-in-out"
          >
            {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
