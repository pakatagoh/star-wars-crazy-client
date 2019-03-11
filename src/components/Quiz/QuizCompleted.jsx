import React from 'react';
import Title from './../Typography/Title';

const QuizCompleted = props => {
  const { score, totalQuestions, handleReset } = props;

  return (
    <div className="d-flex flex-column align-items-center">
      <Title as="h4">Quiz Completed!</Title>
      <p className="h2">
        Your Score is {score} out of {totalQuestions}
      </p>
      <button type="button" className="btn btn-outline-crawl" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default QuizCompleted;
