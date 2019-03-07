import React, { useState, useEffect } from 'react';
import QuizView from '../components/QuizView';
import { getQuizList } from './../../services/quiz/quizService';
const Quiz = () => {
  const [quizList, setQuizList] = useState([]);
  const [currentQuestionNum, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selection, setSelection] = useState('');

  const fetchQuizList = async () => {
    try {
      const foundQuizList = await getQuizList();
      if (foundQuizList) {
        setQuizList(foundQuizList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuizList();
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setSelection(value);
    setCurrentQuestion(state => state + 1);
  };

  const handleSubmit = () => {
    setSelection('');
  };

  const quiz = quizList[0];
  const quizViewProps = {
    selection,
    handleChange,
    handleSubmit,
    score,
    currentQuestionNum,
    totalQuestions: quizList.length,
    isCompleted: currentQuestionNum === quizList.length,
  };

  return <QuizView {...quiz} {...quizViewProps} />;
};

export default Quiz;
