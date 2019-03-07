import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import QuizView from './QuizView';
import { debug } from 'util';

const sampleQuestion = "Who is luke's father?";
const sampleOptions = [
  { key: 'option1', value: 'Qui-gon' },
  { key: 'option2', value: 'Anakin' },
  { key: 'option3', value: 'Darth Maul' },
];

const sampleButtonText = 'Submit';
const sampleSelection = 'Qui-gon';
const sampleIsCompleted = true;
const sampleScore = 3000;
const sampleScoreText = 'Score';
const sampleCurrentQuestionNum = 50;
const sampleTotalQuestions = 100;

describe('QuizView Component', () => {
  test('should display a question', () => {
    const { getByText } = render(<QuizView question={sampleQuestion} options={sampleOptions} />);

    expect(getByText(sampleQuestion)).toBeInTheDocument();
  });

  test('should display the options on the page', () => {
    const { getByText } = render(<QuizView question={sampleQuestion} options={sampleOptions} />);

    expect(getByText(sampleOptions[0].value)).toBeInTheDocument();
    expect(getByText(sampleOptions[1].value)).toBeInTheDocument();
    expect(getByText(sampleOptions[2].value)).toBeInTheDocument();
  });

  test('should display disabled button on load', () => {
    const { getByText } = render(<QuizView question={sampleQuestion} options={sampleOptions} />);

    const button = getByText(sampleButtonText);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');
  });

  test('should display no selected radio input on load', () => {
    const { getByLabelText } = render(<QuizView question={sampleQuestion} options={sampleOptions} />);

    const radio0 = getByLabelText(sampleOptions[0].value);
    const radio1 = getByLabelText(sampleOptions[1].value);
    const radio2 = getByLabelText(sampleOptions[2].value);

    expect(radio0).toHaveProperty('checked', false);
    expect(radio1).toHaveProperty('checked', false);
    expect(radio2).toHaveProperty('checked', false);
  });

  test('should selected radio should be checked when there is an input change event', () => {
    const { getByLabelText } = render(<QuizView question={sampleQuestion} options={sampleOptions} />);

    const radio0 = getByLabelText(sampleOptions[0].value);

    expect(radio0.value).toEqual(sampleOptions[0].value);

    expect(radio0).toHaveProperty('checked', false);

    fireEvent.change(radio0, { target: { checked: true } });

    expect(radio0).toHaveProperty('checked', true);
  });

  test('should enable submit button when an input is selected(checked)', () => {
    const { getByText } = render(
      <QuizView question={sampleQuestion} options={sampleOptions} selection={sampleSelection} />
    );

    const button = getByText(sampleButtonText);

    expect(button).not.toHaveAttribute('disabled');
  });

  test('should call handleChange twice when input clicking on 2 separate labels', () => {
    const mockHandleChange = jest.fn();
    const { getByText } = render(
      <QuizView question={sampleQuestion} options={sampleOptions} selection="" handleChange={mockHandleChange} />
    );

    const label0 = getByText(sampleOptions[0].value);
    const label1 = getByText(sampleOptions[1].value);

    fireEvent.click(label0);
    expect(mockHandleChange.mock.calls.length).toEqual(1);
    fireEvent.click(label1);
    expect(mockHandleChange.mock.calls.length).toEqual(2);

    mockHandleChange.mockRestore();
  });

  test('should call handleSubmit once when submitting valid form', () => {
    const mockHandleSubmit = jest.fn();
    const { getByText } = render(
      <QuizView
        question={sampleQuestion}
        options={sampleOptions}
        selection={sampleSelection}
        handleSubmit={mockHandleSubmit}
      />
    );

    const button = getByText(sampleButtonText);

    fireEvent.click(button);
    expect(mockHandleSubmit.mock.calls.length).toEqual(1);

    mockHandleSubmit.mockRestore();
  });

  test('should display score once quiz is completed', () => {
    const { getByText } = render(
      <QuizView question={sampleQuestion} options={sampleOptions} score={sampleScore} isCompleted={sampleIsCompleted} />
    );

    expect(getByText(new RegExp(sampleScoreText, 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(sampleScore, 'i'))).toBeInTheDocument();
  });

  test('should not display score if quiz is not completed', () => {
    const { queryByText } = render(
      <QuizView
        question={sampleQuestion}
        options={sampleOptions}
        score={sampleScore}
        isCompleted={!sampleIsCompleted}
      />
    );

    expect(queryByText(new RegExp(sampleScoreText, 'i'))).not.toBeInTheDocument();
    expect(queryByText(new RegExp(sampleScore, 'i'))).not.toBeInTheDocument();
  });

  test('should display question counter', () => {
    const { getByText } = render(
      <QuizView
        question={sampleQuestion}
        options={sampleOptions}
        totalQuestions={sampleTotalQuestions}
        currentQuestionNum={sampleCurrentQuestionNum}
      />
    );

    expect(getByText(new RegExp(sampleCurrentQuestionNum, 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(sampleTotalQuestions, 'i'))).toBeInTheDocument();
  });
});
