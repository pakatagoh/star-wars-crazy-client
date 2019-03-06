import React from 'react';

const QuizView = props => {
  const { question, options } = props;
  return (
    <div data-testid="quiz-view">
      <h2>{question && question}</h2>
      <form>
        {options && options.length > 0 ? (
          <>
            {options.map(option => (
              <>
                <input
                  key={option.key}
                  id={option.key}
                  type="radio"
                  name="selection"
                  value={option.value}
                  className="sr-only"
                />
                <label htmlFor={option.key}>{option.value}</label>
              </>
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </form>
    </div>
  );
};

export default QuizView;
