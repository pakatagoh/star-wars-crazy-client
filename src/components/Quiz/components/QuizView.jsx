import React from 'react';
import Title from './../../Typography/Title';
import '../styles/quiz.css';
import QuizCompleted from './QuizCompleted';
import QuizForm from './QuizForm';

const QuizView = props => {
  const {
    question,
    options,
    selection,
    handleChange,
    handleSubmit,
    handleReset,
    isCompleted,
    score,
    currentQuestionNum,
    totalQuestions,
  } = props;

  const quizFormProps = {
    question,
    handleSubmit,
    options,
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
            {options && options.length > 0 ? (
              <div className="row justify-content-center">
                <div className="col-10">
                  <QuizForm {...quizFormProps} />
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <span className="loader" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizView;
