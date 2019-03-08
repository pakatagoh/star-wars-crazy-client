import React from 'react';
import DivYellow from './../../Block/DivYellow';
import Title from './../../Typography/Title';

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
  return (
    <div data-testid="quiz-view">
      {isCompleted ? (
        <>
          <p>Score is {score}</p>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </>
      ) : (
        <DivYellow className="p-3">
          {question ? (
            <>
              <Title className="text-center">{question}</Title>
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
                  <p>Oops, something went wrong. Please refresh the page</p>
                )}
              </form>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </DivYellow>
      )}
    </div>
  );
};

export default QuizView;
