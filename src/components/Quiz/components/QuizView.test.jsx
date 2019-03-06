import React from 'react';
import { render, wait } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import QuizView from './QuizView';

const sampleQuestion = "Who is luke's father?";
const sampleOptions = [
  { key: 'option1', value: 'Qui-gon' },
  { key: 'option2', value: 'Anakin' },
  { key: 'option3', value: 'Darth Maul' },
];

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
});
