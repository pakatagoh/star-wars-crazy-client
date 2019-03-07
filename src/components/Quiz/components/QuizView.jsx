import React from 'react';

const QuizView = props => {
  const {
    question,
    options,
    selection,
    handleChange,
    handleSubmit,
    isCompleted,
    score,
    currentQuestionNum,
    totalQuestions,
  } = props;
  return (
    <div data-testid="quiz-view">
      <h2>{question && question}</h2>
      <p>
        {currentQuestionNum}/{totalQuestions}
      </p>
      <form onSubmit={handleSubmit}>
        {options && options.length > 0 ? (
          <>
            {options.map(option => (
              <React.Fragment key={option.key}>
                <input
                  id={option.key}
                  type="radio"
                  name="selection"
                  value={option.value}
                  checked={option.value === selection}
                  onChange={handleChange}
                  className="sr-only"
                />
                <label htmlFor={option.key}>{option.value}</label>
              </React.Fragment>
            ))}
            <button type="submit" disabled={!selection}>
              Submit
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </form>
      {isCompleted && <p>Score is {score}</p>}
    </div>
  );
};

export default QuizView;
