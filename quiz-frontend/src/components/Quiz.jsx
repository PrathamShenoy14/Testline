import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds for each question
  const navigate = useNavigate();

  // Fetch quiz data
  useEffect(() => {
    axios.get('http://localhost:8000/api/proxy')
      .then(res => {
        if (Array.isArray(res.data.questions) && res.data.questions.length > 0) {
          setQuestions(res.data.questions);
          setSelectedAnswers(new Array(res.data.questions.length).fill(null));
        } else {
          console.error('No questions found in response data');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching quiz data:', err);
        setLoading(false);
      });
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount or when the question changes
  }, [timeLeft]);

  // Reset the timer to 30 seconds each time a new question is displayed
  useEffect(() => {
    setTimeLeft(30);
  }, [currentIndex]);

  // Handle the selected answer for the current question
  const handleAnswer = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentIndex] = answer;
    setSelectedAnswers(updatedAnswers);

    // Play correct or incorrect sound
    if (answer.is_correct) {
      playSound('correct.mp3'); // Play correct answer sound
      // Award 10 points for the correct answer + bonus points for time left
      const bonusPoints = Math.max(timeLeft * 2, 0); // 2 points per second left
      setScore(prevScore => prevScore + 10 + bonusPoints); // Add base score + bonus
    } else {
      playSound('wrong.mp3'); // Play incorrect answer sound
    }

    // Automatically go to next question
    nextQuestion();
  };

  // Function to play sound based on file name
  const playSound = (fileName) => {
    const audio = new Audio(`/assets/${fileName}`); // Assuming your sound files are in public/assets
    audio.play();
  };

  // Handle next question or finish quiz
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Once all questions are answered, save the score
      saveScoreToLeaderboard(score);
    }
  };

  // Save score to leaderboard after quiz is finished
  const saveScoreToLeaderboard = async (score) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. User not authenticated.');
        return;
      }
      const response = await axios.post(
        'http://localhost:8000/api/leaderboard/update',
        { score },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );

      if (response.status === 200) {
        console.log('Score saved successfully');
      } else {
        console.error('Failed to save score');
      }

      // After saving, navigate to the results page with score and other details
      navigate('/results', {
        state: {
          score,
          questions,
          selectedAnswers,
        },
      });
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  // If data is loading, show loading state
  if (loading) return <p>Loading quiz...</p>;

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <LinearProgress variant="determinate" value={(currentIndex + 1) / questions.length * 100} className="mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 text-center">Quiz</h2>
        <div className="mt-4 text-center text-lg font-semibold text-red-600">
          ⏳ Time Left: {timeLeft}s
        </div>
        <div className="mt-6">
          {questions[currentIndex]?.description && (
            <p className="text-lg font-medium text-gray-800 text-center">
              <strong>Question {currentIndex + 1}:</strong> {questions[currentIndex].description}
            </p>
          )}
          {questions[currentIndex]?.options && (
            <div className="mt-4 space-y-4">
              {questions[currentIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={`w-full py-2 px-4 rounded-md text-lg font-medium text-gray-800 border border-gray-300 ${selectedAnswers[currentIndex] === option ? 'bg-blue-200' : 'bg-white hover:bg-gray-100'}`}
                >
                  {option.description}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
