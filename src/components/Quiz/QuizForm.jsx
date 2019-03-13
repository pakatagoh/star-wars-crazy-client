import React from 'react';
import Title from './../Typography/Title';
import InputRadio from '../Input/InputRadio';
import ButtonCrawl from '../Buttons/ButtonCrawl';

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
              <InputRadio
                id={option.key}
                name="selection"
                value={option.value}
                checked={option.value === selection}
                onChange={handleChange}
              />
              <label htmlFor={option.key}>{option.value}</label>
            </div>
          ))}
          <div className="row align-items-center">
            <div className="col">
              <ButtonCrawl type="submit" className="btn-block" disabled={!selection}>
                Submit
              </ButtonCrawl>
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
