import React from 'react';
import Title from '../../Typography/Title';

const QuizForm = props => {
  const { question, handleSubmit, options, selection, handleChange, currentQuestionNum, totalQuestions } = props;
  return (
    <>
      <Title as="h4" className="mb-4">
        {question}
      </Title>
      <form onSubmit={handleSubmit}>
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
      </form>
    </>
  );
};

export default QuizForm;
