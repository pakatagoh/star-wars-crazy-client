import React, { useState, useEffect } from 'react';
import QuizView from '../components/QuizView';
import { getQuizList } from './../../services/quiz/quizService';
const Quiz = () => {
  const [quizList, setQuizList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const fetchQuizList = async () => {
    try {
      const foundQuizList = await getQuizList();
      if (foundQuizList) {
        console.log(foundQuizList);
        console.log('in here');
        setQuizList(foundQuizList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuizList();
  }, []);

  const quiz = quizList[0];

  return <QuizView {...quiz} />;
};

export default Quiz;
