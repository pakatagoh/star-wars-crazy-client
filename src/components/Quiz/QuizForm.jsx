import React from 'react';
import Title from './../Typography/Title';
import InputRadio from '../Input/InputRadio';

const QuizForm = props => {
  const { question, handleSubmit, options, selection, handleChange, currentQuestionNum, totalQuestions } = props;

  const renderRadios = () => {
    return options.map(option => (
      <div className="mb-3" key={option.key}>
        <InputRadio
          id={option.key}
          name="selection"
          value={option.value}
          checked={option.value === selection}
          onChange={handleChange}
          label={option.value}
        />
      </div>
    ));
  };

  return (
    <>
      <Title as="h4" className="mb-4">
        {question}
      </Title>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column">
          {renderRadios()}
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
