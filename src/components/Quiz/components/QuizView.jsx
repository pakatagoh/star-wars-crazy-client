import React from 'react';
import Title from './../../Typography/Title';
import '../styles/quiz.css';
import QuizCompleted from './QuizCompleted';

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
          <QuizCompleted score={score} totalQuestions={totalQuestions} handleReset={handleReset} />
        ) : (
          <>
            {question ? (
              <div className="row justify-content-center">
                <div className="col-10">
                  <Title as="h4" className="mb-4">
                    {question}
                  </Title>
                  <form onSubmit={handleSubmit}>
                    {options && options.length > 0 ? (
                      <div className="d-flex flex-column">
                        {options.map(option => (
                          <div className="mb-3" key={option.key}>
                            <input
                              id={option.key}
                              type="radio"
                              name="selection"
                              value={option.value}
                              checked={option.value === selection}
                              onChange={handleChange}
                              className="sr-only input-radio"
                            />
                            <label htmlFor={option.key} className="m-0">
                              {option.value}
                            </label>
                          </div>
                        ))}
                        <div className="row align-items-center">
                          <div className="col">
                            <button type="submit" className="btn btn-outline-crawl btn-block" disabled={!selection}>
                              Submit
                            </button>
                          </div>
                          <div className="col-auto">
                            <p className="m-0 font-weight-bold">
                              {currentQuestionNum}/{totalQuestions}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>Oops, something went wrong. Please refresh the page</p>
                    )}
                  </form>
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
