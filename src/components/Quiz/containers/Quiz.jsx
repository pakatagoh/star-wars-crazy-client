import React, { useState, useEffect } from 'react';
import QuizView from '../components/QuizView';
import { getQuizList } from './../../services/quiz/quizService';
const Quiz = () => {
  const [quizList, setQuizList] = useState([]);
  const [currentQuestionNum, setCurrentQuestionNum] = useState(1);
  const [score, setScore] = useState(0);
  const [selection, setSelection] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [reset, setReset] = useState(false);

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
  }, [reset]);

  const handleChange = event => {
    const { value } = event.target;
    setSelection(value);
  };

  const handleSubmit = () => {
    const selectedAnswer = selection;
    const quizAnswer = quizList[currentQuestionNum - 1].answer;
    if (selectedAnswer === quizAnswer) setScore(state => state + 1);
    setSelection('');
    currentQuestionNum === quizList.length ? setIsCompleted(true) : setCurrentQuestionNum(state => state + 1);
  };

  const handleReset = () => {
    setSelection('');
    setScore(0);
    setQuizList([]);
    setCurrentQuestionNum(1);
    setIsCompleted(false);
    setReset(!reset);
  };

  const quiz = quizList[currentQuestionNum - 1];
  const quizViewProps = {
    selection,
    handleChange,
    handleSubmit,
    handleReset,
    score,
    currentQuestionNum,
    totalQuestions: quizList.length,
    isCompleted,
  };

  return <QuizView {...quiz} {...quizViewProps} />;
};

export default Quiz;
