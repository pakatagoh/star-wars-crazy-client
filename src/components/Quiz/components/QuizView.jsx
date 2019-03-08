import React from 'react';
import { Row, Col } from 'reactstrap';
import Title from './../../Typography/Title';
import '../styles/quiz.css';
import Paragraph from '../../Typography/Paragraph';

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
      <Title className="text-center" as="h1">
        Star Wars Quiz
      </Title>
      <div className="border-yellow p-3">
        {isCompleted ? (
          <>
            <p>Score is {score}</p>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </>
        ) : (
          <>
            {question ? (
              <>
                <Title className="text-center" as="h4">
                  {question}
                </Title>
                <form onSubmit={handleSubmit}>
                  {options && options.length > 0 ? (
                    <div className="row flex-column">
                      {options.map(option => (
                        <React.Fragment key={option.key}>
                          <div className="col-12">
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
                          </div>
                        </React.Fragment>
                      ))}
                      <button type="submit" disabled={!selection}>
                        Submit
                      </button>
                    </div>
                  ) : (
                    <p>Oops, something went wrong. Please refresh the page</p>
                  )}
                </form>
                <p>
                  {currentQuestionNum}/{totalQuestions}
                </p>
              </>
            ) : (
              <p className="text-center">Loading...</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizView;
