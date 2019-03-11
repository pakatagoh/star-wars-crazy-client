import React, { useState, useEffect } from 'react';
import { getQuizList } from './../../services/quiz/quizService';
import Title from './../../Typography/Title';
import QuizCompleted from './../components/QuizCompleted';
import QuizForm from './../components/QuizForm';
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

  const handleSubmit = event => {
    event.preventDefault();
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
  const totalQuestions = quizList.length;

  const quizFormProps = {
    handleSubmit,
    selection,
    handleChange,
    currentQuestionNum,
    totalQuestions,
  };

  return (
    <div data-testid="quiz-view">
      <Title className="text-center" as="h1">
        Star Wars Quiz
      </Title>
      <div className="border-yellow p-3">
        {isCompleted ? (
          <QuizCompleted score={score} totalQuestions={totalQuestions} handleReset={handleReset} />
        ) : (
          <>
            <div className="row justify-content-center">
              <div className="col-10">
                {quizList.length > 0 ? (
                  <QuizForm question={quiz.question} options={quiz.options} {...quizFormProps} />
                ) : (
                  <div className="d-flex justify-content-center">
                    <span className="loader" />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
